import type { Locale } from "./types.ts";

export const LOCALE_KEY = "trtw-locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "fa";
}

export function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const raw = window.localStorage.getItem(LOCALE_KEY);
    return isLocale(raw) ? raw : "en";
  } catch {
    return "en";
  }
}

export function writeStoredLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(LOCALE_KEY, locale);
  } catch {
    /* private mode */
  }
}

export function applyDocumentLocale(locale: Locale): void {
  const root = globalThis.document?.documentElement;
  if (!root) return;
  root.lang = locale === "fa" ? "fa" : "en";
  root.dir = locale === "fa" ? "rtl" : "ltr";
  root.classList.toggle("locale-fa", locale === "fa");
}
