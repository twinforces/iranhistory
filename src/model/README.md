# Model - the state machine, not the sermon

This folder is the rail. It does not draw. It does not rant at the player. It applies deltas, checks graves, and keeps a snapshot stack so a dead end is reversible.

If you think we cheated a number, pick the accusation and open the file.

| You think… | Open | Function |
| --- | --- | --- |
| Walk-away 1953 is presented as history | `cards.ts` `coup-1953` | Ending is tagged AL. Referee calls it a game rule. 1953 titles split: Danger: Coup! in Tehran, To Coup or Not to Coup on Ike's desk. |
| Soft Iran moves always kill you | `engine.ts` `iranLoseCheck` | Soft + IRGC under 35, or IRGC under 20 on any move. Same button, different grave. |
| Bars are vibes | `engine.ts` `applyDeltas` | Integers, clamped 0–100. Delayed deltas land at the start of the next resolve. |
| Historical choice is labelled on the button | `cards.ts` `historical` | Flag exists for tests and later tuning. ViewModel must not show it on the button. |
| Time travel rewrites the world | `engine.ts` `timeTravelBackOne` | Restores a frozen snapshot. No forked timeline. |
| Clocks run in 1953 | `engine.ts` `newGame` | `nuke_breakout_months` is `null` until a card sets `clocksOn`. |

## How a resolve works

1. Snapshot the current state onto `history` (time travel).
2. Apply last card's `delayedDeltas`.
3. Apply this choice's deltas and flags.
4. Iran: purge / sideline checks. US: election checks if the card is flagged.
5. If an ending fires, the chair is dead. Otherwise advance to `card.next` if that card is playable.

## What this is not

- Not a happy-ending sandbox. The calendar does not branch into everyone got rich.
- Not a Hormuz wargame. Different play style.
- Not the View. If a caption is wrong, look in `src/viewmodel` first.
- 1938 is a secret card. `cardById` can see it. The rail list cannot.

## Tuning

Numbers on cards are first-pass. The point of MVVM plus tests is that we can shove IRGC -15 to -11 without touching React, then watch the golden path still land near history.
