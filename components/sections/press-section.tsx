import { Reveal } from "@/components/ui/reveal";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale, PressItem } from "@/types/site";

export function PressSection({
  locale,
  items,
}: {
  locale: Locale;
  items: PressItem[];
}) {
  const dictionary = getDictionary(locale);

  return (
    <section id="press" className="border-t border-stone-200/60 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl space-y-10">
        <Reveal className="max-w-3xl space-y-4">
          <p className="text-xs tracking-[0.28em] text-stone-500 uppercase">
            {dictionary.home.pressEyebrow}
          </p>
          <h2 className="font-serif-display text-balance text-4xl text-stone-900 sm:text-5xl">
            {dictionary.home.pressTitle}
          </h2>
        </Reveal>

        <div className="divide-y divide-stone-200 border-y border-stone-200">
          {items.map((item, index) => (
            <Reveal
              key={item.id}
              delay={index * 0.08}
              className="grid gap-4 py-6 md:grid-cols-[220px_minmax(0,1fr)] md:items-start"
            >
              <p className="text-xs tracking-[0.22em] text-stone-500 uppercase">
                {item.venue} · {item.dateLabel}
              </p>
              <div>
                <h3 className="font-serif-display text-3xl text-stone-900">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
                  {item.excerpt}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-4 inline-block text-xs tracking-[0.18em] text-stone-600 uppercase hover:text-stone-900"
                  >
                    {dictionary.common.readMore}
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
