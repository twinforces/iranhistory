import type { ReactNode } from "react";
import type { TruthTag } from "../model/types.ts";
import { truthTagCaption } from "../viewmodel/TrainViewModel.ts";
import { GlossText } from "./Gloss.tsx";
import { useLocale } from "./LocaleContext.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const PREFIX = /^(LT|IT|DK|AL|GR):\s*/;

function Tip({ tag, children }: { tag: TruthTag; children: ReactNode }) {
  const { locale } = useLocale();
  const { name, blurb } = truthTagCaption(tag, locale);
  const native = `${name}. ${blurb}`;
  return (
    <Tooltip disableHoverableContent>
      <TooltipTrigger asChild>
        <span title={native} tabIndex={0}>
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" collisionPadding={12} className="pointer-events-none">
        <p className="font-serif text-sm text-fg">{name}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">{blurb}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function TagChip({ tag, onClick }: { tag: TruthTag; onClick?: () => void }) {
  const { locale } = useLocale();
  const { name, blurb } = truthTagCaption(tag, locale);
  const native = `${name}. ${blurb}`;
  const Comp = onClick ? "button" : "span";
  return (
    <Tooltip disableHoverableContent>
      <TooltipTrigger asChild>
        <Comp
          type={onClick ? "button" : undefined}
          onClick={onClick}
          title={native}
          tabIndex={0}
          aria-label={native}
          className={cn(
            "inline-flex h-7 cursor-help items-center rounded-full px-2 font-mono text-2xs font-medium uppercase tracking-wide",
            tag === "LT" && "bg-lt/20 text-lt",
            tag === "IT" && "bg-it/20 text-it",
            tag === "DK" && "bg-dk/20 text-fg",
            tag === "AL" && "bg-al/20 text-accent",
            tag === "GR" && "bg-ok/20 text-ok",
          )}
        >
          {tag}
        </Comp>
      </TooltipTrigger>
      <TooltipContent side="top" collisionPadding={12} className="pointer-events-none">
        <p className="font-serif text-sm text-fg">{name}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">{blurb}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function RefereeText({ text }: { text: string }) {
  const m = text.match(PREFIX);
  if (!m) {
    return <GlossText text={text} />;
  }
  const tag = m[1] as TruthTag;
  return (
    <>
      <Tip tag={tag}>
        <span className="gloss-term">{m[0].trimEnd()}</span>
      </Tip>{" "}
      <GlossText text={text.slice(m[0].length)} />
    </>
  );
}
