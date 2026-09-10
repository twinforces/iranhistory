import { useEffect } from "react";

/** Drops the first-paint boot rail once React is actually on the page. */
export function HydrateMark() {
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);
  return null;
}
