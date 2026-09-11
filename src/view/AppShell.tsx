import type { ReactNode } from "react";
import { AppHeader } from "./AppHeader.tsx";
import { LocaleProvider } from "./LocaleContext.tsx";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppShell({ current, children }: { current: string; children: ReactNode }) {
  return (
    <LocaleProvider>
      <TooltipProvider>
        <div className="min-h-dvh overflow-x-hidden bg-bg text-fg">
          <AppHeader current={current} />
          <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
        </div>
      </TooltipProvider>
    </LocaleProvider>
  );
}
