/**
 * What: the off-ramps the time machine is for.
 * Why: most of the rail is locked. Peace exits, the nuke splat, the 7-Eleven,
 * and the memoir are the museum. Catalog lives here so the chrome cannot
 * invent a sixth peace exit.
 */
import type { Chair, EndingId, GameState } from "./types.ts";

export const EXITS_KEY = "trtw-exits";

export type ExitKind = "peace" | "nukes" | "cso" | "memoirs";

export interface ExitDef {
  readonly id: string;
  readonly chair: Chair;
  readonly kind: ExitKind;
  /** Caption after the player finds it. Never shown before. */
  readonly found: string;
  readonly choiceId?: string;
  readonly endingId?: EndingId;
}

export const EXITS: readonly ExitDef[] = [
  {
    id: "hinterland",
    chair: "iran",
    kind: "peace",
    found: "The hinterland held 1979",
    endingId: "shah_holds",
  },
  {
    id: "limits",
    chair: "iran",
    kind: "peace",
    found: "You kept the limits",
    endingId: "jcpoa_holds",
  },
  {
    id: "hamas-iran",
    chair: "iran",
    kind: "peace",
    found: "Hamas cut off",
    choiceId: "ir-leave-hamas",
  },
  {
    id: "hamas-us",
    chair: "us",
    kind: "peace",
    found: "Hamas cut off",
    choiceId: "us-private-saudi",
  },
  {
    id: "fordow",
    chair: "us",
    kind: "peace",
    found: "The Imam lives",
    choiceId: "us-stop-fordow",
  },
  {
    id: "nukes",
    chair: "iran",
    kind: "nukes",
    found: "Breakout hit zero",
    endingId: "nuke_splat",
  },
  {
    id: "cso-london",
    chair: "iran",
    kind: "cso",
    found: "You hired the British engineers",
    choiceId: "ir-deal-london",
  },
  {
    id: "cso-fpl",
    chair: "iran",
    kind: "cso",
    found: "You kept Family Protection",
    choiceId: "ir-keep-fpl",
  },
  {
    id: "cso-stamp",
    chair: "iran",
    kind: "cso",
    found: "You refused the letterhead",
    choiceId: "ir-refuse-letterhead",
  },
  {
    id: "cso-artesh",
    chair: "iran",
    kind: "cso",
    found: "You kept Artesh",
    choiceId: "ir-artesh-war",
  },
  {
    id: "cso-majlis",
    chair: "iran",
    kind: "cso",
    found: "You defied the Majlis",
    choiceId: "ir-defy-majles",
  },
  {
    id: "cso-chair",
    chair: "iran",
    kind: "cso",
    found: "You refused the chair",
    choiceId: "ir-refuse-khamenei",
  },
  {
    id: "cso-robe",
    chair: "iran",
    kind: "cso",
    found: "You remained letterhead",
    choiceId: "ir-remain-letterhead",
  },
  {
    id: "cso-green",
    chair: "iran",
    kind: "cso",
    found: "You counted Green",
    choiceId: "ir-count-green",
  },
  {
    id: "cso-mahsa",
    chair: "iran",
    kind: "cso",
    found: "You fired the morality police",
    choiceId: "ir-fire-morality",
  },
  {
    id: "memoirs",
    chair: "us",
    kind: "memoirs",
    found: "The other party took the chair",
    endingId: "election_loss",
  },
];

const BY_ID = new Map(EXITS.map((e) => [e.id, e]));

export function exitById(id: string): ExitDef | undefined {
  return BY_ID.get(id);
}

export function countKind(kind: ExitKind, chair?: Chair): number {
  return EXITS.filter((e) => e.kind === kind && (chair === undefined || e.chair === chair)).length;
}

export function peaceCount(chair: Chair): number {
  return countKind("peace", chair);
}

/** Which catalog ids this resolve just found. Does not name the rest. */
export function detectExits(state: GameState): readonly string[] {
  const hits: string[] = [];
  for (const exit of EXITS) {
    if (exit.choiceId && state.lastChoiceId === exit.choiceId) {
      hits.push(exit.id);
      continue;
    }
    if (exit.endingId && state.ending?.id === exit.endingId) {
      hits.push(exit.id);
    }
  }
  return hits;
}

export function parseMuseum(raw: string | null | undefined): Set<string> {
  if (!raw) return new Set();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    const ids = new Set<string>();
    for (const item of parsed) {
      if (typeof item === "string" && BY_ID.has(item)) ids.add(item);
    }
    return ids;
  } catch {
    return new Set();
  }
}

export function serializeMuseum(found: ReadonlySet<string>): string {
  return JSON.stringify([...found].filter((id) => BY_ID.has(id)).sort());
}

export interface MuseumStore {
  load(): Set<string>;
  save(found: ReadonlySet<string>): void;
}

export function localMuseumStore(): MuseumStore {
  return {
    load() {
      if (typeof window === "undefined") return new Set();
      try {
        return parseMuseum(window.localStorage.getItem(EXITS_KEY));
      } catch {
        return new Set();
      }
    },
    save(found) {
      if (typeof window === "undefined") return;
      try {
        window.localStorage.setItem(EXITS_KEY, serializeMuseum(found));
      } catch {
        /* private mode */
      }
    },
  };
}

/** Shared in-memory store for tests. Chair switch is a new VM on the same bag. */
export function memoryMuseumStore(seed: Iterable<string> = []): MuseumStore {
  const bag = new Set(seed);
  return {
    load: () => new Set(bag),
    save(found) {
      bag.clear();
      for (const id of found) bag.add(id);
    },
  };
}
