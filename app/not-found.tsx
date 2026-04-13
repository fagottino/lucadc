import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[color:var(--paper)] px-5 text-center">
      <p className="text-xs tracking-[0.28em] text-stone-500 uppercase">404</p>
      <h1 className="mt-4 font-serif-display text-5xl text-stone-900 sm:text-6xl">
        Pagina non trovata.
      </h1>
      <p className="mt-5 max-w-xl text-base leading-8 text-stone-700">
        La pagina richiesta non esiste o non e ancora pubblicata.
      </p>
      <Link
        href="/it"
        className="mt-8 inline-flex min-h-13 items-center justify-center rounded-full bg-stone-900 px-6 text-sm tracking-[0.2em] text-stone-50 uppercase transition hover:bg-[color:var(--accent-strong)]"
      >
        Torna alla home
      </Link>
    </main>
  );
}
