import Link from "next/link";
import type { NewsItem } from "@/data/news";
import { formatDate } from "@/data/news";

const kindLabel: Record<NewsItem["kind"], string> = {
  release: "Release",
  appearance: "Appearance",
  announcement: "Announcement",
};

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="card group p-6 md:p-7">
      <div className="flex items-center gap-3">
        <span className="font-condensed text-[0.62rem] uppercase tracking-[0.24em] text-ember">
          {kindLabel[item.kind]}
        </span>
        <span className="h-px flex-1 bg-primary/10" aria-hidden />
        <time
          dateTime={item.date}
          className="font-condensed text-[0.62rem] uppercase tracking-[0.18em] text-muted"
        >
          {formatDate(item.date)}
        </time>
      </div>

      <h3 className="mt-4 text-[1.22rem] leading-snug transition-colors duration-300 group-hover:text-ember">
        {item.title}
      </h3>

      {item.venue && (
        <p className="mt-2 font-condensed text-[0.72rem] uppercase tracking-[0.16em] text-helix">
          {item.venue} · {item.city} {item.time ? `· ${item.time}` : ""}
        </p>
      )}

      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
        {item.excerpt}
      </p>

      {item.quote && (
        <blockquote className="mt-4 border-l-2 border-ember/60 pl-4 font-display text-[1.02rem] italic text-secondary">
          &ldquo;{item.quote}&rdquo;
        </blockquote>
      )}

      {item.href && (
        <Link href={item.href} className="link-more mt-6">
          <span>Read more</span>
          <span className="arrow" aria-hidden>
            &rarr;
          </span>
        </Link>
      )}
    </article>
  );
}
