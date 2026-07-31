import type { BookStatus } from '@/data/books';

const styles: Record<BookStatus, string> = {
  available: 'border-ember/60 text-ember',
  forthcoming: 'border-helix/60 text-helix',
  writing: 'border-ash/40 text-ash',
};

export default function StatusBadge({
  status,
  children,
}: {
  status: BookStatus;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 border px-3 py-1.5 font-condensed text-[0.65rem] uppercase tracking-[0.22em] ${styles[status]}`}
    >
      {status === 'available' && (
        <span className="h-1.5 w-1.5 rounded-full bg-ember animate-blink" aria-hidden />
      )}
      {children}
    </span>
  );
}
