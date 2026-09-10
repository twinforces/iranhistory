# Train Ride to War

Iran incentives simulator. A GrumpyTechBro joint.

## Non-negotiables

- Ringmaster roles. Architect owns the rail until copy is frozen.
- MVVM: `src/model` (pure, tested), `src/viewmodel` (captions, tested), `src/view` (React, talks only to the VM).
- Unit-test the hell out of Model and ViewModel. Tune numbers there so the golden path still feels like history.
- Track every source in `src/model/receipts.ts`. Receipts page is a delivery.
- AL is labelled. Referee stays clean. Wiley Joos lives in the IRGC radio box.
- Hormuz as a map/wargame is on hold.
- Header: "Train Ride to War", icon pfp, subtitle "a GrumpyTechBro joint" linking to https://x.com/GrumpyTechBro in a new tab.
- No em-dashes.

## Git is the restore point

This repo has git. Origin is https://github.com/twinforces/iranhistory.
If `.git` is missing, attach origin/main. Do not rebuild source from memory.
A destroyed file is `git checkout -- path`. Never empty-replace a source file.
Commit after each beat so HEAD is a restore. Push `origin main`.
`scripts/githooks/pre-commit` refuses a tiny `cards.ts` / `engine.ts`.

## Auth / data

Off. localStorage later for a run. No accounts.
