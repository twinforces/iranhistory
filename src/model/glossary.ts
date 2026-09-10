/**
 * What: proper names and players. Hover text lives here so card copy can stay
 * spoken, not footnoted.
 * Why: Ajax is a cable, the court is not the later Leader, and "young king who
 * already ran once" is a man with a suitcase, not a metaphor.
 */
export interface GlossaryEntry {
  readonly id: string;
  readonly term: string;
  readonly aliases: readonly string[];
  readonly definition: string;
}

export const GLOSSARY: readonly GlossaryEntry[] = [
  {
    id: "anglo-iranian",
    term: "Anglo-Iranian Oil Company",
    aliases: ["Anglo-Iranian Oil Company", "Anglo-Iranian"],
    definition:
      "The British company that ran Iranian oil under the old concession. London treats its loss as a wound. Mossadegh treats its presence as an occupation with letterhead.",
  },
  {
    id: "atoms-for-peace",
    term: "Atoms for Peace",
    aliases: ["Atoms for Peace"],
    definition:
      "Eisenhower's civilian nuclear export during the American Atomic Age. Reactors and fuel as diplomacy. The bargain is: we provide the fuel, you do not sprint to a national enrichment plant.",
  },
  {
    id: "tehran-reactor",
    term: "Tehran Research Reactor",
    aliases: ["Tehran Research Reactor"],
    definition:
      "A small US-supplied research reactor in Tehran. The fuel came with it. A research reactor is not a bomb plant. It is how the fuel cycle starts as a gift.",
  },
  {
    id: "npt",
    term: "Non-Proliferation Treaty",
    aliases: ["Non-Proliferation Treaty", "Non Proliferation Treaty", "NPT"],
    definition:
      "The 1968 bargain: non-nuclear states do not build bombs, nuclear states share civilian tech. Iran signs later. 'We have a right to enrich' is a political sentence. The treaty text is messier.",
  },
  {
    id: "mossadegh",
    term: "Mohammad Mossadegh",
    aliases: ["Mohammad Mossadegh", "Mossadegh"],
    definition:
      "Elected prime minister of Iran. Nationalized the oil. A nationalist, not a communist, and not a master of the street. He has parliament. He does not have the army.",
  },
  {
    id: "shah",
    term: "Mohammad Reza Pahlavi",
    aliases: [
      "Mohammad Reza Pahlavi",
      "Mohammad Reza",
      "young Shah",
      "young king",
      "the Shah",
      "the king",
      "Shah",
    ],
    definition:
      "The young king. Britain and the Soviets deposed his father in 1941 and put him on the throne. In early 1953, during a fight with Mossadegh, he packed a suitcase and prepared to leave the country. CIA reads that as a client who will run if the square gets loud.",
  },
  {
    id: "national-front",
    term: "National Front",
    aliases: ["National Front"],
    definition:
      "Mossadegh's coalition. Nationalists, not a street army. They can win an argument in parliament. They cannot hold a barracks.",
  },
  {
    id: "ajax",
    term: "Ajax",
    aliases: ["Operation Ajax", "TPAJAX", "Ajax"],
    definition:
      "The CIA and MI6 name for a coup they want to run against Mossadegh. In the later files it is TPAJAX. Right now it is a cable on a desk. It is not a fact until someone signs it.",
  },
  {
    id: "stalin-turban",
    term: "Stalin in a turban",
    aliases: [
      "Stalin in a turban",
      "Stalin in a Turban",
      "half-commie theocracy",
      "half commie theocracy",
    ],
    definition:
      "The game's picture of Mossadegh without Ajax, or of a nationalist who kept the chair without the guns. Tudeh plus the mosque. Not a liberal oil republic. You never sit him. You get him. AL, not a prediction.",
  },
  {
    id: "soviet-sphere",
    term: "Soviet sphere",
    aliases: ["Soviet sphere", "the Soviet sphere"],
    definition:
      "Riyadh watching a red flag over Abadan and deciding the neighborhood is no longer American. Game rule on the Mossadegh dead end. AL.",
  },
  {
    id: "tudeh",
    term: "Tudeh",
    aliases: ["Tudeh"],
    definition:
      "The Iranian communist party. Real, organized, and not in charge. Washington has a file. A file is not a proof that Mossadegh is their man. On the dead-end picture they share the building with the mosque.",
  },
  {
    id: "court",
    term: "The court",
    aliases: ["The court", "the court", "the Court"],
    definition:
      "The Shah's palace, family, and the army that answers to them. Not parliament. Not the later Supreme Leader. In 1953 this is who still has the guns.",
  },
  {
    id: "street",
    term: "The street",
    aliases: ["The street", "the street", "the Street"],
    definition:
      "Crowds, oil workers, the bazaar, students, Tudeh-adjacent left. They can fill a square. They cannot hold a barracks. Not a government-in-waiting.",
  },
  {
    id: "cia",
    term: "CIA",
    aliases: ["CIA"],
    definition:
      "US intelligence. They want credit for a cheap fix. They have a general they like, a mob they think they can rent, and a cable that still needs a signature.",
  },
  {
    id: "mi6",
    term: "MI6",
    aliases: ["MI6"],
    definition:
      "British intelligence. The oil company is theirs. The empire is tired. They want Washington to hold the bag.",
  },
  {
    id: "eisenhower",
    term: "Eisenhower",
    aliases: ["Eisenhower", "Ike"],
    definition:
      "Dwight D. Eisenhower, Republican, President of the United States. He has not decided on the coup. Atoms for Peace is his civilian nuclear export. Both can be true in the same decade.",
  },
  {
    id: "pm",
    term: "Prime minister",
    aliases: ["prime minister", "Prime minister", "PM"],
    definition:
      "The elected head of government. Mossadegh sits here. The Shah is still king. Those are not the same chair.",
  },
  {
    id: "savak",
    term: "SAVAK",
    aliases: ["SAVAK"],
    definition:
      "The Shah's secret police. After Ajax this is one of the things the throne inherits. It can fill a prison. It cannot vote down a square.",
  },
  {
    id: "my-party",
    term: "My party",
    aliases: ["My party"],
    definition:
      "Your caucus this round. How much they will tolerate you, not how much they like Iran. The letter follows the seated president. Kennedy and Carter are Democrats. Ike, Nixon, Reagan, and Trump are Republicans.",
  },
  {
    id: "opposing",
    term: "Opposing party",
    aliases: ["Opposing party", "the other paper"],
    definition:
      "The other party. They will live with your choice this week and have a sentence ready for a later decade.",
  },
  {
    id: "media",
    term: "US media",
    aliases: ["US media"],
    definition:
      "The American attention stack. A king photographs. A company does not. Process dies in an hour.",
  },
  {
    id: "saudis",
    term: "Saudis",
    aliases: ["Saudis"],
    definition:
      "The conservative oil monarchy next door. They do not want a left-nationalist sermon preached to their own workers. Quiet yes. They will not go first. If Tehran goes red-and-turban, Riyadh does the math.",
  },
  {
    id: "europeans",
    term: "Europeans",
    aliases: ["Europeans", "London", "Britain"],
    definition:
      "London wants the company back. The rest of Europe wants the precedent to die. Washington has the bag.",
  },
  {
    id: "white-revolution",
    term: "White Revolution",
    aliases: ["White Revolution"],
    definition:
      "The Shah's 1963 reform program: land reform, literacy and health corps, profit-sharing, women's suffrage. Called white to mark it off from a red revolution. Kennedy pressed for it. Khomeini found his voice against it.",
  },
  {
    id: "khomeini",
    term: "Ruhollah Khomeini",
    aliases: ["Ruhollah Khomeini", "Khomeini", "the Imam"],
    definition:
      "An ayatollah in Qom in 1963, not yet a government. He shouts at the White Revolution, especially the vote for women. After the 1964 Status of Forces fight he is exiled to Turkey, then Najaf, then France. In 1979 he comes home as the Imam: the jurist, the veto, the guns. The letterhead is someone else.",
  },
  {
    id: "family-protection",
    term: "Family Protection Law",
    aliases: ["Family Protection Law"],
    definition:
      "1967, expanded 1975. Divorce through courts, marriage age up, polygamy squeezed. Among the more liberal family statutes in the region. Khomeini calls it un-Islamic. In 1979 it is treated as void within weeks of the revolution.",
  },
  {
    id: "nixon-doctrine",
    term: "Nixon Doctrine",
    aliases: ["Nixon Doctrine"],
    definition:
      "Asian allies defend themselves. America sells the weapons and holds the nuclear umbrella. In the Gulf that means twin pillars: Iran and Saudi Arabia as policemen. The May 1972 Tehran visit is the blank check.",
  },
  {
    id: "bazargan",
    term: "Mehdi Bazargan",
    aliases: ["Mehdi Bazargan", "Bazargan"],
    definition:
      "The smiling prime minister of the provisional government. A liberal Islamist who thinks he is running a coalition. He is the face. He does not have the guns. Khomeini can replace him.",
  },
  {
    id: "banisadr",
    term: "Abolhassan Banisadr",
    aliases: ["Abolhassan Banisadr", "Banisadr"],
    definition:
      "The first elected president after Bazargan resigns. He has a vote. He does not have a barracks. The Guards can impeach a letterhead. In June 1981 they do.",
  },
  {
    id: "khamenei",
    term: "Ali Khamenei",
    aliases: ["Ali Khamenei", "Khamenei"],
    definition:
      "President after Banisadr. A cleric with a vote. He is not the Imam. The guns are still not his. The later Leader is a different chair.",
  },
  {
    id: "majlis",
    term: "Majlis",
    aliases: ["Majlis", "the Majlis"],
    definition:
      "Iran's parliament. In June 1981 it has the votes to fire a president the Imam has already dropped.",
  },
  {
    id: "rajai",
    term: "Rajai",
    aliases: ["Rajai", "Mohammad-Ali Rajai"],
    definition:
      "The two-week president after Banisadr. A bomb on 30 August 1981 kills him and Prime Minister Bahonar. The game skips him the way it skips Johnson.",
  },
  {
    id: "najaf",
    term: "Najaf",
    aliases: ["Najaf"],
    definition:
      "The shrine city in Iraq where Khomeini sits in exile after Turkey and before France. The sermons still arrive in Iran. Exile is not silence.",
  },
  {
    id: "irgc",
    term: "IRGC",
    aliases: ["IRGC"],
    definition:
      "The Islamic Revolutionary Guard Corps. Stood up in 1979 to protect the revolution from the regular army, the leftists, and the smiling face. Once you have a parallel army with its own budget, reform-from-inside is a rounding error.",
  },
  {
    id: "leader",
    term: "Leader",
    aliases: [],
    definition:
      "Velayat-e faqih. Survival of the jurist. Parables. Veto. Lets the Guards do the killing. In 1979 this is Khomeini, not the court.",
  },
  {
    id: "kennedy",
    term: "John F. Kennedy",
    aliases: ["John F. Kennedy", "Kennedy"],
    definition:
      "Democrat. President of the United States, 1961 to 1963. He presses the Shah to modernize so the left has less to recruit. He is not Eisenhower.",
  },
  {
    id: "carter",
    term: "Jimmy Carter",
    aliases: ["Jimmy Carter", "Carter"],
    definition:
      "Democrat. President of the United States, 1977 to 1981. Human rights was the campaign. The embassy is the exam.",
  },
  {
    id: "reagan",
    term: "Ronald Reagan",
    aliases: ["Ronald Reagan", "Reagan"],
    definition:
      "Republican. President of the United States, 1981 to 1989. The hostages walk the morning he takes the oath. That timing is the brand. Beirut, then a channel in the dark, then an airliner. The 1980s are the exam.",
  },
  {
    id: "nixon",
    term: "Richard Nixon",
    aliases: ["Richard Nixon", "Nixon"],
    definition:
      "Republican. President of the United States. The Nixon Doctrine says Asian allies defend themselves. In Tehran that becomes a blank check.",
  },
  {
    id: "eagle-claw",
    term: "Eagle Claw",
    aliases: ["Eagle Claw", "Operation Eagle Claw", "Desert One"],
    definition:
      "The April 1980 rescue. Helicopters off the USS Nimitz toward a desert strip called Desert One. A sandstorm, a collision, eight Americans dead. The wreckage is left behind. The hostages are scattered. They are not freed.",
  },
  {
    id: "followers-imam",
    term: "Followers of the Imam",
    aliases: [
      "followers of the Imam",
      "Followers of the Imam",
      "Muslim Student Followers of the Imam's Line",
    ],
    definition:
      "The students who occupy the American embassy on 4 November 1979. They call it a nest of spies. They want the Shah. Khomeini does not send them home.",
  },
  {
    id: "saddam",
    term: "Saddam Hussein",
    aliases: ["Saddam"],
    definition:
      "The Iraqi president who invades Iran in September 1980. Enemy of the men who have the embassy. Not a friend. Gulf checks and Western hardware follow.",
  },
  {
    id: "poison-chalice",
    term: "poison chalice",
    aliases: ["poison chalice", "poison cup"],
    definition:
      "Khomeini's line for accepting the 1988 ceasefire after eight years. The letterhead stamps. The Imam drinks. The Guards take the lesson: never fight fair again.",
  },
  {
    id: "hezbollah",
    term: "Hezbollah",
    aliases: ["Hezbollah"],
    definition:
      "The cousin militia in Lebanon. IRGC cadre help stand it up in the Bekaa in 1982. Train, arm, finance, keep a veto without putting Iranian brigades on the map. The later axis is this template.",
  },
  {
    id: "bekaa",
    term: "Bekaa",
    aliases: ["Bekaa", "the Bekaa"],
    definition:
      "The valley in Lebanon where the Guards plant a camp and a cousin militia. Cheaper than a division. Close to Israel. Deniable until a truck is not.",
  },
  {
    id: "contras",
    term: "Contras",
    aliases: ["Contras", "those rebels"],
    definition:
      "The Nicaraguan rebels Congress told Washington not to fund. The dark channel that sells Tehran missiles can walk the profit to them. That is the scandal's other half.",
  },
  {
    id: "vincennes",
    term: "USS Vincennes",
    aliases: ["USS Vincennes", "Vincennes", "Iran Air"],
    definition:
      "3 July 1988, a US cruiser shoots down Iran Air 655 over the Strait. 290 dead. Washington calls it a mistake. Tehran calls it a massacre. The ceasefire follows.",
  },
];

const BY_ID = new Map(GLOSSARY.map((e) => [e.id, e]));

export function glossaryById(id: string): GlossaryEntry | undefined {
  return BY_ID.get(id);
}

export function glossaryForFaction(
  faction: string,
  year: number,
): GlossaryEntry | undefined {
  if (faction === "leader") return glossaryById(year < 1979 ? "court" : "leader");
  if (faction === "street") return glossaryById("street");
  if (faction === "cia") return glossaryById("cia");
  if (faction === "irgc") return glossaryById("irgc");
  if (faction === "my_party") return glossaryById("my-party");
  if (faction === "opposing_party") return glossaryById("opposing");
  if (faction === "media") return glossaryById("media");
  if (faction === "saudis") return glossaryById("saudis");
  if (faction === "europeans") return glossaryById("europeans");
  return undefined;
}

export interface GlossPart {
  readonly text: string;
  readonly id?: string;
}

function isLetter(ch: string | undefined): boolean {
  if (!ch) return false;
  return /\p{L}|\p{N}/u.test(ch);
}

function boundary(text: string, start: number, len: number): boolean {
  return !isLetter(text[start - 1]) && !isLetter(text[start + len]);
}

const NEEDLES: { alias: string; id: string }[] = GLOSSARY.flatMap((e) =>
  e.aliases.map((alias) => ({ alias, id: e.id })),
).sort((a, b) => b.alias.length - a.alias.length);

/** Split copy into plain text and glossary hits. Longest alias wins. */
export function linkify(text: string): GlossPart[] {
  const parts: GlossPart[] = [];
  let i = 0;
  while (i < text.length) {
    let hit: { alias: string; id: string } | null = null;
    const slice = text.slice(i);
    for (const needle of NEEDLES) {
      if (slice.length < needle.alias.length) continue;
      if (slice.slice(0, needle.alias.length).toLowerCase() !== needle.alias.toLowerCase()) {
        continue;
      }
      if (!boundary(text, i, needle.alias.length)) continue;
      hit = needle;
      break;
    }
    if (!hit) {
      const last = parts[parts.length - 1];
      const ch = text[i] ?? "";
      if (last && !last.id) parts[parts.length - 1] = { text: last.text + ch };
      else parts.push({ text: ch });
      i += 1;
      continue;
    }
    const original = text.slice(i, i + hit.alias.length);
    parts.push({ text: original, id: hit.id });
    i += hit.alias.length;
  }
  return parts;
}
