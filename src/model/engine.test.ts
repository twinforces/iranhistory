import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  applyChoice,
  canTimeTravel,
  choicesFor,
  currentCard,
  isGrey,
  newGame,
  timeTravelBackOne,
  timeTravelFurtherBack,
} from "./engine.ts";
import { cardById, CARDS } from "./cards.ts";
import { SEED_2019, SOFT_PURGE_IRGC } from "./constants.ts";
import { RECEIPTS } from "./receipts.ts";

describe("newGame", () => {
  it("starts the US chair on 1953 with clocks off", () => {
    const g = newGame({ chair: "us", party: "R" });
    assert.equal(g.cardId, "coup-1953");
    assert.equal(g.phase, "playing");
    assert.equal(g.clocks.nuke_breakout_months, null);
    assert.equal(g.bars.my_party > 0, true);
  });

  it("seeds 2019 isolation play with historical-ish bars", () => {
    const g = newGame({ chair: "us", party: "R", cardId: "hormuz-2019" });
    assert.equal(g.cardId, "hormuz-2019");
    assert.equal(g.bars.irgc, SEED_2019.bars.irgc);
    assert.equal(g.clocks.nuke_breakout_months, SEED_2019.clocks.nuke_breakout_months);
  });
});

describe("1953 US", () => {
  it("back-the-Shah is the golden path and opens Atoms for Peace", () => {
    const g = newGame({ chair: "us", party: "R" });
    const next = applyChoice(g, "us-back-shah");
    assert.equal(next.ending?.id === "satrap_1953", false);
    assert.equal(next.phase, "playing");
    assert.equal(next.cardId, "atoms-1957");
    assert.equal(next.clocks.future_irgc_grudge >= 30, true);
    assert.equal(next.bars.street < g.bars.street, true);
  });

  it("walk-away is AL satrap game over", () => {
    const g = newGame({ chair: "us", party: "D" });
    const next = applyChoice(g, "us-walk");
    assert.equal(next.phase, "ended");
    assert.equal(next.ending?.id, "satrap_1953");
    assert.match(next.ending?.referee ?? "", /Stalin in a turban/);
    assert.match(next.ending?.referee ?? "", /Saudis enter the Soviet sphere/);
    assert.match(next.ending?.referee ?? "", /half-commie theocracy/);
    assert.equal(next.bars.saudis < g.bars.saudis, true);
  });

  it("does not offer a third liberal-fantasy button", () => {
    const card = cardById("coup-1953");
    assert.ok(card);
    assert.equal(card.usChoices.length, 2);
    assert.equal(
      card.usChoices.some((c) => /mossadegh with aid/i.test(c.label)),
      false,
    );
  });

  it("choice copy does not announce the ending", () => {
    const card = cardById("coup-1953");
    assert.ok(card);
    const blob = [...card.usChoices, ...card.iranChoices].map((c) => `${c.label} ${c.summary}`).join(" ");
    assert.equal(/game over|satrap|1979|may still come|stalin|turban|theocracy/i.test(blob), false);
    assert.match(card.situation ?? "", /would like to run a coup/);
    assert.match(card.referee.paragraphs.join(" "), /has not happened yet/);
    assert.equal(card.titleUs, "To Coup or Not to Coup");
    assert.equal(card.titleIran, "Danger: Coup!");
  });
});

describe("1953 Iran", () => {
  it("nationalize deposes Mossadegh and seats the Shah", () => {
    const g = newGame({ chair: "iran", party: "D" });
    const a = applyChoice(g, "ir-nationalize");
    assert.equal(a.phase, "playing");
    assert.equal(a.cardId, "deposed-1953");
    assert.equal(a.flags.iran_face, "shah");
    assert.equal(a.ending, null);
    const seated = applyChoice(a, "ir-sit-throne");
    assert.equal(seated.cardId, "atoms-1957");
    assert.equal(seated.flags.iran_face, "shah");
  });

  it("hiring the British engineers is the street grave, not a later chair", () => {
    const b = applyChoice(newGame({ chair: "iran", party: "D" }), "ir-deal-london");
    assert.equal(b.phase, "ended");
    assert.equal(b.ending?.id, "mossadegh_street");
    assert.match(b.ending?.referee ?? "", /Lawrence/);
    assert.match(b.ending?.referee ?? "", /Venezuela/);
    assert.equal(b.cardId, "coup-1953");
  });

  it("a deal with Moscow is Stalin in a turban", () => {
    const g = newGame({ chair: "iran", party: "D" });
    const next = applyChoice(g, "ir-deal-moscow");
    assert.equal(next.ending?.id, "mossadegh_falls");
    assert.match(next.ending?.referee ?? "", /Stalin in a turban/);
    assert.match(next.ending?.referee ?? "", /Saudis enter the Soviet sphere/);
    assert.equal(next.bars.saudis < g.bars.saudis, true);
  });

  it("once the Shah is seated the suitcase is not a button", () => {
    const a = applyChoice(newGame({ chair: "iran", party: "D" }), "ir-nationalize");
    const card = currentCard(a);
    assert.equal(card.iranChoices.some((c) => c.id === "ir-pack-suitcase"), false);
    assert.equal(card.iranChoices.length, 1);
    assert.equal(card.iranChoices[0]?.id, "ir-sit-throne");
  });
});

describe("2019 US abort vs bomb", () => {
  it("abort drops my_party if you ran tough and does not reveal a hole", () => {
    const g = newGame({ chair: "us", party: "R", cardId: "hormuz-2019" });
    const next = applyChoice(g, "us-abort");
    assert.equal(next.bars.my_party < g.bars.my_party, true);
    assert.equal(next.clocks.drone_holes_known, g.clocks.drone_holes_known);
  });

  it("bomb can reveal a hole and rally IRGC", () => {
    const g = newGame({ chair: "us", party: "R", cardId: "hormuz-2019" });
    const next = applyChoice(g, "us-bomb");
    assert.equal(next.clocks.drone_holes_known > g.clocks.drone_holes_known, true);
    assert.equal(next.bars.irgc > g.bars.irgc, true);
  });
});

describe("IRGC purge", () => {
  it("a soft move with IRGC under 35 kills the Iran chair", () => {
    const g = newGame({ chair: "iran", party: "D", cardId: "hormuz-2019" });
    g.bars.irgc = SOFT_PURGE_IRGC - 1;
    const next = applyChoice(g, "ir-hold-fire");
    assert.equal(next.ending?.id, "irgc_purge");
  });

  it("the same soft move is survivable at IRGC 60", () => {
    const g = newGame({ chair: "iran", party: "D", cardId: "hormuz-2019" });
    g.bars.irgc = 60;
    const next = applyChoice(g, "ir-hold-fire");
    assert.equal(next.ending?.id === "irgc_purge", false);
    assert.equal(next.bars.irgc < 60, true);
  });
});

describe("time travel", () => {
  it("back one restores the previous snapshot", () => {
    const g = newGame({ chair: "us", party: "R" });
    const after = applyChoice(g, "us-walk");
    assert.equal(after.phase, "ended");
    const back = timeTravelBackOne(after);
    assert.equal(back.phase, "playing");
    assert.equal(back.cardId, "coup-1953");
    assert.equal(back.ending, null);
    assert.equal(canTimeTravel(after).backOne, true);
  });

  it("further back from a fresh 1953 opens 1938", () => {
    const g = newGame({ chair: "us", party: "R" });
    assert.equal(canTimeTravel(g).furtherBack, true);
    const egg = timeTravelFurtherBack(g);
    assert.equal(egg.cardId, "hitler-1938");
    assert.equal(egg.phase, "playing");
  });

  it("killing him is AL game over, leaving him returns to 1953", () => {
    const g = timeTravelFurtherBack(newGame({ chair: "iran", party: "D" }));
    const dead = applyChoice(g, "kill-him");
    assert.equal(dead.ending?.id, "hitler_shot");
    const live = applyChoice(g, "leave-him");
    assert.equal(live.cardId, "coup-1953");
    assert.equal(live.phase, "playing");
  });
});

describe("grey lock", () => {
  it("isGrey is false when there is no requires clause", () => {
    const g = newGame({ chair: "us", party: "R" });
    const card = currentCard(g);
    for (const c of card.usChoices) {
      assert.equal(isGrey(g, c), false);
    }
  });
});

describe("delayed bleed", () => {
  it("applies last card's delayed deltas at the start of the next resolve", () => {
    const g = newGame({ chair: "us", party: "R", cardId: "hormuz-2019" });
    const afterAbort = applyChoice(g, "us-abort");
    // Spine next card ends this slice, but delayed should still be queued.
    assert.ok(afterAbort.delayed.oil_pain);
  });
});

describe("Ike to Carter", () => {
  it("US golden path runs 1953 to 1979 and grows liberals, then the veil kills them", () => {
    let g = newGame({ chair: "us", party: "R" });
    g = applyChoice(g, "us-back-shah");
    assert.equal(g.cardId, "atoms-1957");
    g = applyChoice(g, "us-keep-fuel");
    assert.equal(g.cardId, "white-revolution-1963");
    assert.equal(g.phase, "playing");
    const beforeReform = g.clocks.liberals;
    g = applyChoice(g, "us-press-reform");
    assert.equal(g.cardId, "sofa-1964");
    assert.equal(g.clocks.liberals > beforeReform, true);
    assert.equal(g.party, "D");
    g = applyChoice(g, "us-take-sofa");
    assert.equal(g.cardId, "sit-nixon-1969");
    g = applyChoice(g, "us-sit-nixon");
    assert.equal(g.cardId, "weapons-1972");
    assert.equal(g.party, "R");
    g = applyChoice(g, "us-blank-check");
    assert.equal(g.cardId, "pipeline-1975");
    g = applyChoice(g, "us-keep-selling");
    assert.equal(g.cardId, "revolution-1979");
    const grown = g.clocks.liberals;
    assert.equal(grown >= 50, true);
    g = applyChoice(g, "us-admit-shah");
    assert.equal(g.cardId, "veil-1979");
    assert.equal(g.phase, "playing");
    g = applyChoice(g, "us-stay-out");
    assert.equal(g.cardId, "hostages-1979");
    assert.equal(g.phase, "playing");
    assert.equal(g.party, "D");
    g = applyChoice(g, "us-eagle-claw");
    assert.equal(g.phase, "playing");
    assert.equal(g.cardId, "eagle-claw-1980");
    g = applyChoice(g, "us-see-wreckage");
    assert.equal(g.cardId, "you-him-fight-1980");
    g = applyChoice(g, "us-let-saddam");
    assert.equal(g.phase, "playing");
    assert.equal(g.cardId, "iran-iraq-1980");
    assert.equal(g.ending, null);
    g = applyChoice(g, "us-no-tilt");
    assert.equal(g.phase, "playing");
    assert.equal(g.cardId, "election-1980");
    g = applyChoice(g, "us-run-again");
    assert.equal(g.phase, "playing");
    assert.equal(g.cardId, "inaugurated-1981");
    assert.equal(g.ending, null);
    assert.equal(g.party, "R");
    g = applyChoice(g, "us-sit-reagan");
    assert.equal(g.phase, "playing");
    assert.equal(g.cardId, "delist-1982");
    g = applyChoice(g, "us-delist-iraq");
    assert.equal(g.cardId, "tilt-1982");
    g = applyChoice(g, "us-cia-baghdad");
    assert.equal(g.phase, "playing");
    assert.equal(g.cardId, "lebanon-1983");
    g = applyChoice(g, "us-bring-home");
    assert.equal(g.phase, "playing");
    assert.equal(g.cardId, "iran-contra-1985");
    assert.equal(g.ending, null);
    assert.equal(g.party, "R");
    g = applyChoice(g, "us-sell-missiles");
    assert.equal(g.phase, "playing");
    assert.equal(g.cardId, "cup-1988");
    g = applyChoice(g, "us-call-mistake");
    assert.equal(g.phase, "playing");
    assert.equal(g.cardId, "robe-1989");
    assert.equal(g.party, "R");
  });

  it("Iran golden path seats the Shah, then Bazargan, then the Imam repeals Family Protection", () => {
    let g = newGame({ chair: "iran", party: "D" });
    g = applyChoice(g, "ir-nationalize");
    g = applyChoice(g, "ir-sit-throne");
    assert.equal(g.flags.iran_face, "shah");
    g = applyChoice(g, "ir-shah-fuel");
    assert.equal(g.cardId, "white-revolution-1963");
    g = applyChoice(g, "ir-white-rev");
    assert.equal(g.cardId, "sofa-1964");
    g = applyChoice(g, "ir-pass-sofa");
    assert.equal(g.cardId, "sit-nixon-1969");
    g = applyChoice(g, "ir-nixon-next");
    assert.equal(g.cardId, "weapons-1972");
    g = applyChoice(g, "ir-buy-catalog");
    assert.equal(g.cardId, "pipeline-1975");
    g = applyChoice(g, "ir-keep-catalog");
    assert.equal(g.cardId, "revolution-1979");
    const grown = g.clocks.liberals;
    g = applyChoice(g, "ir-shah-leave");
    assert.equal(g.cardId, "veil-1979");
    assert.equal(g.flags.iran_face, "bazargan");
    assert.equal(g.phase, "playing");
    const after = applyChoice(g, "ir-repeal-fpl");
    assert.equal(after.cardId, "hostages-1979");
    assert.equal(after.phase, "playing");
    assert.equal(after.clocks.liberals < grown, true);
    const resign = applyChoice(after, "ir-demand-leave");
    assert.equal(resign.phase, "playing");
    assert.equal(resign.cardId, "resigned-1979");
    assert.equal(resign.flags.iran_face, "banisadr");
    assert.equal(resign.ending, null);
    const seated = applyChoice(resign, "ir-sit-presidency");
    assert.equal(seated.cardId, "you-him-fight-1980");
    assert.equal(seated.phase, "playing");
    const lined = applyChoice(seated, "ir-watch-lineup");
    assert.equal(lined.cardId, "iran-iraq-1980");
    const war = applyChoice(lined, "ir-guards-war");
    assert.equal(war.phase, "playing");
    assert.equal(war.cardId, "impeached-1981");
    assert.equal(war.flags.iran_face, "banisadr");
    assert.equal(war.ending, null);
    const left = applyChoice(war, "ir-leave-majles");
    assert.equal(left.phase, "playing");
    assert.equal(left.cardId, "seated-1981");
    assert.equal(left.flags.iran_face, "khamenei");
    const nextFace = applyChoice(left, "ir-sit-khamenei");
    assert.equal(nextFace.phase, "playing");
    assert.equal(nextFace.cardId, "lebanon-1983");
    assert.equal(nextFace.flags.iran_face, "khamenei");
    const bekah = applyChoice(nextFace, "ir-bekah");
    assert.equal(bekah.phase, "playing");
    assert.equal(bekah.cardId, "iran-contra-1985");
    const parts = applyChoice(bekah, "ir-take-parts");
    assert.equal(parts.phase, "playing");
    assert.equal(parts.cardId, "cup-1988");
    assert.equal(parts.flags.iran_face, "khamenei");
    const cup = applyChoice(parts, "ir-stamp-cup");
    assert.equal(cup.phase, "playing");
    assert.equal(cup.cardId, "robe-1989");
    assert.equal(cup.flags.iran_face, "khamenei");
    const robe = applyChoice(cup, "ir-take-robe");
    assert.equal(robe.phase, "playing");
    assert.equal(robe.cardId, "kuwait-1990");
    assert.equal(robe.flags.iran_face, "rafsanjani");
  });

  it("letting the students hold the embassy still seats the next letterhead", () => {
    const g = newGame({ chair: "iran", party: "D", cardId: "hostages-1979" });
    const next = applyChoice(g, "ir-let-students");
    assert.equal(next.phase, "playing");
    assert.equal(next.cardId, "resigned-1979");
    assert.equal(next.flags.iran_face, "banisadr");
    assert.equal(next.ending, null);
    const war = applyChoice(next, "ir-sit-presidency");
    assert.equal(war.cardId, "you-him-fight-1980");
    const invasion = applyChoice(war, "ir-watch-lineup");
    assert.equal(invasion.cardId, "iran-iraq-1980");
  });

  it("historical choices do not carry graves; off-ramps do", () => {
    const hostages = cardById("hostages-1979");
    assert.ok(hostages);
    assert.equal(
      [...hostages.usChoices, ...hostages.iranChoices].filter((c) => c.historical).every((c) => !c.ending),
      true,
    );
    const war = cardById("iran-iraq-1980");
    assert.ok(war);
    assert.equal(war.usChoices.find((c) => c.id === "us-no-tilt")?.historical, true);
    assert.equal(war.usChoices.find((c) => c.id === "us-tilt-iraq")?.historical, undefined);
    assert.equal(war.usChoices.find((c) => c.id === "us-tilt-iraq")?.artisticLicense, "al-tilt-early");
    assert.equal(war.usChoices.filter((c) => c.historical).every((c) => !c.ending), true);
    assert.equal(war.iranChoices.find((c) => c.id === "ir-guards-war")?.ending, undefined);
    assert.equal(war.iranChoices.find((c) => c.id === "ir-artesh-war")?.ending, undefined);
    assert.equal(war.iranChoices.find((c) => c.id === "ir-artesh-war")?.epilogue, true);
    const election = cardById("election-1980");
    assert.ok(election);
    assert.equal(election.electionYear, undefined);
    assert.equal(election.usChoices.find((c) => c.id === "us-run-again")?.ending, undefined);
    assert.equal(election.usChoices.some((c) => c.id === "us-step-aside"), false);
    assert.equal(election.usChoices.find((c) => c.id === "us-hail-mary")?.nextCard, "inaugurated-1981");
    const oath = cardById("inaugurated-1981");
    assert.ok(oath);
    assert.equal(oath.usChoices.find((c) => c.id === "us-sit-reagan")?.ending, undefined);
    assert.equal(oath.usChoices.find((c) => c.id === "us-sit-reagan")?.nextCard, "delist-1982");
    assert.equal(oath.usChoices.some((c) => c.id === "us-leave-oath"), false);
    assert.equal(oath.usChoices.length, 1);
    const delist = cardById("delist-1982");
    assert.ok(delist);
    assert.equal(delist.usChoices.find((c) => c.id === "us-delist-iraq")?.historical, true);
    assert.equal(delist.usChoices.find((c) => c.id === "us-delist-iraq")?.nextCard, "tilt-1982");
    assert.equal(delist.usChoices.find((c) => c.id === "us-keep-iraq-listed")?.artisticLicense, "al-keep-iraq-listed");
    assert.equal(delist.iranChoices.length, 0);
    const tilt = cardById("tilt-1982");
    assert.ok(tilt);
    assert.equal(tilt.usChoices.find((c) => c.id === "us-cia-baghdad")?.historical, true);
    assert.equal(tilt.usChoices.find((c) => c.id === "us-cia-baghdad")?.nextCard, "lebanon-1983");
    assert.equal(tilt.usChoices.find((c) => c.id === "us-stay-neutral")?.artisticLicense, "al-no-tilt-1982");
    const impeach = cardById("impeached-1981");
    assert.ok(impeach);
    assert.equal(impeach.iranChoices.find((c) => c.id === "ir-leave-majles")?.ending, undefined);
    assert.equal(impeach.iranChoices.find((c) => c.id === "ir-defy-majles")?.ending, undefined);
    assert.equal(impeach.iranChoices.find((c) => c.id === "ir-defy-majles")?.epilogue, true);
    const blob = impeach.iranChoices.map((c) => `${c.label} ${c.summary}`).join(" ");
    assert.equal(/khamenei|impeach|paris|game over/i.test(blob), false);
  });

  it("keeping Family Protection is AL and does not instantly purge if the Guards just stood up", () => {
    const g = newGame({ chair: "iran", party: "D", cardId: "veil-1979" });
    assert.equal(g.flags.iran_face, "bazargan");
    assert.equal(g.bars.irgc >= 58, true);
    const next = applyChoice(g, "ir-keep-fpl");
    assert.equal(next.ending?.id === "irgc_purge", false);
    assert.equal(next.cardId, "hostages-1979");
    assert.equal(next.phase, "playing");
    assert.equal(next.flags.letterhead_generic, true);
    assert.equal(next.lastResult?.title, "We congratulate you on your moral choice.");
  });

  it("the White House party follows the face: Ike R, Kennedy D, Nixon R, Carter D", () => {
    let g = newGame({ chair: "us", party: "R" });
    assert.equal(g.party, "R");
    g = applyChoice(g, "us-back-shah");
    const afterAjax = { my: g.bars.my_party, opp: g.bars.opposing_party };
    g = applyChoice(g, "us-keep-fuel");
    assert.equal(g.cardId, "white-revolution-1963");
    assert.equal(g.party, "D");
    assert.equal(g.bars.my_party, afterAjax.opp + 6);
    assert.equal(g.bars.opposing_party, afterAjax.my);
    g = applyChoice(g, "us-press-reform");
    assert.equal(g.cardId, "sofa-1964");
    assert.equal(g.party, "D");
    g = applyChoice(g, "us-take-sofa");
    g = applyChoice(g, "us-sit-nixon");
    assert.equal(g.cardId, "weapons-1972");
    assert.equal(g.party, "R");
    g = applyChoice(g, "us-blank-check");
    assert.equal(g.cardId, "pipeline-1975");
    g = applyChoice(g, "us-keep-selling");
    assert.equal(g.cardId, "revolution-1979");
    assert.equal(g.party, "D");
  });

  it("isolation start on Kennedy is Democrat even if the caller passed R", () => {
    const g = newGame({ chair: "us", party: "R", cardId: "white-revolution-1963" });
    assert.equal(g.party, "D");
    const c = newGame({ chair: "us", party: "R", cardId: "hostages-1979" });
    assert.equal(c.party, "D");
    assert.equal(c.flags.iran_face, "");
    const r = newGame({ chair: "us", party: "D", cardId: "inaugurated-1981" });
    assert.equal(r.party, "R");
    const contra = newGame({ chair: "us", party: "D", cardId: "iran-contra-1985" });
    assert.equal(contra.party, "R");
    const cup = newGame({ chair: "iran", party: "D", cardId: "cup-1988" });
    assert.equal(cup.flags.iran_face, "khamenei");
    assert.equal(cup.flags.shah_admitted, true);
    const impeach = newGame({ chair: "iran", party: "D", cardId: "impeached-1981" });
    assert.equal(impeach.flags.iran_face, "banisadr");
    const lineup = newGame({ chair: "iran", party: "D", cardId: "you-him-fight-1980" });
    assert.equal(lineup.flags.iran_face, "banisadr");
    const claw = newGame({ chair: "us", party: "R", cardId: "eagle-claw-1980" });
    assert.equal(claw.party, "D");
    const listed = newGame({ chair: "us", party: "D", cardId: "delist-1982" });
    assert.equal(listed.party, "R");
    const seated = newGame({ chair: "iran", party: "D", cardId: "seated-1981" });
    assert.equal(seated.flags.iran_face, "khamenei");
  });

  it("hostage buttons do not announce 444 days or the election", () => {
    const card = cardById("hostages-1979");
    assert.ok(card);
    const blob = [...card.usChoices, ...card.iranChoices].map((c) => `${c.label} ${c.summary}`).join(" ");
    assert.equal(/444|reagan|election|game over|desert one/i.test(blob), false);
    assert.match(card.situationUs ?? "", /occupied/);
  });
});

describe("golden path", () => {
  it("no historical choice on any card carries a grave", () => {
    for (const card of CARDS) {
      for (const c of [...card.usChoices, ...card.iranChoices]) {
        if (c.historical) {
          if (c.ending) {
            assert.equal(
              c.ending === "the_leader",
              true,
              `${card.id}:${c.id} is history and must not grave`,
            );
          }
        }
      }
    }
  });

  it("buttons never say historical or what happened", () => {
    for (const card of CARDS) {
      if (card.secret) continue;
      for (const c of [...card.usChoices, ...card.iranChoices]) {
        const blob = `${c.label} ${c.summary}`;
        assert.equal(
          /historical|what happened/i.test(blob),
          false,
          `${card.id}:${c.id} spoils the golden path on the button`,
        );
      }
    }
  });

  it("White Revolution both buttons continue; only the liberals clock moves", () => {
    const start = newGame({ chair: "us", party: "R", cardId: "white-revolution-1963" });
    const press = applyChoice(start, "us-press-reform");
    const tanks = applyChoice(start, "us-send-tanks");
    assert.equal(press.phase, "playing");
    assert.equal(tanks.phase, "playing");
    assert.equal(press.cardId, "sofa-1964");
    assert.equal(tanks.cardId, "sofa-1964");
    assert.equal(press.ending, null);
    assert.equal(tanks.ending, null);
    assert.equal(press.clocks.liberals > tanks.clocks.liberals, true);
  });

  it("skipping the White Revolution still rides to 1979, thinner liberals", () => {
    let hist = newGame({ chair: "us", party: "R" });
    hist = applyChoice(hist, "us-back-shah");
    hist = applyChoice(hist, "us-keep-fuel");
    hist = applyChoice(hist, "us-press-reform");
    const histLibs = hist.clocks.liberals;
    let skip = newGame({ chair: "us", party: "R" });
    skip = applyChoice(skip, "us-back-shah");
    skip = applyChoice(skip, "us-keep-fuel");
    skip = applyChoice(skip, "us-send-tanks");
    assert.equal(skip.phase, "playing");
    assert.equal(skip.cardId, "sofa-1964");
    assert.equal(skip.clocks.liberals < histLibs, true);
    skip = applyChoice(skip, "us-take-sofa");
    skip = applyChoice(skip, "us-sit-nixon");
    skip = applyChoice(skip, "us-hinterland-first");
    assert.equal(skip.phase, "playing");
    assert.equal(skip.cardId, "pipeline-1975");
    skip = applyChoice(skip, "us-keep-selling");
    assert.equal(skip.cardId, "revolution-1979");
    assert.equal(skip.ending, null);
  });

  it("Shah keeping landlords quiet still reaches the square", () => {
    let g = newGame({ chair: "iran", party: "D", cardId: "white-revolution-1963" });
    const quiet = applyChoice(g, "ir-keep-quiet");
    assert.equal(quiet.phase, "playing");
    assert.equal(quiet.cardId, "sofa-1964");
    const afterSofa = applyChoice(quiet, "ir-pass-sofa");
    const afterNixon = applyChoice(afterSofa, "ir-nixon-next");
    const next = applyChoice(afterNixon, "ir-spend-villages");
    assert.equal(next.phase, "playing");
    assert.equal(next.cardId, "pipeline-1975");
    assert.equal(next.ending, null);
  });

  it("Contra both buttons continue; refusing the cup is the grave", () => {
    const us = newGame({ chair: "us", party: "R", cardId: "iran-contra-1985" });
    const sell = applyChoice(us, "us-sell-missiles");
    const embargo = applyChoice(us, "us-keep-embargo");
    assert.equal(sell.phase, "playing");
    assert.equal(embargo.phase, "playing");
    assert.equal(sell.cardId, "cup-1988");
    assert.equal(embargo.cardId, "cup-1988");
    assert.equal(sell.ending, null);
    assert.equal(embargo.ending, null);
    const iran = newGame({ chair: "iran", party: "D", cardId: "iran-contra-1985" });
    assert.equal(iran.flags.iran_face, "khamenei");
    const take = applyChoice(iran, "ir-take-parts");
    const refuse = applyChoice(iran, "ir-refuse-crates");
    assert.equal(take.phase, "playing");
    assert.equal(refuse.phase, "playing");
    assert.equal(take.cardId, "cup-1988");
    assert.equal(refuse.cardId, "cup-1988");
    const drink = applyChoice(take, "ir-stamp-cup");
    const keep = applyChoice(take, "ir-refuse-cup");
    assert.equal(drink.phase, "playing");
    assert.equal(drink.cardId, "robe-1989");
    assert.equal(keep.phase, "ended");
    assert.equal(keep.ending?.id, "face_no_guns");
  });

  it("Carter's Hail Mary still seats Reagan", () => {
    const g = newGame({ chair: "us", party: "R", cardId: "election-1980" });
    const next = applyChoice(g, "us-hail-mary");
    assert.equal(next.phase, "playing");
    assert.equal(next.cardId, "inaugurated-1981");
    assert.equal(next.ending, null);
    assert.equal(next.party, "R");
  });

  it("a letterhead moral choice continues with a 7-Eleven overlay", () => {
    const g = newGame({ chair: "iran", party: "D", cardId: "resigned-1979" });
    const next = applyChoice(g, "ir-refuse-letterhead");
    assert.equal(next.phase, "playing");
    assert.equal(next.cardId, "you-him-fight-1980");
    assert.equal(next.ending, null);
    assert.equal(next.flags.letterhead_generic, true);
    assert.equal(next.lastResult?.title, "We congratulate you on your moral choice.");
    assert.match(next.lastResult?.body ?? "", /convenience store/);
    assert.match(next.lastResult?.body ?? "", /However, Iran continues on/);
    const sit = applyChoice(g, "ir-sit-presidency");
    const lined = applyChoice(sit, "ir-watch-lineup");
    assert.equal(lined.cardId, "iran-iraq-1980");
    const artesh = applyChoice(lined, "ir-artesh-war");
    assert.equal(artesh.phase, "playing");
    assert.equal(artesh.cardId, "impeached-1981");
    assert.equal(artesh.lastResult?.title, "We congratulate you on your moral choice.");
    const defy = applyChoice(artesh, "ir-defy-majles");
    assert.equal(defy.phase, "playing");
    assert.equal(defy.cardId, "seated-1981");
    assert.equal(defy.flags.iran_face, "khamenei");
    assert.match(defy.lastResult?.body ?? "", /Los Angeles/);
  });

  it("spending the oil on the villages lets the Shah hold 1979", () => {
    let g = newGame({ chair: "iran", party: "D", cardId: "weapons-1972" });
    g = applyChoice(g, "ir-spend-villages");
    assert.equal(g.flags.hinterland_spent, true);
    assert.equal(g.cardId, "pipeline-1975");
    g = applyChoice(g, "ir-keep-catalog");
    assert.equal(g.cardId, "revolution-1979");
    const ids = choicesFor(g).map((c) => c.id);
    assert.equal(ids.includes("ir-shah-hold"), true);
    assert.equal(ids.includes("ir-fire-crowd"), false);
    const hold = applyChoice(g, "ir-shah-hold");
    assert.equal(hold.phase, "ended");
    assert.equal(hold.ending?.id, "shah_holds");
    assert.equal(hold.ending?.title, "The king still sits");
    assert.match(hold.ending?.referee ?? "", /successful path|kept the throne/i);
    const leave = applyChoice(g, "ir-shah-leave");
    assert.equal(leave.phase, "playing");
    assert.equal(leave.cardId, "veil-1979");
    assert.equal(leave.flags.iran_face, "bazargan");
  });
});

function walkHistorical(chair: "us" | "iran", from?: string) {
  let g = newGame({ chair, party: chair === "us" ? "R" : "D", cardId: from });
  const path: string[] = [g.cardId];
  for (let i = 0; i < 80; i++) {
    if (g.phase !== "playing") return { g, path };
    const hist = choicesFor(g).find((c) => c.historical);
    assert.ok(hist, `no historical choice on ${g.cardId} face=${g.flags.iran_face}`);
    g = applyChoice(g, hist.id);
    path.push(g.cardId);
  }
  throw new Error(`historical walk ran away from ${from ?? "1953"}`);
}

describe("late rail", () => {
  it("US history rides 1953 through Johnson to the 2026 campaign", () => {
    const { g, path } = walkHistorical("us");
    assert.equal(g.phase, "ended");
    assert.equal(g.ending?.id, "the_leader");
    assert.match(g.ending?.referee ?? "", /History arrived/);
    for (const id of [
      "sofa-1964",
      "sit-nixon-1969",
      "pipeline-1975",
      "robe-1989",
      "bounce-2019",
      "hormuz-2019",
      "abraham-2020",
      "unleave-2021",
      "saudi-accord-2023",
      "oct7-2023",
      "twelve-days-2025",
      "the-leader-2026",
    ]) {
      assert.equal(path.includes(id), true, `US walk missed ${id}`);
    }
  });

  it("Iran history takes the robe, steps off in 2019, and arrives at 2026", () => {
    const { g, path } = walkHistorical("iran");
    assert.equal(g.phase, "ended");
    assert.equal(g.ending?.id, "the_leader");
    assert.equal(g.flags.iran_face, "pezeshkian");
    for (const id of [
      "sofa-1964",
      "robe-1989",
      "kuwait-1990",
      "wall-1997",
      "myth-2005",
      "jcpoa-2015",
      "bounce-2019",
      "hormuz-2019",
      "abraham-2020",
      "unleave-2021",
      "mahsa-2022",
      "saudi-accord-2023",
      "oct7-2023",
      "sit-pezeshkian-2024",
      "the-leader-2026",
    ]) {
      assert.equal(path.includes(id), true, `Iran walk missed ${id}`);
    }
  });

  it("keeping the limits is an olive hold; the nuclear war cards go away", () => {
    const g = newGame({ chair: "iran", party: "D", cardId: "bounce-2019" });
    assert.equal(g.flags.iran_face, "rouhani");
    const ids = choicesFor(g).map((c) => c.id);
    assert.equal(ids.includes("ir-keep-limits"), true);
    assert.equal(ids.includes("ir-step-off"), true);
    const hold = applyChoice(g, "ir-keep-limits");
    assert.equal(hold.phase, "ended");
    assert.equal(hold.ending?.id, "jcpoa_holds");
    assert.match(hold.ending?.referee ?? "", /successful path/);
    const sprint = applyChoice(g, "ir-step-off");
    assert.equal(sprint.phase, "playing");
    assert.equal(sprint.cardId, "hormuz-2019");
    assert.equal(sprint.ending, null);
  });

  it("side with Saddam is a grave; stay out continues", () => {
    const g = newGame({ chair: "iran", party: "D", cardId: "kuwait-1990" });
    assert.equal(g.flags.iran_face, "rafsanjani");
    const suicide = applyChoice(g, "ir-side-saddam");
    assert.equal(suicide.phase, "ended");
    assert.equal(suicide.ending?.id, "kuwait_grave");
    const stay = applyChoice(g, "ir-stay-out-kuwait");
    assert.equal(stay.phase, "playing");
    assert.equal(stay.cardId, "dual-containment-1993");
  });

  it("sit cards still have buttons when isolation-started on the outgoing face", () => {
    const robe = newGame({ chair: "iran", party: "D", cardId: "robe-1989" });
    assert.equal(robe.flags.iran_face, "khamenei");
    assert.equal(choicesFor(robe).some((c) => c.id === "ir-take-robe"), true);
    const wall = newGame({ chair: "iran", party: "D", cardId: "wall-1997" });
    assert.equal(wall.flags.iran_face, "rafsanjani");
    assert.equal(choicesFor(wall).some((c) => c.id === "ir-cnn"), true);
    const myth = newGame({ chair: "iran", party: "D", cardId: "myth-2005" });
    assert.equal(myth.flags.iran_face, "khatami");
    assert.equal(choicesFor(myth).some((c) => c.id === "ir-say-myth"), true);
    const deal = newGame({ chair: "iran", party: "D", cardId: "jcpoa-2015" });
    assert.equal(deal.flags.iran_face, "ahmadinejad");
    assert.equal(choicesFor(deal).some((c) => c.id === "ir-accept-jcpoa"), true);
    const unleave = newGame({ chair: "iran", party: "D", cardId: "unleave-2021" });
    assert.equal(unleave.flags.iran_face, "rouhani");
    assert.equal(choicesFor(unleave).some((c) => c.id === "ir-sprint-unleave"), true);
    const sit = newGame({ chair: "iran", party: "D", cardId: "sit-pezeshkian-2024" });
    assert.equal(sit.flags.iran_face, "raisi");
    assert.equal(choicesFor(sit).some((c) => c.id === "ir-sit-pezeshkian"), true);
  });

  it("the White House party follows Johnson, Ford, Clinton, Obama, Biden, Trump", () => {
    assert.equal(newGame({ chair: "us", party: "R", cardId: "sofa-1964" }).party, "D");
    assert.equal(newGame({ chair: "us", party: "D", cardId: "pipeline-1975" }).party, "R");
    assert.equal(newGame({ chair: "us", party: "R", cardId: "robe-1989" }).party, "R");
    assert.equal(newGame({ chair: "us", party: "R", cardId: "dual-containment-1993" }).party, "D");
    assert.equal(newGame({ chair: "us", party: "D", cardId: "natanz-2002" }).party, "R");
    assert.equal(newGame({ chair: "us", party: "R", cardId: "green-2009" }).party, "D");
    assert.equal(newGame({ chair: "us", party: "D", cardId: "archive-2018" }).party, "R");
    assert.equal(newGame({ chair: "us", party: "R", cardId: "unleave-2021" }).party, "D");
    assert.equal(newGame({ chair: "us", party: "D", cardId: "twelve-days-2025" }).party, "R");
  });

  it("keep the war is a grave; the 2026 campaign is history arriving", () => {
    const g = newGame({ chair: "iran", party: "D", cardId: "the-leader-2026" });
    assert.equal(g.flags.iran_face, "pezeshkian");
    const keep = applyChoice(g, "ir-keep-war");
    assert.equal(keep.phase, "ended");
    assert.equal(keep.ending?.id, "keep_the_war");
    const memo = applyChoice(g, "ir-hormuz-memo");
    assert.equal(memo.phase, "ended");
    assert.equal(memo.ending?.id, "the_leader");
  });

  it("every card source id has a receipt", () => {
    const ids = new Set(RECEIPTS.map((r) => r.id));
    for (const card of CARDS) {
      for (const src of card.sources) {
        assert.equal(ids.has(src), true, `${card.id} cites missing receipt ${src}`);
      }
    }
  });

  it("the JCPOA card is named as the Joint Comprehensive Plan of Action", () => {
    const card = cardById("jcpoa-2015");
    assert.ok(card);
    assert.match(card.title, /Joint Comprehensive Plan of Action/);
    assert.match(card.situationUs ?? "", /missile/i);
    assert.match(card.situationUs ?? "", /civilian reactor/i);
    assert.match(card.situationUs ?? "", /pallets/);
    assert.match(card.situationUs ?? "", /Congress will not ratify/i);
    assert.equal(/^The deal$/i.test(card.title), false);
  });

  it("headlines say what happened, not a code name", () => {
    for (const card of CARDS) {
      if (card.secret) continue;
      assert.equal(
        /^(The deal|The un-leave|The airport|The warehouse|The robe|The wall|The myth|The pipeline|The SOFA|Sit Nixon|The cup|A cousin in the Bekaa|A channel in the dark|Green|Mahsa|Kuwait|The Leader)$/i.test(
          card.title,
        ),
        false,
        `${card.id} still has a sideways title: ${card.title}`,
      );
    }
  });

  it("a public Saudi-Israel courtship is how 7 October arrives; private cuts Hamas off", () => {
    const g = newGame({ chair: "us", party: "R", cardId: "saudi-accord-2023" });
    const pub = applyChoice(g, "us-public-saudi");
    assert.equal(pub.phase, "playing");
    assert.equal(pub.cardId, "oct7-2023");
    const priv = applyChoice(g, "us-private-saudi");
    assert.equal(priv.phase, "playing");
    assert.equal(priv.cardId, "sit-pezeshkian-2024");
    assert.equal(priv.flags.hamas_cut_off, true);
    assert.equal(priv.lastResult?.title, "Hamas is cut off");
    assert.match(priv.lastResult?.body ?? "", /7 October does not happen/);
  });

  it("Iran funding Hamas is how 7 October arrives; not funding skips it", () => {
    const g = newGame({ chair: "iran", party: "D", cardId: "saudi-accord-2023" });
    assert.equal(g.flags.iran_face, "raisi");
    const fund = applyChoice(g, "ir-fund-hamas");
    assert.equal(fund.cardId, "oct7-2023");
    const leave = applyChoice(g, "ir-leave-hamas");
    assert.equal(leave.cardId, "sit-pezeshkian-2024");
    assert.equal(leave.flags.hamas_cut_off, true);
  });

  it("authorizing the rescue explains Desert One; keep talking skips it; both chairs get you-and-him-fight before Saddam", () => {
    const raid = applyChoice(newGame({ chair: "us", party: "R", cardId: "hostages-1979" }), "us-eagle-claw");
    assert.equal(raid.cardId, "eagle-claw-1980");
    const wreck = applyChoice(raid, "us-see-wreckage");
    assert.equal(wreck.cardId, "you-him-fight-1980");
    const war = applyChoice(wreck, "us-let-saddam");
    assert.equal(war.cardId, "iran-iraq-1980");

    const talk = applyChoice(newGame({ chair: "us", party: "R", cardId: "hostages-1979" }), "us-keep-talking");
    assert.equal(talk.cardId, "you-him-fight-1980");

    const claw = cardById("eagle-claw-1980");
    assert.ok(claw);
    assert.match(claw.title, /Desert One/);
    assert.match(claw.situationUs ?? "", /Tabas/);
    assert.match(claw.referee.paragraphs.join(" "), /Vance/);
    assert.equal(claw.iranChoices.length, 0);

    const lineup = cardById("you-him-fight-1980");
    assert.ok(lineup);
    assert.match(lineup.title, /you and him fight/i);
    assert.match(lineup.situationUs ?? "", /Shia/);
    assert.match(lineup.situationIran ?? "", /Saudis/);
    assert.equal(lineup.usChoices.find((c) => c.id === "us-let-saddam")?.historical, true);
    assert.equal(lineup.usChoices.find((c) => c.id === "us-warn-saddam")?.artisticLicense, "al-warn-saddam");
  });

  it("taking Iraq off the terrorism list is how the chemistry moves; keeping them on still reaches the intel tilt", () => {
    const g = newGame({ chair: "us", party: "R", cardId: "delist-1982" });
    const off = applyChoice(g, "us-delist-iraq");
    assert.equal(off.phase, "playing");
    assert.equal(off.cardId, "tilt-1982");
    const keep = applyChoice(g, "us-keep-iraq-listed");
    assert.equal(keep.cardId, "tilt-1982");
    const card = cardById("delist-1982");
    assert.ok(card);
    assert.match(card.title, /terrorism list/i);
    assert.match(card.situationUs ?? "", /precursor|pesticide/i);
    assert.match(card.referee.paragraphs.join(" "), /mustard|nerve/i);
    assert.match(card.referee.paragraphs.join(" "), /Europe/);
    assert.equal(card.iranChoices.length, 0);
    const blob = card.usChoices.map((c) => `${c.label} ${c.summary}`).join(" ");
    assert.equal(/halabja|original sin|game over/i.test(blob), false);
  });
});
