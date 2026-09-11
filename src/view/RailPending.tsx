import { readStoredLocale } from "../i18n/locale.ts";
import { ui } from "../i18n/ui.ts";

/** Route pending. Same chrome as the first-paint boot so a slow chunk is not a dead page. */
export function RailPending() {
  const locale = readStoredLocale();
  return (
    <div className="rail-pending" role="status" aria-live="polite">
      <div className="rail-pending-inner">
        <p className="kicker">{ui(locale, "bootKicker")}</p>
        <p className="rail-pending-title">{ui(locale, "bootTitle")}</p>
        <p className="rail-pending-copy">{ui(locale, "bootCopy")}</p>
      </div>
    </div>
  );
}
