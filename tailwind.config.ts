import type { Config } from 'tailwindcss'
import animatePlugin from 'tailwindcss-animate'

// Defaults: https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
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
    // fontSize: {
    //   xs: ['0.75rem', { lineHeight: '1rem' }],
    //   sm: ['0.875rem', { lineHeight: '1.25rem' }],
    //   base: ['1rem', { lineHeight: '1.5rem' }],
    //   lg: ['1.125rem', { lineHeight: '1.75rem' }],
    //   xl: ['1.25rem', { lineHeight: '1.75rem' }],
    //   '2xl': ['1.5rem', { lineHeight: '2rem' }],
    //   '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    //   '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    //   '5xl': ['3rem', { lineHeight: '1' }],
    //   '6xl': ['3.75rem', { lineHeight: '1' }],
    //   '7xl': ['4.5rem', { lineHeight: '1' }],
    //   '8xl': ['6rem', { lineHeight: '1' }],
    //   '9xl': ['8rem', { lineHeight: '1' }],
    // },
    borderRadius: {
      none: '0px',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
    boxShadow: {
      sm: '1px 2px rgb(var(--nb-shadows))',
      DEFAULT: '2px 4px rgb(var(--nb-shadows))',
      md: '2px 4px rgb(var(--nb-shadows))',
      lg: '4px 6px rgb(var(--nb-shadows))',
      xl: '6px 8px rgb(var(--nb-shadows))',
      '2xl': '8px 10px rgb(var(--nb-shadows))',
      inner: 'inset 2px 4px rgb(var(--nb-shadows))',
      none: 'none',
    },
    extend: {
      colors: {
        border: "rgb(var(--nb-borders))",
        input: "rgb(var(--nb-input))",
        ring: "rgb(var(--nb-ring))",
        background: "rgb(var(--nb-background))",
        foreground: "rgb(var(--nb-foreground))",
        primary: {
          DEFAULT: "rgb(var(--nb-primary))",
          foreground: "rgb(var(--nb-primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgb(var(--nb-secondary))",
          foreground: "rgb(var(--nb-secondary-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--nb-accent))",
          foreground: "rgb(var(--nb-accent-foreground))",
        },
        muted: {
          DEFAULT: "rgb(var(--nb-muted))",
          foreground: "rgb(var(--nb-muted-foreground))",
        },
        destructive: {
          DEFAULT: "rgb(var(--nb-red-400))",
          foreground: "rgb(var(--nb-white))",
        },
        popover: {
          DEFAULT: "rgb(var(--nb-background))",
          foreground: "rgb(var(--nb-foreground))",
        },
        card: {
          DEFAULT: "rgb(var(--nb-background))",
          foreground: "rgb(var(--nb-foreground))",
        },
        nb: {
          DEFAULT: "rgb(var(--nb-primary))",
          foreground: "rgb(var(--nb-black))",
          background: "rgb(var(--nb-white))",
          borders: "rgb(var(--nb-borders))",
          shadows: "rgb(var(--nb-shadows))",
          //
          primary: 'rgb(var(--nb-primary))',
          'primary-foreground': 'rgb(var(--nb-black))',
          'primary-lighter': 'rgb(var(--nb-primary-lighter))',
          white: 'rgb(var(--nb-white))',
          black: 'rgb(var(--nb-black))',
          gray: 'rgb(var(--nb-gray))',
          'light-gray': 'rgb(var(--nb-light-gray))',
          'neon-cyan': 'rgb(var(--nb-neon-cyan))',
          'cyan-100': 'rgb(var(--nb-cyan-100))',
          'cyan-200': 'rgb(var(--nb-cyan-200))',
          'cyan-300': 'rgb(var(--nb-cyan-300))',
          'cyan-400': 'rgb(var(--nb-cyan-400))',
          'neon-green': 'rgb(var(--nb-neon-green))',
          'green-100': 'rgb(var(--nb-green-100))',
          'green-200': 'rgb(var(--nb-green-200))',
          'green-300': 'rgb(var(--nb-green-300))',
          'green-400': 'rgb(var(--nb-green-400))',
          'neon-yellow': 'rgb(var(--nb-neon-yellow))',
          'yellow-100': 'rgb(var(--nb-yellow-100))',
          'yellow-200': 'rgb(var(--nb-yellow-200))',
          'yellow-300': 'rgb(var(--nb-yellow-300))',
          'yellow-400': 'rgb(var(--nb-yellow-400))',
          'neon-red': 'rgb(var(--nb-neon-red))',
          'red-100': 'rgb(var(--nb-red-100))',
          'red-200': 'rgb(var(--nb-red-200))',
          'red-300': 'rgb(var(--nb-red-300))',
          'red-400': 'rgb(var(--nb-red-400))',
          'neon-pink': 'rgb(var(--nb-neon-pink))',
          'pink-100': 'rgb(var(--nb-pink-100))',
          'pink-200': 'rgb(var(--nb-pink-200))',
          'pink-300': 'rgb(var(--nb-pink-300))',
          'pink-400': 'rgb(var(--nb-pink-400))',
          'neon-blue': 'rgb(var(--nb-neon-blue))',
          'purple-100': 'rgb(var(--nb-purple-100))',
          'purple-200': 'rgb(var(--nb-purple-200))',
          'purple-300': 'rgb(var(--nb-purple-300))',
          'purple-400': 'rgb(var(--nb-purple-400))',
        },
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
