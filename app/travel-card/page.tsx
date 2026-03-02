"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    Gift, Users, Briefcase, HandshakeIcon, Star,
    ChevronDown, ChevronUp, CheckCircle, Building, Phone, Mail
} from "lucide-react";

const recipientGroups = [
    {
        icon: <Users className="w-8 h-8" />,
        title: "همکاران شما",
        color: "bg-blue-50 border-blue-100 text-blue-600",
        iconBg: "bg-blue-100",
        items: ["تقدیر از عملکرد و افتخارات", "هدایای عید نوروز و مناسبت‌های ملی", "جوایز تولد، ازدواج و...", "پاداش‌های سازمانی"],
    },
    {
        icon: <Star className="w-8 h-8" />,
        title: "مشتریان شما",
        color: "bg-orange-50 border-orange-100 text-orange-600",
        iconBg: "bg-orange-100",
        items: ["پاداش‌های باشگاه مشتریان", "هدایای موضوعی و مناسبتی", "جوایز مسابقات و جشنواره‌ها", "ترویج فروش و وفاداری"],
    },
    {
        icon: <Briefcase className="w-8 h-8" />,
        title: "شرکای تجاری شما",
        color: "bg-purple-50 border-purple-100 text-purple-600",
        iconBg: "bg-purple-100",
        items: ["هدایای سازمانی مناسبتی", "قدردانی و تشکر", "مسئولیت اجتماعی", "توسعه روابط تجاری"],
    },
];

const specialConditions = [
    {
        emoji: "🖨️",
        title: "چاپ اختصاصی کارت",
        desc: "تولید و چاپ انحصاری کارت‌های سفر با مقدار و اعتبار دلخواه شما",
    },
    {
        emoji: "🏢",
        title: "لوگوی سازمان شما",
        desc: "تولید و چاپ انحصاری کارت‌های سفر با لوگوی سازمان شما",
    },
    {
        emoji: "📊",
        title: "فایل اکسل کدها",
        desc: "ارائه کد کارت سفر در قالب فایل اکسل برای استفاده در سیستم‌های اتوماسیون سازمانی",
    },
];

const faqs = [
    { q: "کارت سفر افغانی‌بابا در چه خدماتی قابل استفاده است؟", a: "کارت سفر افغانی‌بابا برای خرید بلیط هواپیما، اتوبوس، رزرو هتل و تور در تمام صفحات افغانی‌بابا قابل استفاده است." },
    { q: "ویژگی‌های منحصربه‌فرد کارت سفر چیست؟", a: "قابلیت هدیه‌دادن، شخصی‌سازی با لوگوی سازمان، عدم انقضا، و قابل استفاده برای تمام خدمات سفر." },
    { q: "کارت سفر برای هدیه‌دادن به چه کسانی مناسب است؟", a: "همکاران، مشتریان، شرکای تجاری، دوستان و خانواده — برای هر مناسبتی یک انتخاب ایده‌آل." },
    { q: "نحوه استفاده از کارت سفر چگونه است؟", a: "پس از دریافت کارت، کد آن را در هنگام پرداخت در سایت افغانی‌بابا وارد کنید تا اعتبار از مبلغ کسر شود." },
    { q: "آیا اعتبار کارت سفر نقد می‌شود؟", a: "خیر، اعتبار کارت سفر فقط برای خرید خدمات سفری در افغانی‌بابا قابل استفاده است و نقد نمی‌شود." },
    { q: "آیا تاریخ انقضا دارد؟", a: "کارت‌های سفر افغانی‌بابا تاریخ انقضا ندارند و اعتبار آن‌ها تا زمان استفاده معتبر است." },
    { q: "حداقل مبلغ سفارش سازمانی چقدر است؟", a: "برای سفارشات سازمانی ویژه، لطفاً فرم درخواست را پر کنید تا کارشناسان ما راهنمایی کنند." },
    { q: "چطور کارت سفر سازمانی سفارش دهم؟", a: "فرم درخواست زیر را کامل کنید. تیم ما ظرف ۲۴ ساعت با شما تماس می‌گیرد." },
];

export default function TravelCardPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        orgName: "",
        employeeCount: "",
        applicantName: "",
        phone: "",
        position: "",
        email: "",
        totalAmount: "",
        note: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-['Vazirmatn']" dir="rtl">
            <Navbar />

            {/* Hero */}
            <section className="bg-gradient-to-bl from-slate-800 via-slate-700 to-slate-900 text-white py-20 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-2 text-sm font-medium mb-6">
                        <Gift className="w-4 h-4 text-amber-400" />
                        <span>هدیه سفر افغانی‌بابا</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                        بیایید هدیه یک سفر شاد بدهیم.
                    </h1>
                    <p className="text-white/75 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                        تجربه شیرین قدم زدن در خیابان‌های دبی یا لحظات شاد یک سفر خانوادگی، احتمالاً به‌یادماندنی‌ترین هدیه‌ای است که سازمان شما می‌تواند برای همکاران، مشتریان یا شرکای تجاری خود در مناسبت‌های مختلف بدهد.
                    </p>
                    {/* Gift Card Visual */}
                    <div className="flex justify-center gap-4 mb-8">
                        <div className="w-64 h-40 bg-gradient-to-br from-amber-400 to-orange-600 rounded-3xl shadow-2xl shadow-orange-900/40 flex flex-col justify-between p-5 -rotate-6 hover:rotate-0 transition-transform duration-500">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-white/70 text-xs">AFGHANI BABA</p>
                                    <p className="text-white font-black">کارت سفر</p>
                                </div>
                                <Gift className="w-6 h-6 text-white/80" />
                            </div>
                            <div>
                                <p className="text-white/50 text-xs mb-0.5">اعتبار</p>
                                <p className="text-white font-black text-xl">$500</p>
                            </div>
                        </div>
                        <div className="w-64 h-40 bg-gradient-to-br from-slate-500 to-slate-700 rounded-3xl shadow-2xl shadow-slate-900/40 flex flex-col justify-between p-5 rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-white/70 text-xs">AFGHANI BABA</p>
                                    <p className="text-white font-black">Corporate Card</p>
                                </div>
                                <Building className="w-6 h-6 text-white/80" />
                            </div>
                            <div>
                                <p className="text-white/50 text-xs mb-0.5">اعتبار سازمانی</p>
                                <p className="text-white font-black text-xl">$2,000</p>
                            </div>
                        </div>
                    </div>
                    <a
                        href="#request-form"
                        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-black px-8 py-4 rounded-2xl transition shadow-xl shadow-amber-900/30 text-lg"
                    >
                        <Gift className="w-5 h-5" />
                        ثبت درخواست
                    </a>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 py-14 space-y-16">

                {/* Who is it for */}
                <section>
                    <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">کارت سفر افغانی‌بابا هدیه‌ای است برای...</h2>
                    <p className="text-gray-500 text-center mb-10">مناسب برای هر سازمان، در هر مناسبتی</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recipientGroups.map(group => (
                            <div key={group.title} className={`rounded-3xl border p-6 ${group.color}`}>
                                <div className={`${group.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mb-4`}>
                                    {group.icon}
                                </div>
                                <h3 className="font-black text-gray-900 text-xl mb-4">{group.title}</h3>
                                <ul className="space-y-2">
                                    {group.items.map(item => (
                                        <li key={item} className="flex items-center gap-2 text-gray-600 text-sm">
                                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Special Conditions */}
                <section className="bg-white rounded-3xl border border-gray-100 p-8">
                    <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">شرایط ویژه سفارش سازمانی</h2>
                    <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
                        برای سفارشات ویژه (با مبالغ بالا)، امکانات و شرایط منحصربه‌فردی برای شما در نظر گرفته‌ایم:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {specialConditions.map(c => (
                            <div key={c.title} className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center">
                                <div className="text-4xl mb-4">{c.emoji}</div>
                                <h3 className="font-black text-gray-900 mb-2">{c.title}</h3>
                                <p className="text-gray-500 text-sm">{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Request Form */}
                <section id="request-form" className="scroll-mt-24">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">ثبت درخواست سازمانی</h2>
                        <p className="text-gray-500 text-center mb-2 text-sm">
                            برای اطلاع از شرایط ویژه و سفارش کارت سفر سازمانی، فرم زیر را تکمیل کنید.
                        </p>
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center text-sm text-amber-700 font-medium mb-8">
                            ⚠️ لطفاً فقط درخواست‌های سازمانی را از طریق این فرم ثبت کنید.
                        </div>

                        {submitted ? (
                            <div className="text-center py-10">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="font-black text-xl text-gray-900 mb-2">درخواست ثبت شد!</h3>
                                <p className="text-gray-500 mb-1">کارشناسان ما ظرف ۲۴ ساعت با شما تماس می‌گیرند.</p>
                                <p className="text-gray-400 text-sm">همچنین می‌توانید از طریق ایمیل <span className="text-orange-500 font-bold">travelcard@afghanibaba.com</span> با ما در تماس باشید.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">نام سازمان سفارش‌دهنده *</label>
                                        <input required value={form.orgName} onChange={e => setForm({ ...form, orgName: e.target.value })}
                                            placeholder="نام شرکت یا سازمان"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">تعداد کارمندان سازمان *</label>
                                        <input required type="number" value={form.employeeCount} onChange={e => setForm({ ...form, employeeCount: e.target.value })}
                                            placeholder="مثال: ۵۰"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">نام و نام خانوادگی متقاضی *</label>
                                        <input required value={form.applicantName} onChange={e => setForm({ ...form, applicantName: e.target.value })}
                                            placeholder="نام کامل"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">شماره موبایل *</label>
                                        <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                                            placeholder="07xxxxxxx" dir="ltr"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">سمت سازمانی *</label>
                                        <input required value={form.position} onChange={e => setForm({ ...form, position: e.target.value })}
                                            placeholder="مثال: مدیر منابع انسانی"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">ایمیل (برای دریافت کاتالوگ)</label>
                                        <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                            placeholder="example@company.com" dir="ltr"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">مجموع مبلغ درخواستی (دلار) *</label>
                                    <input required type="number" value={form.totalAmount} onChange={e => setForm({ ...form, totalAmount: e.target.value })}
                                        placeholder="مثال: 5000"
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">توضیحات اضافی</label>
                                    <textarea value={form.note} onChange={e => setForm({ ...form, note: e.target.value })}
                                        placeholder="هر توضیح یا درخواست ویژه‌ای که دارید..." rows={3}
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition resize-none" />
                                </div>
                                <p className="text-xs text-gray-400 text-center">فیلدهای ستاره‌دار (*) الزامی هستند.</p>
                                <button type="submit"
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl transition shadow-lg shadow-orange-100 text-base">
                                    ثبت درخواست
                                </button>
                                <div className="flex items-center justify-center gap-6 pt-2 text-sm text-gray-500">
                                    <a href="tel:+93700000000" className="flex items-center gap-2 hover:text-orange-500 transition">
                                        <Phone className="w-4 h-4" /> ۰۷۰۰-۰۰۰۰۰۰۰
                                    </a>
                                    <a href="mailto:travelcard@afghanibaba.com" className="flex items-center gap-2 hover:text-orange-500 transition">
                                        <Mail className="w-4 h-4" /> travelcard@afghanibaba.com
                                    </a>
                                </div>
                            </form>
                        )}
                    </div>
                </section>

                {/* FAQ */}
                <section>
                    <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">سوالات متداول کارت سفر</h2>
                    <div className="space-y-3 max-w-3xl mx-auto">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 text-right font-bold text-gray-900 hover:bg-gray-50 transition">
                                    <span>{faq.q}</span>
                                    {openFaq === i
                                        ? <ChevronUp className="w-5 h-5 text-orange-500 shrink-0" />
                                        : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
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
