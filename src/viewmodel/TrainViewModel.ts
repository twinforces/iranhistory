import {
  applyChoice,
  canTimeTravel,
  cardById,
  CARDS,
  choicesFor,
  currentCard,
  detectExits,
  EXITS,
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
  localMuseumStore,
  type MuseumStore,
  newGame,
  otherParty,
  peaceCount,
  playableCards,
  RECEIPTS,
  TRUTH_TAG_BLURB,
  TRUTH_TAG_NAME,
  timeTravelBackOne,
  timeTravelFurtherBack,
  timeTravelToBranch,
  type Card,
  type Chair,
  type Choice,
  type FactionId,
  type GameState,
  type IranFace,
  type OverlayKind,
  type Party,
  type Receipt,
  type TruthTag,
} from "../model/index.ts";
import { cardFa } from "../i18n/cards.ts";
import { faDigits } from "../i18n/digits.ts";
import { ENDINGS_FA } from "../i18n/endings-fa.ts";
import { FACTION_BLURB_FA, FACTION_LABEL_FA } from "../i18n/factions-fa.ts";
import { LEADERS_FA } from "../i18n/leaders-fa.ts";
import { ui, type UiKey } from "../i18n/ui.ts";
import type { CardFa, Locale } from "../i18n/types.ts";

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

export interface PresentedMuseum {
  iranFound: number;
  iranTotal: number;
  usFound: number;
  usTotal: number;
  nukesFound: number;
  iranNames: readonly string[];
  usNames: readonly string[];
  nukesNames: readonly string[];
  csoFound: number;
  csoNames: readonly string[];
  memoirsFound: number;
  memoirsNames: readonly string[];
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
  museum: PresentedMuseum;
  bleed: string;
  endingTitle: string | null;
  endingBody: string | null;
  endingId: string | null;
  lastResult: { title: string; body: string; kind: OverlayKind } | null;
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

export function truthTagCaption(tag: TruthTag, locale: Locale = "en"): { name: string; blurb: string } {
  if (locale === "fa") {
    const names = { LT: "ltName", IT: "itName", DK: "dkName", AL: "alName", GR: "grName" } as const;
    const blurbs = { LT: "ltBlurb", IT: "itBlurb", DK: "dkBlurb", AL: "alBlurb", GR: "grBlurb" } as const;
    return { name: ui("fa", names[tag]), blurb: ui("fa", blurbs[tag]) };
  }
  return { name: TRUTH_TAG_NAME[tag], blurb: TRUTH_TAG_BLURB[tag] };
}

function sloganFor(state: GameState, card: Card, locale: Locale): string | null {
  if (card.year < 1979 && (card.sloganVolume ?? 0) === 0) return null;
  if (state.chair !== "iran") return null;
  if ((card.sloganVolume ?? 0) >= 1 || card.year >= 1979) {
    if (state.flags.dropped_death_to_israel) return ui(locale, "sloganAmerica");
    if (card.id === "lebanon-1983") return ui(locale, "sloganBeirut");
    return ui(locale, "sloganAmericaIsrael");
  }
  return ui(locale, "sloganAmerica");
}

function briefingLabel(
  faction: FactionId,
  card: Card,
  chair: Chair,
  party: Party,
  locale: Locale,
): string {
  if (faction === "leader" && card.year < 1979) return ui(locale, "court");
  if (faction === "my_party") {
    const letter = chair === "us" ? ` (${party})` : "";
    return `${ui(locale, "myParty")}${letter}`;
  }
  if (faction === "opposing_party") {
    const letter = chair === "us" ? ` (${otherParty(party)})` : "";
    return `${ui(locale, "opposing")}${letter}`;
  }
  return locale === "fa" ? FACTION_LABEL_FA[faction] : FACTION_LABEL[faction];
}

function faceMatches(filter: IranFace | readonly IranFace[] | undefined, face: IranFace): boolean {
  if (!filter) return true;
  return typeof filter === "string" ? filter === face : filter.includes(face);
}

function briefingKey(faction: string, audience: string, face: IranFace | readonly IranFace[] | undefined): string {
  const faceBit = typeof face === "string" ? face : "";
  return `${faction}:${audience}:${faceBit}`;
}

function localizeLeader(leader: Leader, locale: Locale): Leader {
  if (locale !== "fa") return leader;
  const fa = LEADERS_FA[leader.id];
  if (!fa) return leader;
  return {
    ...leader,
    youAre: fa.youAre,
    playing: fa.playing,
    name: fa.name,
    role: fa.role,
    partyLabel: fa.partyLabel === undefined ? leader.partyLabel : fa.partyLabel,
  };
}

function pickSituation(card: Card, chair: Chair, face: IranFace, fa: CardFa | undefined): string {
  if (fa) {
    if (chair === "iran" && face === "shah" && fa.situationIranShah) return fa.situationIranShah;
    if (chair === "iran" && face === "banisadr" && fa.situationIranBanisadr) return fa.situationIranBanisadr;
    if (chair === "iran" && face === "khamenei" && fa.situationIranKhamenei) return fa.situationIranKhamenei;
    if (chair === "iran" && fa.situationIran) return fa.situationIran;
    if (chair === "us" && fa.situationUs) return fa.situationUs;
    if (fa.situation) return fa.situation;
  }
  if (chair === "iran" && face === "shah" && card.situationIranShah) return card.situationIranShah;
  if (chair === "iran" && face === "banisadr" && card.situationIranBanisadr) return card.situationIranBanisadr;
  if (chair === "iran" && face === "khamenei" && card.situationIranKhamenei) return card.situationIranKhamenei;
  return (chair === "iran" ? card.situationIran : card.situationUs) ?? card.situation ?? card.referee.paragraphs[0] ?? "";
}

function presentCard(card: Card, chair: Chair, party: Party, face: IranFace, locale: Locale): PresentedCard {
  const fa = locale === "fa" ? cardFa(card.id) : undefined;
  const situation = pickSituation(card, chair, face, fa);
  const titleEn = (chair === "iran" ? card.titleIran : card.titleUs) ?? card.title;
  const title =
    fa == null
      ? titleEn
      : ((chair === "iran" ? fa.titleIran : fa.titleUs) ?? fa.title ?? titleEn);
  const yearLabel = locale === "fa" ? faDigits(card.yearLabel) : card.yearLabel;
  const licenses =
    fa?.licenses && card.artisticLicense
      ? card.artisticLicense.map((l) => {
          const hit = fa.licenses?.[l.id];
          return hit ? { ...l, title: hit.title, body: hit.body } : l;
        })
      : card.artisticLicense;
  return {
    id: card.id,
    year: card.year,
    yearLabel,
    title,
    era: card.era,
    status: card.status,
    situation,
    actionPrompt: fa?.actionPrompt ?? card.actionPrompt ?? ui(locale, "actionPrompt"),
    art: card.art ?? null,
    secret: Boolean(card.secret),
    referee: fa?.referee ?? card.referee.paragraphs,
    tags: card.referee.tags,
    briefings: card.briefings
      .filter((b) => b.audience === chair)
      .filter((b) => faceMatches(b.face, face))
      .map((b) => {
        const key = briefingKey(b.faction, b.audience, b.face);
        const rantFa = fa?.briefings?.[key];
        return {
          faction: b.faction,
          label: briefingLabel(b.faction, card, chair, party, locale),
          rant: rantFa?.rant ?? b.rant,
          closer: rantFa?.closer ?? b.closer ?? null,
          future: false,
          glossaryId: glossaryForFaction(b.faction, card.year)?.id ?? null,
        };
      }),
    licenses,
    sources: card.sources,
  };
}

function presentBars(
  state: GameState,
  card: Card,
  inRoom: ReadonlySet<FactionId>,
  locale: Locale,
): PresentedBar[] {
  return FACTION_ORDER.filter((id) => card.visibleFactions.includes(id) && inRoom.has(id)).map((id) => {
    const court = id === "leader" && card.year < 1979;
    let label: string;
    if (court) label = ui(locale, "court");
    else if (id === "my_party") label = `${ui(locale, "myParty")}${state.chair === "us" ? ` (${state.party})` : ""}`;
    else if (id === "opposing_party") {
      label = `${ui(locale, "opposing")}${state.chair === "us" ? ` (${otherParty(state.party)})` : ""}`;
    } else label = locale === "fa" ? FACTION_LABEL_FA[id] : FACTION_LABEL[id];
    const blurb = court
      ? ui(locale, "courtBlurb")
      : locale === "fa"
        ? FACTION_BLURB_FA[id]
        : FACTION_BLURB[id];
    return {
      id,
      label,
      value: state.bars[id],
      blurb,
      red: state.bars[id] < 35,
      glossaryId: glossaryForFaction(id, card.year)?.id ?? null,
    };
  });
}

function presentClocks(state: GameState, card: Card, locale: Locale): PresentedClock[] {
  const num = (n: number) => (locale === "fa" ? faDigits(n) : String(n));
  const liberals: PresentedClock = {
    id: "liberals",
    label: ui(locale, "urbanLiberals"),
    display: num(state.clocks.liberals),
  };
  const early = !card.clocksOn && state.clocks.nuke_breakout_months === null;
  if (early) {
    const row: PresentedClock[] = [
      { id: "hard_currency", label: ui(locale, "hardCurrency"), display: num(state.clocks.hard_currency) },
      { id: "oil_pain", label: ui(locale, "oilPain"), display: num(state.clocks.oil_pain) },
    ];
    if (card.year >= 1963) row.unshift(liberals);
    return row;
  }
  const off = ui(locale, "clockOff");
  const mo = ui(locale, "clockMonths");
  const nuke =
    state.clocks.nuke_breakout_months === null ? off : `${num(state.clocks.nuke_breakout_months)} ${mo}`;
  const missiles =
    state.clocks.missile_inventory_months === null
      ? off
      : `${num(state.clocks.missile_inventory_months)} ${mo}`;
  const late: PresentedClock[] = [
    { id: "nuke", label: ui(locale, "breakout"), display: nuke },
    { id: "missiles", label: ui(locale, "missileCupboard"), display: missiles },
    { id: "hard_currency", label: ui(locale, "hardCurrency"), display: num(state.clocks.hard_currency) },
    { id: "oil_pain", label: ui(locale, "oilPain"), display: num(state.clocks.oil_pain) },
    { id: "holes", label: ui(locale, "holesKnown"), display: num(state.clocks.drone_holes_known) },
  ];
  if (card.year >= 1963) late.push(liberals);
  return late;
}

function presentChoices(state: GameState, card: Card, locale: Locale): PresentedChoice[] {
  const fa = locale === "fa" ? cardFa(card.id) : undefined;
  return choicesFor(state, card).map((c) => {
    const hit = fa?.choices?.[c.id];
    return {
      id: c.id,
      label: hit?.label ?? c.label,
      summary: hit?.summary ?? c.summary,
      kind: c.kind,
      grey: isGrey(state, c),
      greyText: hit?.greyText ?? c.greyText ?? ui(locale, "greyGuards"),
      artisticLicenseId: c.artisticLicense ?? null,
    };
  });
}

const EXIT_CAPTION: Record<string, UiKey> = {
  hinterland: "exitHinterland",
  limits: "exitLimits",
  "hamas-iran": "exitHamas",
  "hamas-us": "exitHamas",
  fordow: "exitImamLives",
  nukes: "exitNukes",
  "cso-fpl": "csoFpl",
  "cso-stamp": "csoStamp",
  "cso-artesh": "csoArtesh",
  "cso-majlis": "csoMajlis",
  "cso-chair": "csoChair",
  "cso-robe": "csoRobe",
  "cso-green": "csoGreen",
  "cso-mahsa": "csoMahsa",
  memoirs: "memoirsFound",
};

function captionForExit(id: string, locale: Locale): string {
  const key = EXIT_CAPTION[id];
  if (key) return ui(locale, key);
  return EXITS.find((e) => e.id === id)?.found ?? id;
}

function presentMuseum(found: ReadonlySet<string>, locale: Locale): PresentedMuseum {
  const names = (kind: "peace" | "nukes" | "cso" | "memoirs", chair?: Chair) =>
    EXITS.filter((e) => e.kind === kind && (chair === undefined || e.chair === chair) && found.has(e.id)).map((e) =>
      captionForExit(e.id, locale),
    );
  return {
    iranFound: names("peace", "iran").length,
    iranTotal: peaceCount("iran"),
    usFound: names("peace", "us").length,
    usTotal: peaceCount("us"),
    nukesFound: names("nukes").length,
    iranNames: names("peace", "iran"),
    usNames: names("peace", "us"),
    nukesNames: names("nukes"),
    csoFound: names("cso").length,
    csoNames: names("cso"),
    memoirsFound: names("memoirs").length,
    memoirsNames: names("memoirs"),
  };
}

function localizeBleed(raw: string, locale: Locale, months: number | null): string {
  if (!raw) return "";
  if (locale !== "fa") return raw;
  const bits: string[] = [];
  if (raw.includes("Street will remember")) bits.push(ui("fa", "bleedStreet"));
  if (raw.includes("IRGC will remember")) bits.push(ui("fa", "bleedIrgc"));
  if (raw.includes("next card is already written")) bits.push(ui("fa", "bleedIgnore"));
  if (raw.includes("Shooting leaks")) bits.push(ui("fa", "bleedBomb"));
  if (raw.includes("Breakout") && months !== null) {
    bits.push(`${ui("fa", "bleedBreakout")} ${faDigits(months)} ${ui("fa", "bleedMonths")}`);
  }
  return bits.length > 0 ? bits.join(" ") : ui("fa", "bleedIgnore");
}

function localizeFaceLabel(leader: Leader, locale: Locale): string {
  if (locale === "fa") {
    return leader.youAre
      .replace(/^تو /, "")
      .replace(/ هستی$/, "")
      .replace(/ نصیبت می‌شود$/, "");
  }
  return leader.youAre.replace(/^You (are|get) /, "");
}

export class TrainViewModel {
  private state: GameState;
  private readonly museumStore: MuseumStore;
  private found: Set<string>;

  constructor(chair: Chair = "us", party: Party = "R", cardId?: string, opts?: { museum?: MuseumStore }) {
    this.state = newGame({ chair, party, cardId });
    this.museumStore = opts?.museum ?? localMuseumStore();
    this.found = this.museumStore.load();
  }

  getState(locale: Locale = "en"): TrainViewState {
    const card = currentCard(this.state);
    const travel = canTimeTravel(this.state);
    const face = iranFaceOf(this.state);
    const presented = presentCard(card, this.state.chair, this.state.party, face, locale);
    const inRoom = new Set(presented.briefings.map((b) => b.faction));
    const seated = localizeLeader(
      leaderFor({
        chair: this.state.chair,
        year: card.year,
        iranFace: face,
        generic: Boolean(this.state.flags.letterhead_generic),
      }),
      locale,
    );
    const imamRaw = imamFor({ chair: this.state.chair, iranFace: face });
    const imam = imamRaw ? localizeLeader(imamRaw, locale) : null;
    const satrapRaw = graveLeader(this.state.ending?.id);
    const satrap = satrapRaw ? localizeLeader(satrapRaw, locale) : null;
    const leader = satrap && this.state.chair === "iran" ? satrap : seated;
    const grave = satrap && this.state.chair === "us" ? satrap : null;
    const faCard = locale === "fa" ? cardFa(card.id) : undefined;
    const endingId = this.state.ending?.id ?? null;
    const endingFa = locale === "fa" && endingId && endingId !== "none" ? ENDINGS_FA[endingId] : undefined;
    const choiceFa = this.state.lastChoiceId ? faCard?.choices?.[this.state.lastChoiceId] : undefined;
    let lastResult = this.state.lastResult;
    if (locale === "fa" && lastResult) {
      lastResult = {
        title: choiceFa?.resultTitle ?? lastResult.title,
        body: choiceFa?.result ?? lastResult.body,
        kind: lastResult.kind,
      };
    }
    return {
      chair: this.state.chair,
      party: this.state.party,
      phase: this.state.phase,
      card: presented,
      choices: presentChoices(this.state, card, locale),
      bars: presentBars(this.state, card, inRoom, locale),
      clocks: presentClocks(this.state, card, locale),
      museum: presentMuseum(this.found, locale),
      bleed: localizeBleed(this.state.lastBleed, locale, this.state.clocks.nuke_breakout_months),
      endingTitle:
        locale === "fa"
          ? (choiceFa?.resultTitle ?? endingFa?.title ?? this.state.ending?.title ?? null)
          : (this.state.ending?.title ?? null),
      endingBody:
        locale === "fa"
          ? (choiceFa?.result ?? endingFa?.body ?? this.state.ending?.referee ?? null)
          : (this.state.ending?.referee ?? null),
      endingId,
      lastResult,
      canBackOne: travel.backOne,
      canBackBranch: travel.backToBranch,
      canFurtherBack: travel.furtherBack,
      outParty: this.state.outParty,
      log: this.state.log,
      slogan: sloganFor(this.state, card, locale),
      face: this.state.chair === "iran" ? face : null,
      faceLabel: localizeFaceLabel(leader, locale),
      leader,
      imam,
      grave,
    };
  }

  choose(choiceId: string): void {
    this.state = applyChoice(this.state, choiceId);
    this.collectExits();
  }

  private collectExits(): void {
    const hits = detectExits(this.state);
    if (hits.length === 0) return;
    let dirty = false;
    for (const id of hits) {
      if (this.found.has(id)) continue;
      this.found.add(id);
      dirty = true;
    }
    if (dirty) this.museumStore.save(this.found);
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

  licenseById(id: string, locale: Locale = "en") {
    for (const card of CARDS) {
      const hit = card.artisticLicense?.find((l) => l.id === id);
      if (!hit) continue;
      if (locale === "fa") {
        const fa = cardFa(card.id)?.licenses?.[id];
        if (fa) return { ...hit, title: fa.title, body: fa.body };
      }
      return hit;
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

  peekCard(id: string, locale: Locale = "en"): PresentedCard | null {
    const card = cardById(id);
    return card ? presentCard(card, this.state.chair, this.state.party, iranFaceOf(this.state), locale) : null;
  }
}
