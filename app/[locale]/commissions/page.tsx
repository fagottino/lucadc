import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { isLocale } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo/metadata";
import { getSiteSettings } from "@/lib/sanity/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const settings = await getSiteSettings(locale);

  return buildMetadata({
    locale,
    pathname: `/${locale}/commissions`,
    title: `${settings.artistName} Commissions`,
    description: settings.seoDescription,
  });
}

export default async function CommissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    redirect("/it#commissions");
  }

  redirect(`/${locale}#commissions`);
}
