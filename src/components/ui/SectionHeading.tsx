import type { ReactNode } from 'react';
import Reveal from './Reveal';

/**
 * Section headings carry a specimen-style label instead of a decorative number.
 * The label says what the section *is* — the reference site does the same with
 * "New Releases / Coming Soon / Latest News".
 */
export default function SectionHeading({
  label,
  title,
  intro,
  action,
  align = 'left',
}: {
  label: string;
  title: string;
  intro?: string;
  action?: ReactNode;
  align?: 'left' | 'center';
}) {
  const centered = align === 'center';

  return (
    <div
      className={`mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end ${
        centered ? 'items-center text-center md:flex-col md:items-center' : 'md:justify-between'
      }`}
    >
      <div className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        <Reveal variant="fade">
          <span className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-ember/70" aria-hidden />
            {label}
          </span>
        </Reveal>
        <Reveal variant="wipe" delay={90}>
          <h2 className="mt-4 text-display-md text-balance">{title}</h2>
        </Reveal>
        {intro && (
          <Reveal variant="up" delay={170}>
            <p className="mt-4 max-w-prose text-[1.02rem] leading-relaxed text-ash">{intro}</p>
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal variant="fade" delay={220} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  );
}
