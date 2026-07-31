'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { navItems } from '@/data/site';
import { books } from '@/data/books';
import { news } from '@/data/news';
import { faqs } from '@/data/faq';
import Logo from './Logo';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, y / height) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Lock the page behind the drawer / search sheet.
  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-bone/10 bg-night/88 backdrop-blur-xl'
            : 'border-b border-transparent bg-gradient-to-b from-night/85 to-transparent'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }}
      >
        <div className="shell flex items-center justify-between" style={{ height: 'var(--nav-h)' }}>
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navItems
              .filter((i) => !i.featured)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  data-active={isActive(item.href)}
                >
                  {item.label}
                </Link>
              ))}

            {navItems
              .filter((i) => i.featured)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link !text-ember"
                  data-active={isActive(item.href)}
                >
                  {item.label}
                </Link>
              ))}

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search this site"
              className="ml-1 text-parchment transition-colors duration-300 hover:text-ember"
            >
              <SearchIcon />
            </button>
          </nav>

          <div className="flex items-center gap-5 lg:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search this site"
              className="text-parchment"
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="relative h-6 w-7"
            >
              <span
                className={`absolute left-0 h-[2px] w-7 bg-bone transition-all duration-500 ${
                  menuOpen ? 'top-3 rotate-45' : 'top-1'
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }}
              />
              <span
                className={`absolute left-0 top-3 h-[2px] w-7 bg-bone transition-opacity duration-300 ${
                  menuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-7 bg-bone transition-all duration-500 ${
                  menuOpen ? 'top-3 -rotate-45' : 'top-5'
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }}
              />
            </button>
          </div>
        </div>

        {/* Reading progress — a helix-tinted hairline */}
        <div
          aria-hidden
          className="h-px origin-left bg-gradient-to-r from-helix via-ember to-ember-600"
          style={{ transform: `scaleX(${progress})`, transition: 'transform .15s linear' }}
        />
      </header>

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} isActive={isActive} />
      <SearchSheet open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

/* -------------------------------------------------------------------------- */

function MobileDrawer({
  open,
  onClose,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  return (
    <div
      className={`fixed inset-0 z-40 lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-night/95 backdrop-blur-xl transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <nav
        aria-label="Mobile"
        className="relative flex h-full flex-col justify-center px-8"
        style={{ paddingTop: 'var(--nav-h)' }}
      >
        {navItems.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`group border-b border-bone/10 py-5 font-display text-[1.9rem] leading-none transition-colors duration-300 ${
              item.featured ? 'text-ember' : isActive(item.href) ? 'text-ember' : 'text-bone'
            }`}
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity .5s ease ${open ? 120 + i * 60 : 0}ms, transform .7s cubic-bezier(.16,1,.3,1) ${
                open ? 120 + i * 60 : 0
              }ms`,
            }}
          >
            <span className="flex items-center justify-between">
              {item.label}
              <span className="font-condensed text-[0.65rem] tracking-[0.3em] text-ash transition-transform duration-300 group-hover:translate-x-1">
                {String(i + 1).padStart(2, '0')}
              </span>
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

interface Hit {
  title: string;
  href: string;
  section: string;
  text: string;
}

function SearchSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');

  const index: Hit[] = useMemo(
    () => [
      ...books.map((b) => ({
        title: b.title,
        href: `/works/${b.slug}`,
        section: 'Books',
        text: `${b.tagline} ${b.genre} ${b.blurb.join(' ')}`,
      })),
      ...news.map((n) => ({
        title: n.title,
        href: n.href ?? '/news',
        section: 'News',
        text: `${n.excerpt} ${n.venue ?? ''} ${n.city ?? ''}`,
      })),
      ...faqs.map((f) => ({ title: f.q, href: '/faq', section: 'FAQ', text: f.a })),
      { title: 'The Author', href: '/the-author', section: 'Pages', text: 'biography engineer New Jersey Paterson' },
      { title: 'Contact', href: '/contact', section: 'Pages', text: 'message email write to the author' },
    ],
    [],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return index
      .filter((h) => `${h.title} ${h.text} ${h.section}`.toLowerCase().includes(q))
      .slice(0, 7);
  }, [query, index]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[55] transition-opacity duration-500 ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-night/94 backdrop-blur-xl" onClick={onClose} />
      <div className="shell relative pt-[calc(var(--nav-h)+3rem)]">
        <label className="field-label" htmlFor="site-search">
          Search this site
        </label>
        <input
          id="site-search"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try “Tatyana”, “Hawthorne”, “Suicide Council”"
          className="field !bg-transparent !border-x-0 !border-t-0 !border-b-2 !border-bone/20 !px-0 !py-4 font-display !text-[clamp(1.4rem,4vw,2.4rem)] focus:!border-ember"
        />

        <div className="mt-8 space-y-1">
          {query.trim().length >= 2 && results.length === 0 && (
            <p className="text-ash">Nothing matched that. Try a book title or a city.</p>
          )}
          {results.map((hit) => (
            <Link
              key={`${hit.section}-${hit.title}`}
              href={hit.href}
              onClick={onClose}
              className="group flex items-baseline justify-between border-b border-bone/10 py-4 transition-colors duration-300 hover:border-ember/50"
            >
              <span className="font-display text-[1.15rem] text-bone transition-colors group-hover:text-ember">
                {hit.title}
              </span>
              <span className="font-condensed text-[0.62rem] uppercase tracking-[0.26em] text-ash">
                {hit.section}
              </span>
            </Link>
          ))}
        </div>

        <button type="button" onClick={onClose} className="link-more mt-10">
          <span>Close</span>
          <span className="arrow" aria-hidden>
            &times;
          </span>
        </button>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="8.6" cy="8.6" r="6.1" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13.2 13.2 18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
