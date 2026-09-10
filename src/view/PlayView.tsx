import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { TagChip } from "./TagChip.tsx";
import { FactionBars } from "./FactionBars.tsx";
import { ChairSelect } from "./ChairSelect.tsx";
import { AdvisorList } from "./AdvisorList.tsx";
import { ActionChoices } from "./ActionChoices.tsx";
import { GlossText } from "./Gloss.tsx";
import { PlayerPlate } from "./PlayerPlate.tsx";
import { TrainViewModel } from "../viewmodel/TrainViewModel.ts";
import type { Chair, Party } from "../model/types.ts";

export function PlayView({
  initialCard,
  initialChair,
}: {
  initialCard?: string;
  initialChair?: Chair;
}) {
  const [chair, setChair] = useState<Chair | null>(initialChair ?? null);
  const [tick, setTick] = useState(0);
  const [alId, setAlId] = useState<string | null>(null);
  const [calendarYear, setCalendarYear] = useState<number | null>(null);
  const party: Party = chair === "us" ? "R" : "D";
  const vm = useMemo(() => {
    if (!chair) return null;
    return new TrainViewModel(chair, party, initialCard);
  }, [chair, party, initialCard]);
  void tick;

  if (!chair || !vm) {
    return <ChairSelect onPick={setChair} />;
  }

  const ui = vm.getState();
  const refresh = () => setTick((n) => n + 1);
  const license = ui.lastResult ? null : alId ? vm.licenseById(alId) : null;
  const flank = ui.imam ?? ui.grave;
  const dual = Boolean(flank);
  const endingKicker =
    ui.endingId === "none"
      ? "Rail hold"
      : ui.endingId === "shah_holds"
        ? "The king still sits"
        : "End of this chair";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="kicker">
          {ui.chair === "us" ? "United States" : "Iran"} · {ui.faceLabel} · {ui.card.yearLabel}
        </p>
        <button
          type="button"
          className="text-xs text-muted hover:text-fg"
          onClick={() => {
            setChair(null);
            setAlId(null);
            setCalendarYear(null);
          }}
        >
          Sit a different chair
        </button>
      </div>

      <div className="flex min-w-0 flex-col gap-5">
          <div className={dual ? "play-flank-dual" : "play-flank-single"}>
            <PlayerPlate
              key={ui.leader.id}
              leader={ui.leader}
              yearLabel={ui.card.yearLabel}
              layout={dual ? "stack" : "row"}
            />
            <article className="situation-panel">
            {ui.card.art ? (
              <img src={ui.card.art} alt="" className="situation-art" />
            ) : null}
            <div className="situation-body">
              <div className="flex flex-wrap items-center gap-2">
                {ui.canFurtherBack ? (
                  <button
                    type="button"
                    className="year-egg"
                    onClick={() => {
                      const current = calendarYear ?? ui.card.year;
                      const next = current - 5;
                      if (next <= 1938) {
                        vm.furtherBack();
                        setCalendarYear(null);
                        setAlId(null);
                        refresh();
                        return;
                      }
                      setCalendarYear(next);
                    }}
                  >
                    {calendarYear ?? ui.card.yearLabel}
                  </button>
                ) : (
                  <span className="font-mono text-xs text-ink/55">{ui.card.yearLabel}</span>
                )}
                {ui.card.tags.map((t) => (
                  <TagChip
                    key={t}
                    tag={t}
                    onClick={t === "AL" ? () => setAlId(ui.card.licenses?.[0]?.id ?? null) : undefined}
                  />
                ))}
              </div>
              <h1 className="mt-1 font-serif text-xl font-semibold text-ink">
                <GlossText text={ui.card.title} />
              </h1>
              {ui.card.situation.split("\n\n").map((para) => (
                <p key={para.slice(0, 40)} className="mt-2 text-sm leading-relaxed text-ink">
                  <GlossText text={para} />
                </p>
              ))}
              {ui.card.referee.length > 0 ? (
                <details className="mt-2">
                  <summary className="cursor-pointer font-mono text-2xs uppercase tracking-wide text-ink/55">
                    Referee notes
                  </summary>
                  <div className="mt-2 flex flex-col gap-2 text-sm leading-relaxed text-ink/70">
                    {ui.card.referee.map((p) => (
                      <p key={p.slice(0, 32)}>
                        <GlossText text={p} />
                      </p>
                    ))}
                  </div>
                </details>
              ) : null}
            </div>
          </article>
          {flank ? (
            <PlayerPlate
              key={flank.id}
              leader={flank}
              yearLabel={ui.card.yearLabel}
              variant={ui.imam ? "imam" : "grave"}
              layout="stack"
            />
          ) : null}
          </div>

          {ui.phase === "ended" && ui.endingTitle ? (
            <article
              className={
                ui.endingId === "none"
                  ? "rounded-[var(--radius-xl)] bg-surface p-5 shadow-border"
                  : "ending-panel"
              }
            >
              <p className="kicker text-accent">
                {endingKicker}
              </p>
              <h3 className="mt-1 font-serif text-xl text-fg">
                <GlossText text={ui.endingTitle ?? ""} />
              </h3>
              {(ui.endingBody ?? "").split("\n\n").map((para) => (
                <p key={para.slice(0, 40)} className="mt-2 text-sm leading-relaxed text-muted">
                  <GlossText text={para} />
                </p>
              ))}
              {ui.endingId === "hitler_shot" ? (
                <Button
                  className="mt-4"
                  onClick={() => {
                    vm.resetTo1953();
                    setAlId(null);
                    refresh();
                  }}
                >
                  1953 is still waiting
                </Button>
              ) : null}
            </article>
          ) : (
            <ActionChoices
              prompt={ui.card.actionPrompt}
              choices={ui.choices}
              disabled={ui.phase !== "playing"}
              onChoose={(id, licenseId) => {
                if (licenseId) setAlId(licenseId);
                vm.choose(id);
                setCalendarYear(null);
                refresh();
              }}
            />
          )}

          {ui.bleed ? <p className="text-sm italic text-muted">{ui.bleed}</p> : null}

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="secondary"
              disabled={!ui.canBackOne}
              onClick={() => {
                vm.backOne();
                setAlId(null);
                setCalendarYear(null);
                refresh();
              }}
            >
              Time travel: back one
            </Button>
            <Button
              size="sm"
              variant="ghost"
              disabled={!ui.canBackBranch}
              onClick={() => {
                vm.backToBranch();
                setAlId(null);
                setCalendarYear(null);
                refresh();
              }}
            >
              Last branch
            </Button>
          </div>

          <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_16.5rem]">
            <AdvisorList briefings={ui.card.briefings} />
            <aside className="meters-panel lg:sticky lg:top-4 h-fit">
              <p className="kicker mb-3">
                {ui.faceLabel} · {ui.party}
              </p>
              <FactionBars bars={ui.bars} clocks={ui.clocks} />
            </aside>
          </div>
        </div>

      {ui.lastResult ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-bg/70 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="moral-title"
        >
          <div className="dossier w-full max-w-lg px-5 py-5">
            <p className="kicker text-accent">Moral victory</p>
            <h3 id="moral-title" className="mt-1 font-serif text-xl text-ink">
              {ui.lastResult.title}
            </h3>
            {ui.lastResult.body.split("\n\n").map((para) => (
              <p key={para.slice(0, 40)} className="mt-3 text-sm leading-relaxed text-ink/80">
                <GlossText text={para} />
              </p>
            ))}
            <Button
              className="mt-4"
              variant="default"
              onClick={() => {
                vm.dismissResult();
                setAlId(null);
                refresh();
              }}
            >
              However, Iran continues on.
            </Button>
          </div>
        </div>
      ) : license ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-bg/70 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="al-title"
        >
          <div className="dossier w-full max-w-lg px-5 py-5">
            <p className="kicker text-accent">Artistic license</p>
            <h3 id="al-title" className="mt-1 font-serif text-xl text-ink">
              {license.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              <GlossText text={license.body} />
            </p>
            <Button className="mt-4" variant="default" onClick={() => setAlId(null)}>
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
