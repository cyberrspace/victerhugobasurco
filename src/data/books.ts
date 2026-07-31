export type BookStatus = 'available' | 'forthcoming' | 'writing';

export interface BuyLink {
  label: string;
  href: string;
}

export interface Book {
  slug: string;
  title: string;
  /** Short line used on covers-in-a-row and hero slides. */
  tagline: string;
  genre: string;
  status: BookStatus;
  /** Human-readable release state shown on the badge. */
  releaseLabel: string;
  /** ISO date if known — used for sorting and for the "Coming Soon" ribbon. */
  releaseDate?: string;
  cover?: string;
  coverAlt?: string;
  /** Paragraphs of jacket copy. */
  blurb: string[];
  /** Pulled out as a spec strip on the book page. */
  facts: { label: string; value: string }[];
  contentNote?: string;
  /** Rendered only where it belongs — see The Suicide Council. */
  supportNote?: string;
  buyLinks?: BuyLink[];
  /** A line the author would say about the book. */
  authorNote?: string;
}

export const books: Book[] = [
  {
    slug: 'the-killing-gene',
    title: 'The Killing Gene',
    tagline: 'Every family tree hides a predator. This one left a marker.',
    genre: 'Thriller · Forensic Suspense',
    status: 'available',
    releaseLabel: 'Available now',
    cover: '/images/covers/the-killing-gene.jpg',
    coverAlt:
      'Cover of The Killing Gene — a weathered skull marked with a DNA helix, resting on dark soil in blue smoke.',
    blurb: [
      'A fast-rising genetics company wins the contract every lab in the country wanted: build the FBI a criminal DNA database and find what violent offenders share in their code. The money behind the company has its own reasons for wanting that answer.',
      'What the sequencer finds is not a profile. It is a pattern — a marker for violence that goes quiet for an entire generation before it surfaces again, clean and inherited and impossible to unsee.',
      'Then the killing moves indoors. With a serial murderer working the region and a body inside the company itself, suspicion settles on a colleague with money, influence and a past nobody has been paid enough to forget. Tatyana, a scientist who knows exactly what the data is saying, joins forces with an old-school reporter who trusts nothing he has not confirmed twice.',
      'Between the sequencer and the notebook, they have one chance to put the case together — before the gene finishes proving itself.',
    ],
    facts: [
      { label: 'Genre', value: 'Forensic thriller' },
      { label: 'Setting', value: 'Contemporary — East Coast, USA' },
      { label: 'Leads', value: 'Tatyana · the reporter' },
      { label: 'Readership', value: 'Adult' },
    ],
    contentNote:
      'The Killing Gene is written for adult readers. It contains explicit sexual content and depictions of violent crime.',
    // TODO(client): add retailer links once the Amazon / B&N pages are live.
    buyLinks: [],
    authorNote:
      'I spent a career in process engineering. You learn that every system leaves a record of itself — and that somebody always reads it too late.',
  },
  {
    slug: 'the-suicide-council',
    title: 'The Suicide Council',
    tagline: 'No note. No witnesses. Only the minutes before.',
    genre: 'Speculative Fiction · Literary',
    status: 'forthcoming',
    releaseLabel: 'Ready for publication',
    blurb: [
      'When a life ends without explanation, the people left behind inherit a silence they can never fill. No note. No reason set down. Only a question that outlives everyone it touches.',
      'Above that silence, a council is convened — saints and prophets seated in a heavenly circle and charged with recovering what the world could not. One by one the departed are called and interviewed about the minutes before the tragedy: what was said, what was carried, what finally gave way.',
      'Their testimony becomes a report, and the report is carried up through channels until it reaches the only reader who matters. Then judgement is passed — hell, purgatory, limbo, or heaven.',
      'The Suicide Council is a chorus. Each voice arrives with its own story, its own defence, and its own idea of what mercy is owed.',
    ],
    facts: [
      { label: 'Genre', value: 'Speculative / literary fiction' },
      { label: 'Form', value: 'Linked testimonies' },
      { label: 'Status', value: 'Manuscript complete' },
    ],
    contentNote:
      'The Suicide Council deals directly with suicide and its aftermath, told through the voices of those who died and the council that hears them.',
    supportNote:
      'If you or someone you know is struggling, support is available. In the US and Canada you can call or text 988 to reach a trained counsellor, any hour of the day.',
    authorNote:
      'The families are the ones left holding the question. I wanted to write the hearing they never get to attend.',
  },
  {
    slug: 'mindburst',
    title: 'Mindburst',
    tagline: 'In progress. Expected autumn 2026.',
    genre: 'Thriller',
    status: 'writing',
    releaseLabel: 'Writing — autumn 2026',
    releaseDate: '2026-10-01',
    blurb: [
      'The third book is underway. Victer began Mindburst after finishing The Suicide Council and expects to complete the draft in the autumn of 2026.',
      'Details will be announced here first.',
    ],
    facts: [
      { label: 'Status', value: 'Draft in progress' },
      { label: 'Expected', value: 'Autumn 2026' },
    ],
  },
];

export const getBook = (slug: string) => books.find((b) => b.slug === slug);

export const statusLabel: Record<BookStatus, string> = {
  available: 'Out now',
  forthcoming: 'Coming soon',
  writing: 'In progress',
};
