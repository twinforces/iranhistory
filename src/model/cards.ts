/**
 * What: the rail. Playable cards have voices and buttons.
 * Why: copy is data. The engine does not care who is ranting. Quiet years
 * still get a sentence. Late years live in cards.late.ts so this file cannot
 * be emptied by a late-file rewrite.
 */
import type { Card, Choice, FactionId, IranFace } from "./types.ts";
import { LATE_AFTER_HORMUZ, LATE_CARDS } from "./cards.late.ts";

const ALL: FactionId[] = [
  "irgc",
  "leader",
  "street",
  "my_party",
  "opposing_party",
  "media",
  "cia",
  "saudis",
  "europeans",
  "china",
  "venezuela",
];

const COLD_WAR: FactionId[] = [
  "leader",
  "street",
  "my_party",
  "opposing_party",
  "media",
  "cia",
  "saudis",
  "europeans",
];

const REVOLUTION: FactionId[] = [
  "irgc",
  "leader",
  "street",
  "my_party",
  "opposing_party",
  "media",
  "cia",
  "saudis",
  "europeans",
];

const LETTERHEAD: readonly IranFace[] = ["bazargan", "banisadr", "khamenei"];

function moralEpilogue(story: string): Pick<Choice, "epilogue" | "resultTitle" | "result"> {
  return {
    epilogue: true,
    resultTitle: "We congratulate you on your moral choice.",
    result: `${story}\n\nHowever, Iran continues on.`,
  };
}

const coup1953: Card = {
  id: "coup-1953",
  year: 1953,
  yearLabel: "1953",
  title: "To Coup or Not to Coup",
  titleUs: "To Coup or Not to Coup",
  titleIran: "Danger: Coup!",
  era: "prologue",
  status: "playable",
  branchPoint: true,
  situation:
    "Mossadegh is elected PM, nationalizes the oil. Britain wants it back. CIA and MI6 would like to run a coup.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT", "DK"],
    paragraphs: [
      "LT: Mohammad Mossadegh is prime minister. Oil is nationalized. Britain wants the company back. CIA and MI6 are asking Washington to run a coup that would put Mohammad Reza Pahlavi back on the throne. It has not happened yet.",
      "IT: Washington will sell it as stop-a-Soviet-grab. Tudeh is real and organized. A communist Iran in 1953 is a fear with a file, not a proof. Mossadegh is a nationalist, not a master of the street. The army and the court still have guns.",
      "Context the American player did not pack: the US just finished a world war. Europe is dumping colonies into Washington's lap. This is not a unique sin. It is the week the new empire inherits the old one's oil problem.",
      "DK: nobody has a clean file on the week Washington does not pick up the phone.",
    ],
  },
  artisticLicense: [
    {
      id: "al-satrap",
      title: "Walk away = Soviet satrap",
      body: "We do not know what 1953-without-Ajax becomes. A liberal oil republic that trades happily with Europe is the one ending this card exists to kill. Tudeh plus the mosque is the game's picture: a half-commie theocracy, Stalin in a turban. The Saudis look at that and enter the Soviet sphere. The militia beat is a game rule so you cannot hide in 'we just respected self-determination.' Someone with guns still takes the building. AL, not a prediction.",
    },
    {
      id: "al-london-street",
      title: "Hire the British engineers",
      body: "Lawrence of Arabia, and Venezuela. If you accept British or Chevron engineers, you are run by Britain or Chevron. Pacify London and the street is done with you. The bazaar does not keep a nationalist who sold the oil back. AL, not a prediction.",
    },
    {
      id: "al-moscow-stalin",
      title: "The other embassy",
      body: "A nationalist who cannot keep the company without a patron picks Moscow. Tudeh plus the mosque is the picture: Stalin in a turban. The Saudis enter the Soviet sphere. AL, not a prediction.",
    },
  ],
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "This is still a cable. We think we can rent a mob. We think we have a general. Mohammad Reza, the young Shah, packed a suitcase earlier this year when the fight with Mossadegh got hot. He is not a lion. He is a nervous client. Tudeh is a file. The street will chant about the oil. That is not a government. We are asking you to authorize a coup. We are not telling you it already worked.",
    },
    {
      faction: "leader",
      audience: "iran",
      rant: "Parliament is a room. The army is not. We are the court: the palace, the family, the men who still have rifles. Come to the palace before you make us come to you. The oil deal is not a constitution.",
    },
    {
      faction: "street",
      audience: "iran",
      rant: "The oil is ours. Keep it. London does not get a drop. If you fold we are done with you. The court still has the army. We have the square. Those are not the same thing.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "Sell it as anti-Soviet. Korea is still the other headline. A king photographs. A company does not.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "Do it and we will live with it this week. We will have a sentence ready for a later decade.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "A king looks like a king. That photographs. Nobody is going to explain the Anglo-Iranian Oil Company to a dinner table in Ohio.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "Keep the neighborhood conservative. A left-nationalist in Tehran is a sermon we do not want preached to our own oil workers. Quiet yes.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "London wants the company back. Paris and the rest want the precedent to die. Washington has the bag. This is what 'special relationship' looks like when the empire is tired.",
    },
  ],
  usChoices: [
    {
      id: "us-back-shah",
      label: "Back the Shah (covert)",
      summary: "Cheap. Fast. The king is already in the file. London wants this.",
      kind: "covert",
      historical: true,
      deltas: {
        street: -15,
        leader: 20,
        my_party: 8,
        opposing_party: 4,
        media: 10,
        europeans: 15,
        saudis: 5,
        cia: 12,
        future_irgc_grudge: 30,
      },
      delayedDeltas: { opposing_party: 6, media: -8 },
    },
    {
      id: "us-walk",
      label: "Walk away",
      summary: "Hands off. Let them keep the company.",
      kind: "walk",
      artisticLicense: "al-satrap",
      ending: "satrap_1953",
      deltas: { cia: -20, my_party: -15, europeans: -25, saudis: -45 },
    },
  ],
  iranChoices: [
    {
      id: "ir-nationalize",
      label: "Nationalize and ride the crowd",
      summary: "The oil is ours. The street is with you this week.",
      kind: "hard",
      historical: true,
      flags: { iran_face: "shah" },
      nextCard: "deposed-1953",
      deltas: { street: -16, leader: 18, europeans: 8, cia: 10, future_irgc_grudge: 30 },
    },
    {
      id: "ir-deal-london",
      label: "Hire the British engineers",
      summary: "Give London the oil back. Keep the chair.",
      kind: "deal",
      artisticLicense: "al-london-street",
      ending: "mossadegh_street",
      deltas: { street: -22, leader: 8, europeans: 14, cia: 6 },
    },
    {
      id: "ir-deal-moscow",
      label: "Cut a deal with Moscow",
      summary: "If not London, the other embassy.",
      kind: "deal",
      artisticLicense: "al-moscow-stalin",
      ending: "mossadegh_falls",
      deltas: { street: 8, leader: -10, cia: -16, europeans: -12, saudis: -40 },
    },
  ],
  sources: ["cia-1953", "cfr-timeline", "alj-2025"],
  visibleFactions: COLD_WAR,
  clocksOn: false,
  sloganVolume: 0,
  next: "atoms-1957",
};

const deposed1953: Card = {
  id: "deposed-1953",
  year: 1953,
  yearLabel: "1953",
  title: "You have been deposed",
  era: "prologue",
  status: "playable",
  situationIran:
    "The street filled the square for you. The street was not an army. The court still had one, and so did the men on the foreign radio.\n\nMohammad Mossadegh is arrested. There will be a show trial, then house arrest, then a long memory. You are no longer prime minister. You are Mohammad Reza Pahlavi. The army is yours now. So is the bill.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: In August 1953 Mossadegh is overthrown. He is arrested, tried, and held under house arrest. Mohammad Reza Pahlavi is back on the throne. The oil concession is rebuilt around a consortium. The army answers to the palace again.",
      "IT: The crowd was real. It was not an army. Foreign radio and the court were.",
    ],
  },
  briefings: [
    {
      faction: "cia",
      audience: "iran",
      face: "shah",
      rant: "We put you back. This was cheap. Do not make us explain a king who runs. Take the chair. Leave the suitcase packed only in your head.",
    },
    {
      faction: "europeans",
      audience: "iran",
      face: "shah",
      rant: "The company is coming home. That was the point of the cable. London will live with a king. It will not live with another nationalization speech.",
    },
    {
      faction: "leader",
      audience: "iran",
      face: "shah",
      rant: "The family has the army again. Parliament is a room we can close. You are the Shah. Try not to pack.",
    },
    {
      faction: "street",
      audience: "iran",
      face: "shah",
      rant: "You changed the lock. We filled the square for the other man. We will remember the humiliation longer than we remember his name.",
    },
  ],
  usChoices: [],
  iranChoices: [
    {
      id: "ir-sit-throne",
      label: "Sit the throne",
      summary: "The army is yours. So is the bill.",
      kind: "hard",
      historical: true,
      face: "shah",
      nextCard: "atoms-1957",
      deltas: { leader: 8, cia: 6, europeans: 6, street: -4 },
    },
  ],
  sources: ["cia-1953", "cfr-timeline"],
  visibleFactions: COLD_WAR,
  clocksOn: false,
  sloganVolume: 0,
  next: "atoms-1957",
};
const atoms1957: Card = {
  id: "atoms-1957",
  year: 1957,
  yearLabel: "1957",
  title: "Atoms for Peace",
  era: "shah",
  status: "playable",
  situationUs:
    "Eisenhower sets up a civilian nuclear program in Iran via Atoms for Peace, the American Atomic Age export. The United States supplies the Tehran Research Reactor and the fuel. Iran later signs the Non-Proliferation Treaty. It was never the plan for Iran to enrich uranium. The original bargain is: we provide the fuel, they do not sprint to a national enrichment plant.\n\nTehran's cities are starting to boom. The hinterlands are not. The king is on the throne. The fuel is still ours to send, or not.",
  situationIranShah:
    "You are Mohammad Reza Pahlavi. Mohammad Mossadegh is under house arrest. The army is yours. The oil is coming back through a consortium.\n\nEisenhower is selling Atoms for Peace, the American Atomic Age export: a civilian nuclear program, a Tehran Research Reactor, and the fuel that goes in it. It was never the plan for Iran to enrich uranium. Washington's bargain is they provide the fuel. A national enrichment plant is not in the offer.\n\nYou kept the throne. You did not keep the country quiet. The hinterlands still do not see the boom.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: Eisenhower sets up a civilian nuclear program in Iran via Atoms for Peace, the American Atomic Age export. The United States supplies the Tehran Research Reactor and the fuel. Iran later signs the Non-Proliferation Treaty. It was never the plan for Iran to enrich uranium. The original bargain is: we provide the fuel, they do not sprint to a national enrichment plant.",
      "IT: Tehran's cities boom. The hinterlands do not. Client kings get old and frightened. Viziers start running things.",
    ],
  },
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "The king is seated. Atoms for Peace is the respectable cover. Keep the fuel ours. A research reactor photographs. A national enrichment plant does not, until it does.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "Civilian atoms are the Atomic Age. Korea is receding. A reactor in Tehran is a ribbon-cutting, not a crisis, as long as we still send the fuel.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "If the king looks modern we will live with it. If the fuel becomes theirs we will have a hearing. Not this year.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "Atoms for Peace is a speech. Speeches photograph. Enrichment is a process story. Process dies in an hour.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "London has the oil settlement. Let Washington have the atoms. We would like the fuel cycle to remain an American invoice.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "A conservative king with a civilian reactor is a sermon we can live with. A nationalist with a plant of his own is not.",
    },
    {
      faction: "cia",
      audience: "iran",
      face: "shah",
      rant: "We put you back. Atoms for Peace is the respectable cover. Take the reactor. Take the fuel. Do not start a plant that makes us explain you twice.",
    },
    {
      faction: "europeans",
      audience: "iran",
      face: "shah",
      rant: "The company is home. Let Washington have the atoms. A king with a civilian reactor is a ribbon-cutting. A king with a national plant is a later hearing.",
    },
    {
      faction: "leader",
      audience: "iran",
      face: "shah",
      rant: "The palace has the army. The cities are starting to boom. The hinterlands are not. Take the American fuel. Look modern. Do not pick a fight with the men who ran the cable.",
    },
    {
      faction: "street",
      audience: "iran",
      face: "shah",
      rant: "You changed the lock. Groceries do not care about a reactor. If this is another foreign leash, we already know the ending. We are not an army. We are the memory.",
    },
  ],
  usChoices: [
    {
      id: "us-keep-fuel",
      label: "Keep sending the fuel",
      summary: "The reactor is theirs. The fuel stays ours.",
      kind: "deal",
      historical: true,
      deltas: { cia: 8, europeans: 6, leader: 6, street: -4, media: 4 },
    },
    {
      id: "us-let-enrich",
      label: "Let them run the fuel cycle",
      summary: "A plant of their own. The leash comes off.",
      kind: "hard",
      deltas: { cia: -12, europeans: -8, leader: 4, street: 6 },
    },
  ],
  iranChoices: [
    {
      id: "ir-shah-fuel",
      label: "Take the American fuel",
      summary: "Look modern. Let them keep the invoice.",
      kind: "deal",
      historical: true,
      face: "shah",
      deltas: { cia: 8, europeans: 6, leader: 6, street: -6 },
    },
    {
      id: "ir-shah-plant",
      label: "Talk about a national plant",
      summary: "If they can have atoms, we can have a plant.",
      kind: "hard",
      face: "shah",
      deltas: { street: 8, cia: -12, europeans: -8, leader: -6 },
    },
  ],
  sources: ["eisenhower-afp", "cfr-timeline"],
  visibleFactions: COLD_WAR,
  clocksOn: false,
  sloganVolume: 0,
  next: "white-revolution-1963",
};

const whiteRevolution1963: Card = {
  id: "white-revolution-1963",
  year: 1963,
  yearLabel: "1963",
  title: "White Revolution",
  era: "shah",
  status: "playable",
  branchPoint: true,
  situationUs:
    "You are pressing the Shah to modernize. Land reform, a literacy corps, the vote for women. The point is to undercut the left without another coup. A cleric in Qom is starting to shout.\n\nThe reactor is theirs. The fuel is still an American invoice. Tehran's cities are starting to boom. The hinterlands are not.",
  situationIranShah:
    "You are Mohammad Reza Pahlavi. Kennedy wants a White Revolution: take land from the landlords, give women the vote, send a literacy corps into the villages. The bazaar and the mosque will hate it. Tehran's women will not.\n\nA relatively obscure ayatollah in Qom, Ruhollah Khomeini, is finding his voice.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: In 1961-62 Kennedy's Iran Task Force treats Ali Amini's reform cabinet as maybe the last chance to stop a slide. The Shah launches the White Revolution in January 1963: land reform, literacy and health corps, profit-sharing, women's suffrage. A 15 June 1963 uprising around Khomeini is crushed. He is arrested, later exiled.",
      "IT: Washington sells reform as anti-communist insurance. It also grows an urban liberal and feminist constituency that has no guns. The mosque and the bazaar lose land, status, and the chador-as-default. That is the constituency Khomeini will speak for.",
      "The years after this card still include Johnson's 1964 Status of Forces agreement, which Khomeini names, and the exile to Turkey then Najaf. Those are on the rail whether you press or not. The liberals meter is the thing you are actually choosing.",
    ],
  },
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "Press him. Land and the vote photograph as modernity. Tanks photograph as a client. Your Iran Task Force already told you the military baksheesh is the wrong lever. Amini was the last good chance. The Shah will take the credit. Let him.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "Reform is the Alliance for Progress in a different hat. If the king looks like he is giving peasants land, we can live with the king.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "If you lean on a king we will call it meddling. If you send him tanks we will call it a blank check. Pick which hearing you want.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "A woman at a ballot box photographs. A landlord's title deed does not. Khomeini is not a name yet. Do not put him in the caption.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "London has the oil settlement. Let Washington have the sermon. We would like the king to look modern enough that nobody nationalizes anything again.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "Women voting next door is a sermon we do not want preached in our own sitting rooms. A conservative king with land reform we can live with. A liberal one we cannot.",
    },
    {
      faction: "leader",
      audience: "iran",
      face: "shah",
      rant: "If there is to be a revolution in this country, you will be the one to lead it. Take the land. Take the credit. The army is still ours. The mosque will shout. Shouting is not a division.",
    },
    {
      faction: "street",
      audience: "iran",
      face: "shah",
      rant: "The village wants a deed. The bazaar wants the landlords left alone. Tehran's women want the vote. The mosque wants the chador left as the default. You do not get all four. Khomeini is already writing the sermon that says you picked the foreign one.",
    },
    {
      faction: "cia",
      audience: "iran",
      face: "shah",
      rant: "Kennedy is not asking. He is telling. Reform or we start looking at you the way we looked at the last man in this chair. Take the land. Give them the vote. Look like a modern king.",
    },
  ],
  usChoices: [
    {
      id: "us-press-reform",
      label: "Press him to reform",
      summary: "Land, literacy, the vote. Undercut the left without another coup.",
      kind: "deal",
      historical: true,
      deltas: { cia: 8, europeans: 6, saudis: -6, media: 8, leader: 4, street: -8, liberals: 24 },
    },
    {
      id: "us-send-tanks",
      label: "Send him tanks instead",
      summary: "The king wants hardware. Hardware is quiet. Reform is not.",
      kind: "hard",
      deltas: { cia: -8, saudis: 8, leader: 10, street: 4, liberals: -4, my_party: 4 },
    },
  ],
  iranChoices: [
    {
      id: "ir-white-rev",
      label: "Launch the White Revolution",
      summary: "Land, literacy, the vote. Take the credit before someone else does.",
      kind: "hard",
      historical: true,
      face: "shah",
      deltas: { leader: 8, cia: 8, europeans: 6, street: -10, saudis: -4, liberals: 26 },
    },
    {
      id: "ir-keep-quiet",
      label: "Keep the landlords and the clergy quiet",
      summary: "The mosque still has the village. Do not pick that fight.",
      kind: "soft",
      face: "shah",
      deltas: { street: 8, leader: -6, cia: -10, liberals: -6, saudis: 6 },
    },
  ],
  sources: ["white-rev-britannica", "frus-kennedy-iran", "cfr-timeline"],
  visibleFactions: COLD_WAR,
  clocksOn: false,
  sloganVolume: 0,
  next: "sofa-1964",
};
const weapons1972: Card = {
  id: "weapons-1972",
  year: 1972,
  yearLabel: "1972",
  title: "Twin pillars, blank check",
  era: "shah",
  status: "playable",
  branchPoint: true,
  situationUs:
    "Iran muddles along. It easily shakes off Soviet influence. Iran buys weapons from us. Tehran grows prosperous and cosmopolitan. Rural Iran does not.\n\nYou are in Tehran. Britain left east of Suez in 1971. The Nixon Doctrine says no more Vietnams: Asian allies defend themselves. He has the oil. Twin pillars with the Saudis. He wants a blank check: any conventional American weapon, any quantity. The oil boom will pay the invoice. Khomeini is in Najaf, writing. The Family Protection Law has given urban women divorce rights and a higher marriage age. The hinterlands have not read it.",
  situationIranShah:
    "Iran muddles along. You shook off Soviet influence. You buy American weapons. Tehran is prosperous and cosmopolitan. Rural Iran is not.\n\nNixon is in town. He will sell you anything that is not a bomb. SAVAK is yours. The Family Protection Law is on the books. The cleric you exiled is still writing from Najaf.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: Britain completed the east-of-Suez withdrawal in 1971. The Nixon Doctrine said no more American infantries for Asian wars. The Shah had oil money. Twin pillars: Iran and Saudi Arabia as Gulf policemen. May 1972, Nixon and Kissinger in Tehran. The Shah may buy any US conventional weapons system, any quantity. Arms sales jump from the low hundreds of millions toward the billions after the oil shock. Family Protection Law 1967, expanded 1975: divorce through courts, marriage age up, polygamy squeezed.",
      "IT: Tehran's cafes, cinemas, universities, and unveiled women are real. So is the hinterland that never saw the boom. Growing liberals looks like anti-communist hygiene. It is also a constituency with no barracks. Johnson's Status of Forces fight and Khomeini's exile already happened on the way here.",
      "The next stop is still 1979. You are choosing how fat the urban liberal bar is when the cleric comes back.",
    ],
  },
  artisticLicense: [
    {
      id: "al-hinterland",
      title: "Spend the oil on the villages",
      body: "Historically the catalog won. A king who buys clinics instead of F-14s might keep the hinterland off the square. If it works, that is the successful fork. Khomeini loses the village. The army likes him less. AL on whether that holds 1979.",
    },
  ],
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "Britain is gone east of Suez. We are not putting a division on a beach. Give him the catalog. Twin pillars. Him and the Sauds. He has the oil. The hinterland is his problem until it is ours.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "No more Vietnams. He has the oil. We have the factories. A policeman of the Gulf photographs as burden-sharing. Do not put a division on a beach.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "A blank check is a later hearing. A sermon about clinics is a later famine of spare parts. Pick which sentence you want.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "An F-14 on a tarmac photographs. A clinic in a village does not. Process dies. Hardware does not.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "Sell him the catalog. We will sell him the rest. Keep the oil moving.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "He is the other pillar. We will not go first. Arm him. Arm us. Keep the neighborhood conservative enough that our own sitting rooms stay quiet.",
    },
    {
      faction: "leader",
      audience: "iran",
      face: "shah",
      rant: "Buy the catalog. You are the policeman of the Gulf. The villages can wait. SAVAK can keep the square quiet. The cleric in Najaf is a letter, not an army.",
    },
    {
      faction: "street",
      audience: "iran",
      face: "shah",
      rant: "Tehran has cinemas and universities and women who can ask a court for a divorce. We are not all in Tehran. Groceries in the hinterland do not care about an F-14. The mosque does. Khomeini's mail still arrives.",
    },
    {
      faction: "cia",
      audience: "iran",
      face: "shah",
      rant: "Take the catalog. Look like a partner, not a client. Do not spend the oil on clinics if it means you cannot hold the Strait. The hinterland is a later problem.",
    },
  ],
  usChoices: [
    {
      id: "us-blank-check",
      label: "Sign the blank check",
      summary: "Any conventional weapon, any quantity. He has the oil.",
      kind: "deal",
      historical: true,
      deltas: { cia: 10, my_party: 8, saudis: 8, europeans: 6, leader: 12, street: -8, liberals: 16, hard_currency: 12 },
    },
    {
      id: "us-hinterland-first",
      label: "Make him spend on the hinterland first",
      summary: "Clinics and roads before F-14s. He will hate the sermon.",
      kind: "soft",
      deltas: { cia: -8, my_party: -6, saudis: -6, leader: -10, street: 10, liberals: 6, opposing_party: 6 },
    },
  ],
  iranChoices: [
    {
      id: "ir-buy-catalog",
      label: "Buy the American catalog",
      summary: "Boom-booms. The oil pays. Tehran already looks like a capital.",
      kind: "hard",
      historical: true,
      face: "shah",
      deltas: { cia: 10, leader: 10, saudis: 6, europeans: 6, street: -10, liberals: 16, hard_currency: 10 },
    },
    {
      id: "ir-spend-villages",
      label: "Spend the oil on the villages",
      summary: "Roads, clinics, the hinterland. The catalog can wait.",
      kind: "deal",
      face: "shah",
      artisticLicense: "al-hinterland",
      flags: { hinterland_spent: true },
      deltas: { street: 16, leader: -12, cia: -10, liberals: 4, saudis: -6 },
    },
  ],
  sources: ["nixon-twin-pillars", "family-protection", "cfr-timeline"],
  visibleFactions: COLD_WAR,
  clocksOn: false,
  sloganVolume: 0,
  next: "pipeline-1975",
};

const revolution1979: Card = {
  id: "revolution-1979",
  year: 1979,
  yearLabel: "1978–1979",
  title: "The Shah's cancer, the square",
  era: "revolution",
  status: "playable",
  branchPoint: true,
  situationUs:
    "The Shah has lymphoma. He wants in for treatment. The street in Tehran is already past a king. Khomeini is in France, waiting for a plane.\n\nThe urban liberals and the feminists you watched grow are in the square with the mosque. They think they are making a revolution they will get to keep. Your human rights letterhead is still in the drawer.",
  situationIranShah:
    "The street is past you. You have cancer. Khomeini is in France. The women you enfranchised are in the square with the men who want the mosque in charge.\n\nThe army is asking whether you will shoot. SAVAK cannot vote this down. A plane is an option. It has always been an option.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: The Shah has lymphoma (histiocytic lymphoma diagnosed in New York). He flees January 1979. Khomeini returns from France. Carter later lets the Shah in for treatment; that is the spark the embassy occupiers use. Students seize the US embassy 4 November 1979. 52 Americans, 444 days.",
      "IT: The liberals and feminists marched against the Shah because he was the tyrant they had. They were not a government-in-waiting. Khomeini had the mosque, the cassette, and the claim on the square. Growing them was the White Revolution working. Keeping them was never in the bargain.",
    ],
  },
  artisticLicense: [
    {
      id: "al-keep-shah-out",
      title: "Keeping him out",
      body: "It hurts. The hospital was the decent thing. You did not do the decent thing. The soul is not a meter. Historically the seizure follows the admission. Keeping him out does not un-grow Khomeini, and it does not give the feminists a barracks. The embassy still happens. AL on the spark, not a liberal-fantasy off-ramp.",
    },
    {
      id: "al-hinterland-holds",
      title: "The hinterland holds",
      body: "The villages ate the oil. They did not come to the square. Khomeini stays in Paris. The army is cooler than it was. This is the successful fork. A king who held 1979 has no later rail in this slice because history did not take it. AL.",
    },
  ],
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "The king is dying. The file on Khomeini is thinner than it should be. Humanitarian entry looks decent. It is also a bomb. The liberals in the square are not a government. Do not write a cable that pretends they are.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "Human rights was the campaign. An ally with cancer is the week. Let him in and own the riot. Keep him out and own the funeral of a friend. The clip will decide which one we meant.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "If he lets the king in we will call it a gift to the mob. If he keeps him out we will call it abandoning an ally. We have both sentences ready.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "A dying king in New York photographs. A cleric in France does not, until he does. Process dies. Hostages do not.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "We would like the oil to move. A hospital bed in New York is your problem. A cleric on a plane is everyone's.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "A king falling next door is a sermon. Do not put him in New York if it lights the embassy. Do not look weak if it lights us. We will not go first.",
    },
    {
      faction: "leader",
      audience: "iran",
      face: "shah",
      rant: "The army still answers, until it does not. Shoot and you are the butcher. Leave and you packed the suitcase again. The cleric in France is not offering a coalition. He is offering a replacement.",
    },
    {
      faction: "street",
      audience: "iran",
      face: "shah",
      rant: "The village, the bazaar, the mosque, the university, the unveiled women: they are all in the square and they do not want the same morning after. You cannot shoot all of them. You can leave.",
    },
    {
      faction: "cia",
      audience: "iran",
      face: "shah",
      rant: "We put you back in 1953. We cannot occupy Tehran in 1979. If you shoot, we will have a clip. If you run, we will have a hospital. Pick which cable you want us to write.",
    },
  ],
  usChoices: [
    {
      id: "us-admit-shah",
      label: "Let him in for treatment",
      summary: "An ally is dying. Humanitarian entry looks decent.",
      kind: "deal",
      historical: true,
      flags: { shah_admitted: true },
      deltas: { my_party: -6, opposing_party: 8, media: 10, cia: -4, saudis: -6, europeans: -4 },
      nextCard: "veil-1979",
    },
    {
      id: "us-keep-shah-out",
      label: "Keep him out",
      summary: "The street is past a king. Do not light the embassy for a hospital.",
      kind: "walk",
      artisticLicense: "al-keep-shah-out",
      flags: { shah_admitted: false },
      deltas: { my_party: 4, opposing_party: -4, media: -6, cia: 4, saudis: 4, europeans: 4 },
      nextCard: "veil-1979",
    },
  ],
  iranChoices: [
    {
      id: "ir-fire-crowd",
      label: "Fire on the crowd",
      summary: "The army still answers. For this week.",
      kind: "hard",
      face: "shah",
      unlessFlag: "hinterland_spent",
      flags: { iran_face: "bazargan" },
      deltas: { street: -16, leader: -8, cia: -6, liberals: -8, media: 12 },
      nextCard: "veil-1979",
    },
    {
      id: "ir-shah-leave",
      label: "Leave",
      summary: "The suitcase again. The plane is real.",
      kind: "walk",
      historical: true,
      face: "shah",
      flags: { iran_face: "bazargan" },
      deltas: { street: 8, leader: -20, cia: -10, liberals: 4 },
      nextCard: "veil-1979",
    },
    {
      id: "ir-shah-hold",
      label: "Stay. The villages are quiet.",
      summary: "The hinterland ate the oil. The square is thinner.",
      kind: "hard",
      face: "shah",
      requiresFlag: "hinterland_spent",
      artisticLicense: "al-hinterland-holds",
      ending: "shah_holds",
      deltas: { street: 10, leader: -8, cia: -6, liberals: -4 },
    },
  ],
  sources: ["nyt-shah-cancer", "cfr-timeline", "quds-day"],
  visibleFactions: COLD_WAR,
  clocksOn: false,
  sloganVolume: 1,
  next: "veil-1979",
};
const veil1979: Card = {
  id: "veil-1979",
  year: 1979,
  yearLabel: "March 1979",
  title: "The Imam repeals Family Protection",
  era: "revolution",
  status: "playable",
  branchPoint: true,
  situationUs:
    "The Shah is gone. Khomeini is back. Mehdi Bazargan is the smiling prime minister. On 8 March the women who marched against the king are marching again.\n\nKhomeini has told the ministries the scarf is not optional. The Family Protection Law is already being treated as void. The urban liberals you watched grow are about to find out who won. A parallel army is being stood up to protect the revolution from the regular army, the leftists, and the smiling face.",
  situationIran:
    "You are Mehdi Bazargan. You are the smiling face of a revolution whose guns are not yours. The feminists and the left marched to get the Shah out. They were promised they would keep the Family Protection Law, the vote, the universities.\n\nKhomeini is repealing it. The scarf is becoming a uniform. A parallel army is being stood up to protect the revolution from the regular army, the leftists, and you.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: 8 March 1979, International Women's Day, tens of thousands of Iranian women march against compulsory hijab. The Family Protection Law is treated as void. Bazargan is prime minister. The IRGC is being stood up.",
      "IT: The liberals marched against the Shah. They were not a government. The Imam has the mosque and the claim on the square. Growing them was the White Revolution working. Keeping them was never in the bargain.",
    ],
  },
  artisticLicense: [
    {
      id: "al-keep-fpl",
      title: "Keeping Family Protection",
      body: "Historically the Imam voids it. A smiling face who tries to keep the law is deposed. He can live. A replacement sits the stamp. The embassy is already the next exam. Stamp it.",
    },
  ],
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "The king is gone. The smiling face is not a government. The women in the street are not a barracks. Do not write a cable that pretends they are.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "Human rights was the campaign. A scarf law is the week. Issue a statement. Do not occupy Tehran.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "If he sermons the mullahs we will call it meddling. If he stays out we will call it abandoning the women. We have both sentences.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "Unveiled women marching photographs. A parallel army does not, until it does.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "A statement from Brussels. The oil should move. This is a US-Iran problem.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "A cleric winning next door is the nightmare. Do not look weak. We will not go first.",
    },
    {
      faction: "irgc",
      audience: "iran",
      face: "bazargan",
      rant: "The scarf is the uniform. The Family Protection Law is the Shah's leftover. The Imam's line is the line. A smiling face who talks back is a face we replace.",
    },
    {
      faction: "leader",
      audience: "iran",
      face: "bazargan",
      rant: "I have returned. The ministries will listen. The law is void. You are the letterhead. Stamp what I have already decided.",
    },
    {
      faction: "street",
      audience: "iran",
      face: "bazargan",
      rant: "Some of us marched for the vote. Some of us marched for the mosque. You do not have a barracks that will take our side against the Imam.",
    },
  ],
  usChoices: [
    {
      id: "us-statement-women",
      label: "Issue a statement",
      summary: "Human rights letterhead. No barracks behind it.",
      kind: "soft",
      deltas: { media: 8, my_party: 4, opposing_party: 4, saudis: -4, liberals: 4 },
      nextCard: "hostages-1979",
    },
    {
      id: "us-stay-out",
      label: "Stay out",
      summary: "This is their square. Do not write a sermon.",
      kind: "walk",
      historical: true,
      deltas: { media: -4, saudis: 4, europeans: 2 },
      nextCard: "hostages-1979",
    },
  ],
  iranChoices: [
    {
      id: "ir-keep-fpl",
      label: "Keep the Family Protection Law",
      summary: "The women marched with you. Do not hand the Imam the statute.",
      kind: "soft",
      face: "bazargan",
      artisticLicense: "al-keep-fpl",
      flags: { letterhead_generic: true },
      deltas: { liberals: 8, irgc: -8, leader: -8, street: 4, europeans: 4 },
      nextCard: "hostages-1979",
      ...moralEpilogue(
        "You kept the statute. The Imam did not. They thank you for the principle. They do not thank you with a barracks. You retire. You write the book. You emigrate to Los Angeles. You open a convenience store with the proceeds. Someone else stamps the ministries. The embassy is still the next exam.",
      ),
    },
    {
      id: "ir-repeal-fpl",
      label: "Let the Imam repeal it",
      summary: "The guns are not yours. Do not pretend the statute is.",
      kind: "walk",
      historical: true,
      face: "bazargan",
      deltas: { irgc: 10, leader: 8, liberals: -14, street: -4 },
      nextCard: "hostages-1979",
    },
  ],
  sources: ["cfr-timeline", "family-protection"],
  visibleFactions: REVOLUTION,
  clocksOn: false,
  sloganVolume: 2,
  next: "hostages-1979",
};

const hostages1979: Card = {
  id: "hostages-1979",
  year: 1979,
  yearLabel: "November 1979",
  title: "Students occupy the US embassy",
  era: "revolution",
  status: "playable",
  branchPoint: true,
  situationUs:
    "Students have occupied the US embassy in Tehran. Americans are inside. The nightly open has a flag and a blindfold. A raid is in the drawer. A channel through Algeria is also in the drawer.\n\nThe Shah may already be in a New York hospital. The clip does not care about the legal memo.",
  situationIran:
    "Students have taken the nest of spies. The Imam has not sent them home. You are the smiling face. Washington is on the phone. The guns in the courtyard are not yours.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: 4 November 1979, students seize the US embassy. 52 Americans will be held 444 days. Bazargan resigns 6 November. A raid is in the drawer. Talking is in the drawer.",
      "IT: The smiling face asked. The Imam did not send them home. The raid photographs as strength until it does not. Talking photographs as patience until the other paper has a clip.",
    ],
  },
  artisticLicense: [
    {
      id: "al-skip-raid",
      title: "No raid",
      body: "Historically Carter authorizes Eagle Claw. A Washington that keeps talking still has a clip. The hostages still walk the morning of the oath. Stamp it.",
    },
    {
      id: "al-bazargan-stays",
      title: "The smiling face stays",
      body: "Historically Bazargan resigns two days after the seizure. A prime minister who lets the students hold the embassy still does not have the guns. The next letterhead inherits the same exam. Stamp it.",
    },
  ],
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "The raid is in the drawer. Helicopters, a desert strip, a night. Talking is also in the drawer. Neither one has brought them home yet. We are asking you to pick which film develops.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "Human rights was the campaign. This is the exam. A raid photographs as strength until it does not. Talking photographs as patience until the other paper has a clip.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "If he raids we will call it reckless. If he waits we will call it a gift to the mullahs. We have both sentences. We will use the one the film develops.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "A flag on an embassy photographs. Nightline can open on it every night. A channel through Algeria is a process story. Process dies. Hostages do not.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "We would like our own people out. We would like the oil to move. A statement from Brussels. This is a US-Iran problem that we would like to remain a US-Iran problem.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "A cleric holding Americans is a sermon. Do not look weak. Do not start a war that lights us. We will not go first.",
    },
    {
      faction: "irgc",
      audience: "iran",
      face: "bazargan",
      rant: "The nest of spies. The students are doing the revolution's work. The smiling face wants a cable. We want the files and the Shah. If you send them home you are not the revolution.",
    },
    {
      faction: "leader",
      audience: "iran",
      face: "bazargan",
      rant: "The Imam's line is the line. The embassy was a nest of spies. The scarf is already a uniform. This is the same week. A prime minister who talks to Washington about releasing spies is a face we can replace.",
    },
    {
      faction: "street",
      audience: "iran",
      face: "bazargan",
      rant: "Some of us wanted the Shah gone, not a prison in the embassy. Some of us wanted both. You do not have a barracks that will take your side against the Imam.",
    },
  ],
  usChoices: [
    {
      id: "us-eagle-claw",
      label: "Authorize a rescue",
      summary: "Helicopters, a desert strip, a night. The raid is in the drawer.",
      kind: "hard",
      historical: true,
      flags: { eagle_claw: true },
      deltas: { my_party: -8, opposing_party: 10, media: 14, cia: -6, europeans: -4, saudis: 4 },
      nextCard: "eagle-claw-1980",
    },
    {
      id: "us-keep-talking",
      label: "Keep talking",
      summary: "Freeze the assets. Open a channel. Leave the helicopters in the drawer.",
      kind: "deal",
      artisticLicense: "al-skip-raid",
      flags: { eagle_claw: false },
      deltas: { my_party: -10, opposing_party: 8, media: -6, cia: 4, europeans: 4, saudis: -6 },
      nextCard: "you-him-fight-1980",
    },
  ],
  iranChoices: [
    {
      id: "ir-demand-leave",
      label: "Demand they leave",
      summary: "The embassy is not a court. Send the students home.",
      kind: "soft",
      historical: true,
      face: "bazargan",
      flags: { iran_face: "banisadr" },
      nextCard: "resigned-1979",
      deltas: { leader: -14, irgc: -10, europeans: 8, cia: 6, liberals: 4, street: -6 },
    },
    {
      id: "ir-let-students",
      label: "Let the students hold it",
      summary: "The guns are not yours. Do not pretend the cable is.",
      kind: "hard",
      face: "bazargan",
      artisticLicense: "al-bazargan-stays",
      flags: { iran_face: "banisadr" },
      nextCard: "resigned-1979",
      deltas: { leader: 10, irgc: 12, street: 6, europeans: -8, cia: -10, liberals: -6 },
    },
  ],
  sources: ["nara-hostages", "frus-eagle-claw", "cfr-timeline", "nyt-shah-cancer"],
  visibleFactions: REVOLUTION,
  clocksOn: false,
  sloganVolume: 2,
  next: "you-him-fight-1980",
};
const resigned1979: Card = {
  id: "resigned-1979",
  year: 1979,
  yearLabel: "November 1979",
  title: "Bazargan resigns",
  era: "revolution",
  status: "playable",
  situationIran:
    "You told the students to leave. The Imam did not. Mehdi Bazargan resigns on 6 November 1979, two days after the seizure. The hostage file belongs to the Imam and to the men standing up a parallel army.\n\nYou are Abolhassan Banisadr. You are the elected letterhead of a revolution whose guns are not yours. The embassy is still a prison. Saddam is not here yet. The Guards already are.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: Bazargan resigns 6 November 1979. Banisadr is elected president in January 1980. The embassy occupation continues. The IRGC is already standing up.",
      "IT: The smiling face asked. The Imam did not send them home. The next letterhead inherits the same problem: the guns are still not his.",
    ],
  },
  artisticLicense: [
    {
      id: "al-refuse-letterhead",
      title: "Refusing the letterhead",
      body: "Historically Banisadr sits. A face who will not take the stamp still does not get the guns. Iran continues. Someone else sits. Stamp it.",
    },
  ],
  briefings: [
    {
      faction: "irgc",
      audience: "iran",
      face: "banisadr",
      rant: "The students did the revolution's work. Bazargan could not live with that. Can you. We are being stood up because the regular army cannot be trusted and you cannot be trusted. The Imam's line is the line.",
    },
    {
      faction: "leader",
      audience: "iran",
      face: "banisadr",
      rant: "You are the elected face. You are not the jurist. The nest of spies stays occupied. A president who talks to Washington about releasing spies is a face we can replace.",
    },
    {
      faction: "street",
      audience: "iran",
      face: "banisadr",
      rant: "Bazargan folded. You have a vote. You do not have a barracks. The boys will still be drafted if Saddam comes. Groceries do not care whose name is on the letterhead.",
    },
  ],
  usChoices: [],
  iranChoices: [
    {
      id: "ir-sit-presidency",
      label: "Sit the presidency",
      summary: "The vote is yours. The guns are not. The bill is.",
      kind: "hard",
      historical: true,
      face: "banisadr",
      nextCard: "you-him-fight-1980",
      deltas: { leader: 4, irgc: 4, street: -2 },
    },
    {
      id: "ir-refuse-letterhead",
      label: "Refuse the letterhead",
      summary: "Do not sit a chair the Guards already own.",
      kind: "hard",
      face: "banisadr",
      artisticLicense: "al-refuse-letterhead",
      nextCard: "you-him-fight-1980",
      flags: { iran_face: "banisadr", letterhead_generic: true },
      deltas: { leader: -4, irgc: 6, street: 2 },
      ...moralEpilogue(
        "You retire. You write the book. You emigrate to Los Angeles. You open a convenience store with the proceeds. Night shift. Lottery tickets. The revolution is a chapter. The register is the job. Someone else sits the stamp.",
      ),
    },
  ],
  sources: ["nara-hostages", "cfr-timeline"],
  visibleFactions: REVOLUTION,
  clocksOn: false,
  sloganVolume: 2,
  next: "you-him-fight-1980",
};

const eagleClaw1980: Card = {
  id: "eagle-claw-1980",
  year: 1980,
  yearLabel: "April 1980",
  title: "Eagle Claw crashes at Desert One",
  era: "revolution",
  status: "playable",
  situationUs:
    "You authorized the raid. Eight RH-53D helicopters off the USS Nimitz. A desert strip code-named Desert One, near Tabas.\n\nA sandstorm. Hydraulic failures. A helicopter hits a C-130. Eight Americans are dead. The wreckage is still in Iran. Cyrus Vance resigns as Secretary of State. The hostages are still inside. Saddam is watching.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: Operation Eagle Claw, 24-25 April 1980. Helicopters launch from the USS Nimitz toward Desert One near Tabas. A haboob, mechanical aborts, then a collision on the ground. Eight US dead. Classified documents and wreckage are left behind. Vance resigns. The 52 remaining hostages are scattered to new sites. They are not freed.",
      "IT: The raid photographed as strength until the wreckage photographed as the campaign. A superpower that cannot land a helicopter in a desert is a sermon. Saddam is taking notes.",
    ],
  },
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "The raid is wreckage. The hostages are scattered. We do not have a second night this week. The clip is already developing.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "Human rights was the campaign. This is the clip. Vance quit. The other paper has the film.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "Reckless. We had that sentence ready. We will use it until November.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "Nightline can open on a burned helicopter now. Process is dead. Hostages are not.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "We would like our own people out. We would like the oil to move. This is still a US-Iran problem.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "Do not look weaker. Do not start a war that lights us. There is a man in Baghdad who wants to take care of the Shia problem.",
    },
  ],
  usChoices: [
    {
      id: "us-see-wreckage",
      label: "The hostages are still inside",
      summary: "Eight dead. Vance resigns. The clip is the campaign.",
      kind: "walk",
      historical: true,
      deltas: { opposing_party: 4, media: 6, my_party: -4, cia: -4 },
      nextCard: "you-him-fight-1980",
    },
  ],
  iranChoices: [],
  sources: ["frus-eagle-claw", "nara-hostages"],
  visibleFactions: REVOLUTION,
  clocksOn: false,
  sloganVolume: 2,
  next: "you-him-fight-1980",
};

const youHimFight1980: Card = {
  id: "you-him-fight-1980",
  year: 1980,
  yearLabel: "Summer 1980",
  title: "Let's you and him fight",
  era: "war",
  status: "playable",
  situationUs:
    "The Saudis would like Saddam to take care of the Shia problem. Europe would like neither side to win. A revolutionary republic next door is the nightmare. Baghdad is asking who will stop him.\n\nThe hostages are still inside. A raid may already be wreckage in the sand. Officially you are still the human-rights president. Officially you are neutral.",
  situationIran:
    "The neighborhood is lining up. The Saudis want Saddam to smash the Shia republic. Washington and Europe will not stop him. They would like you and him to fight.\n\nYou are the letterhead. The guns are not yours. The invasion is not a question of if.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT", "AL"],
    paragraphs: [
      "LT: Gulf monarchies, led by Saudi Arabia, encourage Saddam and later write the checks. Carter's official line is neutrality because of the hostages. Europe will sell to both. Saddam invades on 22 September 1980.",
      "IT: Let's you and him fight. A Shia republic that chants Death to America is a sermon Riyadh does not want preached to its own oil workers. Washington's incentive is two enemies bleeding each other. A 1992 British investigation put the European objective in one line: sustain the war so neither side wins.",
      "Carter does not green-light the way a later ambassador will be accused of green-lighting Kuwait. He also does not stop it. Staying out of the way is the file.",
    ],
  },
  artisticLicense: [
    {
      id: "al-warn-saddam",
      title: "Tell Saddam no",
      body: "Historically Carter does not stop the invasion. A warning from a president who cannot land a helicopter does not un-write the checks from Riyadh. Saddam still comes. Stamp it.",
    },
  ],
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "Let them bleed. Do not put your fingerprints on an invasion while Americans are in a basement. The Saudis will write the check.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "The hostages are the exam. Saddam is a later file. Do not start a war that photographs as a rescue.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "If he green-lights a butcher we will run that clip. If he stays out we will call it weakness. We have both sentences.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "Hostages open the show. A quiet nod to Baghdad is a process story. Process dies.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "Sustain the war so neither side wins. Sell to both if you can. We would like the oil to move.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "Write the check to Baghdad. Do not put Americans on the front. A cleric winning is the nightmare. Take care of the Shia problem. We will not go first.",
    },
    {
      faction: "irgc",
      audience: "iran",
      face: "banisadr",
      rant: "Saddam is coming. The Shah's leftover cannot be trusted. Give us the war when it starts. The Imam's line is the line.",
    },
    {
      faction: "leader",
      audience: "iran",
      face: "banisadr",
      rant: "The war will be a blessing. It forges the parallel army. You stamp. We bury.",
    },
    {
      faction: "street",
      audience: "iran",
      face: "banisadr",
      rant: "The boys will be drafted. Groceries do not care whose barracks has the war. The Saudis want us dead. That is not a rumor.",
    },
  ],
  usChoices: [
    {
      id: "us-let-saddam",
      label: "Stay out of the way",
      summary: "Let Saddam and the Saudis handle the Shia problem.",
      kind: "walk",
      historical: true,
      deltas: { saudis: 8, europeans: 4, cia: 4, my_party: -2 },
      nextCard: "iran-iraq-1980",
    },
    {
      id: "us-warn-saddam",
      label: "Tell Saddam no",
      summary: "A human-rights president does not green-light an invasion.",
      kind: "soft",
      artisticLicense: "al-warn-saddam",
      deltas: { saudis: -10, europeans: -4, media: 6, my_party: 4, cia: -6 },
      nextCard: "iran-iraq-1980",
    },
  ],
  iranChoices: [
    {
      id: "ir-watch-lineup",
      label: "Watch the neighborhood line up",
      summary: "The Saudis want Saddam to smash the republic. You cannot stop him.",
      kind: "walk",
      historical: true,
      face: "banisadr",
      deltas: { irgc: 6, leader: 4, street: -4, saudis: -8 },
      nextCard: "iran-iraq-1980",
    },
  ],
  sources: ["wiki-iran-iraq-aid", "us-iraq-tilt", "cfr-timeline"],
  visibleFactions: REVOLUTION,
  clocksOn: false,
  sloganVolume: 2,
  next: "iran-iraq-1980",
};

const iranIraq1980: Card = {
  id: "iran-iraq-1980",
  year: 1980,
  yearLabel: "September 1980",
  title: "Iraq invades Iran",
  era: "war",
  status: "playable",
  branchPoint: true,
  situationUs:
    "Saddam is invading Iran. The hostages are still inside the embassy. Iraq wants a tilt. The Gulf monarchies are already writing checks. The clip is eating the term.\n\nA raid may already be wreckage in the sand. A channel may still be open through Algeria. Neither one has brought the fifty-two home.",
  situationIran:
    "Saddam is invading. The regular army is a leftover of the Shah. The Guards want the war, the budget, and the dead. You are still the smiling face. The hostages are still in the embassy. This is the week a letterhead finds out whether it commands anything.",
  situationIranBanisadr:
    "Saddam is invading. Bazargan already resigned. You are Abolhassan Banisadr, the elected letterhead. The regular army is a leftover of the Shah. The Guards want the war, the budget, and the dead. The hostages are still in the embassy. The vote is yours. The guns are not.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: 22 September 1980, Iraq invades. The war lasts eight years. Chemical weapons against Iranians and Kurds. Gulf Arabs bankroll Iraq on the order of tens of billions. France sells Super Etendards and Exocets. The hostages are still held until 20 January 1981.",
      "IT: Washington's incentive is let's-you-and-him-fight. A 1992 British investigation put the quiet European objective in one line: sustain the war so neither side wins. The IRGC's lesson is never again a fair fight.",
      "Carter is still in the chair. Official neutrality is the file. The hostages are the exam. The tilt is a later president's later year.",
    ],
  },
  artisticLicense: [
    {
      id: "al-tilt-early",
      title: "Tilt in 1980",
      body: "Carter stayed officially neutral. The hostages were the exam. The tilt is Reagan's 1982 file, after Iran started winning. A 1980 tilt is too early. Stamp it.",
    },
    {
      id: "al-artesh-war",
      title: "Keep the regular army in command",
      body: "Historically the Guards take the war. A letterhead who tries to command the leftover army still does not have the guns. He can live. Iran continues. Stamp it.",
    },
  ],
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "The hostages are the exam. A tilt is a later file. Let them bleed without your fingerprints this week. A rescue is not this card.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "The hostages are the exam. Saddam is a later file. Do not put Americans on the front.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "If he tilts we will call it a gift to a butcher. If he stays out we will call it weakness. We have both sentences.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "Hostages open the show. A tilt to Baghdad is a process story. Process dies.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "Sustain the war so neither side wins. Sell to both if you can. We would like the oil to move.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "Write the check to Baghdad. Do not put Americans on the front. A cleric winning is the nightmare. We will not go first.",
    },
    {
      faction: "irgc",
      audience: "iran",
      face: LETTERHEAD,
      rant: "The Shah's leftover cannot be trusted. Give us the war, the budget, and the dead. The Imam's line is the line. A letterhead who feeds the regular army is a face we replace.",
    },
    {
      faction: "leader",
      audience: "iran",
      face: LETTERHEAD,
      rant: "The war is a blessing. It forges the parallel army. You stamp. We bury. Do not keep the Shah's officers in command.",
    },
    {
      faction: "street",
      audience: "iran",
      face: LETTERHEAD,
      rant: "The boys will be drafted. Groceries do not care whose barracks has the war. If you fight the Guards they will still have the building.",
    },
  ],
  usChoices: [
    {
      id: "us-tilt-iraq",
      label: "Tilt to Iraq",
      summary: "Let them bleed. Baghdad gets the quiet help.",
      kind: "covert",
      artisticLicense: "al-tilt-early",
      deltas: { cia: 8, saudis: 10, europeans: 6, my_party: -4, opposing_party: 6, media: 4 },
      nextCard: "election-1980",
    },
    {
      id: "us-no-tilt",
      label: "Stay out of the war",
      summary: "The clip is the campaign. Saddam is not your furnace.",
      kind: "walk",
      historical: true,
      deltas: { cia: -6, saudis: -8, europeans: -4, my_party: 4 },
      nextCard: "election-1980",
    },
  ],
  iranChoices: [
    {
      id: "ir-guards-war",
      label: "Let the Guards have the war",
      summary: "The parallel army wants the budget and the dead.",
      kind: "hard",
      historical: true,
      face: LETTERHEAD,
      nextCard: "impeached-1981",
      deltas: { irgc: 16, leader: 12, street: -12, liberals: -6, europeans: -4 },
    },
    {
      id: "ir-artesh-war",
      label: "Keep the regular army in command",
      summary: "The Shah's leftover is still an army. Do not build a second one.",
      kind: "hard",
      face: LETTERHEAD,
      artisticLicense: "al-artesh-war",
      nextCard: "impeached-1981",
      flags: { letterhead_generic: true },
      deltas: { irgc: -8, leader: -10, street: 4, europeans: 4 },
      ...moralEpilogue(
        "You tried to command the leftover army. They thank you for the principle. They do not thank you with a barracks. You retire. You write the book. You emigrate to Los Angeles. You open a convenience store with the proceeds. The Guards have the war anyway.",
      ),
    },
  ],
  sources: ["wiki-iran-iraq-aid", "us-iraq-tilt", "cfr-timeline", "nara-hostages"],
  visibleFactions: REVOLUTION,
  clocksOn: false,
  sloganVolume: 2,
  next: "election-1980",
};

const election1980: Card = {
  id: "election-1980",
  year: 1980,
  yearLabel: "November 1980",
  title: "Carter runs for re-election",
  era: "war",
  status: "playable",
  branchPoint: true,
  situationUs:
    "The hostages are still inside. Saddam is still in Iran. The clip is eating the term.\n\nA raid may already be wreckage in the sand. Talking may still be a channel through Algeria. Neither one has brought the fifty-two home. The other party has a sentence ready. The nightly open still has a flag and a blindfold.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT", "AL"],
    paragraphs: [
      "LT: 4 November 1980, Reagan beats Carter. The hostages are still held. They walk the morning of the oath, 20 January 1981. 444 days.",
      "IT: The clip ate the term. A sitting president with Americans in a basement does not get a second one. The raid is already wreckage or it is still in the drawer. Neither version un-loses November.",
      "Carter does not step aside. He runs. A Hail Mary is a stunt. Reagan still sits.",
    ],
  },
  artisticLicense: [
    {
      id: "al-hail-mary",
      title: "A Hail Mary",
      body: "The clip still eats the term. A last throw does not un-lose 1980. Reagan still sits. AL on the stunt, not the math.",
    },
  ],
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "The raid is wreckage or it is still a memo. The hostages are a nightly open. We do not have a trick that photographs as a win before the first Tuesday in November.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "Human rights was the campaign. This is the exam. Run. The other paper already has the clip. A stunt is not a second term. It is a sentence we can live with in the memoir.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "Are you better off. That is the whole speech. If he raids again we will call it reckless. If he waits we will call it a gift. We have both. We will use the one the film already developed.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "Nightline can open on a flag and a blindfold until the oath. A Hail Mary is one more process story. Process dies. Hostages do not.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "We would like our own people out. We would like the oil to move. Your election is your problem. The war next door is already everyone's.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "A weak Washington is a sermon. Do not look like you lost the neighborhood. We will not go first.",
    },
  ],
  usChoices: [
    {
      id: "us-run-again",
      label: "Run again",
      summary: "The clip is the campaign. You still have a name on the ballot.",
      kind: "hard",
      historical: true,
      nextCard: "inaugurated-1981",
      deltas: { my_party: -6, opposing_party: 8, media: 6 },
    },
    {
      id: "us-hail-mary",
      label: "Throw a Hail Mary",
      summary: "One more raid, one more channel, one more speech. The clip is still the campaign.",
      kind: "hard",
      artisticLicense: "al-hail-mary",
      nextCard: "inaugurated-1981",
      deltas: { my_party: -8, opposing_party: 6, media: 10, cia: -4 },
    },
  ],
  iranChoices: [],
  sources: ["nara-hostages", "cfr-timeline"],
  visibleFactions: REVOLUTION,
  clocksOn: false,
  sloganVolume: 2,
  next: "inaugurated-1981",
};

const inaugurated1981: Card = {
  id: "inaugurated-1981",
  year: 1981,
  yearLabel: "January 1981",
  title: "Reagan takes the oath",
  era: "war",
  status: "playable",
  situationUs:
    "20 January 1981. You are Ronald Reagan. The hostages walk as the oath lands. Four hundred forty-four days.\n\nYou did not bring them home. The clip did. The war next door is already two years old. A cousin of the Guards is already in the Bekaa. This is the chair. The bill is on the desk.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: Reagan is inaugurated 20 January 1981. The 52 remaining hostages are released that morning. 444 days. Banisadr is still the Iranian letterhead for a few more months.",
      "IT: The clip closed on the walk. The war and the Bekaa are already the next file. A president who will not sit the oath is not a fork. He is not in the chair.",
    ],
  },
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "They walked because the calendar turned. Algeria did the paperwork. We will take the photograph. Do not confuse the photograph with a rescue.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "The other paper lost the clip. You have the chair. Sit it. The Gulf is already a war. Lebanon is already a cousin.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "He will call it strength. We will call it luck with a clock. We have that sentence ready.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "A yellow ribbon photographs. A ceasefire in a war you are not in does not. Open on the walk.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "The hostages are out. The oil should move. The war next door is still a furnace we would like to keep even.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "A new face in Washington. Write the same check to Baghdad. Do not put Americans on the front. We will not go first.",
    },
  ],
  usChoices: [
    {
      id: "us-sit-reagan",
      label: "Sit the presidency",
      summary: "The oath is yours. So is the bill.",
      kind: "hard",
      historical: true,
      nextCard: "delist-1982",
      deltas: { my_party: 6, opposing_party: -4, media: 8, cia: 4 },
    },
  ],
  iranChoices: [],
  sources: ["nara-hostages", "cfr-timeline"],
  visibleFactions: REVOLUTION,
  clocksOn: false,
  sloganVolume: 2,
  next: "delist-1982",
};

const delist1982: Card = {
  id: "delist-1982",
  year: 1982,
  yearLabel: "February 1982",
  title: "Iraq comes off the terrorism list",
  era: "war",
  status: "playable",
  branchPoint: true,
  situationUs:
    "Iraq is on the State Sponsors of Terrorism list. That list is why dual-use licenses are blocked, and why a European pesticide plant for Baghdad is still a diplomatic problem. Iran is turning the war. Baghdad is not doing well.\n\nTake them off and the licenses open. Europe can sell the plants and the precursors. Keep them on and you keep the lock. The Saudis want the furnace even. The cable is on the desk.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT", "AL"],
    paragraphs: [
      "LT: 26 February 1982, the Reagan administration removes Iraq from the State Department list of state sponsors of terrorism. Iraq had been on it since 1979 with Syria, Libya, and South Yemen. The list is an Export Administration Act lock: dual-use licenses, credits, a signal to allies. Congress objects. The House later votes to put them back. State does not. Haig says he was not consulted. The press guidance says the decision has no implications for the war.",
      "IT: The public line is that Iraq reduced support for terrorism. A Pentagon counterterrorism man later said the real reason was to help them succeed against Iran. An NSC man said they were terrified Iraq would lose. Taking them off unlocks US dual-use and tells Europe the chemistry can move. German firms build pesticide plants that are not pesticide plants. From 1983 Iraq uses mustard and nerve agent on Iranian troops. Washington knows. The tilt continues. This is one of the original sins of the 1980s.",
    ],
  },
  artisticLicense: [
    {
      id: "al-keep-iraq-listed",
      title: "Keep them on the list",
      body: "Historically they come off. Keeping them on does not un-write the war, the intel tilt, or the Bekaa. Europe still wants the oil to move. Stamp it.",
    },
  ],
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "They're losing. The list is a lock on dual-use. Take it off. We will share maps later. This week's product is the license.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "A cleric winning is the nightmare. The list is a clerk's bill. Take them off. Do not look like you lost the neighborhood.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "If he delists a terrorist we will run that clip. If he keeps them on we will call it losing the Gulf. We have both sentences.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "A terrorism list is a briefs column. A pesticide plant is a process story. Process dies. Gas is a later photograph.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "If Washington takes them off, we can sell. Pesticide plants. Precursors. Sustain the war so neither side wins. We would like the oil to move.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "Baghdad does not lose. Take them off. Write the check. Do not put Americans on the front. We will not go first.",
    },
  ],
  usChoices: [
    {
      id: "us-delist-iraq",
      label: "Take Iraq off the list",
      summary: "Unlock the licenses. Europe can sell the plants and the precursors.",
      kind: "deal",
      historical: true,
      deltas: { europeans: 12, saudis: 8, cia: 6, my_party: 4, opposing_party: 6, media: 4 },
      nextCard: "tilt-1982",
    },
    {
      id: "us-keep-iraq-listed",
      label: "Keep them on the list",
      summary: "A terrorist is a terrorist. The chemistry stays locked.",
      kind: "walk",
      artisticLicense: "al-keep-iraq-listed",
      deltas: { europeans: -10, saudis: -8, cia: -6, opposing_party: -4, media: 6 },
      nextCard: "tilt-1982",
    },
  ],
  iranChoices: [],
  sources: ["nsarchive-iraq-tilt", "us-iraq-tilt", "cfr-timeline"],
  visibleFactions: REVOLUTION,
  clocksOn: false,
  sloganVolume: 2,
  next: "tilt-1982",
};

const tilt1982: Card = {
  id: "tilt-1982",
  year: 1982,
  yearLabel: "1982",
  title: "Iran is winning. Reagan tilts to Iraq",
  era: "war",
  status: "playable",
  branchPoint: true,
  situationUs:
    "Iran has pushed into Iraq. The war is no longer a gift. Baghdad wants targeting intel. The hostages already walked.\n\nIraq may already be off the terrorism list. Dual-use may already be moving. A cable is on the desk: share what we know, keep the furnace even, then dry up Iran's arms. Operation Staunch is being written. This is the week the intel tilt actually happens.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: 1982, Iranian offensives push into Iraqi territory. Reagan's CIA shares targeting intelligence with Baghdad. Operation Staunch, 1983, tries to cut Iran's arms. Carter's 1980 file was official neutrality while the hostages ran. The tilt is this year, this president.",
      "IT: Washington's incentive is still let's-you-and-him-fight. A 1982 tilt is not a 1980 rescue. The hostages walked. The war did not.",
    ],
  },
  artisticLicense: [
    {
      id: "al-no-tilt-1982",
      title: "Stay out in 1982",
      body: "Historically Reagan tilts. A Washington that stays neutral after Iran starts winning is a fork. The war still happens. The Bekaa is still the next exam. Stamp it.",
    },
  ],
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "They are winning. Share the targeting. Keep the war even. Do not put Americans on the front. Staunch is the later cable. This week's product is the intel.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "The hostages walked. A cleric winning is the nightmare. Tilt. Do not look like you lost the neighborhood.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "If he helps Baghdad we will call it a gift to a butcher. If he stays out we will call it weakness. We have both sentences.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "A yellow ribbon already ran. Intel to Baghdad is a process story. Process dies.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "Sustain the war so neither side wins. We will sell to both if we can. Keep the oil moving.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "Write the check to Baghdad. Share the map. Do not put Americans on the front. A cleric winning is the nightmare. We will not go first.",
    },
  ],
  usChoices: [
    {
      id: "us-cia-baghdad",
      label: "Share the intel with Baghdad",
      summary: "Keep the war even. Do not put Americans on the front.",
      kind: "covert",
      historical: true,
      deltas: { cia: 10, saudis: 10, europeans: 6, my_party: 4, opposing_party: 4, media: 4 },
      nextCard: "lebanon-1983",
    },
    {
      id: "us-stay-neutral",
      label: "Stay out of the war",
      summary: "The hostages walked. The furnace is not yours.",
      kind: "walk",
      artisticLicense: "al-no-tilt-1982",
      deltas: { cia: -8, saudis: -10, europeans: -4, my_party: -4 },
      nextCard: "lebanon-1983",
    },
  ],
  iranChoices: [],
  sources: ["wiki-iran-iraq-aid", "us-iraq-tilt", "cfr-timeline"],
  visibleFactions: REVOLUTION,
  clocksOn: false,
  sloganVolume: 2,
  next: "lebanon-1983",
};

const impeached1981: Card = {
  id: "impeached-1981",
  year: 1981,
  yearLabel: "June 1981",
  title: "The Majlis impeaches Banisadr",
  era: "war",
  status: "playable",
  situationIranBanisadr:
    "The Majlis has had enough of you. The Imam has had enough of you. The Guards have the war. You are Abolhassan Banisadr, the elected letterhead of a revolution whose guns were never yours.\n\nYou can leave. Paris is a room. You can stay and talk about the constitution. The constitution does not have a barracks.",
  situationIran:
    "The Majlis has had enough of the letterhead. The Imam has had enough of the letterhead. The Guards have the war. The vote is a formality.\n\nYou can leave. Paris is a room. You can stay and talk about the constitution. The constitution does not have a barracks.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: 21 June 1981, the Majlis impeaches Banisadr. He flees to France. Rajai is president for weeks and is killed. Khamenei is inaugurated 13 October 1981. He is president, not the Imam.",
      "IT: The letterhead was always furniture. A face who defies the Majlis still does not get the guns. He can live. Someone else sits the stamp. The next exam is the same.",
    ],
  },
  artisticLicense: [
    {
      id: "al-defy-majles",
      title: "Defying the Majlis",
      body: "Historically he runs. A letterhead who stays to fight the vote still does not have the guns. He can live. Iran continues. Someone else sits. Stamp it.",
    },
  ],
  briefings: [
    {
      faction: "irgc",
      audience: "iran",
      face: LETTERHEAD,
      rant: "The war is ours. The vote is a formality. A letterhead who talks back is a face we replace. Leave, or be left.",
    },
    {
      faction: "leader",
      audience: "iran",
      face: LETTERHEAD,
      rant: "You were the elected face. You are not the jurist. The Majlis will vote. Stamp your own departure or someone else will.",
    },
    {
      faction: "street",
      audience: "iran",
      face: LETTERHEAD,
      rant: "The boys are already at the front. Groceries do not care whose name comes off the stamp. Paris is a room. The war is not.",
    },
  ],
  usChoices: [],
  iranChoices: [
    {
      id: "ir-leave-majles",
      label: "Leave the chair",
      summary: "The guns were never yours. The vote is a formality.",
      kind: "walk",
      historical: true,
      face: LETTERHEAD,
      flags: { iran_face: "khamenei" },
      nextCard: "seated-1981",
      deltas: { irgc: 8, leader: 6, street: -4, liberals: -4 },
    },
    {
      id: "ir-defy-majles",
      label: "Defy the Majlis",
      summary: "The vote is not a constitution. Stay and say so.",
      kind: "hard",
      face: LETTERHEAD,
      artisticLicense: "al-defy-majles",
      flags: { iran_face: "khamenei", letterhead_generic: true },
      nextCard: "seated-1981",
      deltas: { irgc: -6, leader: -8, street: 4 },
      ...moralEpilogue(
        "You stayed to fight the vote. They thank you for the principle. They do not thank you with a barracks. You retire. You write the book. You emigrate to Los Angeles. You open a convenience store with the proceeds. Night shift. Lottery tickets. The Majlis sits the next stamp anyway.",
      ),
    },
  ],
  sources: ["banisadr-impeach", "cfr-timeline"],
  visibleFactions: REVOLUTION,
  clocksOn: false,
  sloganVolume: 2,
  next: "seated-1981",
};

const seated1981: Card = {
  id: "seated-1981",
  year: 1981,
  yearLabel: "October 1981",
  title: "Khamenei takes the presidency",
  era: "war",
  status: "playable",
  situationIranKhamenei:
    "You are Ali Khamenei. You are not the Imam. Rajai is dead. Banisadr is in Paris. The Majlis put your name on the letterhead.\n\nThe war is already a year old. The Guards have the budget and the dead. A cousin is already looking at Lebanon. The stamp is yours. The guns are not.",
  situationIran:
    "Rajai is dead. Banisadr is in Paris. The Majlis put a new name on the letterhead. Ali Khamenei. He is president, not the Imam.\n\nThe war is already a year old. The Guards have the budget and the dead. A cousin is already looking at Lebanon. The stamp is yours. The guns are not.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: Khamenei is inaugurated president 13 October 1981. He is not yet the Leader. Khomeini is still alive. The war continues. Lebanon is already a file.",
      "IT: The letterhead changed. The barracks did not. A face who will not take the stamp still does not get the guns. Iran continues.",
    ],
  },
  artisticLicense: [
    {
      id: "al-refuse-khamenei",
      title: "Refusing the next stamp",
      body: "Historically he sits. A face who will not take the letterhead still does not get the guns. He can live. Iran continues. Stamp it.",
    },
  ],
  briefings: [
    {
      faction: "irgc",
      audience: "iran",
      face: "khamenei",
      rant: "The last face talked. This one will stamp. The war is ours. Lebanon is a cousin. Do not get ideas.",
    },
    {
      faction: "leader",
      audience: "iran",
      face: "khamenei",
      rant: "You are the elected face. You are not the jurist. The war is a blessing. Stamp what I have already decided.",
    },
    {
      faction: "street",
      audience: "iran",
      face: "khamenei",
      rant: "Another name. Same war. Groceries do not care. The boys will still be drafted.",
    },
  ],
  usChoices: [],
  iranChoices: [
    {
      id: "ir-sit-khamenei",
      label: "Sit the presidency",
      summary: "The stamp is yours. The guns are not. The bill is.",
      kind: "hard",
      historical: true,
      face: "khamenei",
      nextCard: "lebanon-1983",
      deltas: { irgc: 6, leader: 6, street: -2 },
    },
    {
      id: "ir-refuse-khamenei",
      label: "Refuse the letterhead",
      summary: "Do not sit a chair the Guards already own.",
      kind: "hard",
      face: "khamenei",
      artisticLicense: "al-refuse-khamenei",
      nextCard: "lebanon-1983",
      flags: { letterhead_generic: true },
      deltas: { irgc: 4, leader: -4, street: 2 },
      ...moralEpilogue(
        "You will not sit a chair the Guards already own. They thank you for the principle. You retire. You write the book. You emigrate to Los Angeles. You open a convenience store with the proceeds. Night shift. Lottery tickets. Someone else sits the stamp. The Bekaa is still the next exam.",
      ),
    },
  ],
  sources: ["banisadr-impeach", "cfr-timeline"],
  visibleFactions: REVOLUTION,
  clocksOn: false,
  sloganVolume: 2,
  next: "lebanon-1983",
};

const lebanon1983: Card = {
  id: "lebanon-1983",
  year: 1983,
  yearLabel: "1982–1983",
  title: "Hezbollah bombs the Marines in Beirut",
  era: "war",
  status: "playable",
  branchPoint: true,
  situationUs:
    "Marines are in Beirut. A cousin of the Guards is in the Bekaa. A truck can reach the barracks.\n\nThe hostages walked. The war next door did not. This is the first bill that has your name on it.",
  situationIranKhamenei:
    "A cousin is in the Bekaa. The Marines are in Beirut. The war at home is already eating boys.\n\nYou are the letterhead. The Guards want the export. The Imam's line is the line. Lebanon is not a second country. It is a classroom.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: 23 October 1983, a truck bomb at the Beirut airport barracks. 241 US dead, 58 French the same morning. Marines withdraw February 1984. Later US court: Hezbollah at Iranian direction.",
      "IT: Bring them home photographs as a lesson. Stay and hit the Bekaa photographs as a war. Both still ride to a later channel in the dark. Iran's keep-the-war-at-home is the off-ramp. The export is the golden path.",
    ],
  },
  artisticLicense: [
    {
      id: "al-hit-bekaa",
      title: "Stay and hit the Bekaa",
      body: "Historically the Marines leave. A Washington that stays and shoots still has a later hostage file. The channel in the dark is not cancelled by a crater. Stamp it.",
    },
    {
      id: "al-no-export",
      title: "Keep the war at home",
      body: "Historically the Guards export. A letterhead who tries to keep the revolution inside Iran is talking to a barracks he does not own. This one is a grave. The export is how the later channel arrives.",
    },
  ],
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "A cousin of the Guards is in the Bekaa. A barracks is a target. Bring them home and own the lesson. Stay and own the crater. We are asking you which film develops.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "The walk was the clip. A second clip of Marines in a basement is a gift to the other paper. Bring them home. Lebanon is not the Gulf.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "If he leaves we will call it a retreat. If he stays we will call it a quagmire. We have both sentences.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "A barracks in rubble photographs. A cousin in the Bekaa is a process story. Process dies.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "We lost men the same morning. We would like out. The oil should still move.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "A truck in Beirut is a sermon. Do not look weak. Do not start a war that lights us. We will not go first.",
    },
    {
      faction: "irgc",
      audience: "iran",
      face: "khamenei",
      rant: "The war at home forges us. The war next door teaches them. Send us. The Imam's line is the line. A letterhead who keeps us in Khuzestan is a face we replace.",
    },
    {
      faction: "leader",
      audience: "iran",
      face: "khamenei",
      rant: "Lebanon is a classroom. The revolution is not a country. Export it. Stamp the order.",
    },
    {
      faction: "street",
      audience: "iran",
      face: "khamenei",
      rant: "The boys are already at the front. Another front is more boys. Groceries do not care about the Bekaa.",
    },
  ],
  usChoices: [
    {
      id: "us-bring-home",
      label: "Bring them home",
      summary: "The barracks is a target. Do not sit a second clip.",
      kind: "walk",
      historical: true,
      nextCard: "iran-contra-1985",
      deltas: { my_party: 4, opposing_party: 6, media: -6, cia: -4, saudis: -4 },
    },
    {
      id: "us-hit-bekaa",
      label: "Stay and hit the Bekaa",
      summary: "A cousin did this. Answer in the valley.",
      kind: "bomb",
      artisticLicense: "al-hit-bekaa",
      nextCard: "iran-contra-1985",
      deltas: { my_party: -6, opposing_party: 4, media: 10, cia: 6, saudis: 4, irgc: 8 },
    },
  ],
  iranChoices: [
    {
      id: "ir-bekah",
      label: "Send the Guards to the Bekaa",
      summary: "The revolution is not a country. Export it.",
      kind: "hard",
      historical: true,
      face: "khamenei",
      nextCard: "iran-contra-1985",
      deltas: { irgc: 12, leader: 8, street: -8, europeans: -6, cia: -6 },
    },
    {
      id: "ir-no-export",
      label: "Keep the war at home",
      summary: "The boys are already at the front. Do not open another.",
      kind: "soft",
      face: "khamenei",
      artisticLicense: "al-no-export",
      ending: "face_no_guns",
      deltas: { irgc: -14, leader: -12, street: 6 },
    },
  ],
  sources: ["beirut-1983", "cfr-timeline"],
  visibleFactions: REVOLUTION,
  clocksOn: false,
  sloganVolume: 2,
  next: "iran-contra-1985",
};

const iranContra1985: Card = {
  id: "iran-contra-1985",
  year: 1986,
  yearLabel: "1985–1987",
  title: "Iran-Contra: missiles for hostages",
  era: "war",
  status: "playable",
  branchPoint: true,
  situationUs:
    "Iran still has American airframes from the catalog years. They are falling out of the sky. Hostages are in Lebanon. The Contras need a bag that Congress will not vote.\n\nA channel in the dark can sell TOW missiles and HAWK parts. The profit can walk to Nicaragua. The embargo is still the law.",
  situationIranKhamenei:
    "The airframes from the catalog years are falling out of the sky. The war is eating spare parts. Someone in Washington is offering TOW missiles in the dark.\n\nThe Imam's line is Death to America. The hangars do not care. You are the letterhead. Stamp the crates, or stamp the speech.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: 1985-86, US arms sales to Iran. Hostages for missiles. Profit diverted to the Contras. Boland. Exposed November 1986.",
      "IT: The catalog from 1972 is why the hangars still take American parts. Refusing the crates does not end the war. It just changes how empty the cupboard is when the cup arrives.",
    ],
  },
  artisticLicense: [
    {
      id: "al-keep-embargo",
      title: "Keep the embargo",
      body: "Historically the channel runs. A Washington that keeps the embargo still has a later cup. The war still happens. Stamp it.",
    },
    {
      id: "al-refuse-crates",
      title: "Refuse the crates",
      body: "Historically Iran takes the parts. A letterhead who refuses still does not have a second supplier that is not the black market. The cup still arrives. Stamp it.",
    },
  ],
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "They still fly our airframes. They will pay. Hostages come home in ones. The Contras get a bag Congress will not vote. This is not a speech. This is a warehouse.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "If it stays dark it is statecraft. If it photographs it is a hearing. Sell if you can keep it off the nightly open.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "If he sells we will call it trading with the mullahs. If he does not we will call it abandoning the hostages. We have both. Boland is already the law.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "A hostage walking photographs. A TOW crate does not, until a Lebanese paper has a receipt. Then it is the whole show.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "We have been selling into that war for years. Do not lecture us from a warehouse you also use.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "Arm Baghdad in the open. If you arm Tehran in the dark, do not tell us. We will not go first.",
    },
    {
      faction: "irgc",
      audience: "iran",
      face: "khamenei",
      rant: "The hangars are empty. American parts still fit. Take them. The speech can wait. A letterhead who refuses a crate for a slogan is a face we replace after the next crash.",
    },
    {
      faction: "leader",
      audience: "iran",
      face: "khamenei",
      rant: "Death to America is the line. The war is the blessing. If the parts keep the blessing alive, stamp the crate and keep the speech.",
    },
    {
      faction: "street",
      audience: "iran",
      face: "khamenei",
      rant: "The boys at the front do not care whose factory made the missile. Groceries do not care about a warehouse in the dark.",
    },
  ],
  usChoices: [
    {
      id: "us-sell-missiles",
      label: "Sell them the missiles",
      summary: "Hostages for parts. The profit can walk south.",
      kind: "covert",
      historical: true,
      nextCard: "cup-1988",
      deltas: { cia: 8, my_party: -6, opposing_party: 8, media: -8, saudis: -6, irgc: 6 },
    },
    {
      id: "us-keep-embargo",
      label: "Keep the embargo",
      summary: "The law is the law. No crates in the dark.",
      kind: "sanction",
      artisticLicense: "al-keep-embargo",
      nextCard: "cup-1988",
      deltas: { cia: -8, my_party: 4, opposing_party: -4, media: 4, saudis: 6, irgc: -4 },
    },
  ],
  iranChoices: [
    {
      id: "ir-take-parts",
      label: "Take the American parts",
      summary: "The hangars still take their bolts. The speech can wait.",
      kind: "deal",
      historical: true,
      face: "khamenei",
      nextCard: "cup-1988",
      deltas: { irgc: 8, leader: 4, street: -4, cia: 6, europeans: -4 },
    },
    {
      id: "ir-refuse-crates",
      label: "Refuse the crates",
      summary: "Death to America is the line. Stamp the speech, not the invoice.",
      kind: "hard",
      face: "khamenei",
      artisticLicense: "al-refuse-crates",
      nextCard: "cup-1988",
      deltas: { irgc: -6, leader: 6, street: 4, cia: -8 },
    },
  ],
  sources: ["iran-contra", "cfr-timeline", "nixon-twin-pillars"],
  visibleFactions: REVOLUTION,
  clocksOn: false,
  sloganVolume: 2,
  next: "cup-1988",
};

const cup1988: Card = {
  id: "cup-1988",
  year: 1988,
  yearLabel: "1988",
  title: "Khomeini drinks the poison chalice",
  era: "war",
  status: "playable",
  branchPoint: true,
  situationUs:
    "3 July 1988. USS Vincennes shoots down Iran Air 655 over the Gulf. Two hundred ninety dead. Washington can call it a mistake or own the shot.\n\nThe war is eight years old. A ceasefire is in the drawer. The Imam has not drunk yet.",
  situationIranKhamenei:
    "Eight years. Chemical weapons. A generation of boys. An airliner is in the water. Two hundred ninety dead.\n\nThe Imam is being asked to drink a cup of poison and accept a ceasefire. You are the letterhead. You stamp. You do not drink. You were not the war.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: 3 July 1988, Vincennes shoots down Iran Air 655. 290 dead. 18 July Iran accepts Resolution 598. Khomeini's cup of poison. Ceasefire 20 August 1988.",
      "IT: Washington's sentence is a mistake. The Guards' lesson is never again a fair fight. The letterhead stamps the cup. The jurist drinks it. Natanz is a later file.",
    ],
  },
  artisticLicense: [
    {
      id: "al-own-shot",
      title: "Own the shot",
      body: "Historically Washington calls it a mistake. Owning it does not un-drink the cup. The ceasefire still arrives. Stamp it.",
    },
    {
      id: "al-refuse-cup",
      title: "Refuse the ceasefire",
      body: "Historically the Imam drinks. A letterhead who refuses the cup is talking to a war he does not command. This one is a grave.",
    },
  ],
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "An airliner. A warship. A skipper who thought he was shooting a fighter. Call it a mistake and close the file. Own it and you buy a hearing that lasts a decade.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "The war is ending anyway. Do not put a trial on the nightly open. Call it a mistake. Let the cup be their problem.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "If he owns it we will call it a massacre. If he calls it a mistake we will call it a cover. We have both.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "Two hundred ninety is a number that photographs. A ceasefire in a war we were not in is a process story.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "Resolution 598. End it. The oil should move. Do not make this a second clip.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "The war ending without a cleric winning is the whole point. Do not snatch a defeat from that.",
    },
    {
      faction: "irgc",
      audience: "iran",
      face: "khamenei",
      rant: "Never again a fair fight. That is the lesson. Drink if the Imam drinks. A letterhead who keeps the war after the jurist is done is a face we replace.",
    },
    {
      faction: "leader",
      audience: "iran",
      face: "khamenei",
      rant: "I drink the cup. You stamp. The blessing has a bill. Pay it.",
    },
    {
      faction: "street",
      audience: "iran",
      face: "khamenei",
      rant: "Eight years. The boys are gone. Groceries do not care whose name is on the ceasefire. End it.",
    },
  ],
  usChoices: [
    {
      id: "us-call-mistake",
      label: "Call it a mistake",
      summary: "An airliner. A warship. Close the file.",
      kind: "soft",
      historical: true,
      nextCard: "robe-1989",
      resultTitle: "The cup, and two hundred ninety",
      result:
        "3 July 1988. USS Vincennes shoots down Iran Air 655. Two hundred ninety dead. Washington calls it a mistake. Eighteen days later the Imam drinks the cup. Resolution 598. Eight years. The Guards learn never to fight fair again. Natanz is a later file.",
      deltas: { my_party: 4, opposing_party: 4, media: -6, europeans: 6, saudis: 4 },
    },
    {
      id: "us-own-shot",
      label: "Own the shot",
      summary: "Say what the radar did. Take the hearing.",
      kind: "hard",
      artisticLicense: "al-own-shot",
      nextCard: "robe-1989",
      resultTitle: "The cup, and two hundred ninety",
      result:
        "You owned the shot. The hearing lasts. The Imam still drinks. Two hundred ninety is still the number. The ceasefire still arrives. Natanz is a later file.",
      deltas: { my_party: -8, opposing_party: 8, media: 10, europeans: -6, saudis: -4 },
    },
  ],
  iranChoices: [
    {
      id: "ir-stamp-cup",
      label: "Stamp the cup",
      summary: "The Imam drinks. You stamp. You were not the war.",
      kind: "walk",
      historical: true,
      face: "khamenei",
      nextCard: "robe-1989",
      resultTitle: "The Imam drinks the cup",
      result:
        "Eight years. Chemical weapons. A generation of boys. The Guards learn never to fight fair again. Khomeini drinks the poison chalice and accepts the ceasefire. You were the letterhead. You were not the war.",
      deltas: { irgc: 6, leader: 8, street: 8, liberals: -4 },
    },
    {
      id: "ir-refuse-cup",
      label: "Refuse the ceasefire",
      summary: "The blessing does not end on a cup.",
      kind: "hard",
      face: "khamenei",
      artisticLicense: "al-refuse-cup",
      ending: "face_no_guns",
      deltas: { irgc: -16, leader: -14, street: -8 },
    },
  ],
  sources: ["vincennes-1988", "iran-contra", "cfr-timeline"],
  visibleFactions: REVOLUTION,
  clocksOn: false,
  sloganVolume: 2,
  next: "robe-1989",
};

const hitler1938: Card = {
  id: "hitler-1938",
  year: 1938,
  yearLabel: "1938",
  title: "A man in Germany",
  era: "prologue",
  status: "playable",
  secret: true,
  art: "/art/1938-desk.jpg",
  situation:
    "You are sitting in 1938. A man in Germany is still killable. The Anglo-Iranian Oil Company still has a concession in Persia. Mossadegh has not nationalized it yet.\n\nYou can try to solve Berlin. The oil is a later file.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["AL", "DK"],
    paragraphs: [
      "AL: Killing him does not solve Persia. Europe still finds a war, just with uglier paperwork. The concession is still there. 1953 is the actual chair.",
      "DK: nobody has a clean file on a 1938 that does not happen.",
    ],
  },
  artisticLicense: [
    {
      id: "al-hitler",
      title: "Killing him",
      body: "Europe still finds a war, just with uglier paperwork. The Anglo-Iranian Oil Company still has a concession. Mossadegh is still going to nationalize it. You did not solve Persia by solving Berlin. AL. 1953 is the actual chair.",
    },
  ],
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "We are not even CIA yet. The file is a later invention. The oil company is real. The man in Germany is real. These are not the same problem.",
    },
    {
      faction: "leader",
      audience: "iran",
      rant: "This is not our chair. The concession is. A European war will still want the oil. Do not confuse Berlin with Abadan.",
    },
    {
      faction: "street",
      audience: "iran",
      rant: "We are not in this room. The oil is. Come back when the company is the question.",
    },
  ],
  usChoices: [
    {
      id: "kill-him",
      label: "Kill him",
      summary: "A man. A shot. Berlin is still a later war.",
      kind: "hard",
      artisticLicense: "al-hitler",
      ending: "hitler_shot",
      deltas: {},
    },
    {
      id: "leave-him",
      label: "Leave him",
      summary: "Berlin is not the oil. The oil is a later file.",
      kind: "walk",
      nextCard: "coup-1953",
      deltas: {},
    },
  ],
  iranChoices: [
    {
      id: "kill-him",
      label: "Kill him",
      summary: "A man. A shot. Berlin is still a later war.",
      kind: "hard",
      artisticLicense: "al-hitler",
      ending: "hitler_shot",
      deltas: {},
    },
    {
      id: "leave-him",
      label: "Leave him",
      summary: "Berlin is not the oil. The oil is a later file.",
      kind: "walk",
      nextCard: "coup-1953",
      deltas: {},
    },
  ],
  sources: ["cia-1953"],
  visibleFactions: COLD_WAR,
  clocksOn: false,
  sloganVolume: 0,
  next: "coup-1953",
};

const hormuz2019: Card = {
  id: "hormuz-2019",
  year: 2019,
  yearLabel: "2019",
  title: "Iran shoots down a US drone over Hormuz",
  era: "late",
  status: "playable",
  situationUs:
    "A Global Hawk is down. Tankers are being seized. Abqaiq is a hole in a photograph. You have a strike package in the drawer.\n\nThe campaign said maximum pressure. The caucus wanted a crater. The radar picture is a night you can still call off.",
  situationIran:
    "A Global Hawk is down. Tankers are a lever. The Strait is a noose if you pull it. The Guards want the shot. The street is tired.\n\nYou are not 1979. You are the letterhead of a later year, or you are the Guards' problem. Hold fire and they will remember. Shoot and the map leaks.",
  actionPrompt: "What do you want to do?",
  referee: {
    tags: ["LT", "IT"],
    paragraphs: [
      "LT: June 2019, Iran shoots down a US Global Hawk. Tanker seizures in the Strait. Abqaiq is hit in September. Trump aborts a strike.",
      "IT: Aborting after you talked tough costs the caucus. Bombing leaks a map of holes. Hormuz as a map is a different play style. This card is a proof, not that train.",
    ],
  },
  briefings: [
    {
      faction: "cia",
      audience: "us",
      rant: "The package is in the drawer. A drone is not a carrier. Abort and the caucus will call it weakness. Shoot and we will have a hole we have to admit we knew about.",
    },
    {
      faction: "my_party",
      audience: "us",
      rant: "You ran on strength. A cancelled night is a gift to the other paper. If you shoot, shoot. If you do not, do not have told us you would.",
    },
    {
      faction: "opposing_party",
      audience: "us",
      rant: "If he shoots we will call it a war. If he aborts we will call it a bluff. We have both sentences.",
    },
    {
      faction: "media",
      audience: "us",
      rant: "A drone falling photographs. A tanker boarding photographs. A cancelled strike is a process story until a leak makes it a clip.",
    },
    {
      faction: "saudis",
      audience: "us",
      rant: "Abqaiq was our plant. Do not look weak. Do not start a war that lights us. We will not go first.",
    },
    {
      faction: "europeans",
      audience: "us",
      rant: "The oil should move. A night of craters is a night the insurance market dies. We would like a statement, not a war.",
    },
    {
      faction: "irgc",
      audience: "iran",
      rant: "The Strait is ours to squeeze. A drone is a lesson. Hold fire and you are the smiling face again. We replace smiling faces.",
    },
    {
      faction: "leader",
      audience: "iran",
      rant: "The line is resistance. A shot that photographs as strength is the line. A pause is a sermon the Guards will not forgive.",
    },
    {
      faction: "street",
      audience: "iran",
      rant: "Groceries. Draft. Surveillance. A tanker in the Strait does not feed us. Do not start a war we will pay for in queues.",
    },
  ],
  usChoices: [
    {
      id: "us-abort",
      label: "Call it off",
      summary: "The package is in the drawer. Leave it there.",
      kind: "walk",
      historical: true,
      deltas: { my_party: -12, opposing_party: 6, media: -4, cia: -6 },
      delayedDeltas: { oil_pain: 8 },
    },
    {
      id: "us-bomb",
      label: "Take the shot",
      summary: "A drone is not a carrier. Answer anyway.",
      kind: "bomb",
      deltas: { my_party: 8, irgc: 10, media: 12, cia: 4, saudis: 6, drone_holes_known: 1 },
    },
  ],
  iranChoices: [
    {
      id: "ir-hold-fire",
      label: "Hold fire",
      summary: "A drone is a lesson. A war is a bill.",
      kind: "soft",
      deltas: { irgc: -10, street: 6, leader: -6, europeans: 4 },
    },
    {
      id: "ir-squeeze",
      label: "Squeeze the Strait",
      summary: "Tankers. Insurance. The noose is the point.",
      kind: "hard",
      historical: true,
      deltas: { irgc: 8, leader: 6, street: -8, oil_pain: 10 },
    },
  ],
  sources: ["ap-2019"],
  visibleFactions: ALL,
  clocksOn: true,
  sloganVolume: 3,
  next: "soleimani-2020",
};

const RAIL: readonly Card[] = [
  coup1953,
  deposed1953,
  atoms1957,
  whiteRevolution1963,
  weapons1972,
  revolution1979,
  veil1979,
  hostages1979,
  resigned1979,
  eagleClaw1980,
  youHimFight1980,
  iranIraq1980,
  election1980,
  inaugurated1981,
  delist1982,
  tilt1982,
  impeached1981,
  seated1981,
  lebanon1983,
  iranContra1985,
  cup1988,
  ...LATE_CARDS,
  hormuz2019,
  ...LATE_AFTER_HORMUZ,
  hitler1938,
];

export const CARDS: readonly Card[] = RAIL;

export const FIRST_CARD_ID = "coup-1953";
export const EASTER_EGG_CARD_ID = "hitler-1938";

const BY_ID = new Map(CARDS.map((c) => [c.id, c]));

export function cardById(id: string): Card | undefined {
  return BY_ID.get(id);
}

export function playableCards(): Card[] {
  return CARDS.filter((c) => c.status === "playable" && !c.secret);
}
