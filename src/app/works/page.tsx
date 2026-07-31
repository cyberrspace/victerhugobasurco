import type { Metadata } from 'next';
import { books } from '@/data/books';
import BookCard from '@/components/ui/BookCard';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Works',
  description: 'Every novel by Victer Hugo Basurco — published, finished and in progress.',
};

export default function WorksPage() {
  return (
    <>
      <PageHeader
        label="Bibliography"
        title="Works"
        intro="Three books, three stages. Published, finished, and being written."
      />
      <section className="py-20 md:py-28">
        <div className="shell grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {books.map((book, i) => (
            <Reveal key={book.slug} variant="cover" delay={i * 130}>
              <BookCard book={book} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
