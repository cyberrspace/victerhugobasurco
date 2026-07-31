'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { books, statusLabel } from '@/data/books';
import { upcomingAppearances, formatDate } from '@/data/news';
import BookCover from '@/components/ui/BookCover';

const SLIDE_MS = 7000;

interface Slide {
  key: string;
  kicker: string;
  title: string;
  line: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  bookSlug?: string;
  /** Pure-type slide, no jacket. */
  standalone?: boolean;
  meta?: string;
}

function buildSlides(): Slide[] {
  const slides: Slide[] = books.map((b) => ({
    key: b.slug,
    kicker: statusLabel[b.status],
    title: b.title,
    line: b.tagline,
    primary: { label: b.status === 'available' ? 'Read the opening' : 'More info', href: `/works/${b.slug}` },
    secondary: { label: 'All works', href: '/works' },
    bookSlug: b.slug,
    meta: b.genre,
  }));

  const next = upcomingAppearances()[0];
  if (next) {
    slides.push({
      key: next.id,
      kicker: 'Appearance',
      title: 'Guest lecture',
      line: `${next.venue}, ${next.city} — ${formatDate(next.date)}${next.time ? ` at ${next.time}` : ''}.`,
      primary: { label: 'Event details', href: '/upcoming' },
      secondary: { label: 'Invite the author', href: '/contact' },
      standalone: true,
      meta: 'Free and open to readers',
    });
  }

  return slides;
}

export default function Hero() {
  const slides = buildSlides();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (n: number) => setIndex(((n % slides.length) + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (paused || slides.length < 2) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, slides.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, go]);

  return (
    <section
      aria-label="Featured"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-[calc(var(--nav-h)+3rem)]"
    >
      {/* Atmosphere: blue smoke drifting off the cover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 animate-drift"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 60% at 72% 38%, rgba(22,39,63,.95), transparent 68%), radial-gradient(ellipse 55% 55% at 12% 78%, rgba(10,15,23,1), transparent 70%), radial-gradient(circle at 78% 22%, rgba(90,169,196,.16), transparent 55%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-night to-transparent"
      />

      <div className="shell relative grid w-full items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        {/* Copy */}
        <div className="relative min-h-[22rem]">
          {slides.map((slide, i) => {
            const active = i === index;
            return (
              <div
                key={slide.key}
                aria-hidden={!active}
                className={`${active ? '' : 'pointer-events-none'} ${
                  i === 0 ? 'relative' : 'absolute inset-0'
                }`}
                style={{
                  opacity: active ? 1 : 0,
                  transform: active ? 'translateY(0)' : 'translateY(18px)',
                  filter: active ? 'blur(0)' : 'blur(6px)',
                  transition: 'opacity .8s ease, transform .9s cubic-bezier(.16,1,.3,1), filter .8s ease',
                }}
              >
                <span className="eyebrow flex items-center gap-3">
                  <span className="h-px w-8 bg-ember/70" aria-hidden />
                  {slide.kicker}
                </span>

                <h1 className="mt-6 font-display text-display-xl text-bone text-balance">{slide.title}</h1>

                <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-parchment/90">{slide.line}</p>

                {slide.meta && (
                  <p className="mt-4 font-condensed text-[0.7rem] uppercase tracking-[0.26em] text-ash">
                    {slide.meta}
                  </p>
                )}

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link href={slide.primary.href} className="btn-ember">
                    <span>{slide.primary.label}</span>
                  </Link>
                  {slide.secondary && (
                    <Link href={slide.secondary.href} className="btn-outline">
                      <span>{slide.secondary.label}</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}

          {/* Controls */}
          <div className="mt-12 flex items-center gap-5">
            <div className="flex items-center gap-2.5" role="tablist" aria-label="Featured slides">
              {slides.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={s.title}
                  onClick={() => go(i)}
                  className="group relative h-6 w-8"
                >
                  <span
                    className={`absolute left-0 top-1/2 h-[3px] -translate-y-1/2 transition-all duration-500 ${
                      i === index ? 'w-8 bg-ember' : 'w-4 bg-bone/25 group-hover:w-6 group-hover:bg-bone/50'
                    }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }}
                  />
                </button>
              ))}
            </div>
            <span className="font-condensed text-[0.68rem] uppercase tracking-[0.28em] text-ash">
              {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Jacket */}
        <div className="relative mx-auto w-[min(340px,72vw)] lg:w-full lg:max-w-[360px]">
          {slides.map((slide, i) => {
            const active = i === index;
            const book = books.find((b) => b.slug === slide.bookSlug);
            return (
              <div
                key={`art-${slide.key}`}
                aria-hidden={!active}
                className={i === 0 ? 'relative' : 'absolute inset-0'}
                style={{
                  opacity: active ? 1 : 0,
                  transform: active ? 'translateY(0) scale(1)' : 'translateY(26px) scale(.95)',
                  transition: 'opacity .9s ease, transform 1.1s cubic-bezier(.16,1,.3,1)',
                  pointerEvents: active ? 'auto' : 'none',
                }}
              >
                {book ? (
                  <div className="animate-float">
                    <BookCover book={book} priority={i === 0} sizes="(max-width: 1024px) 70vw, 360px" />
                  </div>
                ) : (
                  <EventPlate />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EventPlate() {
  const next = upcomingAppearances()[0];
  if (!next) return null;
  const d = new Date(next.date);

  return (
    <div className="relative aspect-[2/3] w-full border border-bone/15 bg-gradient-to-b from-abyss to-night p-8">
      <div className="flex h-full flex-col justify-between">
        <span className="font-condensed text-[0.62rem] uppercase tracking-[0.3em] text-ember">
          Save the date
        </span>
        <div>
          <span className="block font-display text-[5.5rem] leading-none text-bone">
            {d.getDate()}
          </span>
          <span className="mt-1 block font-condensed text-[1.1rem] uppercase tracking-[0.3em] text-helix">
            {d.toLocaleDateString('en-US', { month: 'long' })} {d.getFullYear()}
          </span>
          <span className="mt-5 block h-px w-16 bg-ember" />
          <p className="mt-5 text-[0.95rem] leading-relaxed text-ash">
            {next.venue}
            <br />
            {next.city}
            {next.time ? ` · ${next.time}` : ''}
          </p>
        </div>
        <span className="font-condensed text-[0.6rem] uppercase tracking-[0.28em] text-ash/70">
          An evening with the author
        </span>
      </div>
    </div>
  );
}
