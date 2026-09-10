import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildGraph } from "./dump-rail-graph.ts";

describe("rail graph from the live engine", () => {
  const graph = buildGraph();

  it("starts both chairs on coup-1953", () => {
    for (const chair of ["us", "iran"] as const) {
      const start = graph.chairs[chair].nodes.find(
        (n) => n.cardId === "coup-1953" && n.phase === "playing",
      );
      assert.ok(start, `${chair} missing 1953`);
    }
  });

  it("detects White Revolution as a collapse on both chairs", () => {
    const hits = graph.collapses.filter((c) => c.cardId === "white-revolution-1963");
    assert.equal(hits.some((c) => c.chair === "us"), true);
    assert.equal(hits.some((c) => c.chair === "iran" && c.face === "shah"), true);
    for (const hit of hits) {
      assert.equal(hit.landCardId, "sofa-1964");
      assert.equal(hit.choiceLabels.length, 2);
    }
  });

  it("detects Nixon catalog as a US collapse that still reaches Contra", () => {
    const weapons = graph.collapses.filter((c) => c.cardId === "weapons-1972");
    assert.equal(weapons.some((c) => c.chair === "us"), true);
    for (const hit of weapons.filter((c) => c.chair === "us")) {
      assert.equal(hit.landCardId, "pipeline-1975");
    }
    const contraUs = graph.chairs.us.nodes.some(
      (n) => n.cardId === "iran-contra-1985" && n.phase === "playing",
    );
    const contraIr = graph.chairs.iran.nodes.some(
      (n) => n.cardId === "iran-contra-1985" && n.phase === "playing",
    );
    assert.equal(contraUs, true);
    assert.equal(contraIr, true);
  });

  it("does not treat 1953 walk-away as a collapse", () => {
    assert.equal(
      graph.collapses.some((c) => c.cardId === "coup-1953"),
      false,
    );
  });

  it("funnels the Shah who leaves into Bazargan; hinterland is a real hold", () => {
    const hits = graph.collapses.filter((c) => c.cardId === "revolution-1979");
    assert.equal(hits.some((c) => c.chair === "iran" && c.face === "shah"), true);
    assert.equal(hits.some((c) => c.chair === "iran" && c.face === "mossadegh"), false);
    for (const hit of hits.filter((c) => c.chair === "iran")) {
      assert.equal(hit.landCardId, "veil-1979");
      assert.equal(hit.landFace, "bazargan");
    }
    const hold = graph.chairs.iran.nodes.find((n) => n.endingId === "shah_holds");
    assert.ok(hold, "hinterland hold never fired");
  });

  it("Banisadr leaving seats Khamenei; defying is the same next event", () => {
    const collapses = graph.collapses.filter((c) => c.cardId === "impeached-1981");
    assert.equal(
      collapses.some((c) => c.landCardId === "seated-1981" && c.landFace === "khamenei"),
      true,
    );
    const khamenei = graph.chairs.iran.nodes.find(
      (n) => n.cardId === "seated-1981" && n.face === "khamenei" && n.phase === "playing",
    );
    assert.ok(khamenei, "Khamenei never sat");
    const contra = graph.chairs.iran.nodes.some(
      (n) => n.cardId === "iran-contra-1985" && n.face === "khamenei" && n.phase === "playing",
    );
    assert.equal(contra, true);
  });

  it("keeps 1938 off the 1953 walk; Hormuz sits after the bounce", () => {
    assert.deepEqual(graph.unwiredPlayable, []);
    const ids = [...graph.chairs.us.nodes, ...graph.chairs.iran.nodes].map((n) => n.cardId);
    assert.equal(ids.includes("hitler-1938"), false);
    assert.equal(ids.includes("hormuz-2019"), true);
    assert.equal(ids.includes("sofa-1964"), true);
    assert.equal(ids.includes("the-leader-2026"), true);
  });

  it("Reagan's 1982 tilt sits between the oath and Beirut; Iran skips it", () => {
    const tilt = graph.chairs.us.nodes.find((n) => n.cardId === "tilt-1982" && n.phase === "playing");
    assert.ok(tilt, "1982 tilt never sat");
    assert.equal(
      graph.chairs.iran.nodes.some((n) => n.cardId === "tilt-1982"),
      false,
    );
    const fromOath = graph.chairs.us.edges.some(
      (e) => e.choiceId === "us-sit-reagan" && e.to.includes("tilt-1982"),
    );
    assert.equal(fromOath, true);
    const toBeirut = graph.chairs.us.edges.some(
      (e) => e.choiceId === "us-cia-baghdad" && e.to.includes("lebanon-1983"),
    );
    assert.equal(toBeirut, true);
  });
});
