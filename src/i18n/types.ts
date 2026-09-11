export type Locale = "en" | "fa";

export interface ChoiceFa {
  readonly label: string;
  readonly summary: string;
  readonly greyText?: string;
  readonly result?: string;
  readonly resultTitle?: string;
}

export interface BriefingFa {
  readonly rant: string;
  readonly closer?: string;
}

export interface LicenseFa {
  readonly title: string;
  readonly body: string;
}

export interface CardFa {
  readonly title: string;
  readonly titleUs?: string;
  readonly titleIran?: string;
  readonly situation?: string;
  readonly situationUs?: string;
  readonly situationIran?: string;
  readonly situationIranShah?: string;
  readonly situationIranBanisadr?: string;
  readonly situationIranKhamenei?: string;
  readonly actionPrompt?: string;
  readonly referee?: readonly string[];
  readonly briefings?: Readonly<Record<string, BriefingFa>>;
  readonly choices?: Readonly<Record<string, ChoiceFa>>;
  readonly licenses?: Readonly<Record<string, LicenseFa>>;
}

export interface LeaderFa {
  readonly youAre: string;
  readonly playing: string;
  readonly name: string;
  readonly role: string;
  readonly partyLabel?: string | null;
}

export interface EndingFa {
  readonly title: string;
  readonly body: string;
}
