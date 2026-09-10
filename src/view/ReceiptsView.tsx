import { RECEIPTS } from "../model/receipts.ts";

const KIND: Record<(typeof RECEIPTS)[number]["kind"], string> = {
  primary: "Primary",
  timeline: "Timeline",
  news: "News",
  investigation: "Investigation",
  reference: "Index",
};

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
              {String(i + 1).padStart(2, "0")} · {KIND[r.kind]} · {r.truth}
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
