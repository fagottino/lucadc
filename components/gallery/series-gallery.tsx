"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getDictionary } from "@/lib/i18n/dictionary";
import { resolveImageUrl } from "@/lib/images/resolve-image";
import type { Artwork, ArtworkCollection, Locale } from "@/types/site";

const collectionOrder: ArtworkCollection[] = ["portraits", "studies", "subjects"];

function isValidArtworkSlug(works: Artwork[], slug: string | null) {
  return slug ? works.some((work) => work.slug === slug) : false;
}

export function SeriesGallery({
  locale,
  works,
  pathname,
  initialArtworkSlug,
}: {
  locale: Locale;
  works: Artwork[];
  pathname: string;
  initialArtworkSlug: string | null;
}) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const dictionary = getDictionary(locale);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(
    isValidArtworkSlug(works, initialArtworkSlug) ? initialArtworkSlug : null,
  );

  const groupedWorks = collectionOrder
    .map((collection) => ({
      collection,
      label: dictionary.labels.collection[collection],
      items: works.filter((work) => work.collection === collection),
    }))
    .filter((group) => group.items.length > 0);

  const activeWork = works.find((work) => work.slug === activeSlug) ?? null;
  const activeSeries =
    groupedWorks.find((group) => group.collection === activeWork?.collection) ?? null;
  const activeSeriesIndex = activeSeries?.items.findIndex((work) => work.slug === activeSlug) ?? -1;

  function getArtworkUrl(slug: string) {
    return `${pathname}?art=${slug}#works`;
  }

  useEffect(() => {
    const onPopState = () => {
      const slug = new URLSearchParams(window.location.search).get("art");
      setActiveSlug(isValidArtworkSlug(works, slug) ? slug : null);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [works]);

  useEffect(() => {
    if (!activeSlug) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeSlug]);

  useEffect(() => {
    if (!activeWork || !activeSeries) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveSlug(null);
        router.replace(`${pathname}#works`, { scroll: false });
        return;
      }

      if (activeSeries.items.length < 2) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        const nextIndex =
          (activeSeriesIndex - 1 + activeSeries.items.length) % activeSeries.items.length;
        const previousArtwork = activeSeries.items[nextIndex];
        setActiveSlug(previousArtwork.slug);
        router.replace(`${pathname}?art=${previousArtwork.slug}#works`, { scroll: false });
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        const nextIndex = (activeSeriesIndex + 1) % activeSeries.items.length;
        const nextArtwork = activeSeries.items[nextIndex];
        setActiveSlug(nextArtwork.slug);
        router.replace(`${pathname}?art=${nextArtwork.slug}#works`, { scroll: false });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeSeries, activeSeriesIndex, activeWork, pathname, router]);

  function openArtwork(slug: string) {
    setActiveSlug(slug);
    router.push(getArtworkUrl(slug), { scroll: false });
  }

  function closeLightbox() {
    setActiveSlug(null);
    router.replace(`${pathname}#works`, { scroll: false });
  }

  function moveWithinSeries(direction: -1 | 1) {
    if (!activeSeries || activeSeriesIndex < 0) {
      return;
    }

    const nextIndex =
      (activeSeriesIndex + direction + activeSeries.items.length) % activeSeries.items.length;
    const nextArtwork = activeSeries.items[nextIndex];

    setActiveSlug(nextArtwork.slug);
    router.replace(getArtworkUrl(nextArtwork.slug), { scroll: false });
  }

  return (
    <section id="works" className="px-5 py-18 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="max-w-3xl space-y-5">
          <p className="text-[0.68rem] tracking-[0.24em] text-[color:var(--ink-soft)] uppercase">
            {locale === "it" ? "Disegni" : "Drawings"}
          </p>
          <h2 className="font-serif-display text-balance text-4xl text-[color:var(--ink)] sm:text-5xl">
            {locale === "it"
              ? "Ritratti, studi e soggetti su carta."
              : "Portraits, studies, and subjects on paper."}
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--ink-soft)]">
            {locale === "it"
              ? "Segni nati dalla mano, accolti dalla carta, rifiniti dal tempo."
              : "Signs born from the hand, welcomed by paper, refined by time."}
          </p>
        </div>

        <div className="space-y-18">
          {groupedWorks.map((group, groupIndex) => (
            <section key={group.collection} className="space-y-8">
              <div className="space-y-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif-display text-3xl text-[color:var(--ink)] sm:text-[2.6rem]">
                      <span className="sketch-underline">{group.label}</span>
                    </h3>
                    <p className="text-sm leading-7 text-[color:var(--ink-soft)]">
                      {group.items.length}{" "}
                      {locale === "it"
                        ? group.items.length === 1
                          ? "opera"
                          : "opere"
                        : group.items.length === 1
                          ? "work"
                          : "works"}
                    </p>
                  </div>
                  <div className="hidden h-18 w-8 shrink-0 sketch-divider-vertical md:block" />
                  <p className="max-w-xl text-sm leading-7 text-[color:var(--ink-soft)]">
                    {group.collection === "portraits"
                      ? locale === "it"
                        ? "Ritratti, espressioni, l'impronta del vissuto."
                        : "Portraits, expressions, the imprint of experience."
                      : group.collection === "studies"
                        ? locale === "it"
                          ? "Occhi, mani, dettagli e prove di segno."
                          : "Eyes, hands, details, and line studies."
                        : locale === "it"
                          ? "Altri soggetti disegnati a mano, senza artificio digitale."
                          : "Other hand-drawn subjects, without digital polish."}
                  </p>
                </div>
                <div className="sketch-divider" aria-hidden />
              </div>

              <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {group.items.map((work, index) => (
                  <button
                    key={work.id}
                    type="button"
                    onClick={() => openArtwork(work.slug)}
                    className="group text-left"
                    aria-haspopup="dialog"
                    aria-label={
                      locale === "it"
                        ? `Apri ${work.title}`
                        : `Open ${work.title}`
                    }
                  >
                    <div className="sketch-frame bg-[color:var(--paper-deep)] p-2">
                      <Image
                        src={resolveImageUrl(work.coverImage, { width: 1200, height: 1500 })}
                        alt={work.coverImage.alt}
                        width={1200}
                        height={1500}
                        priority={groupIndex === 0 && index < 2}
                        className="aspect-[4/5] h-full w-full object-cover grayscale-[0.02] transition duration-300 group-hover:scale-[1.01]"
                      />
                    </div>
                    <div className="mt-6 space-y-2">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h4 className="font-serif-display text-2xl text-[color:var(--ink)]">
                          {work.title}
                        </h4>
                        <span className="text-xs tracking-[0.18em] text-[color:var(--ink-soft)] uppercase">
                          {work.year}
                        </span>
                      </div>
                      <p className="text-sm leading-7 text-[color:var(--ink-soft)]">
                        {work.dimensions
                          ? `${dictionary.labels.medium[work.medium]} · ${work.dimensions}`
                          : dictionary.labels.medium[work.medium]}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeWork ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[rgba(18,14,12,0.72)] px-4 py-8 backdrop-blur-sm sm:px-8 sm:py-10"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="artwork-lightbox-title"
              className="sketch-modal paper-card paper-shadow relative w-full max-w-6xl bg-[color:var(--paper)] p-5 sm:p-7 lg:p-8"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.24, ease: [0.2, 0.9, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.68rem] tracking-[0.24em] text-[color:var(--ink-soft)] uppercase">
                  {dictionary.labels.collection[activeWork.collection]}
                </p>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeLightbox}
                  className="sketch-link text-xs tracking-[0.18em] text-[color:var(--ink-soft)] uppercase hover:text-[color:var(--ink)] focus-visible:outline-none"
                >
                  {locale === "it" ? "Chiudi" : "Close"}
                </button>
              </div>

              <div className="sketch-divider mt-4" aria-hidden />

              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] lg:items-start">
                <div className="sketch-frame bg-[color:var(--paper-deep)] p-2">
                  <Image
                    src={resolveImageUrl(activeWork.coverImage, { width: 1800, height: 2200 })}
                    alt={activeWork.coverImage.alt}
                    width={1800}
                    height={2200}
                    priority
                    className="h-full max-h-[78vh] w-full object-contain"
                  />
                </div>

                <aside className="space-y-6">
                  <div className="space-y-3">
                    <h3
                      id="artwork-lightbox-title"
                      className="font-serif-display text-4xl text-[color:var(--ink)] sm:text-5xl"
                    >
                      {activeWork.title}
                    </h3>
                    <p className="max-w-md text-base leading-8 text-[color:var(--ink-soft)]">
                      {activeWork.seoExcerpt}
                    </p>
                  </div>

                  <dl className="space-y-5 text-sm leading-7 text-[color:var(--ink)]">
                    <MetadataRow
                      label={locale === "it" ? "Serie" : "Series"}
                      value={dictionary.labels.collection[activeWork.collection]}
                    />
                    <MetadataRow
                      label={dictionary.works.mediumLabel}
                      value={dictionary.labels.medium[activeWork.medium]}
                    />
                    <MetadataRow
                      label={dictionary.works.yearLabel}
                      value={`${activeWork.year}`}
                    />
                    {activeWork.dimensions ? (
                      <MetadataRow
                        label={dictionary.common.dimensions}
                        value={activeWork.dimensions}
                      />
                    ) : null}
                  </dl>

                  {activeSeries && activeSeries.items.length > 1 ? (
                    <div className="space-y-4">
                      <div className="sketch-divider" aria-hidden />
                      <div className="flex flex-wrap gap-4">
                        <button
                          type="button"
                          onClick={() => moveWithinSeries(-1)}
                          className="sketch-link text-xs tracking-[0.18em] text-[color:var(--ink-soft)] uppercase hover:text-[color:var(--ink)]"
                        >
                          {locale === "it" ? "Precedente" : "Previous"}
                        </button>
                        <button
                          type="button"
                          onClick={() => moveWithinSeries(1)}
                          className="sketch-link text-xs tracking-[0.18em] text-[color:var(--ink-soft)] uppercase hover:text-[color:var(--ink)]"
                        >
                          {locale === "it" ? "Successiva" : "Next"}
                        </button>
                      </div>
                    </div>
                  ) : null}
                </aside>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <dt className="text-[0.66rem] tracking-[0.2em] text-[color:var(--ink-soft)] uppercase">
        {label}
      </dt>
      <dd className="font-serif-display text-[1.35rem] text-[color:var(--ink)]">{value}</dd>
    </div>
  );
}
