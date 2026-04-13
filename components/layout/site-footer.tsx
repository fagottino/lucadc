import Link from "next/link";

import { getDictionary } from "@/lib/i18n/dictionary";
import { withLocale } from "@/lib/i18n/config";
import type { Locale, SiteSettings } from "@/types/site";

export function SiteFooter({
  locale,
  settings,
}: {
  locale: Locale;
  settings: SiteSettings;
}) {
  const dictionary = getDictionary(locale);

  return (
    <footer className="sketch-rule-before mt-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="font-serif-display text-2xl text-[color:var(--ink)]">{settings.artistName}</p>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--ink-soft)]">
            {dictionary.footer.note}
          </p>
        </div>
        <Link
          href={withLocale(locale, "/privacy")}
          locale={false}
          className="sketch-link text-[0.72rem] tracking-[0.18em] text-[color:var(--ink-soft)] uppercase hover:text-[color:var(--ink)]"
        >
          {dictionary.common.privacy}
        </Link>
      </div>
    </footer>
  );
}
