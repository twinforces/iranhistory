/**
 * What: the rail after the cup, and the quiet years we used to jump.
 * Why: this is a history tutorial. A card that says Next is still a sentence.
 * Copy lives here so cards.ts cannot be emptied by a late-file rewrite.
 */
import type { Briefing, Card, Choice, FactionId, IranFace } from "./types.ts";

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

function moral(story: string): Pick<Choice, "epilogue" | "resultTitle" | "result"> {
  return {
    epilogue: true,
    resultTitle: "We congratulate you on your moral choice.",
    result: `${story}\n\nHowever, Iran continues on.`,
  };
}

function b(
  faction: FactionId,
  audience: "us" | "iran",
  rant: string,
  face?: IranFace | readonly IranFace[],
): Briefing {
  return face ? { faction, audience, rant, face } : { faction, audience, rant };
}

function play(opts: {
  id: string;
  year: number;
  yearLabel: string;
  title: string;
  era: Card["era"];
  situationUs: string;
  situationIran: string;
  referee: readonly string[];
  al?: Card["artisticLicense"];
  us: Choice[];
  iran: Choice[];
  briefings: Briefing[];
  next: string | null;
  clocksOn?: boolean;
  wileyJoos?: boolean;
  branchPoint?: boolean;
  sources?: readonly string[];
  factions?: readonly FactionId[];
}): Card {
  const post79 = opts.year >= 1979;
  return {
    id: opts.id,
    year: opts.year,
    yearLabel: opts.yearLabel,
    title: opts.title,
    era: opts.era,
    status: "playable",
    branchPoint: opts.branchPoint,
    situationUs: opts.situationUs,
    situationIran: opts.situationIran,
    actionPrompt: "What do you want to do?",
    referee: { tags: opts.al?.length ? ["LT", "IT", "AL"] : ["LT", "IT"], paragraphs: opts.referee },
    artisticLicense: opts.al,
    briefings: opts.briefings,
    usChoices: opts.us,
    iranChoices: opts.iran,
    sources: opts.sources ?? ["cfr-timeline"],
    visibleFactions: opts.factions ?? (post79 ? REVOLUTION : COLD_WAR),
    clocksOn: opts.clocksOn ?? opts.year >= 2002,
    wileyJoos: opts.wileyJoos,
    sloganVolume: post79 ? 2 : 0,
    next: opts.next,
  };
}

const sofa1964 = play({
  id: "sofa-1964",
  year: 1964,
  yearLabel: "1964",
  title: "The SOFA",
  era: "shah",
  situationUs:
    "You are busy with Vietnam. State wants a SOFA so the advisors cannot be tried in an Iranian court. Two hundred million in military aid is tied to it.\n\nA cleric in Qom is not a name on your desk yet.",
  situationIran:
    "Washington wants immunity for its people. The Majlis is being asked to vote a document the bazaar will call slavery. A cleric in Qom is already writing the sermon.\n\nVietnam is their war. This bill is yours.",
  referee: [
    "LT: October 1964 the Majlis passes a status-of-forces bill, 74 to 61. Khomeini's 26 October sermon calls it a document of Iran's slavery. 4 November the Shah exiles him to Turkey, then Najaf. Fifteen years of cassette tapes start here.",
    "IT: Johnson is drowning in Vietnam. The SOFA is a clerk's bill that manufactures a revolutionary. Quiet years are not empty years.",
  ],
  al: [
    {
      id: "al-no-sofa",
      title: "No immunity",
      body: "Historically the bill passes. Refusing it does not un-write the White Revolution. Khomeini still hates the king. The sermon is quieter. He is still the man in 1979. AL.",
    },
  ],
  briefings: [
    b("cia", "us", "Take the immunity. The advisors will not sit in an Iranian court. The cleric is a local problem. Vietnam is the file."),
    b("my_party", "us", "You are busy with Vietnam. Do not pick a fight with the Shah over a status bill. Sign it and get back to the real war."),
    b("opposing_party", "us", "If the bill photographs as a capitulation we will run that clip. If you refuse the aid package we will call you weak on a client."),
    b("media", "us", "Vietnam eats the front page. A status bill in Tehran is a briefs column. The cleric does not have a name we can spell yet."),
    b("europeans", "us", "London already has the oil settlement. Let Washington have the advisors. We would like nobody nationalizing anything again."),
    b("saudis", "us", "A king who cannot protect his own courts looks weak. A king who refuses American aid looks weaker. We will not go first."),
    b("leader", "iran", "Pass it. The aid is real. The cleric can shout from Qom. Shouting is not a division. Face: the court still has the army.", "shah"),
    b("street", "iran", "If an American cook can kill a marja and walk, we heard the sermon already. The bazaar will close. You will call that noise.", "shah"),
    b("cia", "iran", "Kennedy is dead. Johnson wants the immunity and the listening posts. Take the money. Exile the loud one if you have to.", "shah"),
  ],
  us: [
    {
      id: "us-take-sofa",
      label: "Take the immunity",
      summary: "Advisors stay out of Iranian court. Vietnam is the file.",
      kind: "soft",
      historical: true,
      deltas: { cia: 6, my_party: 4, europeans: 2, street: -6 },
    },
    {
      id: "us-skip-sofa",
      label: "Do not ask for the bill",
      summary: "Vietnam is enough of a war. Leave their courts alone.",
      kind: "walk",
      artisticLicense: "al-no-sofa",
      deltas: { cia: -8, my_party: -4, street: 4 },
    },
  ],
  iran: [
    {
      id: "ir-pass-sofa",
      label: "Pass the bill",
      summary: "The aid is real. The sermon is a later file.",
      kind: "hard",
      historical: true,
      face: "shah",
      deltas: { leader: 6, cia: 8, street: -12, liberals: -4 },
    },
    {
      id: "ir-refuse-sofa",
      label: "Refuse Washington",
      summary: "A king who cannot try a foreign cook is not a king.",
      kind: "soft",
      face: "shah",
      artisticLicense: "al-no-sofa",
      deltas: { street: 8, leader: -6, cia: -10 },
    },
  ],
  next: "sit-nixon-1969",
  clocksOn: false,
  sources: ["cfr-timeline", "frus-johnson-iran"],
});

const sitNixon1969 = play({
  id: "sit-nixon-1969",
  year: 1969,
  yearLabel: "1969",
  title: "Sit Nixon",
  era: "shah",
  situationUs:
    "You inherited Vietnam. Iran is the pillar you will need when you leave Asia. The blank check is a later card.\n\nThe cleric is in Najaf. The king is still buying.",
  situationIran:
    "Johnson is gone. A new American is sitting. Vietnam is still their war. The catalog is still open.\n\nNajaf is sending tapes. The village is listening. Tehran is not.",
  referee: [
    "LT: Nixon sits January 1969. The Twin Pillars doctrine is not yet a blank check. That is 1972, after Britain leaves east of Suez.",
    "IT: A sit card is a history lesson. We ignored Iran. Say so.",
  ],
  briefings: [
    b("cia", "us", "Vietnam first. Iran is the policeman we will need when we leave Asia. Keep him armed. Do not write the check until you have to."),
    b("my_party", "us", "End Vietnam. Do not start a sermon about a king. The catalog can wait a year."),
    b("opposing_party", "us", "He ran on ending the war. If he buys the king a navy we will call it a new one."),
    b("media", "us", "Vietnam. Moon. A king in Tehran is furniture."),
    b("leader", "iran", "A new American. Same catalog. Keep buying. Najaf is a cassette, not a division.", "shah"),
    b("street", "iran", "The tapes from Najaf are better radio than the court. You are not listening.", "shah"),
  ],
  us: [
    {
      id: "us-sit-nixon",
      label: "Sit the presidency",
      summary: "Vietnam is the file. Iran is the pillar you will need later.",
      kind: "walk",
      historical: true,
      deltas: { my_party: 4 },
    },
  ],
  iran: [
    {
      id: "ir-nixon-next",
      label: "Keep buying",
      summary: "A new American. Same catalog.",
      kind: "walk",
      historical: true,
      face: "shah",
      deltas: { leader: 4, cia: 4 },
    },
  ],
  next: "weapons-1972",
  clocksOn: false,
});

const pipeline1975 = play({
  id: "pipeline-1975",
  year: 1975,
  yearLabel: "1975",
  title: "The pipeline",
  era: "shah",
  situationUs:
    "Nixon's check is still cashing. Congress wants a veto window. Kissinger says keep selling. Vietnam is over. You are busy not being Nixon.\n\nThe king is the largest buyer in the developing world.",
  situationIran:
    "The catalog is still open. The oil is still paying. Congress is restless. The villages are still the villages.\n\nYou can keep buying, or you can spend it where the tapes from Najaf already live.",
  referee: [
    "LT: Ford keeps Nixon's blank check. Congress writes a 30-day veto into arms sales. The Shah's orders still clear. 1974-76 is the peak of the pipeline.",
    "IT: Hinterland vs weapons is the same fork as 1972. If 1972 already spent on the villages, this card is a next that says the pipeline is still the policy.",
  ],
  al: [
    {
      id: "al-slow-pipeline",
      title: "Slow the pipeline",
      body: "Historically Ford keeps selling. Slowing it does not un-grow Tehran or un-exile Khomeini. Number tweak. Next.",
    },
  ],
  briefings: [
    b("cia", "us", "Keep selling. He is the pillar. Congress wants a hearing. Hearings are not a strategy."),
    b("my_party", "us", "You are not Nixon. Do not look like his arms salesman. Also do not lose the policeman."),
    b("opposing_party", "us", "If he keeps the pipeline we will call it Nixon without Nixon. If he slows it we will call it abandoning an ally."),
    b("media", "us", "Vietnam is over. An arms invoice to a king is a process story until a helicopter photographs."),
    b("leader", "iran", "Keep buying. The oil pays. The army is the throne. The villages can wait.", "shah"),
    b("street", "iran", "Clinics. Roads. The F-14 does not irrigate. Najaf already said this.", "shah"),
  ],
  us: [
    {
      id: "us-keep-selling",
      label: "Keep selling",
      summary: "The check is still cashing. Kissinger says so.",
      kind: "hard",
      historical: true,
      deltas: { cia: 6, saudis: 4, my_party: -4, liberals: 4 },
    },
    {
      id: "us-slow-pipeline",
      label: "Slow the pipeline",
      summary: "Congress wants a window. Give them one.",
      kind: "soft",
      artisticLicense: "al-slow-pipeline",
      deltas: { my_party: 6, cia: -6, leader: -4 },
    },
  ],
  iran: [
    {
      id: "ir-keep-catalog",
      label: "Keep buying",
      summary: "The oil pays. The army is the throne.",
      kind: "hard",
      historical: true,
      face: "shah",
      deltas: { leader: 6, cia: 6, street: -6, liberals: 8 },
    },
    {
      id: "ir-villages-again",
      label: "Spend on the villages",
      summary: "The tapes already live there. Clinics before F-14s.",
      kind: "deal",
      face: "shah",
      flags: { hinterland_spent: true },
      deltas: { street: 10, leader: -8, cia: -6 },
    },
  ],
  next: "revolution-1979",
  clocksOn: false,
  sources: ["cfr-timeline", "nixon-twin-pillars"],
});

const robe1989 = play({
  id: "robe-1989",
  year: 1989,
  yearLabel: "1989",
  title: "The robe",
  era: "war",
  situationUs:
    "The jurist is dead. 3 June. You are Bush. A note is optional. The war ended last year. Saddam is still next door.\n\nThe letterhead in Tehran is about to put on the Imam's robe, or not.",
  situationIran:
    "The jurist is dead. They are offering you the guns. You have been the letterhead. The robe is the other plate.\n\nRafsanjani is already in the next room. The Guards are watching which chair you sit.",
  referee: [
    "LT: Khomeini dies 3 June 1989. The Assembly of Experts sits Khamenei as Leader. Rafsanjani sits the presidency. You never sit the turban.",
    "IT: The same man moves from letterhead to Imam plate. That is the 1989 fact. Remaining president is a 7-Eleven. Iran continues.",
  ],
  briefings: [
    b("cia", "us", "The jurist is dead. The letterhead is putting on the robe. Send a note or do not. Saddam is the live file."),
    b("my_party", "us", "Do not make a speech about a dead cleric. The Gulf is the file."),
    b("opposing_party", "us", "If he ignores the funeral we will call it cold. If he sends a note we will call it soft on theocracy."),
    b("media", "us", "A dead ayatollah photographs. A succession in Tehran is a process story."),
    b("irgc", "iran", "Take the robe. A letterhead who stays a letterhead is a smiling face. We replace smiling faces.", "khamenei"),
    b("leader", "iran", "I am gone. The blessing has a successor. Put it on.", "khamenei"),
    b("street", "iran", "Eight years of boys. Groceries. A new name on the wall does not feed us. Someone will sit.", "khamenei"),
  ],
  us: [
    {
      id: "us-note-robe",
      label: "Send a note",
      summary: "The jurist is dead. A sentence is cheap.",
      kind: "soft",
      historical: true,
      deltas: { europeans: 4, my_party: -2 },
    },
    {
      id: "us-no-note",
      label: "Do not send a note",
      summary: "Saddam is the live file.",
      kind: "walk",
      deltas: { my_party: 4, europeans: -4 },
    },
  ],
  iran: [
    {
      id: "ir-take-robe",
      label: "Take the robe",
      summary: "You were the letterhead. They are offering you the guns.",
      kind: "hard",
      historical: true,
      face: "khamenei",
      flags: { iran_face: "rafsanjani" },
      nextCard: "kuwait-1990",
      deltas: { irgc: 8, leader: 10, street: 2 },
    },
    {
      id: "ir-remain-letterhead",
      label: "Remain president",
      summary: "The robe is someone else's. You keep the stamp.",
      kind: "walk",
      face: "khamenei",
      flags: { iran_face: "rafsanjani", letterhead_generic: true },
      nextCard: "kuwait-1990",
      ...moral(
        "You retired. You wrote a book. You emigrated. You opened a convenience store with the proceeds. Someone else put on the robe. The next event is the same.",
      ),
      deltas: { irgc: -8, street: 6, europeans: 6 },
    },
  ],
  next: "kuwait-1990",
  clocksOn: false,
  factions: REVOLUTION,
});

const kuwait1990 = play({
  id: "kuwait-1990",
  year: 1990,
  yearLabel: "1990",
  title: "Kuwait",
  era: "war",
  branchPoint: true,
  situationUs:
    "2 August. Saddam takes Kuwait. The Saudis are on the phone. A coalition is easy. Baghdad is a later sentence.\n\nIran is sitting this out, or not. You fought him through a tilt. Now the world wants him out of a small rich country.",
  situationIran:
    "The man who gassed you has taken Kuwait. He is offering to split the Gulf. The hardliners want jihad against the Americans who just arrived.\n\nYou can stay out and watch your enemy get smashed for free. Joining him is a word you already used in Friday prayer.",
  referee: [
    "LT: Iraq invades Kuwait 2 August 1990. Iran condemns it, stays out, refuses Saddam's split. Bush stops at the border February 1991. Rafsanjani calls joining suicide.",
    "IT: Stay out is a war they win without fighting. Go to Baghdad is 2003 twelve years early. Side with Saddam is a grave.",
  ],
  al: [
    {
      id: "al-baghdad-1991",
      title: "Go to Baghdad",
      body: "Historically the coalition stops at the border. Going to Baghdad is Iraq 2003 with a 1991 date. Saddam is gone. Iran is the remaining problem. AL, not a prediction of a better Gulf.",
    },
  ],
  briefings: [
    b("cia", "us", "Kick him out of Kuwait. Leave him in Baghdad. Occupying Iraq is a country you do not have a government for."),
    b("my_party", "us", "This is the good war. A coalition. A villain. Do not drive to Baghdad and turn it into Vietnam."),
    b("opposing_party", "us", "If he stops at the border we will say he left a monster. If he goes to Baghdad we will say he started an occupation."),
    b("saudis", "us", "Get him out of Kuwait. Do not sit him in our laps as a martyr. We will pay. We will not go first into Baghdad."),
    b("europeans", "us", "The oil should move. A coalition is civilization. A march on Baghdad is a different century."),
    b("irgc", "iran", "The Americans are in the Gulf. That is the sermon. Saddam is a dog we already bit. Do not die for him.", "rafsanjani"),
    b("leader", "iran", "Stay out. He gassed us. Watch the coalition do what eight years did not. Joining him is suicide. I already said that.", "rafsanjani"),
    b("street", "iran", "Groceries. Reconstruction. Do not volunteer us for his next war.", "rafsanjani"),
  ],
  us: [
    {
      id: "us-stop-border",
      label: "Stop at the border",
      summary: "Kick him out of Kuwait. Leave him in Baghdad.",
      kind: "soft",
      historical: true,
      deltas: { my_party: 10, saudis: 10, europeans: 8, cia: 6, media: 8 },
    },
    {
      id: "us-go-baghdad",
      label: "Go to Baghdad",
      summary: "Finish the job. Occupy the capital.",
      kind: "hard",
      artisticLicense: "al-baghdad-1991",
      flags: { went_to_baghdad: true },
      deltas: { my_party: -6, media: 12, saudis: -8, europeans: -10, cia: 4 },
    },
  ],
  iran: [
    {
      id: "ir-stay-out-kuwait",
      label: "Stay out",
      summary: "Condemn the invasion. Refuse the split. Watch.",
      kind: "walk",
      historical: true,
      face: "rafsanjani",
      deltas: { irgc: 4, leader: 8, street: 8, europeans: 8, saudis: 6 },
    },
    {
      id: "ir-side-saddam",
      label: "Side with Saddam",
      summary: "The Americans are in the Gulf. That is the sermon.",
      kind: "hard",
      face: "rafsanjani",
      ending: "kuwait_grave",
      deltas: { irgc: -20, leader: -16, street: -14 },
    },
  ],
  next: "dual-containment-1993",
  clocksOn: false,
  factions: REVOLUTION,
});

const dual1993 = play({
  id: "dual-containment-1993",
  year: 1993,
  yearLabel: "1993",
  title: "Dual containment",
  era: "war",
  situationUs:
    "You are busy with the Balkans. The Gulf policy is contain Iraq and Iran. Same animal, two cages. ILSA is a later bill.\n\nTehran is rebuilding. Baghdad is in a box. You can name both, or pick one.",
  situationIran:
    "A new American. The policy is that you and Saddam are the same problem. Reconstruction is the file. The revolution can stay loud, or it can make money.",
  referee: [
    "LT: Clinton's dual containment, 1993. Iran-Libya Sanctions Act 1996. Both treated as hostile. Reconstruction in Tehran is Rafsanjani's pitch.",
    "IT: A next card that says we treated them as the same animal. The choice barely matters. The sentence does.",
  ],
  briefings: [
    b("cia", "us", "Contain both. Neither gets to be the policeman. The Balkans will eat the week."),
    b("my_party", "us", "You ran on the economy. Do not start a Gulf sermon. Sanctions are cheap."),
    b("opposing_party", "us", "If he names both we will say he has no policy. If he picks one we will say he went soft on the other."),
    b("irgc", "iran", "They put us in a cage with Saddam. Reconstruction is a sermon the bazaar likes. Missiles are ours.", "rafsanjani"),
    b("leader", "iran", "Rebuild. The war ate a generation. Loud is free. Money is not.", "rafsanjani"),
    b("street", "iran", "Groceries. Reconstruction. Do not pick a fight with a man who is busy in Sarajevo.", "rafsanjani"),
  ],
  us: [
    {
      id: "us-name-both",
      label: "Name both as the problem",
      summary: "Iraq and Iran. Two cages. The Balkans is the week.",
      kind: "sanction",
      historical: true,
      deltas: { my_party: 4, saudis: 6, europeans: -4 },
    },
    {
      id: "us-pick-one",
      label: "Pick one",
      summary: "Saddam is in a box. Tehran is a later file.",
      kind: "soft",
      deltas: { europeans: 6, saudis: -4, my_party: -4 },
    },
  ],
  iran: [
    {
      id: "ir-rebuild",
      label: "Rebuild",
      summary: "The war ate a generation. Money is the file.",
      kind: "deal",
      historical: true,
      face: "rafsanjani",
      deltas: { street: 8, irgc: -4, europeans: 6, leader: 4 },
    },
    {
      id: "ir-stay-loud",
      label: "Keep the revolution loud",
      summary: "Cages are a sermon. Answer it.",
      kind: "hard",
      face: "rafsanjani",
      deltas: { irgc: 8, street: -6, europeans: -6 },
    },
  ],
  next: "khobar-1996",
  clocksOn: false,
  factions: REVOLUTION,
});

const khobar1996 = play({
  id: "khobar-1996",
  year: 1996,
  yearLabel: "1996",
  title: "Khobar",
  era: "war",
  situationUs:
    "25 June. Dhahran. Nineteen airmen. The building is a hole. The file points at the IRGC and Saudi Hezbollah.\n\nYou said no stone unturned. A strike is a different sentence. The Saudis will not like either.",
  situationIran:
    "A building in Dhahran is a hole. Nineteen Americans. They will point at the Guards. You can deny, or you can own a shot you may not have ordered.",
  referee: [
    "LT: Khobar Towers, 25 June 1996, 19 US airmen. Clinton investigates, does not strike. The later US indictment names IRGC and Saudi Hezbollah.",
    "IT: Historical is investigate, do not bomb. A strike is AL. Both next.",
  ],
  al: [
    {
      id: "al-strike-khobar",
      title: "Strike Khobar",
      body: "Historically Clinton does not bomb. A strike photographs. It does not un-write 1997. AL.",
    },
  ],
  briefings: [
    b("cia", "us", "The file points at the Guards. The Saudis will not give you the room. Investigate. Do not start a war on a half-file."),
    b("my_party", "us", "Nineteen is a number. A cruise missile is a clip. The Balkans is still the week."),
    b("opposing_party", "us", "If he does not strike we will say no stone was turned. If he strikes we will say he started a war."),
    b("saudis", "us", "Our soil. Our investigation. Do not bomb from our sky and leave us the invoice."),
    b("irgc", "iran", "Deny. The Quds Force does not sit for portraits. A letterhead who owns this is a smiling face we replace.", "rafsanjani"),
    b("leader", "iran", "Deny. Reconstruction does not survive a confession.", "rafsanjani"),
    b("street", "iran", "A building in Dhahran does not feed us. Do not volunteer a war.", "rafsanjani"),
  ],
  us: [
    {
      id: "us-no-strike-khobar",
      label: "Do not strike",
      summary: "Investigate. Do not start a war on a half-file.",
      kind: "walk",
      historical: true,
      deltas: { my_party: -6, cia: 4, saudis: 6, media: -6 },
    },
    {
      id: "us-strike-khobar",
      label: "Strike",
      summary: "Nineteen airmen. Answer the hole.",
      kind: "bomb",
      artisticLicense: "al-strike-khobar",
      deltas: { my_party: 8, media: 10, saudis: -10, irgc: 8 },
    },
  ],
  iran: [
    {
      id: "ir-deny-khobar",
      label: "Deny",
      summary: "A hole in Dhahran is not a confession.",
      kind: "soft",
      historical: true,
      face: "rafsanjani",
      deltas: { irgc: 6, europeans: -4, leader: 4 },
    },
    {
      id: "ir-own-khobar",
      label: "Own it",
      summary: "The Guards had a shot. Say so.",
      kind: "hard",
      face: "rafsanjani",
      deltas: { irgc: -8, street: -6, europeans: -10, media: 8 },
    },
  ],
  next: "wall-1997",
  clocksOn: false,
  factions: REVOLUTION,
});

const wall1997 = play({
  id: "wall-1997",
  year: 1997,
  yearLabel: "1997",
  title: "The wall",
  era: "street",
  situationUs:
    "Khatami sits. CNN. Dialogue of civilizations. Albright can wait at the UN. His minister may not come.\n\nYou can offer the handshake, or stay behind the wall. The Imam still has the guns.",
  situationIran:
    "You sit. The street liked the surprise. CNN wants a conversation between peoples. The Secretary of State wants a government. The Imam has the guns.\n\nPeople to people is allowed. A handshake with the Great Satan is a later file.",
  referee: [
    "LT: Khatami wins 1997. CNN interview January 1998. Albright waits. His minister does not come. March 2000 she apologizes for 1953.",
    "IT: The Imam still has the guns. Meet-the-Secretary is AL. Then next.",
  ],
  al: [
    {
      id: "al-handshake",
      title: "Meet the Secretary",
      body: "Historically the minister does not come. A handshake does not move the Imam. Number tweak. Next.",
    },
  ],
  briefings: [
    b("cia", "us", "Offer the handshake. Do not expect a government. The jurist still vetoes. People to people is the most you get."),
    b("my_party", "us", "A smiling cleric photographs. Do not look like you forgot Khobar."),
    b("europeans", "us", "Talk. Trade. The wall of mistrust is a phrase we already like."),
    b("irgc", "iran", "CNN is a sermon. A handshake with the Secretary is a smiling face. We replace smiling faces.", "rafsanjani"),
    b("leader", "iran", "People to people. Not government to government. The guns stay here.", "rafsanjani"),
    b("street", "iran", "A conversation photographs. Groceries do not care whose hand you did not shake.", "rafsanjani"),
  ],
  us: [
    {
      id: "us-offer-handshake",
      label: "Offer the handshake",
      summary: "CNN. A wall of mistrust. Wait at the UN.",
      kind: "deal",
      historical: true,
      deltas: { europeans: 8, my_party: -4, media: 6 },
    },
    {
      id: "us-stay-wall",
      label: "Stay behind the wall",
      summary: "Khobar is still a hole. Do not forget it.",
      kind: "walk",
      deltas: { my_party: 6, europeans: -6 },
    },
  ],
  iran: [
    {
      id: "ir-cnn",
      label: "Talk to the people",
      summary: "CNN. Peoples, not governments. The Imam keeps the guns.",
      kind: "soft",
      historical: true,
      face: "rafsanjani",
      flags: { iran_face: "khatami" },
      deltas: { street: 8, europeans: 8, irgc: -6, media: 8 },
    },
    {
      id: "ir-meet-secretary",
      label: "Meet the Secretary",
      summary: "A government handshake. The wall comes down.",
      kind: "deal",
      face: "rafsanjani",
      flags: { iran_face: "khatami" },
      artisticLicense: "al-handshake",
      deltas: { europeans: 10, irgc: -12, street: 4, media: 10 },
    },
  ],
  next: "natanz-2002",
  clocksOn: false,
  factions: REVOLUTION,
});

const natanz2002 = play({
  id: "natanz-2002",
  year: 2002,
  yearLabel: "2002",
  title: "Natanz",
  era: "nuclear",
  situationUs:
    "The MEK dumps Natanz. You have Afghanistan. You are about to have Iraq. The axis of evil already includes Iran.\n\nA Swiss fax is coming. A grand bargain: nukes, proxies, recognition. You can take it, or you can bin it.",
  situationIran:
    "Natanz is in the open. The Americans put you on a list with Iraq and North Korea. A fax through Bern can offer everything: the program, the proxies, a handshake.\n\nYou can keep spinning, or you can pause and see if they mean it.",
  referee: [
    "LT: August 2002 Natanz is revealed. January 2002 axis of evil. 2003 Swiss fax offers a grand bargain. It dies.",
    "IT: The cup taught the Guards never to fight fair. Enrichment is how they keep the lesson. Pause is AL.",
  ],
  al: [
    {
      id: "al-take-fax",
      title: "Take the fax",
      body: "Historically the fax dies. Taking it is the missing father of the JCPOA twelve years early. AL. The sprint still knows how to spin.",
    },
  ],
  briefings: [
    b("cia", "us", "Natanz is a plant. The fax is a menu. Bin it and they sprint. Take it and you sit with the people who said Death to America last week."),
    b("my_party", "us", "Axis of evil is the line. A fax from a Swiss ambassador is not a surrender you can sell."),
    b("opposing_party", "us", "If he bins the fax we will say he chose a war. If he takes it we will say he went soft on terror."),
    b("irgc", "iran", "Keep spinning. The cup said never a fair fight. A fax is a fair fight.", "khatami"),
    b("leader", "iran", "The guns are not yours to trade. A pause is a sermon I have not given.", "khatami"),
    b("street", "iran", "A plant in the desert does not feed us. A war with the Americans does not either.", "khatami"),
  ],
  us: [
    {
      id: "us-bin-fax",
      label: "Bin the fax",
      summary: "Axis of evil. Do not sit with last week's slogan.",
      kind: "hard",
      historical: true,
      deltas: { my_party: 8, cia: 4, europeans: -6, irgc: 6 },
    },
    {
      id: "us-take-fax",
      label: "Take the fax",
      summary: "Nukes, proxies, recognition. A menu. Read it.",
      kind: "deal",
      artisticLicense: "al-take-fax",
      deltas: { europeans: 10, my_party: -10, cia: -6, irgc: -8 },
    },
  ],
  iran: [
    {
      id: "ir-keep-spinning",
      label: "Keep spinning",
      summary: "The cup said never a fair fight. Enrichment is the lesson.",
      kind: "hard",
      historical: true,
      face: "khatami",
      deltas: { irgc: 8, leader: 6, europeans: -8, nuke_breakout_months: -4 },
    },
    {
      id: "ir-pause-natanz",
      label: "Pause",
      summary: "A fax is on the table. See if they mean it.",
      kind: "deal",
      face: "khatami",
      artisticLicense: "al-take-fax",
      deltas: { europeans: 10, irgc: -10, nuke_breakout_months: 8 },
    },
  ],
  next: "baghdad-2003",
  clocksOn: true,
  factions: ALL,
  sources: ["cfr-timeline", "nasr-roads"],
});

const baghdad2003 = play({
  id: "baghdad-2003",
  year: 2003,
  yearLabel: "2003",
  title: "Baghdad",
  era: "nuclear",
  situationUs:
    "You are going to Baghdad. Or you already went in 1991 and this is a rerun. Saddam is the statue. Iran is watching.\n\nThe Guards will inherit the pieces. You can take the capital, or stop at the border again.",
  situationIran:
    "The Americans are taking the man who gassed you. For free. The pieces of Iraq will be Shiite, or they will be chaos.\n\nYou can watch, or you can send the militias now.",
  referee: [
    "LT: March 2003 the US takes Baghdad. Iran watches, then the militias harvest the pieces. Historical Iran in 2003 is watch, then later send.",
    "IT: The Guards inherit Iraq. A tutorial stop. Both buttons next.",
  ],
  briefings: [
    b("cia", "us", "Take Baghdad. The statue falls. The government is the hard part. Iran will smile in the rubble."),
    b("my_party", "us", "The good war was 1991. This one photographs as a statue. Do not look like you have no plan for Monday."),
    b("saudis", "us", "Get Saddam. Do not hand Baghdad to the Guards. We will not go first."),
    b("irgc", "iran", "Watch. Then the militias. Iraq is a file we have waited twenty years to open.", "khatami"),
    b("leader", "iran", "The enemy of the man who gassed us is not a friend. Watch. Do not volunteer a war.", "khatami"),
    b("street", "iran", "A statue falling in Baghdad photographs. Groceries do not.", "khatami"),
  ],
  us: [
    {
      id: "us-take-baghdad",
      label: "Take Baghdad",
      summary: "The statue. Then Monday.",
      kind: "hard",
      historical: true,
      deltas: { my_party: 6, media: 12, saudis: 4, europeans: -8, irgc: 8 },
    },
    {
      id: "us-stop-again",
      label: "Stop at the border again",
      summary: "Kuwait was enough. Occupations are a later war.",
      kind: "walk",
      deltas: { europeans: 8, my_party: -8, cia: -6 },
    },
  ],
  iran: [
    {
      id: "ir-watch-baghdad",
      label: "Watch",
      summary: "The man who gassed you falls. The pieces can wait.",
      kind: "walk",
      historical: true,
      face: "khatami",
      deltas: { irgc: 6, leader: 4, street: 4 },
    },
    {
      id: "ir-send-militias",
      label: "Send the militias now",
      summary: "The pieces are Shiite if you pick them up.",
      kind: "hard",
      face: "khatami",
      deltas: { irgc: 12, europeans: -6, saudis: -8, media: 8 },
    },
  ],
  next: "myth-2005",
  clocksOn: true,
  factions: ALL,
});

const myth2005 = play({
  id: "myth-2005",
  year: 2005,
  yearLabel: "2005",
  title: "The myth",
  era: "nuclear",
  situationUs:
    "He sits. October: wipe Israel off the map. December: the Holocaust is a myth, put Israel in Alaska. Enrichment is the file.\n\nYou can condemn, or you can ignore. Both next. The tutorial is the sentence.",
  situationIran:
    "You sit. The street liked the surprise. October wants a slogan about Israel. December wants a sentence about the Holocaust.\n\nYou can say it. The Europeans will choke. The Guards will love the noise. You can also not.",
  referee: [
    "LT: Ahmadinejad sits 2005. October, wipe Israel off the map. December, the Holocaust is a myth, move Israel to Europe or Alaska. Enrichment accelerates.",
    "IT: Both buttons next. The US choice does not matter. The sentence does. Remind people.",
  ],
  briefings: [
    b("cia", "us", "Condemn. The sentence is the policy. Enrichment is the file. Do not pretend they are separate."),
    b("my_party", "us", "A Holocaust denier with centrifuges is a clip. Use it."),
    b("europeans", "us", "Condemn. We have a resolution. We would also like the oil to move."),
    b("irgc", "iran", "Say it. The West already hates us. A slogan is cheap. Spinning is the file.", "khatami"),
    b("leader", "iran", "The guns are not a CNN interview. A slogan is allowed. A bomb is not, yet.", "khatami"),
    b("street", "iran", "A slogan does not feed us. A hearing in New York does not either.", "khatami"),
  ],
  us: [
    {
      id: "us-condemn-myth",
      label: "Condemn",
      summary: "A Holocaust denier with centrifuges is the sentence.",
      kind: "hard",
      historical: true,
      deltas: { europeans: 6, my_party: 6, media: 8, saudis: 4 },
    },
    {
      id: "us-ignore-myth",
      label: "Ignore",
      summary: "Enrichment is the file. Slogans are radio.",
      kind: "walk",
      deltas: { europeans: -6, my_party: -4, media: -4 },
    },
  ],
  iran: [
    {
      id: "ir-say-myth",
      label: "Say it",
      summary: "Wipe it off the map. The Holocaust is a myth. Put them in Alaska.",
      kind: "hard",
      historical: true,
      face: "khatami",
      flags: { iran_face: "ahmadinejad" },
      deltas: { irgc: 10, europeans: -14, media: 12, street: 4, leader: 6 },
    },
    {
      id: "ir-dont-say-myth",
      label: "Do not say it",
      summary: "Spin. Leave the slogan on the desk.",
      kind: "soft",
      face: "khatami",
      flags: { iran_face: "ahmadinejad" },
      deltas: { europeans: 6, irgc: -6, media: -6 },
    },
  ],
  next: "green-2009",
  clocksOn: true,
  factions: ALL,
});

const green2009 = play({
  id: "green-2009",
  year: 2009,
  yearLabel: "2009",
  title: "Green",
  era: "street",
  situationUs:
    "A stolen election. The street fills. The Basij empty it. Unclench your fist was the line.\n\nYou can not own the street, or you can. The liberals clock was already spent in 1979.",
  situationIran:
    "The count is a problem. The street is green. The Basij are ready.\n\nYou can steal it and crush it, or you can count the votes. Counting is a 7-Eleven. Iran continues.",
  referee: [
    "LT: June 2009 Ahmadinejad is declared the winner. The Green Movement fills the street. The Basij empty it. Obama does not own the square.",
    "IT: A stolen election is not a barracks. Count-the-votes retires you. The program does not pause.",
  ],
  al: [
    {
      id: "al-own-green",
      title: "Own the street",
      body: "Historically Washington does not own the square. Owning it photographs. It does not grow a government. AL.",
    },
  ],
  briefings: [
    b("cia", "us", "Do not own the street. We do not have a government in that square. A statement is the most that does not bounce."),
    b("my_party", "us", "Unclench your fist was the line. A stolen election photographs. Do not look like you picked a side you cannot arm."),
    b("europeans", "us", "Condemn the crackdown. Do not start a war of statements you cannot cash."),
    b("irgc", "iran", "Steal it. Crush it. A letterhead who counts is a smiling face.", "ahmadinejad"),
    b("leader", "iran", "The vote is a blessing I already gave. The street is not a government.", "ahmadinejad"),
    b("street", "iran", "Where is my vote. The green is the square. The Basij are the answer you already picked.", "ahmadinejad"),
  ],
  us: [
    {
      id: "us-not-own-green",
      label: "Do not own the street",
      summary: "A statement. Not a government in that square.",
      kind: "walk",
      historical: true,
      deltas: { europeans: 4, my_party: -4, media: -6, street: -4 },
    },
    {
      id: "us-own-green",
      label: "Own the street",
      summary: "The square is green. Say so like it is yours.",
      kind: "hard",
      artisticLicense: "al-own-green",
      deltas: { media: 10, europeans: 6, irgc: 8, my_party: -6 },
    },
  ],
  iran: [
    {
      id: "ir-crush-green",
      label: "Steal it and crush it",
      summary: "The Basij empty the square. The count already happened.",
      kind: "hard",
      historical: true,
      face: "ahmadinejad",
      deltas: { irgc: 12, leader: 8, street: -16, europeans: -8, liberals: -10 },
    },
    {
      id: "ir-count-green",
      label: "Count the votes",
      summary: "The square is green. The count is the job.",
      kind: "walk",
      face: "ahmadinejad",
      flags: { letterhead_generic: true },
      ...moral(
        "You counted. You lost the building. You retired, wrote a book, emigrated, opened a convenience store. The Guards kept the program. Iran continues on.",
      ),
      deltas: { street: 10, irgc: -12, europeans: 8 },
    },
  ],
  next: "stuxnet-2010",
  clocksOn: true,
  factions: ALL,
});

const stuxnet2010 = play({
  id: "stuxnet-2010",
  year: 2010,
  yearLabel: "2010",
  title: "Stuxnet",
  era: "nuclear",
  wileyJoos: true,
  situationUs:
    "A worm. Olympic Games is the file name. Centrifuges at Natanz die. It buys months.\n\nYou can let it run, or you can bomb instead. Bombing is the real fork.",
  situationIran:
    "The machines are dying. Someone is in the plant who is not you. Keep spinning, or pause and look at the floor.\n\nThe radio will call it the usual suspects. The floor does not care about radio.",
  referee: [
    "LT: Stuxnet hits Natanz, 2007-2010. Olympic Games. Centrifuges die. Buys months. Does not buy a government.",
    "IT: Sabotage is not regime change. Bomb instead is the fork. Wiley Joos on.",
  ],
  al: [
    {
      id: "al-bomb-stuxnet",
      title: "Bomb instead",
      body: "Historically the worm runs. A bomb photographs a plant. It does not end the program. AL.",
    },
  ],
  briefings: [
    b("cia", "us", "Let the worm run. A bomb is a night you have to own. Months are what this buys. Not a government."),
    b("my_party", "us", "A worm does not photograph. A crater does. The caucus likes craters until the invoice."),
    b("irgc", "iran", "Keep spinning. The machines die, you build more. A pause is a smiling face.", "ahmadinejad"),
    b("leader", "iran", "The program does not pause for a virus. The blessing is the spin.", "ahmadinejad"),
    b("street", "iran", "A worm in a desert plant does not feed us. A bomb would.", "ahmadinejad"),
  ],
  us: [
    {
      id: "us-worm-run",
      label: "Let the worm run",
      summary: "Months. Not a government.",
      kind: "sabotage",
      historical: true,
      deltas: { cia: 10, my_party: 4, irgc: 4, nuke_breakout_months: 6 },
    },
    {
      id: "us-bomb-natanz",
      label: "Bomb instead",
      summary: "A crater. A night you have to own.",
      kind: "bomb",
      artisticLicense: "al-bomb-stuxnet",
      deltas: { media: 12, my_party: 6, irgc: 10, europeans: -8, nuke_breakout_months: 4 },
    },
  ],
  iran: [
    {
      id: "ir-keep-spin-stux",
      label: "Keep spinning",
      summary: "The machines die. You build more.",
      kind: "hard",
      historical: true,
      face: "ahmadinejad",
      deltas: { irgc: 6, leader: 4, nuke_breakout_months: -2 },
    },
    {
      id: "ir-pause-stux",
      label: "Pause",
      summary: "Look at the floor. The radio can wait.",
      kind: "soft",
      face: "ahmadinejad",
      deltas: { irgc: -6, europeans: 4, nuke_breakout_months: 4 },
    },
  ],
  next: "jcpoa-2015",
  clocksOn: true,
  factions: ALL,
  sources: ["stuxnet-wiki", "cfr-timeline"],
});

const jcpoa2015 = play({
  id: "jcpoa-2015",
  year: 2015,
  yearLabel: "2015",
  title: "The deal",
  era: "nuclear",
  situationUs:
    "Kerry, Zarif, Moniz, Salehi. Clinton set the table and left. Limits for frozen cash. A breakout clock that is a number in a brief.\n\nYou can sign, or you can walk. Walking still nexts. The clock is just worse.",
  situationIran:
    "The Imam allowed this and will brake everything else. The Guards hate it and will obey. Limits for frozen cash.\n\nYou can accept, or you can keep spinning. Keep spinning is a worse clock, not a grave.",
  referee: [
    "LT: 14 July 2015 JCPOA. Kerry, not Clinton. She left State 1 February 2013. Rouhani sits. Khamenei allows the deal and then brakes the rest. IRGC hates it and obeys.",
    "IT: Walk still nexts. The 2018 leave is cheaper to write if you already walked. History signs.",
  ],
  briefings: [
    b("cia", "us", "Sign. Inspections. Months. It is not a surrender of the proxies. It is a number on a centrifuge."),
    b("my_party", "us", "A deal photographs as a handshake with Death to America. Sell the inspections, not the smile."),
    b("opposing_party", "us", "Worst deal ever is already written. If he walks we will say he had no plan."),
    b("europeans", "us", "Sign. Trade. The oil should move. We have been waiting since 2003."),
    b("irgc", "iran", "Hate it. Obey. The Imam said so. The battlefield is still ours. The cash is theirs for now.", "ahmadinejad"),
    b("leader", "iran", "I allowed this. Import nothing from the Americans. The guns stay here. You stamp.", "ahmadinejad"),
    b("street", "iran", "Frozen cash. Groceries. A deal that feeds us is a deal. Do not be a slogan.", "ahmadinejad"),
  ],
  us: [
    {
      id: "us-sign-jcpoa",
      label: "Sign",
      summary: "Limits for frozen cash. Inspections. Kerry's banquet.",
      kind: "deal",
      historical: true,
      deltas: { europeans: 12, my_party: -8, opposing_party: 10, cia: 6, nuke_breakout_months: 12 },
    },
    {
      id: "us-walk-jcpoa",
      label: "Walk",
      summary: "No handshake. Sanctions stay. The clock stays short.",
      kind: "walk",
      deltas: { my_party: 8, europeans: -12, nuke_breakout_months: -4 },
    },
  ],
  iran: [
    {
      id: "ir-accept-jcpoa",
      label: "Accept the limits",
      summary: "The Imam allowed this. The Guards will obey. You stamp.",
      kind: "deal",
      historical: true,
      face: "ahmadinejad",
      flags: { iran_face: "rouhani" },
      deltas: { street: 10, europeans: 12, irgc: -8, hard_currency: 16, nuke_breakout_months: 12 },
    },
    {
      id: "ir-keep-spin-jcpoa",
      label: "Keep spinning",
      summary: "Limits are a fair fight. The cup said never.",
      kind: "hard",
      face: "ahmadinejad",
      flags: { iran_face: "rouhani" },
      deltas: { irgc: 10, europeans: -12, street: -8, nuke_breakout_months: -6 },
    },
  ],
  next: "white-wednesdays-2017",
  clocksOn: true,
  factions: ALL,
  sources: ["cfr-timeline", "ap-nuke-timeline"],
});

const whiteWed2017 = play({
  id: "white-wednesdays-2017",
  year: 2017,
  yearLabel: "2017",
  title: "White Wednesdays",
  era: "street",
  situationUs:
    "Women, white headscarves, Instagram. Compulsory hijab is still the law. You can tweet, or you can do nothing.\n\nA next card. Do not collapse this into 2022.",
  situationIran:
    "Women posting unveiled. Arrests follow. Compulsory hijab is still the law.\n\nYou can arrest, or you can let them post. Both next. 2022 is a later square.",
  referee: [
    "LT: 2017 White Wednesdays. Women post unveiled. Arrests follow. Compulsory hijab remains the law.",
    "IT: Do not collapse this into Mahsa. It is its own year. A next card.",
  ],
  briefings: [
    b("cia", "us", "A tweet is the most that does not bounce. This is not 2009. It is not 2022 yet."),
    b("my_party", "us", "Women photographing their hair is a clip. Do not start a war of tweets you cannot cash."),
    b("irgc", "iran", "Arrest. The scarf is the law. A letterhead who lets them post is a smiling face.", "rouhani"),
    b("leader", "iran", "The law is the law. The street is not a government. You stamp the arrests.", "rouhani"),
    b("street", "iran", "A white scarf is not a barracks. Groceries are the week. The morality police are the bill.", "rouhani"),
  ],
  us: [
    {
      id: "us-tweet-white",
      label: "Tweet",
      summary: "A sentence. Not a barracks in that square.",
      kind: "soft",
      historical: true,
      deltas: { media: 6, my_party: 2, irgc: 2 },
    },
    {
      id: "us-nothing-white",
      label: "Do nothing",
      summary: "Compulsory hijab is still the law. 2022 is a later square.",
      kind: "walk",
      deltas: { media: -4 },
    },
  ],
  iran: [
    {
      id: "ir-arrest-white",
      label: "Arrest",
      summary: "The scarf is the law. Instagram is not a government.",
      kind: "hard",
      historical: true,
      face: "rouhani",
      deltas: { irgc: 8, street: -8, europeans: -6, liberals: -4 },
    },
    {
      id: "ir-let-post",
      label: "Let them post",
      summary: "A white scarf is not a barracks.",
      kind: "soft",
      face: "rouhani",
      deltas: { street: 6, irgc: -6, europeans: 6 },
    },
  ],
  next: "archive-2018",
  clocksOn: true,
  factions: ALL,
  sources: ["bbc-white-wed", "cfr-timeline"],
});

const archive2018 = play({
  id: "archive-2018",
  year: 2018,
  yearLabel: "2018",
  title: "The warehouse",
  era: "nuclear",
  wileyJoos: true,
  branchPoint: true,
  situationUs:
    "31 January, Shorabad. Mossad lifts half a ton of AMAD paper. Bibi has a slide show in April. The deal is still on the desk.\n\nYou can believe the files and leave, or you can stay. Staying does not skip the airport later.",
  situationIran:
    "A warehouse in Shorabad is empty. Half a ton of AMAD paper is in Tel Aviv. The Americans have not left the deal yet.\n\nYou can stay in the deal and wait for Europe. You can sprint tonight. Historical is patience.",
  referee: [
    "LT: 31 January 2018 Mossad lifts the archive. 30 April Netanyahu's slides. 8 May Trump leaves the JCPOA. Iran stays compliant about a year.",
    "IT: Sprint tonight is AL and a worse clock. Stay does not skip Soleimani. Wiley Joos on.",
  ],
  al: [
    {
      id: "al-stay-deal",
      title: "Stay in the deal",
      body: "Historically you leave. Staying does not un-write the Quds Force. The airport is a later card either way. AL.",
    },
    {
      id: "al-sprint-tonight",
      title: "Sprint tonight",
      body: "Historically they wait a year for Europe. Sprinting tonight is a worse clock. AL.",
    },
  ],
  briefings: [
    b("cia", "us", "The files are real AMAD-era work. How much stayed live after 2003 is DK. Leave if you must. Do not pretend the IAEA was the fool."),
    b("my_party", "us", "Worst deal ever is the line. The slides are a gift. Leave."),
    b("opposing_party", "us", "If he leaves we will say he lit the clock. If he stays we will say he ignored the warehouse."),
    b("europeans", "us", "Stay. The inspections are still the inspections. A slide show is not a snapback."),
    b("irgc", "iran", "The warehouse was a file. Call it a studio. Sprint if the Imam wants a clock. Waiting on Europe is a smiling face.", "rouhani"),
    b("leader", "iran", "Stay in the deal. Europe will save the cash. A sprint is a later sermon.", "rouhani"),
    b("street", "iran", "Frozen cash was groceries. A warehouse in Shorabad is not. Do not sprint us into a queue.", "rouhani"),
  ],
  us: [
    {
      id: "us-leave-jcpoa",
      label: "Leave the deal",
      summary: "Believe the files. Maximum pressure.",
      kind: "sanction",
      historical: true,
      flags: { us_left_jcpoa: true },
      deltas: { my_party: 10, europeans: -12, cia: 4, hard_currency: -10, nuke_breakout_months: -4 },
    },
    {
      id: "us-stay-jcpoa",
      label: "Stay in the deal",
      summary: "The IAEA still inspects. A slide show is not a snapback.",
      kind: "deal",
      artisticLicense: "al-stay-deal",
      deltas: { europeans: 8, my_party: -10, opposing_party: 8 },
    },
  ],
  iran: [
    {
      id: "ir-wait-europe",
      label: "Stay in the deal",
      summary: "Wait for Europe. The cash was the point.",
      kind: "deal",
      historical: true,
      face: "rouhani",
      deltas: { europeans: 6, irgc: -4, street: 4 },
    },
    {
      id: "ir-sprint-tonight",
      label: "Sprint tonight",
      summary: "The warehouse is empty. The clock is the answer.",
      kind: "hard",
      face: "rouhani",
      artisticLicense: "al-sprint-tonight",
      flags: { iran_sprinted: true },
      deltas: { irgc: 10, europeans: -10, nuke_breakout_months: -8 },
    },
  ],
  next: "bounce-2019",
  clocksOn: true,
  factions: ALL,
  sources: ["nyt-archive-raid", "cfr-timeline"],
});

const bounce2019 = play({
  id: "bounce-2019",
  year: 2019,
  yearLabel: "2019",
  title: "Europe bounced the check",
  era: "nuclear",
  branchPoint: true,
  situationUs:
    "One year to the day. INSTEX is a barter toy that never pays. Tehran is about to step off, or not.\n\nYou already left, or you did not. The clock is their button now.",
  situationIran:
    "One year. Europe bounced the check. INSTEX does not pay. The Imam will allow a step-off, or he will not.\n\nYou can start stepping off. You can keep the limits anyway. Keeping them is the successful path. The nuclear war cards go away. The Guards do not get a veto on that hold.",
  referee: [
    "LT: 8 May 2019, one year after the US left, Rouhani announces the step-off. 60-day clocks. Then 4.5 percent, then 20, then after Soleimani no limits, then 60 percent in 2021.",
    "IT: Keep the limits is the fork they did not take. No 60 percent, no Fordow as a crisis, no Twelve Days. Olive hold. AL. Soleimani, Mahsa, Oct 7 are not centrifuges. They live on the historical sprint, not on this hold.",
  ],
  al: [
    {
      id: "al-keep-limits",
      title: "Keep the limits",
      body: "Historically they step off. Keeping the limits is the successful path. The Americans walked. You did not. No Twelve Days. The Imam is still alive because you did not give them a nuclear photograph. AL.",
    },
  ],
  briefings: [
    b("cia", "us", "They waited a year. Europe bounced it. If they step off the clock gets short. If they keep the limits you got a gift you will not advertise."),
    b("my_party", "us", "Maximum pressure was the line. If they sprint, that is the proof. If they do not, do not say so."),
    b("europeans", "us", "INSTEX was the best we could do. Do not laugh at it in public. They are about to leave the limits because we failed."),
    b("irgc", "iran", "Step off. Europe is a bouncing check. A letterhead who keeps the limits is a smiling face. We do not get a veto if he holds. That is the game.", "rouhani"),
    b("leader", "iran", "I can allow the step-off. I can also watch you keep a deal the Americans walked out of. You stamp. I have the guns.", "rouhani"),
    b("street", "iran", "Europe did not pay. Groceries got worse. A sprint is a queue. A hold is a sentence they will not put on television.", "rouhani"),
  ],
  us: [
    {
      id: "us-watch-bounce",
      label: "Watch",
      summary: "The clock is their button now.",
      kind: "walk",
      historical: true,
      deltas: { cia: 4, europeans: -4 },
    },
    {
      id: "us-offer-back",
      label: "Offer a ladder",
      summary: "A sentence. Sanctions still on.",
      kind: "deal",
      deltas: { europeans: 6, my_party: -6 },
    },
  ],
  iran: [
    {
      id: "ir-step-off",
      label: "Start stepping off",
      summary: "Europe bounced the check. The limits were the cash.",
      kind: "hard",
      historical: true,
      face: "rouhani",
      flags: { iran_sprinted: true },
      nextCard: "hormuz-2019",
      deltas: { irgc: 10, leader: 6, europeans: -10, street: -6, nuke_breakout_months: -6 },
    },
    {
      id: "ir-keep-limits",
      label: "Keep the limits anyway",
      summary: "They walked. You did not. The clock stays a number.",
      kind: "deal",
      face: "rouhani",
      artisticLicense: "al-keep-limits",
      ending: "jcpoa_holds",
      deltas: { europeans: 12, street: 8, irgc: -12, leader: -4 },
    },
  ],
  next: "hormuz-2019",
  clocksOn: true,
  factions: ALL,
  sources: ["cfr-timeline"],
});

const soleimani2020 = play({
  id: "soleimani-2020",
  year: 2020,
  yearLabel: "2020",
  title: "The airport",
  era: "late",
  situationUs:
    "Baghdad airport. Quds Force. A drone is in the drawer.\n\nYou can kill him, or you can hold. Holding is a number tweak. Quds still has a face. Do not skip this because of a warehouse.",
  situationIran:
    "The airport is a hole. The reply is missiles. Then an airliner. Fakhrizadeh is a later night.\n\nYou can answer, or you can eat it. Historical is missiles, then the airliner.",
  referee: [
    "LT: 3 January 2020 a drone kills Soleimani. Iran missiles US bases. 8 January Iran shoots down Flight 752. Fakhrizadeh is killed later that year.",
    "IT: Direct fire is no longer deniable. Hold is a number tweak. The proxy file is still the main one.",
  ],
  al: [
    {
      id: "al-hold-soleimani",
      title: "Hold the shot",
      body: "Historically the drone flies. Holding leaves Quds a face. The proxies do not retire. AL.",
    },
  ],
  briefings: [
    b("cia", "us", "Take the shot. He is the file. The reply will be missiles, then a mistake they will call a mistake."),
    b("my_party", "us", "You ran on strength. A cancelled night is a gift to the other paper."),
    b("opposing_party", "us", "If he shoots we will call it a war. If he holds we will call it a bluff."),
    b("irgc", "iran", "Answer. Missiles. The airliner is a later night you will call a mistake. Eating it is a smiling face.", "rouhani"),
    b("leader", "iran", "The line is resistance. A hole at the airport is a sermon. Answer it.", "rouhani"),
    b("street", "iran", "A general is dead. An airliner would be us. Do not miss twice.", "rouhani"),
  ],
  us: [
    {
      id: "us-kill-soleimani",
      label: "Kill him",
      summary: "Baghdad airport. A drone. The file has a name.",
      kind: "bomb",
      historical: true,
      deltas: { my_party: 8, media: 12, irgc: 10, cia: 8, europeans: -6 },
    },
    {
      id: "us-hold-soleimani",
      label: "Hold the shot",
      summary: "Quds still has a face. The proxies do not retire.",
      kind: "walk",
      artisticLicense: "al-hold-soleimani",
      deltas: { my_party: -8, opposing_party: 6, irgc: -4 },
    },
  ],
  iran: [
    {
      id: "ir-missiles-752",
      label: "Missiles, then the airliner",
      summary: "Answer the airport. The sky is a later night.",
      kind: "hard",
      historical: true,
      face: "rouhani",
      deltas: { irgc: 10, leader: 6, street: -12, europeans: -10, media: 10 },
    },
    {
      id: "ir-eat-airport",
      label: "Eat it",
      summary: "A general is dead. A war is a bill.",
      kind: "soft",
      face: "rouhani",
      deltas: { irgc: -10, street: 6, europeans: 6 },
    },
  ],
  next: "unleave-2021",
  clocksOn: true,
  factions: ALL,
  sources: ["alj-2025", "cfr-timeline"],
});

const unleave2021 = play({
  id: "unleave-2021",
  year: 2021,
  yearLabel: "2021",
  title: "The un-leave",
  era: "late",
  situationUs:
    "You ran on taping the deal back together. Vienna. Proximity talks. Raisi sits in June and raises the price.\n\nYou can talk forever, or you can snap back in. Historical is the impasse. They are already at 60 percent.",
  situationIran:
    "You sit. The Americans want the deal they walked out of. 60 percent is already a photograph.\n\nYou can sprint, or you can talk. Talking is how you get paid for a clock you already lit.",
  referee: [
    "LT: Biden runs on rejoining. Vienna 2021-2022. Close in March 2022. Dies over who goes first, the IRGC listing, a guarantee the next Trump cannot walk, then Ukraine, then Mahsa. Raisi sits June 2021.",
    "IT: Historical Biden is talk forever. Rejoin is AL. Iran still sprints. This card only exists because they stepped off in 2019.",
  ],
  al: [
    {
      id: "al-snap-in",
      title: "Snap back in",
      body: "Historically there is no signature. Snapping in does not un-spin 60 percent. AL.",
    },
  ],
  briefings: [
    b("cia", "us", "Talk. They want the listing lifted and a promise you cannot cash. Do not sign a worse deal and call it Kerry."),
    b("my_party", "us", "You ran on this. A signature photographs. An impasse photographs as Trump's clock."),
    b("europeans", "us", "Talk. Please. The inspections are the only furniture left."),
    b("irgc", "iran", "Sprint. 60 percent is the photograph. Talking is how the letterhead begs.", "rouhani"),
    b("leader", "iran", "I allowed a deal once. They walked. The price is higher. You may talk. You may not give the listing away.", "rouhani"),
    b("street", "iran", "Sanctions are groceries. A talk in Vienna does not feed us until it does.", "rouhani"),
  ],
  us: [
    {
      id: "us-talk-forever",
      label: "Talk forever",
      summary: "Vienna. Proximity. No signature.",
      kind: "deal",
      historical: true,
      deltas: { europeans: 4, my_party: -6, cia: 2 },
    },
    {
      id: "us-snap-in",
      label: "Snap back in",
      summary: "Sign. Lift. Hope the next man cannot walk.",
      kind: "deal",
      artisticLicense: "al-snap-in",
      deltas: { europeans: 10, my_party: -12, opposing_party: 8, nuke_breakout_months: 6 },
    },
  ],
  iran: [
    {
      id: "ir-sprint-unleave",
      label: "Sprint",
      summary: "60 percent is already a photograph. Raise the price.",
      kind: "hard",
      historical: true,
      face: "rouhani",
      flags: { iran_face: "raisi" },
      deltas: { irgc: 8, leader: 6, europeans: -8, nuke_breakout_months: -6 },
    },
    {
      id: "ir-talk-unleave",
      label: "Talk",
      summary: "Vienna. Get paid for a clock you already lit.",
      kind: "deal",
      face: "rouhani",
      flags: { iran_face: "raisi" },
      deltas: { europeans: 6, irgc: -6, street: 4 },
    },
  ],
  next: "mahsa-2022",
  clocksOn: true,
  factions: ALL,
});

const mahsa2022 = play({
  id: "mahsa-2022",
  year: 2022,
  yearLabel: "2022",
  title: "Mahsa",
  era: "street",
  situationUs:
    "Mahsa Amini dies in morality-police custody. The street fills. Woman, Life, Freedom. Schoolgirls are poisoned in clusters later that year.\n\nYou can issue a statement, or you can own the street. The street is not a government. It was not in 1979 either.",
  situationIran:
    "A girl is dead. The street is in the square. Woman, Life, Freedom. The morality police are the bill.\n\nYou can crush it, or you can fire the morality police. Firing them is a 7-Eleven. Iran continues. School poisonings live in the after-copy so this is not a dead page.",
  referee: [
    "LT: September 2022 Mahsa Amini dies. Woman, Life, Freedom. The street fills. The state empties it. School poisonings 2022-23: who did it is DK. The state treated speech as the crime.",
    "IT: The street is not a government-in-waiting. Fire-the-police retires you. Iran continues.",
  ],
  al: [
    {
      id: "al-own-mahsa",
      title: "Own the street",
      body: "Historically a statement. Owning it photographs. It does not grow a barracks. AL.",
    },
  ],
  briefings: [
    b("cia", "us", "A statement. We do not have a government in that square. 1979 already taught that."),
    b("my_party", "us", "Woman, Life, Freedom photographs. Do not look like you picked a side you cannot arm."),
    b("europeans", "us", "Condemn. Sanctions on the morality police. Do not start a war of scarves."),
    b("irgc", "iran", "Crush it. The scarf is the law. A letterhead who fires the morality police is a smiling face.", "raisi"),
    b("leader", "iran", "The law is the law. The street is not a government. You stamp the arrests.", "raisi"),
    b("street", "iran", "Woman, Life, Freedom. A girl is dead. The Basij are the answer you already picked.", "raisi"),
  ],
  us: [
    {
      id: "us-statement-mahsa",
      label: "Issue a statement",
      summary: "The square is not a barracks you can arm.",
      kind: "soft",
      historical: true,
      deltas: { media: 6, europeans: 4, my_party: 2 },
    },
    {
      id: "us-own-mahsa",
      label: "Own the street",
      summary: "Woman, Life, Freedom. Say it like it is yours.",
      kind: "hard",
      artisticLicense: "al-own-mahsa",
      deltas: { media: 10, irgc: 6, my_party: -4 },
    },
  ],
  iran: [
    {
      id: "ir-crush-mahsa",
      label: "Crush it",
      summary: "The scarf is the law. The square empties.",
      kind: "hard",
      historical: true,
      face: "raisi",
      resultTitle: "The square empties",
      result:
        "Mahsa Amini. Woman, Life, Freedom. The Basij empty the square. Later that year schoolgirls are poisoned in clusters. Who did it is DK. The state treats speech as the crime. The street is not a government.",
      epilogue: true,
      deltas: { irgc: 10, leader: 6, street: -14, europeans: -8, liberals: -8 },
    },
    {
      id: "ir-fire-morality",
      label: "Fire the morality police",
      summary: "A girl is dead. The bill has a name.",
      kind: "walk",
      face: "raisi",
      flags: { letterhead_generic: true },
      ...moral(
        "You fired them. You retired, wrote a book, emigrated, opened a convenience store. The Guards kept the scarf. Schoolyards stayed a DK. Iran continues on.",
      ),
      deltas: { street: 12, irgc: -12, europeans: 8 },
    },
  ],
  next: "oct7-2023",
  clocksOn: true,
  factions: ALL,
  sources: ["cfr-timeline", "ohchr-poison", "stanford-poison"],
});

const oct72023 = play({
  id: "oct7-2023",
  year: 2023,
  yearLabel: "2023",
  title: "7 October",
  era: "late",
  situationUs:
    "Hamas. The deniability was the product. Iran's proxy file is no longer a rumor.\n\nYou can arm Israel and not make it your war, or you can go first.",
  situationIran:
    "The proxy layer just photographed. The deniability was the product.\n\nYou can keep the proxy layer, or you can shoot from Iran now. Historical is keep the layer. Direct fire is next year's card either way.",
  referee: [
    "LT: 7 October 2023 Hamas attacks Israel. Iran's proxy file is no longer a rumor.",
    "IT: Direct fire is the next card. The deniability was the product.",
  ],
  briefings: [
    b("cia", "us", "Arm Israel. Do not make it our war. The proxy layer is the point. Going first is a different century."),
    b("my_party", "us", "Hostages photograph. A US first shot photographs as a war. Arm them."),
    b("irgc", "iran", "Keep the layer. Direct fire is a later sermon. Deniability was the product we sold.", "raisi"),
    b("leader", "iran", "The guns are the proxies. Shooting from Iran is a later night.", "raisi"),
    b("street", "iran", "A war with Israel is a queue. Do not volunteer us from Tehran.", "raisi"),
  ],
  us: [
    {
      id: "us-arm-israel",
      label: "Arm Israel",
      summary: "Do not make it our war. The proxy layer is the point.",
      kind: "hard",
      historical: true,
      deltas: { my_party: 6, saudis: 6, europeans: 2, media: 8 },
    },
    {
      id: "us-go-first",
      label: "Go first",
      summary: "A first shot. A different century.",
      kind: "bomb",
      deltas: { media: 12, my_party: -8, europeans: -8, irgc: 8 },
    },
  ],
  iran: [
    {
      id: "ir-keep-layer",
      label: "Keep the proxy layer",
      summary: "The deniability was the product.",
      kind: "soft",
      historical: true,
      face: "raisi",
      deltas: { irgc: 6, leader: 4, europeans: -6 },
    },
    {
      id: "ir-shoot-now",
      label: "Shoot from Iran now",
      summary: "The layer just photographed. Own it.",
      kind: "hard",
      face: "raisi",
      deltas: { irgc: 10, media: 10, europeans: -10, street: -6 },
    },
  ],
  next: "direct-fire-2024",
  clocksOn: true,
  factions: ALL,
});

const directFire2024 = play({
  id: "direct-fire-2024",
  year: 2024,
  yearLabel: "2024",
  title: "Direct fire",
  era: "late",
  situationUs:
    "April. Iran fires from Iran. The proxy layer thins. You can help Israel shoot them down, or you can stay out.\n\nRaisi is still sitting. A helicopter is a later month.",
  situationIran:
    "You fire from Iran. April. The proxy layer thins. The Americans will help them shoot, or they will not.\n\nA helicopter is not on this desk yet.",
  referee: [
    "LT: April 2024 Iran fires from Iran. The US helps Israel shoot them down. Raisi dies 19 May in a helicopter. Pezeshkian sits July. October is a second wave in the after-copy.",
    "IT: Direct fire is a different game. Both buttons next. Then the sit card.",
  ],
  briefings: [
    b("cia", "us", "Help them shoot. Staying out photographs as a hole in the sky."),
    b("my_party", "us", "Incoming photographs. A US stay-out is a clip we do not want."),
    b("irgc", "iran", "Fire. The layer thinned itself on 7 October. Own the sky.", "raisi"),
    b("leader", "iran", "A shot from Iran is a sermon. You stamp. I have the guns.", "raisi"),
    b("street", "iran", "Incoming the other way would be us. Do not miss.", "raisi"),
  ],
  us: [
    {
      id: "us-help-shoot",
      label: "Help shoot them down",
      summary: "Incoming photographs. A hole in the sky is worse.",
      kind: "hard",
      historical: true,
      deltas: { my_party: 6, saudis: 6, media: 8, irgc: 4 },
    },
    {
      id: "us-stay-out-fire",
      label: "Stay out",
      summary: "Their sky. Their invoice.",
      kind: "walk",
      deltas: { my_party: -8, europeans: 4, media: -6 },
    },
  ],
  iran: [
    {
      id: "ir-fire-iran",
      label: "Fire from Iran",
      summary: "The layer thinned itself. Own the sky.",
      kind: "hard",
      historical: true,
      face: "raisi",
      deltas: { irgc: 10, leader: 6, media: 10, europeans: -8 },
    },
    {
      id: "ir-stay-proxies",
      label: "Stay with the proxies",
      summary: "Direct fire is a later night.",
      kind: "soft",
      face: "raisi",
      deltas: { irgc: -6, europeans: 4 },
    },
  ],
  next: "sit-pezeshkian-2024",
  clocksOn: true,
  factions: ALL,
});

const sitPezeshkian2024 = play({
  id: "sit-pezeshkian-2024",
  year: 2024,
  yearLabel: "2024",
  title: "Sit Pezeshkian",
  era: "late",
  situationUs:
    "A helicopter. Raisi is dead. A new letterhead sits. You are still Biden. The year still has a second wave of fire in it.\n\nSit the fact. The next war is next year's card.",
  situationIran:
    "A helicopter. The letterhead is dead. You sit. The Imam still has the guns.\n\nOctober will fire again. You stamp. You were not the war.",
  referee: [
    "LT: 19 May 2024 Raisi dies in a helicopter. Pezeshkian sits July. October 2024 is a second direct-fire wave.",
    "IT: A sit card. The face changes. The guns do not.",
  ],
  briefings: [
    b("cia", "us", "A helicopter is not a policy. The Imam is still the Imam. Next year is the plant."),
    b("my_party", "us", "Do not make a speech about a crash you did not cause."),
    b("irgc", "iran", "Sit. Stamp. The guns did not die in the helicopter.", "raisi"),
    b("leader", "iran", "You are the letterhead. I have the guns. October is a later night.", "raisi"),
    b("street", "iran", "A crash photographs. Groceries do not care whose name is on the stamp.", "raisi"),
  ],
  us: [
    {
      id: "us-sit-2024",
      label: "Note the crash",
      summary: "A helicopter is not a policy. The Imam is still sitting.",
      kind: "walk",
      historical: true,
      deltas: { media: 4 },
    },
  ],
  iran: [
    {
      id: "ir-sit-pezeshkian",
      label: "Sit the presidency",
      summary: "The letterhead died. You stamp. He has the guns.",
      kind: "walk",
      historical: true,
      face: "raisi",
      flags: { iran_face: "pezeshkian" },
      deltas: { leader: 4, street: 2 },
    },
  ],
  next: "twelve-days-2025",
  clocksOn: true,
  factions: ALL,
});

const twelveDays2025 = play({
  id: "twelve-days-2025",
  year: 2025,
  yearLabel: "2025",
  title: "Twelve days",
  era: "late",
  branchPoint: true,
  situationUs:
    "June. Israel is already in the sky. Fordow, Natanz, Isfahan are on the list.\n\nYou can hit them, or you can stay out of Israel's war. Staying out is a real fork. The plants either crater or they do not.",
  situationIran:
    "The plants are the target. Twelve days. You can absorb and strike back, or you can deal now.\n\nThe Imam still has the guns. You stamp.",
  referee: [
    "LT: June 2025, Twelve-Day War. US joins 22 June and hits Fordow, Natanz, Isfahan.",
    "IT: Stay out is a real fork. The nuclear sites either crater or they do not. Deal-now is not a grave. Next is 2026 either way.",
  ],
  al: [
    {
      id: "al-stay-twelve",
      title: "Stay out of Israel's war",
      body: "Historically the US joins. Staying out leaves the plants standing. 2026 is still on the desk. AL.",
    },
  ],
  briefings: [
    b("cia", "us", "Hit Fordow. A plant in a mountain does not wait. Staying out photographs as a hole you knew about."),
    b("my_party", "us", "You ran on strength. A cancelled night is a gift. If you shoot, shoot."),
    b("europeans", "us", "The oil should move. A crater is a night the insurance market dies."),
    b("irgc", "iran", "Absorb and strike. A deal now is a smiling face. The plants are the blessing.", "pezeshkian"),
    b("leader", "iran", "The plants are mine. You stamp a reply. A deal is a later sermon.", "pezeshkian"),
    b("street", "iran", "A crater is us. Groceries. Do not miss, and do not volunteer a forever war.", "pezeshkian"),
  ],
  us: [
    {
      id: "us-hit-fordow",
      label: "Hit Fordow",
      summary: "Natanz. Isfahan. The mountain. Join the twelve days.",
      kind: "bomb",
      historical: true,
      flags: { fordow_hit: true },
      deltas: { my_party: 8, media: 12, irgc: 10, europeans: -8, cia: 8, nuke_breakout_months: 8 },
    },
    {
      id: "us-stay-twelve",
      label: "Stay out of Israel's war",
      summary: "Their night. Their invoice. The plants stay standing.",
      kind: "walk",
      artisticLicense: "al-stay-twelve",
      deltas: { my_party: -10, europeans: 6, media: -6 },
    },
  ],
  iran: [
    {
      id: "ir-absorb-strike",
      label: "Absorb and strike back",
      summary: "The plants are the blessing. Answer the sky.",
      kind: "hard",
      historical: true,
      face: "pezeshkian",
      deltas: { irgc: 10, leader: 8, street: -10, europeans: -8 },
    },
    {
      id: "ir-deal-now",
      label: "Deal now",
      summary: "A crater is us. A memorandum is cheaper.",
      kind: "deal",
      face: "pezeshkian",
      deltas: { europeans: 8, street: 6, irgc: -8, leader: -4 },
    },
  ],
  next: "the-leader-2026",
  clocksOn: true,
  factions: ALL,
  sources: ["cfr-timeline", "alj-2025"],
});

const theLeader2026 = play({
  id: "the-leader-2026",
  year: 2026,
  yearLabel: "2026",
  title: "The Leader",
  era: "late",
  branchPoint: true,
  situationUs:
    "February. A campaign that can kill the Imam. Hormuz is a noose if they pull it.\n\nYou can run the campaign, then take the June memorandum. Or you can stop after Fordow and leave him alive. Historical is the campaign, then a ceasefire. This is an ending, not a letterhead gag.",
  situationIran:
    "The sky is already in the mountain. The Imam is the target. Hormuz is the lever.\n\nYou can squeeze the Strait and then take the memorandum, or you can keep the war. Keeping it is a grave. Dual plate dies with the Imam if they mean this night.",
  referee: [
    "LT: February 2026 US and Israel launch a campaign. Trump says it kills Khamenei. Iran retaliates, squeezes Hormuz. 14 June memorandum reopens the Strait.",
    "IT: Historical is the campaign then a ceasefire. Keep-the-war is a grave. Stop-after-Fordow leaves the Imam alive and the rail holding at a worse Natanz. This is an ending, not a letterhead gag.",
  ],
  al: [
    {
      id: "al-stop-fordow",
      title: "Stop after Fordow",
      body: "Historically the campaign kills the Imam. Stopping leaves him alive and the rail holding at a worse Natanz. AL.",
    },
  ],
  briefings: [
    b("cia", "us", "If you run this campaign the dual plate dies. A memorandum in June is the off-ramp. Stopping now leaves him alive."),
    b("my_party", "us", "You said the plants were gone. A living Imam is a clip that says they were not."),
    b("europeans", "us", "The oil should move. Hormuz is the file. A dead jurist is a century. A closed Strait is a week."),
    b("saudis", "us", "Do not light us. Do not look weak. We will not go first."),
    b("irgc", "iran", "Squeeze Hormuz. Then a memorandum if the Imam is a crater. Keeping the war after that is a letterhead we replace with a grave.", "pezeshkian"),
    b("leader", "iran", "I have the guns until I do not. You stamp a ceasefire if I am gone. You do not keep a war whose jurist is a crater.", "pezeshkian"),
    b("street", "iran", "Hormuz does not feed us. A memorandum does. Do not keep a war for a wall.", "pezeshkian"),
  ],
  us: [
    {
      id: "us-kill-imam",
      label: "Run the campaign",
      summary: "Then a memorandum. Hormuz reopens. The dual plate dies.",
      kind: "bomb",
      historical: true,
      ending: "the_leader",
      resultTitle: "The Leader is dead",
      result:
        "February 2026. The campaign kills Khamenei. Iran squeezes Hormuz. A June memorandum reopens the Strait. Dual plate dies with the Imam. History arrived. This is the end of the wired rail.",
      deltas: { my_party: 6, media: 14, europeans: -6, saudis: -4, irgc: 8 },
    },
    {
      id: "us-stop-fordow",
      label: "Stop after Fordow",
      summary: "Leave him alive. The rail holds at a worse Natanz.",
      kind: "walk",
      artisticLicense: "al-stop-fordow",
      ending: "none",
      resultTitle: "The plants are a crater. The Imam is not.",
      result:
        "You stopped. Fordow is a hole. The Imam is still the other plate. There is no later rail in this slice because history did not take this fork. Rail hold. AL.",
      deltas: { my_party: -8, europeans: 6 },
    },
  ],
  iran: [
    {
      id: "ir-hormuz-memo",
      label: "Squeeze Hormuz, then the memorandum",
      summary: "The noose. Then the off-ramp. The Imam may already be a crater.",
      kind: "deal",
      historical: true,
      face: "pezeshkian",
      ending: "the_leader",
      resultTitle: "The Leader is dead",
      result:
        "You squeezed the Strait. The June memorandum reopened it. The Imam is a crater. Dual plate dies with him. You were the letterhead. You were not the war. History arrived.",
      deltas: { irgc: 6, street: -8, oil_pain: 12, europeans: -6 },
    },
    {
      id: "ir-keep-war",
      label: "Keep the war",
      summary: "The blessing does not end on a memorandum.",
      kind: "hard",
      face: "pezeshkian",
      ending: "keep_the_war",
      deltas: { irgc: -16, leader: -14, street: -12 },
    },
  ],
  next: null,
  clocksOn: true,
  factions: ALL,
  sources: ["cfr-timeline", "alj-2025"],
});

export const LATE_CARDS: readonly Card[] = [
  sofa1964,
  sitNixon1969,
  pipeline1975,
  robe1989,
  kuwait1990,
  dual1993,
  khobar1996,
  wall1997,
  natanz2002,
  baghdad2003,
  myth2005,
  green2009,
  stuxnet2010,
  jcpoa2015,
  whiteWed2017,
  archive2018,
  bounce2019,
];

export const LATE_AFTER_HORMUZ: readonly Card[] = [
  soleimani2020,
  unleave2021,
  mahsa2022,
  oct72023,
  directFire2024,
  sitPezeshkian2024,
  twelveDays2025,
  theLeader2026,
];
