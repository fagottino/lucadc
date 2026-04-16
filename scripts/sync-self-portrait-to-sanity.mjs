import fs from "node:fs";
import path from "node:path";

import { getCliClient } from "sanity/cli";

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-12";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const profileImageRelativePath =
  "assets/intake/instagram/luca._.dc/selected/artworks/instagram/portraits/8dfb7566-d7e3-4c8c-ab5f-3ff63caa3d83.png";
const profileImageFilename = "8dfb7566-d7e3-4c8c-ab5f-3ff63caa3d83.png";
const galleryImageRelativePath =
  "public/artworks/instagram/portraits/2025-08-04T13-16-28Z_UTC_DM7zeyaIYYz_1.jpg";
const galleryImageFilename = "2025-08-04T13-16-28Z_UTC_DM7zeyaIYYz_1.jpg";
const galleryArtworkSlug = "brad-pitt-portrait-2025";
const selfPortraitSlug = "here-i-am";

const galleryTitle = {
  en: "Brad Pitt",
  it: "Brad Pitt",
};

const profileAlt = {
  en: "Stylized self-portrait based on my profile picture.",
  it: "Autoritratto stilizzato basato sulla mia foto profilo.",
};

const galleryAlt = {
  en: "Pencil portrait of Brad Pitt.",
  it: "Ritratto a matita di Brad Pitt.",
};

const galleryExcerpt = {
  en: "Graphite portrait with a calm surface and visible hand.",
  it: "Ritratto in grafite con superficie calma e mano visibile.",
};

function createPortableTextBlock(text, keyPrefix) {
  return [
    {
      _type: "block",
      _key: `${keyPrefix}-block`,
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: `${keyPrefix}-span`,
          text,
          marks: [],
        },
      ],
    },
  ];
}

async function ensureImageAsset(client, imagePath, filename, contentType) {
  const existingAsset = await client.fetch(
    '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}',
    { filename },
  );

  if (existingAsset?._id) {
    return existingAsset._id;
  }

  const imageStream = fs.createReadStream(imagePath);
  const uploadedAsset = await client.assets.upload("image", imageStream, {
    filename,
    contentType,
  });

  return uploadedAsset._id;
}

async function main() {
  if (!projectId || !dataset) {
    throw new Error(
      "NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET must be set before running this sync.",
    );
  }

  const profileImagePath = path.resolve(process.cwd(), profileImageRelativePath);
  const galleryImagePath = path.resolve(process.cwd(), galleryImageRelativePath);

  if (!fs.existsSync(profileImagePath)) {
    throw new Error(`Missing profile image source at ${profileImagePath}`);
  }

  if (!fs.existsSync(galleryImagePath)) {
    throw new Error(`Missing gallery image source at ${galleryImagePath}`);
  }

  const client = getCliClient({
    apiVersion,
    dataset,
    perspective: "raw",
    projectId,
    useCdn: false,
  });

  const profileAssetId = await ensureImageAsset(
    client,
    profileImagePath,
    profileImageFilename,
    "image/png",
  );
  const galleryAssetId = await ensureImageAsset(
    client,
    galleryImagePath,
    galleryImageFilename,
    "image/jpeg",
  );

  const profileDocs = await client.fetch(
    '*[_type == "artistProfile" && language in $languages]{_id, language}',
    { languages: ["en", "it"] },
  );

  const artworkDocs = await client.fetch(
    '*[_type == "artwork" && slug.current in [$galleryArtworkSlug, $selfPortraitSlug]]{_id, "slug": slug.current}',
    { galleryArtworkSlug, selfPortraitSlug },
  );

  if (!profileDocs.length) {
    throw new Error("No artistProfile documents found for the configured dataset.");
  }

  if (!artworkDocs.length) {
    throw new Error(
      `No artwork documents found with slug "${galleryArtworkSlug}" or "${selfPortraitSlug}" in the configured dataset.`,
    );
  }

  let transaction = client.transaction();

  for (const profileDoc of profileDocs) {
    transaction = transaction.patch(profileDoc._id, {
      set: {
        portrait: {
          _type: "image",
          asset: {
            _ref: profileAssetId,
            _type: "reference",
          },
          alt: profileAlt[profileDoc.language],
        },
      },
    });
  }

  for (const artworkDoc of artworkDocs) {
    transaction = transaction.patch(artworkDoc._id, {
      set: {
        title: galleryTitle,
        slug: {
          _type: "slug",
          current: galleryArtworkSlug,
        },
        description: {
          en: createPortableTextBlock(galleryExcerpt.en, "en-description"),
          it: createPortableTextBlock(galleryExcerpt.it, "it-description"),
        },
        seoExcerpt: galleryExcerpt,
        coverImage: {
          _type: "image",
          asset: {
            _ref: galleryAssetId,
            _type: "reference",
          },
          alt: galleryAlt,
        },
      },
    });
  }

  await transaction.commit();

  console.log(
    `Updated ${profileDocs.length} artistProfile documents and restored ${artworkDocs.length} artwork documents.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
