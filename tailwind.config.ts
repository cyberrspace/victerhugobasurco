import type { Config } from 'tailwindcss';

/**
 * COLOUR SYSTEM
 * -------------
 * Every colour resolves through a CSS variable holding an "R G B" triplet, so
 * one class works in both themes and Tailwind's /opacity modifiers still apply.
 * The two theme definitions live in globals.css (:root and .dark).
 *
 * Semantic names describe the ROLE, not the shade — `surface` is dark ink at
 * night and near-white by day. The book's identity (navy ground, ember accent,
 * cold cyan) survives both.
 */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        canvas: v('canvas'),
        surface: v('surface'),
        raised: v('raised'),
        edge: v('edge'),
        primary: v('primary'),
        secondary: v('secondary'),
        muted: v('muted'),
        deep: v('deep'),
        blood: v('blood'),
        onAccent: v('on-accent'),
        ember: {
          DEFAULT: v('accent'),
          400: v('accent-hi'),
          500: v('accent'),
          600: v('accent-lo'),
          700: v('accent-lo'),
        },
        helix: {
          DEFAULT: v('cool'),
          400: v('cool-hi'),
          600: v('cool-lo'),
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        condensed: ['var(--font-condensed)', 'Impact', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.1rem, 1.35rem + 3.8vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(1.9rem, 1.3rem + 3vw, 3.75rem)', { lineHeight: '1.04', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.55rem, 1.2rem + 1.9vw, 2.6rem)', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.25rem, 1.05rem + 1vw, 1.6rem)', { lineHeight: '1.2' }],
        eyebrow: ['clamp(0.62rem, 0.58rem + 0.15vw, 0.6875rem)', { lineHeight: '1', letterSpacing: '0.32em' }],
      },
      maxWidth: { shell: '1240px', prose: '68ch' },
      boxShadow: {
        cover: 'var(--shadow-cover)',
        lift: 'var(--shadow-lift)',
        ember: 'var(--shadow-ember)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(-0.4deg)' },
          '50%': { transform: 'translateY(-10px) rotate(0.4deg)' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.35' },
          '50%': { transform: 'translate3d(3%,-4%,0) scale(1.08)', opacity: '0.6' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.15' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        drift: 'drift 22s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        blink: 'blink 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
