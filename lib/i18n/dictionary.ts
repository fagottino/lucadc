import type {
  ArtworkAvailability,
  ArtworkCollection,
  ArtworkMedium,
  Locale,
} from "@/types/site";

type Dictionary = {
  nav: {
    works: string;
    about: string;
    commissions: string;
    contact: string;
  };
  common: {
    featuredWorks: string;
    featuredTitle: string;
    viewArchive: string;
    enquire: string;
    available: string;
    reserved: string;
    sold: string;
    languageLabel: string;
    backToWorks: string;
    relatedWorks: string;
    privacy: string;
    pageLabel: string;
    resetFilters: string;
    readMore: string;
    all: string;
    dimensions: string;
  };
  home: {
    processEyebrow: string;
    processTitle: string;
    processBody: string;
    pressEyebrow: string;
    pressTitle: string;
    commissionsEyebrow: string;
    commissionsTitle: string;
    commissionsBody: string;
  };
  works: {
    title: string;
    intro: string;
    filterTitle: string;
    noResults: string;
    paginationPrevious: string;
    paginationNext: string;
    mediumLabel: string;
    collectionLabel: string;
    availabilityLabel: string;
    yearLabel: string;
  };
  about: {
    title: string;
    intro: string;
    materials: string;
    process: string;
    exhibitions: string;
  };
  commissions: {
    title: string;
    introTitle: string;
    processTitle: string;
    faqTitle: string;
    contactTitle: string;
  };
  contact: {
    title: string;
    intro: string;
    responseTime: string;
    quickLinks: string;
    form: {
      name: string;
      email: string;
      projectType: string;
      country: string;
      preferredChannel: string;
      timeline: string;
      message: string;
      honeypot: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  footer: {
    note: string;
  };
  labels: {
    medium: Record<ArtworkMedium, string>;
    collection: Record<ArtworkCollection, string>;
    availability: Record<ArtworkAvailability, string>;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      works: "Works",
      about: "Origin",
      commissions: "Commissions",
      contact: "Contact",
    },
    common: {
      featuredWorks: "Drawings",
      featuredTitle: "A first reading of the work.",
      viewArchive: "Browse drawings",
      enquire: "Enquire about a commission",
      available: "Available",
      reserved: "Reserved",
      sold: "Sold",
      languageLabel: "Language",
      backToWorks: "Back to works",
      relatedWorks: "Related works",
      privacy: "Privacy",
      pageLabel: "Page",
      resetFilters: "Reset filters",
      readMore: "Read more",
      all: "All",
      dimensions: "Dimensions",
    },
    home: {
      processEyebrow: "Studio process",
      processTitle: "Slow work, visible hand.",
      processBody: "Paper, graphite, patience.",
      pressEyebrow: "Notes",
      pressTitle: "A quiet body of work.",
      commissionsEyebrow: "Private commissions",
      commissionsTitle: "Original drawings on request.",
      commissionsBody: "Direct contact, private pricing, handmade work.",
    },
    works: {
      title: "Works",
      intro: "Portraits, studies, and other hand-drawn subjects.",
      filterTitle: "Filter the archive",
      noResults: "No works match the current filters.",
      paginationPrevious: "Previous",
      paginationNext: "Next",
      mediumLabel: "Medium",
      collectionLabel: "Collection",
      availabilityLabel: "Availability",
      yearLabel: "Year",
    },
    about: {
      title: "About",
      intro: "Origin, materials, and process.",
      materials: "Materials",
      process: "How the drawings are made",
      exhibitions: "Exhibitions and press",
    },
    commissions: {
      title: "Commissions",
      introTitle: "Commissioning an original drawing",
      processTitle: "How the process works",
      faqTitle: "Questions clients usually ask",
      contactTitle: "Ready to discuss a piece?",
    },
    contact: {
      title: "Contact",
      intro:
        "Use the form for commission requests and serious inquiries. Instagram and WhatsApp stay available for quick first contact.",
      responseTime: "Typical response time",
      quickLinks: "Other ways to reach out",
      form: {
        name: "Name",
        email: "Email",
        projectType: "Project type",
        country: "Country",
        preferredChannel: "Preferred contact channel",
        timeline: "Timeline",
        message: "Tell me about the drawing you have in mind",
        honeypot: "Leave this field empty",
        submit: "Send inquiry",
        sending: "Sending...",
        success: "Your message is on its way. You should hear back shortly.",
        error:
          "Something went wrong while sending the inquiry. Try again or use the direct contact links below.",
      },
    },
    footer: {
      note: "The essence in the sign, the care over time.",
    },
    labels: {
      medium: {
        graphite: "Graphite",
        charcoal: "Charcoal",
        ink: "Ink",
        "mixed-media": "Mixed media",
      },
      collection: {
        portraits: "Portraits",
        studies: "Studies",
        subjects: "Subjects",
      },
      availability: {
        available: "Available",
        reserved: "Reserved",
        sold: "Sold",
      },
    },
  },
  it: {
    nav: {
      works: "Opere",
      about: "Origine",
      commissions: "Commissioni",
      contact: "Contatti",
    },
    common: {
      featuredWorks: "Disegni",
      featuredTitle: "Una prima lettura del lavoro.",
      viewArchive: "Sfoglia i disegni",
      enquire: "Richiedi una commissione",
      available: "Disponibile",
      reserved: "Riservato",
      sold: "Venduto",
      languageLabel: "Lingua",
      backToWorks: "Torna alle opere",
      relatedWorks: "Opere correlate",
      privacy: "Privacy",
      pageLabel: "Pagina",
      resetFilters: "Azzera i filtri",
      readMore: "Approfondisci",
      all: "Tutte",
      dimensions: "Dimensioni",
    },
    home: {
      processEyebrow: "Processo in studio",
      processTitle: "Lavoro lento, mano visibile.",
      processBody: "Carta, grafite, pazienza.",
      pressEyebrow: "Note",
      pressTitle: "Un lavoro raccolto.",
      commissionsEyebrow: "Commissioni private",
      commissionsTitle: "Disegni originali su richiesta.",
      commissionsBody: "Contatto diretto, prezzo privato, lavoro a mano.",
    },
    works: {
      title: "Opere",
      intro: "Ritratti, studi e altri soggetti disegnati a mano.",
      filterTitle: "Filtra l'archivio",
      noResults: "Nessuna opera corrisponde ai filtri attivi.",
      paginationPrevious: "Precedente",
      paginationNext: "Successiva",
      mediumLabel: "Tecnica",
      collectionLabel: "Serie",
      availabilityLabel: "Disponibilità",
      yearLabel: "Anno",
    },
    about: {
      title: "Biografia",
      intro: "Origine, materiali e processo.",
      materials: "Materiali",
      process: "Come nascono i disegni",
      exhibitions: "Mostre e stampa",
    },
    commissions: {
      title: "Commissioni",
      introTitle: "Commissionare un disegno originale",
      processTitle: "Come funziona il percorso",
      faqTitle: "Domande frequenti",
      contactTitle: "Vuoi parlare di un progetto?",
    },
    contact: {
      title: "Contatti",
      intro:
        "Usa il modulo per richieste di commissione e collaborazioni. Instagram e WhatsApp restano disponibili per un primo contatto veloce.",
      responseTime: "Tempo medio di risposta",
      quickLinks: "Altri canali",
      form: {
        name: "Nome",
        email: "Email",
        projectType: "Tipo di progetto",
        country: "Paese",
        preferredChannel: "Canale preferito",
        timeline: "Tempistiche",
        message: "Raccontami il disegno che hai in mente",
        honeypot: "Lascia vuoto questo campo",
        submit: "Invia richiesta",
        sending: "Invio in corso...",
        success: "Messaggio inviato. Riceverai presto una risposta.",
        error:
          "Si è verificato un problema durante l'invio. Riprova oppure usa i contatti diretti qui sotto.",
      },
    },
    footer: {
      note: "L'essenza nel segno, la cura nel tempo.",
    },
    labels: {
      medium: {
        graphite: "Grafite",
        charcoal: "Carbone",
        ink: "Inchiostro",
        "mixed-media": "Tecnica mista",
      },
      collection: {
        portraits: "Ritratti",
        studies: "Studi",
        subjects: "Soggetti",
      },
      availability: {
        available: "Disponibile",
        reserved: "Riservato",
        sold: "Venduto",
      },
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
