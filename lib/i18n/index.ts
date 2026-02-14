export type Language = 'fa' | 'ps' | 'en';

export interface Translations {
  [key: string]: {
    fa: string;
    ps: string;
    en: string;
  };
}

export const translations: Translations = {
  // Common
  'common.search': {
    fa: 'جستجو',
    ps: 'لټون',
    en: 'Search',
  },
  'common.submit': {
    fa: 'ثبت',
    ps: 'سپارل',
    en: 'Submit',
  },
  'common.cancel': {
    fa: 'لغو',
    ps: 'لغو',
    en: 'Cancel',
  },
  'common.save': {
    fa: 'ذخیره',
    ps: 'SAVE',
    en: 'Save',
  },
  'common.loading': {
    fa: 'در حال بارگذاری...',
    ps: 'په بارولو کی دی...',
    en: 'Loading...',
  },
  
  // Navigation
  'nav.home': {
    fa: 'خانه',
    ps: 'کور',
    en: 'Home',
  },
  'nav.flights': {
    fa: 'پرواز',
    ps: 'پرواز',
    en: 'Flights',
  },
  'nav.bus': {
    fa: 'اتوبوس',
    ps: 'بس',
    en: 'Bus',
  },
  'nav.hotels': {
    fa: 'هتل',
    ps: 'هوتل',
    en: 'Hotels',
  },
  'nav.taxi': {
    fa: 'تاکسی',
    ps: 'تاکسي',
    en: 'Taxi',
  },
  'nav.tour': {
    fa: 'تور',
    ps: 'تور',
    en: 'Tour',
  },
  'nav.insurance': {
    fa: 'بیمه',
    ps: 'بیمه',
    en: 'Insurance',
  },
  'nav.help': {
    fa: 'پشتیبانی',
    ps: 'مرسته',
    en: 'Support',
  },
  'nav.login': {
    fa: 'ورود',
    ps: 'ننوتل',
    en: 'Login',
  },
  'nav.register': {
    fa: 'ثبت نام',
    ps: 'ثبت نوم',
    en: 'Register',
  },
  
  // Search Form
  'search.from': {
    fa: 'مبدا',
    ps: 'له کوم ځایه',
    en: 'From',
  },
  'search.to': {
    fa: 'مقصد',
    ps: 'ته ځای',
    en: 'To',
  },
  'search.date': {
    fa: 'تاریخ',
    ps: 'نیټه',
    en: 'Date',
  },
  'search.passengers': {
    fa: 'مسافران',
    ps: 'مسافران',
    en: 'Passengers',
  },
  'search.oneWay': {
    fa: 'یک طرفه',
    ps: 'یو لوری',
    en: 'One Way',
  },
  'search.roundTrip': {
    fa: 'رفت و برگشت',
    ps: 'دوه لوری',
    en: 'Round Trip',
  },
  
  // Booking
  'booking.title': {
    fa: 'رزرو',
    ps: 'BOOKING',
    en: 'Booking',
  },
  'booking.confirmed': {
    fa: 'تایید شده',
    ps: 'تصویب شوی',
    en: 'Confirmed',
  },
  'booking.pending': {
    fa: 'در انتظار',
    ps: 'په انتظار کی',
    en: 'Pending',
  },
  'booking.cancelled': {
    fa: 'کنسل شده',
    ps: 'لغو شوی',
    en: 'Cancelled',
  },
  'booking.details': {
    fa: 'جزئیات رزرو',
    ps: 'BOOKING',
    en: 'Booking Details',
  },
  
  // Payment
  'payment.title': {
    fa: 'پرداخت',
    ps: 'Payment',
    en: 'Payment',
  },
  'payment.online': {
    fa: 'پرداخت آنلاین',
    ps: 'آنلاین Payment',
    en: 'Online Payment',
  },
  'payment.offline': {
    fa: 'پرداخت آفلاین',
    ps: 'آفلانین Payment',
    en: 'Offline Payment',
  },
  'payment.success': {
    fa: 'پرداخت موفق',
    ps: 'Payment',
    en: 'Payment Successful',
  },
  'payment.failed': {
    fa: 'پرداخت ناموفق',
    ps: 'Payment',
    en: 'Payment Failed',
  },
  
  // Errors
  'error.required': {
    fa: 'این فیلد الزامی است',
    ps: 'دا فیلد اړین دی',
    en: 'This field is required',
  },
  'error.invalid': {
    fa: 'مقدار نامعتبر',
    ps: 'ناوړه ارزښت',
    en: 'Invalid value',
  },
  'error.network': {
    fa: 'خطای شبکه',
    ps: 'Network',
    en: 'Network Error',
  },
  
  // Footer
  'footer.about': {
    fa: 'درباره ما',
    ps: 'زموږ په اړه',
    en: 'About Us',
  },
  'footer.contact': {
    fa: 'تماس با ما',
    ps: 'موږ سره اړیکه',
    en: 'Contact Us',
  },
  'footer.terms': {
    fa: 'قوانین و مقررات',
    ps: 'قوانین',
    en: 'Terms & Conditions',
  },
  'footer.privacy': {
    fa: 'حریم خصوصی',
    ps: 'سريزه',
    en: 'Privacy Policy',
  },
};

export function t(key: string, lang: Language = 'fa'): string {
  const translation = translations[key];
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translation[lang] || translation.fa;
}

export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') return 'fa';
  
  const saved = localStorage.getItem('language');
  if (saved && ['fa', 'ps', 'en'].includes(saved)) {
    return saved as Language;
  }
  
  const browserLang = navigator.language.split('-')[0];
  if (['fa', 'ps', 'en'].includes(browserLang)) {
    return browserLang as Language;
  }
  
  return 'fa';
}

export function setLanguage(lang: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'fa' || lang === 'ps' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }
}
