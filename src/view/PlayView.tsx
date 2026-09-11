import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { TagChip, RefereeText } from "./TagChip.tsx";
import { FactionBars, PlayScoreboard } from "./FactionBars.tsx";
import { ChairSelect } from "./ChairSelect.tsx";
import { AdvisorList } from "./AdvisorList.tsx";
import { ActionChoices } from "./ActionChoices.tsx";
import { GlossText } from "./Gloss.tsx";
import { PlayerPlate } from "./PlayerPlate.tsx";
import { TrainViewModel } from "../viewmodel/TrainViewModel.ts";
import type { Chair, Party } from "../model/types.ts";
import { useLocale } from "./LocaleContext.tsx";

export function PlayView({
  initialCard,
  initialChair,
}: {
  initialCard?: string;
  initialChair?: Chair;
}) {
  const { locale, t } = useLocale();
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

  const ui = vm.getState(locale);
  const refresh = () => setTick((n) => n + 1);
  const license = ui.lastResult ? null : alId ? vm.licenseById(alId, locale) : null;
  const flank = ui.imam ?? ui.grave;
  const dual = Boolean(flank);
  const holdEnding = ui.endingId === "shah_holds" || ui.endingId === "jcpoa_holds";
  const historyEnding = ui.endingId === "none" || ui.endingId === "the_leader";
  const endingKicker = holdEnding
    ? t("successfulPath")
    : historyEnding
      ? t("railHold")
      : t("endOfChair");
  const endingClass = holdEnding
    ? "hold-panel"
    : historyEnding
      ? "rounded-[var(--radius-xl)] bg-surface p-5 shadow-border"
      : "ending-panel";
  const endingKickerClass = holdEnding ? "kicker text-ok" : "kicker text-accent";

  return (
    <div className="flex flex-col gap-4">
      <PlayScoreboard museum={ui.museum} />
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="kicker">
          {ui.chair === "us" ? t("unitedStates") : t("iran")} · {ui.faceLabel} · {ui.card.yearLabel}
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
          {t("sitDifferent")}
        </button>
      </div>

      <div className="flex min-w-0 flex-col gap-4">
          <div className={dual ? "play-flank-dual" : "play-flank-single"}>
            <PlayerPlate
              key={ui.leader.id}
              leader={ui.leader}
              yearLabel={ui.card.yearLabel}
              layout="stack"
            />
            <article className="situation-panel">
            {ui.card.art ? (
              <img src={ui.card.art} alt="" className="situation-art" />
            ) : null}
            {ui.slogan ? <p className="kicker mb-2">{ui.slogan}</p> : null}
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
                {ui.card.tags.map((tag) => {
                  const alId = ui.card.licenses?.[0]?.id;
                  return (
                    <TagChip
                      key={tag}
                      tag={tag}
                      onClick={tag === "AL" && alId ? () => setAlId(alId) : undefined}
                    />
                  );
                })}
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
                    {t("refereeNotes")}
                  </summary>
                  <div className="mt-2 flex flex-col gap-2 text-sm leading-relaxed text-ink/70">
                    {ui.card.referee.map((p) => (
                      <p key={p.slice(0, 32)}>
                        <RefereeText text={p} />
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
          {ui.phase === "ended" && ui.endingTitle ? null : (
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
          </div>

          {ui.phase === "ended" && ui.endingTitle ? (
            <article className={endingClass}>
              <p className={endingKickerClass}>{endingKicker}</p>
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
                  {t("stillWaiting")}
                </Button>
              ) : null}
            </article>
          ) : null}

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
              {t("timeTravelBack")}
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
              {t("lastBranch")}
            </Button>
          </div>

          <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_16.5rem]">
            <AdvisorList briefings={ui.card.briefings} />
            <aside className="meters-panel lg:sticky lg:top-4 h-fit">
              <p className="kicker mb-3">
                {ui.faceLabel} · {ui.party}
              </p>
              <FactionBars bars={ui.bars} clocks={ui.clocks} museum={ui.museum} />
            </aside>
          </div>
        </div>

      {ui.lastResult ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-bg/70 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="result-title"
        >
          <div className="dossier w-full max-w-lg px-5 py-5">
            <p className="kicker text-accent">
              {ui.lastResult.kind === "serve"
                ? t("serveSomebody")
                : ui.lastResult.kind === "adapts"
                  ? t("mapAnswers")
                  : t("moralVictory")}
            </p>
            <h3 id="result-title" className="mt-1 font-serif text-xl text-ink">
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
              {ui.lastResult.kind === "serve"
                ? t("youCapitulate")
                : ui.lastResult.kind === "adapts"
                  ? t("railContinues")
                  : t("iranContinues")}
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
            <p className="kicker text-accent">{t("artisticLicense")}</p>
            <h3 id="al-title" className="mt-1 font-serif text-xl text-ink">
              {license.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              <GlossText text={license.body} />
            </p>
            <Button className="mt-4" variant="default" onClick={() => setAlId(null)}>
              {t("close")}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
