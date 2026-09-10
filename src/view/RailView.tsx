import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CARDS } from "../model/cards.ts";
import { TagChip } from "./TagChip.tsx";
import { Button } from "@/components/ui/button";

export function RailView() {
  const [openId, setOpenId] = useState<string | null>(CARDS[0]?.id ?? null);
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="font-mono text-2xs uppercase tracking-[0.18em] text-muted">The rail</p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-fg">The rail, not eighty stations</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Playable means the eight-voice card is written and the engine will take a button.
          Quiet years still get a sentence. This is a history tutorial, not a jump cut.
        </p>
      </header>
      <ol className="flex flex-col gap-2">
        {CARDS.map((card, i) => {
          const open = openId === card.id;
          return (
            <li key={card.id}>
              <button
                type="button"
                onClick={() => setOpenId(open ? null : card.id)}
                className="flex w-full items-start gap-3 rounded-[var(--radius-lg)] bg-surface px-4 py-3 text-left shadow-border"
              >
                <span className="font-mono text-xs text-faint tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-mono text-xs text-muted">{card.yearLabel}</span>
                    <span className="font-serif text-base text-fg">
                      {card.titleUs && card.titleIran && card.titleUs !== card.titleIran
                        ? `${card.titleUs} / ${card.titleIran}`
                        : card.title}
                    </span>
                  </span>
                  <span className="mt-1 flex flex-wrap gap-1.5">
                    <span className="font-mono text-2xs uppercase tracking-wide text-faint">
                      {card.status}
                    </span>
                    {card.branchPoint ? (
                      <span className="font-mono text-2xs uppercase tracking-wide text-accent">branch</span>
                    ) : null}
                    {card.electionYear ? (
                      <span className="font-mono text-2xs uppercase tracking-wide text-muted">election</span>
                    ) : null}
                  </span>
                </span>
              </button>
              {open ? (
                <div className="mt-1 rounded-[var(--radius-lg)] bg-surface-2 px-4 py-4">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {card.referee.tags.map((t) => (
                      <TagChip key={t} tag={t} />
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted">
                    {card.referee.paragraphs.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                  {card.status === "playable" ? (
                    <Button asChild className="mt-4" size="sm">
                      <Link to="/play" search={{ card: card.id }}>
                        Play this card
                      </Link>
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
