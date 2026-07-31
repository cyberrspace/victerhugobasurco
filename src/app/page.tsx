import Hero from '@/components/home/Hero';
import Shelf from '@/components/home/Shelf';
import QuoteBand from '@/components/home/QuoteBand';
import AuthorStrip from '@/components/home/AuthorStrip';
import LatestNews from '@/components/home/LatestNews';
import Announcements from '@/components/home/Announcements';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Shelf />
      <QuoteBand />
      <AuthorStrip />
      <LatestNews />
      <Announcements />
    </>
  );
}
