'use client';

import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';
export const THEME_KEY = 'vhb-theme';

/**
 * Runs before first paint, inlined in <head>. Reads a saved choice, falls back
 * to the OS setting, and defaults to dark — the identity of the books.
 * Written as a string because it must execute ahead of React hydration.
 */
export const themeScript = `
(function(){
  try {
    var saved = localStorage.getItem('${THEME_KEY}');
    var theme = saved === 'light' || saved === 'dark'
      ? saved
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    var root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    setReady(true);
  }, []);

  // Follow the OS while the visitor has not made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(THEME_KEY)) return;
      apply(e.matches ? 'light' : 'dark', false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  function apply(next: Theme, persist = true) {
    const root = document.documentElement;
    root.classList.toggle('dark', next === 'dark');
    root.style.colorScheme = next;
    if (persist) localStorage.setItem(THEME_KEY, next);
    setTheme(next);
  }

  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => apply(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`group relative grid h-9 w-9 place-items-center text-secondary transition-colors duration-300 hover:text-ember ${className}`}
    >
      {/* Both glyphs are always mounted; only one is revealed, so the swap is a
          crossfade rather than a layout change. suppressHydrationWarning keeps
          React quiet about the pre-paint class the script applied. */}
      <span
        suppressHydrationWarning
        className="absolute transition-all duration-500"
        style={{
          opacity: ready && theme === 'dark' ? 1 : 0,
          transform: ready && theme === 'dark' ? 'rotate(0deg) scale(1)' : 'rotate(-60deg) scale(0.6)',
        }}
      >
        <MoonIcon />
      </span>
      <span
        suppressHydrationWarning
        className="absolute transition-all duration-500"
        style={{
          opacity: ready && theme === 'light' ? 1 : 0,
          transform: ready && theme === 'light' ? 'rotate(0deg) scale(1)' : 'rotate(60deg) scale(0.6)',
        }}
      >
        <SunIcon />
      </span>
    </button>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M16.5 12.4A7 7 0 0 1 7.6 3.5a7 7 0 1 0 8.9 8.9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="3.6" stroke="currentColor" strokeWidth="1.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="10"
          y1="1.6"
          x2="10"
          y2="3.4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${deg} 10 10)`}
        />
      ))}
    </svg>
  );
}
