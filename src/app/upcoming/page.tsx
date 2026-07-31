import type { Metadata } from "next";
import { books } from "@/data/books";
import { upcomingAppearances, pastAppearances, formatDate } from "@/data/news";
import BookCard from "@/components/ui/BookCard";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Upcoming",
  description:
    "Forthcoming books and appearance dates for Victer Hugo Basurco.",
};

export default function UpcomingPage() {
  const forthcoming = books.filter((b) => b.status !== "available");
  const upcoming = upcomingAppearances();
  const past = pastAppearances();

  return (
    <>
      <PageHeader
        label="What comes next"
        title="Upcoming"
        intro="Books on the way, and dates where you can hear about them in person."
      />

      <section className="py-20 md:py-24">
        <div className="shell">
          <Reveal variant="fade">
            <h2 className="eyebrow">Forthcoming books</h2>
          </Reveal>
          <div className="mt-10 grid gap-14 sm:grid-cols-2 lg:gap-10">
            {forthcoming.map((b, i) => (
              <Reveal key={b.slug} variant="cover" delay={i * 130}>
                <BookCard book={b} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline py-20 md:py-24">
        <div className="shell">
          <Reveal variant="fade">
            <h2 className="eyebrow">Appearances</h2>
          </Reveal>

          {upcoming.length === 0 && (
            <Reveal variant="up" delay={80}>
              <p className="mt-8 max-w-prose text-[1.02rem] leading-relaxed text-muted">
                No dates are scheduled at the moment. New ones are posted here
                first — join the announcement list on the home page to hear
                about them.
              </p>
            </Reveal>
          )}

          <ul className="mt-10 space-y-px">
            {[...upcoming, ...past].map((e, i) => {
              const isPast = new Date(e.date) < new Date();
              return (
                <Reveal key={e.id} as="li" variant="up" delay={i * 80}>
                  <div
                    className={`group grid items-baseline gap-4 border-t border-hairline py-7 md:grid-cols-[10rem_1fr_auto] ${
                      isPast ? "opacity-55" : ""
                    }`}
                  >
                    <time
                      dateTime={e.date}
                      className="font-condensed text-[0.78rem] uppercase tracking-[0.2em] text-ember"
                    >
                      {formatDate(e.date)}
                    </time>
                    <div>
                      <h3 className="font-display text-[1.3rem] text-primary">
                        {e.venue ?? e.title}
                      </h3>
                      <p className="mt-1 text-[0.95rem] text-muted">
                        {e.city}
                        {e.time ? ` · ${e.time}` : ""}
                      </p>
                      <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-muted">
                        {e.excerpt}
                      </p>
                    </div>
                    <span className="font-condensed text-[0.62rem] uppercase tracking-[0.24em] text-muted">
                      {isPast ? "Past" : "Upcoming"}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
