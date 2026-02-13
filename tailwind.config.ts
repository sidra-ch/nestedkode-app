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
        // Afghanibaba Orange Color Scheme
        afghanibaba: {
          primary: '#F97316',    // Main Orange
          secondary: '#FB923C',  // Lighter Orange
          dark: '#C2410C',       // Dark Orange  
          accent: '#F59E0B',     // Gold accent for highlights
          gold: '#FDB713',       // Legacy gold (for compatibility)
          light: '#FED7AA',      // Light orange background
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
        'pro': '0 4px 20px rgba(0,0,0,0.08)', // Professional Alibaba.ir shadow
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
