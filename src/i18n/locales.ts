export const locales = ["en", "pt-BR"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];

export function isLocale(candidate: string): candidate is Locale {
  return (locales as readonly string[]).includes(candidate);
}

// Contentful only knows regional codes, so the bare "en" route locale has to
// become the space's default "en-US" before it reaches a query.
const contentfulLocales: Record<Locale, string> = {
  en: "en-US",
  "pt-BR": "pt-BR",
};

export function toContentfulLocale(locale: string): string {
  return contentfulLocales[isLocale(locale) ? locale : defaultLocale];
}
