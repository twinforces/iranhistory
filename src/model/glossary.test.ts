import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { glossaryById, linkify } from "./glossary.ts";

describe("glossary", () => {
  it("marks Ajax, Mossadegh, CIA, and MI6 in the 1953 lede", () => {
    const parts = linkify(
      "Mossadegh is elected PM, nationalizes the oil. Britain wants it back. CIA and MI6 would like to run a coup.",
    );
    const ids = parts.map((p) => p.id).filter(Boolean);
    assert.equal(ids.includes("mossadegh"), true);
    assert.equal(ids.includes("cia"), true);
    assert.equal(ids.includes("mi6"), true);
    assert.equal(ids.includes("ajax"), false);
  });

  it("explains Ajax on the title and the court in a rant", () => {
    const title = linkify("Ajax is still a cable");
    assert.equal(title.some((p) => p.id === "ajax" && p.text === "Ajax"), true);
    assert.equal(title.some((p) => p.id === "cable"), true);
    const ajax = glossaryById("ajax");
    assert.match(ajax?.definition ?? "", /code name/);
    assert.match(ajax?.definition ?? "", /coup/);
    assert.match(ajax?.definition ?? "", /Shah/);
    const rant = linkify("The court still has the army. We have the square.");
    assert.equal(rant.some((p) => p.id === "court"), true);
    const young = glossaryById("shah");
    assert.match(young?.definition ?? "", /suitcase/);
  });

  it("does not swallow ordinary words", () => {
    const parts = linkify("The next card is already written.");
    assert.equal(parts.some((p) => p.id), false);
  });

  it("explains a second clip as evening-news footage, not a haircut", () => {
    const parts = linkify("Do not sit a second clip.");
    assert.equal(parts.some((p) => p.id === "clip"), true);
    const def = glossaryById("clip")?.definition ?? "";
    assert.match(def, /evening news/);
    assert.match(def, /haircut/);
    const Marines = linkify("Bring the Marines home");
    assert.equal(Marines.some((p) => p.id === "marines"), true);
  });

  it("marks White Revolution and Khomeini", () => {
    const parts = linkify(
      "Kennedy wants a White Revolution. Khomeini is finding his voice. The Family Protection Law is on the books.",
    );
    const ids = parts.map((p) => p.id).filter(Boolean);
    assert.equal(ids.includes("white-revolution"), true);
    assert.equal(ids.includes("khomeini"), true);
    assert.equal(ids.includes("family-protection"), true);
    assert.equal(ids.includes("kennedy"), true);
  });

  it("names Kennedy a Democrat", () => {
    const k = glossaryById("kennedy");
    assert.match(k?.definition ?? "", /Democrat/);
    assert.equal(/Republican/.test(k?.definition ?? ""), false);
  });

  it("names Reagan a Republican", () => {
    const r = glossaryById("reagan");
    assert.match(r?.definition ?? "", /Republican/);
    assert.equal(/Democrat/.test(r?.definition ?? ""), false);
  });

  it("names Khomeini as the Imam after 1979, not only the exile", () => {
    const k = glossaryById("khomeini");
    assert.match(k?.definition ?? "", /Imam/);
    assert.match(k?.definition ?? "", /letterhead/);
    const parts = linkify("The Imam wants the parts. Khomeini is tired.");
    const ids = parts.map((p) => p.id).filter(Boolean);
    assert.equal(ids.includes("khomeini"), true);
  });

  it("marks Stalin in a turban and the Soviet sphere on the Mossadegh dead end", () => {
    const parts = linkify(
      "It is a half-commie theocracy. Stalin in a turban. The Saudis enter the Soviet sphere.",
    );
    const ids = parts.map((p) => p.id).filter(Boolean);
    assert.equal(ids.includes("stalin-turban"), true);
    assert.equal(ids.includes("soviet-sphere"), true);
    const s = glossaryById("stalin-turban");
    assert.match(s?.definition ?? "", /You never sit him/);
    assert.equal(/You are Stalin/i.test(s?.definition ?? ""), false);
  });

  it("names Khamenei as president, not the Imam", () => {
    const k = glossaryById("khamenei");
    assert.match(k?.definition ?? "", /President/);
    assert.match(k?.definition ?? "", /not the Imam/);
    assert.equal(/You are Khomeini/i.test(k?.definition ?? ""), false);
    const parts = linkify("Khamenei sits. The Majlis had the vote. Rajai lasted two weeks.");
    const ids = parts.map((p) => p.id).filter(Boolean);
    assert.equal(ids.includes("khamenei"), true);
    assert.equal(ids.includes("majlis"), true);
    assert.equal(ids.includes("rajai"), true);
  });
});
