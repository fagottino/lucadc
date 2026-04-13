import type { Metadata } from "next";

import { locales, swapLocaleInPath } from "@/lib/i18n/config";
import type { Locale } from "@/types/site";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, getSiteUrl()).toString();
}

export function buildAlternates(pathname: string) {
  return {
    canonical: absoluteUrl(pathname),
    languages: Object.fromEntries(
      locales.map((locale) => [locale, absoluteUrl(swapLocaleInPath(pathname, locale))]),
    ),
  };
}

export function buildMetadata({
  locale,
  pathname,
  title,
  description,
}: {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
}): Metadata {
  const imageUrl = absoluteUrl(`/${locale}/opengraph-image`);

  return {
    title,
    description,
    alternates: buildAlternates(pathname),
    openGraph: {
      title,
      description,
      locale,
      type: "website",
      url: absoluteUrl(pathname),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.item),
    })),
  };
}

export function buildPersonJsonLd({
  name,
  alternateName,
  description,
  locale,
  sameAs,
}: {
  name: string;
  alternateName?: string;
  description: string;
  locale: Locale;
  sameAs: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl(`/${locale}#artist`),
    name,
    ...(alternateName ? { alternateName } : {}),
    description,
    sameAs,
    url: absoluteUrl(`/${locale}`),
  };
}

export function buildArtworkJsonLd({
  locale,
  work,
  artistName,
  imageUrl,
}: {
  locale: Locale;
  work: {
    title: string;
    description: string;
    slug: string;
    year: number;
    medium: string;
    dimensions: string;
  };
  artistName: string;
  imageUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "@id": absoluteUrl(`/${locale}/works/${work.slug}`),
    name: work.title,
    creator: {
      "@type": "Person",
      name: artistName,
    },
    description: work.description,
    artMedium: work.medium,
    dateCreated: `${work.year}`,
    width: work.dimensions,
    image: imageUrl,
    url: absoluteUrl(`/${locale}/works/${work.slug}`),
  };
}
