import type { PresentedBar, PresentedClock } from "../viewmodel/TrainViewModel.ts";
import { faDigits } from "../i18n/digits.ts";
import { GlossLabel } from "./Gloss.tsx";
import { useLocale } from "./LocaleContext.tsx";

export function FactionBars({ bars, clocks }: { bars: PresentedBar[]; clocks: PresentedClock[] }) {
  const { locale } = useLocale();
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
    </div>
  );
}
