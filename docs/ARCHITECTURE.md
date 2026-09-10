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

Cards are data. `status: "playable"` means eight voices and buttons exist. Golden-path choices are `historical: true` in data and never labelled on the button. History always rides to the end of the wired rail. It does not grave the chair. Face changes (Mossadegh to Shah, Bazargan to Banisadr, Banisadr to Khamenei, Khamenei-as-president to Rafsanjani-as-letterhead, Carter to Reagan) are how the chair survives. After the Shah falls the letterhead is not the government: the Imam sits on the other side of the briefing. After 1989 the Imam plate is Khamenei. History keeps the real portraits. A moral diverge sits a stick-figure replacement. Khamenei in 1981 is president, not the Imam. Some forks only tweak numbers. Graves are off-ramps: walk away, pack the suitcase, keep the war at home, refuse the cup, side with Saddam, keep the 2026 war. Hinterland villages holding 1979 is a successful path, not a grave. Keeping the JCPOA limits after Europe bounces is the same kind of olive hold. Carter 1980 stays out. Reagan February 1982 takes Iraq off the terrorism list, then tilts intel. The live graph is `docs/RAILGRAPH.md`. Node identity is chair + card + face + ending. White Revolution, the Nixon catalog, and Contra crates currently collapse. They do not yet gate later cards. Eagle Claw is no longer a collapse: the raid has a Desert One result card, keep talking skips it, both still meet the Saudis lining Saddam up. Late copy lives in `src/model/cards.late.ts` so a rewrite cannot empty 1953-88.

## Truth tags

- LT: lawyer true (date, document, death toll)
- IT: Irish true (incentive reading)
- DK: don't know
- AL: artistic license, popup required
- GR: game rule, not a counterfactual claim

## Graves

Iran: IRGC bar. Soft + under 35, or under 20 on any move. Leader sideline twice.

US: election cards. Opposing ahead by 10, or a tie with bad media / red oil.

1953 walk-away: satrap, AL, run over. Portrait is Stalin in a turban. Half commie theocracy. The Saudis enter the Soviet sphere. Same picture if Mossadegh keeps the chair by giving the oil back and then reaches for the atoms.

## Clocks

Off until a card sets `clocksOn`. 1953 has no Natanz.

## Play

Chair first (Iran or US). Then the present-tense situation, the header "What do you want to do?", two choice columns, then Advisors as a scrolling list with cartoon busts. 1953 is a decision still on the desk. Time travel from a fresh 1953 can skip a groove. Ike to 2026 is playable stops. Quiet years still get a sentence. Johnson's SOFA is why Khomeini has a name. Ford keeps the pipeline. After the cup, Khamenei takes the robe and Rafsanjani sits. Keep the JCPOA limits and the nuclear war cards go away. Abraham Accords 2020. A public Saudi-Israel courtship is how 7 October arrives. Iran's 1981 is a face change: Banisadr leaves, Khamenei sits, the Imam stays. After 1989 the Imam plate is Khamenei. Urban liberals are a clock. 1979 spends them. Hostages are a card, not a footnote. A raid is not a grave. Taking Iraq off the terrorism list is how the chemistry moves. History is not a grave. After the revolution Iran has two portraits. Packing the chair is. Mossadegh's dead end is Stalin in a turban, not a liberal oil republic. The US plate names the party: Kennedy is a Democrat. Johnson is a Democrat. Reagan is a Republican.

## Next implementer slice

Tune numbers so the golden path still feels like history. Do not skip years. Headlines name the event.
