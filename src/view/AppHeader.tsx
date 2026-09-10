import { Link } from "@tanstack/react-router";
import { X_PROFILE } from "../model/constants.ts";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Frame" },
  { to: "/systems", label: "Systems" },
  { to: "/rail", label: "Rail" },
  { to: "/play", label: "Play" },
  { to: "/receipts", label: "Receipts" },
  { to: "/design", label: "Design" },
] as const;

export function AppHeader({ current }: { current: string }) {
  return (
    <header className="border-b border-border bg-bg">
      <div className="rail-ties h-1.5 w-full bg-surface" />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <img
          src="/gtb-pfp.jpg"
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0 rounded-full object-cover ring-1 ring-border"
        />
        <div className="min-w-0 flex-1">
          <p className="font-serif text-lg font-semibold tracking-tight text-fg sm:text-xl">
            Train Ride to War
          </p>
          <a
            href={X_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-fg"
          >
            a GrumpyTechBro joint
          </a>
        </div>
      </div>
      <nav
        aria-label="Sections"
        className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 pb-3 sm:px-5"
      >
        {NAV.map((item) => {
          const active = current === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "shrink-0 rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium",
                active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface hover:text-fg",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
