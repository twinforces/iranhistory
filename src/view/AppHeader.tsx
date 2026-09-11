import { Link } from "@tanstack/react-router";
import { X_PROFILE } from "../model/constants.ts";
import { cn } from "@/lib/utils";
import { LangSwitch } from "./LangSwitch.tsx";
import { useLocale } from "./LocaleContext.tsx";

export function AppHeader({ current }: { current: string }) {
  const { t } = useLocale();
  const nav = [
    { to: "/play", label: t("navPlay") },
    { to: "/receipts", label: t("navReceipts") },
  ] as const;
  return (
    <header className="border-b border-border bg-bg">
      <div className="rail-ties h-1.5 w-full bg-surface" />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="shrink-0 no-underline" aria-label={t("product")}>
          <img
            src="/gtb-pfp.jpg"
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-full object-cover ring-1 ring-border"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <Link
            to="/"
            className="font-serif text-lg font-semibold tracking-tight text-fg no-underline hover:text-fg sm:text-xl"
          >
            {t("product")}
          </Link>
          <a
            href={X_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-muted hover:text-fg"
          >
            {t("joint")}
          </a>
        </div>
        <nav aria-label={t("navSections")} className="flex items-center gap-1">
          {nav.map((item) => {
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
        <LangSwitch />
      </div>
    </header>
  );
}
