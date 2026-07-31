import Link from "next/link";
import type { Book } from "@/data/books";
import { statusLabel } from "@/data/books";
import BookCover from "./BookCover";
import StatusBadge from "./StatusBadge";

export default function BookCard({
  book,
  priority = false,
}: {
  book: Book;
  priority?: boolean;
}) {
  return (
    <article className="group flex flex-col">
      <Link
        href={`/works/${book.slug}`}
        className="block"
        aria-label={`${book.title} — more info`}
      >
        <BookCover book={book} priority={priority} />
      </Link>

      <div className="mt-9 flex flex-1 flex-col">
        <StatusBadge status={book.status}>
          {statusLabel[book.status]}
        </StatusBadge>

        <h3 className="mt-4 text-[1.5rem] leading-tight">
          <Link
            href={`/works/${book.slug}`}
            className="transition-colors duration-300 hover:text-ember"
          >
            {book.title}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
          {book.tagline}
        </p>

        <Link
          href={`/works/${book.slug}`}
          className="link-more mt-6 self-start"
        >
          <span>More info</span>
          <span className="arrow" aria-hidden>
            &rarr;
          </span>
        </Link>
      </div>
    </article>
  );
}
