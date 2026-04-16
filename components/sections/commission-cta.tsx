import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { withLocale } from "@/lib/i18n/config";
import type { Locale } from "@/types/site";

export function CommissionCta({ locale }: { locale: Locale }) {
  return (
    <section id="commissions" className="sketch-rule-before px-5 py-18 sm:px-8 sm:py-24">
      <Reveal className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:items-start">
        <div className="space-y-5">
          <p className="text-[0.68rem] tracking-[0.24em] text-[color:var(--ink-soft)] uppercase">
            {locale === "it" ? "Commissioni" : "Commissions"}
          </p>
          <h2 className="font-serif-display max-w-3xl text-balance text-4xl text-[color:var(--ink)] sm:text-5xl">
            {locale === "it"
              ? "Ritratti e disegni su richiesta, sempre a mano."
              : "Portraits and commissioned drawings, always made by hand."}
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--ink-soft)]">
            {locale === "it"
              ? "Carta, grafite, tempo e confronto diretto."
              : "Paper, graphite, time, and direct conversation."}
          </p>
        </div>

        <div className="space-y-5">
          <div className="sketch-divider" aria-hidden />
          <p className="text-sm leading-7 text-[color:var(--ink-soft)]">
            {locale === "it"
              ? "Ogni ritratto nasce da un dialogo e da una visione comune. Il valore di ogni opera viene definito insieme, in base alla complessità e alla storia che vogliamo raccontare: un progetto unico merita un confronto personale e riservato."
              : "Every portrait is born from a dialogue and a shared vision. The value of each work is determined together, based on its complexity and the story we wish to tell: a unique project deserves a personal and confidential discussion."}
          </p>
          <Link
            href={`${withLocale(locale)}#contact`}
            className="sketch-link text-[0.74rem] tracking-[0.18em] text-[color:var(--ink-soft)] uppercase hover:text-[color:var(--ink)]"
          >
            {/* {locale === "it" ? "Scrivi per iniziare" : "Get in touch to start"} */}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
