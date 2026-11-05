import type { Lang } from "../../i18n/LanguageContext";

const MONTHS: Record<string, number> = {
  jan: 1, fev: 2, feb: 2, mar: 3, abr: 4, apr: 4, mai: 5, may: 5, jun: 6,
  jul: 7, ago: 8, aug: 8, set: 9, sep: 9, out: 10, oct: 10, nov: 11, dez: 12, dec: 12,
};

const LABELS: Record<Lang, string[]> = {
  pt: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

export interface PostDate {
  /** ISO `YYYY-MM-DD` for `<time dateTime>`, or undefined when the source can't be parsed */
  iso?: string;
  /** Localized human label (falls back to the raw source string) */
  label: string;
}

/** Parses post dates such as "05 Fev 2026" and localizes them. */
export function formatPostDate(raw: string, lang: Lang): PostDate {
  const match = raw.trim().match(/^(\d{1,2})\s+([A-Za-zÀ-ú]{3})[A-Za-zÀ-ú.]*\s+(\d{4})$/);
  const month = match ? MONTHS[match[2].toLowerCase()] : undefined;
  if (!match || !month) return { label: raw };

  const day = match[1].padStart(2, "0");
  const year = match[3];
  const mm = String(month).padStart(2, "0");
  const name = LABELS[lang][month - 1];

  return {
    iso: `${year}-${mm}-${day}`,
    label: lang === "pt" ? `${day} ${name} ${year}` : `${name} ${day}, ${year}`,
  };
}
