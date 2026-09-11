const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function faDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)] ?? d);
}
