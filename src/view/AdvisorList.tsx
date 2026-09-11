import type { PresentedBriefing } from "../viewmodel/TrainViewModel.ts";
import { ADVISOR_PORTRAIT } from "./portraits.ts";
import { GlossLabel, GlossText } from "./Gloss.tsx";
import { useLocale } from "./LocaleContext.tsx";

export function AdvisorList({ briefings }: { briefings: readonly PresentedBriefing[] }) {
  const { t } = useLocale();
  if (briefings.length === 0) return null;
  return (
    <section className="advisor-panel">
      <h2 className="kicker">{t("advisors")}</h2>
      <p className="mt-1 text-sm text-muted">{t("advisorsBlurb")}</p>
      <ul className="advisor-list">
        {briefings.map((b) => (
          <li key={b.faction} className={b.future ? "advisor-row advisor-row-future" : "advisor-row"}>
            <img
              src={ADVISOR_PORTRAIT[b.faction]}
              alt=""
              width={56}
              height={56}
              className="advisor-avatar"
            />
            <div className="min-w-0 flex-1">
              <p className="advisor-name">
                <GlossLabel id={b.glossaryId}>{b.label}</GlossLabel>
              </p>
              <p className="advisor-rant">
                <GlossText text={b.rant} />
              </p>
              {b.closer ? <p className="advisor-closer">{b.closer}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
