import type { Config } from 'tailwindcss'
import animatePlugin from 'tailwindcss-animate'

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    borderRadius: {
      none: '0px',
      xs: '0.125rem',
      sm: '0.25rem',
      DEFAULT: '0.375rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        input2: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        nb: {
          DEFAULT: "var(--nb-primary)",
          foreground: "var(--nb-black)",
          background: "var(--nb-white)",
          borders: "var(--nb-black)",
          shadows: "var(--nb-black)",
          //
          primary: 'var(--nb-primary)',
          white: 'var(--nb-white)',
          black: 'var(--nb-black)',
          'neon-cyan': 'var(--nb-neon-cyan)',
          'cyan-100': 'var(--nb-cyan-100)',
          'cyan-200': 'var(--nb-cyan-200)',
          'cyan-300': 'var(--nb-cyan-300)',
          'cyan-400': 'var(--nb-cyan-400)',
          'neon-green': 'var(--nb-neon-green)',
          'green-100': 'var(--nb-green-100)',
          'green-200': 'var(--nb-green-200)',
          'green-300': 'var(--nb-green-300)',
          'green-400': 'var(--nb-green-400)',
          'neon-yellow': 'var(--nb-neon-yellow)',
          'yellow-100': 'var(--nb-yellow-100)',
          'yellow-200': 'var(--nb-yellow-200)',
          'yellow-300': 'var(--nb-yellow-300)',
          'yellow-400': 'var(--nb-yellow-400)',
          'neon-red': 'var(--nb-neon-red)',
          'red-100': 'var(--nb-red-100)',
          'red-200': 'var(--nb-red-200)',
          'red-300': 'var(--nb-red-300)',
          'red-400': 'var(--nb-red-400)',
          'neon-pink': 'var(--nb-neon-pink)',
          'pink-100': 'var(--nb-pink-100)',
          'pink-200': 'var(--nb-pink-200)',
          'pink-300': 'var(--nb-pink-300)',
          'pink-400': 'var(--nb-pink-400)',
          'neon-blue': 'var(--nb-neon-blue)',
          'purple-100': 'var(--nb-purple-100)',
          'purple-200': 'var(--nb-purple-200)',
          'purple-300': 'var(--nb-purple-300)',
          'purple-400': 'var(--nb-purple-400)',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: '0' },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: '0' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animatePlugin],
}

export default config
