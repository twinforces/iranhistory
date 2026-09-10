import type { Bars, Chair, Clocks, FactionId, Party } from "./types.ts";

export const BAR_MIN = 0;
export const BAR_MAX = 100;
export const BAR_RED = 35;
export const BAR_DEAD = 20;
export const LEADER_SIDELINE = 25;
export const ELECTION_MARGIN = 10;
export const MEDIA_INCUMBENT_FLOOR = 45;
export const OIL_PAIN_RED = 70;
export const SOFT_PURGE_IRGC = 35;

export const FACTION_ORDER: readonly FactionId[] = [
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

export const FACTION_LABEL: Record<FactionId, string> = {
  irgc: "IRGC",
  leader: "Leader",
  street: "Street",
  my_party: "My party",
  opposing_party: "Opposing",
  media: "US media",
  cia: "CIA",
  saudis: "Saudis",
  europeans: "Europeans",
  china: "China",
  venezuela: "Venezuela",
};

export const FACTION_BLURB: Record<FactionId, string> = {
  irgc: "Budget, missiles, proxies, the claim that only they stand between the Leader and 1979-in-reverse.",
  leader: "Survival of velayat-e faqih. Parables. Veto. Lets the Guards do the killing.",
  street: "Tired, broke, drafted, surveilled. Not a government-in-waiting.",
  my_party: "How much your caucus will tolerate you this round. Not how much they like Iran.",
  opposing_party: "The other paper. They take the chair if this bar runs ahead.",
  media: "Attention stack: violence, fear, anger, then process. Amplifier, not a voter.",
  cia: "Credit for being right. Overpromises. Sometimes the file is egg.",
  saudis: "Pay someone else. Patriots and checks. Will not go first.",
  europeans: "Trade, energy, moral speeches. Let's you and him fight.",
  china: "Cheap crude. Dual-use patience. Will not die for Natanz.",
  venezuela: "Western-hemisphere tap. How much Caracas will risk for Tehran this round.",
};

export function defaultBars(chair: Chair, party: Party): Bars {
  void chair;
  void party;
  return {
    irgc: 50,
    leader: 55,
    street: 45,
    my_party: 52,
    opposing_party: 48,
    media: 55,
    cia: 60,
    saudis: 50,
    europeans: 50,
    china: 40,
    venezuela: 35,
  };
}

export function defaultClocks(): Clocks {
  return {
    nuke_breakout_months: null,
    missile_inventory_months: null,
    hard_currency: 55,
    oil_pain: 20,
    drone_holes_known: 0,
    future_irgc_grudge: 0,
    liberals: 12,
  };
}

/** Golden-path seed so a later card can be playtested in isolation. */
export const SEED_2019: { bars: Partial<Bars>; clocks: Partial<Clocks> } = {
  bars: {
    irgc: 72,
    leader: 68,
    street: 32,
    my_party: 51,
    opposing_party: 49,
    media: 62,
    cia: 44,
    saudis: 58,
    europeans: 41,
    china: 63,
    venezuela: 48,
  },
  clocks: {
    nuke_breakout_months: 12,
    missile_inventory_months: 9,
    hard_currency: 38,
    oil_pain: 28,
    drone_holes_known: 1,
    future_irgc_grudge: 80,
    liberals: 8,
  },
};

/** Golden-path seed for a 1979 isolation start. Liberals grew. IRGC is standing up. */
export const SEED_1979: { bars: Partial<Bars>; clocks: Partial<Clocks> } = {
  bars: {
    irgc: 58,
    leader: 62,
    street: 38,
  },
  clocks: {
    liberals: 58,
    hard_currency: 70,
    oil_pain: 22,
  },
};

export const X_PROFILE = "https://x.com/GrumpyTechBro";
export const GITHUB_REPO = "https://github.com/twinforces/iranhistory";
