import type { Metadata } from 'next';
import { Playfair_Display, Inter, Oswald } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { site } from '@/data/site';

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const condensed = Oswald({
  subsets: ['latin'],
  variable: '--font-condensed',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.metaDescription,
  keywords: [
    'Victer Hugo Basurco',
    'The Killing Gene',
    'The Suicide Council',
    'forensic thriller',
    'New Jersey author',
  ],
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.metaDescription,
    url: site.url,
    images: ['/images/covers/the-killing-gene.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.role}`,
    description: site.metaDescription,
    images: ['/images/covers/the-killing-gene.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${condensed.variable}`}
      suppressHydrationWarning
    >
      <body className="grain min-h-screen bg-night font-sans text-parchment">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-ember focus:px-4 focus:py-2 focus:font-condensed focus:uppercase focus:tracking-widest focus:text-night"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
