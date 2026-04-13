import "server-only";

import { cache } from "react";
import { groq } from "next-sanity";

import { client } from "@/lib/sanity/client";
import {
  filterFallbackArtworks,
  getFallbackArtistProfile,
  getFallbackArtworks,
  getFallbackCommissionPage,
  getFallbackPressItems,
  getFallbackSiteSettings,
} from "@/lib/sanity/fallback-data";
import { isSanityConfigured } from "@/lib/sanity/env";
import type {
  ArtistProfile,
  Artwork,
  ArtworkFilters,
  ArtworkIndexResult,
  CommissionPage,
  Locale,
  PressItem,
  SiteSettings,
} from "@/types/site";

const artworkFields = `
  _id,
  "slug": slug.current,
  "title": coalesce(title[$locale], title.en),
  "description": coalesce(description[$locale], description.en),
  "seoExcerpt": coalesce(seoExcerpt[$locale], seoExcerpt.en),
  year,
  medium,
  dimensions,
  orientation,
  collection,
  featured,
  availability,
  "coverImage": {
    ...coverImage,
    "alt": coalesce(coverImage.alt[$locale], coverImage.alt.en)
  },
  "detailImages": detailImages[]{
    ...,
    "alt": coalesce(alt[$locale], alt.en)
  }
`;

const allArtworksQuery = groq`*[_type == "artwork"] | order(year desc, _createdAt desc) {
  ${artworkFields}
}`;

const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  artistName,
  artistAlternateName,
  "heroEyebrow": coalesce(heroEyebrow[$locale], heroEyebrow.en),
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.en),
  "heroStatement": coalesce(heroStatement[$locale], heroStatement.en),
  "seoTitle": coalesce(seoTitle[$locale], seoTitle.en),
  "seoDescription": coalesce(seoDescription[$locale], seoDescription.en),
  contactEmail,
  instagramUrl,
  whatsappUrl,
  "cityLabel": coalesce(cityLabel[$locale], cityLabel.en),
  "responseTimeLabel": coalesce(responseTimeLabel[$locale], responseTimeLabel.en)
}`;

const profileQuery = groq`*[_type == "artistProfile" && language == $locale][0]{
  language,
  statement,
  biography,
  materials,
  portrait {
    ...,
    "alt": alt
  },
  "processNotes": processNotes[]{
    "value": value
  }[].value,
  "processImages": processImages[]{
    ...,
    "alt": alt
  }
}`;

const commissionPageQuery = groq`*[_type == "commissionPage" && language == $locale][0]{
  language,
  intro,
  steps[]{
    title,
    body
  },
  faq[]{
    question,
    answer
  },
  closingCta
}`;

const pressItemsQuery = groq`*[_type == "pressItem" && language == $locale] | order(sortOrder asc, _createdAt desc){
  _id,
  title,
  venue,
  dateLabel,
  href,
  excerpt
}`;

async function safeFetch<T>(query: string, params: Record<string, unknown>) {
  if (!client || !isSanityConfigured) {
    return null;
  }

  try {
    return await client.fetch<T>(query, params);
  } catch {
    return null;
  }
}

const getAllArtworksCached = cache(async (locale: Locale): Promise<Artwork[]> => {
  const artworks = await safeFetch<Artwork[]>(allArtworksQuery, { locale });
  return artworks?.length ? artworks : getFallbackArtworks(locale);
});

export const getSiteSettings = cache(async (locale: Locale): Promise<SiteSettings> => {
  const settings = await safeFetch<SiteSettings>(siteSettingsQuery, { locale });
  return settings ?? getFallbackSiteSettings(locale);
});

export const getArtistProfile = cache(async (locale: Locale): Promise<ArtistProfile> => {
  const profile = await safeFetch<ArtistProfile>(profileQuery, { locale });
  return profile ?? getFallbackArtistProfile(locale);
});

export const getCommissionPage = cache(async (locale: Locale): Promise<CommissionPage> => {
  const page = await safeFetch<CommissionPage>(commissionPageQuery, { locale });
  return page ?? getFallbackCommissionPage(locale);
});

export const getPressItems = cache(async (locale: Locale): Promise<PressItem[]> => {
  const press = await safeFetch<PressItem[]>(pressItemsQuery, { locale });
  return press?.length ? press : getFallbackPressItems(locale);
});

export const getFeaturedWorks = cache(async (locale: Locale): Promise<Artwork[]> => {
  const all = await getAllArtworksCached(locale);
  return all.filter((work) => work.featured).slice(0, 4);
});

export const getAllArtworks = cache(async (locale: Locale): Promise<Artwork[]> =>
  getAllArtworksCached(locale),
);

export const getArtworkIndex = cache(
  async (locale: Locale, filters: ArtworkFilters = {}): Promise<ArtworkIndexResult> => {
    const allWorks = isSanityConfigured
      ? await getAllArtworksCached(locale)
      : getFallbackArtworks(locale);

    const orderedWorks = [...allWorks].sort((a, b) => b.year - a.year);
    const filteredWorks = isSanityConfigured
      ? orderedWorks.filter((work) => {
          if (filters.medium && work.medium !== filters.medium) return false;
          if (filters.collection && work.collection !== filters.collection) return false;
          if (filters.availability && work.availability !== filters.availability) return false;
          if (filters.year && `${work.year}` !== filters.year) return false;
          return true;
        })
      : filterFallbackArtworks(locale, filters);

    const pageSize = 8;
    const totalPages = Math.max(1, Math.ceil(filteredWorks.length / pageSize));
    const currentPage = Math.min(Math.max(filters.page || 1, 1), totalPages);
    const offset = (currentPage - 1) * pageSize;

    return {
      items: filteredWorks.slice(offset, offset + pageSize),
      totalItems: filteredWorks.length,
      totalPages,
      currentPage,
      availableYears: [...new Set(orderedWorks.map((work) => `${work.year}`))],
      availableMedia: [...new Set(orderedWorks.map((work) => work.medium))],
      availableCollections: [...new Set(orderedWorks.map((work) => work.collection))],
      availableStatuses: [...new Set(orderedWorks.map((work) => work.availability))],
    };
  },
);

export const getArtworkBySlug = cache(async (locale: Locale, slug: string) => {
  const all = await getAllArtworksCached(locale);
  return all.find((work) => work.slug === slug) ?? null;
});

export const getRelatedWorks = cache(async (locale: Locale, slug: string) => {
  const all = await getAllArtworksCached(locale);
  const current = all.find((work) => work.slug === slug);

  if (!current) {
    return [];
  }

  return all
    .filter(
      (work) =>
        work.slug !== current.slug &&
        (work.collection === current.collection || work.medium === current.medium),
    )
    .slice(0, 3);
});

export const getHomePageData = cache(async (locale: Locale) => {
  const [settings, works, profile] = await Promise.all([
    getSiteSettings(locale),
    getAllArtworks(locale),
    getArtistProfile(locale),
  ]);

  return {
    settings,
    works,
    profile,
  };
});

export const getAllArtworkSlugs = cache(async () => {
  const allByLocale = await Promise.all(
    (["it", "en"] as const).map((locale) => getAllArtworksCached(locale)),
  );
  return [...new Set(allByLocale.flat().map((work) => work.slug))];
});
