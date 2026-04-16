import Link from "next/link";
import Image from "next/image";

import { getDictionary } from "@/lib/i18n/dictionary";
import { resolveImageUrl } from "@/lib/images/resolve-image";
import { withLocale } from "@/lib/i18n/config";
import type { Artwork, Locale } from "@/types/site";

export function ArtworkCard({
  locale,
  artwork,
  priority = false,
}: {
  locale: Locale;
  artwork: Artwork;
  priority?: boolean;
}) {
  const dictionary = getDictionary(locale);

  return (
    <Link href={withLocale(locale, `/works/${artwork.slug}`)} className="group block">
      <div className="relative overflow-hidden rounded-[2rem] border border-stone-200/70 bg-stone-200/40">
        <Image
          src={resolveImageUrl(artwork.coverImage, { width: 1200, height: 1500 })}
          alt={artwork.coverImage.alt}
          width={1200}
          height={1500}
          priority={priority}
          className="aspect-[4/5] h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-start justify-between gap-4 px-1 py-4">
        <div>
          <h3 className="font-serif-display text-2xl text-stone-900">
            {artwork.title}
          </h3>
          <p className="mt-1 text-sm tracking-[0.18em] text-stone-500 uppercase">
            {dictionary.labels.medium[artwork.medium]} · {artwork.year}
          </p>
        </div>
        <div className="pt-1 text-xs tracking-[0.18em] text-stone-500 uppercase">
          {dictionary.labels.availability[artwork.availability]}
        </div>
      </div>
    </Link>
  );
}
