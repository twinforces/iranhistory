import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { applyChoice, newGame } from "./engine.ts";
import {
  detectExits,
  EXITS,
  memoryMuseumStore,
  parseMuseum,
  peaceCount,
  serializeMuseum,
} from "./exits.ts";

describe("peace exits catalog", () => {
  it("has two US exits and three Iran exits, plus the nuke splat", () => {
    assert.equal(peaceCount("us"), 2);
    assert.equal(peaceCount("iran"), 3);
    assert.equal(EXITS.filter((e) => e.kind === "nukes").length, 1);
    assert.equal(EXITS.filter((e) => e.kind === "cso").length, 9);
    assert.equal(EXITS.filter((e) => e.kind === "memoirs").length, 1);
  });

  it("does not put unfound names in the serialized bag", () => {
    const raw = serializeMuseum(new Set(["hinterland", "nope"]));
    assert.equal(raw.includes("hinterland"), true);
    assert.equal(raw.includes("nope"), false);
    assert.equal(raw.includes("fordow"), false);
    const back = parseMuseum(raw);
    assert.equal(back.has("hinterland"), true);
    assert.equal(back.has("fordow"), false);
  });

  it("detects the hinterland hold and the JCPOA hold by ending", () => {
    let g = newGame({ chair: "iran", party: "D", cardId: "weapons-1972" });
    g = applyChoice(g, "ir-spend-villages");
    g = applyChoice(g, "ir-keep-catalog");
    const hold = applyChoice(g, "ir-shah-hold");
    assert.deepEqual(detectExits(hold), ["hinterland"]);

    const limits = applyChoice(newGame({ chair: "iran", party: "D", cardId: "bounce-2019" }), "ir-keep-limits");
    assert.deepEqual(detectExits(limits), ["limits"]);
  });

  it("detects Hamas cut off per chair, and stop-after-Fordow", () => {
    const us = applyChoice(newGame({ chair: "us", party: "R", cardId: "saudi-accord-2023" }), "us-private-saudi");
    assert.deepEqual(detectExits(us), ["hamas-us"]);
    const iran = applyChoice(
      newGame({ chair: "iran", party: "D", cardId: "saudi-accord-2023" }),
      "ir-leave-hamas",
    );
    assert.deepEqual(detectExits(iran), ["hamas-iran"]);
    const fordow = applyChoice(
      newGame({ chair: "us", party: "R", cardId: "the-leader-2026" }),
      "us-stop-fordow",
    );
    assert.deepEqual(detectExits(fordow), ["fordow"]);
    assert.equal(fordow.ending?.id, "none");
  });

  it("memory store survives a second load the way chair switch remounts", () => {
    const store = memoryMuseumStore();
    store.save(new Set(["hamas-us"]));
    const again = store.load();
    assert.equal(again.has("hamas-us"), true);
    assert.equal(again.has("fordow"), false);
  });

  it("7-Eleven letterhead morals tick a convenience store, not a grave", () => {
    const store = applyChoice(newGame({ chair: "iran", party: "D", cardId: "resigned-1979" }), "ir-refuse-letterhead");
    assert.deepEqual(detectExits(store), ["cso-stamp"]);
    assert.equal(store.phase, "playing");
    const fpl = applyChoice(newGame({ chair: "iran", party: "D", cardId: "veil-1979" }), "ir-keep-fpl");
    assert.deepEqual(detectExits(fpl), ["cso-fpl"]);
  });

  it("Mossadegh hiring the British engineers is the first convenience store", () => {
    const g = applyChoice(newGame({ chair: "iran", party: "D" }), "ir-deal-london");
    assert.equal(g.ending?.id, "mossadegh_street");
    assert.deepEqual(detectExits(g), ["cso-london"]);
    const moscow = applyChoice(newGame({ chair: "iran", party: "D" }), "ir-deal-moscow");
    assert.deepEqual(detectExits(moscow), []);
  });

  it("leaving Hamas is a peace exit, not a convenience store", () => {
    const leave = applyChoice(newGame({ chair: "iran", party: "D", cardId: "saudi-accord-2023" }), "ir-leave-hamas");
    assert.deepEqual(detectExits(leave), ["hamas-iran"]);
  });

  it("Hail Mary is not a memoir; election_loss is", () => {
    const hail = applyChoice(newGame({ chair: "us", party: "R", cardId: "election-1980" }), "us-hail-mary");
    assert.deepEqual(detectExits(hail), []);
    const dumped = {
      ...newGame({ chair: "us", party: "D", cardId: "election-1980" }),
      ending: { id: "election_loss" as const, title: "The other party takes the chair", referee: "US death is electoral." },
    };
    assert.deepEqual(detectExits(dumped), ["memoirs"]);
  });
});
