import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { GITHUB_REPO } from "../model/constants.ts";
import { CHAIR_ART } from "./portraits.ts";
import { GlossText } from "./Gloss.tsx";
import { useLocale } from "./LocaleContext.tsx";

export function HomeView() {
  const { t } = useLocale();
  return (
    <div className="flex flex-col gap-8">
      <section className="dossier px-5 py-6 sm:px-8 sm:py-8">
        <p className="kicker">{t("homeKicker")}</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {t("homeTitle")}
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/80">
          <GlossText text={t("homeP1")} />
        </p>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/80">
          <GlossText text={t("homeP2")} />
        </p>
        <p className="mt-4 font-serif text-sm italic text-ink/70">
          <GlossText text={t("homeP3")} />
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/play"
          search={{ chair: "iran" }}
          className="chair-card chair-card-iran no-underline"
        >
          <img src={CHAIR_ART.iran} alt="" className="chair-card-art" />
          <span className="chair-card-body">
            <span className="kicker text-ink/55">{t("tehran")}</span>
            <span className="mt-1 block font-serif text-2xl font-semibold text-ink">{t("playIran")}</span>
            <span className="mt-2 block text-sm leading-relaxed text-ink/75">
              <GlossText text={t("homeIranBlurb")} />
            </span>
          </span>
        </Link>
        <Link to="/play" search={{ chair: "us" }} className="chair-card chair-card-us no-underline">
          <img src={CHAIR_ART.us} alt="" className="chair-card-art" />
          <span className="chair-card-body">
            <span className="kicker">{t("washington")}</span>
            <span className="mt-1 block font-serif text-2xl font-semibold text-fg">{t("playUs")}</span>
            <span className="mt-2 block text-sm leading-relaxed text-muted">
              <GlossText text={t("homeUsBlurb")} />
            </span>
          </span>
        </Link>
      </section>

      <section className="flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="secondary">
          <Link to="/systems">{t("readSystems")}</Link>
        </Button>
        <Button asChild variant="ghost">
          <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
            {t("github")}
          </a>
        </Button>
      </section>
    </div>
  );
}
