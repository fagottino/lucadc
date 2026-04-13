import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SeriesGallery } from "@/components/gallery/series-gallery";
import { CommissionCta } from "@/components/sections/commission-cta";
import { DirectContactSection } from "@/components/sections/direct-contact-section";
import { HomeHero } from "@/components/sections/home-hero";
import { ProcessSection } from "@/components/sections/process-section";
import { JsonLd } from "@/components/ui/json-ld";
import { isLocale, withLocale } from "@/lib/i18n/config";
import { buildMetadata, buildPersonJsonLd } from "@/lib/seo/metadata";
import { getHomePageData } from "@/lib/sanity/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const { settings } = await getHomePageData(locale);

  return buildMetadata({
    locale,
    pathname: `/${locale}`,
    title: settings.seoTitle,
    description: settings.seoDescription,
  });
}

export default async function LocaleHomePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ art?: string | string[] }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const { art } = await searchParams;
  const { works, profile, settings } = await getHomePageData(locale);

  const heroArtwork = works.find((work) => work.featured) ?? works[0];
  const initialArtworkSlug = Array.isArray(art) ? art[0] : art ?? null;

  if (!heroArtwork) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={buildPersonJsonLd({
          locale,
          name: settings.artistName,
          alternateName: settings.artistAlternateName,
          description: settings.seoDescription,
          sameAs: [settings.instagramUrl, settings.whatsappUrl],
        })}
      />
      <HomeHero locale={locale} settings={settings} featuredArtwork={heroArtwork} />
      <SeriesGallery
        locale={locale}
        works={works}
        pathname={withLocale(locale)}
        initialArtworkSlug={initialArtworkSlug}
      />
      <ProcessSection locale={locale} profile={profile} />
      <CommissionCta locale={locale} />
      <DirectContactSection locale={locale} settings={settings} />
    </>
  );
}
