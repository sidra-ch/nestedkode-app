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
  'nav.login_register': {
    fa: 'ورود یا ثبت‌نام',
    ps: 'ننوتل یا ثبت نوم',
    en: 'Login or Register',
  },
  'nav.my_travels': {
    fa: 'سفرهای من',
    ps: 'زما سفرونه',
    en: 'My Travels',
  },
  'nav.support': {
    fa: 'پشتیبانی',
    ps: 'مرسته',
    en: 'Support',
  },
  'nav.admin_dashboard': {
    fa: 'داشبورد ادمین',
    ps: 'ادمین ډشبورډ',
    en: 'Admin Dashboard',
  },
  'nav.user_profile': {
    fa: 'حساب کاربری',
    ps: 'کارن پروفایل',
    en: 'User Profile',
  },
  'nav.logout': {
    fa: 'خروج از حساب',
    ps: 'وتل',
    en: 'Logout',
  },
  'nav.domestic_flights': {
    fa: 'پرواز داخلی',
    ps: 'کورنی الوتنې',
    en: 'Domestic Flights',
  },
  'nav.international_flights': {
    fa: 'پرواز خارجی',
    ps: 'نړیوالې الوتنې',
    en: 'International Flights',
  },
  'nav.tour_travel': {
    fa: 'تور مسافرتی',
    ps: 'سیاحتي سفر',
    en: 'Tour Travel',
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
  'footer.description': {
    fa: 'افغانی‌بابا، رتبه یک خرید اینترنتی بلیط سفر در افغانستان. با بهترین قیمت و پشتیبانی ۲۴ ساعته.',
    ps: 'افغانی‌بابا، په افغانستان کې د سفر ټکټونو انلاین پیرلو کې لومړۍ درجه. په لږه بیه او ۲۴ ساعته ملاتړ سره.',
    en: 'Afghan Baba, the #1 online travel booking platform in Afghanistan. Best prices and 24/7 support.',
  },
  'footer.social.telegram': { fa: 'تلگرام', ps: 'تلګرام', en: 'Telegram' },
  'footer.social.instagram': { fa: 'اینستاگرام', ps: 'انستاګرام', en: 'Instagram' },
  'footer.social.twitter': { fa: 'توییتر', ps: 'ټویټر', en: 'Twitter' },
  'footer.why_us': { fa: 'چرا افغانی‌بابا', ps: 'ولې افغانی‌بابا', en: 'Why Us?' },
  'footer.plus': { fa: 'افغانی‌بابا پلاس', ps: 'افغانی‌بابا پلس', en: 'Afghan Baba Plus' },
  'footer.customer_service': { fa: 'خدمات مشتریان', ps: 'د پیرودونکو خدمات', en: 'Customer Service' },
  'footer.online_support': { fa: 'مرکز پشتیبانی آنلاین', ps: 'آنلاین ملاتړ مرکز', en: 'Online Support' },
  'footer.purchase_guide': { fa: 'راهنمای خرید', ps: 'د پیرود لارښود', en: 'Purchase Guide' },
  'footer.refund_guide': { fa: 'راهنمای استرداد', ps: 'د بیرته ورکولو لارښود', en: 'Refund Guide' },
  'footer.faq': { fa: 'سوالات متداول', ps: 'عامې پوښتنې', en: 'FAQ' },
  'footer.corp_sales': { fa: 'فروش سازمانی', ps: 'سازماني پلور', en: 'Corporate Sales' },
  'footer.agency_panel': { fa: 'پنل آژانسی', ps: 'د ادارې پینل', en: 'Agency Panel' },
  'footer.careers': { fa: 'فرصت‌های شغلی', ps: 'دندې', en: 'Careers' },
  'footer.sitemap': { fa: 'نقشه سایت', ps: 'سایټ نقشه', en: 'Sitemap' },
  'footer.information': { fa: 'اطلاعات تکمیلی', ps: 'اضافي معلومات', en: 'Information' },
  'footer.contact_title': { fa: 'تماس', ps: 'اړیکه', en: 'Contact' },
  'footer.address': { fa: 'کابل، افغانستان', ps: 'کابل، افغانستان', en: 'Kabul, Afghanistan' },
  'footer.copyright': {
    fa: '© ۲۰۲۶ - شرکت خدمات گردشگری افغانی‌بابا - تمامی حقوق محفوظ است',
    ps: '© ۲۰۲۶ - افغانی‌بابا ګرزندوی شرکت - ټول حقونه خوندي دي',
    en: '© 2026 - Afghan Baba Travel Services - All Rights Reserved',
  },
  'footer.bus_search_title': {
    fa: 'جستجوی بلیط اتوبوس سراسر افغانستان',
    ps: 'په ټول افغانستان کې د بس ټکټونو لټون',
    en: 'Search Bus Tickets Across Afghanistan',
  },
  'footer.bus_route': {
    fa: 'بلیط اتوبوس {from} به {to}',
    ps: 'له {from} څخه {to} ته د بس ټکټونه',
    en: 'Bus Ticket from {from} to {to}',
  },

  // Bus Booking Page
  'bus.booking.title': {
    fa: 'رزرو تکت اتوبوس',
    ps: 'د بس ټکټ بک کول',
    en: 'Bus Ticket Booking',
  },
  'bus.select.seat': {
    fa: 'انتخاب چوکی',
    ps: 'څوکۍ غوره کړئ',
    en: 'Select Seat',
  },
  'bus.passenger.info': {
    fa: 'مشخصات مسافران',
    ps: 'د مسافرینو مشخصات',
    en: 'Passenger Details',
  },
  'bus.first.name': {
    fa: 'نام',
    ps: 'نوم',
    en: 'First Name',
  },
  'bus.last.name': {
    fa: 'تخلص',
    ps: 'تخلص',
    en: 'Last Name',
  },
  'bus.phone': {
    fa: 'شماره تماس',
    ps: 'د اړیکې شمیره',
    en: 'Phone Number',
  },
  'bus.gender': {
    fa: 'جنسیت',
    ps: 'جنسیت',
    en: 'Gender',
  },
  'bus.male': {
    fa: 'مرد',
    ps: 'ن نارینه',
    en: 'Male',
  },
  'bus.female': {
    fa: 'زن',
    ps: 'ښځینه',
    en: 'Female',
  },
  'bus.account.info': {
    fa: 'اطلاعات حساب',
    ps: 'د حساب معلومات',
    en: 'Account Information',
  },
  'bus.verified': {
    fa: 'تایید شده',
    ps: 'تصدیق شوی',
    en: 'Verified',
  },
  'bus.login.prompt': {
    fa: 'قبلاً ثبت‌نام کرده‌اید؟ ورود',
    ps: 'دمخه ثبت شوی؟ ننوتل',
    en: 'Already registered? Login',
  },
  'bus.secure.account': {
    fa: 'امن کردن اکونت اتومات',
    ps: 'د اتوماتیک حساب خوندي کول',
    en: 'Secure Account Automatically',
  },
  'bus.password': {
    fa: 'پسورد',
    ps: 'پټنوم',
    en: 'Password',
  },
  'bus.total.payable': {
    fa: 'مبلغ قابل پرداخت',
    ps: 'د تادیې وړ مقدار',
    en: 'Total Amount Payable',
  },
  'bus.confirm.booking': {
    fa: 'ثبت و ادامه',
    ps: 'ثبت او دوام ورکړئ',
    en: 'Register & Confirm',
  },
  'bus.currency': {
    fa: 'افغانی',
    ps: 'افغانۍ',
    en: 'AFN',
  },
  'bus.error.select.seat': {
    fa: 'لطفا حداقل یک چوکی انتخاب کنید.',
    ps: 'مهرباني وکړئ لږترلږه یوه څوکۍ غوره کړئ.',
    en: 'Please select at least one seat.',
  },
  'bus.error.fill.fields': {
    fa: 'لطفاً این بخش‌ها را پر کنید: {fields}',
    ps: 'مهرباني وکړئ دا برخې ډکې کړئ: {fields}',
    en: 'Please fill the following fields: {fields}',
  },
  'bus.error.choose.password': {
    fa: 'لطفاً یک پسورد انتخاب کنید.',
    ps: 'مهرباني وکړئ یو پټنوم غوره کړئ.',
    en: 'Please choose a password.',
  },
  'bus.error.phone.registered': {
    fa: 'این شماره قبلاً ثبت شده است. لطفاً پسورد صحیح را وارد کنید.',
    ps: 'دا شمیره دمخه راجستر شوې ده. مهرباني وکړئ سم پټنوم دننه کړئ.',
    en: 'Phone already registered. Please check password.',
  },
  'bus.status.available': {
    fa: 'آزاد',
    ps: 'آزاد',
    en: 'Free',
  },
  'bus.status.booked': {
    fa: 'پُـر',
    ps: 'پُـر',
    en: 'Full',
  },
  'bus.status.selected': {
    fa: 'انتخاب شده',
    ps: 'ټاکل شوی',
    en: 'Selected',
  },
  'bus.seats.count': {
    fa: 'چوکی',
    ps: 'څوکۍ',
    en: 'Seats',
  },
  'bus.vip': {
    fa: 'VIP',
    ps: 'VIP',
    en: 'VIP',
  },
  'bus.am': {
    fa: 'ق.ظ',
    ps: 'ق.ظ',
    en: 'AM',
  },
  'bus.pm': {
    fa: 'ب.ظ',
    ps: 'ب.ظ',
    en: 'PM',
  },
  'bus.verified.desc': {
    fa: 'اکانت شما تایید شده است. بلیط شما مستقیماً در پروفایل‌تان ذخیره خواهد شد.',
    ps: 'ستاسو حساب تایید شوی. ستاسو ټیکټ به ستاسو په پروفایل کې خوندي شي.',
    en: 'Your account is verified. Your ticket will be saved in your profile.',
  },
  'bus.confidential.desc': {
    fa: 'این اطلاعات محرمانه بوده و در سایت نمایش داده نمیشود و صرفا جهت دسترسی به شما استفاده خواهند شد.',
    ps: 'دا معلومات محرم دي او یوازې تاسو ته د لاسرسي لپاره کارول کیږي.',
    en: 'This information is confidential and used only for status updates.',
  },
  'bus.secure.desc': {
    fa: 'جهت امن کردن اکونت خویش چوکات ذیل را پر کنید.',
    ps: 'مهرباني وکړئ د خپل حساب خوندي کولو لپاره پټنوم غوره کړئ.',
    en: 'Please choose a password to secure your account.',
  },
  'bus.note': {
    fa: 'نوت',
    ps: 'یادونه',
    en: 'Note',
  },
  'bus.existing.account.note': {
    fa: 'درصورت داشتن اکونت از قبل از پسورد قبلی شما استفاده خواهد شد.',
    ps: 'که تاسو دمخه یو حساب لرئ، ستاسو پخوانی پټنوم به وکارول شي.',
    en: 'If you already have an account, your previous password will be used.',
  },
  'bus.note.title': {
    fa: 'یادداشت',
    ps: 'یادونه',
    en: 'Note',
  },
  'bus.note.1': {
    fa: 'برای شما بعد از ثبت تکت در صورت نداشتن اکونت از قبل اکونت جدید ایجاد میشود و در صورت داشتن اکونت تکت شما در بخش سفرهای من اکونت تان اضافه میگردد.',
    ps: 'ستاسو لپاره، د ټکټ راجستر کولو وروسته، که تاسو لا دمخه حساب نلرئ، یو نوی حساب به رامینځته شي، او که تاسو حساب لرئ، ستاسو ټکټ به ستاسو د حساب زما سفرونو برخه کې اضافه شي.',
    en: 'If you do not have an account, a new one will be created for you after booking. If you already have an account, the ticket will be added to your profile.',
  },
  'bus.note.2.title': {
    fa: 'چرا اکونت ایجاد میشود؟',
    ps: 'ولې حساب جوړیږي؟',
    en: 'Why is an account created?',
  },
  'bus.note.2.content': {
    fa: 'اکونت برای دسترسی داشتن در بخش سفر های من و دانستن تمامی سفرهای قبلی شما ایجاد میگردد.',
    ps: 'حساب زما د سفرونو برخې ته د لاسرسي لپاره رامینځته شوی او ستاسو ټول پخواني سفرونه پیژني.',
    en: 'An account is created to allow you to access "My Trips" and track all your previous bookings.',
  },
  'bus.note.3.title': {
    fa: 'چگونه به اکونت ایجاد شده خویش دسترسی پیدا کنم؟',
    ps: 'زه څنګه کولی شم خپل جوړ شوي حساب ته لاسرسی ومومم؟',
    en: 'How can I access my account?',
  },
  'bus.note.3.content': {
    fa: 'فقط کافیست با زدن دکمه ورود یا ثبت‌نام و درج نمودن شماره تماس و پسورد خویش وارد حساب خود شوید.',
    ps: 'یوازې د ننوتلو یا راجستر تڼۍ کلیک وکړئ او د خپل حساب ته د ننوتلو لپاره خپل د اړیکې شمیره او پټنوم دننه کړئ.',
    en: 'Simply click the login/register button and enter your phone number and password to access your account.',
  },
  'bus.back.to.search': {
    fa: 'بازگشت به جستجو',
    ps: 'بېرته پلټنې ته',
    en: 'Back to Search',
  },
  'bus.seats.limit': {
    fa: 'شما نمیتوانید بیشتر از {max} چوکی انتخاب کنید.',
    ps: 'تاسو نشئ کولی له {max} څخه ډیر څوکۍ غوره کړئ.',
    en: 'You cannot select more than {max} seats.',
  },
  'bus.select.seat.first': {
    fa: 'لطفاً ابتدا چوکی خود را انتخاب کنید',
    ps: 'مهرباني وکړئ لومړی خپله څوکۍ غوره کړئ',
    en: 'Please select your seat first',
  },
  'bus.seat': {
    fa: 'چوکی',
    ps: 'څوکۍ',
    en: 'Seat',
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
