import type { PresentedChoice } from "../viewmodel/TrainViewModel.ts";
import { truthTagCaption } from "../viewmodel/TrainViewModel.ts";
import { GlossText } from "./Gloss.tsx";
import { useLocale } from "./LocaleContext.tsx";

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
  const { locale } = useLocale();
  const al = truthTagCaption("AL", locale);
  const alNative = `${al.name}. ${al.blurb}`;
  const grid =
    choices.length === 1
      ? "relative z-[2] grid grid-cols-1 gap-3"
      : choices.length === 3
        ? "relative z-[2] grid grid-cols-3 gap-2 sm:gap-3"
        : "relative z-[2] grid grid-cols-2 gap-3";
  return (
    <section className="action-choices flex flex-col gap-3">
      <h2 className="action-prompt">{prompt}</h2>
      <div className={grid}>
        {choices.map((c, i) => (
          <button
            key={c.id}
            type="button"
            disabled={c.grey || disabled}
            onClick={() => onChoose(c.id, c.artisticLicenseId)}
            className={i % 2 === 0 ? "choice-tile choice-tile-a" : "choice-tile choice-tile-b"}
          >
            <span className="choice-label">
              <span>
                <GlossText text={c.label} nested />
              </span>
              {c.artisticLicenseId ? (
                <abbr className="choice-al" title={alNative}>
                  AL
                </abbr>
              ) : null}
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
