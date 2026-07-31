import Link from 'next/link';
import { books } from '@/data/books';
import { site, socials } from '@/data/site';
import EmberTree from './EmberTree';
import Reveal from '@/components/ui/Reveal';

const columns = [
  {
    heading: 'Read',
    links: books.map((b) => ({ label: b.title, href: `/works/${b.slug}` })),
  },
  {
    heading: 'Site',
    links: [
      { label: 'The Author', href: '/the-author' },
      { label: 'Upcoming', href: '/upcoming' },
      { label: 'News', href: '/news' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    heading: 'Reach',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Announcements', href: '/#announcements' },
      { label: 'All works', href: '/works' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const live = socials.filter((s) => s.enabled && s.href);

  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-night">
      <div className="shell relative grid gap-14 pb-10 pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        {/* Left: identity + sitemap */}
        <div>
          <Reveal variant="left">
            <p className="font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-bone text-balance">
              {site.tagline}
            </p>
            <span className="mt-5 block h-px w-24 bg-ember" aria-hidden />
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col, ci) => (
              <Reveal key={col.heading} variant="up" delay={ci * 90}>
                <h3 className="eyebrow-muted">{col.heading}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        className="text-[0.92rem] text-parchment transition-colors duration-300 hover:text-ember"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          {live.length > 0 && (
            <Reveal variant="up" delay={260}>
              <div className="mt-12">
                <h3 className="eyebrow-muted">Elsewhere</h3>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {live.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-more !text-parchment"
                      >
                        <span>{s.label}</span>
                        <span className="arrow" aria-hidden>
                          &nearr;
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>

        {/* Right: the signature */}
        <Reveal variant="scale" className="flex flex-col items-center justify-end">
          <EmberTree className="w-full max-w-[420px] cursor-pointer" />
          <p className="mt-2 text-center font-condensed text-[0.62rem] uppercase tracking-[0.28em] text-ash/70">
            Hover the tree
          </p>
        </Reveal>
      </div>

      <div className="shell relative flex flex-col gap-3 border-t border-bone/10 py-6 text-[0.78rem] text-ash sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {year} {site.name}. All rights reserved.
        </p>
        <p className="font-condensed uppercase tracking-[0.22em]">{site.location}</p>
      </div>
    </footer>
  );
}
