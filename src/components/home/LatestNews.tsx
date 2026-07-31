import Link from 'next/link';
import { latestNews } from '@/data/news';
import NewsCard from '@/components/ui/NewsCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

export default function LatestNews() {
  const items = latestNews(4);

  return (
    <section id="news" className="relative border-y border-bone/10 bg-ink/40 py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          label="Field notes"
          title="Latest news"
          intro="Releases, appearances and the occasional progress report. Nothing else lands here."
          action={
            <Link href="/news" className="link-more">
              <span>All news</span>
              <span className="arrow" aria-hidden>&rarr;</span>
            </Link>
          }
        />

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.id} variant={i % 2 === 0 ? 'left' : 'right'} delay={i * 110}>
              <NewsCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
