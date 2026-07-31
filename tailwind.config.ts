import type { Config } from 'tailwindcss';

/**
 * Palette is sampled directly from THE KILLING GENE cover:
 * charred soil, blue smoke, bleached bone — plus one ember accent
 * that only ever appears on things the reader can act on.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        night: '#05070C', // charred soil — page base
        ink: '#0A0F17', // cards, nav
        abyss: '#101A2A', // raised surfaces
        deep: '#16273F', // blue smoke
        bone: '#F3EDE1', // primary text
        parchment: '#E3D9C6', // secondary text
        ash: '#93A0B2', // muted / meta
        ember: {
          DEFAULT: '#E2703A',
          400: '#F08A4B',
          500: '#E2703A',
          600: '#C4551F',
          700: '#9A3F14',
        },
        helix: {
          DEFAULT: '#5AA9C4',
          400: '#7BC3DA',
          600: '#3A7F98',
        },
        blood: '#7E1416',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        condensed: ['var(--font-condensed)', 'Impact', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 7vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.75rem, 3.2vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.34em' }],
      },
      maxWidth: {
        shell: '1240px',
        prose: '68ch',
      },
      boxShadow: {
        cover: '0 30px 70px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(243,237,225,0.06)',
        lift: '0 24px 60px -28px rgba(0,0,0,0.9)',
        ember: '0 0 0 1px rgba(226,112,58,0.35), 0 18px 45px -22px rgba(226,112,58,0.55)',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1) translate3d(0,0,0)' },
          '100%': { transform: 'scale(1.09) translate3d(-1.5%,-1.5%,0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(-0.4deg)' },
          '50%': { transform: 'translateY(-14px) rotate(0.4deg)' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.35' },
          '50%': { transform: 'translate3d(3%,-4%,0) scale(1.08)', opacity: '0.6' },
        },
        sweep: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' },
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
        kenburns: 'kenburns 18s ease-out forwards',
        float: 'float 7s ease-in-out infinite',
        drift: 'drift 22s ease-in-out infinite',
        sweep: 'sweep 2.4s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        blink: 'blink 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
