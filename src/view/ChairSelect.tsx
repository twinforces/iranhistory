import type { Chair } from "../model/types.ts";
import { CHAIR_ART } from "./portraits.ts";

export function ChairSelect({ onPick }: { onPick: (chair: Chair) => void }) {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="kicker">Time travel</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          Play as Iran or play as the United States?
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          You are not reading a recap. You are sitting the chair in 1953, before Ajax is a fact.
          Eisenhower has not decided. Mossadegh still has the oil. The rail is a future, not a
          museum.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <button type="button" onClick={() => onPick("iran")} className="chair-card chair-card-iran">
          <img src={CHAIR_ART.iran} alt="" className="chair-card-art" />
          <span className="chair-card-body">
            <span className="kicker text-ink/55">Tehran</span>
            <span className="mt-1 block font-serif text-2xl font-semibold text-ink">Play as Iran</span>
            <span className="mt-2 block text-sm leading-relaxed text-ink/75">
              You are Mossadegh. The oil is nationalized. London wants it back.
            </span>
          </span>
        </button>
        <button type="button" onClick={() => onPick("us")} className="chair-card chair-card-us">
          <img src={CHAIR_ART.us} alt="" className="chair-card-art" />
          <span className="chair-card-body">
            <span className="kicker">Washington</span>
            <span className="mt-1 block font-serif text-2xl font-semibold text-fg">Play as US</span>
            <span className="mt-2 block text-sm leading-relaxed text-muted">
              You are Eisenhower. CIA and MI6 would like a coup. The cable is on the desk. It is
              not history yet.
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
