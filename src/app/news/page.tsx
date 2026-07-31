import type { Metadata } from 'next';
import { news } from '@/data/news';
import NewsCard from '@/components/ui/NewsCard';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'News',
  description: 'Announcements, releases and appearances from Victer Hugo Basurco.',
};

export default function NewsPage() {
  const items = [...news].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <>
      <PageHeader
        label="Field notes"
        title="News"
        intro="Releases, appearances and progress reports. Newest first."
      />
      <section className="py-20 md:py-28">
        <div className="shell grid gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.id} variant={i % 2 === 0 ? 'left' : 'right'} delay={i * 90}>
              <NewsCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
