import type { Artwork, Locale } from "@/types/site";
import { ArtworkCard } from "@/components/gallery/artwork-card";

export function ArtworkGrid({
  locale,
  items,
  priorityCount = 0,
}: {
  locale: Locale;
  items: Artwork[];
  priorityCount?: number;
}) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((artwork, index) => (
        <ArtworkCard
          key={artwork.id}
          locale={locale}
          artwork={artwork}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
