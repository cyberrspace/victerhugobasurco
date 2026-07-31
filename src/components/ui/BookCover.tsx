'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Book } from '@/data/books';

/**
 * Covers are the loudest thing on an author site, so they get the interaction:
 * a subtle 3D tilt that follows the pointer and a sheen that crosses the jacket.
 * Books without artwork yet get a typographic jacket rather than a grey box —
 * The Suicide Council and Mindburst have no cover files.
 */
export default function BookCover({
  book,
  priority = false,
  className = '',
  tilt = true,
  sizes = '(max-width: 768px) 60vw, 320px',
}: {
  book: Book;
  priority?: boolean;
  className?: string;
  tilt?: boolean;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('');

  const onMove = (e: React.MouseEvent) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(1100px) rotateY(${x * 13}deg) rotateX(${-y * 13}deg) translateZ(26px) scale(1.03)`,
    );
  };

  const reset = () => setTransform('');

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`group/cover relative aspect-[2/3] w-full ${className}`}
      style={{
        transform: transform || 'perspective(1100px)',
        transition: 'transform .7s cubic-bezier(.16,1,.3,1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Cast shadow on the ground behind the jacket */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-[86%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-xl transition-all duration-700 group-hover/cover:w-[70%] group-hover/cover:blur-2xl"
      />

      <div className="relative h-full w-full overflow-hidden shadow-cover">
        {book.cover ? (
          <Image
            src={book.cover}
            alt={book.coverAlt ?? `${book.title} cover`}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
        ) : (
          <PlaceholderJacket title={book.title} genre={book.genre} />
        )}

        {/* Sheen — a slow light pass across the jacket on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/22 to-transparent transition-transform duration-[1100ms] ease-out group-hover/cover:translate-x-full"
        />
        {/* Spine shading keeps it reading as a physical object */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-black/65 to-transparent"
        />
      </div>
    </div>
  );
}

function PlaceholderJacket({ title, genre }: { title: string; genre: string }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-b from-deep via-abyss to-night p-6">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 15%, rgba(90,169,196,.35), transparent 55%), radial-gradient(circle at 75% 80%, rgba(226,112,58,.28), transparent 60%)',
        }}
      />
      <span className="relative font-condensed text-[0.6rem] uppercase tracking-[0.3em] text-bone/60">
        Victer Hugo Basurco
      </span>
      <div className="relative">
        <h3 className="font-display text-[clamp(1.4rem,3.4vw,2rem)] leading-[1.05] text-bone">{title}</h3>
        <span className="mt-3 block h-px w-12 bg-ember" />
        <span className="mt-3 block font-condensed text-[0.58rem] uppercase tracking-[0.26em] text-ash">
          {genre}
        </span>
      </div>
      <span className="relative font-condensed text-[0.55rem] uppercase tracking-[0.3em] text-bone/40">
        Cover to be revealed
      </span>
    </div>
  );
}
