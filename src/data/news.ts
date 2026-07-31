export interface NewsItem {
  id: string;
  title: string;
  /** ISO date — drives ordering and the upcoming/past split. */
  date: string;
  kind: 'release' | 'appearance' | 'announcement';
  excerpt: string;
  /** Optional pull-quote shown on the news card. */
  quote?: string;
  href?: string;
  /** Appearance-only fields. */
  venue?: string;
  city?: string;
  time?: string;
}

export const news: NewsItem[] = [
  {
    id: 'hawthorne-lecture',
    title: 'Guest lecture — Arts Center, Hawthorne, NJ',
    // TODO(client): confirm this date. The brief reads "June 27, 26, 5pm".
    date: '2026-06-27',
    time: '5:00 PM',
    venue: 'Arts Center',
    city: 'Hawthorne, New Jersey',
    kind: 'appearance',
    excerpt:
      'An evening on writing The Killing Gene: how a process engineer builds a thriller, what the science had to get right, and where the story stopped obeying the research.',
  },
  {
    id: 'suicide-council-ready',
    title: 'The Suicide Council is ready for publication',
    date: '2026-05-02',
    kind: 'announcement',
    excerpt:
      'The manuscript is finished. A council of saints and prophets interviews the dead in the minutes before the tragedy, and files a report that decides where each of them goes.',
    quote: 'The families are the ones left holding the question.',
    href: '/works/the-suicide-council',
  },
  {
    id: 'mindburst-underway',
    title: 'Mindburst underway',
    date: '2026-03-14',
    kind: 'announcement',
    excerpt:
      'Work has started on a third novel. Victer expects to finish the draft in the autumn of 2026. Announcements land here first.',
    href: '/upcoming',
  },
  {
    id: 'killing-gene-out',
    title: 'The Killing Gene is available now',
    date: '2026-01-20',
    kind: 'release',
    excerpt:
      'A genetics company contracted to build the FBI a criminal DNA database finds a marker for violence that skips a generation — then a body turns up inside the company.',
    href: '/works/the-killing-gene',
  },
];

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const upcomingAppearances = () =>
  news
    .filter((n) => n.kind === 'appearance' && new Date(n.date) >= startOfToday())
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));

export const pastAppearances = () =>
  news
    .filter((n) => n.kind === 'appearance' && new Date(n.date) < startOfToday())
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const latestNews = (count = 4) =>
  [...news].sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, count);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

export const formatDateShort = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
