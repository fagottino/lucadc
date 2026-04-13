import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { PortableTextContent } from "@/components/ui/portable-text";
import { resolveImageUrl } from "@/lib/images/resolve-image";
import type { ArtistProfile, Locale } from "@/types/site";

export function ProcessSection({
  locale,
  profile,
}: {
  locale: Locale;
  profile: ArtistProfile;
}) {
  return (
    <section id="about" className="sketch-rule-before px-5 py-18 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl space-y-12">
        <Reveal className="max-w-3xl space-y-5">
          <p className="text-[0.68rem] tracking-[0.24em] text-[color:var(--ink-soft)] uppercase">
            {locale === "it" ? "Origine e processo" : "Origin and process"}
          </p>
          <h2
            id="artist"
            className="font-serif-display text-balance text-4xl text-[color:var(--ink)] sm:text-5xl"
          >
            {profile.statement}
          </h2>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[320px_minmax(0,1fr)]">
          <Reveal className="space-y-6">
            <div className="sketch-frame bg-[color:var(--paper-deep)] p-2">
              <Image
                src={resolveImageUrl(profile.portrait, { width: 900, height: 1200 })}
                alt={profile.portrait.alt}
                width={900}
                height={1200}
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </div>
            <div className="space-y-3">
              <p className="text-[0.66rem] tracking-[0.2em] text-[color:var(--ink-soft)] uppercase">
                {locale === "it" ? "Materiali" : "Materials"}
              </p>
              <p className="text-sm leading-7 text-[color:var(--ink-soft)]">
                {profile.materials.join(" · ")}
              </p>
            </div>
          </Reveal>

          <div className="space-y-12">
            <Reveal className="space-y-5">
              <PortableTextContent value={profile.biography} className="paper-stack" />
            </Reveal>

            <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
              <div className="space-y-5">
                <p className="text-[0.66rem] tracking-[0.2em] text-[color:var(--ink-soft)] uppercase">
                  {locale === "it" ? "Metodo di lavoro" : "Working method"}
                </p>
                <div className="space-y-4">
                  {profile.processNotes.map((note) => (
                    <div key={note} className="space-y-4">
                      <p className="text-sm leading-7 text-[color:var(--ink-soft)]">{note}</p>
                      <div className="sketch-divider" aria-hidden />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {profile.processImages.map((image) => (
                  <div key={image.alt} className="sketch-frame bg-[color:var(--paper-deep)] p-2">
                    <Image
                      src={resolveImageUrl(image, {
                        width: 900,
                        height: 1200,
                      })}
                      alt={image.alt}
                      width={900}
                      height={1200}
                      className="aspect-[4/5] h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </Reveal>

            {profile.processVideos?.length ? (
              <Reveal className="space-y-5">
                <p className="text-[0.66rem] tracking-[0.2em] text-[color:var(--ink-soft)] uppercase">
                  Reels
                </p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {profile.processVideos.map((video) => (
                    <div key={video.src} className="space-y-3">
                      <div className="sketch-frame bg-[color:var(--paper-deep)] p-2">
                        <video
                          controls
                          muted
                          playsInline
                          preload="metadata"
                          className="aspect-[4/5] h-full w-full object-cover"
                        >
                          <source src={video.src} type="video/mp4" />
                        </video>
                      </div>
                      <p className="text-sm leading-7 text-[color:var(--ink-soft)]">
                        {video.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
