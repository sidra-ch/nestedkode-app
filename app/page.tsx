"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";
import MobileHeader from "@/components/mobile/MobileHeader";
import MobileHero from "@/components/mobile/MobileHero";
import BookingTabs from "@/components/BookingTabs";
import QuickServices from "@/components/mobile/QuickServices";
import ServiceGrid from "@/components/mobile/ServiceGrid";
import { Plane, Bus, Hotel, Compass, Car } from "lucide-react";
// Main services for sticky icon bar (Afghanibaba.ir style)
const mainServices = [
  { _id: "1", name: "پرواز", icon: <Plane className="h-6 w-6 text-white" />, route: "/flights" },
  { _id: "2", name: "اتوبوس", icon: <Bus className="h-6 w-6 text-white" />, route: "/bus" },
  { _id: "3", name: "هتل", icon: <Hotel className="h-6 w-6 text-white" />, route: "/hotels" },
  { _id: "4", name: "تور", icon: <Compass className="h-6 w-6 text-white" />, route: "/tour" },
  { _id: "5", name: "تاکسی", icon: <Car className="h-6 w-6 text-white" />, route: "/taxi" },
];
import PopularDestinations from "@/components/mobile/PopularDestinations";
import PromotionalOffers from "@/components/mobile/PromotionalOffers";
import TourismDestinations from "@/components/mobile/TourismDestinations";
import BottomNav from "@/components/mobile/BottomNav";
import MobileMenu from "@/components/layout/MobileMenu";
import type { TabKey } from "@/components/BookingTabs";

const CloudinaryGallery = dynamic(() => import("@/components/CloudinaryGallery"), { ssr: false });

function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("domestic-flight");

  // Map tab to hero image – synced with BookingTabs (click tab → hero updates)
  const heroImages: Record<string, { src: string; alt: string }> = {
    "domestic-flight": { src: "/assets/bus-page/bus-page.webp", alt: "پرواز داخلی" },
    "foreign-flight": { src: "https://res.cloudinary.com/dwmxdyvd2/image/upload/v1772226635/foreignflight_u4tgqe.webp", alt: "پرواز خارجی" },
    "bus": { src: "https://res.cloudinary.com/dwmxdyvd2/image/upload/v1772226635/busimg_p2a9hu.webp", alt: "اتوبوس" },
    "taxi": { src: "https://res.cloudinary.com/dwmxdyvd2/image/upload/v1772226635/busimg_p2a9hu.webp", alt: "تاکسی" },
    "hotel": { src: "https://res.cloudinary.com/dwmxdyvd2/image/upload/v1772226652/hotelimg_exmle5.webp", alt: "هتل" },
    "tour": { src: "https://res.cloudinary.com/dwmxdyvd2/image/upload/v1772226653/tourimg_fkfaay.webp", alt: "تور" },
  };
  const heroImage = heroImages[activeTab] || heroImages["domestic-flight"];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: "rtl" }}>
      {/* Mobile Layout */}
      <div className="block md:hidden">
        {/* Mobile Header - Transparent over hero */}
        <MobileHeader onMenuOpen={() => setMobileMenuOpen(true)} />

        {/* Sticky Icon Bar (Afghanibaba.ir style) */}
        <ServiceGrid services={mainServices} />

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <MobileMenu onClose={() => setMobileMenuOpen(false)} />
        )}

        <main className="flex-1 pb-20 mt-[100px]">
          {/* Hero Section – no search form on mobile home (per design) */}
          <MobileHero image={heroImage.src} alt={heroImage.alt} />

          {/* Quick Services Grid */}
          <QuickServices />

          {/* Popular Destinations Carousel */}
          <PopularDestinations />

          {/* Promotional Offers */}
          <PromotionalOffers />

          {/* Cloudinary Gallery Section */}
          <div className="px-4 py-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-right">مقاصد گردشگری</h2>
            <TourismDestinations />
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>

      {/* Desktop Layout - Keep existing */}
      <div className="hidden md:block">
        <Navbar />
        <main className="flex-1 pb-0">
          {/* Hero Section without Afghanistan Map */}
          <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-cover bg-center transition-all duration-300" style={{ backgroundImage: `url('${heroImage.src}')`, filter: "brightness(1.05) contrast(1.15)" }} />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
              <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-sm text-center mb-1">سفر به سراسر افغانستان</h1>
              <p className="text-base md:text-lg text-gray-200 text-center font-medium">با افغانی‌بابا، آسان، سریع و مطمئن</p>
            </div>
          </div>

          {/* Booking Tabs (desktop) – same tab state drives hero */}
          <div className="w-full px-0 -mt-16 md:-mt-20 lg:-mt-24 relative z-20 mb-12 md:mb-16">
            <BookingTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Cloudinary Gallery Section */}
          <div className="container mx-auto px-3 sm:px-4 mb-12">
            <CloudinaryGallery />
          </div>
          {/* Other Afghanibaba Services */}
          <div className="container mx-auto px-3 sm:px-4 mb-8 md:mb-12">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-right">خدمات دیگر افغانی‌بابا</h1>
            <div className="border border-gray-300 rounded-xl p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {/* Travel Visa */}
                <a href="/visa" className="flex flex-col items-center text-center gap-4 p-4 rounded-lg hover:bg-orange-50 transition cursor-pointer border border-transparent hover:border-orange-400 group">
                  <div className="flex items-center gap-3">
                    <Image src="/assets/Home-page/home-card-1.svg" alt="Travel Visa" width={64} height={64} className="h-12 w-12 md:h-16 md:w-16 object-contain" />
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-orange-600 transition">تاشیره سفر</h3>
                  </div>
                  <p className="text-sm md:text-base text-gray-600">اخذ تاشیره برای کشورهای مختلف</p>
                </a>
                {/* Installment Travel */}
                <a href="/installment" className="flex flex-col items-center text-center gap-4 p-4 rounded-lg hover:bg-orange-50 transition cursor-pointer border border-transparent hover:border-orange-400 group">
                  <div className="flex items-center gap-3">
                    <Image src="/assets/Home-page/home-card-2.svg" alt="Installment Travel" width={64} height={64} className="h-12 w-12 md:h-16 md:w-16 object-contain" />
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-orange-600 transition">سفر اقساط</h3>
                  </div>
                  <p className="text-sm md:text-base text-gray-600">پرداخت هزینه سفر به صورت اقساط</p>
                </a>
                {/* Travel Card */}
                <a href="/travel-card" className="flex flex-col items-center text-center gap-4 p-4 rounded-lg hover:bg-orange-50 transition cursor-pointer border border-transparent hover:border-orange-400 group">
                  <div className="flex items-center gap-3">
                    <Image src="/assets/Home-page/home-card-3.svg" alt="Travel Card" width={64} height={64} className="h-12 w-12 md:h-16 md:w-16 object-contain" />
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-orange-600 transition">کارت سفر</h3>
                  </div>
                  <p className="text-sm md:text-base text-gray-600">کارت ویژه برای مسافران</p>
                </a>
              </div>
            </div>
          </div>
          {/* Premium Services Section */}
          <div className="container mx-auto px-3 sm:px-4 mb-14 md:mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="p-4 md:p-6 rounded-xl overflow-hidden hover:shadow-lg transition">
                <Image src="/assets/Home-page/home-card-6.webp" alt="Service Card 6" width={800} height={600} className="w-full h-64 md:h-60 rounded-lg object-cover" />
              </div>
              <div className="p-4 md:p-6 rounded-xl overflow-hidden hover:shadow-lg transition">
                <Image src="/assets/Home-page/home-card-7.webp" alt="Service Card 7" width={800} height={600} className="w-full h-64 md:h-60 rounded-lg object-cover" />
              </div>
            </div>
          </div>
          {/* Mobile App Download Section */}
          <div className="container mx-auto px-3 sm:px-4 mb-16">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-6 md:p-12">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <Image src="/assets/Home-page/home-card-5.png" alt="QR Code" width={192} height={192} className="w-40 h-40 md:w-48 md:h-48 object-contain mx-auto" />
                    <p className="text-sm text-gray-600 mt-4">کود را اسکن کنید</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center text-right">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">اپلیکیشن افغانی‌بابا</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">سریع‌تر و مطمئن‌تر به سفر بروید. اپلیکیشن افغانی‌بابا را دانلود کنید و از تمام خدمات سفر در هر جای و هر زمان استفاده کنید.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/mobile-app" className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition text-center justify-center"><span>🍎</span><span>دانلود iOS</span></Link>
                    <Link href="/mobile-app/android" className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition text-center justify-center"><span>🤖</span><span>دانلود Android</span></Link>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image src="/assets/Home-page/home-card-4.webp" alt="Mobile App Screenshot" width={176} height={256} className="w-40 h-56 md:w-44 md:h-64 object-contain" />
                </div>
              </div>
            </div>
          </div>
          {/* FAQ Section - Airline Questions */}
          <div className="container mx-auto px-3 sm:px-4 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-right">سوالات رایج درباره بلیط هواپیما</h2>
            <div className="space-y-4">
              {[
                "چند روز قبل از پرواز بلیط هواپیما بخریم؟", "میزان بار مجاز در هر پرواز چقدر است؟", "نرخ بلیط برای نوزادان و کودکان زیر 12 سال چگونه است؟", "آیا رزرو آنلاین بلیط هزینه بیشتری از خرید حضوری دارد؟", "آیا امکان استرداد بلیط پس از خرید اینترنتی وجود دارد؟", "آیا هنگام رزرو آنلاین امکان انتخاب صندلی وجود دارد؟"
              ].map((q, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <div className="w-full p-5 flex items-center justify-between text-right hover:bg-gray-50 transition">
                    <div className="flex items-center gap-4">
                      <span className="text-orange-500 font-bold text-lg">{i + 1}.</span>
                      <span className="font-medium text-gray-900">{q}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Benefits Section */}
          <div className="container mx-auto px-3 sm:px-4 mb-16">
            <div className="bg-white rounded-xl p-8 md:p-12" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">خرید بلیط هواپیما از افغانی‌بابا</h2>
                <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-right">افغانی‌بابا، بزرگ‌ترین و معتبرترین پلتفرم آنلاین خرید بلیط هواپیما و اتوبوس در کشور است. این سیستم از سال 2026 با هدف تسهیل خدمات سفر آنلاین فعالیت می‌کند.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-orange-50 rounded-xl"><div className="text-4xl mb-3">⭐</div><h3 className="font-bold text-gray-900 mb-2">97.2% رضایت مشتری</h3><p className="text-sm text-gray-600">رضایت کامل کاربران از خدمات پلتفرم</p></div>
                <div className="text-center p-6 bg-blue-50 rounded-xl"><div className="text-4xl mb-3">⚡</div><h3 className="font-bold text-gray-900 mb-2">سرعت و راحتی</h3><p className="text-sm text-gray-600">خرید سریع و آسان بلیط به صورت آنلاین</p></div>
                <div className="text-center p-6 bg-green-50 rounded-xl"><div className="text-4xl mb-3">💰</div><h3 className="font-bold text-gray-900 mb-2">بهترین قیمت</h3><p className="text-sm text-gray-600">تضمین کمترین نرخ بازار</p></div>
                <div className="text-center p-6 bg-purple-50 rounded-xl"><div className="text-4xl mb-3">🔄</div><h3 className="font-bold text-gray-900 mb-2">استرداد آنلاین</h3><p className="text-sm text-gray-600">امکان کنسلی و استرداد وجه به صورت آنلاین</p></div>
              </div>
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-4 text-right">تقویم قیمت بلیط هواپیما</h3>
                <p className="text-gray-600 text-right">یکی از مفیدترین ابزارهای افغانی‌بابا برای خرید آنلاین بلیط، تقویم قیمت است. با استفاده از این تقویم، می‌توانید نوسانات قیمت بلیط را در روزهای قبل و بعد از تاریخ مورد نظر خود مشاهده کنید.</p>
              </div>
            </div>
          </div>
          {/* Flight Search Filters Section */}
          <div className="container mx-auto px-3 sm:px-4 mb-16">
            <div className="bg-white rounded-xl p-8 md:p-12" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-right">فیلترهای جستجوی پرواز</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 border border-gray-200 rounded-xl">
                  <h3 className="font-bold text-xl text-gray-900 mb-4 text-right">فیلترهای پرواز داخلی</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-600 text-right"><span className="text-orange-500">✓</span>انتخاب بلیط بر اساس زمان پرواز</li>
                    <li className="flex items-center gap-3 text-gray-600 text-right"><span className="text-orange-500">✓</span>انتخاب بر اساس نوع بلیط</li>
                    <li className="flex items-center gap-3 text-gray-600 text-right"><span className="text-orange-500">✓</span>فیلتر بلیط بر اساس کلاس پرواز</li>
                    <li className="flex items-center gap-3 text-gray-600 text-right"><span className="text-orange-500">✓</span>انتخاب ایرلاین داخلی</li>
                  </ul>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl">
                  <h3 className="font-bold text-xl text-gray-900 mb-4 text-right">فیلترهای پرواز خارجی</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-600 text-right"><span className="text-orange-500">✓</span>انتخاب بلیط بر اساس زمان پرواز</li>
                    <li className="flex items-center gap-3 text-gray-600 text-right"><span className="text-orange-500">✓</span>انتخاب بلیط بر اساس زمان رسیدن به مقصد</li>
                    <li className="flex items-center gap-3 text-gray-600 text-right"><span className="text-orange-500">✓</span>خرید بلیط بر اساس تعداد توقف: مستقیم - یک توقف - دو توقف</li>
                    <li className="flex items-center gap-3 text-gray-600 text-right"><span className="text-orange-500">✓</span>فیلتر بلیط بر اساس میزان بار مجاز</li>
                    <li className="flex items-center gap-3 text-gray-600 text-right"><span className="text-orange-500">✓</span>فیلتر فرودگاه مبدا، مقصد و توقف</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Airlines Section */}
          <div className="container mx-auto px-3 sm:px-4 mb-16">
            <div className="bg-white rounded-xl p-8 md:p-12" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-right">خرید بلیط از معتبرترین ایرلاین‌ها</h2>
              <p className="text-gray-600 mb-8 text-right">شما حق انتخاب از ایرلاین‌های مختلف را دارید و می‌توانید بلیط پرواز داخلی و خارجی خود را از معتبرترین ایرلاین‌ها خریداری کنید.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4 text-right">ایرلاین‌های داخلی</h3>
                  <div className="flex flex-wrap gap-2">{['کام ایر', 'آریانا', 'Afghan Jet', 'Saf Airways', 'Kam Air'].map((airline, index) => (<span key={index} className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">{airline}</span>))}</div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4 text-right">ایرلاین‌های خارجی</h3>
                  <div className="flex flex-wrap gap-2">{['Emirates', 'Qatar Airways', 'Turkish Airlines', 'Flydubai', 'Air Arabia'].map((airline, index) => (<span key={index} className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">{airline}</span>))}</div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-blue-50 rounded-xl"><h3 className="font-bold text-gray-900 mb-3 text-right">پروازهای داخلی</h3><p className="text-gray-600 text-right">خرید بلیط برای تمام مسیرهای پروازی داخلی با تنوع بالای ایرلاین‌ها و قیمت‌های مختلف. از جمله: کابل-مشهد، کابل-تهران، کابل-هرات و...</p></div>
                  <div className="p-6 bg-green-50 rounded-xl"><h3 className="font-bold text-gray-900 mb-3 text-right">پروازهای خارجی</h3><p className="text-gray-600 text-right">خرید بلیط برای مقاصد بین‌المللی متنوع از جمله ترکیه، امارات، اروپا، آسیا و آمریکا با بهترین قیمت‌ها.</p></div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-orange-50 rounded-xl"><h3 className="font-bold text-gray-900 mb-3 text-right">امکان استرداد بلیط در افغانی‌بابا</h3><p className="text-gray-600 text-right">یکی از ویژگی‌های برجسته افغانی‌بابا، امکان استرداد آنلاین بلیط هواپیما است. اگر برنامه سفر شما تغییر کرد، می‌توانید به راحتی بلیط خود را کنسل کرده و وجه را در کوتاه‌ترین زمان دریافت کنید.</p></div>
            </div>
          </div>
          {/* Why Choose Us Section */}
          <div className="container mx-auto px-3 sm:px-4 mb-16">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 md:p-12 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-right">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">افغانی‌بابا، همراه شما در سفر</h2>
                  <p className="text-white/90 mb-6 leading-relaxed">ارائه تمام خدمات سفر (پرواز، اتوبوس، هتل و تور) با بهترین کیفیت و قیمت. پشتیبانی 24 ساعته در تمام مراحل سفر.</p>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 px-6 py-3 rounded-lg"><div className="text-2xl font-bold">۲۴/۷</div><div className="text-sm">پشتیبانی</div></div>
                    <div className="bg-white/20 px-6 py-3 rounded-lg"><div className="text-2xl font-bold">+۵۰</div><div className="text-sm">ایرلاین</div></div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="text-center"><div className="text-6xl mb-4">✈️</div><h3 className="text-xl font-bold">معتمدترین عرضه‌کننده محصولات گردشگری در افغانستان</h3></div>
                </div>
              </div>
            </div>
          </div>
          {/* Trust Badges */}
          <div className="container mx-auto px-3 sm:px-4 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4 p-6 bg-white rounded-xl" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}><div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center"><svg className="h-6 w-6 text-blue-500" /></div><div className="text-right"><h3 className="font-bold text-gray-900">پشتیبانی ۲۴ ساعته</h3><p className="text-sm text-gray-600">همیشه در کنار شما هستیم</p></div></div>
              <div className="flex items-center gap-4 p-6 bg-white rounded-xl" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}><div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-full flex items-center justify-center"><svg className="h-6 w-6 text-green-500" /></div><div className="text-right"><h3 className="font-bold text-gray-900">بهترین قیمت</h3><p className="text-sm text-gray-600">تضمین کمترین نرخ بازار</p></div></div>
              <div className="flex items-center gap-4 p-6 bg-white rounded-xl" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}><div className="flex-shrink-0 w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center"><svg className="h-6 w-6 text-purple-500" /></div><div className="text-right"><h3 className="font-bold text-gray-900">استرداد آنلاین</h3><p className="text-sm text-gray-600">فرآیند ساده و سریع</p></div></div>
            </div>
          </div>
          {/* Services Section */}
          <div className="container mx-auto px-3 sm:px-4 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-right">خدمات ما</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/flights" className="group p-8 bg-white rounded-xl hover:shadow-lg transition text-right"><div className="text-4xl mb-4">✈️</div><h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-afghanibaba-primary transition">بلیط هواپیما</h3><p className="text-gray-600">رزرو بلیط پروازهای داخلی و بین‌المللی با بهترین نرخ</p></Link>
              <Link href="/today-flights" className="group p-8 bg-white rounded-xl hover:shadow-lg transition text-right"><div className="text-4xl mb-4">🛫</div><h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-afghanibaba-primary transition">پروازهای امروز</h3><p className="text-gray-600">مشاهده و رزرو پروازهای امروز در تمام مسیرها</p></Link>
              <Link href="/hotels" className="group p-8 bg-white rounded-xl hover:shadow-lg transition text-right"><div className="text-4xl mb-4">🏨</div><h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-afghanibaba-primary transition">رزرو هتل</h3><p className="text-gray-600">رزرو هتل‌های معتبر در سراسر کشور و جهان</p></Link>
              <Link href="/bus" className="group p-8 bg-white rounded-xl hover:shadow-lg transition text-right"><div className="text-4xl mb-4">🚌</div><h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-afghanibaba-primary transition">بلیط اتوبوس</h3><p className="text-gray-600">رزرو اتوبوس‌های بین‌شهری با امکانات کامل</p></Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
