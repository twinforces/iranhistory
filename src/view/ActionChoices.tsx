import type { PresentedChoice } from "../viewmodel/TrainViewModel.ts";
import { GlossText } from "./Gloss.tsx";

export function ActionChoices({
  prompt,
  choices,
  disabled,
  onChoose,
}: {
  prompt: string;
  choices: readonly PresentedChoice[];
  disabled: boolean;
  onChoose: (id: string, artisticLicenseId: string | null) => void;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="action-prompt">{prompt}</h2>
      <div className={choices.length === 1 ? "relative z-[2] grid grid-cols-1 gap-3" : "relative z-[2] grid grid-cols-2 gap-3"}>
        {choices.map((c, i) => (
          <button
            key={c.id}
            type="button"
            disabled={c.grey || disabled}
            onClick={() => onChoose(c.id, c.artisticLicenseId)}
            className={i % 2 === 0 ? "choice-tile choice-tile-a" : "choice-tile choice-tile-b"}
          >
            <span className="choice-label">
              <GlossText text={c.label} nested />
            </span>
            <span className="choice-summary">
              <GlossText text={c.grey ? c.greyText : c.summary} nested />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}