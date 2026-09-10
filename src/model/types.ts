/**
 * What: the only types the engine, the cards, and the ViewModel share.
 * Why: a card author should be able to add a rant without touching React.
 * If a field is only a label, it belongs in the ViewModel, not here.
 */

export type Chair = "us" | "iran";
export type Party = "R" | "D";
export type IranFace = "mossadegh" | "shah" | "bazargan" | "banisadr" | "khamenei";

/** Lawyer-true, Irish-true, don't-know, artistic-license, game-rule. */
export type TruthTag = "LT" | "IT" | "DK" | "AL" | "GR";

export type FactionId =
  | "irgc"
  | "leader"
  | "street"
  | "my_party"
  | "opposing_party"
  | "media"
  | "cia"
  | "saudis"
  | "europeans"
  | "china"
  | "venezuela";

export type ClockId =
  | "nuke_breakout_months"
  | "missile_inventory_months"
  | "hard_currency"
  | "oil_pain"
  | "drone_holes_known"
  | "future_irgc_grudge"
  | "liberals";

export type MeterId = FactionId | ClockId;

export type EndingId =
  | "satrap_1953"
  | "mossadegh_falls"
  | "mossadegh_deal"
  | "mossadegh_street"
  | "shah_flees"
  | "shah_holds"
  | "bazargan_resigns"
  | "face_no_guns"
  | "poison_chalice"
  | "irgc_purge"
  | "leader_sideline"
  | "election_loss"
  | "nuke_splat"
  | "kharg_zero"
  | "rebuild_deal"
  | "hormuz_toll"
  | "hitler_shot"
  | "none";

export type ChoiceKind =
  | "hard"
  | "soft"
  | "ignore"
  | "sanction"
  | "sabotage"
  | "bomb"
  | "deal"
  | "covert"
  | "walk";

export type CardStatus = "playable" | "spine";

export type Era =
  | "prologue"
  | "shah"
  | "revolution"
  | "war"
  | "nuclear"
  | "street"
  | "late";

export interface Deltas {
  readonly [K: string]: number | undefined;
}

export interface Choice {
  readonly id: string;
  readonly label: string;
  readonly summary: string;
  readonly kind: ChoiceKind;
  /** Golden-path: what actually happened. Never shown on the button. */
  readonly historical?: boolean;
  readonly artisticLicense?: string;
  readonly requires?: ReadonlyArray<{ faction: FactionId; min: number }>;
  readonly greyText?: string;
  readonly deltas: Deltas;
  readonly delayedDeltas?: Deltas;
  readonly flags?: Readonly<Record<string, boolean | number | string>>;
  readonly ending?: EndingId;
  readonly nextCard?: string;
  /** Long after-choice briefing. Used when the next card is still spine. */
  readonly result?: string;
  readonly resultTitle?: string;
  /** Continue, but show the result as an overlay first. Moral 7-Eleven beats. */
  readonly epilogue?: boolean;
  /** Only offer this button when the flag is truthy. */
  readonly requiresFlag?: string;
  /** Hide this button when the flag is truthy. */
  readonly unlessFlag?: string;
  /** Iran only. Which face sees this button. */
  readonly face?: IranFace | readonly IranFace[];
}

export interface Briefing {
  readonly faction: FactionId;
  readonly rant: string;
  readonly closer?: string;
  /** Who has this person in the room. Path-specific. Not the other chair's cabinet. */
  readonly audience: Chair;
  /** Iran only. Which face has this person in the room. */
  readonly face?: IranFace | readonly IranFace[];
}

export interface ArtisticLicense {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

export interface Referee {
  readonly paragraphs: readonly string[];
  readonly tags: readonly TruthTag[];
}

export interface Card {
  readonly id: string;
  readonly year: number;
  readonly yearLabel: string;
  readonly title: string;
  readonly era: Era;
  readonly status: CardStatus;
  readonly branchPoint?: boolean;
  readonly electionYear?: boolean;
  readonly midterm?: boolean;
  readonly referee: Referee;
  readonly artisticLicense?: readonly ArtisticLicense[];
  readonly briefings: readonly Briefing[];
  readonly iranChoices: readonly Choice[];
  readonly usChoices: readonly Choice[];
  readonly sources: readonly string[];
  readonly visibleFactions: readonly FactionId[];
  readonly clocksOn?: boolean;
  readonly wileyJoos?: boolean;
  readonly sloganVolume?: 0 | 1 | 2 | 3 | 4;
  readonly next: string | null;
  /** Present-tense lede. The player is in this moment; it has not happened yet. */
  readonly situation?: string;
  readonly situationUs?: string;
  readonly situationIran?: string;
  readonly situationIranShah?: string;
  readonly situationIranBanisadr?: string;
  readonly situationIranKhamenei?: string;
  /** Header over the two action columns. */
  readonly actionPrompt?: string;
  readonly art?: string;
  /** Off the public rail. Time-travel easter egg. */
  readonly secret?: boolean;
}

export interface Clocks {
  nuke_breakout_months: number | null;
  missile_inventory_months: number | null;
  hard_currency: number;
  oil_pain: number;
  drone_holes_known: number;
  future_irgc_grudge: number;
  liberals: number;
}

export interface Bars {
  irgc: number;
  leader: number;
  street: number;
  my_party: number;
  opposing_party: number;
  media: number;
  cia: number;
  saudis: number;
  europeans: number;
  china: number;
  venezuela: number;
}

export interface Ending {
  id: EndingId;
  title: string;
  referee: string;
  canContinue?: boolean;
}

export interface GameState {
  chair: Chair;
  party: Party;
  phase: "playing" | "ended";
  cardId: string;
  bars: Bars;
  clocks: Clocks;
  flags: Record<string, boolean | number | string>;
  delayed: Deltas;
  sloganVolume: 0 | 1 | 2 | 3 | 4;
  lastBleed: string;
  lastChoiceId: string | null;
  lastChoiceWasSoft: boolean;
  lastResult: { title: string; body: string } | null;
  sidelineCount: number;
  ending: Ending | null;
  outParty: boolean;
  history: GameSnapshot[];
  log: string[];
}

/** Frozen copy used for time travel. No nested history. */
export type GameSnapshot = Omit<GameState, "history">;
