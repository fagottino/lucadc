import type { PropsWithChildren } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { Locale, SiteSettings } from "@/types/site";

export function SiteShell({
  locale,
  settings,
  children,
}: PropsWithChildren<{
  locale: Locale;
  settings: SiteSettings;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[color:var(--paper)]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[url('/textures/paper-grain.svg')] opacity-18 mix-blend-multiply"
      />
      <SiteHeader locale={locale} settings={settings} />
      <main className="relative z-10 flex-1 overflow-x-clip">{children}</main>
      <SiteFooter locale={locale} settings={settings} />
    </div>
  );
}
