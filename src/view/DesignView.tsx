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
      "When the player picks a grave. Walk away, hire the British engineers, cut a deal with Moscow, keep the war at home, refuse the cup, side with Saddam, keep the 2026 war. A rescue is not a grave. History is the golden path: it always rides to the end of the wired rail. Carter losing seats Reagan. Banisadr losing seats Khamenei. Khamenei taking the robe seats Rafsanjani and moves the Imam plate. Letterhead morals (refuse the stamp, keep Artesh, defy the Majlis, keep Family Protection, remain president, count the Green votes, fire the morality police) retire you to a 7-Eleven. Iran continues with a stick-figure replacement. History keeps the real portraits. Beirut rides through a channel in the dark to the cup. The 2026 campaign that kills the Imam is history arriving, a rail hold, not a letterhead gag. Some forks only tweak numbers. White Revolution is that kind. So is keeping the embargo. The Shah can hold 1979 if he spent the oil on the villages: that is a successful path, not a grave. Keeping the JCPOA limits after Europe bounces is the same kind of olive hold. Mossadegh's dead end is the street, or Stalin in a turban. The Saudis enter the Soviet sphere.",
  },
  {
    q: "What actually forks?",
    freeze:
      "Most binary cards collapse onto the next stop. White Revolution, admit-the-Shah, and Contra crates only move meters. Eagle Claw now has a Desert One result card; keep talking skips it; both still meet the Saudis lining Saddam up before the invasion. Real forks are graves, the 1953 face split, hinterland villages holding 1979 (a win), refusing the cup, joining Saddam after Kuwait, keeping the JCPOA limits (olive hold: nuclear war cards go away), doing the 2023 Saudi-Israel talks in private (Hamas cut off, no 7 October), and keeping the 2026 war. Nixon weapons do not yet gate Contra. Letterhead morals are the same next event with a 7-Eleven overlay and a stick-figure plate. Carter 1980 stays out of the war. Reagan's February 1982 original sin is taking Iraq off the terrorism list so Europe can sell the chemistry. The later 1982 tilt is the intel-to-Baghdad card. Go-to-Baghdad in 1991 is a live AL fork. The Guards do not veto the keep-limits hold.",
  },
  {
    q: "Mossadegh dead end?",
    freeze:
      "The street, or Stalin in a turban. Hire the British engineers and the bazaar hears Lawrence's lesson. Cut a deal with Moscow and you get the half-commie theocracy. The Saudis enter the Soviet sphere. AL. Walk away on the US desk is the same satrap picture. You never sit him. The portrait is the picture of the vacuum.",
  },
  {
    q: "How much 1953-78?",
    freeze:
      "Split. Atoms for Peace (Ike), White Revolution (Kennedy), the SOFA (Johnson: Vietnam is why you barely looked, and why Khomeini has a name), Sit Nixon, Twin Pillars (Nixon: Britain left east of Suez, no more Vietnams, oil-funded policeman), the pipeline (Ford), Carter (stay out of the war, hostages are the exam, Desert One if you authorize the raid, then the Saudis lining Saddam up), Reagan (February 1982: Iraq off the terrorism list so the chemistry can move, then the intel tilt, then Beirut). 1953 titles split by chair: Danger: Coup! in Tehran, To Coup or Not to Coup on Ike's desk. Urban liberals are a clock. Khomeini uses them in 1979 and kills them. Combined 'muddles along' copy lives on the 1972 card. Quiet Next cards are tutorial stops. Do not skip years.",
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
      "The seated president's party is a fact. Ike, Nixon, Ford, Reagan, Bush 41, Bush 43, and Trump are Republicans. Kennedy, Johnson, Carter, Clinton, Obama, and Biden are Democrats. my_party follows the face. The 1953 chair screen does not pick a letter.",
  },
  {
    q: "Keep the JCPOA limits?",
    freeze:
      "After Trump voids, Iran waits a year for Europe. That is history. May 2019 they step off, or they keep the limits. Keeping them is a successful olive hold. The nuclear war cards go away. Soleimani, Mahsa, and Oct 7 are not centrifuges. They live on the historical sprint. The Guards do not veto the hold. Biden's Vienna card only exists if they stepped off. Kerry signed, not Clinton. She left State 1 February 2013. The card is named Joint Comprehensive Plan of Action: missiles allowed, civilian reactor allowed, enrichment supposed to stay low under cameras, Congress will not ratify, cash on pallets.",
  },
  {
    q: "Abraham Accords / Saudi-Israel?",
    freeze:
      "2020: UAE and Bahrain recognize Israel. The US co-opts the neighborhood one capital at a time. Iran keeps Death to Israel and becomes more of a pariah, or drops the slogan (AL). 2023: Biden's Saudi talks. Public is history: Hamas shops, finds Iran, 7 October happens. Private is AL: Saudis announce a signed Accord, Hamas is cut off, 7 October does not happen. Raisi still dies. The nuclear file continues.",
  },
  {
    q: "2025-26 chapters",
    freeze:
      "On the rail. Twelve Days 2025 and the 2026 campaign that kills the Imam, then a June memorandum. Historical is the campaign then a ceasefire. Keep-the-war is a grave. Stop-after-Fordow is AL rail hold. This is an ending, not a letterhead gag.",
  },
  {
    q: "Hitler easter egg",
    freeze:
      "No labelled button. The 1953 year is the calendar. Click it. It counts backward. When it hits 1938, you are there.",
  },
  {
    q: "Hormuz",
    freeze:
      "The 2019 drone and tanker card sits on the train after Europe bounces. Hormuz as a map is still a different play style. Leave that off the Play landing.",
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
