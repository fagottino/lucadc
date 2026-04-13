# Luca DC Portfolio

Single-page portfolio for Luca DC, with Italian as the main language and English as the second, built with Next.js App Router, Tailwind CSS v4, and Sanity.

## Product direction

- Single-page structure with anchor navigation
- Public artwork grouped by type
- Homepage lightbox driven by `?art=<slug>#works`
- Minimal paper-and-ink palette with reusable hand-drawn line assets
- Direct contact only: email, Instagram, WhatsApp

## Stack

- `Next.js 16` for routing, metadata, and server-first rendering
- `Tailwind CSS v4` for layout and utility styling
- `Sanity` for content modeling and Studio editing
- `Framer Motion` for restrained reveal and lightbox motion

## Run locally

```bash
npm install
npm run dev
```

The app starts at [http://localhost:3000](http://localhost:3000) and redirects to `/it`.

## Environment

Copy `.env.example` to `.env.local` and fill in the values you need:

```bash
cp .env.example .env.local
```

Required for the frontend:

- `NEXT_PUBLIC_SITE_URL`

Required for Sanity CMS:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

If Sanity is not configured, the site falls back to local sample content so you can still develop the frontend and UI.

## Key routes

- `/it` and `/en`
- `/{locale}?art=<slug>#works` for the homepage lightbox state
- `/studio`

Legacy routes such as `/it/works/[slug]` and `/en/works/[slug]` redirect back to the homepage lightbox URL.

## Useful commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run sanity
npm run instagram:sync
npm run instagram:sync:browser
npm run instagram:curate
```

## Instagram intake workflow

Instagram media is intentionally kept out of the public site surface. Raw downloads go to:

```text
assets/intake/instagram/luca._.dc/
```

That folder is gitignored. The intake workflow downloads public feed posts and reels, media only, with no captions or metadata JSON:

```bash
npm run instagram:sync
```

Or explicitly:

```bash
python3 -m instaloader \
  --reels \
  --no-captions \
  --no-metadata-json \
  --no-profile-pic \
  --dirname-pattern="assets/intake/instagram/{profile}" \
  --filename-pattern="{date_utc}_UTC_{shortcode}" \
  -- luca._.dc
```

If anonymous public scraping rate-limits or fails, use the browser-cookie fallback:

```bash
npm run instagram:sync:browser
```

Or explicitly:

```bash
python3 -m gallery_dl \
  --cookies-from-browser chrome/instagram.com \
  -D assets/intake/instagram/luca._.dc/posts \
  --download-archive assets/intake/instagram/luca._.dc/archive.txt \
  -f "{date:%Y-%m-%dT%H-%M-%SZ}_UTC_{shortcode}_{num}.{extension}" \
  "https://www.instagram.com/luca._.dc/posts/"

python3 -m gallery_dl \
  --cookies-from-browser chrome/instagram.com \
  -D assets/intake/instagram/luca._.dc/reels \
  --download-archive assets/intake/instagram/luca._.dc/reels-archive.txt \
  -f "{date:%Y-%m-%dT%H-%M-%SZ}_UTC_{shortcode}_{num}.{extension}" \
  "https://www.instagram.com/luca._.dc/reels/"
```

Curate the raw downloads before publishing them:

```bash
npm run instagram:curate
```

The curation step keeps only drawing-related files, moves the approved originals into `assets/intake/instagram/luca._.dc/selected/`, copies the public assets into `public/`, and deletes the rest of the raw intake.

## Content model

The Sanity studio includes schema types for:

- `siteSettings`
- `artwork`
- `artistProfile`
- `commissionPage`
- `pressItem`

Artwork keeps the internal `collection` field, but the public UI maps it to three visible types:

- `Portraits`
- `Studies`
- `Subjects`

## Deployment

Deploy to Vercel. Set the same environment variables in the Vercel project, connect the custom domain, and use preview deployments for review before launch.
