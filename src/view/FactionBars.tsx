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
  sticky,
}: {
  label: string;
  found: number;
  total?: number;
  names: readonly string[];
  hunt: string;
  sticky?: boolean;
}) {
  const { locale } = useLocale();
  const num = (n: number) => (locale === "fa" ? faDigits(n) : String(n));
  const native = sticky || names.length === 0 ? hunt : names.join(". ");
  const display = total === undefined ? num(found) : `${num(found)} / ${num(total)}`;
  return (
    <Tooltip disableHoverableContent>
      <TooltipTrigger asChild>
        <div className="rounded-[var(--radius-sm)] bg-surface-2 px-2.5 py-1.5" tabIndex={0} title={native}>
          <dt className="truncate font-mono text-2xs uppercase tracking-wide text-muted">{label}</dt>
          <dd className="font-mono text-sm tabular-nums text-fg">{display}</dd>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" collisionPadding={12} className="pointer-events-none max-w-80">
        {sticky || names.length === 0 ? <p className="font-serif text-sm text-fg">{hunt}</p> : null}
        {names.map((name) => (
          <p key={name} className={`font-serif text-sm ${sticky ? "mt-1 text-muted" : "text-fg"}`}>
            {name}
          </p>
        ))}
      </TooltipContent>
    </Tooltip>
  );
}

export function PlayScoreboard({ museum }: { museum: PresentedMuseum }) {
  const { t } = useLocale();
  return (
    <header className="play-scoreboard">
      <div className="play-scoreboard-row">
        <p className="kicker self-center">{t("peaceExits")}</p>
        <dl className="grid min-w-0 grid-cols-2 gap-2">
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
        <p className="kicker self-center">{t("moralVictories")}</p>
        <dl className="grid min-w-0 grid-cols-2 gap-2">
          <MuseumCell
            label={t("csoCounter")}
            found={museum.csoFound}
            names={museum.csoNames}
            hunt={t("csoBlurb")}
            sticky
          />
          <MuseumCell
            label={t("memoirsCounter")}
            found={museum.memoirsFound}
            names={museum.memoirsNames}
            hunt={t("memoirsBlurb")}
            sticky
          />
        </dl>
      </div>
      <details className="exits-map">
        <summary>{t("exitsStuck")}</summary>
        <p className="mt-2 font-serif text-sm leading-relaxed text-fg">{t("exitsMapIran")}</p>
        <p className="mt-2 font-serif text-sm leading-relaxed text-fg">{t("exitsMapUs")}</p>
      </details>
    </header>
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
        <dl className="grid grid-cols-1 gap-2">
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
