import Link from "next/link";
import { upcomingAppearances, pastAppearances, formatDate } from "@/data/news";
import AnnouncementForm from "@/components/forms/AnnouncementForm";
import Reveal from "@/components/ui/Reveal";

export default function Announcements() {
  const next = upcomingAppearances()[0];
  const recent = pastAppearances()[0];

  return (
    <section
      id="announcements"
      className="relative overflow-hidden border-t border-hairline bg-surface py-16 sm:py-20 md:py-28 lg:py-32"
    >
      <div
        aria-hidden
        className="atmos-band pointer-events-none absolute inset-0 opacity-70"
      />

      <div className="shell relative grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal variant="fade">
            <span className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-ember/70" aria-hidden />
              Appearances
            </span>
          </Reveal>

          {next ? (
            <>
              <Reveal variant="wipe" delay={100}>
                <h2 className="mt-5 text-display-md text-balance">
                  Next: an evening with the author
                </h2>
              </Reveal>
              <Reveal variant="up" delay={200}>
                <div className="mt-8 flex items-start gap-6 border-l-2 border-ember pl-6">
                  <div>
                    <p className="font-display text-[1.35rem] text-primary">
                      {next.venue}
                    </p>
                    <p className="mt-1 text-[0.98rem] text-muted">
                      {next.city}
                    </p>
                    <p className="mt-4 font-condensed text-[0.72rem] uppercase tracking-[0.24em] text-helix">
                      {formatDate(next.date)}
                      {next.time ? ` · ${next.time}` : ""}
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal variant="up" delay={280}>
                <p className="mt-6 max-w-prose leading-relaxed text-muted">
                  {next.excerpt}
                </p>
              </Reveal>
            </>
          ) : (
            <>
              <Reveal variant="wipe" delay={100}>
                <h2 className="mt-5 text-display-md text-balance">
                  No dates on the calendar right now.
                </h2>
              </Reveal>
              <Reveal variant="up" delay={200}>
                <p className="mt-6 max-w-prose leading-relaxed text-muted">
                  {recent
                    ? `The most recent appearance was ${recent.venue}, ${recent.city}, on ${formatDate(
                        recent.date,
                      )}. New dates are posted here first.`
                    : "New dates are posted here first."}
                </p>
              </Reveal>
            </>
          )}

          <Reveal variant="up" delay={340}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/upcoming" className="btn-outline">
                <span>All dates</span>
              </Link>
              <Link href="/contact" className="link-more self-center">
                <span>Invite Victer to speak</span>
                <span className="arrow" aria-hidden>
                  &rarr;
                </span>
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal variant="right" delay={140}>
          <AnnouncementForm />
        </Reveal>
      </div>
    </section>
  );
}
