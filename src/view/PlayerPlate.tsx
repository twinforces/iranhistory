import type { Leader } from "../model/leaders.ts";
import { useLocale } from "./LocaleContext.tsx";

export function PlayerPlate({
  leader,
  yearLabel,
  variant = "player",
  layout = "row",
}: {
  leader: Leader;
  yearLabel: string;
  variant?: "player" | "imam" | "grave";
  layout?: "row" | "stack";
}) {
  const { t } = useLocale();
  const kicker = leader.partyLabel ? `${leader.playing} · ${leader.partyLabel}` : leader.playing;
  const meta = leader.partyLabel
    ? `${leader.name} · ${leader.partyLabel} · ${leader.role}`
    : `${leader.name} · ${leader.role}`;
  const imam = variant === "imam";
  const grave = variant === "grave";
  const letterhead =
    leader.id === "bazargan" ||
    leader.id === "banisadr" ||
    leader.id === "khamenei" ||
    leader.id === "rafsanjani" ||
    leader.id === "khatami" ||
    leader.id === "ahmadinejad" ||
    leader.id === "rouhani" ||
    leader.id === "raisi" ||
    leader.id === "pezeshkian" ||
    leader.id === "replacement";
  const className = [
    "player-plate",
    `player-plate-${leader.id}`,
    letterhead ? "player-plate-letterhead" : null,
    imam ? "player-plate-imam" : null,
    grave ? "player-plate-grave" : null,
    layout === "stack" ? "player-plate-stack" : null,
  ]
    .filter(Boolean)
    .join(" ");
  const aria = imam ? t("theImam") : grave ? leader.name : undefined;
  return (
    <aside className={className} aria-live={imam || grave ? undefined : "polite"} aria-label={aria}>
      <img
        src={leader.portrait}
        alt={leader.name}
        width={176}
        height={176}
        className="player-avatar"
      />
      <div className="min-w-0">
        <p className="kicker">{kicker}</p>
        <p className="player-you">{leader.youAre}</p>
        <p className="player-meta">{meta}</p>
        <p className="player-year">{yearLabel}</p>
      </div>
    </aside>
  );
}
