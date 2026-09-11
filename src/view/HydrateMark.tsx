import { useLayoutEffect } from "react";

/** Drops the first-paint boot rail once React is actually on the page. */
export function HydrateMark() {
  useLayoutEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);
  return null;
}
