import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { memoryMuseumStore } from "../model/exits.ts";
import { TrainViewModel, truthTagCaption } from "./TrainViewModel.ts";

describe("TrainViewModel", () => {
  it("does not label the historical choice on the button", () => {
    const vm = new TrainViewModel("us", "R");
    const ui = vm.getState();
    for (const c of ui.choices) {
      assert.equal(/historical|what happened/i.test(c.label), false);
      assert.equal(/historical|what happened/i.test(c.summary), false);
    }
  });

  it("truth tags explain the terminology, not just the letters", () => {
    assert.equal(truthTagCaption("LT").name, "Lawyer true");
    assert.match(truthTagCaption("LT").blurb, /date|document|court/i);
    assert.equal(truthTagCaption("IT").name, "Irish true");
    assert.match(truthTagCaption("IT").blurb, /incentive/i);
    assert.match(truthTagCaption("DK").blurb, /file/i);
    assert.match(truthTagCaption("AL").blurb, /popup|labelled/i);
    assert.match(truthTagCaption("GR").blurb, /engine|number/i);
  });

  it("hides IRGC / China / Venezuela on the 1953 board", () => {
    const vm = new TrainViewModel("us", "R");
    const ids = vm.getState().bars.map((b) => b.id);
    assert.equal(ids.includes("irgc"), false);
    assert.equal(ids.includes("china"), false);
    assert.equal(ids.includes("cia"), true);
    assert.equal(ids.includes("street"), false);
    assert.equal(ids.includes("leader"), false);
  });

  it("shows only Tehran's room on the 1953 Iran board", () => {
    const ids = new TrainViewModel("iran", "D").getState().bars.map((b) => b.id);
    assert.deepEqual(ids.sort(), ["leader", "street"]);
  });

  it("shows Washington's late-game room on 2019, not Tehran's", () => {
    const vm = new TrainViewModel("us", "R", "hormuz-2019");
    const ids = vm.getState().bars.map((b) => b.id);
    assert.equal(ids.includes("cia"), true);
    assert.equal(ids.includes("irgc"), false);
    assert.equal(ids.includes("china"), false);
    assert.equal(ids.includes("venezuela"), false);
  });

  it("walk-away presents the satrap ending, then time travel restores choices", () => {
    const vm = new TrainViewModel("us", "D");
    vm.choose("us-walk");
    const dead = vm.getState();
    assert.equal(dead.phase, "ended");
    assert.equal(dead.endingTitle !== null, true);
    assert.equal(dead.endingId, "satrap_1953");
    assert.equal(dead.leader.id, "ike");
    assert.equal(dead.grave?.id, "stalin_turban");
    assert.equal(dead.grave?.youAre, "You get Stalin in a turban");
    assert.equal(/You are Stalin/i.test(dead.grave?.youAre ?? ""), false);
    assert.equal(dead.imam, null);
    assert.match(dead.endingBody ?? "", /Saudis enter the Soviet sphere/);
    assert.match(dead.endingBody ?? "", /half-commie theocracy/);
    assert.equal(
      dead.bars.some((b) => b.id === "saudis" && b.red),
      true,
    );
    assert.equal(dead.choices.length >= 1, true);
    vm.backOne();
    const live = vm.getState();
    assert.equal(live.phase, "playing");
    assert.equal(live.endingTitle, null);
    assert.equal(live.grave, null);
    assert.equal(live.leader.id, "ike");
  });

  it("my_party letter follows the seated president", () => {
    const ike = new TrainViewModel("us", "D").getState();
    assert.equal(ike.party, "R");
    assert.equal(
      ike.bars.some((b) => b.label === "My party (R)"),
      true,
    );
    const kennedy = new TrainViewModel("us", "R", "white-revolution-1963").getState();
    assert.equal(kennedy.party, "D");
    assert.equal(
      kennedy.bars.some((b) => b.label === "My party (D)"),
      true,
    );
  });

  it("1953 clocks display does not claim a breakout number", () => {
    const ui = new TrainViewModel("us", "R").getState();
    assert.equal(
      ui.clocks.some((c) => c.id === "nuke" && c.display !== "off"),
      false,
    );
  });

  it("1953 US advisors are Washington's room, not Tehran's", () => {
    const ui = new TrainViewModel("us", "R").getState();
    const ids = ui.card.briefings.map((b) => b.faction);
    assert.equal(ids.includes("cia"), true);
    assert.equal(ids.includes("my_party"), true);
    assert.equal(ids.includes("street"), false);
    assert.equal(ids.includes("leader"), false);
    assert.equal(ids.includes("irgc"), false);
    assert.equal(ui.card.actionPrompt, "What do you want to do?");
    assert.equal(ui.canFurtherBack, true);
    assert.equal(ui.choices.length, 2);
    assert.equal(ui.card.title, "To Coup or Not to Coup");
    for (const c of ui.choices) {
      assert.equal(/1979|satrap|game over|stalin|turban|theocracy/i.test(c.summary), false);
    }
  });

  it("1953 Iran advisors are the court and the street", () => {
    const ui = new TrainViewModel("iran", "D").getState();
    assert.equal(ui.card.title, "Danger: Coup!");
    const ids = ui.card.briefings.map((b) => b.faction);
    assert.deepEqual(ids.sort(), ["leader", "street"]);
    assert.equal(
      ui.card.briefings.some((b) => b.faction === "leader" && b.label === "The court"),
      true,
    );
    assert.equal(ids.includes("cia"), false);
    assert.equal(ids.includes("media"), false);
    assert.equal(ids.includes("my_party"), false);
    assert.equal(ids.includes("opposing_party"), false);
    assert.equal(ids.includes("saudis"), false);
    assert.equal(ids.includes("europeans"), false);
  });

  it("further back presents the 1938 card without labelling history", () => {
    const vm = new TrainViewModel("us", "R");
    vm.furtherBack();
    const ui = vm.getState();
    assert.equal(ui.card.id, "hitler-1938");
    assert.equal(ui.card.secret, true);
    for (const c of ui.choices) {
      assert.equal(/historical|what happened/i.test(c.label), false);
    }
  });

  it("labels the 1953 leader bar as the court", () => {
    const ui = new TrainViewModel("iran", "D").getState();
    assert.equal(
      ui.bars.some((b) => b.id === "leader" && b.label === "The court"),
      true,
    );
  });

  it("Iran hiring the British engineers is the street grave", () => {
    const vm = new TrainViewModel("iran", "D");
    vm.choose("ir-deal-london");
    const ui = vm.getState();
    assert.equal(ui.phase, "ended");
    assert.equal(ui.endingId, "mossadegh_street");
    assert.equal(ui.leader.id, "mossadegh");
    assert.match(ui.endingBody ?? "", /Lawrence|Venezuela|bazaar/i);
    assert.equal(ui.museum.csoFound, 1);
    assert.match(ui.museum.csoNames.join(" "), /British engineers/);
  });

  it("Moscow is a surviving grave store, Kuwait is a shot grave", () => {
    const moscow = new TrainViewModel("iran", "D", undefined, { museum: memoryMuseumStore() });
    moscow.choose("ir-deal-moscow");
    const m = moscow.getState();
    assert.equal(m.endingId, "mossadegh_falls");
    assert.equal(m.museum.csoFound, 1);
    assert.match(m.museum.csoNames.join(" "), /embassy/);
    const kuwait = new TrainViewModel("iran", "D", "kuwait-1990", { museum: memoryMuseumStore() });
    kuwait.choose("ir-side-saddam");
    const k = kuwait.getState();
    assert.equal(k.endingId, "kuwait_grave");
    assert.equal(k.museum.csoFound, 0);
  });

  it("Iran nationalize seats the Shah and says so", () => {
    const vm = new TrainViewModel("iran", "D");
    assert.equal(vm.getState().leader.id, "mossadegh");
    vm.choose("ir-nationalize");
    const ui = vm.getState();
    assert.equal(ui.card.id, "deposed-1953");
    assert.equal(ui.face, "shah");
    assert.equal(ui.leader.id, "shah");
    assert.equal(ui.leader.youAre, "You are the Shah");
    assert.match(ui.card.title, /deposed/i);
    assert.match(ui.card.situation, /Mohammad Reza Pahlavi/);
    const ids = ui.bars.map((b) => b.id);
    assert.equal(ids.includes("cia"), true);
    assert.equal(ids.includes("street"), true);
    assert.equal(ids.includes("my_party"), false);
  });

  it("names the US face as the years move", () => {
    assert.equal(new TrainViewModel("us", "R").getState().leader.youAre, "You are Ike");
    assert.equal(new TrainViewModel("us", "R").getState().leader.playing, "Playing Ike");
    assert.equal(new TrainViewModel("us", "R").getState().leader.partyLabel, "Republican");
    assert.equal(
      new TrainViewModel("us", "R", "white-revolution-1963").getState().leader.youAre,
      "You are Kennedy",
    );
    assert.equal(
      new TrainViewModel("us", "R", "white-revolution-1963").getState().leader.partyLabel,
      "Democrat",
    );
    assert.equal(
      new TrainViewModel("us", "R", "weapons-1972").getState().leader.youAre,
      "You are Nixon",
    );
    assert.equal(
      new TrainViewModel("us", "R", "revolution-1979").getState().leader.youAre,
      "You are Carter",
    );
    assert.equal(
      new TrainViewModel("us", "R", "inaugurated-1981").getState().leader.youAre,
      "You are Reagan",
    );
    assert.equal(
      new TrainViewModel("us", "R", "inaugurated-1981").getState().leader.partyLabel,
      "Republican",
    );
    assert.equal(
      new TrainViewModel("us", "R", "hormuz-2019").getState().leader.youAre,
      "You are Trump",
    );
    assert.equal(
      new TrainViewModel("us", "R", "sofa-1964").getState().leader.youAre,
      "You are Johnson",
    );
    assert.equal(
      new TrainViewModel("us", "R", "pipeline-1975").getState().leader.youAre,
      "You are Ford",
    );
    assert.equal(
      new TrainViewModel("us", "R", "robe-1989").getState().leader.id,
      "bush41",
    );
    assert.equal(
      new TrainViewModel("us", "R", "robe-1989").getState().leader.youAre,
      "You are Bush",
    );
    assert.equal(
      new TrainViewModel("us", "R", "dual-containment-1993").getState().leader.youAre,
      "You are Clinton",
    );
    assert.equal(
      new TrainViewModel("us", "R", "nine-eleven-2001").getState().leader.id,
      "bush43",
    );
    assert.equal(
      new TrainViewModel("us", "R", "natanz-2002").getState().leader.id,
      "bush43",
    );
    assert.equal(
      new TrainViewModel("us", "R", "green-2009").getState().leader.youAre,
      "You are Obama",
    );
    assert.equal(
      new TrainViewModel("us", "R", "unleave-2021").getState().leader.youAre,
      "You are Biden",
    );
    assert.equal(
      new TrainViewModel("us", "R", "twelve-days-2025").getState().leader.youAre,
      "You are Trump",
    );
  });

  it("Kennedy's caucus is Democrat, not leftover Ike", () => {
    const ui = new TrainViewModel("us", "R", "white-revolution-1963").getState();
    assert.equal(ui.party, "D");
    assert.equal(ui.bars.find((b) => b.id === "my_party")?.label, "My party (D)");
    assert.equal(ui.bars.find((b) => b.id === "opposing_party")?.label, "Opposing (R)");
    assert.equal(ui.card.briefings.find((b) => b.faction === "my_party")?.label, "My party (D)");
    assert.equal(
      ui.card.briefings.find((b) => b.faction === "opposing_party")?.label,
      "Opposing (R)",
    );
  });

  it("Carter's hostage card is a decision, not a footnote", () => {
    const ui = new TrainViewModel("us", "R", "hostages-1979").getState();
    assert.equal(ui.leader.id, "carter");
    assert.equal(ui.party, "D");
    assert.equal(ui.leader.partyLabel, "Democrat");
    assert.match(ui.card.situation, /occupied/);
    assert.equal(ui.choices.length, 2);
    assert.equal(
      ui.choices.some((c) => /444|reagan|election/i.test(`${c.label} ${c.summary}`)),
      false,
    );
    const ids = ui.card.briefings.map((b) => b.faction);
    assert.equal(ids.includes("cia"), true);
    assert.equal(ids.includes("irgc"), false);
    assert.equal(ids.includes("street"), false);
  });

  it("keep talking skips Desert One and still meets the Saudis before Saddam", () => {
    const vm = new TrainViewModel("us", "R", "hostages-1979");
    vm.choose("us-keep-talking");
    const ui = vm.getState();
    assert.equal(ui.card.id, "you-him-fight-1980");
    assert.equal(ui.leader.id, "carter");
    assert.match(ui.card.situation, /Shia/);
    vm.choose("us-let-saddam");
    assert.equal(vm.getState().card.id, "iran-iraq-1980");
  });

  it("a rescue does not kill the chair; running again is history, not a grave", () => {
    const vm = new TrainViewModel("us", "R", "hostages-1979");
    vm.choose("us-eagle-claw");
    const wreck = vm.getState();
    assert.equal(wreck.phase, "playing");
    assert.equal(wreck.card.id, "eagle-claw-1980");
    assert.equal(wreck.leader.id, "carter");
    assert.equal(wreck.endingTitle, null);
    assert.match(wreck.card.title, /Desert One/);
    assert.match(wreck.card.situation, /Tabas|Vance|eight/i);
    vm.choose("us-see-wreckage");
    const lineup = vm.getState();
    assert.equal(lineup.card.id, "you-him-fight-1980");
    assert.match(lineup.card.title, /you and him fight/i);
    assert.match(lineup.card.situation, /Shia/);
    vm.choose("us-let-saddam");
    const war = vm.getState();
    assert.equal(war.phase, "playing");
    assert.equal(war.card.id, "iran-iraq-1980");
    assert.equal(war.leader.id, "carter");
    assert.equal(war.endingTitle, null);
    vm.choose("us-no-tilt");
    const exam = vm.getState();
    assert.equal(exam.phase, "playing");
    assert.equal(exam.card.id, "election-1980");
    assert.match(exam.card.situation, /nightly open/i);
    vm.choose("us-run-again");
    const oath = vm.getState();
    assert.equal(oath.phase, "playing");
    assert.equal(oath.card.id, "inaugurated-1981");
    assert.equal(oath.leader.id, "reagan");
    assert.equal(oath.leader.youAre, "You are Reagan");
    assert.equal(oath.party, "R");
    assert.equal(oath.leader.partyLabel, "Republican");
    assert.equal(oath.endingTitle, null);
    vm.choose("us-sit-reagan");
    const listed = vm.getState();
    assert.equal(listed.phase, "playing");
    assert.equal(listed.card.id, "delist-1982");
    assert.equal(listed.leader.id, "reagan");
    assert.match(listed.card.title, /terrorism list/i);
    assert.match(listed.card.situation, /precursor|pesticide/i);
    vm.choose("us-delist-iraq");
    const tilt = vm.getState();
    assert.equal(tilt.phase, "playing");
    assert.equal(tilt.card.id, "tilt-1982");
    assert.equal(tilt.leader.id, "reagan");
    vm.choose("us-cia-baghdad");
    const bekah = vm.getState();
    assert.equal(bekah.phase, "playing");
    assert.equal(bekah.card.id, "lebanon-1983");
    assert.equal(bekah.leader.id, "reagan");
    vm.choose("us-bring-home");
    const channel = vm.getState();
    assert.equal(channel.phase, "playing");
    assert.equal(channel.card.id, "iran-contra-1985");
    assert.equal(channel.leader.id, "reagan");
    assert.equal(channel.endingTitle, null);
    vm.choose("us-sell-missiles");
    const cup = vm.getState();
    assert.equal(cup.phase, "playing");
    assert.equal(cup.card.id, "cup-1988");
    assert.equal(cup.leader.id, "reagan");
  });

  it("Bazargan resigning seats Banisadr; holding the embassy still seats the next letterhead", () => {
    const stay = new TrainViewModel("iran", "D", "hostages-1979");
    stay.choose("ir-let-students");
    const seatedStay = stay.getState();
    assert.equal(seatedStay.phase, "playing");
    assert.equal(seatedStay.card.id, "resigned-1979");
    assert.equal(seatedStay.leader.id, "banisadr");
    assert.equal(seatedStay.leader.youAre, "You are Banisadr");
    const quit = new TrainViewModel("iran", "D", "hostages-1979");
    quit.choose("ir-demand-leave");
    const seated = quit.getState();
    assert.equal(seated.phase, "playing");
    assert.equal(seated.card.id, "resigned-1979");
    assert.equal(seated.leader.id, "banisadr");
    assert.equal(seated.leader.youAre, "You are Banisadr");
  });

  it("Bazargan faces the embassy, not CIA", () => {
    const ui = new TrainViewModel("iran", "D", "hostages-1979").getState();
    assert.equal(ui.leader.id, "bazargan");
    assert.equal(ui.face, "bazargan");
    const ids = ui.card.briefings.map((b) => b.faction);
    assert.deepEqual([...ids].sort(), ["irgc", "leader", "street"]);
    assert.equal(ui.choices.length, 2);
  });

  it("Iran starts as Playing Mossadegh", () => {
    const ui = new TrainViewModel("iran", "D").getState();
    assert.equal(ui.leader.playing, "Playing Mossadegh");
    assert.equal(ui.leader.youAre, "You are Mossadegh");
    assert.equal(ui.grave, null);
  });

  it("Mossadegh's Moscow grave swaps the portrait to Stalin in a turban", () => {
    const vm = new TrainViewModel("iran", "D");
    vm.choose("ir-deal-moscow");
    const ui = vm.getState();
    assert.equal(ui.phase, "ended");
    assert.equal(ui.endingId, "mossadegh_falls");
    assert.equal(ui.leader.id, "stalin_turban");
    assert.equal(ui.leader.youAre, "You get Stalin in a turban");
    assert.equal(ui.faceLabel, "Stalin in a turban");
    assert.equal(ui.grave, null);
    assert.equal(ui.imam, null);
    assert.match(ui.endingBody ?? "", /Saudis enter the Soviet sphere/);
  });

  it("1963 shows urban liberals and does not claim a breakout number", () => {
    const ui = new TrainViewModel("us", "R", "white-revolution-1963").getState();
    assert.equal(ui.clocks.some((c) => c.id === "liberals"), true);
    assert.equal(ui.clocks.some((c) => c.id === "nuke"), false);
    assert.match(ui.card.situation, /pressing the Shah to modernize/);
    assert.equal(ui.choices.length, 2);
    assert.equal(ui.card.actionPrompt, "What do you want to do?");
  });

  it("1972 situation names the muddle", () => {
    const ui = new TrainViewModel("us", "R", "weapons-1972").getState();
    assert.match(ui.card.situation, /Iran muddles along/);
    assert.match(ui.card.situation, /Rural Iran does not/);
    assert.equal(ui.leader.id, "nixon");
    assert.match(ui.card.situation, /east of Suez|Nixon Doctrine/i);
  });

  it("White Revolution tanks is still Kennedy, still playing", () => {
    const vm = new TrainViewModel("us", "R", "white-revolution-1963");
    assert.equal(vm.getState().leader.youAre, "You are Kennedy");
    vm.choose("us-send-tanks");
    const ui = vm.getState();
    assert.equal(ui.phase, "playing");
    assert.equal(ui.card.id, "sofa-1964");
    assert.equal(ui.endingTitle, null);
    assert.equal(ui.leader.youAre, "You are Johnson");
  });

  it("the Imam sits beside Bazargan and is not the player", () => {
    const veil = new TrainViewModel("iran", "D", "veil-1979").getState();
    assert.equal(veil.leader.id, "bazargan");
    assert.equal(veil.leader.youAre, "You are Bazargan");
    assert.equal(veil.leader.portrait, "/leaders/bazargan.jpg");
    assert.ok(veil.imam);
    assert.equal(veil.imam?.id, "khomeini");
    assert.equal(veil.imam?.playing, "The Imam");
    assert.equal(veil.imam?.youAre, "He has the guns");
    assert.equal(/You are Khomeini/i.test(veil.imam?.youAre ?? ""), false);
    const war = new TrainViewModel("iran", "D", "cup-1988").getState();
    assert.equal(war.leader.id, "khamenei");
    assert.equal(war.leader.youAre, "You are Khamenei");
    assert.equal(war.leader.portrait, "/leaders/khamenei.jpg");
    assert.equal(/You are Khomeini/i.test(war.leader.youAre), false);
    assert.equal(war.imam?.id, "khomeini");
    assert.equal(war.imam?.youAre, "He has the guns");
    const moss = new TrainViewModel("iran", "D").getState();
    assert.equal(moss.imam, null);
    const shah = new TrainViewModel("iran", "D", "deposed-1953").getState();
    assert.equal(shah.imam, null);
    const us = new TrainViewModel("us", "R", "veil-1979").getState();
    assert.equal(us.imam, null);
  });

  it("Banisadr leaving seats Khamenei, still playing, Imam still the other plate", () => {
    const vm = new TrainViewModel("iran", "D", "impeached-1981");
    const before = vm.getState();
    assert.equal(before.leader.id, "banisadr");
    assert.equal(before.imam?.id, "khomeini");
    for (const c of before.choices) {
      assert.equal(/khamenei|impeach|paris|leader/i.test(`${c.label} ${c.summary}`), false);
    }
    vm.choose("ir-leave-majles");
    const seated = vm.getState();
    assert.equal(seated.phase, "playing");
    assert.equal(seated.card.id, "seated-1981");
    assert.equal(seated.leader.id, "khamenei");
    assert.equal(seated.leader.youAre, "You are Khamenei");
    assert.equal(/You are Khomeini/i.test(seated.leader.youAre), false);
    assert.equal(seated.imam?.id, "khomeini");
    assert.equal(seated.imam?.youAre, "He has the guns");
    assert.match(seated.card.situation, /not the Imam/);
    vm.choose("ir-sit-khamenei");
    const bekah = vm.getState();
    assert.equal(bekah.phase, "playing");
    assert.equal(bekah.card.id, "lebanon-1983");
    assert.equal(bekah.leader.id, "khamenei");
    assert.equal(bekah.endingTitle, null);
  });

  it("Iran's Beirut briefing names the chemistry and Death to Europe; Washington does not", () => {
    const iran = new TrainViewModel("iran", "D", "lebanon-1983").getState();
    assert.equal(iran.leader.id, "khamenei");
    assert.match(iran.card.situation, /chemical|list|nuke/i);
    assert.match(iran.card.situation, /Death to Europe/);
    const irgc = iran.card.briefings.find((b) => b.faction === "irgc");
    assert.match(irgc?.rant ?? "", /chemical weapons/);
    assert.match(irgc?.rant ?? "", /Death to Europe/);
    assert.equal(iran.slogan, "Death to America. Death to Europe. Death to Israel.");
    for (const c of iran.choices) {
      assert.equal(/hostages|contra|241|truck/i.test(`${c.label} ${c.summary}`), false);
    }
    const us = new TrainViewModel("us", "R", "lebanon-1983").getState();
    assert.equal(/chemical weapons|nuke plant|Death to Europe/i.test(us.card.situation), false);
    assert.equal(us.slogan, null);
  });

  it("September 11 knocks Khamenei off the top of the US board", () => {
    const us = new TrainViewModel("us", "R", "nine-eleven-2001").getState();
    assert.equal(us.leader.id, "bush43");
    assert.match(us.card.title, /September 11/);
    assert.match(us.card.situation, /Khamenei is not the top of the board/);
    assert.match(us.card.situation, /Al-Qaeda/);
    const cia = us.card.briefings.find((b) => b.faction === "cia");
    assert.match(cia?.rant ?? "", /Khamenei just fell off the top of the board/);
    for (const c of us.choices) {
      assert.equal(/historical|what happened/i.test(`${c.label} ${c.summary}`), false);
    }
    const iran = new TrainViewModel("iran", "D", "nine-eleven-2001").getState();
    assert.equal(iran.leader.id, "khatami");
    assert.match(iran.card.situation, /Not you/);
    assert.equal(iran.imam?.id, "khamenei_imam");
  });

  it("Baghdad Iran briefings name killing US soldiers if the militias go", () => {
    const iran = new TrainViewModel("iran", "D", "baghdad-2003").getState();
    assert.match(iran.card.situation, /killing American soldiers/);
    const irgc = iran.card.briefings.find((b) => b.faction === "irgc");
    assert.match(irgc?.rant ?? "", /kill their soldiers/);
    for (const c of iran.choices) {
      assert.equal(/EFP|hundreds|4,500|body count/i.test(`${c.label} ${c.summary}`), false);
    }
    const us = new TrainViewModel("us", "R", "baghdad-2003").getState();
    const cia = us.card.briefings.find((b) => b.faction === "cia");
    assert.match(cia?.rant ?? "", /Explosively formed penetrators/);
    assert.match(cia?.rant ?? "", /Your soldiers/);
  });

  it("a moral letterhead choice presents the 7-Eleven overlay, then Iran continues", () => {
    const vm = new TrainViewModel("iran", "D", "resigned-1979");
    vm.choose("ir-refuse-letterhead");
    const ui = vm.getState();
    assert.equal(ui.phase, "playing");
    assert.equal(ui.card.id, "you-him-fight-1980");
    assert.equal(ui.leader.id, "replacement");
    assert.equal(ui.leader.youAre, "You are the replacement");
    assert.equal(ui.leader.portrait, "/leaders/letterhead.jpg");
    assert.equal(ui.lastResult?.title, "We congratulate you on your moral choice.");
    assert.equal(ui.lastResult?.kind, "moral");
    assert.match(ui.lastResult?.body ?? "", /convenience store/);
    assert.match(ui.lastResult?.body ?? "", /However, Iran continues on/);
    assert.equal(ui.museum.csoFound, 1);
    assert.match(ui.museum.csoNames.join(" "), /letterhead/);
    vm.dismissResult();
    assert.equal(vm.getState().lastResult, null);
    assert.equal(vm.getState().card.id, "you-him-fight-1980");
  });

  it("Hail Mary is a party capitulation, then Reagan still sits", () => {
    const vm = new TrainViewModel("us", "R", "election-1980");
    vm.choose("us-hail-mary");
    const ui = vm.getState();
    assert.equal(ui.card.id, "inaugurated-1981");
    assert.equal(ui.leader.id, "reagan");
    assert.equal(ui.lastResult?.kind, "serve");
    assert.match(ui.lastResult?.body ?? "", /Blue Dogs/);
    assert.match(ui.lastResult?.body ?? "", /Reagan still sits/);
    assert.equal(ui.museum.memoirsFound, 0);
    assert.equal(ui.museum.csoFound, 0);
  });

  it("keeping Family Protection deposes Bazargan onto a stick figure, then the embassy", () => {
    const vm = new TrainViewModel("iran", "D", "veil-1979");
    assert.equal(vm.getState().leader.id, "bazargan");
    vm.choose("ir-keep-fpl");
    const ui = vm.getState();
    assert.equal(ui.phase, "playing");
    assert.equal(ui.card.id, "hostages-1979");
    assert.equal(ui.leader.id, "replacement");
    assert.equal(ui.leader.youAre, "You are the replacement");
    assert.equal(ui.imam?.id, "khomeini");
    assert.match(ui.lastResult?.body ?? "", /convenience store/);
  });

  it("after the robe the player is Rafsanjani and the Imam plate is Khamenei", () => {
    const vm = new TrainViewModel("iran", "D", "robe-1989");
    const before = vm.getState();
    assert.equal(before.leader.id, "khamenei");
    assert.equal(before.imam?.id, "khomeini");
    vm.choose("ir-take-robe");
    const after = vm.getState();
    assert.equal(after.phase, "playing");
    assert.equal(after.card.id, "kuwait-1990");
    assert.equal(after.leader.id, "rafsanjani");
    assert.equal(after.leader.youAre, "You are Rafsanjani");
    assert.equal(after.imam?.id, "khamenei_imam");
    assert.equal(after.imam?.youAre, "He has the guns");
    assert.equal(/You are Khamenei/i.test(after.leader.youAre), false);
  });

  it("keeping the JCPOA limits is a successful path, not a grave", () => {
    const vm = new TrainViewModel("iran", "D", "bounce-2019");
    vm.choose("ir-keep-limits");
    const ui = vm.getState();
    assert.equal(ui.phase, "ended");
    assert.equal(ui.endingId, "jcpoa_holds");
    assert.equal(ui.leader.id, "rouhani");
    assert.match(ui.endingBody ?? "", /successful path/);
  });

  it("dropping Death to Israel takes it off the slogan", () => {
    const vm = new TrainViewModel("iran", "D", "abraham-2020");
    assert.match(vm.getState().slogan ?? "", /Death to Israel/);
    vm.choose("ir-drop-quds");
    const ui = vm.getState();
    assert.equal(/Death to Israel/.test(ui.slogan ?? ""), false);
    assert.match(ui.slogan ?? "", /Death to America/);
  });

  it("private Saudi talks skip 7 October", () => {
    const vm = new TrainViewModel("us", "R", "saudi-accord-2023");
    assert.match(vm.getState().card.title, /Saudi Arabia talks to Israel/);
    vm.choose("us-private-saudi");
    const ui = vm.getState();
    assert.equal(ui.card.id, "sit-pezeshkian-2024");
    assert.match(ui.lastResult?.body ?? "", /7 October does not happen/);
    assert.equal(ui.lastResult?.kind, "adapts");
  });

  it("museum starts empty and does not name unfound exits", () => {
    const vm = new TrainViewModel("us", "R", undefined, { museum: memoryMuseumStore() });
    const ui = vm.getState();
    assert.equal(ui.museum.usFound, 0);
    assert.equal(ui.museum.usTotal, 1);
    assert.equal(ui.museum.iranFound, 0);
    assert.equal(ui.museum.iranTotal, 3);
    assert.equal(ui.museum.nukesFound, 0);
    assert.equal(ui.museum.csoFound, 0);
    assert.equal(ui.museum.memoirsFound, 0);
    assert.deepEqual(ui.museum.usNames, []);
    assert.equal(/Imam|Fordow|hinterland|limits|Hamas/i.test(ui.museum.usNames.join(" ")), false);
  });

  it("stop after Fordow is not a peace exit and does not splat nukes", () => {
    const vm = new TrainViewModel("us", "R", "the-leader-2026", { museum: memoryMuseumStore() });
    vm.choose("us-stop-fordow");
    const ui = vm.getState();
    assert.equal(ui.endingId, "none");
    assert.equal(ui.museum.usFound, 0);
    assert.equal(ui.museum.nukesFound, 0);
    assert.equal(ui.museum.usTotal, 1);
    assert.equal(/Imam|Fordow/i.test(ui.museum.usNames.join(" ")), false);
  });

  it("private Saudi talks records a US peace exit and survives a new chair", () => {
    const bag = memoryMuseumStore();
    const vm = new TrainViewModel("us", "R", "saudi-accord-2023", { museum: bag });
    vm.choose("us-private-saudi");
    const ui = vm.getState();
    assert.equal(ui.museum.usFound, 1);
    assert.deepEqual([...ui.museum.usNames], ["Hamas cut off"]);
    assert.equal(/Imam|Fordow/i.test(ui.museum.usNames.join(" ")), false);
    const other = new TrainViewModel("iran", "D", undefined, { museum: bag }).getState();
    assert.equal(other.museum.usFound, 1);
    assert.equal(other.museum.iranFound, 0);
    assert.equal(other.museum.usTotal, 1);
  });

  it("keeping the limits records an Iran peace exit", () => {
    const vm = new TrainViewModel("iran", "D", "bounce-2019", { museum: memoryMuseumStore() });
    vm.choose("ir-keep-limits");
    const ui = vm.getState();
    assert.equal(ui.endingId, "jcpoa_holds");
    assert.equal(ui.museum.iranFound, 1);
    assert.match(ui.museum.iranNames.join(" "), /limits/);
    assert.equal(ui.museum.usFound, 0);
  });

  it("Farsi museum captions localize found names only", () => {
    const vm = new TrainViewModel("us", "R", "saudi-accord-2023", { museum: memoryMuseumStore() });
    vm.choose("us-private-saudi");
    const fa = vm.getState("fa");
    assert.equal(fa.museum.usFound, 1);
    assert.match(fa.museum.usNames.join(" "), /حماس/);
    assert.equal(fa.museum.usNames.length, 1);
  });

  it("two 7-Elevens stack on the convenience store counter", () => {
    const bag = memoryMuseumStore();
    const first = new TrainViewModel("iran", "D", "resigned-1979", { museum: bag });
    first.choose("ir-refuse-letterhead");
    assert.equal(first.getState().museum.csoFound, 1);
    const second = new TrainViewModel("iran", "D", "mahsa-2022", { museum: bag });
    second.choose("ir-fire-morality");
    const ui = second.getState();
    assert.equal(ui.museum.csoFound, 2);
    const joined = ui.museum.csoNames.join(" ");
    assert.match(joined, /letterhead/);
    assert.match(joined, /morality/);
    assert.equal(/Family Protection/.test(joined), false);
  });
});
