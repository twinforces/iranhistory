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
  /** Exact case. Short caps that would eat names: AL vs Al-Qaeda. */
  readonly caseSensitive?: boolean;
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
      "CIA and MI6 code name for a coup to remove Mossadegh and put the Shah in charge. In 1953 it is still a proposal on Eisenhower's desk, not a fact. Later files call it TPAJAX.",
  },
  {
    id: "cable",
    term: "cable",
    aliases: [
      "still a cable",
      "write a cable",
      "a cable",
      "the cable",
      "this is still a cable",
    ],
    definition:
      "An intelligence telegram. Classified, on a desk, waiting for a signature. Not a public speech. Not a fact until someone signs it.",
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
      "Asian allies defend themselves. America sells the weapons and holds the nuclear umbrella. In the Gulf that becomes Twin Pillars. The May 1972 Tehran visit is the blank check.",
  },
  {
    id: "twin-pillars",
    term: "Twin Pillars",
    aliases: ["Twin Pillars", "Twin pillars", "twin pillars"],
    definition:
      "Nixon's Gulf doctrine after Britain left east of Suez: Iran and Saudi Arabia as the two policemen. America sells the weapons and holds the nuclear umbrella. The May 1972 Tehran visit is the blank check. Not a building.",
  },
  {
    id: "east-of-suez",
    term: "east of Suez",
    aliases: ["east of Suez", "east-of-Suez"],
    definition:
      "Britain's 1971 withdrawal from bases east of the Suez Canal. The vacuum Nixon fills with Twin Pillars. Not a canal you sit.",
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
    aliases: ["IRGC", "the Guards", "The Guards", "Guards"],
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
    id: "johnson",
    term: "Lyndon Johnson",
    aliases: ["Lyndon Johnson", "Johnson"],
    definition:
      "Democrat. President of the United States, 1963 to 1969. Vietnam is why he barely looked at the Status of Forces bill. Two hundred million in aid is tied to it. Khomeini names it a document of slavery and gets a name.",
  },
  {
    id: "ford",
    term: "Gerald Ford",
    aliases: ["Gerald Ford", "Ford"],
    definition:
      "Republican. President of the United States, 1974 to 1977. He is not Nixon. The pipeline is still Nixon's check. A fifty-fifty mix is the 20/20 listen. History keeps selling.",
  },
  {
    id: "eagle-claw",
    term: "Eagle Claw",
    aliases: ["Eagle Claw", "Operation Eagle Claw", "Desert One"],
    definition:
      "The April 1980 rescue. Helicopters off the USS Nimitz toward a desert strip called Desert One. A sandstorm, a collision, eight Americans dead. The wreckage is left behind. The hostages are scattered. They are not freed.",
  },
  {
    id: "terrorism-list",
    term: "State Sponsors of Terrorism",
    aliases: [
      "State Sponsors of Terrorism",
      "terrorism list",
      "terrorist nation list",
      "state sponsors of terrorism",
    ],
    definition:
      "A State Department list from 1979. Being on it locks dual-use export licenses and US credits. Iraq is put on in 1979. Reagan takes Iraq off in February 1982 so the licenses, and Europe's chemistry, can move.",
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
  {
    id: "jcpoa",
    term: "Joint Comprehensive Plan of Action",
    aliases: [
      "Joint Comprehensive Plan of Action",
      "JCPOA",
    ],
    definition:
      "The 2015 nuclear bargain. Not a treaty: Obama did not have sixty-seven Senate votes. Iran may keep a civilian reactor. Missiles are outside the deal. Enrichment is supposed to stay low, watched, and capped. They promise. Frozen cash comes back, some of it on pallets because they cannot use dollars. The next president can tear it up with a speech.",
  },
  {
    id: "abraham-accords",
    term: "Abraham Accords",
    aliases: ["Abraham Accords"],
    definition:
      "2020. UAE and Bahrain recognize Israel, then Sudan and Morocco. No Palestinian state required. The US peels Arab capitals off the old boycott one at a time. Iran then has to drop Death to Israel or sit outside the new map.",
  },
  {
    id: "sofa",
    term: "Status of Forces",
    aliases: ["Status of Forces", "status-of-forces bill", "status-of-forces", "the SOFA", "SOFA"],
    definition:
      "1964. A bill that says American troops and advisors in Iran cannot be tried in an Iranian court. Two hundred million in military aid is tied to it. Khomeini calls it a document of slavery. The Shah exiles him. That is how the cleric gets a name.",
  },
  {
    id: "soleimani",
    term: "Qasem Soleimani",
    aliases: ["Qasem Soleimani", "Soleimani"],
    definition:
      "Commander of the Quds Force, the IRGC's foreign arm. The man who ran the proxy layer in Iraq, Syria, Lebanon, and Gaza. A US drone kills him at Baghdad airport on 3 January 2020.",
  },
  {
    id: "hamas",
    term: "Hamas",
    aliases: ["Hamas"],
    definition:
      "The Palestinian Islamist movement that runs Gaza. Iran's proxy file, with its own agenda. When a public Saudi-Israel courtship looks like the neighborhood is leaving, they shop for a sponsor.",
  },
  {
    id: "clip",
    term: "clip",
    aliases: ["a second clip", "second clip", "the clip", "a clip", "news clip"],
    definition:
      "News footage. A photograph that runs on television. A second clip is another disaster on the evening news, not a haircut.",
  },
  {
    id: "letterhead",
    term: "letterhead",
    aliases: ["the letterhead", "letterhead", "Human rights letterhead"],
    definition:
      "The civilian who stamps the paper. Bazargan, Banisadr, a president. He has a title. He does not have the guns. The Imam and the Guards do.",
  },
  {
    id: "barracks",
    term: "barracks",
    aliases: ["the barracks", "a barracks", "Marine barracks", "No barracks", "not a barracks"],
    definition:
      "Who has the guns. An army, a camp, a building that can hold a square. A statement is not a barracks. The Marine barracks in Beirut is also a literal building.",
  },
  {
    id: "square",
    term: "the square",
    aliases: ["the square", "that square", "their square", "The square"],
    definition:
      "The protest crowd. Students, workers, women in the street. They can fill a plaza. They cannot hold a government. 1979 taught that, then 2009, then 2022.",
  },
  {
    id: "nest-of-spies",
    term: "nest of spies",
    aliases: ["nest of spies"],
    definition:
      "What the students called the American embassy when they occupied it on 4 November 1979. They wanted the Shah and the files. Khomeini did not send them home.",
  },
  {
    id: "hinterland",
    term: "hinterland",
    aliases: ["the hinterland", "hinterland"],
    definition:
      "The villages outside Tehran. Roads, clinics, water. The Shah spent the oil on jets instead. If he spends it here, the square in 1979 stays thin.",
  },
  {
    id: "smiling-face",
    term: "smiling face",
    aliases: ["the smiling face", "smiling face", "smiling faces"],
    definition:
      "The civilian the Guards tolerate until they do not. Bazargan smiling on television. A president who thinks he runs a coalition. They replace smiling faces.",
  },
  {
    id: "exam",
    term: "the exam",
    aliases: ["the next exam", "the exam", "this exam"],
    definition:
      "The crisis that grades this presidency. For Carter it is the hostages. For Reagan it is Beirut, then the dark channel. The test, not a school.",
  },
  {
    id: "stamp",
    term: "stamp",
    aliases: ["the stamp", "You stamp", "stamp the", "Stamp the"],
    definition:
      "Sign the paper. Issue the order. The letterhead stamps. The guns belong to someone else.",
  },
  {
    id: "rail",
    term: "the rail",
    aliases: ["the rail", "The rail", "this rail", "their rails", "the rails"],
    definition:
      "Once set in motion, most of the players were locked into the outcome. Trains stay on their rails. Hindsight is 20/20. There are no time machines in real life. This sim is one. Can you find all the exits?",
  },
  {
    id: "chemistry",
    term: "the chemistry",
    aliases: ["the chemistry", "Europe's chemistry"],
    definition:
      "Chemical weapons precursors. Dual-use pesticide plants that are not pesticide plants. Mustard and nerve agent. Taking Iraq off the terrorism list is how the licenses, and Europe's sales, can move.",
  },
  {
    id: "furnace",
    term: "furnace",
    aliases: ["the furnace", "your furnace"],
    definition:
      "The Iran-Iraq war as a meat grinder. Keep it even so neither side wins. Hundreds of thousands dead. Not a boiler.",
  },
  {
    id: "dark-channel",
    term: "channel in the dark",
    aliases: [
      "channel in the dark",
      "a channel in the dark",
      "the later channel",
      "the dark channel",
    ],
    definition:
      "Iran-Contra. Missiles to Tehran through Israel, profit walked to the Nicaraguan Contras, hostages as the cover. Congress forbade the funding. The warehouse did it anyway.",
  },
  {
    id: "marines",
    term: "Marines",
    aliases: ["the Marines", "Marines"],
    definition:
      "US Marines in Beirut, 1982-1984. They landed after the Israeli invasion of Lebanon. 23 October 1983 a truck bomb hits their barracks. 241 dead. They go home in February 1984.",
  },
  {
    id: "blue-dogs",
    term: "Blue Dogs",
    aliases: ["Blue Dogs", "Blue Dog"],
    definition:
      "Conservative Democrats in the House. They can kill a president's domestic agenda if he spends the week on a foreign fight they do not want. Carter's people. They have the votes.",
  },
  {
    id: "quds",
    term: "Quds Force",
    aliases: ["Quds Force", "Quds"],
    definition:
      "The IRGC's foreign arm. Proxies in Iraq, Syria, Lebanon, Gaza. Soleimani ran it until a drone killed him at Baghdad airport.",
  },
  {
    id: "fordow",
    term: "Fordow",
    aliases: ["Fordow"],
    definition:
      "The enrichment plant inside a mountain near Qom. Buried so a normal bomb is an argument, not a fact. The 2025-26 campaign treats it as the hole that has to be real.",
  },
  {
    id: "natanz",
    term: "Natanz",
    aliases: ["Natanz"],
    definition:
      "Iran's main enrichment site. Revealed in 2002. Stuxnet hit it. The later sprints start from this floor.",
  },
  {
    id: "osirak",
    term: "Osirak",
    aliases: ["Osirak"],
    definition:
      "The French-built Iraqi reactor. Israel cratered it in June 1981. Iran's Beirut sermon still talks as if the plant is alive. The picture in the sermon does not care.",
  },
  {
    id: "basij",
    term: "Basij",
    aliases: ["the Basij", "Basij"],
    definition:
      "The volunteer militia under the Guards. They empty squares. Green 2009, Mahsa 2022. Clubs and motorcycles, not a regular army.",
  },
  {
    id: "artesh",
    term: "Artesh",
    aliases: ["Artesh", "the leftover army"],
    definition:
      "Iran's regular army, leftover from the Shah. The revolution built the Guards so it would not have to trust these officers. Banisadr trying to command it is a letterhead gag.",
  },
  {
    id: "hail-mary",
    term: "Hail Mary",
    aliases: ["Hail Mary"],
    definition:
      "A desperate last throw. For Carter in 1980: one more raid, one more channel, one more speech after Desert One already failed. The party will not roll it.",
  },
  {
    id: "robe",
    term: "the robe",
    aliases: ["the robe", "Take the robe"],
    definition:
      "The Supreme Leader's chair. Khomeini dies. Khamenei puts on the robe. You were the letterhead. They are offering you the guns.",
  },
  {
    id: "noose",
    term: "the noose",
    aliases: ["the noose"],
    definition:
      "Hormuz. Squeeze the Strait, insurance rates jump, tankers stop, the oil price is the rope. A lever, not a hanging.",
  },
  {
    id: "dual-use",
    term: "dual-use",
    aliases: ["dual-use", "dual use"],
    definition:
      "Civilian gear that also makes weapons. Pesticide plants that make mustard. Export licenses are the lock. The terrorism list is how you throw it.",
  },
  {
    id: "instex",
    term: "INSTEX",
    aliases: ["INSTEX"],
    definition:
      "Europe's 2019 special purpose vehicle to keep trading with Iran after Trump voided the JCPOA. It barely paid for anything. The check bounced.",
  },
  {
    id: "aumf",
    term: "AUMF",
    aliases: ["AUMF", "the authorization"],
    definition:
      "Authorization for Use of Military Force. The 2002 Iraq vote. The building tells a president it is not a suggestion. You take Baghdad.",
  },
  {
    id: "tow",
    term: "TOW missiles",
    aliases: ["TOW missiles", "TOW crate", "a TOW crate", "TOW"],
    definition:
      "Tube-launched, optically tracked, wire-guided anti-tank missiles. The 1985-86 dark channel sold them to Tehran, with HAWK anti-aircraft parts, for hostages and cash that walked to the Contras.",
  },
  {
    id: "hawk",
    term: "HAWK",
    aliases: ["HAWK parts", "HAWK"],
    definition:
      "US Hawk surface-to-air missiles, or their spare parts. The same dark channel as the TOWs. Iran still had the airframes from the catalog years. The hangars needed the parts.",
  },
  {
    id: "khobar",
    term: "Khobar Towers",
    aliases: ["Khobar Towers", "Khobar"],
    definition:
      "Dhahran, 25 June 1996. A truck bomb kills 19 US airmen. Clinton investigates and does not strike. The later US indictment names the IRGC and Saudi Hezbollah.",
  },
  {
    id: "stuxnet",
    term: "Stuxnet",
    aliases: ["Stuxnet", "Olympic Games"],
    definition:
      "A worm in the Natanz centrifuges, 2007-2010. Olympic Games is the file name. US and Israel, LT-to-IT. It buys months. It does not buy a government.",
  },
  {
    id: "amad",
    term: "AMAD",
    aliases: ["AMAD paper", "AMAD-era", "AMAD"],
    definition:
      "Iran's structured nuclear weapons work through 2003. The Shorabad warehouse is the paperwork Mossad lifts in 2018. How much stayed live after 2003 is DK.",
  },
  {
    id: "swiss-fax",
    term: "Swiss fax",
    aliases: ["Swiss ambassador's fax", "Swiss fax", "grand bargain"],
    definition:
      "2003. The Swiss ambassador in Tehran sends Washington a fax: Iran offers to talk about the nuclear program, the proxies, and recognition. It dies on the desk. The missing father of the later deal.",
  },
  {
    id: "mek",
    term: "MEK",
    aliases: ["the MEK", "MEK"],
    definition:
      "Mujahedin-e Khalq. Iranian opposition in exile. They dump Natanz in 2002. Nobody's favorite cousin.",
  },
  {
    id: "axis-of-evil",
    term: "axis of evil",
    aliases: ["axis of evil"],
    definition:
      "Bush's January 2002 line: Iraq, Iran, North Korea. Iran had just helped against the Taliban. The speech still names them.",
  },
  {
    id: "al-qaeda",
    term: "Al-Qaeda",
    aliases: ["Al-Qaeda"],
    definition:
      "The group that did 11 September. Fifteen of nineteen hijackers were Saudi. Not Iran. After that week they are the top of the US board.",
  },
  {
    id: "hindsight",
    term: "Hindsight is 20/20",
    aliases: ["Hindsight is 20/20", "hindsight is 20/20"],
    definition:
      "You can see the exits after the train has already gone. There are no time machines in real life. This sim is one.",
  },
  {
    id: "al-mark",
    term: "AL",
    aliases: ["AL.", "AL,", "AL"],
    caseSensitive: true,
    definition:
      "Artistic license. History did not do this. The button is labelled. The popup is required.",
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

const NEEDLES: { alias: string; id: string; caseSensitive: boolean }[] = GLOSSARY.flatMap((e) =>
  e.aliases.map((alias) => ({ alias, id: e.id, caseSensitive: Boolean(e.caseSensitive) })),
).sort((a, b) => b.alias.length - a.alias.length);

/** Split copy into plain text and glossary hits. Longest alias wins. */
export function linkify(text: string): GlossPart[] {
  const parts: GlossPart[] = [];
  let i = 0;
  while (i < text.length) {
    let hit: { alias: string; id: string; caseSensitive: boolean } | null = null;
    const slice = text.slice(i);
    for (const needle of NEEDLES) {
      if (slice.length < needle.alias.length) continue;
      const got = slice.slice(0, needle.alias.length);
      if (needle.caseSensitive) {
        if (got !== needle.alias) continue;
      } else if (got.toLowerCase() !== needle.alias.toLowerCase()) {
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
