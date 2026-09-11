import { useLocale } from "./LocaleContext.tsx";
import { cn } from "@/lib/utils";

export function LangSwitch() {
  const { locale, setLocale, t } = useLocale();
  return (
    <div className="flex shrink-0 items-center gap-1" dir="ltr" role="group" aria-label={t("langSwitch")}>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={cn(
          "rounded-[var(--radius-sm)] px-2 py-1 font-mono text-2xs font-medium",
          locale === "en" ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
        )}
      >
        {t("langEn")}
      </button>
      <button
        type="button"
        onClick={() => setLocale("fa")}
        aria-pressed={locale === "fa"}
        className={cn(
          "rounded-[var(--radius-sm)] px-2 py-1 font-mono text-2xs font-medium",
          locale === "fa" ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
        )}
      >
        {t("langFa")}
      </button>
    </div>
  );
}
