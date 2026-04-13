import type { Metadata } from "next";

import { getSiteUrl } from "@/lib/seo/metadata";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Luca DC",
    template: "%s | Luca DC",
  },
  description:
    "Disegni a mano da Venafro, in Molise. Un portfolio essenziale di ritratti, studi su carta e commissioni private.",
  applicationName: "Luca DC Portfolio",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
