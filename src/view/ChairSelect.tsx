import type { Chair } from "../model/types.ts";
import { CHAIR_ART } from "./portraits.ts";
import { GlossText } from "./Gloss.tsx";
import { useLocale } from "./LocaleContext.tsx";

export function ChairSelect({ onPick }: { onPick: (chair: Chair) => void }) {
  const { t } = useLocale();
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="kicker">{t("chairKicker")}</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          {t("chairTitle")}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          <GlossText text={t("chairBody")} />
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <button type="button" onClick={() => onPick("iran")} className="chair-card chair-card-iran">
          <img src={CHAIR_ART.iran} alt="" className="chair-card-art" />
          <span className="chair-card-body">
            <span className="kicker text-ink/55">{t("tehran")}</span>
            <span className="mt-1 block font-serif text-2xl font-semibold text-ink">{t("playIran")}</span>
            <span className="mt-2 block text-sm leading-relaxed text-ink/75">
              <GlossText text={t("chairIranBlurb")} />
            </span>
          </span>
        </button>
        <button type="button" onClick={() => onPick("us")} className="chair-card chair-card-us">
          <img src={CHAIR_ART.us} alt="" className="chair-card-art" />
          <span className="chair-card-body">
            <span className="kicker">{t("washington")}</span>
            <span className="mt-1 block font-serif text-2xl font-semibold text-fg">{t("playUs")}</span>
            <span className="mt-2 block text-sm leading-relaxed text-muted">
              <GlossText text={t("chairUsBlurb")} />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
