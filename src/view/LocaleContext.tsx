import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { applyDocumentLocale, readStoredLocale, writeStoredLocale } from "../i18n/locale.ts";
import { ui, uiTable, type UiKey } from "../i18n/ui.ts";
import type { Locale } from "../i18n/types.ts";

interface LocaleApi {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: UiKey) => string;
  table: ReturnType<typeof uiTable>;
}

const LocaleContext = createContext<LocaleApi | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);
  useEffect(() => {
    applyDocumentLocale(locale);
    writeStoredLocale(locale);
    if (typeof document !== "undefined") {
      document.title = ui(locale, "product");
    }
  }, [locale]);
  const api = useMemo<LocaleApi>(
    () => ({
      locale,
      setLocale: setLocaleState,
      t: (key) => ui(locale, key),
      table: uiTable(locale),
    }),
    [locale],
  );
  return <LocaleContext.Provider value={api}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleApi {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale outside LocaleProvider");
  return ctx;
}
