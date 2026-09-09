# Train Ride to War

A toxic-incentives briefing on US-Iran history. You sit the chair. The rail is already written.

**a [GrumpyTechBro](https://x.com/GrumpyTechBro) joint.**

## What this is

Not a morality play. Two regimes optimizing for survival under bad maps. Eighteen story cards, faction bars, two clocks, graves (IRGC purge / lost election), time travel out of dead ends, and a Receipts page that is a delivery, not a footer.

Architect freeze is in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). Playable proofs: **1953** (the gate) and **2019** (clone this card). Hormuz as a map is on hold.

## MVVM

- `src/model` — state machine. Test it.
- `src/viewmodel` — captions, visible bars, greyed buttons. Test it.
- `src/view` — React. Talks only to the ViewModel.

## Run

This repo is paired with the Grok Build app. Locally: `npm test` for the engine, `npm run dev` for the briefing.

## License of the argument

Sources live in `src/model/receipts.ts`. Lawyer-true, Irish-true, don't-know, and artistic-license are tagged on every card. The referee does not speak Wiley Joos.
