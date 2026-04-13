import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { getDictionary } from "@/lib/i18n/dictionary";
import { resolveImageUrl } from "@/lib/images/resolve-image";
import type { Artwork, Locale } from "@/types/site";

export function FeaturedWorksSection({
  locale,
  works,
}: {
  locale: Locale;
  works: Artwork[];
}) {
  const dictionary = getDictionary(locale);

  return (
    <section id="works" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl space-y-12">
        <Reveal className="max-w-3xl space-y-4">
          <div className="space-y-4">
            <p className="text-xs tracking-[0.28em] text-stone-500 uppercase">
              {dictionary.common.featuredWorks}
            </p>
            <h2 className="font-serif-display text-balance text-4xl text-stone-900 sm:text-5xl">
              {dictionary.common.featuredTitle}
            </h2>
            <p className="max-w-2xl text-base leading-8 text-stone-700">
              {locale === "it"
                ? "Una selezione ridotta e silenziosa. L'obiettivo è lasciare spazio ai disegni, senza trasformare la pagina in un catalogo."
                : "A small, quiet selection. The goal is to let the drawings breathe instead of turning the page into a catalogue interface."}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
          {works.map((work, index) => (
            <Reveal key={work.id} delay={index * 0.05} className="space-y-4">
              <div className="overflow-hidden border border-stone-200/70 bg-stone-100">
                <Image
                  src={resolveImageUrl(work.coverImage, { width: 1200, height: 1500 })}
                  alt={work.coverImage.alt}
                  width={1200}
                  height={1500}
                  priority={index < 2}
                  className="aspect-[4/5] h-full w-full object-cover"
                />
              </div>
              <div className="space-y-1 border-t border-stone-200 pt-4">
                <h3 className="font-serif-display text-2xl text-stone-900">
                  {work.title}
                </h3>
                <p className="text-sm text-stone-600">
                  {dictionary.labels.medium[work.medium]} · {work.year} · {work.dimensions}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
