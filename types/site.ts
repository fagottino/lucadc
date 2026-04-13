import type { PortableTextBlock } from "sanity";

export type Locale = "en" | "it";

export type ArtworkMedium =
  | "graphite"
  | "charcoal"
  | "ink"
  | "mixed-media";

export type ArtworkCollection =
  | "portraits"
  | "studies"
  | "subjects";

export type ArtworkAvailability = "available" | "reserved" | "sold";

export type ArtworkImage = {
  alt: string;
  caption?: string;
  src?: string;
  asset?: {
    _ref?: string;
    _type?: "reference";
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
};

export type Artwork = {
  id: string;
  slug: string;
  title: string;
  description: PortableTextBlock[];
  seoExcerpt: string;
  year: number;
  medium: ArtworkMedium;
  dimensions: string;
  orientation: "portrait" | "landscape" | "square";
  collection: ArtworkCollection;
  featured: boolean;
  availability: ArtworkAvailability;
  coverImage: ArtworkImage;
  detailImages: ArtworkImage[];
};

export type SiteSettings = {
  artistName: string;
  artistAlternateName?: string;
  heroEyebrow: string;
  heroTitle: string;
  heroStatement: string;
  seoTitle: string;
  seoDescription: string;
  contactEmail: string;
  instagramUrl: string;
  whatsappUrl: string;
  cityLabel: string;
  responseTimeLabel: string;
};

export type PressItem = {
  id: string;
  title: string;
  venue: string;
  dateLabel: string;
  href?: string;
  excerpt: string;
};

export type ArtistProfile = {
  language: Locale;
  statement: string;
  biography: PortableTextBlock[];
  materials: string[];
  processNotes: string[];
  portrait: ArtworkImage;
  processImages: ArtworkImage[];
  processVideos?: {
    src: string;
    caption: string;
  }[];
};

export type CommissionStep = {
  title: string;
  body: string;
};

export type CommissionFaq = {
  question: string;
  answer: string;
};

export type CommissionPage = {
  language: Locale;
  intro: PortableTextBlock[];
  steps: CommissionStep[];
  faq: CommissionFaq[];
  closingCta: string;
};

export type HomePageData = {
  settings: SiteSettings;
  works: Artwork[];
  profile: ArtistProfile;
};

export type ArtworkFilters = {
  medium?: ArtworkMedium;
  collection?: ArtworkCollection;
  availability?: ArtworkAvailability;
  year?: string;
  page?: number;
};

export type ArtworkIndexResult = {
  items: Artwork[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  availableYears: string[];
  availableMedia: ArtworkMedium[];
  availableCollections: ArtworkCollection[];
  availableStatuses: ArtworkAvailability[];
};

export type ContactPayload = {
  locale: Locale;
  name: string;
  email: string;
  projectType: string;
  country: string;
  preferredChannel: string;
  timeline: string;
  message: string;
  website?: string;
};
