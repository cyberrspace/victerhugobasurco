import type { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import { socials, site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Write to Victer Hugo Basurco — reader mail, event invitations and press.',
};

export default function ContactPage() {
  const live = socials.filter((s) => s.enabled && s.href);

  return (
    <>
      <PageHeader
        label="Reach the author"
        title="Contact"
        intro="Reader mail, speaking invitations, press requests. Everything sent here goes straight to Victer."
      />

      <section className="py-20 md:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <Reveal variant="up">
            <ContactForm />
          </Reveal>

          <aside className="space-y-10">
            <Reveal variant="right" delay={120}>
              <div className="border-l-2 border-ember pl-6">
                <h2 className="eyebrow-muted">Before you write</h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ash">{site.contactNote}</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ash">
                  Replies are not instant — he answers in batches, between drafts.
                </p>
              </div>
            </Reveal>

            {live.length > 0 && (
              <Reveal variant="right" delay={200}>
                <div>
                  <h2 className="eyebrow-muted">Elsewhere</h2>
                  <ul className="mt-4 space-y-3">
                    {live.map((s) => (
                      <li key={s.label}>
                        <a href={s.href} target="_blank" rel="noreferrer" className="link-more !text-parchment">
                          <span>{s.label} — {s.handle}</span>
                          <span className="arrow" aria-hidden>&nearr;</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
