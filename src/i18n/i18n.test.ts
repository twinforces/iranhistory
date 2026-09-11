import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { playableCards } from "../model/index.ts";
import { TrainViewModel, truthTagCaption } from "../viewmodel/TrainViewModel.ts";
import { CARDS_FA } from "./cards.ts";
import { faDigits } from "./digits.ts";
import { applyDocumentLocale, isLocale } from "./locale.ts";
import { ui } from "./ui.ts";

describe("Farsi overlay", () => {
  it("covers every playable card", () => {
    const missing = playableCards()
      .map((c) => c.id)
      .filter((id) => !CARDS_FA[id]);
    assert.deepEqual(missing, []);
  });

  it("getState fa paints coup-1953 in Persian", () => {
    const iran = new TrainViewModel("iran", "D").getState("fa");
    assert.match(iran.card.title, /[\u0600-\u06FF]/);
    assert.match(iran.card.title, /خطر/);
    assert.match(iran.card.situation, /[\u0600-\u06FF]/);
    assert.equal(iran.card.actionPrompt, "چه می‌کنی؟");
    assert.match(iran.leader.youAre, /مصدق/);
    for (const c of iran.choices) {
      assert.match(c.label, /[\u0600-\u06FF]/);
      assert.equal(/historical|what happened|تاریخی/.test(c.label), false);
    }
    const us = new TrainViewModel("us", "R").getState("fa");
    assert.match(us.card.title, /[\u0600-\u06FF]/);
    assert.notEqual(us.card.title, iran.card.title);
    assert.match(us.leader.youAre, /آیزنهاور/);
    assert.equal(us.card.yearLabel, "۱۹۵۳");
  });

  it("English path is unchanged", () => {
    const uiEn = new TrainViewModel("us", "R").getState();
    assert.equal(uiEn.card.title, "To Coup or Not to Coup");
    assert.equal(uiEn.leader.youAre, "You are Ike");
    assert.equal(uiEn.card.yearLabel, "1953");
    assert.equal(truthTagCaption("LT").name, "Lawyer true");
  });

  it("truth tags and chrome localize", () => {
    assert.equal(ui("fa", "product"), "قطار به سوی جنگ");
    assert.equal(truthTagCaption("LT", "fa").name, "حقیقت حقوقی");
    assert.match(truthTagCaption("IT", "fa").blurb, /انگیزه/);
    assert.equal(faDigits(1953), "۱۹۵۳");
    assert.equal(faDigits("1982"), "۱۹۸۲");
    assert.equal(isLocale("fa"), true);
    assert.equal(isLocale("de"), false);
  });

  it("applyDocumentLocale sets rtl", () => {
    const classes = new Set<string>();
    const root = {
      lang: "en",
      dir: "ltr",
      classList: {
        toggle(name: string, on: boolean) {
          if (on) classes.add(name);
          else classes.delete(name);
        },
      },
    };
    const prior = globalThis.document;
    (globalThis as { document?: unknown }).document = { documentElement: root };
    try {
      applyDocumentLocale("fa");
      assert.equal(root.lang, "fa");
      assert.equal(root.dir, "rtl");
      assert.equal(classes.has("locale-fa"), true);
      applyDocumentLocale("en");
      assert.equal(root.lang, "en");
      assert.equal(root.dir, "ltr");
      assert.equal(classes.has("locale-fa"), false);
    } finally {
      if (prior === undefined) delete (globalThis as { document?: unknown }).document;
      else (globalThis as { document?: unknown }).document = prior;
    }
  });

  it("Beirut sermon still names chemistry and Death to Europe", () => {
    const iran = new TrainViewModel("iran", "D", "lebanon-1983").getState("fa");
    const rants = iran.card.briefings.map((b) => b.rant).join(" ");
    assert.match(rants, /شیمیایی/);
    assert.match(rants, /مرگ بر اروپا/);
    assert.match(rants, /مرگ بر آمریکا/);
    assert.match(rants, /مرگ بر اسرائیل/);
    assert.match(iran.slogan ?? "", /مرگ بر اروپا/);
  });
});
