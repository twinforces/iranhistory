/**
 * What: the only place bars, clocks, purge, election, and time travel move.
 * Why: if a number changes in a button handler, the argument is no longer
 * testable. Cards declare deltas. This file applies them.
 */
import {
  BAR_DEAD,
  BAR_MAX,
  BAR_MIN,
  defaultBars,
  defaultClocks,
  ELECTION_MARGIN,
  LEADER_SIDELINE,
  MEDIA_INCUMBENT_FLOOR,
  OIL_PAIN_RED,
  SEED_2019,
  SEED_1979,
  SOFT_PURGE_IRGC,
} from "./constants.ts";
import { cardById, EASTER_EGG_CARD_ID, FIRST_CARD_ID } from "./cards.ts";
import { partyForUsYear, partyName } from "./leaders.ts";
import type {
  Bars,
  Card,
  Chair,
  Choice,
  Clocks,
  Deltas,
  Ending,
  EndingId,
  GameSnapshot,
  GameState,
  IranFace,
  MeterId,
  Party,
} from "./types.ts";

function clamp(n: number, min = BAR_MIN, max = BAR_MAX): number {
  return Math.max(min, Math.min(max, n));
}

function cloneState(state: GameState): GameState {
  return structuredClone(state);
}

function snapshotOf(state: GameState): GameSnapshot {
  const { history: _history, ...rest } = state;
  return structuredClone(rest);
}

function restoreSnapshot(snap: GameSnapshot, history: GameState["history"]): GameState {
  return { ...structuredClone(snap), history };
}

const BAR_KEYS: (keyof Bars)[] = [
  "irgc",
  "leader",
  "street",
  "my_party",
  "opposing_party",
  "media",
  "cia",
  "saudis",
  "europeans",
  "china",
  "venezuela",
];

const CLOCK_KEYS: (keyof Clocks)[] = [
  "nuke_breakout_months",
  "missile_inventory_months",
  "hard_currency",
  "oil_pain",
  "drone_holes_known",
  "future_irgc_grudge",
  "liberals",
];

function applyDeltas(state: GameState, deltas: Deltas | undefined): void {
  if (!deltas) return;
  for (const [raw, amount] of Object.entries(deltas)) {
    if (amount === undefined) continue;
    const key = raw as MeterId;
    if ((BAR_KEYS as string[]).includes(key)) {
      const k = key as keyof Bars;
      state.bars[k] = clamp(state.bars[k] + amount);
      continue;
    }
    if (key === "nuke_breakout_months" || key === "missile_inventory_months") {
      const current = state.clocks[key];
      if (current === null) continue;
      state.clocks[key] = Math.max(0, current + amount);
      continue;
    }
    if ((CLOCK_KEYS as string[]).includes(key)) {
      const k = key as keyof Clocks;
      const current = state.clocks[k];
      if (typeof current === "number") {
        state.clocks[k] = clamp(current + amount, 0, 200) as never;
      }
    }
  }
}

function isSoft(choice: Choice): boolean {
  return choice.kind === "soft" || choice.kind === "deal" || choice.kind === "walk";
}

const ENDINGS: Record<Exclude<EndingId, "none">, Omit<Ending, "id">> = {
  satrap_1953: {
    title: "It was not that simple",
    referee:
      "You did not pick up the phone. Mossadegh kept the oil and the chair long enough for the men with guns who were not him to notice. Tudeh had a file and a militia. The mosque had the village. What sits Tehran is not a liberal oil republic. It is a half-commie theocracy. Stalin in a turban.\n\nRiyadh watches a red flag over Abadan and does the math. The Saudis enter the Soviet sphere. The Gulf is their problem, then yours, the hard way.\n\nWe do not know that this is what 1953-without-Ajax becomes. The game's rule is: someone with guns still takes the building. AL, not a prediction. Time travel is the honest button.",
  },
  mossadegh_falls: {
    title: "It was not that simple",
    referee:
      "You asked the other embassy. Moscow will run the oil. Tudeh had a file and a militia. The mosque had the village. What sits Tehran is a half-commie theocracy. Stalin in a turban. Riyadh does the math. The Saudis enter the Soviet sphere. This chair is dead.",
    canContinue: false,
  },
  mossadegh_deal: {
    title: "It was not that simple",
    referee:
      "You kept the chair by giving London the oil. Then you reached for a plant of your own. The street had already spent you. The court still had rifles. The men who actually had guns were Tudeh and the mosque. What sits Tehran is a half-commie theocracy. Stalin in a turban. Riyadh does the math. The Saudis enter the Soviet sphere. You do not get the oil and the atoms. This chair is dead.",
    canContinue: false,
  },
  mossadegh_street: {
    title: "The street heard the lesson",
    referee:
      "You hired the British engineers. The square heard Lawrence's lesson. Pacify London and you are Chevron's man with a nationalist haircut. Venezuela already knows this story. The street filled for the oil. The street does not fill for a British invoice. Tudeh is not who gets you. The bazaar is. This chair is dead. AL, not a prediction.",
    canContinue: false,
  },
  shah_flees: {
    title: "The suitcase again",
    referee:
      "You packed it. The army noticed. A king who runs twice does not keep a country. Mohammad Mossadegh is already out. Now you are out too. This chair is empty.",
    canContinue: false,
  },
  shah_holds: {
    title: "The king still sits",
    referee:
      "You spent the oil on the villages. The hinterland did not come to the square. Khomeini stays in Paris. The army is cooler, but it still answers. You kept the throne. History did not take this fork, so there is no later rail. This is the successful path. AL.",
    canContinue: false,
  },
  bazargan_resigns: {
    title: "The smiling face resigns",
    referee:
      "You told the students to leave. The Imam did not. Mehdi Bazargan resigns. The hostage file belongs to the Imam and to the men standing up a parallel army. This chair is dead.",
    canContinue: false,
  },
  face_no_guns: {
    title: "The face does not have the guns",
    referee:
      "You tried to command a war whose barracks were not yours. The Guards took the building. The smiling face is a memory. This chair is dead.",
    canContinue: false,
  },
  poison_chalice: {
    title: "The Imam drinks the cup",
    referee:
      "Eight years. Chemical weapons. A generation of boys. The Guards learn never to fight fair again. Khomeini drinks the poison chalice and accepts the ceasefire. You were the letterhead. You were not the war.",
    canContinue: false,
  },
  irgc_purge: {
    title: "The Guards install a new face",
    referee:
      "You are not the IRGC. You are the face the IRGC can replace. Soft move, red bar. They raise a new President. The program does not pause. You lose.",
  },
  leader_sideline: {
    title: "Sidelined twice",
    referee:
      "The Leader withheld the veto, then picked a replacement. You still have a pulse. You do not have a chair.",
  },
  election_loss: {
    title: "The other party takes the chair",
    referee:
      "US death is electoral, not ballistic. The rail continues. Your fingerprints stay on the meters. This slice ends the run so you can time travel. Later: watch as the out-party.",
  },
  nuke_splat: {
    title: "Breakout hit zero",
    referee:
      "A dash to a first device is now a shop problem. Nuclear use on cities is an ending, not a weekly button.",
  },
  kharg_zero: {
    title: "Kharg",
    referee: "Hard currency to zero. Clocks to zero. The media says we are meanies.",
  },
  rebuild_deal: {
    title: "The $300B deal",
    referee:
      "Neighbors invest. IRGC assets the US destroyed come with strings. Iran survives. You personally get killed in revenge. AL.",
  },
  hormuz_toll: {
    title: "Fifty percent at the Strait",
    referee: "Iran holds the Middle East hostage. The US cannot intervene. AL.",
  },
  hitler_shot: {
    title: "The man is dead. The oil is not.",
    referee:
      "Europe still finds a war, just with uglier paperwork. The Anglo-Iranian Oil Company still has a concession. Mossadegh is still going to nationalize it. You did not solve Persia by solving Berlin. AL. 1953 is the actual chair.",
    canContinue: true,
  },
};

function endingOf(id: EndingId): Ending | null {
  if (id === "none") return null;
  const body = ENDINGS[id];
  return { id, ...body };
}

function bleedSentence(state: GameState, choice: Choice, card: Card): string {
  const bits: string[] = [];
  if (choice.delayedDeltas?.street) bits.push("Street will remember.");
  if (choice.delayedDeltas?.irgc) bits.push("IRGC will remember the pause, or the shot.");
  if (choice.kind === "ignore") bits.push("The next card is already written.");
  if (choice.kind === "bomb") bits.push("Shooting leaks a map.");
  if (state.clocks.nuke_breakout_months !== null) {
    bits.push(`Breakout ${state.clocks.nuke_breakout_months} months.`);
  }
  if (bits.length === 0) return "The next card is already written.";
  return bits.join(" ");
}

function iranLoseCheck(state: GameState, choice: Choice, card: Card): Ending | null {
  if (state.chair !== "iran") return null;
  if (!card.visibleFactions.includes("irgc")) return null;
  const irgc = state.bars.irgc;
  const leader = state.bars.leader;
  if (isSoft(choice) && irgc < SOFT_PURGE_IRGC) return endingOf("irgc_purge");
  if (irgc < BAR_DEAD) return endingOf("irgc_purge");
  if (leader < LEADER_SIDELINE && irgc >= SOFT_PURGE_IRGC) {
    state.sidelineCount += 1;
    if (state.sidelineCount >= 2) return endingOf("leader_sideline");
  } else if (leader >= LEADER_SIDELINE) {
    state.sidelineCount = 0;
  }
  return null;
}

function usElectionCheck(state: GameState, card: Card): Ending | null {
  if (state.chair !== "us") return null;
  if (!card.electionYear) return null;
  const { my_party, opposing_party, media } = state.bars;
  if (opposing_party > my_party + ELECTION_MARGIN) return endingOf("election_loss");
  const tied = Math.abs(opposing_party - my_party) <= ELECTION_MARGIN;
  if (tied) {
    const keep = media >= MEDIA_INCUMBENT_FLOOR && state.clocks.oil_pain < OIL_PAIN_RED;
    if (!keep) return endingOf("election_loss");
  }
  return null;
}

function clocksSplat(state: GameState): Ending | null {
  if (state.clocks.nuke_breakout_months === 0) return endingOf("nuke_splat");
  return null;
}

export function currentCard(state: GameState): Card {
  const card = cardById(state.cardId);
  if (!card) throw new Error(`Unknown card: ${state.cardId}`);
  return card;
}

export function iranFaceOf(state: GameState): IranFace {
  const face = state.flags.iran_face;
  if (face === "shah") return "shah";
  if (face === "bazargan") return "bazargan";
  if (face === "banisadr") return "banisadr";
  if (face === "khamenei") return "khamenei";
  return "mossadegh";
}

function faceMatches(filter: IranFace | readonly IranFace[] | undefined, face: IranFace): boolean {
  if (!filter) return true;
  return typeof filter === "string" ? filter === face : filter.includes(face);
}

export function choicesFor(state: GameState, card: Card = currentCard(state)): Choice[] {
  const list = state.chair === "us" ? card.usChoices : card.iranChoices;
  const face = state.chair === "iran" ? iranFaceOf(state) : null;
  return list.filter((c) => {
    if (face && !faceMatches(c.face, face)) return false;
    if (c.requiresFlag && !state.flags[c.requiresFlag]) return false;
    if (c.unlessFlag && state.flags[c.unlessFlag]) return false;
    return true;
  });
}

export function isGrey(state: GameState, choice: Choice): boolean {
  if (!choice.requires) return false;
  return choice.requires.some((req) => state.bars[req.faction] < req.min);
}

export interface NewGameOpts {
  chair: Chair;
  party: Party;
  cardId?: string;
}

const SHAH_ISOLATION = new Set([
  "deposed-1953",
  "atoms-1957",
  "white-revolution-1963",
  "weapons-1972",
  "revolution-1979",
]);

const BAZARGAN_ISOLATION = new Set(["veil-1979", "hostages-1979"]);

const BANISADR_ISOLATION = new Set([
  "resigned-1979",
  "iran-iraq-1980",
  "election-1980",
  "inaugurated-1981",
  "impeached-1981",
]);

const KHAMENEI_ISOLATION = new Set([
  "seated-1981",
  "lebanon-1983",
  "iran-contra-1985",
  "cup-1988",
]);

const SEED_1979_CARDS = new Set([
  "revolution-1979",
  "veil-1979",
  "hostages-1979",
  "resigned-1979",
  "iran-iraq-1980",
  "election-1980",
  "inaugurated-1981",
  "tilt-1982",
  "impeached-1981",
  "seated-1981",
  "lebanon-1983",
  "iran-contra-1985",
  "cup-1988",
]);

const SHAH_ADMITTED = new Set([
  "hostages-1979",
  "veil-1979",
  "iran-iraq-1980",
  "election-1980",
  "inaugurated-1981",
  "tilt-1982",
  "impeached-1981",
  "seated-1981",
  "lebanon-1983",
  "iran-contra-1985",
  "cup-1988",
]);

function isolationIranFace(cardId: string): IranFace {
  if (BAZARGAN_ISOLATION.has(cardId)) return "bazargan";
  if (KHAMENEI_ISOLATION.has(cardId)) return "khamenei";
  if (BANISADR_ISOLATION.has(cardId)) return "banisadr";
  if (SHAH_ISOLATION.has(cardId)) return "shah";
  return "mossadegh";
}

function seatUsParty(state: GameState, year: number): void {
  if (state.chair !== "us") return;
  const nextParty = partyForUsYear(year);
  if (nextParty === state.party) return;
  const mine = state.bars.my_party;
  state.bars.my_party = state.bars.opposing_party;
  state.bars.opposing_party = mine;
  state.party = nextParty;
  state.log.push(`The White House changes parties. You are now sitting as a ${partyName(nextParty)}.`);
}

export function newGame(opts: NewGameOpts): GameState {
  const cardId = opts.cardId ?? FIRST_CARD_ID;
  const card = cardById(cardId);
  if (!card) throw new Error(`Unknown card: ${cardId}`);
  const party = opts.chair === "us" ? partyForUsYear(card.year) : opts.party;
  const bars = defaultBars(opts.chair, party);
  const clocks = defaultClocks();
  if (cardId === "hormuz-2019") {
    Object.assign(bars, SEED_2019.bars);
    Object.assign(clocks, SEED_2019.clocks);
  }
  if (
    SEED_1979_CARDS.has(cardId) ||
    cardId === "weapons-1972" ||
    cardId === "white-revolution-1963"
  ) {
    if (cardId === "white-revolution-1963") clocks.liberals = 18;
    if (cardId === "weapons-1972") clocks.liberals = 42;
    if (SEED_1979_CARDS.has(cardId)) {
      Object.assign(bars, SEED_1979.bars);
      Object.assign(clocks, SEED_1979.clocks);
    }
  }
  if (card.clocksOn && clocks.nuke_breakout_months === null) {
    clocks.nuke_breakout_months = 24;
    clocks.missile_inventory_months = 12;
  }
  return {
    chair: opts.chair,
    party,
    phase: "playing",
    cardId,
    bars,
    clocks,
    flags: {
      china_swap_on: cardId === "hormuz-2019",
      vz_oil_unlocked: cardId === "hormuz-2019",
      iran_face: opts.chair === "iran" ? isolationIranFace(cardId) : "",
      shah_admitted: SHAH_ADMITTED.has(cardId),
      hinterland_spent: false,
      letterhead_generic: false,
    },
    delayed: {},
    sloganVolume: card.sloganVolume ?? 0,
    lastBleed: "",
    lastChoiceId: null,
    lastChoiceWasSoft: false,
    lastResult: null,
    sidelineCount: 0,
    ending: null,
    outParty: false,
    history: [],
    log: [`${opts.chair === "us" ? "Washington" : "Tehran"} chair. Party tag ${party}.`],
  };
}

export function applyChoice(state: GameState, choiceId: string): GameState {
  if (state.phase !== "playing") return state;
  const card = currentCard(state);
  const choice = choicesFor(state, card).find((c) => c.id === choiceId);
  if (!choice) throw new Error(`Unknown choice ${choiceId} on ${card.id}`);
  if (isGrey(state, choice)) return state;

  const next = cloneState(state);
  next.history = [...state.history, snapshotOf(state)];
  next.lastResult = null;

  applyDeltas(next, state.delayed);
  next.delayed = { ...(choice.delayedDeltas ?? {}) };
  applyDeltas(next, choice.deltas);
  if (choice.flags) Object.assign(next.flags, choice.flags);
  if (card.sloganVolume !== undefined) next.sloganVolume = card.sloganVolume;
  next.lastChoiceId = choice.id;
  next.lastChoiceWasSoft = isSoft(choice);
  next.lastBleed = bleedSentence(next, choice, card);
  next.log = [...next.log, `${card.yearLabel}: ${choice.label}`];

  const forced = choice.historical ? null : choice.ending ? endingOf(choice.ending) : null;
  const purged = choice.historical ? null : iranLoseCheck(next, choice, card);
  const elected = choice.historical ? null : usElectionCheck(next, card);
  const splat = choice.historical ? null : clocksSplat(next);
  const ending = forced ?? purged ?? elected ?? splat;
  if (ending) {
    next.phase = "ended";
    next.ending =
      choice.result || choice.resultTitle
        ? {
            ...ending,
            title: choice.resultTitle ?? ending.title,
            referee: choice.result ?? ending.referee,
          }
        : ending;
    return next;
  }

  if (choice.epilogue && (choice.resultTitle || choice.result)) {
    next.lastResult = {
      title: choice.resultTitle ?? "We congratulate you on your moral choice.",
      body: choice.result ?? "",
    };
  }

  const nextId = choice.nextCard ?? card.next;
  if (nextId) {
    const upcoming = cardById(nextId);
    if (upcoming?.status === "playable") {
      next.cardId = upcoming.id;
      if (upcoming.id === "veil-1979") {
        next.bars.irgc = Math.max(next.bars.irgc, 58);
      }
      if (upcoming.id === "hostages-1979") {
        next.bars.irgc = Math.max(next.bars.irgc, 58);
      }
      if (upcoming.clocksOn && next.clocks.nuke_breakout_months === null) {
        next.clocks.nuke_breakout_months = 18;
        next.clocks.missile_inventory_months = 10;
      }
      seatUsParty(next, upcoming.year);
    } else if (upcoming) {
      next.phase = "ended";
      next.ending = {
        id: "none",
        title: choice.resultTitle ?? "The years go",
        referee:
          choice.result ??
          "The next years are on the rail. This slice is not wired to play them yet. Time travel, or sit the other chair.",
        canContinue: false,
      };
    }
  } else {
    next.phase = "ended";
    next.ending = {
      id: "none",
      title: "End of the wired rail",
      referee: "No next card. Hormuz as a map is on hold.",
      canContinue: false,
    };
  }
  return next;
}

export function timeTravelBackOne(state: GameState): GameState {
  const prev = state.history[state.history.length - 1];
  if (!prev) return state;
  return restoreSnapshot(prev, state.history.slice(0, -1));
}

export function timeTravelToBranch(state: GameState): GameState {
  for (let i = state.history.length - 1; i >= 0; i--) {
    const snap = state.history[i];
    const card = cardById(snap.cardId);
    if (card?.branchPoint) {
      return restoreSnapshot(snap, state.history.slice(0, i));
    }
  }
  return timeTravelBackOne(state);
}

export function timeTravelFurtherBack(state: GameState): GameState {
  if (state.cardId !== FIRST_CARD_ID) return state;
  const egg = cardById(EASTER_EGG_CARD_ID);
  if (!egg) return state;
  const next = cloneState(state);
  next.history = [...state.history, snapshotOf(state)];
  next.cardId = EASTER_EGG_CARD_ID;
  next.phase = "playing";
  next.ending = null;
  next.lastResult = null;
  next.log = [...next.log, "The calendar ran backward."];
  return next;
}

export function canTimeTravel(state: GameState): {
  backOne: boolean;
  backToBranch: boolean;
  furtherBack: boolean;
} {
  const backOne = state.history.length > 0;
  const backToBranch = state.history.some((snap) => cardById(snap.cardId)?.branchPoint);
  const furtherBack = state.cardId === FIRST_CARD_ID && state.history.length === 0 && state.phase === "playing";
  return { backOne, backToBranch, furtherBack };
}
