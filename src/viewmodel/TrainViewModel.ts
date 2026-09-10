/**
 * What: the only object the View is allowed to talk to.
 * Why: React must not apply deltas. Tests in this folder ask "what would
 * the user see?" without mounting a component. If a caption is wrong,
 * the bug is here, not in JSX.
 */
import {
  applyChoice,
  canTimeTravel,
  cardById,
  CARDS,
  choicesFor,
  currentCard,
  FACTION_BLURB,
  FACTION_LABEL,
  FACTION_ORDER,
  glossaryForFaction,
  iranFaceOf,
  isGrey,
  leaderFor,
  imamFor,
  graveLeader,
  type Leader,
  newGame,
  otherParty,
  playableCards,
  RECEIPTS,
  timeTravelBackOne,
  timeTravelFurtherBack,
  timeTravelToBranch,
  type Card,
  type Chair,
  type Choice,
  type FactionId,
  type GameState,
  type IranFace,
  type Party,
  type Receipt,
  type TruthTag,
} from "../model/index.ts";

export interface PresentedChoice {
  id: string;
  label: string;
  summary: string;
  kind: Choice["kind"];
  grey: boolean;
  greyText: string;
  artisticLicenseId: string | null;
}

export interface PresentedBar {
  id: FactionId;
  label: string;
  value: number;
  blurb: string;
  red: boolean;
  glossaryId: string | null;
}

export interface PresentedClock {
  id: string;
  label: string;
  display: string;
}

export interface PresentedBriefing {
  faction: FactionId;
  label: string;
  rant: string;
  closer: string | null;
  future: boolean;
  glossaryId: string | null;
}

export interface PresentedCard {
  id: string;
  year: number;
  yearLabel: string;
  title: string;
  era: string;
  status: Card["status"];
  situation: string;
  actionPrompt: string;
  art: string | null;
  secret: boolean;
  referee: readonly string[];
  tags: readonly TruthTag[];
  briefings: PresentedBriefing[];
  licenses: Card["artisticLicense"];
  sources: readonly string[];
}

export interface TrainViewState {
  chair: Chair;
  party: Party;
  phase: GameState["phase"];
  card: PresentedCard;
  choices: PresentedChoice[];
  bars: PresentedBar[];
  clocks: PresentedClock[];
  bleed: string;
  endingTitle: string | null;
  endingBody: string | null;
  endingId: string | null;
  lastResult: { title: string; body: string } | null;
  canBackOne: boolean;
  canBackBranch: boolean;
  canFurtherBack: boolean;
  outParty: boolean;
  log: readonly string[];
  slogan: string | null;
  face: IranFace | null;
  faceLabel: string;
  leader: Leader;
  imam: Leader | null;
  grave: Leader | null;
}

function sloganFor(state: GameState, card: Card): string | null {
  if (card.year < 1979 && (card.sloganVolume ?? 0) === 0) return null;
  if (state.chair !== "iran") return null;
  if ((card.sloganVolume ?? 0) >= 1 || card.year >= 1979) {
    if (state.flags.dropped_death_to_israel) return "Death to America.";
    return "Death to America. Death to Israel.";
  }
  return "Death to America.";
}

function briefingLabel(faction: FactionId, card: Card, chair: Chair, party: Party): string {
  if (faction === "leader" && card.year < 1979) return "The court";
  if (faction === "my_party") return chair === "us" ? `My party (${party})` : "My party";
  if (faction === "opposing_party") {
    return chair === "us" ? `Opposing (${otherParty(party)})` : "Opposing";
  }
  return FACTION_LABEL[faction];
}

function faceMatches(filter: IranFace | readonly IranFace[] | undefined, face: IranFace): boolean {
  if (!filter) return true;
  return typeof filter === "string" ? filter === face : filter.includes(face);
}

function presentCard(card: Card, chair: Chair, party: Party, face: IranFace): PresentedCard {
  const situation =
    chair === "iran" && face === "shah" && card.situationIranShah
      ? card.situationIranShah
      : chair === "iran" && face === "banisadr" && card.situationIranBanisadr
        ? card.situationIranBanisadr
        : chair === "iran" && face === "khamenei" && card.situationIranKhamenei
          ? card.situationIranKhamenei
          : ((chair === "iran" ? card.situationIran : card.situationUs) ??
            card.situation ??
            card.referee.paragraphs[0] ??
            "");
  return {
    id: card.id,
    year: card.year,
    yearLabel: card.yearLabel,
    title: card.title,
    era: card.era,
    status: card.status,
    situation,
    actionPrompt: card.actionPrompt ?? "What do you want to do?",
    art: card.art ?? null,
    secret: Boolean(card.secret),
    referee: card.referee.paragraphs,
    tags: card.referee.tags,
    briefings: card.briefings
      .filter((b) => b.audience === chair)
      .filter((b) => faceMatches(b.face, face))
      .map((b) => ({
        faction: b.faction,
        label: briefingLabel(b.faction, card, chair, party),
        rant: b.rant,
        closer: b.closer ?? null,
        future: false,
        glossaryId: glossaryForFaction(b.faction, card.year)?.id ?? null,
      })),
    licenses: card.artisticLicense,
    sources: card.sources,
  };
}

function presentBars(state: GameState, card: Card, inRoom: ReadonlySet<FactionId>): PresentedBar[] {
  return FACTION_ORDER.filter((id) => card.visibleFactions.includes(id) && inRoom.has(id)).map((id) => {
    const court = id === "leader" && card.year < 1979;
    const usParty =
      id === "my_party"
        ? `My party (${state.party})`
        : id === "opposing_party"
          ? `Opposing (${otherParty(state.party)})`
          : null;
    return {
      id,
      label: court ? "The court" : (usParty ?? FACTION_LABEL[id]),
      value: state.bars[id],
      blurb: court
        ? "The Shah's palace, family, and the army that answers to them. Not parliament."
        : FACTION_BLURB[id],
      red: state.bars[id] < 35,
      glossaryId: glossaryForFaction(id, card.year)?.id ?? null,
    };
  });
}

function presentClocks(state: GameState, card: Card): PresentedClock[] {
  const liberals: PresentedClock = {
    id: "liberals",
    label: "Urban liberals",
    display: String(state.clocks.liberals),
  };
  const early = !card.clocksOn && state.clocks.nuke_breakout_months === null;
  if (early) {
    const row: PresentedClock[] = [
      { id: "hard_currency", label: "Hard currency", display: String(state.clocks.hard_currency) },
      { id: "oil_pain", label: "Oil pain", display: String(state.clocks.oil_pain) },
    ];
    if (card.year >= 1963) row.unshift(liberals);
    return row;
  }
  const nuke =
    state.clocks.nuke_breakout_months === null ? "off" : `${state.clocks.nuke_breakout_months} mo`;
  const missiles =
    state.clocks.missile_inventory_months === null
      ? "off"
      : `${state.clocks.missile_inventory_months} mo`;
  const late: PresentedClock[] = [
    { id: "nuke", label: "Breakout", display: nuke },
    { id: "missiles", label: "Missile cupboard", display: missiles },
    { id: "hard_currency", label: "Hard currency", display: String(state.clocks.hard_currency) },
    { id: "oil_pain", label: "Oil pain", display: String(state.clocks.oil_pain) },
    { id: "holes", label: "Holes known", display: String(state.clocks.drone_holes_known) },
  ];
  if (card.year >= 1963) late.push(liberals);
  return late;
}

function presentChoices(state: GameState, card: Card): PresentedChoice[] {
  return choicesFor(state, card).map((c) => ({
    id: c.id,
    label: c.label,
    summary: c.summary,
    kind: c.kind,
    grey: isGrey(state, c),
    greyText: c.greyText ?? "The Guards will not send that cable.",
    artisticLicenseId: c.artisticLicense ?? null,
  }));
}

export class TrainViewModel {
  private state: GameState;

  constructor(chair: Chair = "us", party: Party = "R", cardId?: string) {
    this.state = newGame({ chair, party, cardId });
  }

  getState(): TrainViewState {
    const card = currentCard(this.state);
    const travel = canTimeTravel(this.state);
    const face = iranFaceOf(this.state);
    const presented = presentCard(card, this.state.chair, this.state.party, face);
    const inRoom = new Set(presented.briefings.map((b) => b.faction));
    const seated = leaderFor({
      chair: this.state.chair,
      year: card.year,
      iranFace: face,
      generic: Boolean(this.state.flags.letterhead_generic),
    });
    const imam = imamFor({ chair: this.state.chair, iranFace: face });
    const satrap = graveLeader(this.state.ending?.id);
    const leader = satrap && this.state.chair === "iran" ? satrap : seated;
    const grave = satrap && this.state.chair === "us" ? satrap : null;
    const faceLabel = leader.youAre.replace(/^You (are|get) /, "");
    return {
      chair: this.state.chair,
      party: this.state.party,
      phase: this.state.phase,
      card: presented,
      choices: presentChoices(this.state, card),
      bars: presentBars(this.state, card, inRoom),
      clocks: presentClocks(this.state, card),
      bleed: this.state.lastBleed,
      endingTitle: this.state.ending?.title ?? null,
      endingBody: this.state.ending?.referee ?? null,
      endingId: this.state.ending?.id ?? null,
      lastResult: this.state.lastResult,
      canBackOne: travel.backOne,
      canBackBranch: travel.backToBranch,
      canFurtherBack: travel.furtherBack,
      outParty: this.state.outParty,
      log: this.state.log,
      slogan: sloganFor(this.state, card),
      face: this.state.chair === "iran" ? face : null,
      faceLabel,
      leader,
      imam,
      grave,
    };
  }

  choose(choiceId: string): void {
    this.state = applyChoice(this.state, choiceId);
  }

  dismissResult(): void {
    if (!this.state.lastResult) return;
    this.state = { ...this.state, lastResult: null };
  }

  backOne(): void {
    this.state = timeTravelBackOne(this.state);
  }

  backToBranch(): void {
    this.state = timeTravelToBranch(this.state);
  }

  furtherBack(): void {
    this.state = timeTravelFurtherBack(this.state);
  }

  resetTo1953(): void {
    this.state = newGame({ chair: this.state.chair, party: this.state.party });
  }

  start(chair: Chair, party: Party, cardId?: string): void {
    this.state = newGame({ chair, party, cardId });
  }

  licenseById(id: string) {
    for (const card of CARDS) {
      const hit = card.artisticLicense?.find((l) => l.id === id);
      if (hit) return hit;
    }
    return null;
  }

  rail(): readonly Card[] {
    return CARDS;
  }

  playable(): Card[] {
    return playableCards();
  }

  receipts(): readonly Receipt[] {
    return RECEIPTS;
  }

  receiptsForCurrent(): Receipt[] {
    const card = currentCard(this.state);
    return RECEIPTS.filter((r) => card.sources.includes(r.id));
  }

  peekCard(id: string): PresentedCard | null {
    const card = cardById(id);
    return card ? presentCard(card, this.state.chair, this.state.party, iranFaceOf(this.state)) : null;
  }
}
