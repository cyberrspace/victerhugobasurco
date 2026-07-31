import type { Metadata } from "next";
import { faqs } from "@/data/faq";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Questions readers ask most often about Victer Hugo Basurco and his books.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        label="Answers"
        title="Frequently asked"
        intro="The questions readers send most often."
      />
      <section className="py-20 md:py-28">
        <div className="shell max-w-4xl">
          {faqs.map((f, i) => (
            <Reveal key={f.q} variant="up" delay={i * 70}>
              <details className="group border-t border-hairline py-6 last:border-b">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <h2 className="font-display text-[1.2rem] leading-snug text-primary transition-colors duration-300 group-hover:text-ember md:text-[1.35rem]">
                    {f.q}
                  </h2>
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 font-condensed text-[1.3rem] leading-none text-ember transition-transform duration-500 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-prose text-[1rem] leading-relaxed text-muted">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
