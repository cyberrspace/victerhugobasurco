import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center pt-[var(--nav-h)]">
      <div className="shell text-center">
        <span className="eyebrow">Error 404</span>
        <h1 className="mt-5 font-display text-display-lg text-bone">This page left no note.</h1>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-ash">
          The address does not match anything on this site. The books are still where you left them.
        </p>
        <Link href="/" className="btn-ember mt-9">
          <span>Back to the home page</span>
        </Link>
      </div>
    </section>
  );
}
