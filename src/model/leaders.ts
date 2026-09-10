/**
 * What: who is sitting the chair this year.
 * Why: the player needs a face. When the face changes, the portrait has to
 * change. Mossadegh is not the Shah. Ike is not Carter. Kennedy is not a Republican.
 * After the revolution the letterhead is not the Imam. History keeps the real
 * portraits. A moral diverge sits a stick figure.
 */
import type { Chair, IranFace, Party } from "./types.ts";

export type LeaderId =
  | "mossadegh"
  | "shah"
  | "bazargan"
  | "banisadr"
  | "khamenei"
  | "khomeini"
  | "replacement"
  | "stalin_turban"
  | "ike"
  | "kennedy"
  | "nixon"
  | "carter"
  | "reagan"
  | "trump";

export interface Leader {
  readonly id: LeaderId;
  readonly youAre: string;
  readonly playing: string;
  readonly name: string;
  readonly role: string;
  readonly portrait: string;
  readonly party: Party | null;
  readonly partyLabel: string | null;
}

const LEADERS: Record<LeaderId, Leader> = {
  mossadegh: {
    id: "mossadegh",
    youAre: "You are Mossadegh",
    playing: "Playing Mossadegh",
    name: "Mohammad Mossadegh",
    role: "Prime minister of Iran",
    portrait: "/leaders/mossadegh.jpg",
    party: null,
    partyLabel: null,
  },
  shah: {
    id: "shah",
    youAre: "You are the Shah",
    playing: "Playing the Shah",
    name: "Mohammad Reza Pahlavi",
    role: "Shah of Iran",
    portrait: "/leaders/shah.jpg",
    party: null,
    partyLabel: null,
  },
  bazargan: {
    id: "bazargan",
    youAre: "You are Bazargan",
    playing: "Playing Bazargan",
    name: "Mehdi Bazargan",
    role: "Prime minister. The guns are not his.",
    portrait: "/leaders/bazargan.jpg",
    party: null,
    partyLabel: null,
  },
  banisadr: {
    id: "banisadr",
    youAre: "You are Banisadr",
    playing: "Playing Banisadr",
    name: "Abolhassan Banisadr",
    role: "President. The guns are not his.",
    portrait: "/leaders/banisadr.jpg",
    party: null,
    partyLabel: null,
  },
  khamenei: {
    id: "khamenei",
    youAre: "You are Khamenei",
    playing: "Playing Khamenei",
    name: "Ali Khamenei",
    role: "President. Not the Imam. The guns are not his.",
    portrait: "/leaders/khamenei.jpg",
    party: null,
    partyLabel: null,
  },
  khomeini: {
    id: "khomeini",
    youAre: "He has the guns",
    playing: "The Imam",
    name: "Ruhollah Khomeini",
    role: "The jurist. The veto. You are the letterhead.",
    portrait: "/leaders/khomeini.jpg",
    party: null,
    partyLabel: null,
  },
  replacement: {
    id: "replacement",
    youAre: "You are the replacement",
    playing: "A replacement",
    name: "A replacement",
    role: "The letterhead after the real name left. The guns were never his.",
    portrait: "/leaders/letterhead.jpg",
    party: null,
    partyLabel: null,
  },
  stalin_turban: {
    id: "stalin_turban",
    youAre: "You get Stalin in a turban",
    playing: "The satrap",
    name: "Stalin in a turban",
    role: "Half commie theocracy. The Saudis go with him.",
    portrait: "/leaders/stalin-turban.jpg",
    party: null,
    partyLabel: null,
  },
  ike: {
    id: "ike",
    youAre: "You are Ike",
    playing: "Playing Ike",
    name: "Dwight D. Eisenhower",
    role: "President of the United States",
    portrait: "/leaders/ike.jpg",
    party: "R",
    partyLabel: "Republican",
  },
  kennedy: {
    id: "kennedy",
    youAre: "You are Kennedy",
    playing: "Playing Kennedy",
    name: "John F. Kennedy",
    role: "President of the United States",
    portrait: "/leaders/kennedy.jpg",
    party: "D",
    partyLabel: "Democrat",
  },
  nixon: {
    id: "nixon",
    youAre: "You are Nixon",
    playing: "Playing Nixon",
    name: "Richard Nixon",
    role: "President of the United States",
    portrait: "/leaders/nixon.jpg",
    party: "R",
    partyLabel: "Republican",
  },
  carter: {
    id: "carter",
    youAre: "You are Carter",
    playing: "Playing Carter",
    name: "Jimmy Carter",
    role: "President of the United States",
    portrait: "/leaders/carter.jpg",
    party: "D",
    partyLabel: "Democrat",
  },
  reagan: {
    id: "reagan",
    youAre: "You are Reagan",
    playing: "Playing Reagan",
    name: "Ronald Reagan",
    role: "President of the United States",
    portrait: "/leaders/reagan.jpg",
    party: "R",
    partyLabel: "Republican",
  },
  trump: {
    id: "trump",
    youAre: "You are Trump",
    playing: "Playing Trump",
    name: "Donald Trump",
    role: "President of the United States",
    portrait: "/leaders/trump.jpg",
    party: "R",
    partyLabel: "Republican",
  },
};

function usLeaderId(year: number): LeaderId {
  if (year >= 2017) return "trump";
  if (year >= 1981) return "reagan";
  if (year >= 1977) return "carter";
  if (year >= 1969) return "nixon";
  if (year >= 1961) return "kennedy";
  return "ike";
}

/** The seated president's party is a fact. Not a player pick. */
export function partyForUsYear(year: number): Party {
  const id = usLeaderId(year);
  return LEADERS[id].party ?? "R";
}

export function otherParty(party: Party): Party {
  return party === "R" ? "D" : "R";
}

export function partyLetter(party: Party): string {
  return party;
}

export function partyName(party: Party): string {
  return party === "D" ? "Democrat" : "Republican";
}

const LETTERHEAD_FACES: ReadonlySet<IranFace> = new Set(["bazargan", "banisadr", "khamenei"]);

export function leaderFor(opts: {
  chair: Chair;
  year: number;
  iranFace: IranFace;
  generic?: boolean;
}): Leader {
  if (opts.chair === "us") return LEADERS[usLeaderId(opts.year)];
  if (opts.iranFace === "shah") return LEADERS.shah;
  if (opts.generic && LETTERHEAD_FACES.has(opts.iranFace)) return LEADERS.replacement;
  if (opts.iranFace === "bazargan") return LEADERS.bazargan;
  if (opts.iranFace === "banisadr") return LEADERS.banisadr;
  if (opts.iranFace === "khamenei") return LEADERS.khamenei;
  return LEADERS.mossadegh;
}

/**
 * After the Shah falls the letterhead is not the government.
 * The Imam sits on the other side of the briefing. Never the player.
 */
export function imamFor(opts: { chair: Chair; iranFace: IranFace }): Leader | null {
  if (opts.chair !== "iran") return null;
  if (opts.iranFace === "bazargan" || opts.iranFace === "banisadr" || opts.iranFace === "khamenei") {
    return LEADERS.khomeini;
  }
  return null;
}

const SATRAP_GRAVES = new Set(["satrap_1953", "mossadegh_deal", "mossadegh_falls"]);

/**
 * Mossadegh's dead end is a picture, not a liberal oil republic.
 * The player never sits this face. They get it.
 */
export function graveLeader(endingId: string | null | undefined): Leader | null {
  if (endingId && SATRAP_GRAVES.has(endingId)) return LEADERS.stalin_turban;
  return null;
}
