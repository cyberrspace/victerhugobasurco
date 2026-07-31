import Reveal, { StaggerText } from "./Reveal";

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
    <header className="relative overflow-hidden border-b border-hairline pb-10 pt-[calc(var(--nav-h)+2.5rem)] sm:pb-14 sm:pt-[calc(var(--nav-h)+3.5rem)] md:pb-20 md:pt-[calc(var(--nav-h)+4.5rem)]">
      <div
        aria-hidden
        className="atmos-page pointer-events-none absolute inset-0 animate-drift"
      />
      <div className="shell relative">
        <Reveal variant="fade">
          <span className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-ember/70" aria-hidden />
            {label}
          </span>
        </Reveal>
        <StaggerText
          as="h1"
          text={title}
          className="mt-5 block text-display-lg text-balance"
          delay={120}
        />
        {intro && (
          <Reveal variant="up" delay={320}>
            <p className="mt-6 max-w-prose text-[1.05rem] leading-relaxed text-muted">
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
