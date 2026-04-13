import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { SiteShell } from "@/components/layout/site-shell";
import { locales, isLocale } from "@/lib/i18n/config";
import { getSiteSettings } from "@/lib/sanity/content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const settings = await getSiteSettings(locale);

  return <SiteShell locale={locale} settings={settings}>{children}</SiteShell>;
}
