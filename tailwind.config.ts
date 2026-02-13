import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Afghanibaba Emerald Green Color Scheme
        afghanibaba: {
          primary: '#059669',    // Main Emerald Green
          secondary: '#10B981',  // Lighter Emerald
          dark: '#064E3B',       // Dark Emerald  
          accent: '#F59E0B',     // Gold accent for highlights
          gold: '#FDB713',       // Legacy gold (for compatibility)
          light: '#D1FAE5',      // Light emerald background
          muted: '#6B7280',      // Muted gray
        },
        // Support colors
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      boxShadow: {
        // Afghani-style premium soft shadow
        'afghanibaba': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'afghanibaba-md': '0 2px 12px rgba(0, 0, 0, 0.08)',
        'afghanibaba-lg': '0 10px 30px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        // Standard Afghanibaba border radius
        'afghanibaba': '1rem',  // 16px
        'xl': '1.25rem',
      },
      fontFamily: {
        sans: [
          'Vazirmatn',
          'IRANYekan',
          'Noto Sans Arabic',
          'system-ui',
          'sans-serif',
        ],
      },
      spacing: {
        // Premium spacing scale
        '13': '3.25rem',
        '15': '3.75rem',
        '17': '4.25rem',
      },
      // RTL support utilities
      direction: {
        ltr: 'ltr',
        rtl: 'rtl',
      },
    },
  },
  plugins: [
    // RTL support plugin
    ({ addUtilities }: any) => {
      addUtilities({
        '.rtl': {
          direction: 'rtl',
          textAlign: 'right',
        },
        '.ltr': {
          direction: 'ltr',
          textAlign: 'left',
        },
      });
    },
  ],
};

export default config;
