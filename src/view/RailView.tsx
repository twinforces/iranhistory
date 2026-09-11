import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CARDS } from "../model/cards.ts";
import type { Card } from "../model/types.ts";
import { cardFa } from "../i18n/cards.ts";
import { faDigits } from "../i18n/digits.ts";
import type { Locale } from "../i18n/types.ts";
import { TagChip, RefereeText } from "./TagChip.tsx";
import { Button } from "@/components/ui/button";
import { useLocale } from "./LocaleContext.tsx";

function railTitle(card: Card, locale: Locale): string {
  const fa = locale === "fa" ? cardFa(card.id) : undefined;
  const us = fa?.titleUs ?? card.titleUs;
  const ir = fa?.titleIran ?? card.titleIran;
  if (us && ir && us !== ir) return `${us} / ${ir}`;
  return fa?.title ?? card.title;
}

export function RailView() {
  const { locale, t } = useLocale();
  const [openId, setOpenId] = useState<string | null>(CARDS[0]?.id ?? null);
  const num = (n: string | number) => (locale === "fa" ? faDigits(n) : String(n));
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="kicker">{t("railKicker")}</p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-fg">{t("railTitle")}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{t("railLead")}</p>
      </header>
      <ol className="flex flex-col gap-2">
        {CARDS.map((card, i) => {
          const open = openId === card.id;
          const fa = locale === "fa" ? cardFa(card.id) : undefined;
          const paras = fa?.referee ?? card.referee.paragraphs;
          return (
            <li key={card.id}>
              <button
                type="button"
                onClick={() => setOpenId(open ? null : card.id)}
                className="flex w-full items-start gap-3 rounded-[var(--radius-lg)] bg-surface px-4 py-3 text-start shadow-border"
              >
                <span className="font-mono text-xs text-faint tabular-nums">
                  {num(String(i + 1).padStart(2, "0"))}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-mono text-xs text-muted">
                      {locale === "fa" ? faDigits(card.yearLabel) : card.yearLabel}
                    </span>
                    <span className="font-serif text-base text-fg">{railTitle(card, locale)}</span>
                  </span>
                  <span className="mt-1 flex flex-wrap gap-1.5">
                    <span className="font-mono text-2xs uppercase tracking-wide text-faint">
                      {card.status === "playable" ? t("statusPlayable") : card.status}
                    </span>
                    {card.branchPoint ? (
                      <span className="font-mono text-2xs uppercase tracking-wide text-accent">
                        {t("branch")}
                      </span>
                    ) : null}
                    {card.electionYear ? (
                      <span className="font-mono text-2xs uppercase tracking-wide text-muted">
                        {t("election")}
                      </span>
                    ) : null}
                  </span>
                </span>
              </button>
              {open ? (
                <div className="mt-1 rounded-[var(--radius-lg)] bg-surface-2 px-4 py-4">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {card.referee.tags.map((tag) => (
                      <TagChip key={tag} tag={tag} />
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted">
                    {paras.map((p) => (
                      <p key={p.slice(0, 24)}>
                        <RefereeText text={p} />
                      </p>
                    ))}
                  </div>
                  {card.status === "playable" ? (
                    <Button asChild className="mt-4" size="sm">
                      <Link to="/play" search={{ card: card.id }}>
                        {t("playThisCard")}
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
