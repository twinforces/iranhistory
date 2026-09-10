/**
 * What: walk the live engine and dump the decision graph.
 * Why: the rail is data. A second copy of the cards will drift.
 * Node identity is chair + card + face + ending + live buttons.
 * Flags that change which buttons are offered (hinterland_spent) fork
 * the graph. Meter tweaks that still land on the same next card collapse.
 */
import { pathToFileURL } from "node:url";
import {
  applyChoice,
  CARDS,
  choicesFor,
  currentCard,
  iranFaceOf,
  leaderFor,
  newGame,
  type Chair,
  type GameState,
} from "../src/model/index.ts";

export interface GraphNode {
  id: string;
  chair: Chair;
  cardId: string;
  year: number;
  yearLabel: string;
  title: string;
  era: string;
  face: string;
  phase: GameState["phase"];
  endingId: string | null;
  endingTitle: string | null;
}

export interface GraphEdge {
  from: string;
  to: string;
  choiceId: string;
  label: string;
  historical: boolean;
  artisticLicense: string | null;
  ending: string | null;
  faceChange: string | null;
}

export interface Collapse {
  chair: Chair;
  from: string;
  cardId: string;
  title: string;
  yearLabel: string;
  face: string;
  choiceLabels: string[];
  landCardId: string;
  landTitle: string;
  landFace: string;
}

export interface RailGraph {
  generated: string;
  chairs: {
    us: { nodes: GraphNode[]; edges: GraphEdge[]; terminals: number };
    iran: { nodes: GraphNode[]; edges: GraphEdge[]; terminals: number };
  };
  collapses: Collapse[];
  spine: { id: string; yearLabel: string; title: string }[];
  unwiredPlayable: string[];
  notes: { identity: string; secret: string; isolation: string };
}

function nodeId(state: GameState): string {
  const card = currentCard(state);
  const face = state.chair === "iran" ? iranFaceOf(state) : "us";
  const ending = state.ending?.id ?? "live";
  const live =
    state.phase === "playing" ? choicesFor(state).map((c) => c.id).sort().join(",") : "";
  return `${state.chair}:${card.id}:${face}:${state.phase}:${ending}:${live}`;
}

function nodeOf(state: GameState): GraphNode {
  const card = currentCard(state);
  const face = state.chair === "iran" ? iranFaceOf(state) : leaderYear(card.year);
  return {
    id: nodeId(state),
    chair: state.chair,
    cardId: card.id,
    year: card.year,
    yearLabel: card.yearLabel,
    title: card.title,
    era: card.era,
    face,
    phase: state.phase,
    endingId: state.ending?.id ?? null,
    endingTitle: state.ending?.title ?? null,
  };
}

function leaderYear(year: number): string {
  return leaderFor({ chair: "us", year, iranFace: "mossadegh" }).id;
}

function walk(chair: Chair): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const start = newGame({ chair, party: "R" });
  const nodes = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];
  const queue: GameState[] = [start];
  nodes.set(nodeId(start), nodeOf(start));

  while (queue.length) {
    const state = queue.shift()!;
    if (state.phase !== "playing") continue;
    const here = nodeId(state);
    const beforeFace = iranFaceOf(state);
    for (const choice of choicesFor(state)) {
      const next = applyChoice(state, choice.id);
      const dest = nodeOf(next);
      if (!nodes.has(dest.id)) {
        nodes.set(dest.id, dest);
        queue.push(next);
      }
      const afterFace = iranFaceOf(next);
      edges.push({
        from: here,
        to: dest.id,
        choiceId: choice.id,
        label: choice.label,
        historical: Boolean(choice.historical),
        artisticLicense: choice.artisticLicense ?? null,
        ending: choice.ending ?? next.ending?.id ?? null,
        faceChange:
          chair === "iran" && afterFace !== beforeFace ? `${beforeFace} -> ${afterFace}` : null,
      });
    }
  }

  return { nodes: [...nodes.values()], edges };
}

function collapsesFor(chair: Chair, nodes: GraphNode[], edges: GraphEdge[]): Collapse[] {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const out = new Map<string, GraphEdge[]>();
  for (const e of edges) {
    const list = out.get(e.from) ?? [];
    list.push(e);
    out.set(e.from, list);
  }
  const found: Collapse[] = [];
  for (const [from, list] of out) {
    if (list.length < 2) continue;
    const live = list.filter((e) => {
      const dest = byId.get(e.to);
      return dest && dest.phase === "playing";
    });
    if (live.length < 2) continue;
    const lands = new Set(live.map((e) => e.to));
    if (lands.size !== 1) continue;
    const src = byId.get(from);
    const dest = byId.get(live[0]!.to);
    if (!src || !dest) continue;
    found.push({
      chair,
      from,
      cardId: src.cardId,
      title: src.title,
      yearLabel: src.yearLabel,
      face: src.face,
      choiceLabels: live.map((e) => e.label),
      landCardId: dest.cardId,
      landTitle: dest.title,
      landFace: dest.face,
    });
  }
  return found;
}

function countTerminals(
  startId: string,
  edges: GraphEdge[],
  nodes: Map<string, GraphNode>,
): number {
  const adj = new Map<string, string[]>();
  for (const e of edges) {
    const list = adj.get(e.from) ?? [];
    list.push(e.to);
    adj.set(e.from, list);
  }
  const memo = new Map<string, number>();
  const visiting = new Set<string>();
  const walkCount = (id: string): number => {
    if (memo.has(id)) return memo.get(id)!;
    if (visiting.has(id)) return 0;
    visiting.add(id);
    const node = nodes.get(id);
    const nexts = adj.get(id) ?? [];
    let n = 0;
    if (!node || node.phase === "ended" || nexts.length === 0) {
      n = 1;
    } else {
      for (const dest of nexts) n += walkCount(dest);
    }
    visiting.delete(id);
    memo.set(id, n);
    return n;
  };
  return walkCount(startId);
}

function startId(chair: Chair, nodes: GraphNode[]): string {
  const hit = nodes.find((n) => n.cardId === "coup-1953" && n.phase === "playing");
  if (!hit) throw new Error(`no 1953 start for ${chair}`);
  return hit.id;
}

export function buildGraph(): RailGraph {
  const us = walk("us");
  const iran = walk("iran");
  const usNodes = new Map(us.nodes.map((n) => [n.id, n]));
  const iranNodes = new Map(iran.nodes.map((n) => [n.id, n]));

  const playable = CARDS.filter((c) => c.status === "playable" && !c.secret).map((c) => c.id);
  const reached = new Set([...us.nodes, ...iran.nodes].map((n) => n.cardId));
  const unwiredPlayable = playable.filter((id) => !reached.has(id));
  const spine = CARDS.filter((c) => c.status === "spine").map((c) => ({
    id: c.id,
    yearLabel: c.yearLabel,
    title: c.title,
  }));

  return {
    generated: new Date().toISOString(),
    chairs: {
      us: {
        ...us,
        terminals: countTerminals(startId("us", us.nodes), us.edges, usNodes),
      },
      iran: {
        ...iran,
        terminals: countTerminals(startId("iran", iran.nodes), iran.edges, iranNodes),
      },
    },
    collapses: [
      ...collapsesFor("us", us.nodes, us.edges),
      ...collapsesFor("iran", iran.nodes, iran.edges),
    ],
    spine,
    unwiredPlayable,
    notes: {
      identity:
        "Nodes are chair + card + face + ending + live choice ids. Flags that change buttons (hinterland_spent) fork. Bars and clocks do not. A White Revolution that only moves liberals collapses.",
      secret: "1938 is a year-click egg, not a 1953 button. Not in this walk.",
      isolation: "Hormuz 2019 sits on the 1953 walk after Europe bounces. 1938 is a year-click egg.",
    },
  };
}

function isMain(): boolean {
  const arg = process.argv[1];
  if (!arg) return false;
  return import.meta.url === pathToFileURL(arg).href;
}

if (isMain()) {
  const graph = buildGraph();
  if (process.argv.includes("--print-stats")) {
    const { chairs, collapses } = graph;
    process.stderr.write(
      `US nodes ${chairs.us.nodes.length} edges ${chairs.us.edges.length} terminals ${chairs.us.terminals}\n` +
        `Iran nodes ${chairs.iran.nodes.length} edges ${chairs.iran.edges.length} terminals ${chairs.iran.terminals}\n` +
        `collapses ${collapses.length}\n`,
    );
  }
  process.stdout.write(`${JSON.stringify(graph, null, 2)}\n`);
}
