import Link from 'next/link';
import { books } from '@/data/books';
import BookCard from '@/components/ui/BookCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

export default function Shelf() {
  return (
    <section id="works" className="relative py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          label="The shelf"
          title="One published. One finished. One being written."
          intro="Three books, three stages. Every title on this shelf starts from the same question: what does a system do when something inside it goes wrong, and who notices first."
          action={
            <Link href="/works" className="link-more">
              <span>All works</span>
              <span className="arrow" aria-hidden>&rarr;</span>
            </Link>
          }
        />

        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {books.map((book, i) => (
            <Reveal key={book.slug} variant="cover" delay={i * 140}>
              <BookCard book={book} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
