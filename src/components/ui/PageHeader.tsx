import Reveal, { StaggerText } from './Reveal';

export default function PageHeader({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-bone/10 pb-14 pt-[calc(var(--nav-h)+4.5rem)] md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 animate-drift"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 70% at 20% 0%, rgba(22,39,63,.9), transparent 70%), radial-gradient(ellipse 50% 60% at 85% 20%, rgba(226,112,58,.14), transparent 70%)',
        }}
      />
      <div className="shell relative">
        <Reveal variant="fade">
          <span className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-ember/70" aria-hidden />
            {label}
          </span>
        </Reveal>
        <StaggerText as="h1" text={title} className="mt-5 block text-display-lg text-balance" delay={120} />
        {intro && (
          <Reveal variant="up" delay={320}>
            <p className="mt-6 max-w-prose text-[1.05rem] leading-relaxed text-ash">{intro}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
