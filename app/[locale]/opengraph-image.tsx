import { ImageResponse } from "next/og";

import { getLocaleOrDefault } from "@/lib/i18n/config";
import { getSiteSettings } from "@/lib/sanity/content";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = getLocaleOrDefault(localeParam);
  const settings = await getSiteSettings(locale);
  const label = locale === "it" ? "Disegni a mano" : "Hand-drawn works";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #f6f1e8 0%, #eee5d8 55%, #f6f1e8 100%)",
          color: "#1d1815",
          padding: "64px",
          justifyContent: "space-between",
          alignItems: "stretch",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            maxWidth: "760px",
          }}
        >
          <div style={{ fontSize: 24, letterSpacing: "0.35em", textTransform: "uppercase" }}>
            {label}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontSize: 86, lineHeight: 0.9 }}>{settings.artistName}</div>
            <div style={{ fontSize: 34, lineHeight: 1.25, color: "#575048" }}>
              {settings.heroTitle}
            </div>
          </div>
          <div style={{ fontSize: 26, color: "#6f665d" }}>{settings.cityLabel}</div>
        </div>
        <div
          style={{
            width: 260,
            borderRadius: 40,
            background:
              "linear-gradient(180deg, rgba(29,24,21,0.03), rgba(29,24,21,0.09))",
            border: "2px solid rgba(29,24,21,0.16)",
          }}
        />
      </div>
    ),
    size,
  );
}
