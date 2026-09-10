const QUESTIONS: { q: string; freeze: string }[] = [
  {
    q: "Who is the 1979 Iran chair?",
    freeze:
      "Not Khomeini. After the Shah falls the player is Bazargan. From that week the Imam sits on the other side of the briefing. Banisadr is the next letterhead. In June 1981 the Majlis fires him. Khamenei sits the letterhead. He is president, not the Imam. You never sit the turban. Leader is a bar. IRGC is a bar that can fire you. 1953 Mossadegh is a separate prologue.",
  },
  {
    q: "Artesh / cleric / IRGC three-way",
    freeze:
      "Keep Artesh off the bar chart until we understand it. Flavor in the 1979-88 cards. Do not invent a third gun bar.",
  },
  {
    q: "When does a chair die?",
    freeze:
      "When the player picks a grave. Walk away, hire the British engineers, cut a deal with Moscow, keep the war at home, refuse the cup. A rescue is not a grave. History is the golden path: it always rides to the end of the wired rail. Carter losing seats Reagan. Banisadr losing seats Khamenei. Letterhead morals (refuse the stamp, keep Artesh, defy the Majlis) retire you to a 7-Eleven. Iran continues. Beirut rides through a channel in the dark to the cup. Rail hold is the 80s ending, after Reagan sat and the Imam drank. Some forks only tweak numbers. White Revolution is that kind. So is keeping the embargo. The Shah can hold 1979 if he spent the oil on the villages. Mossadegh's dead end is the street, or Stalin in a turban. The Saudis enter the Soviet sphere.",
  },
  {
    q: "What actually forks?",
    freeze:
      "Most binary cards collapse onto the next stop. White Revolution, admit-the-Shah, Eagle Claw, and Contra crates only move meters. Real forks are graves, the 1953 face split, hinterland villages holding 1979, and refusing the cup. Nixon weapons do not yet gate Contra. Letterhead morals are the same next event with a 7-Eleven overlay.",
  },
  {
    q: "Mossadegh dead end?",
    freeze:
      "The street, or Stalin in a turban. Hire the British engineers and the bazaar hears Lawrence's lesson. Cut a deal with Moscow and you get the half-commie theocracy. The Saudis enter the Soviet sphere. AL. Walk away on the US desk is the same satrap picture. You never sit him. The portrait is the picture of the vacuum.",
  },
  {
    q: "How much 1953-78?",
    freeze:
      "Split. Atoms for Peace (Ike), White Revolution (Kennedy), Twin Pillars (Nixon), Carter, then Reagan. Urban liberals are a clock. Khomeini uses them in 1979 and kills them. Combined 'muddles along' copy lives on the 1972 card. Johnson SOFA / Khomeini exile folded into the years between 1963 and 1972.",
  },
  {
    q: "Cartoons per rant",
    freeze:
      "Shipped as editorial cartoon busts in the Advisors list. Advisors are chair-specific. Mossadegh does not get CIA, my party, US media, Saudis, or Europeans. CIA can tell Eisenhower what they think the street will say. Wiley Joos stays inside the IRGC radio box after Stuxnet / archive / scientists.",
  },
  {
    q: "Golden path labelling",
    freeze:
      "Historical choices are flagged in data for tests and tuning. The button never says 'what happened.' Bars should push the player toward history. If they do not, we tweak numbers, not sermons.",
  },
  {
    q: "Success ending ($300B rebuild) and Kharg",
    freeze:
      "Late options, both AL. Rebuild requires IRGC assets already smashed and the player dying as the price. Kharg only after Venezuela is locked. Not in this slice.",
  },
  {
    q: "Party at start",
    freeze:
      "The seated president's party is a fact. Ike, Nixon, Reagan, and Trump are Republicans. Kennedy and Carter are Democrats. my_party follows the face. The 1953 chair screen does not pick a letter.",
  },
  {
    q: "2025-26 chapters",
    freeze:
      "Out of the spine until they stop being one newspaper's war diary. Mark DK. Optional late chapters later.",
  },
  {
    q: "Hitler easter egg",
    freeze:
      "No labelled button. The 1953 year is the calendar. Click it. It counts backward. When it hits 1938, you are there.",
  },
  {
    q: "Hormuz",
    freeze: "Different play style. Not this train. Leave it off the Play landing.",
  },
];

export function DesignView() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="font-mono text-2xs uppercase tracking-[0.18em] text-muted">MVVM</p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-fg">Same split as the lab</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Model owns the rail and the graves. ViewModel owns captions and which bars are visible.
          View is not allowed to add 8 to IRGC. Tests hit Model and ViewModel with node:test, no
          DOM. That is how we retune the story toward history without rewriting React.
        </p>
      </header>

      <ol className="grid gap-3 sm:grid-cols-3">
        <li className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-border">
          <p className="font-mono text-2xs uppercase tracking-wide text-muted">Model</p>
          <p className="mt-1 font-serif text-lg text-fg">src/model</p>
          <p className="mt-2 text-sm text-muted">
            Own GameState. Apply deltas. Fire graves. Snapshot for time travel.
          </p>
        </li>
        <li className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-border">
          <p className="font-mono text-2xs uppercase tracking-wide text-muted">ViewModel</p>
          <p className="mt-1 font-serif text-lg text-fg">src/viewmodel</p>
          <p className="mt-2 text-sm text-muted">
            Turn GameState into labels, grey buttons, visible bars, slogans.
          </p>
        </li>
        <li className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-border">
          <p className="font-mono text-2xs uppercase tracking-wide text-muted">View</p>
          <p className="mt-1 font-serif text-lg text-fg">src/view</p>
          <p className="mt-2 text-sm text-muted">Paint. Call VM commands. Never add 8 to IRGC.</p>
        </li>
      </ol>

      <section className="flex flex-col gap-3">
        <header>
          <p className="font-mono text-2xs uppercase tracking-[0.18em] text-muted">Architect freeze</p>
          <h2 className="mt-1 font-serif text-2xl font-semibold text-fg">The questions that stay shut</h2>
        </header>
        <ol className="flex flex-col gap-3">
          {QUESTIONS.map((item) => (
            <li key={item.q} className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-border">
              <p className="font-serif text-lg text-fg">{item.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.freeze}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
