import Link from 'next/link';

/**
 * The reference site swaps a logo sprite on hover. Ours does the same swap in
 * live type: the bone wordmark lifts away as an ember one rises into its place,
 * and the helix glyph beside it turns a half rotation.
 */
export default function Logo({ compact = false }: { compact?: boolean }) {
  const size = compact ? 'text-[1rem]' : 'text-[1.15rem] md:text-[1.3rem]';

  return (
    <Link href="/" className="logo-stack group shrink-0" aria-label="Victer Hugo Basurco — home">
      <span className="flex items-center gap-3">
        <HelixGlyph />
        <span className="relative block">
          {/* base layer */}
          <span className="logo-layer logo-base block">
            <span className="block font-condensed text-[0.6rem] uppercase tracking-[0.42em] text-ash">
              Victer Hugo
            </span>
            <span className={`block font-display font-semibold leading-none tracking-[0.06em] text-bone ${size}`}>
              BASURCO
            </span>
          </span>
          {/* hover layer */}
          <span className="logo-layer logo-ghost block" aria-hidden>
            <span className="block font-condensed text-[0.6rem] uppercase tracking-[0.42em] text-ember/70">
              Victer Hugo
            </span>
            <span className={`block font-display font-semibold leading-none tracking-[0.06em] ${size}`}>
              BASURCO
            </span>
          </span>
        </span>
      </span>
    </Link>
  );
}

function HelixGlyph() {
  return (
    <span
      className="logo-helix block transition-transform duration-700"
      style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }}
      aria-hidden
    >
      <svg width="18" height="30" viewBox="0 0 18 30" fill="none" className="overflow-visible">
        <path
          d="M3 1c0 6 12 8 12 14S3 23 3 29"
          stroke="currentColor"
          strokeWidth="1.4"
          className="text-ember"
          strokeLinecap="round"
        />
        <path
          d="M15 1c0 6-12 8-12 14s12 8 12 14"
          stroke="currentColor"
          strokeWidth="1.4"
          className="text-helix"
          strokeLinecap="round"
        />
        {[6, 11, 15, 19, 24].map((y) => (
          <line
            key={y}
            x1="4"
            x2="14"
            y1={y}
            y2={y}
            stroke="currentColor"
            strokeWidth="1"
            className="text-bone/35"
          />
        ))}
      </svg>
    </span>
  );
}
