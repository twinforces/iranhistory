import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { applyChoice, newGame } from "./engine.ts";
import { SOFT_PURGE_IRGC } from "./constants.ts";
import {
  detectExits,
  EXITS,
  memoryMuseumStore,
  parseMuseum,
  peaceCount,
  serializeMuseum,
} from "./exits.ts";

describe("peace exits catalog", () => {
  it("has one US exit and three Iran exits, plus the nuke splat", () => {
    assert.equal(peaceCount("us"), 1);
    assert.equal(peaceCount("iran"), 3);
    assert.equal(EXITS.filter((e) => e.kind === "nukes").length, 1);
    assert.equal(EXITS.filter((e) => e.kind === "cso").length, 13);
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

  it("detects Hamas cut off per chair. Stop-after-Fordow is not peace", () => {
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
    assert.deepEqual(detectExits(fordow), []);
    assert.equal(fordow.ending?.id, "none");
    assert.notEqual(fordow.clocks.nuke_breakout_months, 0);
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
    assert.equal(moscow.ending?.id, "mossadegh_falls");
    assert.deepEqual(detectExits(moscow), ["cso-moscow"]);
  });

  it("surviving graves are stores; shot graves are not", () => {
    const face = applyChoice(newGame({ chair: "iran", party: "D", cardId: "lebanon-1983" }), "ir-no-export");
    assert.equal(face.ending?.id, "face_no_guns");
    assert.deepEqual(detectExits(face), ["cso-face"]);
    const cup = applyChoice(newGame({ chair: "iran", party: "D", cardId: "cup-1988" }), "ir-refuse-cup");
    assert.equal(cup.ending?.id, "face_no_guns");
    assert.deepEqual(detectExits(cup), ["cso-face"]);
    const g = newGame({ chair: "iran", party: "D", cardId: "stuxnet-2010" });
    g.bars.irgc = SOFT_PURGE_IRGC - 1;
    const killed = applyChoice(g, "ir-pause-stux");
    assert.equal(killed.ending?.id, "irgc_purge");
    assert.deepEqual(detectExits(killed), ["cso-purge"]);
    const sidelined = {
      ...newGame({ chair: "iran", party: "D", cardId: "stuxnet-2010" }),
      ending: {
        id: "leader_sideline" as const,
        title: "Sidelined twice",
        referee: "You still have a pulse.",
      },
    };
    assert.deepEqual(detectExits(sidelined), ["cso-sideline"]);
    const kuwait = applyChoice(newGame({ chair: "iran", party: "D", cardId: "kuwait-1990" }), "ir-side-saddam");
    assert.equal(kuwait.ending?.id, "kuwait_grave");
    assert.deepEqual(detectExits(kuwait), []);
    const war = applyChoice(newGame({ chair: "iran", party: "D", cardId: "the-leader-2026" }), "ir-keep-war");
    assert.equal(war.ending?.id, "keep_the_war");
    assert.deepEqual(detectExits(war), []);
    const imam = applyChoice(newGame({ chair: "iran", party: "D", cardId: "the-leader-2026" }), "ir-hormuz-memo");
    assert.equal(imam.ending?.id, "the_leader");
    assert.deepEqual(detectExits(imam), []);
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
