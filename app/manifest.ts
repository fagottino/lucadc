export const dynamic = "force-static";

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Luca DC Portfolio",
    short_name: "Luca DC",
    description:
      "Disegni a mano da Venafro, in Molise.",
    start_url: "/it",
    display: "standalone",
    background_color: "#f6f1e8",
    theme_color: "#f6f1e8",
  };
}
