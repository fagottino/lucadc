import { redirect } from "next/navigation";

import { getLocaleOrDefault } from "@/lib/i18n/config";

export default async function ArtworkDetailRedirect({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  redirect(`/${getLocaleOrDefault(locale)}?art=${encodeURIComponent(slug)}#works`);
}
