import type { Locale } from "@/types/site";

export const locales: Locale[] = ["it", "en"];
export const defaultLocale: Locale = "it";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleOrDefault(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function withLocale(locale: Locale, path = ""): string {
  if (!path || path === "/") {
    return `/${locale}`;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export function swapLocaleInPath(pathname: string, locale: Locale): string {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) {
    return `/${locale}`;
  }

  if (isLocale(parts[0])) {
    parts[0] = locale;
    return `/${parts.join("/")}`;
  }

  return `/${locale}/${parts.join("/")}`;
}

export function stripLocaleFromPath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);

  if (parts[0] && isLocale(parts[0])) {
    return `/${parts.slice(1).join("/")}`.replace(/\/$/, "") || "/";
  }

  return pathname;
}
