"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Smartphone, Star, Package, RefreshCw, Headphones, Newspaper, ChevronDown } from "lucide-react";

const stats = [
    { icon: "📲", number: "۵۰۰,۰۰۰+", label: "تعداد نصب‌ها" },
    { icon: "⭐", number: "۹۴٪", label: "رضایت کاربران" },
    { icon: "🎫", number: "۱,۰۰۰,۰۰۰+", label: "سفارش موفق" },
];

const features = [
    {
        title: "تمام سفر، در یک اپ",
        desc: "پوشش کامل پروازها، اتوبوس، تورها، هتل‌ها و اقامتگاه‌ها از یک جا",
        emoji: "✈️",
        bg: "from-orange-50 to-amber-50",
        border: "border-orange-100",
    },
    {
        title: "مشاهده ارزان‌ترین زمان سفر",
        desc: "نمایش ارزان‌ترین بلیط‌های روزهای قبل و بعد با تقویم قیمت افغانی‌بابا",
        emoji: "📅",
        bg: "from-blue-50 to-indigo-50",
        border: "border-blue-100",
    },
    {
        title: "مقایسه روش‌های سفر",
        desc: "مقایسه قیمت بلیط هواپیما، اتوبوس و تور برای مقصد دلخواه شما",
        emoji: "🔍",
        bg: "from-purple-50 to-pink-50",
        border: "border-purple-100",
    },
    {
        title: "خرید آگاهانه، سفر لذت‌بخش",
        desc: "مشاهده اطلاعات کامل تکت‌ها، تورها و تصاویر هتل قبل از خرید",
        emoji: "🏨",
        bg: "from-green-50 to-emerald-50",
        border: "border-green-100",
    },
];

const extras = [
    { icon: <RefreshCw className="w-6 h-6" />, title: "استرداد آنلاین آسان", desc: "سفر با خیال آسوده", color: "text-blue-500 bg-blue-50" },
    { icon: <Newspaper className="w-6 h-6" />, title: "راهنمای سفر", desc: "پوشش داغ‌ترین اخبار سفر", color: "text-orange-500 bg-orange-50" },
    { icon: <Headphones className="w-6 h-6" />, title: "پشتیبانی ۲۴ ساعته", desc: "پاسخگویی در تمام ساعات سال", color: "text-green-500 bg-green-50" },
];

export default function AppDownloadPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-['Vazirmatn']" dir="rtl">
            <Navbar />

            {/* Hero */}
            <section className="bg-gradient-to-bl from-slate-900 via-slate-800 to-orange-900 text-white pt-16 pb-0 px-4 overflow-hidden">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
                        {/* Left Text */}
                        <div className="pb-12">
                            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-2 text-sm font-medium mb-6">
                                <Smartphone className="w-4 h-4 text-orange-400" />
                                <span>اپلیکیشن افغانی‌بابا</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
                                کاربردی‌ترین<br />
                                <span className="text-orange-400">اپ سفر</span>
                            </h1>
                            <p className="text-white/75 text-lg mb-8">
                                تمام خدمات سفر در کف دستت. از هر جای افغانستان، هر زمانی سفر برنامه‌ریزی کن.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                {stats.map(s => (
                                    <div key={s.label} className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                                        <p className="text-2xl mb-1">{s.icon}</p>
                                        <p className="font-black text-lg text-orange-300">{s.number}</p>
                                        <p className="text-white/60 text-xs">{s.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Download Buttons */}
                            <div className="space-y-3">
                                <p className="text-white/60 text-sm font-bold">دانلود اپلیکیشن:</p>
                                <div className="flex flex-wrap gap-3">
                                    <a href="#" className="flex items-center gap-3 bg-white text-gray-900 font-bold px-5 py-3 rounded-2xl hover:bg-orange-50 transition shadow-lg">
                                        <span className="text-2xl">🤖</span>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400">دانلود برای</p>
                                            <p className="font-black">Android</p>
                                        </div>
                                    </a>
                                    <a href="#" className="flex items-center gap-3 bg-white text-gray-900 font-bold px-5 py-3 rounded-2xl hover:bg-orange-50 transition shadow-lg">
                                        <span className="text-2xl">🍎</span>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400">دانلود برای</p>
                                            <p className="font-black">iOS</p>
                                        </div>
                                    </a>
                                    <a href="#" className="flex items-center gap-3 bg-orange-500 text-white font-bold px-5 py-3 rounded-2xl hover:bg-orange-400 transition shadow-lg">
                                        <span className="text-2xl">🌐</span>
                                        <div className="text-right">
                                            <p className="text-xs text-white/70">استفاده از</p>
                                            <p className="font-black">وب اپ</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right: Phone Mockup */}
                        <div className="flex justify-center md:justify-end">
                            <div className="relative">
                                {/* Phone Frame */}
                                <div className="w-52 h-96 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] border-4 border-gray-700 shadow-2xl shadow-black/50 p-3 relative overflow-hidden">
                                    {/* Screen */}
                                    <div className="w-full h-full bg-gradient-to-b from-orange-500 to-orange-700 rounded-[2.5rem] overflow-hidden flex flex-col">
                                        {/* Status bar */}
                                        <div className="p-3 flex justify-between items-center">
                                            <span className="text-white/80 text-xs font-bold">09:41</span>
                                            <div className="flex gap-1">
                                                <div className="w-4 h-2 bg-white/60 rounded-sm" />
                                                <div className="w-2 h-2 bg-white/80 rounded-full" />
                                            </div>
                                        </div>
                                        {/* App Logo */}
                                        <div className="flex-1 flex flex-col items-center justify-center text-white">
                                            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-3 shadow-lg">
                                                <span className="text-3xl">✈️</span>
                                            </div>
                                            <p className="font-black text-lg">Afghan Baba</p>
                                            <p className="text-white/70 text-xs">سفر آسان‌تر</p>
                                        </div>
                                        {/* Bottom Nav */}
                                        <div className="bg-white/20 backdrop-blur mx-3 mb-3 rounded-2xl p-2 flex justify-around">
                                            {["✈️", "🚌", "🏨", "🗺️"].map(icon => (
                                                <div key={icon} className="w-8 h-8 flex items-center justify-center text-base">{icon}</div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Notch */}
                                    <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-900 rounded-full" />
                                </div>
                                {/* Floating badges */}
                                <div className="absolute -right-4 top-16 bg-white rounded-2xl shadow-xl px-3 py-2 text-xs font-black text-gray-800 flex items-center gap-2">
                                    <Star className="w-4 h-4 text-amber-500" fill="currentColor" />
                                    <span>4.8 امتیاز</span>
                                </div>
                                <div className="absolute -left-4 bottom-20 bg-orange-500 rounded-2xl shadow-xl px-3 py-2 text-xs font-black text-white flex items-center gap-2">
                                    <Package className="w-4 h-4" />
                                    <span>۵۰۰ هزار+ نصب</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 py-14 space-y-14">

                {/* QR Code Section */}
                <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
                    <h2 className="text-xl font-black text-gray-900 mb-2">اسکن کنید و دانلود کنید</h2>
                    <p className="text-gray-500 text-sm mb-6">دوربین گوشی خود را روی کد QR بگیرید</p>
                    <div className="flex items-center justify-center gap-8 flex-wrap">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            {/* QR Code Placeholder */}
                            <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center">
                                <div className="grid grid-cols-3 gap-1">
                                    {Array.from({ length: 9 }).map((_, i) => (
                                        <div key={i} className={`w-8 h-8 rounded-sm ${[0, 2, 6, 8, 4].includes(i) ? "bg-gray-800" : "bg-gray-100"}`} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 font-bold mt-3">Android & iOS</p>
                        </div>
                        <div className="text-right space-y-3 max-w-xs">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-black text-sm shrink-0">۱</div>
                                <p className="text-sm text-gray-600">دوربین گوشی خود را باز کنید</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-black text-sm shrink-0">۲</div>
                                <p className="text-sm text-gray-600">کد QR را اسکن کنید</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black text-sm shrink-0">۳</div>
                                <p className="text-sm text-gray-600">اپلیکیشن را نصب کنید و لذت ببرید!</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section>
                    <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">همه سفر، در یک اپ</h2>
                    <p className="text-gray-500 text-center mb-8">چرا افغانی‌بابا بهترین همراه سفر شماست?</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {features.map(f => (
                            <div key={f.title} className={`bg-gradient-to-br ${f.bg} border ${f.border} rounded-3xl p-6 flex items-start gap-4`}>
                                <span className="text-4xl shrink-0">{f.emoji}</span>
                                <div>
                                    <h3 className="font-black text-gray-900 mb-2">{f.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Extra Features */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {extras.map(e => (
                        <div key={e.title} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 text-center">
                            <div className={`${e.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                                {e.icon}
                            </div>
                            <h3 className="font-black text-gray-900 mb-1">{e.title}</h3>
                            <p className="text-gray-500 text-sm">{e.desc}</p>
                        </div>
                    ))}
                </section>

                {/* Final CTA */}
                <section className="bg-gradient-to-bl from-orange-500 to-amber-600 rounded-3xl p-10 text-white text-center">
                    <h2 className="text-3xl font-black mb-3">همین حالا دانلود کن!</h2>
                    <p className="text-white/80 mb-8">بیش از ۵۰۰,۰۰۰ مسافر قبلاً هوشمندانه انتخاب کرده‌اند.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="#" className="flex items-center gap-3 bg-white text-gray-900 font-bold px-6 py-3 rounded-2xl hover:bg-orange-50 transition shadow-lg">
                            <span className="text-2xl">🤖</span>
                            <span>دانلود Android</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 bg-white text-gray-900 font-bold px-6 py-3 rounded-2xl hover:bg-orange-50 transition shadow-lg">
                            <span className="text-2xl">🍎</span>
                            <span>دانلود iOS</span>
                        </a>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}
