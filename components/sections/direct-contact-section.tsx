import type { Locale, SiteSettings } from "@/types/site";

export function DirectContactSection({
  locale,
  settings,
}: {
  locale: Locale;
  settings: SiteSettings;
}) {
  return (
    <section id="contact" className="sketch-rule-before px-5 py-18 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <p className="text-[0.68rem] tracking-[0.24em] text-[color:var(--ink-soft)] uppercase">
            {locale === "it" ? "Contatto diretto" : "Direct contact"}
          </p>
          <h2 className="font-serif-display text-balance text-4xl text-[color:var(--ink)] sm:text-5xl">
            {locale === "it"
              ? "Per commissioni o collaborazioni, scrivimi."
              : "For commissions or collaborations, write directly."}
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--ink-soft)]">
            {locale === "it"
              ? "Scrivimi per parlarmi della tua idea: mi piace accogliere richieste ambiziose, progetti complessi o visioni che sappiano sfidare la mia mano."
              : "Contact me to tell me about your idea: I enjoy taking on ambitious requests, complex projects, or visions that challenge my imagination."}
          </p>
        </div>

        <div className="space-y-5 text-sm leading-7 text-[color:var(--ink-soft)]">
          {/* <div className="space-y-3">
            <div className="sketch-divider" aria-hidden />
            <a className="sketch-link hover:text-[color:var(--ink)]" href={`mailto:${settings.contactEmail}`}>
              {settings.contactEmail}
            </a>
          </div> */}

          <div className="space-y-3">
            <div className="sketch-divider" aria-hidden />
            <a className="sketch-link hover:text-[color:var(--ink)]" href={settings.instagramUrl}>
              Instagram / @luca._.dc
            </a>
          </div>

          {/* <div className="space-y-3">
            <div className="sketch-divider" aria-hidden />
            <a className="sketch-link hover:text-[color:var(--ink)]" href={settings.whatsappUrl}>
              WhatsApp
            </a>
          </div> */}

          <div className="space-y-3">
            <div className="sketch-divider" aria-hidden />
            <p>{settings.responseTimeLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
