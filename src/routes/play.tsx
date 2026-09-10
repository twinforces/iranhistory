import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "../view/AppShell.tsx";
import { PlayView } from "../view/PlayView.tsx";
import type { Chair } from "../model/types.ts";

export const Route = createFileRoute("/play")({
  validateSearch: (s: Record<string, unknown>) => {
    const out: { card?: string; chair?: Chair } = {};
    if (typeof s.card === "string" && s.card.length > 0) out.card = s.card;
    if (s.chair === "us" || s.chair === "iran") out.chair = s.chair;
    return out;
  },
  component: Play,
});

function Play() {
  const { card, chair } = Route.useSearch();
  return (
    <AppShell current="/play">
      <PlayView initialCard={card} initialChair={chair} />
    </AppShell>
  );
}
