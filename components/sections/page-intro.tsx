import { Reveal } from "@/components/ui/reveal";

export function PageIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <Reveal className="mx-auto max-w-3xl space-y-5 px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-xs tracking-[0.28em] text-stone-500 uppercase">{eyebrow}</p>
      <h1 className="font-serif-display text-balance text-5xl leading-none text-stone-900 sm:text-6xl">
        {title}
      </h1>
      <p className="max-w-2xl text-pretty text-base leading-8 text-stone-700">
        {body}
      </p>
    </Reveal>
  );
}
