import type { CardFa } from "./types.ts";
import batch1953 from "./fa/cards-1953.json" with { type: "json" };
import batch1980 from "./fa/cards-1980.json" with { type: "json" };
import batch1990 from "./fa/cards-1990.json" with { type: "json" };
import batch2010 from "./fa/cards-2010.json" with { type: "json" };
import batch2020 from "./fa/cards-2020.json" with { type: "json" };
import batchSecret from "./fa/cards-secret.json" with { type: "json" };

export const CARDS_FA: Record<string, CardFa> = {
  ...(batch1953 as Record<string, CardFa>),
  ...(batch1980 as Record<string, CardFa>),
  ...(batch1990 as Record<string, CardFa>),
  ...(batch2010 as Record<string, CardFa>),
  ...(batch2020 as Record<string, CardFa>),
  ...(batchSecret as Record<string, CardFa>),
};

export function cardFa(id: string): CardFa | undefined {
  return CARDS_FA[id];
}
