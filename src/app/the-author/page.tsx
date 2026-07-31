import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { author } from '@/data/author';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'The Author',
  description: 'Biography of Victer Hugo Basurco — process engineer turned novelist.',
};

export default function AuthorPage() {
  return (
    <>
      <PageHeader
        label="Biography"
        title="Victer Hugo Basurco"
        intro="Paterson, New Jersey. Engineering school, thirty years of process work, and then the books."
      />

      <section className="py-20 md:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="space-y-6">
            {author.bio.map((p, i) => (
              <Reveal key={i} variant="up" delay={i * 90}>
                <p className="max-w-prose text-[1.06rem] leading-[1.85] text-parchment/90">{p}</p>
              </Reveal>
            ))}
            <Reveal variant="up" delay={400}>
              <Link href="/contact" className="btn-ember mt-6">
                <span>Write to Victer</span>
              </Link>
            </Reveal>
          </div>

          <div className="space-y-10">
            <Reveal variant="scale">
              <figure className="group relative">
                <span
                  aria-hidden
                  className="absolute -inset-3 border border-ember/40 transition-all duration-700 group-hover:inset-2"
                />
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={author.portrait}
                    alt={author.portraitAlt}
                    fill
                    sizes="(max-width: 1024px) 90vw, 420px"
                    className="object-cover grayscale transition-all duration-[900ms] group-hover:scale-[1.04] group-hover:grayscale-0"
                    priority
                  />
                </div>
              </figure>
            </Reveal>

            <Reveal variant="up" delay={140}>
              <dl className="grid gap-5">
                {author.facts.map((f) => (
                  <div key={f.label} className="border-t border-bone/10 pt-3">
                    <dt className="font-condensed text-[0.6rem] uppercase tracking-[0.26em] text-ember">
                      {f.label}
                    </dt>
                    <dd className="mt-1.5 text-[0.95rem] text-parchment">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
