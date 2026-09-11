import { GlossText } from "./Gloss.tsx";
import { useLocale } from "./LocaleContext.tsx";

export function AuthorNoteView() {
  const { t } = useLocale();
  return (
    <div className="flex flex-col gap-6">
      <article className="dossier max-w-2xl px-5 py-6 sm:px-8 sm:py-8">
        <p className="kicker">{t("noteKicker")}</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {t("noteTitle")}
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-ink/80">
          <GlossText text={t("noteP1")} />
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
          <GlossText text={t("noteP2")} />
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
          <GlossText text={t("noteP3")} />
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
          <GlossText text={t("noteP4")} />
        </p>
        <p className="mt-4 font-serif text-sm italic text-ink/70">
          <GlossText text={t("noteP5")} />
        </p>
      </article>
    </div>
  );
}
