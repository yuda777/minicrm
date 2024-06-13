import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      boxShadow: {
        'glow-blue': '0 0 10px rgba(59, 130, 246, 0.7)', // Tailwind's blue-500 with opacity
      },
      colors: {
        ccc: 'hsl(200, 50%, 50%)',
        sbr: 'hsl(217, 33%, 17%)',
        sbx: 'hsl(217, 33%, 25%)',
        sidemenu: {
          DEFAULT: 'hsl(217, 33%, 17%)',
          secondary: 'hsl(217, 33%, 25%)',
          foreground: 'hsl(var(--sidemenu-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        dwhite: {
          DEFAULT: 'hsl(var(--dwhite))',
          foreground: 'hsl(var(--dwhite-foreground))',
        },
        tomato: {
          DEFAULT: 'hsl(9, 100%, 50%)', // HSL representation of tomato color
          50: 'hsl(9, 100%, 95%)',
          100: 'hsl(9, 100%, 90%)',
          200: 'hsl(9, 100%, 80%)',
          300: 'hsl(9, 100%, 65%)',
          400: 'hsl(9, 100%, 50%)',
          500: 'hsl(9, 100%, 35%)',
          600: 'hsl(9, 100%, 20%)',
          700: 'hsl(9, 100%, 15%)',
          800: 'hsl(9, 100%, 10%)',
          900: 'hsl(9, 100%, 5%)',
        },
        'sidebar-background': 'hsl(220, 14.3%, 10%)',
        'sidebar-foreground': 'hsl(0, 0%, 100%)',
        'sidebar-selected-bg': 'hsl(224.1, 30%, 85%)',
        'sidebar-hover-bg': 'hsl(224.1, 30%, 80%)',
        'sidebar-hover-fg': 'hsl(262.1, 5%, 15%)',
        'glow-blue': 'hsl(220, 80%, 60%)', // Blue color for glow effect
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
