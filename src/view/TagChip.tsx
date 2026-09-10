import type { TruthTag } from "../model/types.ts";
import { cn } from "@/lib/utils";

const LABEL: Record<TruthTag, string> = {
  LT: "Lawyer true",
  IT: "Irish true",
  DK: "Don't know",
  AL: "Artistic license",
  GR: "Game rule",
};

export function TagChip({ tag, onClick }: { tag: TruthTag; onClick?: () => void }) {
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      title={LABEL[tag]}
      className={cn(
        "inline-flex h-7 items-center rounded-full px-2 font-mono text-2xs font-medium uppercase tracking-wide",
        tag === "LT" && "bg-lt/20 text-lt",
        tag === "IT" && "bg-it/20 text-it",
        tag === "DK" && "bg-dk/20 text-fg",
        tag === "AL" && "bg-al/20 text-accent",
        tag === "GR" && "bg-ok/20 text-ok",
      )}
    >
      {tag}
    </Comp>
  );
}
