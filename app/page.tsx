"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { assetPath } from "@/lib/assetPath";
import TaxiForm from "@/components/search/TaxiForm";
import RestaurantForm from "@/components/search/RestaurantForm";

type TabKey = "پرواز داخلی" | "پرواز خارجی" | "اتوبوس" | "هتل" | "تاکسی" | "رستوران";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("پرواز داخلی");

  const tabs: TabKey[] = ["پرواز داخلی", "پرواز خارجی", "اتوبوس", "هتل", "تاکسی", "رستوران"];

  const faqs = [
    { q: "چند روز قبل از پرواز بلیط هواپیما بخریم؟", a: "بهترین زمان برای خرید بلیط هواپیما معمولاً 2 تا 3 هفته قبل از سفر است." },
    { q: "در هر پرواز میزان بار مجاز چقدر است؟", a: "میزان بار مجاز بسته به ایرلاین متفاوت است. معمولاً 20 تا 30 کیلوگرم مجاز است." },
    { q: "نرخ بلیط برای نوزادان و کودکان چگونه است؟", a: "نوزادان (زیر 2 سال) معمولاً بدون صندلی و با 10% قیمت بزرگسالان سفر می‌کنند." },
    { q: "رزرو آنلاین هزینه بیشتری از خرید حضوری دارد؟", a: "خیر، رزرو آنلاین معمولاً هزینه کمتری دارد و امکان مقایسه قیمت‌ها فراهم است." },
    { q: "آیا پس از خرید اینترنتی امکان استرداد وجود دارد؟", a: "بله، بسته به قوانین ایرلاین امکان استرداد با کسر جریمه وجود دارد." },
    { q: "هنگام رزرو آنلاین امکان انتخاب صندلی هست؟", a: "بله، در بسیاری از ایرلاین‌ها امکان انتخاب صندلی هنگام خرید وجود دارد." },
  ];

  const domesticFilters = [
    "انتخاب بر اساس ساعت حرکت",
    "فیلتر نوع بلیط (سیستمی/چارتری)",
    "فیلتر کلاس پروازی",
    "انتخاب بر اساس ایرلاین داخلی",
  ];

  const internationalFilters = [
    "انتخاب بر اساس ساعت حرکت و رسیدن",
    "فیلتر تعداد توقف‌ها",
    "نمایش پروازهای بدون توقف",
    "فیلتر بار چمدان",
  ];

  const domesticAirlines = ["ماهان", "زاگرس", "کیش ایر", "قشم ایر", "آسمان", "کاسپین"];
  const internationalAirlines = ["IranAirtour", "QeshmAir", "AirArabia", "Mahan Airlines", "Flydubai", "Emirates"];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: 'rtl', fontFamily: 'Tahoma, Arial, sans-serif' }}>
      <Navbar />

      <main>
        {/* Hero Section with Overlapping Search Card - Alibaba.ir Style */}
        <section className="relative">
          {/* 1. Hero Background */}
          <div className="w-full h-[320px] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' }}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
            <div className="container mx-auto px-4 pt-16 relative z-10">
              <h1 className="text-right text-3xl md:text-4xl font-bold text-white mb-3">
                سفر با افغانی‌بابا
              </h1>
              <p className="text-right text-lg text-white/90">
                بهترین قیمت‌ها برای پرواز، هتل، تاکسی و رستوران
              </p>
            </div>
          </div>

          {/* 2. The Overlapping Search Card - The Alibaba.ir Secret */}
          <div className="container mx-auto px-4 -mt-20 relative z-20 mb-12">
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              {/* Sub-Tabs */}
              <div className="flex gap-8 border-b border-gray-100 mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-bold transition-all whitespace-nowrap ${
                      activeTab === tab
                        ? 'border-b-2 text-afghanibaba-primary'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    style={activeTab === tab ? { borderColor: '#059669' } : {}}
                  >
                    {tab}
                  </button>
                ))}
              </div>
                ))}
              </div>

              {/* Conditional Form Rendering */}
              {activeTab === "تاکسی" ? (
                <TaxiForm />
              ) : activeTab === "رستوران" ? (
                <RestaurantForm />
              ) : (
                <div>
                  {/* Pro Search Inputs Grid - Alibaba.ir Style */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-gray-200 rounded-xl overflow-hidden">
                    {/* Origin Input */}
                    <div className="p-4 flex flex-col gap-1 cursor-pointer hover:bg-gray-50 transition-all md:border-l border-b md:border-b-0 border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>مبدا</span>
                      </div>
                      <input
                        type="text"
                        placeholder="کابل"
                        className="text-base font-bold text-gray-800 border-none outline-none bg-transparent w-full text-right"
                        list="origin-options"
                      />
                      <datalist id="origin-options">
                        <option value="کابل" />
                        <option value="مزار شریف" />
                        <option value="هرات" />
                        <option value="قندهار" />
                      </datalist>
                    </div>

                    {/* Destination Input */}
                    <div className="p-4 flex flex-col gap-1 cursor-pointer hover:bg-gray-50 transition-all md:border-l border-b md:border-b-0 border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>مقصد</span>
                      </div>
                      <input
                        type="text"
                        placeholder="دوبی"
                        className="text-base font-bold text-gray-800 border-none outline-none bg-transparent w-full text-right"
                        list="dest-options"
                      />
                      <datalist id="dest-options">
                        <option value="دوبی" />
                        <option value="استانبول" />
                        <option value="دهلی" />
                        <option value="تهران" />
                      </datalist>
                    </div>

                    {/* Date Input */}
                    <div className="p-4 flex flex-col gap-1 cursor-pointer hover:bg-gray-50 transition-all md:border-l border-b md:border-b-0 border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>تاریخ</span>
                      </div>
                      <input
                        type="date"
                        className="text-base font-bold text-gray-800 border-none outline-none bg-transparent w-full text-right"
                      />
                    </div>

                    {/* Search Button */}
                    <div className="flex items-center">
                      <button
                        className="w-full h-full font-bold text-lg text-white transition-colors py-4 px-8"
                        style={{ backgroundColor: '#059669' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#064E3B')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#059669')}
                      >
                        جستجو
                      </button>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span>پشتیبانی ۲۴ ساعته</span>
                    <span>•</span>
                    <span>تضمین کمترین قیمت</span>
                    <span>•</span>
                    <span>استرداد آنلاین</span>
                    <span>استرداد آنلاین</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="mx-auto max-w-6xl px-4 py-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Link href="#" className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md">
              <img src={assetPath("/assets/about-2.jpg")} alt="سفرکارت" className="h-14 w-14 rounded-lg object-cover" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">سفرکارت (سازمانی)</h3>
                <p className="text-xs text-gray-500">مدیریت سفر سازمانی</p>
              </div>
            </Link>
            <Link href="#" className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md">
              <img src={assetPath("/assets/about-3.jpg")} alt="سفر اقساطی" className="h-14 w-14 rounded-lg object-cover" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">سفر اقساطی</h3>
                <p className="text-xs text-gray-500">سفر با پرداخت اقساطی</p>
              </div>
            </Link>
            <Link href="#" className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md">
              <img src={assetPath("/assets/about-4.jpg")} alt="ویزا" className="h-14 w-14 rounded-lg object-cover" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">ویزای سفر</h3>
                <p className="text-xs text-gray-500">دریافت ویزای کشورهای مختلف</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Popular Routes */}
        <section className="mx-auto max-w-6xl px-4 pb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">مسیرهای محبوب</h2>
            <Link href="/flights" className="text-sm font-semibold text-[#FDB713]">مشاهده همه</Link>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              { city: "کابل → دوبی", price: "از ۲۲۰ دلار" },
              { city: "کابل → استانبول", price: "از ۱۸۰ دلار" },
              { city: "کابل → دهلی", price: "از ۱۶۰ دلار" },
              { city: "کابل → تهران", price: "از ۱۴۰ دلار" },
              { city: "مزار شریف → کابل", price: "از ۲۵ دلار" },
              { city: "هرات → کابل", price: "از ۳۰ دلار" },
            ].map((route) => (
              <Link key={route.city} href="/flights" className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{route.city}</p>
                  <p className="text-xs text-gray-500">{route.price}</p>
                </div>
                <span className="text-xs font-semibold text-[#FDB713]">مشاهده</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Flight Info Section */}
        <section className="mx-auto max-w-6xl px-4 pb-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900 text-right">بلیط هواپیما | رزرو آنلاین</h2>
            <p className="mt-3 text-sm text-gray-600 text-right">
              افغانی‌بابا از سال‌ها پیش با هدف ساده کردن خرید آنلاین بلیط پرواز فعالیت خود را آغاز کرده است.
              امروز این پلتفرم به یکی از معتبرترین گزینه‌ها برای خرید بلیط پرواز داخلی و خارجی تبدیل شده است.
            </p>
            
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="text-right">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">فیلترهای جستجو - داخلی</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {domesticFilters.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
              <div className="text-right">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">فیلترهای جستجو - خارجی</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {internationalFilters.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 text-right">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">ایرلاین‌های داخلی</h3>
              <div className="flex flex-wrap gap-2">
                {domesticAirlines.map((airline) => (
                  <span key={airline} className="rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-600">{airline}</span>
                ))}
              </div>
            </div>

            <div className="mt-4 text-right">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">ایرلاین‌های خارجی</h3>
              <div className="flex flex-wrap gap-2">
                {internationalAirlines.map((airline) => (
                  <span key={airline} className="rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-600">{airline}</span>
                ))}
              </div>
            </div>

            <div className="mt-6 text-right">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">استرداد بلیط</h3>
              <p className="text-sm text-gray-600">
                در صورت تغییر برنامه سفر، می‌توانید بلیط خود را طبق قوانین استرداد کنسل کنید و مبلغ قابل بازگشت را در کوتاه‌ترین زمان دریافت کنید.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mx-auto max-w-6xl px-4 pb-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900 text-right">پرسش‌های شما</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-900 text-right">{faq.q}</p>
                  <p className="mt-2 text-xs text-gray-600 text-right">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="mx-auto max-w-6xl px-4 pb-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5 text-right">
              <h3 className="text-base font-semibold text-gray-900">رتبه یک سفر</h3>
              <p className="mt-1 text-sm text-gray-600">معتبرترین عرضه‌کننده محصولات گردشگری</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5 text-right">
              <h3 className="text-base font-semibold text-gray-900">همسفر هر سفر</h3>
              <p className="mt-1 text-sm text-gray-600">ارائه خدمات پرواز، اتوبوس، هتل و تور</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5 text-right">
              <h3 className="text-base font-semibold text-gray-900">پشتیبانی ۲۴ ساعته</h3>
              <p className="mt-1 text-sm text-gray-600">همراهی در تمام مراحل سفر</p>
            </div>
          </div>
        </section>

        {/* App & Corporate */}
        <section className="mx-auto max-w-6xl px-4 pb-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            <div className="rounded-2xl bg-[#101826] p-6 text-right text-white md:col-span-3">
              <p className="text-xs uppercase tracking-widest text-white/60">اپلیکیشن افغانی‌بابا</p>
              <h2 className="mt-2 text-2xl font-bold">سفرهای خود را از موبایل مدیریت کنید.</h2>
              <p className="mt-2 text-sm text-white/80">اعلان لحظه‌ای، مدیریت رزرو و دسترسی سریع به بلیط‌ها.</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-16 w-16 rounded-xl bg-white/10">
                  <img src={assetPath("/assets/logo-img.png")} alt="QR" className="h-full w-full object-cover" />
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-white/30 px-4 py-2 text-sm text-white">App Store</button>
                  <button className="rounded-lg border border-white/30 px-4 py-2 text-sm text-white">Google Play</button>
                  <button className="rounded-lg border border-white/30 px-4 py-2 text-sm text-white">لینک مستقیم</button>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-right md:col-span-2">
              <p className="text-xs uppercase tracking-widest text-gray-400">سازمانی</p>
              <h3 className="mt-2 text-xl font-bold text-gray-900">مدیریت سفر سازمانی با داشبورد حرفه‌ای.</h3>
              <p className="mt-2 text-sm text-gray-600">گزارش‌گیری، صورتحساب متمرکز و پشتیبانی اختصاصی.</p>
              <button className="mt-4 rounded-lg bg-[#FDB713] px-6 py-2 font-semibold text-black">درخواست دمو</button>
            </div>
          </div>
        </section>

        {/* Hotel Section */}
        <section className="mx-auto max-w-6xl px-4 pb-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900 text-right">رزرو هتل | اقامت در بهترین هتل‌ها</h2>
            <p className="mt-3 text-sm text-gray-600 text-right">
              افغانی‌بابا امکان رزرو آنلاین هتل در سراسر افغانستان و جهان را فراهم کرده است.
              از هتل‌های لوکس تا اقامتگاه‌های اقتصادی، بهترین گزینه‌ها را با قیمت مناسب رزرو کنید.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-4 text-right">
                <h3 className="text-sm font-semibold text-gray-900">تضمین کمترین قیمت</h3>
                <p className="mt-1 text-xs text-gray-600">بهترین قیمت رزرو هتل</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-right">
                <h3 className="text-sm font-semibold text-gray-900">انتخاب گسترده</h3>
                <p className="mt-1 text-xs text-gray-600">هزاران هتل در شهرهای مختلف</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-right">
                <h3 className="text-sm font-semibold text-gray-900">رزرو آسان</h3>
                <p className="mt-1 text-xs text-gray-600">ثبت‌نام در چند دقیقه</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bus Section */}
        <section className="mx-auto max-w-6xl px-4 pb-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900 text-right">بلیط اتوبوس | سفر زمینی</h2>
            <p className="mt-3 text-sm text-gray-600 text-right">
              افغانی‌بابا امکان رزرو آنلاین بلیط اتوبوس بین شهرهای افغانستان را فراهم کرده است.
              با انتخاب شرکت‌های معتبر حمل و نقل، سفری راحت و امن را تجربه کنید.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-4 text-right">
                <h3 className="text-sm font-semibold text-gray-900">انتخاب صندلی</h3>
                <p className="mt-1 text-xs text-gray-600">انتخاب دقیق صندلی مورد نظر</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-right">
                <h3 className="text-sm font-semibold text-gray-900">شرکت‌های معتبر</h3>
                <p className="mt-1 text-xs text-gray-600">بهترین شرکت‌های حمل و نقل</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-right">
                <h3 className="text-sm font-semibold text-gray-900">قیمت شفاف</h3>
                <p className="mt-1 text-xs text-gray-600">بدون هزینه پنهان</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tour Section */}
        <section className="mx-auto max-w-6xl px-4 pb-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900 text-right">تور | سفر به نقاط دیدنی افغانستان</h2>
            <p className="mt-3 text-sm text-gray-600 text-right">
              افغانی‌بابا بهترین تورهای داخلی افغانستان را با بهترین قیمت ارائه می‌دهد.
              از تور بامیان گرفته تا مزار شریف و هرات، بهترین تجربه سفر را با ما داشته باشید.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-4 text-right">
                <h3 className="text-sm font-semibold text-gray-900">تور بامیان</h3>
                <p className="mt-1 text-xs text-gray-600">بازدید از بت‌ها و دریاچه باستانی</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-right">
                <h3 className="text-sm font-semibold text-gray-900">تور مزار شریف</h3>
                <p className="mt-1 text-xs text-gray-600">زیارت آرامگاه حکیم ناصر خسرو</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-right">
                <h3 className="text-sm font-semibold text-gray-900">تور هرات</h3>
                <p className="mt-1 text-xs text-gray-600">بازدید از مسجد و موزه‌های تاریخی</p>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <section className="mx-auto max-w-6xl px-4 pb-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900 text-right">بیمه مسافرتی | سفری امن</h2>
            <p className="mt-3 text-sm text-gray-600 text-right">
              افغانی‌بابا امکان خرید آنلاین بیمه مسافرتی را برای تمام مقاصد فراهم کرده است.
              با خرید بیمه، سفری بدون نگرانی را تجربه کنید.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-4 text-right">
                <h3 className="text-sm font-semibold text-gray-900">پوشش پزشکی</h3>
                <p className="mt-1 text-xs text-gray-600">تا ۲۰۰ هزار دلار</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-right">
                <h3 className="text-sm font-semibold text-gray-900">بازگشت اضطراری</h3>
                <p className="mt-1 text-xs text-gray-600">هزینه‌های فوری</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-right">
                <h3 className="text-sm font-semibold text-gray-900">گم شدن چمدان</h3>
                <p className="mt-1 text-xs text-gray-600">جبران خسارت</p>
              </div>
            </div>
          </div>
        </section>

        {/* Links Section */}
        <section className="mx-auto max-w-6xl px-4 pb-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="text-right">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">افغانی‌بابا</h3>
              <ul className="text-xs text-gray-600 space-y-2">
                <li><Link href="#" className="hover:text-[#FDB713]">درباره ما</Link></li>
                <li><Link href="#" className="hover:text-[#FDB713]">تماس با ما</Link></li>
                <li><Link href="#" className="hover:text-[#FDB713]">چرا افغانی‌بابا</Link></li>
                <li><Link href="#" className="hover:text-[#FDB713]">بیمه مسافرتی</Link></li>
              </ul>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">خدمات مشتریان</h3>
              <ul className="text-xs text-gray-600 space-y-2">
                <li><Link href="#" className="hover:text-[#FDB713]">مرکز پشتیبانی آنلاین</Link></li>
                <li><Link href="#" className="hover:text-[#FDB713]">راهنمای خرید</Link></li>
                <li><Link href="#" className="hover:text-[#FDB713]">راهنمای استرداد</Link></li>
                <li><Link href="#" className="hover:text-[#FDB713]">قوانین و مقررات</Link></li>
              </ul>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">اطلاعات تکمیلی</h3>
              <ul className="text-xs text-gray-600 space-y-2">
                <li><Link href="#" className="hover:text-[#FDB713]">فروش سازمانی</Link></li>
                <li><Link href="#" className="hover:text-[#FDB713]">پنل آژانسی</Link></li>
                <li><Link href="#" className="hover:text-[#FDB713]">فرصت‌های شغلی</Link></li>
                <li><Link href="#" className="hover:text-[#FDB713]">نقشه سایت</Link></li>
              </ul>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">تماس</h3>
              <ul className="text-xs text-gray-600 space-y-2">
                <li>info@afghanibaba.com</li>
                <li>کابل، افغانستان</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
