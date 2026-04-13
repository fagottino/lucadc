"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { swapLocaleInPath } from "@/lib/i18n/config";
import type { Locale } from "@/types/site";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  return (
    <LanguageSwitcherFrame
      locale={locale}
      pathname={pathname}
      queryString={queryString}
    />
  );
}

export function LanguageSwitcherFallback({ locale }: { locale: Locale }) {
  return <LanguageSwitcherFrame locale={locale} pathname={`/${locale}`} queryString="" />;
}

function LanguageSwitcherFrame({
  locale,
  pathname,
  queryString,
}: {
  locale: Locale;
  pathname: string;
  queryString: string;
}) {
  return (
    <div
      aria-label="Language switcher"
      className="inline-flex items-center gap-1 rounded-full bg-[color:var(--paper-deep)]/70 p-1 text-[0.68rem] tracking-[0.2em] text-[color:var(--ink-soft)] uppercase"
    >
      {(["it", "en"] as const).map((targetLocale) => {
        const isActive = targetLocale === locale;
        const hrefBase = swapLocaleInPath(pathname, targetLocale);
        const href = queryString ? `${hrefBase}?${queryString}` : hrefBase;

        return (
          <Link
            key={targetLocale}
            href={href}
            className={`rounded-full px-3 py-1.5 transition ${
              isActive
                ? "bg-[color:var(--ink)] text-[color:var(--paper)]"
                : "text-[color:var(--ink-soft)] hover:text-[color:var(--ink)]"
            }`}
            hrefLang={targetLocale}
            locale={false}
          >
            {targetLocale}
          </Link>
        );
      })}
    </div>
  );
}
