import type { PortableTextBlock } from "sanity";

import type {
  ArtistProfile,
  Artwork,
  ArtworkAvailability,
  ArtworkCollection,
  ArtworkFilters,
  ArtworkMedium,
  CommissionPage,
  Locale,
  PressItem,
  SiteSettings,
} from "@/types/site";

type LocalizedString = Record<Locale, string>;
type LocalizedParagraphs = Record<Locale, string[]>;

type ArtworkSeed = {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedParagraphs;
  seoExcerpt: LocalizedString;
  coverAlt: LocalizedString;
  year: number;
  medium: ArtworkMedium;
  dimensions: string;
  orientation: "portrait" | "landscape" | "square";
  collection: ArtworkCollection;
  featured: boolean;
  availability: ArtworkAvailability;
  coverImage: string;
  detailImages: string[];
};

const artistName = "Luca DC";
const artistAlternateName = "Luca Di Carlo";

function paragraphBlock(text: string, index: number): PortableTextBlock {
  return {
    _type: "block",
    _key: `block-${index}`,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `span-${index}`,
        text,
        marks: [],
      },
    ],
  };
}

function toPortableText(paragraphs: string[]): PortableTextBlock[] {
  return paragraphs.map(paragraphBlock);
}

function getLocalizedValue<T>(localized: Record<Locale, T>, locale: Locale): T {
  return localized[locale];
}

function buildArtworkSeed({
  id,
  slug,
  titleEn,
  titleIt,
  excerptEn,
  excerptIt,
  coverAltEn = titleEn,
  coverAltIt = titleIt,
  year,
  medium,
  collection,
  coverImage,
  featured = false,
  orientation = "portrait",
}: {
  id: string;
  slug: string;
  titleEn: string;
  titleIt: string;
  excerptEn: string;
  excerptIt: string;
  coverAltEn?: string;
  coverAltIt?: string;
  year: number;
  medium: ArtworkMedium;
  collection: ArtworkCollection;
  coverImage: string;
  featured?: boolean;
  orientation?: "portrait" | "landscape" | "square";
}): ArtworkSeed {
  return {
    id,
    slug,
    title: {
      en: titleEn,
      it: titleIt,
    },
    description: {
      en: [excerptEn],
      it: [excerptIt],
    },
    seoExcerpt: {
      en: excerptEn,
      it: excerptIt,
    },
    coverAlt: {
      en: coverAltEn,
      it: coverAltIt,
    },
    year,
    medium,
    dimensions: "",
    orientation,
    collection,
    featured,
    availability: "available",
    coverImage,
    detailImages: [],
  };
}

const siteSettingsByLocale: Record<Locale, SiteSettings> = {
  it: {
    artistName,
    artistAlternateName,
    heroEyebrow: "Venafro (IS), Molise",
    heroTitle: "Disegni a mano tra ritratti, studi e carta.",
    heroStatement:
      "Le mie radici affondano a Venafro, in Molise: una terra dove il tempo rallenta e lascia spazio al segno. Da qui nasce il mio modo di disegnare.",
    seoTitle: `${artistName} | Disegni a mano da Venafro`,
    seoDescription:
      "Disegni a mano da Venafro, in Molise. Ritratti, studi su carta e commissioni private di Luca DC.",
    contactEmail: "studio@lucadc.it",
    instagramUrl: "https://www.instagram.com/luca._.dc/",
    whatsappUrl: "https://wa.me/393330000000",
    cityLabel: "Venafro (IS), Molise",
    responseTimeLabel: "Rispondo entro 3 giorni",
  },
  en: {
    artistName,
    artistAlternateName,
    heroEyebrow: "Venafro (IS), Molise",
    heroTitle: "Hand-drawn portraits, studies, and paper works.",
    heroStatement:
      "My roots are in Venafro, Molise: a land where time slows down and leaves room for the sign. This is where my way of drawing comes from.",
    seoTitle: `${artistName} | Hand-drawn works from Molise`,
    seoDescription:
      "Hand-drawn works from Venafro, Molise. Portraits, studies on paper, and private commissions by Luca DC.",
    contactEmail: "studio@lucadc.it",
    instagramUrl: "https://www.instagram.com/luca._.dc/",
    whatsappUrl: "https://wa.me/393330000000",
    cityLabel: "Venafro (IS), Molise",
    responseTimeLabel: "Response within 3 days",
  },
};

const artistProfilesByLocale: Record<Locale, ArtistProfile> = {
  it: {
    language: "it",
    statement: "Disegno a mano per fermare il tempo.",
    biography: toPortableText([
      "Sono nato a Venafro (IS), in Molise, una terra lenta dove il tempo sembra fermarsi. Quel ritmo entra nel segno, nell'attesa e nel silenzio della carta.",
      "Lavoro con grafite, carboncino e inchiostro. Cerco l'essenza in ogni volto e in ogni linea, celebrando l'imperfezione vitale che solo la mano sa restituire.",
    ]),
    materials: ["Grafite", "Carboncino", "Inchiostro", "Carta"],
    processNotes: [
      "Disegno lentamente, senza strumenti digitali.",
      "La carta resta viva, con errori, pressione e pause.",
      "Mi interessa il segno umano, non l'effetto perfetto.",
    ],
    portrait: {
      src: "/artworks/instagram/portraits/8dfb7566-d7e3-4c8c-ab5f-3ff63caa3d83.png",
      alt: "Autoritratto stilizzato basato sulla mia foto profilo.",
    },
    processImages: [
      {
        src: "/process/instagram/stills/2024-05-13T14-32-11Z_UTC_C66YBbvM99i_1.jpg",
        alt: "Disegno in corso su carta.",
      },
      {
        src: "/artworks/instagram/studies/2021-09-29T13-13-27Z_UTC_CUaCRWQsPdl_1.jpg",
        alt: "Studio ravvicinato di un occhio su carta.",
      },
    ],
    processVideos: [
      {
        src: "/process/instagram/reels/2025-10-15T13-56-52Z_UTC_DP1Q3I0CHsg_1.mp4",
        caption: "La linea che comincia.",
      },
      {
        src: "/process/instagram/reels/2023-11-14T13-01-51Z_UTC_CzoJGHRsOzH_1.mp4",
        caption: "Pennino e inchiostro.",
      },
      {
        src: "/process/instagram/reels/2023-09-15T15-54-22Z_UTC_CxN8uxHsiWp_1.mp4",
        caption: "Un volto che emerge.",
      },
    ],
  },
  en: {
    language: "en",
    statement: "I draw by hand to hold time still.",
    biography: toPortableText([
      "I come from Venafro, in Molise, a slow place where time seems to stand still. That rhythm enters the mark, the pause, and the silence of the paper.",
      "I work with graphite, charcoal, and ink. I seek the essence in every face and every line, celebrating the vital imperfection that only the hand can convey.",
    ]),
    materials: ["Graphite", "Charcoal", "Ink", "Paper"],
    processNotes: [
      "I draw slowly, without digital tools.",
      "The paper stays alive, with pressure, pauses, and small imperfections.",
      "I care about the human mark, not a polished effect.",
    ],
    portrait: {
      src: "/artworks/instagram/portraits/8dfb7566-d7e3-4c8c-ab5f-3ff63caa3d83.png",
      alt: "Stylized self-portrait based on my profile picture.",
    },
    processImages: [
      {
        src: "/process/instagram/stills/2024-05-13T14-32-11Z_UTC_C66YBbvM99i_1.jpg",
        alt: "A drawing in progress on paper.",
      },
      {
        src: "/artworks/instagram/studies/2021-09-29T13-13-27Z_UTC_CUaCRWQsPdl_1.jpg",
        alt: "Close study of an eye on paper.",
      },
    ],
    processVideos: [
      {
        src: "/process/instagram/reels/2025-10-15T13-56-52Z_UTC_DP1Q3I0CHsg_1.mp4",
        caption: "The line begins.",
      },
      {
        src: "/process/instagram/reels/2023-11-14T13-01-51Z_UTC_CzoJGHRsOzH_1.mp4",
        caption: "Pen and ink.",
      },
      {
        src: "/process/instagram/reels/2023-09-15T15-54-22Z_UTC_CxN8uxHsiWp_1.mp4",
        caption: "A face taking shape.",
      },
    ],
  },
};

const commissionPagesByLocale: Record<Locale, CommissionPage> = {
  it: {
    language: "it",
    intro: toPortableText([
      "Realizzo ritratti e disegni su richiesta. Ogni lavoro nasce a mano, con tempi lenti e confronto diretto.",
    ]),
    steps: [
      {
        title: "Primo contatto",
        body: "Mi racconti il soggetto e l'idea del lavoro.",
      },
      {
        title: "Direzione",
        body: "Definiamo tono, tecnica e tempi.",
      },
      {
        title: "Disegno",
        body: "L'opera cresce su carta, senza passare dal digitale.",
      },
    ],
    faq: [
      {
        question: "Lavori da fotografia?",
        answer: "Sì, quando serve al progetto.",
      },
      {
        question: "I prezzi sono pubblici?",
        answer: "No. Ogni lavoro viene valutato in privato.",
      },
    ],
    closingCta: "Scrivimi per iniziare.",
  },
  en: {
    language: "en",
    intro: toPortableText([
      "I make portraits and commissioned drawings. Every piece is built by hand, at a slow pace, through direct conversation.",
    ]),
    steps: [
      {
        title: "First contact",
        body: "You share the subject and the idea behind the work.",
      },
      {
        title: "Direction",
        body: "We define tone, medium, and timing.",
      },
      {
        title: "Drawing",
        body: "The piece grows on paper, without digital shortcuts.",
      },
    ],
    faq: [
      {
        question: "Do you work from photographs?",
        answer: "Yes, when the project needs it.",
      },
      {
        question: "Are prices public?",
        answer: "No. Each work is priced privately.",
      },
    ],
    closingCta: "Write to begin.",
  },
};

const pressItemsByLocale: Record<Locale, PressItem[]> = {
  it: [],
  en: [],
};

const artworkSeeds: ArtworkSeed[] = [
  buildArtworkSeed({
    id: "art-1",
    slug: "brad-pitt-portrait-2025",
    titleEn: "Brad Pitt",
    titleIt: "Brad Pitt",
    excerptEn: "Graphite portrait with a calm surface and visible hand.",
    excerptIt: "Ritratto in grafite con superficie calma e mano visibile.",
    coverAltEn: "Pencil portrait of Brad Pitt.",
    coverAltIt: "Ritratto a matita di Brad Pitt.",
    year: 2025,
    medium: "graphite",
    collection: "portraits",
    coverImage: "/artworks/instagram/portraits/2025-08-04T13-16-28Z_UTC_DM7zeyaIYYz_1.jpg",
    featured: true,
  }),
  buildArtworkSeed({
    id: "art-2",
    slug: "mother-and-child",
    titleEn: "Mother and Child",
    titleIt: "Madre e figlia",
    excerptEn: "A soft portrait built around closeness and silence.",
    excerptIt: "Un ritratto morbido costruito intorno a vicinanza e silenzio.",
    year: 2023,
    medium: "graphite",
    collection: "portraits",
    coverImage: "/artworks/instagram/portraits/2023-08-24T15-10-53Z_UTC_CwVPYv4MDBv_1.jpg",
  }),
  buildArtworkSeed({
    id: "art-3",
    slug: "male-portrait-2023",
    titleEn: "Male Portrait",
    titleIt: "Ritratto maschile",
    excerptEn: "A frontal portrait reduced to tone, structure, and gaze.",
    excerptIt: "Un ritratto frontale ridotto a tono, struttura e sguardo.",
    year: 2023,
    medium: "graphite",
    collection: "portraits",
    coverImage: "/artworks/instagram/portraits/2023-01-07T13-41-34Z_UTC_CnHbIJLMdGZ_1.webp",
  }),
  buildArtworkSeed({
    id: "art-4",
    slug: "soft-female-portrait",
    titleEn: "Soft Portrait",
    titleIt: "Ritratto morbido",
    excerptEn: "Graphite portrait with a quiet tonal fade.",
    excerptIt: "Ritratto in grafite con una dissolvenza tonale quieta.",
    year: 2022,
    medium: "graphite",
    collection: "portraits",
    coverImage: "/artworks/instagram/portraits/2022-05-07T11-50-20Z_UTC_CdQXpGbMz6h_1.webp",
  }),
  buildArtworkSeed({
    id: "art-5",
    slug: "portrait-smile",
    titleEn: "Portrait with Smile",
    titleIt: "Ritratto con sorriso",
    excerptEn: "A portrait held between likeness and softness.",
    excerptIt: "Un ritratto sospeso tra somiglianza e morbidezza.",
    year: 2022,
    medium: "graphite",
    collection: "portraits",
    coverImage: "/artworks/instagram/portraits/2022-01-07T13-23-45Z_UTC_CYbi8PxMSk7_1.webp",
  }),
  buildArtworkSeed({
    id: "art-6",
    slug: "classic-female-portrait",
    titleEn: "Classic Portrait",
    titleIt: "Ritratto classico",
    excerptEn: "A still portrait shaped through clear contrast and patience.",
    excerptIt: "Un ritratto fermo costruito con contrasto chiaro e pazienza.",
    year: 2021,
    medium: "graphite",
    collection: "portraits",
    coverImage: "/artworks/instagram/portraits/2021-10-31T14-06-57Z_UTC_CVsh1JSMQKw_1.jpg",
  }),
  buildArtworkSeed({
    id: "art-7",
    slug: "pink-ground-portrait",
    titleEn: "Pink Ground Portrait",
    titleIt: "Ritratto su fondo rosa",
    excerptEn: "A portrait study with graphite lifted by a colored ground.",
    excerptIt: "Uno studio di ritratto in cui la grafite si apre su un fondo colorato.",
    year: 2021,
    medium: "mixed-media",
    collection: "portraits",
    coverImage: "/artworks/instagram/portraits/2021-10-17T13-48-57Z_UTC_CVIcpCys5R9_1.jpg",
  }),
  buildArtworkSeed({
    id: "art-8",
    slug: "portrait-with-hand",
    titleEn: "Portrait with Hand",
    titleIt: "Ritratto con mano",
    excerptEn: "A close portrait built around a suspended gesture.",
    excerptIt: "Un ritratto ravvicinato costruito intorno a un gesto sospeso.",
    year: 2021,
    medium: "graphite",
    collection: "portraits",
    coverImage: "/artworks/instagram/portraits/2021-10-13T12-28-56Z_UTC_CU-ATg1MwnX_1.jpg",
  }),
  buildArtworkSeed({
    id: "art-9",
    slug: "quiet-female-portrait",
    titleEn: "Quiet Portrait",
    titleIt: "Ritratto quieto",
    excerptEn: "A pencil portrait kept simple and frontal.",
    excerptIt: "Un ritratto a matita tenuto semplice e frontale.",
    year: 2020,
    medium: "graphite",
    collection: "portraits",
    coverImage: "/artworks/instagram/portraits/2020-08-25T06-29-20Z_UTC_CETWDjbI56i_1.jpg",
  }),
  buildArtworkSeed({
    id: "art-10",
    slug: "female-portrait-2020",
    titleEn: "Female Portrait",
    titleIt: "Ritratto femminile",
    excerptEn: "An early graphite portrait focused on light and skin tone.",
    excerptIt: "Un ritratto in grafite concentrato su luce e pelle.",
    year: 2020,
    medium: "graphite",
    collection: "portraits",
    coverImage: "/artworks/instagram/portraits/2020-08-19T12-01-55Z_UTC_CEEfWK5o1-S_1.jpg",
  }),
  buildArtworkSeed({
    id: "art-11",
    slug: "eye-study-2021",
    titleEn: "Eye Study I",
    titleIt: "Studio dell'occhio I",
    excerptEn: "An eye study reduced to light, edge, and patience.",
    excerptIt: "Uno studio dell'occhio ridotto a luce, bordo e pazienza.",
    year: 2021,
    medium: "graphite",
    collection: "studies",
    coverImage: "/artworks/instagram/studies/2021-12-01T13-31-59Z_UTC_CW8SeMJMLQs_1.jpg",
  }),
  buildArtworkSeed({
    id: "art-12",
    slug: "lip-study",
    titleEn: "Lip Study",
    titleIt: "Studio delle labbra",
    excerptEn: "A close study where graphite follows texture and pressure.",
    excerptIt: "Uno studio ravvicinato in cui la grafite segue texture e pressione.",
    year: 2021,
    medium: "graphite",
    collection: "studies",
    coverImage: "/artworks/instagram/studies/2021-09-05T13-23-25Z_UTC_CTcQVSCMhik_1.jpg",
  }),
  buildArtworkSeed({
    id: "art-13",
    slug: "eye-study-2022",
    titleEn: "Eye Study II",
    titleIt: "Studio dell'occhio II",
    excerptEn: "Graphite study centered on the iris and the lower lid.",
    excerptIt: "Studio in grafite centrato su iride e palpebra inferiore.",
    year: 2022,
    medium: "graphite",
    collection: "studies",
    coverImage: "/artworks/instagram/studies/2022-12-11T13-00-42Z_UTC_CmB0_PnsbdI_1.webp",
  }),
  buildArtworkSeed({
    id: "art-14",
    slug: "hand-study",
    titleEn: "Hand Study",
    titleIt: "Studio di mani",
    excerptEn: "A study of hands built through line weight and soft tone.",
    excerptIt: "Uno studio di mani costruito con peso del segno e tono morbido.",
    year: 2022,
    medium: "graphite",
    collection: "studies",
    coverImage: "/artworks/instagram/studies/2022-09-15T12-39-05Z_UTC_CihxWyPMbvM_1.webp",
  }),
  buildArtworkSeed({
    id: "art-15",
    slug: "eye-study-2022-ii",
    titleEn: "Eye Study III",
    titleIt: "Studio dell'occhio III",
    excerptEn: "A small eye study built on tonal control.",
    excerptIt: "Un piccolo studio dell'occhio costruito sul controllo tonale.",
    year: 2022,
    medium: "graphite",
    collection: "studies",
    coverImage: "/artworks/instagram/studies/2022-07-09T13-15-42Z_UTC_Cfyvfa_MF9o_1.webp",
  }),
  buildArtworkSeed({
    id: "art-16",
    slug: "eye-study-2022-iii",
    titleEn: "Eye Study IV",
    titleIt: "Studio dell'occhio IV",
    excerptEn: "An eye drawing kept frontal and spare.",
    excerptIt: "Un disegno dell'occhio tenuto frontale e essenziale.",
    year: 2022,
    medium: "graphite",
    collection: "studies",
    coverImage: "/artworks/instagram/studies/2022-04-03T14-02-05Z_UTC_Cb5DsU8szdt_1.webp",
  }),
  buildArtworkSeed({
    id: "art-17",
    slug: "eye-study-2020",
    titleEn: "Eye Study V",
    titleIt: "Studio dell'occhio V",
    excerptEn: "A graphite eye with a slower, darker surface.",
    excerptIt: "Un occhio in grafite con superficie più lenta e più scura.",
    year: 2020,
    medium: "graphite",
    collection: "studies",
    coverImage: "/artworks/instagram/studies/2020-12-28T13-34-20Z_UTC_CJV-DullJPu_1.jpg",
  }),
  buildArtworkSeed({
    id: "art-18",
    slug: "blue-eye-study",
    titleEn: "Blue Eye",
    titleIt: "Occhio azzurro",
    excerptEn: "A small study where color enters a graphite structure.",
    excerptIt: "Un piccolo studio in cui il colore entra dentro una struttura in grafite.",
    year: 2020,
    medium: "mixed-media",
    collection: "studies",
    coverImage: "/artworks/instagram/studies/2020-09-01T12-16-42Z_UTC_CEl_X4LIlS1_1.jpg",
  }),
  buildArtworkSeed({
    id: "art-19",
    slug: "veiled-eye-study",
    titleEn: "Veiled Eye",
    titleIt: "Occhio velato",
    excerptEn: "A portrait fragment built around one visible eye.",
    excerptIt: "Un frammento di ritratto costruito intorno a un solo occhio visibile.",
    year: 2021,
    medium: "mixed-media",
    collection: "studies",
    coverImage: "/artworks/instagram/studies/2021-09-29T13-13-27Z_UTC_CUaCRWQsPdl_1.jpg",
  }),
  buildArtworkSeed({
    id: "art-20",
    slug: "ferrari-study",
    titleEn: "Ferrari Study",
    titleIt: "Studio Ferrari",
    excerptEn: "A hand-drawn vehicle study with bright surface and clean contour.",
    excerptIt: "Uno studio di veicolo disegnato a mano, con superficie luminosa e contorno pulito.",
    year: 2021,
    medium: "mixed-media",
    collection: "subjects",
    coverImage: "/artworks/instagram/subjects/2021-01-06T19-35-22Z_UTC_CJtyh5Olerw_1.jpg",
  }),
  buildArtworkSeed({
    id: "art-21",
    slug: "ducati-study",
    titleEn: "Ducati Study",
    titleIt: "Studio Ducati",
    excerptEn: "A motorcycle study built through contrast and saturated color.",
    excerptIt: "Uno studio di moto costruito con contrasto e colore saturo.",
    year: 2020,
    medium: "mixed-media",
    collection: "subjects",
    coverImage: "/artworks/instagram/subjects/2020-09-16T12-45-28Z_UTC_CFMqlnsI5dh_1.jpg",
  }),
  buildArtworkSeed({
    id: "art-22",
    slug: "horse-study",
    titleEn: "Horse Study",
    titleIt: "Studio del cavallo",
    excerptEn: "An animal study kept dark, quiet, and direct.",
    excerptIt: "Uno studio animale tenuto scuro, quieto e diretto.",
    year: 2022,
    medium: "charcoal",
    collection: "subjects",
    coverImage: "/artworks/instagram/subjects/2022-06-09T12-47-51Z_UTC_CelcdNPMnYp_1.webp",
  }),
];

function mapSeedToArtwork(seed: ArtworkSeed, locale: Locale): Artwork {
  return {
    id: seed.id,
    slug: seed.slug,
    title: getLocalizedValue(seed.title, locale),
    description: toPortableText(getLocalizedValue(seed.description, locale)),
    seoExcerpt: getLocalizedValue(seed.seoExcerpt, locale),
    year: seed.year,
    medium: seed.medium,
    dimensions: seed.dimensions,
    orientation: seed.orientation,
    collection: seed.collection,
    featured: seed.featured,
    availability: seed.availability,
    coverImage: {
      src: seed.coverImage,
      alt: getLocalizedValue(seed.coverAlt, locale),
    },
    detailImages: seed.detailImages.map((src, index) => ({
      src,
      alt: `${getLocalizedValue(seed.title, locale)} detail ${index + 1}`,
    })),
  };
}

export function getFallbackSiteSettings(locale: Locale) {
  return siteSettingsByLocale[locale];
}

export function getFallbackArtistProfile(locale: Locale) {
  return artistProfilesByLocale[locale];
}

export function getFallbackCommissionPage(locale: Locale) {
  return commissionPagesByLocale[locale];
}

export function getFallbackPressItems(locale: Locale) {
  return pressItemsByLocale[locale];
}

export function getFallbackArtworks(locale: Locale) {
  return artworkSeeds.map((seed) => mapSeedToArtwork(seed, locale));
}

export function filterFallbackArtworks(locale: Locale, filters: ArtworkFilters) {
  const allWorks = getFallbackArtworks(locale).sort((a, b) => b.year - a.year);

  return allWorks.filter((work) => {
    if (filters.medium && work.medium !== filters.medium) {
      return false;
    }

    if (filters.collection && work.collection !== filters.collection) {
      return false;
    }

    if (filters.availability && work.availability !== filters.availability) {
      return false;
    }

    if (filters.year && `${work.year}` !== filters.year) {
      return false;
    }

    return true;
  });
}
