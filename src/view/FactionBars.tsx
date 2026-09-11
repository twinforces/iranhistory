import type { PresentedBar, PresentedClock, PresentedMuseum } from "../viewmodel/TrainViewModel.ts";
import { faDigits } from "../i18n/digits.ts";
import { GlossLabel } from "./Gloss.tsx";
import { useLocale } from "./LocaleContext.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function MuseumCell({
  label,
  found,
  total,
  names,
  hunt,
}: {
  label: string;
  found: number;
  total?: number;
  names: readonly string[];
  hunt: string;
}) {
  const { locale } = useLocale();
  const num = (n: number) => (locale === "fa" ? faDigits(n) : String(n));
  const native = names.length > 0 ? names.join(". ") : hunt;
  const display = total === undefined ? num(found) : `${num(found)} / ${num(total)}`;
  return (
    <Tooltip disableHoverableContent>
      <TooltipTrigger asChild>
        <div className="rounded-[var(--radius-sm)] bg-surface-2 px-3 py-2" tabIndex={0} title={native}>
          <dt className="font-mono text-2xs uppercase tracking-wide text-muted">{label}</dt>
          <dd className="font-mono text-sm tabular-nums text-fg">{display}</dd>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" collisionPadding={12} className="pointer-events-none">
        {names.length > 0 ? (
          names.map((name) => (
            <p key={name} className="font-serif text-sm text-fg">
              {name}
            </p>
          ))
        ) : (
          <p className="font-serif text-sm text-fg">{hunt}</p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

export function FactionBars({
  bars,
  clocks,
  museum,
}: {
  bars: PresentedBar[];
  clocks: PresentedClock[];
  museum: PresentedMuseum;
}) {
  const { locale, t } = useLocale();
  const num = (n: number) => (locale === "fa" ? faDigits(n) : String(n));
  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2">
        {bars.map((bar) => (
          <li key={bar.id} className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)_2.25rem] items-center gap-2">
            <GlossLabel id={bar.glossaryId}>
              <span className="truncate font-mono text-2xs uppercase tracking-wide text-muted">{bar.label}</span>
            </GlossLabel>
            <div className="h-2 overflow-hidden rounded-full bg-surface-2">
              <div
                className={`h-full rounded-full ${bar.red ? "bg-danger" : "bg-fg/70"}`}
                style={{ width: `${bar.value}%` }}
              />
            </div>
            <span className="text-end font-mono text-xs tabular-nums text-fg">{num(bar.value)}</span>
          </li>
        ))}
      </ul>
      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {clocks.map((c) => (
          <div key={c.id} className="rounded-[var(--radius-sm)] bg-surface-2 px-3 py-2">
            <dt className="font-mono text-2xs uppercase tracking-wide text-muted">{c.label}</dt>
            <dd className="font-mono text-sm tabular-nums text-fg">{c.display}</dd>
          </div>
        ))}
      </dl>
      <div className="museum-strip">
        <p className="kicker mb-2">{t("peaceExits")}</p>
        <dl className="grid grid-cols-2 gap-2">
          <MuseumCell
            label={t("iranExits")}
            found={museum.iranFound}
            total={museum.iranTotal}
            names={museum.iranNames}
            hunt={t("exitsHunt")}
          />
          <MuseumCell
            label={t("usExits")}
            found={museum.usFound}
            total={museum.usTotal}
            names={museum.usNames}
            hunt={t("exitsHunt")}
          />
        </dl>
        <dl className="mt-2">
          <MuseumCell
            label={t("nukesCounter")}
            found={museum.nukesFound}
            names={museum.nukesNames}
            hunt={t("nukesNotYet")}
          />
        </dl>
      </div>
    </div>
  );
}
