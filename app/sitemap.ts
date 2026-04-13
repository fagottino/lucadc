import type { MetadataRoute } from "next";

import { locales, withLocale } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/seo/metadata";
import { getAllArtworkSlugs } from "@/lib/sanity/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ["", "/privacy"];
  const artworkSlugs = await getAllArtworkSlugs();

  const staticEntries = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: absoluteUrl(withLocale(locale, path)),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((targetLocale) => [
            targetLocale,
            absoluteUrl(withLocale(targetLocale, path)),
          ]),
        ),
      },
    })),
  );

  const artworkEntries = locales.flatMap((locale) =>
    artworkSlugs.map((slug) => ({
      url: absoluteUrl(withLocale(locale, `/works/${slug}`)),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((targetLocale) => [
            targetLocale,
            absoluteUrl(withLocale(targetLocale, `/works/${slug}`)),
          ]),
        ),
      },
    })),
  );

  return [...staticEntries, ...artworkEntries];
}
