import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { resolveImageUrl } from "@/lib/images/resolve-image";
import { withLocale } from "@/lib/i18n/config";
import type { ArtworkImage, Locale, SiteSettings } from "@/types/site";

export function HomeHero({
  locale,
  settings,
  portrait,
}: {
  locale: Locale;
  settings: SiteSettings;
  portrait: ArtworkImage;
}) {
  return (
    <section id="top" className="px-5 pb-14 pt-12 sm:px-8 sm:pb-18 sm:pt-16">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-end">
          <Reveal className="max-w-xl space-y-6">
            <p className="text-[0.7rem] tracking-[0.24em] text-[color:var(--ink-soft)] uppercase">
              {settings.heroEyebrow}
            </p>
            <h1 className="font-serif-display text-balance text-[4.1rem] leading-[0.92] text-[color:var(--ink)] sm:text-[5.3rem] lg:text-[6.1rem]">
              <span className="sketch-underline">{settings.artistName}</span>
            </h1>
            <p className="font-serif-display text-balance text-[1.6rem] leading-[1.08] text-[color:var(--ink)] sm:text-[2.05rem]">
              {settings.heroTitle}
            </p>
            <p className="max-w-lg text-base leading-8 text-[color:var(--ink-soft)] sm:text-lg">
              {settings.heroStatement}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2 text-[0.72rem] tracking-[0.18em] text-[color:var(--ink-soft)] uppercase">
              <a href={`${withLocale(locale)}#works`} className="sketch-link hover:text-[color:var(--ink)]">
                {locale === "it" ? "Disegni" : "Drawings"}
              </a>
              <a href={`${withLocale(locale)}#about`} className="sketch-link hover:text-[color:var(--ink)]">
                {locale === "it" ? "Origine" : "Origin"}
              </a>
              <a
                href={`${withLocale(locale)}#contact`}
                className="sketch-link hover:text-[color:var(--ink)]"
              >
                {locale === "it" ? "Contatto" : "Contact"}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="space-y-6">
            <div className="sketch-frame bg-[color:var(--paper-deep)] p-2">
              <Image
                src={resolveImageUrl(portrait, {
                  width: 1600,
                  height: 1900,
                })}
                alt={portrait.alt}
                width={1600}
                height={1900}
                priority
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
