import Reveal from '@/components/ui/Reveal';
import { books } from '@/data/books';

/**
 * One quiet full-width moment between the shelf and the biography.
 * The author's own line about why he writes what he writes.
 */
export default function QuoteBand() {
  const note = books.find((b) => b.authorNote)?.authorNote;
  if (!note) return null;

  return (
    <section className="relative overflow-hidden border-y border-bone/10 bg-ink/40 py-20 md:py-28">
      <div className="shell relative max-w-4xl text-center">
        <Reveal variant="scale">
          <span aria-hidden className="block font-display text-[4rem] leading-none text-ember/40">
            &ldquo;
          </span>
        </Reveal>
        <Reveal variant="up" delay={120}>
          <blockquote className="mt-2 font-display text-[clamp(1.4rem,3.2vw,2.1rem)] leading-snug text-bone text-balance">
            {note}
          </blockquote>
        </Reveal>
        <Reveal variant="fade" delay={260}>
          <p className="mt-7 font-condensed text-[0.68rem] uppercase tracking-[0.3em] text-ash">
            Victer Hugo Basurco
          </p>
        </Reveal>
      </div>
    </section>
  );
}
