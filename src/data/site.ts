/**
 * Single source of truth for identity, links and navigation.
 * Anything the client sends later (a Twitter handle, an Amazon page) gets
 * pasted in here — no component needs touching.
 */

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  /** Flip to true once the client confirms the URL. Unconfirmed links never render. */
  enabled: boolean;
}

export const site = {
  name: 'Victer Hugo Basurco',
  shortName: 'V. H. Basurco',
  domain: 'www.victerhugobasurco.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.victerhugobasurco.com',
  role: 'Novelist',
  tagline: 'Thrillers written from the inside of the machine.',
  /** Used for meta descriptions and the author strip. */
  metaDescription:
    'Official site of Victer Hugo Basurco, author of THE KILLING GENE — a forensic-genetics thriller. Books, upcoming releases, appearances and contact.',
  location: 'New Jersey, USA',
  /** Reader mail is delivered through EmailJS; this is only shown as fallback text. */
  contactNote: 'Every message is read by the author.',
} as const;

export const socials: SocialLink[] = [
  {
    label: 'Instagram',
    handle: '@victerhugobasurco',
    href: 'https://www.instagram.com/victerhugobasurco',
    enabled: true,
  },
  {
    label: 'Facebook',
    handle: 'Victer Hugo Basurco',
    // TODO(client): confirm the exact profile URL — brief only gave a name.
    href: 'https://www.facebook.com/',
    enabled: false,
  },
  {
    label: 'X',
    handle: '',
    // TODO(client): handle was left blank in the brief.
    href: '',
    enabled: false,
  },
  {
    label: 'Amazon Author',
    handle: 'Author page',
    // TODO(client): paste the amazon.com/author/... URL.
    href: '',
    enabled: false,
  },
];

export interface NavItem {
  label: string;
  href: string;
  /** Marks the flagship title, styled like the reference site's series tab. */
  featured?: boolean;
}

export const navItems: NavItem[] = [
  { label: 'Works', href: '/works' },
  { label: 'Upcoming', href: '/upcoming' },
  { label: 'The Author', href: '/the-author' },
  { label: 'News', href: '/news' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'The Killing Gene', href: '/works/the-killing-gene', featured: true },
];
