import { RECEIPTS } from "../model/receipts.ts";
import { faDigits } from "../i18n/digits.ts";
import type { UiKey } from "../i18n/ui.ts";
import { truthTagCaption } from "../viewmodel/TrainViewModel.ts";
import type { TruthTag } from "../model/types.ts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLocale } from "./LocaleContext.tsx";

const KIND: Record<(typeof RECEIPTS)[number]["kind"], UiKey> = {
  primary: "kindPrimary",
  timeline: "kindTimeline",
  news: "kindNews",
  investigation: "kindInvestigation",
  reference: "kindReference",
};

function TruthMark({ truth }: { truth: (typeof RECEIPTS)[number]["truth"] }) {
  const { locale, t } = useLocale();
  if (truth === "mixed") {
    const native = `${t("mixed")}. ${t("mixedBlurb")}`;
    return (
      <Tooltip disableHoverableContent>
        <TooltipTrigger asChild>
          <span className="gloss-term" tabIndex={0} title={native}>
            {t("mixed")}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" collisionPadding={12} className="pointer-events-none">
          <p className="font-serif text-sm text-fg">{t("mixed")}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{t("mixedBlurb")}</p>
        </TooltipContent>
      </Tooltip>
    );
  }
  const tag = truth as TruthTag;
  const { name, blurb } = truthTagCaption(tag, locale);
  const native = `${name}. ${blurb}`;
  return (
    <Tooltip disableHoverableContent>
      <TooltipTrigger asChild>
        <span className="gloss-term" tabIndex={0} title={native}>
          {tag}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" collisionPadding={12} className="pointer-events-none">
        <p className="font-serif text-sm text-fg">{name}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">{blurb}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function ReceiptsView() {
  const { locale, t } = useLocale();
  const num = (n: string | number) => (locale === "fa" ? faDigits(n) : String(n));
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="kicker">{t("receiptsKicker")}</p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-fg">{t("receiptsTitle")}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{t("receiptsLead")}</p>
      </header>
      <ol className="flex flex-col gap-3">
        {RECEIPTS.map((r, i) => (
          <li key={r.id} className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-border">
            <p className="font-mono text-2xs text-faint">
              {num(String(i + 1).padStart(2, "0"))} · {t(KIND[r.kind])} · <TruthMark truth={r.truth} />
            </p>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block font-serif text-lg text-fg hover:text-accent"
            >
              {r.title}
            </a>
            <p className="text-xs text-muted">{r.publisher}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{r.note}</p>
            <p className="mt-2 font-mono text-2xs text-faint">
              {t("cardsPrefix")}: {r.usedFor.join(", ")}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
