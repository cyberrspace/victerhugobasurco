import Image from "next/image";
import Link from "next/link";
import { author } from "@/data/author";
import Reveal from "@/components/ui/Reveal";

export default function AuthorStrip() {
  return (
    <section id="author" className="relative py-16 sm:py-20 md:py-28 lg:py-32">
      <div
        aria-hidden
        className="atmos-soft pointer-events-none absolute inset-0"
      />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal variant="scale">
          <figure className="group relative">
            {/* Offset ember frame that closes in on hover */}
            <span
              aria-hidden
              className="absolute -inset-3 border border-ember/40 transition-all duration-700 group-hover:inset-2"
              style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={author.portrait}
                alt={author.portraitAlt}
                fill
                sizes="(max-width: 1024px) 80vw, 420px"
                className="object-cover grayscale transition-all duration-[900ms] group-hover:scale-[1.04] group-hover:grayscale-0"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 fade-to-canvas opacity-60"
              />
            </div>
            <figcaption className="mt-4 font-condensed text-[0.62rem] uppercase tracking-[0.28em] text-muted">
              {author.name} · {author.born}
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <Reveal variant="fade">
            <span className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-ember/70" aria-hidden />
              The author
            </span>
          </Reveal>

          <Reveal variant="wipe" delay={100}>
            <h2 className="mt-5 text-display-md text-balance">
              Thirty years reading systems. Now he writes the ones that fail.
            </h2>
          </Reveal>

          <Reveal variant="up" delay={200}>
            <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-muted">
              <p>{author.bio[0]}</p>
              <p>{author.bio[1]}</p>
            </div>
          </Reveal>

          <Reveal variant="up" delay={300}>
            <dl className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {author.facts.slice(0, 4).map((f) => (
                <div key={f.label} className="border-t border-hairline pt-3">
                  <dt className="font-condensed text-[0.62rem] uppercase tracking-[0.26em] text-ember">
                    {f.label}
                  </dt>
                  <dd className="mt-1.5 text-[0.95rem] text-secondary">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal variant="up" delay={380}>
            <Link href="/the-author" className="link-more mt-10">
              <span>Full biography</span>
              <span className="arrow" aria-hidden>
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
