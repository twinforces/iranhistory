# Architecture

The app is the briefing. The engine is a state machine.

## Split

| Layer | Path | Allowed to |
| --- | --- | --- |
| Model | `src/model` | Own GameState. Apply deltas. Fire graves. Snapshot for time travel. |
| ViewModel | `src/viewmodel` | Turn GameState into labels, grey buttons, visible bars, slogans. |
| View | `src/view` | Paint. Call VM commands. Never add 8 to IRGC. |

Same split as Collapse Lab (`GTB911sim`). Tests: `node --experimental-strip-types --test src/model/*.test.ts src/viewmodel/*.test.ts`.

## Rail

Cards are data. `status: "playable"` means eight voices and buttons exist. `status: "spine"` means referee copy is frozen, choices are not. Golden-path choices are `historical: true` in data and never labelled on the button.

## Truth tags

- LT: lawyer true (date, document, death toll)
- IT: Irish true (incentive reading)
- DK: don't know
- AL: artistic license, popup required
- GR: game rule, not a counterfactual claim

## Graves

Iran: IRGC bar. Soft + under 35, or under 20 on any move. Leader sideline twice.

US: election cards. Opposing ahead by 10, or a tie with bad media / red oil.

1953 walk-away: satrap, AL, run over.

## Clocks

Off until a card sets `clocksOn`. 1953 has no Natanz.

## Next implementer slice

Write 1979 and JCPOA the way 2019 is written. If those two play, clone the rest.
