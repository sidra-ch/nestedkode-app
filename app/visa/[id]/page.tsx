"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Clock, CheckCircle, FileText, Phone, Globe, AlertCircle } from "lucide-react";

const visaData: Record<string, {
    country: string; flag: string; type: string; processingTime: string;
    price: string; currency: string; image: string;
    requirements: string[]; steps: string[]; description: string;
}> = {
    "uae-tourist": {
        country: "امارات متحده عربی (دبی)",
        flag: "🇦🇪",
        type: "ویزای توریستی",
        processingTime: "فوری ۱ روز کاری - عادی تا ۳ روز",
        price: "۳۲۰ درهم",
        currency: "درهم",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        description: "ویزای توریستی دبی برای بازدید از جاذبه‌های گردشگری امارات متحده عربی صادر می‌شود. این ویزا اجازه اقامت ۳۰ روزه را می‌دهد.",
        requirements: ["پاسپورت معتبر با حداقل ۶ ماه اعتبار", "عکس پرتره رنگی ۴×۳", "صفحه اول پاسپورت (اسکن)", "گواهی حساب بانکی ۳ ماهه", "بلیط رفت و برگشت"],
        steps: ["ارسال مدارک به افغانی‌بابا", "بررسی مدارک توسط تیم ما", "ارسال درخواست به سفارت", "دریافت ویزا و ارسال به شما"],
    },
    "uae-urgent": {
        country: "امارات متحده عربی (دبی) - فوری",
        flag: "🇦🇪",
        type: "ویزای توریستی فوری",
        processingTime: "کمتر از ۵ ساعت",
        price: "۳۷۰ درهم",
        currency: "درهم",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        description: "ویزای فوری دبی برای مسافرانی که زمان کافی ندارند طراحی شده است. در کمتر از ۵ ساعت ویزای خود را دریافت کنید.",
        requirements: ["پاسپورت معتبر با حداقل ۶ ماه اعتبار", "عکس پرتره رنگی ۴×۳", "اسکن پاسپورت", "گواهی حساب بانکی"],
        steps: ["ارسال فوری مدارک", "پردازش اضطراری", "دریافت ویزا ظرف ۵ ساعت"],
    },
    "turkey": {
        country: "ترکیه",
        flag: "🇹🇷",
        type: "ویزای توریستی",
        processingTime: "۳ تا ۵ روز کاری",
        price: "$ ۸۰",
        currency: "دلار",
        image: "https://images.unsplash.com/photo-1598965402089-897ce52e8355?w=800&q=80",
        description: "ویزای توریستی ترکیه برای بازدید از جاذبه‌های تاریخی و طبیعی این کشور صادر می‌شود.",
        requirements: ["پاسپورت معتبر با حداقل ۶ ماه اعتبار", "عکس رنگی", "اسکن پاسپورت", "بیمه مسافرتی", "رزرو هتل"],
        steps: ["ارسال مدارک", "بررسی توسط سفارت", "دریافت ویزا", "سفر به ترکیه"],
    },
    "malaysia": {
        country: "مالزی",
        flag: "🇲🇾",
        type: "ویزای توریستی",
        processingTime: "۳ تا ۵ روز کاری",
        price: "$ ۶۰",
        currency: "دلار",
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
        description: "مالزی یکی از محبوب‌ترین مقاصد توریستی آسیاست. ویزای مالزی نسبتاً آسان دریافت می‌شود.",
        requirements: ["پاسپورت معتبر", "عکس رنگی", "اسکن پاسپورت", "بیمه مسافرتی", "گواهی حساب بانکی"],
        steps: ["ارسال مدارک", "پردازش درخواست", "دریافت ویزای الکترونیک"],
    },
    "schengen": {
        country: "اتحادیه اروپا (شنگن)",
        flag: "🇪🇺",
        type: "ویزای شنگن",
        processingTime: "۲۱ روز کاری",
        price: "€ ۱۱۰",
        currency: "یورو",
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
        description: "ویزای شنگن به شما اجازه ورود به ۲۷ کشور اروپایی را می‌دهد. این ویزا یکی از چالش‌برانگیزترین ویزاها برای پاسپورت افغانستان است.",
        requirements: ["پاسپورت معتبر با حداقل ۶ ماه اعتبار", "بیمه مسافرتی (حداقل ۳۰,۰۰۰ یورو)", "گواهی اثبات مالی قوی", "دعوتنامه یا رزرو هتل", "بلیط رفت و برگشت", "اثبات اشتغال/تحصیل"],
        steps: ["جمع‌آوری کامل مدارک", "ثبت نوبت سفارت", "مراجعه حضوری به سفارت", "انتظار تا ۲۱ روز", "دریافت ویزا"],
    },
};

export default function VisaDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const visa = visaData[id];

    const [form, setForm] = useState({ name: "", phone: "", email: "", passengers: "1", note: "" });
    const [submitted, setSubmitted] = useState(false);

    if (!visa) {
        return (
            <div className="min-h-screen bg-gray-50 font-['Vazirmatn']" dir="rtl">
                <Navbar />
                <div className="max-w-3xl mx-auto px-4 py-24 text-center">
                    <p className="text-6xl mb-6">🌍</p>
                    <h1 className="text-3xl font-black text-gray-900 mb-4">ویزا پیدا نشد</h1>
                    <p className="text-gray-500 mb-8">این ویزا در سیستم ما موجود نیست.</p>
                    <Link href="/visa" className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition">
                        <ArrowRight className="w-4 h-4" />
                        بازگشت به لیست ویزاها
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-['Vazirmatn']" dir="rtl">
            <Navbar />

            {/* Hero Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                <img src={visa.image} alt={visa.country} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-6 right-6 text-white">
                    <Link href="/visa" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-3 transition">
                        <ArrowRight className="w-4 h-4" />
                        بازگشت به لیست ویزاها
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className="text-5xl">{visa.flag}</span>
                        <div>
                            <h1 className="text-3xl font-black">{visa.country}</h1>
                            <p className="text-white/80">{visa.type}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Quick Info Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-2 text-orange-500 mb-2">
                                    <Clock className="w-5 h-5" />
                                    <span className="text-sm font-bold">زمان پردازش</span>
                                </div>
                                <p className="font-bold text-gray-900">{visa.processingTime}</p>
                            </div>
                            <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">
                                <div className="flex items-center gap-2 text-orange-600 mb-2">
                                    <Globe className="w-5 h-5" />
                                    <span className="text-sm font-bold">شروع قیمت</span>
                                </div>
                                <p className="font-black text-2xl text-orange-700">{visa.price}</p>
                                <p className="text-orange-500 text-xs">به ازای هر نفر</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-black text-gray-900 mb-3">درباره این ویزا</h2>
                            <p className="text-gray-600 leading-relaxed">{visa.description}</p>
                        </div>

                        {/* Requirements */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <FileText className="w-5 h-5 text-blue-600" />
                                <h2 className="text-xl font-black text-gray-900">مدارک لازم</h2>
                            </div>
                            <ul className="space-y-3">
                                {visa.requirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Steps */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-black text-gray-900 mb-4">مراحل دریافت ویزا</h2>
                            <div className="space-y-3">
                                {visa.steps.map((step, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-black text-sm shrink-0">
                                            {i + 1}
                                        </div>
                                        <p className="text-gray-700">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Notice */}
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-amber-700 text-sm">
                                قیمت‌های نمایش داده شده قیمت پایه هستند و ممکن است بسته به شرایط تغییر کنند. برای اطلاعات دقیق با کارشناسان ما تماس بگیرید.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar - Application Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
                            {submitted ? (
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h3 className="font-black text-gray-900 text-xl mb-2">درخواست ثبت شد!</h3>
                                    <p className="text-gray-500 text-sm mb-4">کارشناسان ما در اسرع وقت با شما تماس می‌گیرند.</p>
                                    <Link href="/visa" className="text-orange-500 font-bold text-sm hover:underline">
                                        مشاهده سایر ویزاها
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <h3 className="font-black text-gray-900 text-xl mb-1">درخواست این ویزا</h3>
                                    <p className="text-gray-400 text-xs mb-5">فرم زیر را پر کنید، با شما تماس می‌گیریم</p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">نام کامل *</label>
                                            <input
                                                required
                                                value={form.name}
                                                onChange={e => setForm({ ...form, name: e.target.value })}
                                                placeholder="نام و نام خانوادگی"
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">شماره تماس *</label>
                                            <input
                                                required
                                                type="tel"
                                                value={form.phone}
                                                onChange={e => setForm({ ...form, phone: e.target.value })}
                                                placeholder="07xxxxxxx"
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition text-left"
                                                dir="ltr"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">تعداد مسافر</label>
                                            <select
                                                value={form.passengers}
                                                onChange={e => setForm({ ...form, passengers: e.target.value })}
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition"
                                            >
                                                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} نفر</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">توضیحات (اختیاری)</label>
                                            <textarea
                                                value={form.note}
                                                onChange={e => setForm({ ...form, note: e.target.value })}
                                                placeholder="توضیحات بیشتر..."
                                                rows={3}
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl transition shadow-lg shadow-orange-100"
                                        >
                                            ثبت درخواست رایگان
                                        </button>
                                    </form>

                                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-gray-500">
                                        <Phone className="w-4 h-4" />
                                        <a href="tel:+93700000000" className="text-sm font-bold hover:text-orange-500 transition">
                                            ۰۷۰۰ - ۰۰۰۰۰۰۰
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
