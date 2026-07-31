import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { books, getBook, statusLabel } from '@/data/books';
import BookCover from '@/components/ui/BookCover';
import StatusBadge from '@/components/ui/StatusBadge';
import Reveal, { StaggerText } from '@/components/ui/Reveal';

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: 'Not found' };
  return {
    title: book.title,
    description: book.tagline,
    openGraph: {
      title: book.title,
      description: book.tagline,
      images: book.cover ? [book.cover] : undefined,
    },
  };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const others = books.filter((b) => b.slug !== book.slug);

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-[calc(var(--nav-h)+4rem)] md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-drift"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 60% 60% at 78% 30%, rgba(22,39,63,.9), transparent 70%), radial-gradient(circle at 20% 90%, rgba(226,112,58,.1), transparent 60%)',
          }}
        />

        <div className="shell relative grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal variant="cover" className="mx-auto w-[min(320px,70vw)] lg:w-full">
            <div className="animate-float">
              <BookCover book={book} priority sizes="(max-width: 1024px) 70vw, 340px" />
            </div>
          </Reveal>

          <div>
            <Reveal variant="fade">
              <div className="flex flex-wrap items-center gap-4">
                <StatusBadge status={book.status}>{statusLabel[book.status]}</StatusBadge>
                <span className="font-condensed text-[0.68rem] uppercase tracking-[0.26em] text-ash">
                  {book.genre}
                </span>
              </div>
            </Reveal>

            <StaggerText
              as="h1"
              text={book.title}
              className="mt-6 block font-display text-display-lg text-bone"
              delay={120}
            />

            <Reveal variant="up" delay={280}>
              <p className="mt-5 max-w-xl font-display text-[1.3rem] italic leading-snug text-ember">
                {book.tagline}
              </p>
            </Reveal>

            <Reveal variant="up" delay={360}>
              <dl className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {book.facts.map((f) => (
                  <div key={f.label} className="border-t border-bone/10 pt-3">
                    <dt className="font-condensed text-[0.6rem] uppercase tracking-[0.26em] text-ash">
                      {f.label}
                    </dt>
                    <dd className="mt-1.5 text-[0.95rem] text-parchment">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {book.buyLinks && book.buyLinks.length > 0 && (
              <Reveal variant="up" delay={420}>
                <div className="mt-10 flex flex-wrap gap-4">
                  {book.buyLinks.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn-ember">
                      <span>{l.label}</span>
                    </a>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-bone/10 py-20 md:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
          <div>
            <Reveal variant="fade">
              <span className="eyebrow">The story</span>
            </Reveal>
            <div className="mt-6 space-y-6">
              {book.blurb.map((p, i) => (
                <Reveal key={i} variant="up" delay={i * 90}>
                  <p className="max-w-prose text-[1.06rem] leading-[1.85] text-parchment/90">{p}</p>
                </Reveal>
              ))}
            </div>

            {book.authorNote && (
              <Reveal variant="up" delay={300}>
                <blockquote className="mt-12 border-l-2 border-ember pl-6 font-display text-[1.25rem] italic leading-snug text-bone">
                  {book.authorNote}
                  <footer className="mt-3 font-sans text-[0.68rem] uppercase not-italic tracking-[0.28em] text-ash">
                    Victer Hugo Basurco
                  </footer>
                </blockquote>
              </Reveal>
            )}
          </div>

          <aside className="space-y-8">
            {book.contentNote && (
              <Reveal variant="right">
                <div className="border border-bone/15 bg-ink/60 p-6">
                  <h2 className="eyebrow-muted">Content note</h2>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-ash">{book.contentNote}</p>
                </div>
              </Reveal>
            )}

            {book.supportNote && (
              <Reveal variant="right" delay={100}>
                <div className="border border-helix/30 bg-deep/30 p-6">
                  <h2 className="font-condensed text-[0.68rem] uppercase tracking-[0.26em] text-helix">
                    If you need support
                  </h2>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-parchment/90">
                    {book.supportNote}
                  </p>
                </div>
              </Reveal>
            )}

            <Reveal variant="right" delay={160}>
              <div className="border border-bone/15 p-6">
                <h2 className="eyebrow-muted">Also by the author</h2>
                <ul className="mt-4 space-y-3">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link href={`/works/${o.slug}`} className="link-more !text-parchment">
                        <span>{o.title}</span>
                        <span className="arrow" aria-hidden>&rarr;</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
