"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, Globe, Clock, DollarSign, ChevronDown, ChevronUp, Phone } from "lucide-react";

const visaList = [
  {
    id: "uae-tourist",
    country: "امارات متحده عربی (دبی)",
    countryEn: "UAE - Dubai",
    flag: "🇦🇪",
    type: "ویزای توریستی",
    processingTime: "فوری ۱ روز کاری - عادی تا ۳ روز",
    price: "۳۲۰ درهم",
    currency: "درهم",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80",
    popular: true,
  },
  {
    id: "uae-urgent",
    country: "امارات متحده عربی (دبی) - فوری",
    countryEn: "UAE - Dubai Urgent",
    flag: "🇦🇪",
    type: "ویزای توریستی فوری",
    processingTime: "کمتر از ۵ ساعت",
    price: "۳۷۰ درهم",
    currency: "درهم",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80",
    popular: true,
  },
  {
    id: "turkey",
    country: "ترکیه",
    countryEn: "Turkey",
    flag: "🇹🇷",
    type: "ویزای توریستی",
    processingTime: "۳ تا ۵ روز کاری",
    price: "$ ۸۰",
    currency: "دلار",
    image: "https://images.unsplash.com/photo-1598965402089-897ce52e8355?w=400&q=80",
    popular: true,
  },
  {
    id: "azerbaijan",
    country: "آذربایجان",
    countryEn: "Azerbaijan",
    flag: "🇦🇿",
    type: "ویزا",
    processingTime: "۷ تا ۱۰ روز کاری",
    price: "$ ۳۵",
    currency: "دلار",
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=400&q=80",
    popular: false,
  },
  {
    id: "thailand",
    country: "تایلند",
    countryEn: "Thailand",
    flag: "🇹🇭",
    type: "ویزای توریستی",
    processingTime: "۴ تا ۷ روز کاری",
    price: "€ ۵۰",
    currency: "یورو",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80",
    popular: false,
  },
  {
    id: "china",
    country: "چین",
    countryEn: "China",
    flag: "🇨🇳",
    type: "ویزا",
    processingTime: "۷ تا ۱۰ روز کاری",
    price: "$ ۱۴۰",
    currency: "دلار",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80",
    popular: false,
  },
  {
    id: "russia",
    country: "روسیه",
    countryEn: "Russia",
    flag: "🇷🇺",
    type: "ویزای الکترونیک",
    processingTime: "۷ تا ۱۰ روز کاری",
    price: "$ ۱۰۰",
    currency: "دلار",
    image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=400&q=80",
    popular: false,
  },
  {
    id: "india",
    country: "هند",
    countryEn: "India",
    flag: "🇮🇳",
    type: "ویزای توریستی",
    processingTime: "۱۰ تا ۱۵ روز کاری",
    price: "$ ۱۵۵",
    currency: "دلار",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80",
    popular: false,
  },
  {
    id: "schengen",
    country: "اتحادیه اروپا (شنگن)",
    countryEn: "Schengen",
    flag: "🇪🇺",
    type: "ویزای شنگن",
    processingTime: "۲۱ روز کاری",
    price: "€ ۱۱۰",
    currency: "یورو",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&q=80",
    popular: false,
  },
  {
    id: "germany",
    country: "آلمان",
    countryEn: "Germany",
    flag: "🇩🇪",
    type: "ویزا",
    processingTime: "۲۱ روز کاری",
    price: "€ ۱۱۰",
    currency: "یورو",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&q=80",
    popular: false,
  },
  {
    id: "canada",
    country: "کانادا",
    countryEn: "Canada",
    flag: "🇨🇦",
    type: "ویزای توریستی",
    processingTime: "۵۰ تا ۶۰ روز کاری",
    price: "$ ۴۳۰",
    currency: "دلار",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=400&q=80",
    popular: false,
  },
  {
    id: "malaysia",
    country: "مالزی",
    countryEn: "Malaysia",
    flag: "🇲🇾",
    type: "ویزای توریستی",
    processingTime: "۳ تا ۵ روز کاری",
    price: "$ ۶۰",
    currency: "دلار",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&q=80",
    popular: true,
  },
];

const faqs = [
  {
    q: "ویزا چیست؟",
    a: "ویزا یک مجوز رسمی است که توسط کشور مقصد صادر می‌شود و به دارنده اجازه می‌دهد وارد آن کشور شود. بدون ویزا، اکثر مرزها برای پاسپورت افغانستان بسته است."
  },
  {
    q: "هزینه ویزا چقدر است؟",
    a: "هزینه ویزا بستگی به کشور مقصد، نوع ویزا و مدت اقامت دارد. قیمت‌های نشان داده شده، قیمت پایه هر نفر می‌باشد. برای مشاوره رایگان با شماره ما تماس بگیرید."
  },
  {
    q: "چه مدارکی برای ویزا لازم است؟",
    a: "مدارک اصلی شامل پاسپورت معتبر (حداقل ۶ ماه اعتبار)، کارت ملی/تذکره، گواهی حساب بانکی، بیمه سفر، و مدارک اثبات وضعیت مالی می‌باشد. مدارک اضافی بسته به کشور مقصد متفاوت است."
  },
  {
    q: "آیا می‌توان ویزا را آنلاین دریافت کرد؟",
    a: "بله، برخی کشورها مانند UAE، ترکیه و آذربایجان ویزای آنلاین (E-Visa) ارائه می‌دهند. افغانی‌بابا تمام فرآیند را برای شما انجام می‌دهد."
  },
  {
    q: "در صورت رد شدن ویزا، آیا می‌توان دوباره درخواست داد؟",
    a: "بله، پس از رفع نقایص مدارک می‌توانید مجدداً درخواست دهید. تیم ما برای موفقیت درخواست شما آماده کمک است."
  },
  {
    q: "مدت انتظار دریافت ویزا چقدر است؟",
    a: "زمان پردازش از ۵ ساعت (ویزای فوری دبی) تا ۶۰ روز (کانادا) متفاوت است. زمان تقریبی هر ویزا در کارت مشخص است."
  },
];

export default function VisaPage() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered = visaList.filter(v =>
    v.country.includes(search) || v.countryEn.toLowerCase().includes(search.toLowerCase()) || v.type.includes(search)
  );

  const popular = filtered.filter(v => v.popular);
  const others = filtered.filter(v => !v.popular);

  return (
    <div className="min-h-screen bg-gray-50 font-['Vazirmatn']" dir="rtl">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-bl from-orange-500 via-orange-600 to-amber-700 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            <span>خدمات ویزای افغانی‌بابا</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">ویزای سفر</h1>
          <p className="text-white/85 text-lg max-w-2xl mx-auto mb-8">
            درخواست ویزا برای پاسپورت افغانستان را به ما بسپارید. سریع، مطمئن و بدون دردسر.
          </p>

          {/* Search Box */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="جستجوی کشور مقصد... (مثال: دبی، ترکیه)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pr-12 pl-4 py-4 rounded-2xl text-gray-900 placeholder:text-gray-400 shadow-xl outline-none text-right"
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Popular Visas */}
        {popular.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">⭐</span>
              <h2 className="text-2xl font-black text-gray-900">ویزاهای پرطرفدار</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {popular.map(visa => (
                <VisaCard key={visa.id} visa={visa} />
              ))}
            </div>
          </section>
        )}

        {/* All Visas */}
        {others.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-black text-gray-900 mb-6">سایر کشورها</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {others.map(visa => (
                <VisaCard key={visa.id} visa={visa} />
              ))}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-gray-500 text-lg">نتیجه‌ای یافت نشد. کشور دیگری را جستجو کنید.</p>
          </div>
        )}

        {/* Info Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
            <div className="w-12 h-12 bg-orange-500 text-white rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">پردازش سریع</h3>
            <p className="text-gray-600 text-sm">ویزاهای اکثر کشورها در کمترین زمان ممکن پردازش می‌شوند. ویزای فوری دبی در کمتر از ۵ ساعت!</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">تجربه و تخصص</h3>
            <p className="text-gray-600 text-sm">تیم متخصص افغانی‌بابا با سال‌ها تجربه در ویزای پاسپورت افغانستان به شما کمک می‌کند.</p>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
            <div className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">قیمت شفاف</h3>
            <p className="text-gray-600 text-sm">هیچ هزینه پنهانی وجود ندارد. تمام هزینه‌ها از ابتدا مشخص است.</p>
          </div>
        </section>

        {/* What is a Visa Section */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-4">ویزا چیست؟</h2>
          <div className="prose prose-gray max-w-none text-right space-y-4 text-gray-700">
            <p>
              اگر قصد سفر به خارج از کشور را دارید، حتماً باید با ویزا سروکار داشته باشید. ویزا نوعی مجوز است — مجوز سفر به کشورهای خارجی. هر مسافری که می‌خواهد به کشور دیگری سفر کند، باید ابتدا اجازه ورود از آن کشور را دریافت کند.
            </p>
            <p>
              به زبان ساده، ویزا مثل اجازه ورود به خانه کسی است. درست مانند اینکه برای ورود به خانه کسی باید اجازه بگیرید، برای ورود به قلمروی یک کشور هم به اجازه رسمی — یعنی ویزا — نیاز دارید. این مجوز را کنسولگری یا سفارت کشور مقصد صادر می‌کند.
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">مدارک لازم برای ویزا</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>پاسپورت معتبر</strong> — با حداقل ۶ ماه اعتبار</li>
              <li><strong>تذکره / کارت ملی</strong> — مدارک هویتی</li>
              <li><strong>گواهی مالی</strong> — اثبات توانایی مالی مسافر</li>
              <li><strong>بیمه مسافرتی</strong> — در اکثر کشورها الزامی است</li>
              <li><strong>عکس پرتره</strong> — طبق استاندارد سفارت</li>
            </ul>

            <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">انواع ویزا</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: "ویزای توریستی", desc: "برای سفرهای کوتاه‌مدت تفریحی" },
                { name: "ویزای ترانزیت", desc: "توقف کوتاه در کشور واسط" },
                { name: "ویزای کاری", desc: "برای سفر به منظور کار" },
                { name: "ویزای پزشکی", desc: "برای درمان پزشکی" },
                { name: "ویزای تحصیلی", desc: "برای تحصیل در خارج" },
                { name: "ویزای الکترونیک (E-Visa)", desc: "درخواست و دریافت آنلاین" },
              ].map(v => (
                <div key={v.name} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-orange-500 font-bold mt-0.5">◉</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{v.name}</p>
                    <p className="text-gray-500 text-xs">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Banner */}
        <section className="bg-gradient-to-bl from-orange-500 to-amber-600 rounded-3xl p-8 text-white text-center mb-12">
          <h2 className="text-2xl font-black mb-2">نیاز به مشاوره رایگان دارید؟</h2>
          <p className="text-white/80 mb-6">کارشناسان افغانی‌بابا آماده پاسخگویی به سوالات شما هستند</p>
          <a
            href="tel:+93700000000"
            className="inline-flex items-center gap-3 bg-white text-orange-600 font-black px-8 py-4 rounded-2xl hover:bg-orange-50 transition shadow-xl"
          >
            <Phone className="w-5 h-5" />
            ۰۷۰۰ - ۰۰۰۰۰۰۰
          </a>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">سوالات متداول</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-right font-bold text-gray-900 hover:bg-gray-50 transition"
                >
                  <span>{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-orange-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

function VisaCard({ visa }: { visa: typeof visaList[0] }) {
  return (
    <Link href={`/visa/${visa.id}`} className="block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={visa.image}
          alt={visa.country}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {visa.popular && (
          <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            پرطرفدار
          </span>
        )}
        <div className="absolute bottom-3 right-3 text-white">
          <p className="text-2xl">{visa.flag}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 mb-1 text-base">{visa.country}</h3>
        <p className="text-orange-600 text-xs font-semibold mb-3">{visa.type}</p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400 shrink-0" />
            <span>{visa.processingTime}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-50">
            <span className="text-xs text-gray-400">شروع قیمت از:</span>
            <span className="font-black text-gray-900 text-base">{visa.price} <span className="text-xs font-normal text-gray-400">/ نفر</span></span>
          </div>
        </div>
      </div>
    </Link>
  );
}
