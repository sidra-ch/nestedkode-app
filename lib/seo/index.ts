export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  schema?: object;
}

export const pageSEO: Record<string, SEOData> = {
  home: {
    title: 'افغانی‌بابا | خرید آنلاین بلیط هواپیما، اتوبوس، هتل و تور',
    description: 'خرید بلیط هواپیما، اتوبوس، رزرو هتل، تور و تاکسی بین‌شهری با بهترین قیمت در افغانی‌بابا',
    keywords: 'بلیط هواپیما, رزرو هتل, تور, اتوبوس, تاکسی, بیمه مسافرتی, ویزا',
    ogImage: '/assets/og-image.jpg',
  },
  flights: {
    title: 'بلیط هواپیما | جستجو و رزرو پرواز داخلی و خارجی',
    description: 'خرید آنلاین بلیط هواپیما داخلی و خارجی با بهترین قیمت | امکان مقایسه ایرلاین‌ها و رزرو آنلاین',
    keywords: 'بلیط هواپیما, پرواز داخلی, پرواز خارجی, خرید بلیط هواپیما',
    ogImage: '/assets/flights-og.jpg',
  },
  hotels: {
    title: 'رزرو هتل | رزرو آنلاین هتل‌های افغانستان',
    description: 'رزرو آنلاین هتل در کابل، مزار شریف، هرات و سایر شهرها | بهترین قیمت‌ها و رزرو سریع',
    keywords: 'رزرو هتل, هتل کابل, هتل مزار شریف, اقامت',
    ogImage: '/assets/hotels-og.jpg',
  },
  bus: {
    title: 'بلیط اتوبوس | خرید آنلاین بلیط اتوبوس',
    description: 'خرید آنلاین بلیط اتوبوس بین شهرهای افغانستان | انتخاب صندلی و رزرو آسان',
    keywords: 'بلیط اتوبوس, اتوبوس, رزرو بلیط',
    ogImage: '/assets/bus-og.jpg',
  },
  taxi: {
    title: 'تاکسی بین‌شهری | رزرو آنلاین تاکسی',
    description: 'رزرو آنلاین تاکسی بین شهری در افغانستان | رانندگان معتبر و قیمت مناسب',
    keywords: 'تاکسی, تاکسی بین شهری, رزرو تاکسی',
    ogImage: '/assets/taxi-og.jpg',
  },
  tour: {
    title: 'تور گردشگری | تورهای داخلی افغانستان',
    description: 'بهترین تورهای گردشگری افغانستان | بامیان، مزار شریف، هرات و...',
    keywords: 'تور, گردشگری, تور افغانستان, بامیان',
    ogImage: '/assets/tour-og.jpg',
  },
  insurance: {
    title: 'بیمه مسافرتی | خرید آنلاین بیمه سفر',
    description: 'خرید آنلاین بیمه مسافرتی با پوشش کامل | استرداد آسان و پشتیبانی 24 ساعته',
    keywords: 'بیمه مسافرتی, بیمه سفر, خرید بیمه',
    ogImage: '/assets/insurance-og.jpg',
  },
  helpCenter: {
    title: 'مرکز پشتیبانی | تماس با افغانی‌بابا',
    description: 'مرکز پشتیبانی افغانی‌بابا | پاسخ به سوالات متداول و راهنمای استفاده',
    keywords: 'پشتیبانی, تماس, راهنما, سوالات متداول',
    ogImage: '/assets/help-og.jpg',
  },
};

export function generateMetadata(page: string): SEOData {
  return pageSEO[page] || pageSEO.home;
}

export function generateSchema(type: 'organization' | 'website' | 'product' | 'FAQPage', data?: any): object {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'organization':
      return {
        ...baseSchema,
        name: 'افغانی‌بابا',
        url: 'https://afghanibaba.af',
        logo: 'https://afghanibaba.af/logo.png',
        description: 'پلتفرم آنلاین رزرو سفر در افغانستان',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+93-20-2500000',
          contactType: 'customer service',
        },
        sameAs: [
          'https://twitter.com/afghanibaba',
          'https://instagram.com/afghanibaba',
          'https://t.me/afghanibaba',
        ],
      };

    case 'website':
      return {
        ...baseSchema,
        url: 'https://afghanibaba.af',
        name: 'افغانی‌بابا',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://afghanibaba.af/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      };

    case 'FAQPage':
      return {
        ...baseSchema,
        mainEntity: data?.faqs?.map((faq: { question: string; answer: string }) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })) || [],
      };

    default:
      return baseSchema;
  }
}
