#!/usr/bin/env python3
"""Walk the live rail dump into mermaid.

The TypeScript dump is the engine. This script is the picture. Node identity
is chair + card + face + ending, not bars. Two live buttons that land on the
same next card are a collapse. That is the whole point.

Usage:
  python3 scripts/rail_graph.py
  python3 scripts/rail_graph.py --refresh
  python3 scripts/rail_graph.py --self-test
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from collections import defaultdict
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
JSON_PATH = ROOT / "artifacts" / "rail-graph.json"
DOCS_PATH = ROOT / "docs" / "RAILGRAPH.md"
ART = ROOT / "artifacts"

PLOT_NEXT = [
    {
        "id": "catalog-gates-contra",
        "card": "weapons-1972",
        "later": "iran-contra-1985",
        "now": "Both catalog buttons land on the 1979 square. Contra still appears. The crates are a later collapse too.",
        "plot": "If they never bought the American catalog, Reagan is not selling spare parts for a fleet that is not there. Skip the channel, or change what is in the crate.",
    },
    {
        "id": "liberals-save-shah",
        "card": "weapons-1972",
        "later": "revolution-1979",
        "now": "Spend the oil on the villages sets hinterland_spent. 1979 Stay is a real hold. Leave still seats Bazargan. White Revolution still only moves liberals.",
        "plot": "Shipped. Hinterland is the fork, not the feminists. Catalog still does not gate Contra.",
    },
    {
        "id": "admit-gates-hostages",
        "card": "revolution-1979",
        "later": "hostages-1979",
        "now": "Let him in and keep him out both ride to the veil, then the embassy. The shah_admitted flag is set and then ignored for routing.",
        "plot": "Historically the seizure follows the admission. Keeping him out might skip the embassy card, or change who takes it.",
    },
    {
        "id": "claw-gates-nothing",
        "card": "hostages-1979",
        "later": "iran-iraq-1980",
        "now": "Authorize a rescue and keep talking both land on Saddam. eagle_claw is another dead flag.",
        "plot": "A burned wreck in Tabas is not a different 1980s. Leave it as flavor unless a later card should read the raid.",
    },
    {
        "id": "mossadegh-holds-1979",
        "card": "coup-1953",
        "later": "revolution-1979",
        "now": "Hire the British engineers is the street grave. Moscow is Stalin in a turban. There is no Mossadegh costume through Nixon.",
        "plot": "Pruned. He is doomed even if Ike leaves him. The keep-the-chair path was a liberal fantasy.",
    },
    {
        "id": "bekaa-gates-contra",
        "card": "lebanon-1983",
        "later": "iran-contra-1985",
        "now": "Bring them home and stay-and-hit both land on the channel. Iran's keep-the-war-at-home is a grave, not a skip.",
        "plot": "No Bekaa, maybe no later hostages, maybe no TOW trade. Or the war still eats spare parts without Beirut.",
    },
]


def load_graph(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text())


def refresh_dump(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    proc = subprocess.run(
        [
            "node",
            "--experimental-strip-types",
            str(ROOT / "scripts" / "dump-rail-graph.ts"),
            "--print-stats",
        ],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    if proc.returncode != 0:
        sys.stderr.write(proc.stderr)
        raise SystemExit(f"dump failed: {proc.returncode}")
    if proc.stderr:
        sys.stderr.write(proc.stderr)
    path.write_text(proc.stdout)
    if not proc.stdout.strip().startswith("{"):
        raise SystemExit("dump did not write JSON")


def mermaid_id(node_id: str) -> str:
    out = []
    for ch in node_id:
        if ch.isalnum():
            out.append(ch)
        else:
            out.append("_")
    s = "".join(out)
    if s in {"end", "subgraph", "graph", "flowchart"}:
        s = f"n_{s}"
    return s


def esc(text: str) -> str:
    return (
        text.replace('"', "'")
        .replace("[", "(")
        .replace("]", ")")
        .replace("{", "(")
        .replace("}", ")")
        .replace("|", "/")
        .replace("<", " ")
        .replace(">", " ")
        .replace("\n", " ")
        .strip()
    )


def node_label(node: dict[str, Any]) -> str:
    year = node["yearLabel"]
    face = node["face"]
    title = node["title"]
    if node["phase"] == "ended":
        if node["endingId"] == "none":
            return esc(f"{year} Rail hold")
        ending = node["endingTitle"] or node["endingId"]
        return esc(f"{year} GRAVE {ending}")
    return esc(f"{year} {title} / {face}")


def glance_label(node: dict[str, Any]) -> str:
    year = node["yearLabel"]
    face = node["face"]
    if node["phase"] == "ended":
        if node["endingId"] == "none":
            return esc(f"{year} Rail hold")
        return esc(f"{year} {node['endingId']}")
    return esc(f"{year} {face}")

def edge_label(edge: dict[str, Any]) -> str:
    tag = "H " if edge["historical"] else ("AL " if edge["artisticLicense"] else "")
    face = f" => {edge['faceChange'].split(' -> ')[-1]}" if edge.get("faceChange") else ""
    return esc(f"{tag}{edge['label']}{face}")


def classify(nodes: list[dict[str, Any]], edges: list[dict[str, Any]]) -> dict[str, list]:
    by_id = {n["id"]: n for n in nodes}
    outgoing: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for e in edges:
        outgoing[e["from"]].append(e)

    collapses: list[dict[str, Any]] = []
    terminal_collapses: list[dict[str, Any]] = []
    forks: list[dict[str, Any]] = []
    graves: list[dict[str, Any]] = []

    for src_id, elist in outgoing.items():
        src = by_id[src_id]
        playing = [e for e in elist if by_id[e["to"]]["phase"] == "playing"]
        ended = [e for e in elist if by_id[e["to"]]["phase"] == "ended"]
        play_dests = {e["to"] for e in playing}
        end_dests = {e["to"] for e in ended}
        all_dests = {e["to"] for e in elist}

        if len(playing) >= 2 and len(play_dests) == 1:
            dest = by_id[next(iter(play_dests))]
            collapses.append(
                {
                    "from": src,
                    "labels": [e["label"] for e in playing],
                    "to": dest,
                }
            )
        if len(ended) >= 2 and len(end_dests) == 1 and not playing:
            dest = by_id[next(iter(end_dests))]
            terminal_collapses.append(
                {
                    "from": src,
                    "labels": [e["label"] for e in ended],
                    "to": dest,
                }
            )
        if len(all_dests) > 1:
            forks.append(
                {
                    "from": src,
                    "edges": elist,
                    "dests": [by_id[i] for i in sorted(all_dests)],
                }
            )
        for e in ended:
            dest = by_id[e["to"]]
            if dest["endingId"] == "none":
                continue
            graves.append({"from": src, "edge": e, "to": dest})

    return {
        "collapses": collapses,
        "terminal_collapses": terminal_collapses,
        "forks": forks,
        "graves": graves,
        "outgoing": outgoing,
        "by_id": by_id,
    }


def flowchart(
    chair: str,
    nodes: list[dict[str, Any]],
    edges: list[dict[str, Any]],
    *,
    short: bool = False,
) -> str:
    lines = [
        "flowchart TB",
        "  classDef play fill:#1c2333,stroke:#c4a35a,color:#f3ead8",
        "  classDef grave fill:#3a1a1a,stroke:#c45c5c,color:#f3ead8",
        "  classDef hold fill:#1a2e22,stroke:#5d9b6a,color:#f3ead8",
        "  classDef collapse fill:#2a2433,stroke:#8a7bb8,color:#f3ead8",
        "  classDef fork fill:#23333a,stroke:#6ab4c8,color:#f3ead8",
    ]
    classified = classify(nodes, edges)
    collapse_from = {c["from"]["id"] for c in classified["collapses"]}
    collapse_from |= {c["from"]["id"] for c in classified["terminal_collapses"]}
    fork_from = {f["from"]["id"] for f in classified["forks"]}

    for node in nodes:
        nid = mermaid_id(node["id"])
        label = glance_label(node) if short else node_label(node)
        if node["phase"] == "ended" and node["endingId"] == "none":
            lines.append(f'  {nid}(["{label}"]):::hold')
        elif node["phase"] == "ended":
            lines.append(f'  {nid}{{{{"{label}"}}}}:::grave')
        elif node["id"] in fork_from:
            lines.append(f'  {nid}["{label}"]:::fork')
        elif node["id"] in collapse_from:
            lines.append(f'  {nid}["{label}"]:::collapse')
        else:
            lines.append(f'  {nid}["{label}"]:::play')

    for edge in edges:
        a = mermaid_id(edge["from"])
        b = mermaid_id(edge["to"])
        label = edge_label(edge)
        if edge["historical"]:
            lines.append(f'  {a} -->|"{label}"| {b}')
        elif edge["artisticLicense"]:
            lines.append(f'  {a} -.->|"{label}"| {b}')
        else:
            lines.append(f'  {a} -->|"{label}"| {b}')

    return "\n".join(lines)


def skeleton(chair: str, nodes: list[dict[str, Any]], edges: list[dict[str, Any]]) -> str:
    """One box per card on the playing rail. Graves hang off. Collapses stay linear."""
    classified = classify(nodes, edges)
    start = next(n for n in nodes if n["cardId"] == "coup-1953" and n["phase"] == "playing")

    # Walk playing cards in BFS order, collapsing same-card faces into one box
    # for the US chair (always one face). For Iran, keep face in the box id.
    lines = [
        "flowchart TB",
        "  classDef play fill:#1c2333,stroke:#c4a35a,color:#f3ead8",
        "  classDef grave fill:#3a1a1a,stroke:#c45c5c,color:#f3ead8",
        "  classDef hold fill:#1a2e22,stroke:#5d9b6a,color:#f3ead8",
        "  classDef collapse fill:#2a2433,stroke:#8a7bb8,color:#f3ead8",
        "  classDef fork fill:#23333a,stroke:#6ab,color:#f3ead8",
    ]

    seen_nodes = set()
    seen_edges = set()

    def box(node: dict[str, Any]) -> str:
        return mermaid_id(node["id"])

    collapse_from = {c["from"]["id"] for c in classified["collapses"]}
    fork_from = {f["from"]["id"] for f in classified["forks"]}

    for node in nodes:
        nid = box(node)
        if nid in seen_nodes:
            continue
        seen_nodes.add(nid)
        label = node_label(node)
        if node["phase"] == "ended" and node["endingId"] == "none":
            lines.append(f'  {nid}(["{label}"]):::hold')
        elif node["phase"] == "ended":
            lines.append(f'  {nid}{{{{"{label}"}}}}:::grave')
        elif node["id"] in fork_from:
            lines.append(f'  {nid}["{label}"]:::fork')
        elif node["id"] in collapse_from:
            lines.append(f'  {nid}["{label}"]:::collapse')
        else:
            lines.append(f'  {nid}["{label}"]:::play')

    for edge in edges:
        a = mermaid_id(edge["from"])
        b = mermaid_id(edge["to"])
        key = (a, b, edge["choiceId"])
        if key in seen_edges:
            continue
        seen_edges.add(key)
        label = edge_label(edge)
        if edge["artisticLicense"] and not edge["historical"]:
            lines.append(f'  {a} -.->|"{label}"| {b}')
        else:
            lines.append(f'  {a} -->|"{label}"| {b}')

    lines.append(f"  %% start {start['id']}")
    return "\n".join(lines)


def md_table(rows: list[list[str]], headers: list[str]) -> str:
    lines = [
        "| " + " | ".join(headers) + " |",
        "| " + " | ".join("---" for _ in headers) + " |",
    ]
    for row in rows:
        lines.append("| " + " | ".join(row) + " |")
    return "\n".join(lines)


def docs_markdown(graph: dict[str, Any]) -> str:
    us = graph["chairs"]["us"]
    iran = graph["chairs"]["iran"]
    us_c = classify(us["nodes"], us["edges"])
    ir_c = classify(iran["nodes"], iran["edges"])

    collapse_rows = []
    for c in graph["collapses"]:
        collapse_rows.append(
            [
                c["chair"],
                c["yearLabel"],
                c["face"],
                c["title"],
                " / ".join(c["choiceLabels"]),
                f"{c['landTitle']} ({c['landFace']})",
            ]
        )

    term_rows = []
    for chair, blob in (("us", us_c), ("iran", ir_c)):
        for c in blob["terminal_collapses"]:
            term_rows.append(
                [
                    chair,
                    c["from"]["yearLabel"],
                    c["from"]["face"],
                    c["from"]["title"],
                    " / ".join(c["labels"]),
                    c["to"]["endingTitle"] or c["to"]["endingId"] or "",
                ]
            )

    fork_rows = []
    for chair, blob in (("us", us_c), ("iran", ir_c)):
        for f in blob["forks"]:
            dests = ", ".join(
                f"{d['cardId']} {d['face']} {d['phase']}"
                + (f"/{d['endingId']}" if d["endingId"] else "")
                for d in f["dests"]
            )
            fork_rows.append(
                [
                    chair,
                    f["from"]["yearLabel"],
                    f["from"]["face"],
                    f["from"]["title"],
                    dests,
                ]
            )

    grave_rows = []
    for chair, blob in (("us", us_c), ("iran", ir_c)):
        for g in blob["graves"]:
            grave_rows.append(
                [
                    chair,
                    g["from"]["yearLabel"],
                    g["from"]["face"],
                    g["edge"]["label"],
                    g["to"]["endingId"] or "",
                    g["to"]["endingTitle"] or "",
                ]
            )

    plot_rows = [
        [p["card"], p["later"], p["now"], p["plot"]] for p in PLOT_NEXT
    ]

    spine = ", ".join(s["id"] for s in graph["spine"])
    unwired = ", ".join(graph["unwiredPlayable"]) or "(none)"

    us_mmd = flowchart("us", us["nodes"], us["edges"])
    ir_mmd = flowchart("iran", iran["nodes"], iran["edges"])
    us_glance = flowchart("us", us["nodes"], us["edges"], short=True)
    ir_glance = flowchart("iran", iran["nodes"], iran["edges"], short=True)

    return f"""# Rail graph

Walked from the live engine. Nodes are chair + card + face + ending. Bars and
clocks do not fork the graph. Two live buttons that land on the same next card
are a collapse.

The huge terminal counts are binary trees counting the same shared destinations
over and over. The unique graph is small.

| Chair | Unique nodes | Edges | Terminal path counts |
| --- | --- | --- | --- |
| US | {len(us["nodes"])} | {len(us["edges"])} | {us["terminals"]} |
| Iran | {len(iran["nodes"])} | {len(iran["edges"])} | {iran["terminals"]} |

Collapses: {len(graph["collapses"])} live (playing to the same next card).
US also has a terminal collapse on the cup: both buttons are Rail hold.

Unwired playable from 1953: {unwired}

Spine still waiting (not a collapse, just not written): {spine}

1938 is a year-click egg. Hormuz 2019 is an isolation start. Neither is in this walk.

Purple boxes collapse. Teal boxes actually fork. Red hexes are graves. Green
stadiums are Rail hold.

Solid arrows are golden-path or number-tweak continues. Dotted arrows are AL.

## US at a glance

Year and face only. Full titles in the next diagram.

```mermaid
{us_glance}
```

## Iran at a glance

Mossadegh can keep the chair by dealing with London. That costume runs through
Nixon, then 1979 still seats Bazargan.

```mermaid
{ir_glance}
```

## US, 1953 to the cup

```mermaid
{us_mmd}
```

## Iran, 1953 to the cup

Mossadegh can keep the chair by dealing with London. That costume runs through
Nixon, then 1979 still seats Bazargan. Nationalize is the golden path: you
become the Shah, then you leave, then you are the letterhead and the Imam has
the guns.

```mermaid
{ir_mmd}
```

## Live collapses (both buttons still playing, same next card)

{md_table(collapse_rows, ["Chair", "Year", "Face", "Card", "Buttons", "Lands on"])}

## Terminal collapses (both buttons end the chair the same way)

{md_table(term_rows, ["Chair", "Year", "Face", "Card", "Buttons", "Ending"]) if term_rows else "(none)"}

## Real forks (the two buttons do not land in the same place)

{md_table(fork_rows, ["Chair", "Year", "Face", "Card", "Destinations"])}

## Graves (off-ramps)

{md_table(grave_rows, ["Chair", "Year", "Face", "Button", "Ending id", "Title"])}

## What still needs plotting

These are the collapses that look like they should be forks. They are not
forks yet. Flags that get set and then ignored are called out in the copy.

{md_table(plot_rows, ["Card now", "Later card", "What the graph does", "What to plot"])}

## How to regenerate

The dump walks `applyChoice`. The Python turns that JSON into this page.

Identity rule, from the dump: {graph["notes"]["identity"]}
"""


def write_outputs(graph: dict[str, Any]) -> None:
    ART.mkdir(parents=True, exist_ok=True)
    us = graph["chairs"]["us"]
    iran = graph["chairs"]["iran"]
    (ART / "rail-us.mmd").write_text(flowchart("us", us["nodes"], us["edges"]) + "\n")
    (ART / "rail-iran.mmd").write_text(flowchart("iran", iran["nodes"], iran["edges"]) + "\n")
    (ART / "rail-us-skeleton.mmd").write_text(skeleton("us", us["nodes"], us["edges"]) + "\n")
    (ART / "rail-iran-skeleton.mmd").write_text(skeleton("iran", iran["nodes"], iran["edges"]) + "\n")
    DOCS_PATH.write_text(docs_markdown(graph))


def self_test(graph: dict[str, Any]) -> None:
    us = graph["chairs"]["us"]
    iran = graph["chairs"]["iran"]
    assert any(n["cardId"] == "coup-1953" and n["phase"] == "playing" for n in us["nodes"])
    assert any(n["cardId"] == "coup-1953" and n["phase"] == "playing" for n in iran["nodes"])
    wr = [c for c in graph["collapses"] if c["cardId"] == "white-revolution-1963"]
    assert wr, "White Revolution should collapse"
    assert any(c["chair"] == "us" for c in wr)
    weapons = [c for c in graph["collapses"] if c["cardId"] == "weapons-1972"]
    assert weapons, "Nixon catalog should collapse"
    assert all(c["landCardId"] == "revolution-1979" for c in weapons)
    contra = [n for n in us["nodes"] + iran["nodes"] if n["cardId"] == "iran-contra-1985"]
    assert contra, "Contra still appears, catalog does not gate it"
    assert "hormuz-2019" in graph["unwiredPlayable"]
    us_c = classify(us["nodes"], us["edges"])
    terms = us_c["terminal_collapses"]
    assert any(c["from"]["cardId"] == "cup-1988" for c in terms), "US cup should terminal-collapse"
    graves = us_c["graves"] + classify(iran["nodes"], iran["edges"])["graves"]
    assert all(g["to"]["endingId"] != "none" for g in graves), "Rail hold is not a grave"
    print("self-test ok")


def main() -> None:
    parser = argparse.ArgumentParser(description="Picture the live rail as mermaid.")
    parser.add_argument("--json", type=Path, default=JSON_PATH)
    parser.add_argument("--refresh", action="store_true", help="re-walk the engine first")
    parser.add_argument("--self-test", action="store_true")
    parser.add_argument("--print", action="store_true", help="print mermaid to stdout")
    args = parser.parse_args()

    if args.refresh or not args.json.exists():
        refresh_dump(args.json)

    graph = load_graph(args.json)
    if args.self_test:
        self_test(graph)
        return

    write_outputs(graph)
    us = graph["chairs"]["us"]
    iran = graph["chairs"]["iran"]
    sys.stderr.write(
        f"US nodes {len(us['nodes'])} edges {len(us['edges'])} terminals {us['terminals']}\n"
        f"Iran nodes {len(iran['nodes'])} edges {len(iran['edges'])} terminals {iran['terminals']}\n"
        f"collapses {len(graph['collapses'])}\n"
        f"wrote {DOCS_PATH.relative_to(ROOT)}\n"
    )
    if args.print:
        print("%% US")
        print(flowchart("us", us["nodes"], us["edges"]))
        print()
        print("%% IRAN")
        print(flowchart("iran", iran["nodes"], iran["edges"]))


if __name__ == "__main__":
    main()
