import { RECEIPTS } from "../model/receipts.ts";
import { truthTagCaption } from "../viewmodel/TrainViewModel.ts";
import type { TruthTag } from "../model/types.ts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const KIND: Record<(typeof RECEIPTS)[number]["kind"], string> = {
  primary: "Primary",
  timeline: "Timeline",
  news: "News",
  investigation: "Investigation",
  reference: "Index",
};

function TruthMark({ truth }: { truth: (typeof RECEIPTS)[number]["truth"] }) {
  if (truth === "mixed") {
    const native = "Mixed. Some of this is a date or a document. Some of it is argued. Read the note.";
    return (
      <Tooltip disableHoverableContent>
        <TooltipTrigger asChild>
          <span className="gloss-term" tabIndex={0} title={native}>
            mixed
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" collisionPadding={12} className="pointer-events-none">
          <p className="font-serif text-sm text-fg">Mixed</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Some of this is a date or a document. Some of it is argued. Read the note.
          </p>
        </TooltipContent>
      </Tooltip>
    );
  }
  const tag = truth as TruthTag;
  const { name, blurb } = truthTagCaption(tag);
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
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="font-mono text-2xs uppercase tracking-[0.18em] text-muted">Receipts</p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-fg">Annotated bibliography</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Standing rule: if we used it, it lives here. LT is the date or the document. IT is the
          incentive reading. DK stays DK. AL is labelled on the card, not laundered into the referee.
        </p>
      </header>
      <ol className="flex flex-col gap-3">
        {RECEIPTS.map((r, i) => (
          <li key={r.id} className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-border">
            <p className="font-mono text-2xs text-faint">
              {String(i + 1).padStart(2, "0")} · {KIND[r.kind]} · <TruthMark truth={r.truth} />
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
            <p className="mt-2 font-mono text-2xs text-faint">cards: {r.usedFor.join(", ")}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
