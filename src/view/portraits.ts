import type { Chair, FactionId } from "../model/types.ts";

export const ADVISOR_PORTRAIT: Record<FactionId, string> = {
  irgc: "/advisors/irgc.jpg",
  leader: "/advisors/leader.jpg",
  street: "/advisors/street.jpg",
  my_party: "/advisors/my_party.jpg",
  opposing_party: "/advisors/opposing_party.jpg",
  media: "/advisors/media.jpg",
  cia: "/advisors/cia.jpg",
  saudis: "/advisors/saudis.jpg",
  europeans: "/advisors/europeans.jpg",
  china: "/advisors/china.jpg",
  venezuela: "/advisors/venezuela.jpg",
};

export const CHAIR_ART: Record<Chair, string> = {
  iran: "/art/chair-iran.jpg",
  us: "/art/chair-us.jpg",
};
