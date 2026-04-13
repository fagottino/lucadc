import imageUrlBuilder from "@sanity/image-url";

import { client } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/env";
import type { ArtworkImage } from "@/types/site";

const builder =
  client && isSanityConfigured ? imageUrlBuilder(client) : null;

export function resolveImageUrl(
  image: ArtworkImage,
  {
    width,
    height,
  }: {
    width: number;
    height?: number;
  },
) {
  if (image.src) {
    return image.src;
  }

  if (!builder) {
    return "/artworks/placeholder-portrait.svg";
  }

  const imageBuilder = builder.image(image).width(width);

  if (height) {
    imageBuilder.height(height).fit("crop");
  }

  return imageBuilder.auto("format").quality(82).url();
}
