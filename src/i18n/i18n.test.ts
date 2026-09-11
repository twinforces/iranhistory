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
    assert.equal(ui("en", "peaceExits"), "Peace exits");
    assert.equal(ui("fa", "peaceExits"), "خروج‌های صلح");
    assert.equal(ui("en", "nukesCounter"), "Iran gets nukes");
    assert.equal(ui("en", "csoCounter"), "Convenience store owners");
    assert.match(ui("en", "csoBlurb"), /convenience store/);
    assert.match(ui("en", "memoirsBlurb"), /best selling memoirs/);
    assert.equal(ui("en", "moralVictories"), "Moral victories");
    assert.match(ui("en", "moralBlurb"), /split is on the meters/);
    assert.equal(ui("en", "exitWrListen"), "You did not force the vote");
    assert.equal(ui("en", "exitUsVillages"), "You made him spend on the villages");
    assert.equal(ui("en", "exitFordMix"), "You split the invoice");
    assert.equal(ui("fa", "exitWrListen"), "رأی را تحمیل نکردی");
    assert.equal(ui("en", "navNote"), "Author's Note");
    assert.match(ui("en", "noteP3"), /Hindsight is 20\/20/);
    assert.equal(/—/.test(ui("en", "noteP2") + ui("en", "noteP3")), false);
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

  it("September 11 Farsi still names Al-Qaeda, not Tehran", () => {
    const us = new TrainViewModel("us", "R", "nine-eleven-2001").getState("fa");
    assert.match(us.card.title, /۱۱ سپتامبر/);
    assert.match(us.card.situation, /القاعده/);
    assert.match(us.card.situation, /خامنه‌ای این هفته بالای صفحه نیست/);
    const iran = new TrainViewModel("iran", "D", "baghdad-2003").getState("fa");
    assert.match(iran.card.situation, /سرباز آمریکایی/);
  });
});
