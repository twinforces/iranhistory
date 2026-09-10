import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { graveLeader, imamFor, leaderFor, partyForUsYear } from "./leaders.ts";

describe("leaderFor", () => {
  it("seats Ike on the 1953 US chair", () => {
    const l = leaderFor({ chair: "us", year: 1953, iranFace: "mossadegh" });
    assert.equal(l.id, "ike");
    assert.equal(l.youAre, "You are Ike");
    assert.equal(l.party, "R");
    assert.equal(l.partyLabel, "Republican");
  });

  it("seats Mossadegh until the coup, then the Shah", () => {
    const before = leaderFor({ chair: "iran", year: 1953, iranFace: "mossadegh" });
    const after = leaderFor({ chair: "iran", year: 1953, iranFace: "shah" });
    assert.equal(before.id, "mossadegh");
    assert.equal(before.youAre, "You are Mossadegh");
    assert.equal(after.id, "shah");
    assert.equal(after.youAre, "You are the Shah");
    assert.notEqual(before.portrait, after.portrait);
    assert.equal(before.party, null);
  });

  it("seats Carter in 1979 and Trump in 2019", () => {
    const carter = leaderFor({ chair: "us", year: 1979, iranFace: "mossadegh" });
    assert.equal(carter.id, "carter");
    assert.equal(carter.party, "D");
    assert.equal(carter.partyLabel, "Democrat");
    assert.equal(leaderFor({ chair: "us", year: 2019, iranFace: "mossadegh" }).youAre, "You are Trump");
    const reagan = leaderFor({ chair: "us", year: 1981, iranFace: "banisadr" });
    assert.equal(reagan.id, "reagan");
    assert.equal(reagan.youAre, "You are Reagan");
    assert.equal(reagan.party, "R");
    assert.equal(reagan.partyLabel, "Republican");
    assert.equal(leaderFor({ chair: "us", year: 1980, iranFace: "banisadr" }).id, "carter");
  });

  it("seats Kennedy in 1963 as a Democrat, Nixon in 1972 as a Republican", () => {
    const kennedy = leaderFor({ chair: "us", year: 1963, iranFace: "shah" });
    assert.equal(kennedy.id, "kennedy");
    assert.equal(kennedy.youAre, "You are Kennedy");
    assert.equal(kennedy.party, "D");
    assert.equal(kennedy.partyLabel, "Democrat");
    const nixon = leaderFor({ chair: "us", year: 1972, iranFace: "shah" });
    assert.equal(nixon.id, "nixon");
    assert.equal(nixon.youAre, "You are Nixon");
    assert.equal(nixon.party, "R");
    assert.equal(nixon.partyLabel, "Republican");
  });

  it("seats Bazargan after the Shah falls, Banisadr after Bazargan resigns", () => {
    const l = leaderFor({ chair: "iran", year: 1979, iranFace: "bazargan" });
    assert.equal(l.id, "bazargan");
    assert.equal(l.youAre, "You are the letterhead");
    assert.notEqual(l.portrait, leaderFor({ chair: "iran", year: 1979, iranFace: "shah" }).portrait);
    const b = leaderFor({ chair: "iran", year: 1980, iranFace: "banisadr" });
    assert.equal(b.id, "banisadr");
    assert.equal(b.youAre, "You are the letterhead");
    const k = leaderFor({ chair: "iran", year: 1981, iranFace: "khamenei" });
    assert.equal(k.id, "khamenei");
    assert.equal(k.youAre, "You are the letterhead");
    assert.equal(/You are Khomeini/i.test(k.youAre), false);
    assert.equal(k.role.includes("Letterhead"), true);
    assert.equal(k.portrait, b.portrait);
    assert.equal(k.portrait, "/leaders/letterhead.jpg");
    assert.equal(k.name, "Ali Khamenei");
    assert.equal(b.name, "Abolhassan Banisadr");
  });

  it("the Imam is a second plate, never the seated player", () => {
    const beside = imamFor({ chair: "iran", iranFace: "bazargan" });
    assert.equal(beside?.id, "khomeini");
    assert.equal(beside?.playing, "The Imam");
    assert.equal(beside?.youAre, "He has the guns");
    assert.equal(/You are Khomeini/i.test(beside?.youAre ?? ""), false);
    assert.equal(imamFor({ chair: "iran", iranFace: "banisadr" })?.id, "khomeini");
    assert.equal(imamFor({ chair: "iran", iranFace: "khamenei" })?.id, "khomeini");
    assert.equal(imamFor({ chair: "iran", iranFace: "shah" }), null);
    assert.equal(imamFor({ chair: "iran", iranFace: "mossadegh" }), null);
    assert.equal(imamFor({ chair: "us", iranFace: "bazargan" }), null);
    const player = leaderFor({ chair: "iran", year: 1979, iranFace: "bazargan" });
    assert.equal(player.id, "bazargan");
    assert.notEqual(player.portrait, beside?.portrait);
  });

  it("Mossadegh's dead end is Stalin in a turban, never a seated player", () => {
    const g = graveLeader("satrap_1953");
    assert.equal(g?.id, "stalin_turban");
    assert.equal(g?.youAre, "You get Stalin in a turban");
    assert.equal(/You are Stalin/i.test(g?.youAre ?? ""), false);
    assert.equal(/You are Khomeini/i.test(g?.youAre ?? ""), false);
    assert.equal(g?.playing, "The satrap");
    assert.match(g?.role ?? "", /theocracy/);
    assert.equal(g?.portrait, "/leaders/stalin-turban.jpg");
    assert.equal(graveLeader("mossadegh_deal")?.id, "stalin_turban");
    assert.equal(graveLeader("mossadegh_falls")?.id, "stalin_turban");
    assert.equal(graveLeader("shah_flees"), null);
    assert.equal(graveLeader(null), null);
    const live = leaderFor({ chair: "iran", year: 1953, iranFace: "mossadegh" });
    assert.equal(live.id, "mossadegh");
    assert.notEqual(live.portrait, g?.portrait);
  });
});

describe("partyForUsYear", () => {
  it("follows the seated president, not the 1953 default", () => {
    assert.equal(partyForUsYear(1953), "R");
    assert.equal(partyForUsYear(1963), "D");
    assert.equal(partyForUsYear(1972), "R");
    assert.equal(partyForUsYear(1979), "D");
    assert.equal(partyForUsYear(1981), "R");
    assert.equal(partyForUsYear(2019), "R");
  });
});
