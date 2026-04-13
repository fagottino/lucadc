import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/sections/page-intro";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
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
    pathname: `/${locale}/privacy`,
    title: `${settings.artistName} Privacy`,
    description: settings.seoDescription,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const body =
    locale === "it"
      ? "Questo MVP salva le richieste di contatto solo per rispondere e discutere il progetto. "
      : "This MVP stores contact inquiries only for reply and project discussion.";

  return (
    <>
      <PageIntro
        eyebrow={dictionary.common.privacy}
        title={dictionary.common.privacy}
        body={body}
      />
      <section className="mx-auto max-w-4xl space-y-6 px-5 pb-16 text-base leading-8 text-stone-700 sm:px-8 sm:pb-24">
        {locale === "it" ? (
          <>
            <p>
              Le richieste di contatto vengono usate solo per rispondere,
              discutere commissioni e portare avanti la conversazione di progetto.
            </p>
            {/* <p>
              Se colleghi la memorizzazione su Sanity o l&apos;invio email con Resend,
              aggiorna questa pagina con titolare del trattamento, tempi di
              conservazione e base giuridica reali.
            </p> */}
          </>
        ) : (
          <>
            <p>
              Contact requests are used only to answer inquiries, discuss
              commissions, and keep the project conversation moving.
            </p>
            <p>
              If you connect Sanity document storage or Resend email delivery,
              update this page with the real data processor, retention policy,
              and lawful basis.
            </p>
          </>
        )}
      </section>
    </>
  );
}
