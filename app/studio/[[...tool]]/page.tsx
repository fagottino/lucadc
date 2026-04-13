import Link from "next/link";
import { NextStudio } from "next-sanity/studio";

import config from "../../../sanity.config";
import { isSanityConfigured } from "@/lib/sanity/env";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[color:var(--paper)] px-5">
        <div className="max-w-2xl rounded-[2rem] border border-stone-200/80 bg-white/80 p-8">
          <p className="text-xs tracking-[0.24em] text-stone-500 uppercase">
            Sanity setup required
          </p>
          <h1 className="mt-4 font-serif-display text-4xl text-stone-900">
            Add your Sanity environment variables first.
          </h1>
          <p className="mt-4 text-base leading-8 text-stone-700">
            Set `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and
            optionally `SANITY_API_WRITE_TOKEN` in `.env.local`, then reload the
            studio route.
          </p>
          <Link
            href="https://www.sanity.io/docs"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-stone-900 px-5 text-sm tracking-[0.2em] text-stone-50 uppercase transition hover:bg-[color:var(--accent-strong)]"
          >
            Sanity docs
          </Link>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
