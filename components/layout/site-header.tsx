import Link from "next/link";
import { Suspense } from "react";

import {
  LanguageSwitcher,
  LanguageSwitcherFallback,
} from "@/components/layout/language-switcher";
import { withLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale, SiteSettings } from "@/types/site";

export function SiteHeader({
  locale,
  settings,
}: {
  locale: Locale;
  settings: SiteSettings;
}) {
  const dictionary = getDictionary(locale);

  const navItems = [
    { href: `${withLocale(locale)}#works`, label: dictionary.nav.works },
    { href: `${withLocale(locale)}#about`, label: dictionary.nav.about },
    { href: `${withLocale(locale)}#commissions`, label: dictionary.nav.commissions },
    { href: `${withLocale(locale)}#contact`, label: dictionary.nav.contact },
  ];

  return (
    <header className="sketch-rule-after sticky top-0 z-30 bg-[color:var(--paper)]/94 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-4 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-center justify-between gap-6">
          <Link href={withLocale(locale)} locale={false} className="min-w-0">
            <div className="text-[0.66rem] tracking-[0.2em] text-[color:var(--ink-soft)] uppercase">
              {settings.cityLabel}
            </div>
            <div className="font-serif-display text-[2rem] leading-none text-[color:var(--ink)] sm:text-[2.3rem]">
              <span className="sketch-underline">{settings.artistName}</span>
            </div>
          </Link>

          <Suspense fallback={<LanguageSwitcherFallback locale={locale} />}>
            <div className="lg:hidden">
              <LanguageSwitcher locale={locale} />
            </div>
          </Suspense>
        </div>

        <div className="flex flex-col gap-4 lg:items-end">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[0.72rem] tracking-[0.18em] text-[color:var(--ink-soft)] uppercase">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="sketch-link hover:text-[color:var(--ink)]">
                {item.label}
              </a>
            ))}
          </nav>
          <Suspense fallback={<LanguageSwitcherFallback locale={locale} />}>
            <div className="hidden lg:block">
              <LanguageSwitcher locale={locale} />
            </div>
          </Suspense>
        </div>
      </div>
    </header>
  );
}
