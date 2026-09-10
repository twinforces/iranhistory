import type { ReactNode } from "react";
import { glossaryById, linkify } from "../model/glossary.ts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function TipBody({ id }: { id: string }) {
  const entry = glossaryById(id);
  if (!entry) return null;
  return (
    <>
      <p className="font-serif text-sm text-fg">{entry.term}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted">{entry.definition}</p>
    </>
  );
}

function GlossTerm({ id, text, nested }: { id: string; text: string; nested?: boolean }) {
  const entry = glossaryById(id);
  if (!entry) return <>{text}</>;
  const native = `${entry.term}: ${entry.definition}`;
  if (nested) {
    return (
      <abbr className="gloss-term" title={native}>
        {text}
      </abbr>
    );
  }
  return (
    <Tooltip disableHoverableContent>
      <TooltipTrigger asChild>
        <span className="gloss-term" tabIndex={0} title={native}>
          {text}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" collisionPadding={12} className="pointer-events-none">
        <TipBody id={id} />
      </TooltipContent>
    </Tooltip>
  );
}

export function GlossLabel({
  id,
  children,
}: {
  id: string | null;
  children: ReactNode;
}) {
  if (!id) return <>{children}</>;
  const entry = glossaryById(id);
  if (!entry) return <>{children}</>;
  const native = `${entry.term}: ${entry.definition}`;
  return (
    <Tooltip disableHoverableContent>
      <TooltipTrigger asChild>
        <span className="gloss-term" tabIndex={0} title={native}>
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" collisionPadding={12} className="pointer-events-none">
        <TipBody id={id} />
      </TooltipContent>
    </Tooltip>
  );
}

export function GlossText({ text, nested }: { text: string; nested?: boolean }) {
  const parts = linkify(text);
  return (
    <>
      {parts.map((part, i) =>
        part.id ? (
          <GlossTerm key={`${part.id}-${i}`} id={part.id} text={part.text} nested={nested} />
        ) : (
          <span key={`t-${i}`}>{part.text}</span>
        ),
      )}
    </>
  );
}
