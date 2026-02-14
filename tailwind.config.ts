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
        afghanibaba: {
          primary: '#F97316',
          secondary: '#FB923C',
          dark: '#C2410C',
          accent: '#F59E0B',
          gold: '#FDB713',
          light: '#FED7AA',
          muted: '#6B7280',
        },
      },
      boxShadow: {
        afghanibaba: '0 4px 20px rgba(0, 0, 0, 0.05)',
        'afghanibaba-md': '0 2px 12px rgba(0, 0, 0, 0.08)',
        'afghanibaba-lg': '0 10px 30px rgba(0, 0, 0, 0.1)',
        pro: '0 4px 20px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        afghanibaba: '1rem',
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
        '13': '3.25rem',
        '15': '3.75rem',
        '17': '4.25rem',
      },
    },
  },
};

export default config;
