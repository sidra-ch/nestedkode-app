"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    CreditCard, CheckCircle, ChevronDown, ChevronUp,
    Phone, Plane, Bus, Hotel, Compass, ArrowLeft
} from "lucide-react";

const plans = [
    {
        id: "3month",
        name: "اقساط ۳ ماهه",
        desc: "مناسب برای سفرهای کوتاه‌مدت",
        fee: "۳٪",
        months: 3,
        color: "from-orange-500 to-amber-500",
        highlight: true,
    },
    {
        id: "6month",
        name: "اقساط ۶ ماهه",
        desc: "پرداخت آسان برای سفرهای متوسط",
        fee: "۵٪",
        months: 6,
        color: "from-blue-500 to-indigo-500",
        highlight: false,
    },
    {
        id: "12month",
        name: "اقساط ۱۲ ماهه",
        desc: "ایده‌آل برای سفرهای بزرگ و گروهی",
        fee: "۸٪",
        months: 12,
        color: "from-purple-500 to-pink-500",
        highlight: false,
    },
];

const faqs = [
    { q: "شرایط دریافت اعتبار سفر اقساطی چیست؟", a: "داشتن حساب کاربری معتبر در افغانی‌بابا، تأیید هویت و داشتن سابقه پرداخت مناسب. تیم ما در تمام مراحل همراه شماست." },
    { q: "آیا می‌توانم از اعتبار برای تمام خدمات استفاده کنم؟", a: "بله! اعتبار سفر اقساطی برای بلیط هواپیما، اتوبوس، هتل و تور قابل استفاده است." },
    { q: "تفاوت اقساط کوتاه‌مدت و بلندمدت چیست؟", a: "اقساط کوتاه‌مدت (۳ ماهه) کارمزد کمتری دارد اما اقساط ماهانه بیشتر است. اقساط بلندمدت (۱۲ ماهه) پرداخت ماهانه راحت‌تری دارد." },
    { q: "چگونه اقساطم را پرداخت کنم؟", a: "از طریق پنل کاربری افغانی‌بابا یا تماس با پشتیبانی ما می‌توانید اقساط ماهانه خود را پرداخت کنید." },
    { q: "آیا نیاز به ضامن دارم؟", a: "خیر! سفر اقساطی افغانی‌بابا بدون نیاز به ضامن ارائه می‌شود." },
    { q: "فرآیند استرداد در سفر اقساطی چطور است؟", a: "در صورت کنسلی، مبالغ پرداخت شده طبق قوانین استرداد افغانی‌بابا بازگشت داده می‌شود." },
    { q: "آیا می‌توانم پس از تأیید، مبلغ اعتبار را تغییر دهم؟", a: "تغییر مبلغ پس از تأیید امکان‌پذیر نیست. لطفاً در هنگام درخواست دقت کافی داشته باشید." },
];

const tours = [
    { name: "تور اقساطی دبی", emoji: "🇦🇪", desc: "۵ شب / ۶ روز", price: "از ۲,۵۰۰ دلار", href: "/tour/dubai" },
    { name: "تور اقساطی استانبول", emoji: "🇹🇷", desc: "۷ شب / ۸ روز", price: "از ۱,۸۰۰ دلار", href: "/tour/istanbul" },
    { name: "تور اقساطی مالزی", emoji: "🇲🇾", desc: "۶ شب / ۷ روز", price: "از ۲,۲۰۰ دلار", href: "/tour/malaysia" },
    { name: "تور اقساطی بامیان", emoji: "🇦🇫", desc: "۳ شب / ۴ روز", price: "از ۱۵۰ دلار", href: "/tour/bamiyan" },
    { name: "تور اقساطی مزار شریف", emoji: "🕌", desc: "۲ شب / ۳ روز", price: "از ۱۲۰ دلار", href: "/tour/mazar" },
    { name: "تور اقساطی هرات", emoji: "🏛️", desc: "۲ شب / ۳ روز", price: "از ۱۰۰ دلار", href: "/tour/herat" },
];

export default function InstallmentPage() {
    const [credit, setCredit] = useState(5000);
    const [selectedPlan, setSelectedPlan] = useState("3month");
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [form, setForm] = useState({ name: "", phone: "", amount: "" });
    const [submitted, setSubmitted] = useState(false);

    const plan = plans.find(p => p.id === selectedPlan)!;
    const fee = parseFloat(plan.fee) / 100;
    const totalWithFee = Math.round(credit * (1 + fee));
    const monthly = Math.round(totalWithFee / plan.months);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-['Vazirmatn']" dir="rtl">
            <Navbar />

            {/* Hero */}
            <section className="bg-gradient-to-bl from-orange-500 via-orange-600 to-amber-700 text-white py-16 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 text-sm font-medium mb-6">
                        <CreditCard className="w-4 h-4" />
                        <span>سفر اقساطی افغانی‌بابا</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">رویای سفرت را به تعویق نینداز!</h1>
                    <p className="text-white/85 text-lg max-w-2xl mx-auto">
                        با تسهیلات سفر اقساطی افغانی‌بابا، همین امروز سفر خود را برنامه‌ریزی کن و هزینه را در اقساط آسان ماهانه پرداخت کن.
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 py-12 space-y-14">

                {/* Credit Calculator */}
                <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">محاسبه اقساط سفر</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                        {/* Left: Inputs */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    مبلغ اعتبار مورد نیاز: <span className="text-orange-600 font-black">{credit.toLocaleString()} دلار</span>
                                </label>
                                <input
                                    type="range"
                                    min={500}
                                    max={20000}
                                    step={500}
                                    value={credit}
                                    onChange={e => setCredit(Number(e.target.value))}
                                    className="w-full accent-orange-500 h-2 cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>$500</span><span>$20,000</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3">انتخاب دوره بازپرداخت:</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {plans.map(p => (
                                        <button
                                            key={p.id}
                                            onClick={() => setSelectedPlan(p.id)}
                                            className={`py-3 px-2 rounded-2xl border-2 transition text-sm font-bold ${selectedPlan === p.id ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'}`}
                                        >
                                            {p.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Result Card */}
                        <div className={`bg-gradient-to-br ${plan.color} text-white rounded-2xl p-6 space-y-4`}>
                            <p className="text-white/80 text-sm font-medium">{plan.desc}</p>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-white/70 text-sm">مبلغ اعتبار</span>
                                    <span className="font-black text-xl">{credit.toLocaleString()} دلار</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/70 text-sm">کارمزد خدمات</span>
                                    <span className="font-bold">{plan.fee}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/70 text-sm">مجموع قابل پرداخت</span>
                                    <span className="font-black">{totalWithFee.toLocaleString()} دلار</span>
                                </div>
                                <div className="border-t border-white/30 pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold">هر قسط ماهانه</span>
                                        <span className="text-3xl font-black">{monthly.toLocaleString()} <span className="text-sm font-medium">دلار</span></span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2 text-xs">
                                <CheckCircle className="w-4 h-4 shrink-0" />
                                <span>بدون نیاز به ضامن</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Steps */}
                <section>
                    <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">مراحل دریافت اعتبار سفر</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            { step: "۱", icon: "📝", title: "ثبت درخواست", desc: "فرم درخواست اعتبار را در افغانی‌بابا پر کنید" },
                            { step: "۲", icon: "✅", title: "بررسی اعتبار", desc: "درخواست شما توسط تیم ما بررسی می‌شود" },
                            { step: "۳", icon: "💰", title: "واریز اعتبار", desc: "اعتبار تأیید شده به کیف پول شما واریز می‌شود" },
                            { step: "۴", icon: "✈️", title: "رزرو و سفر", desc: "از اعتبار برای رزرو هر خدمت سفری استفاده کن" },
                        ].map((s) => (
                            <div key={s.step} className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-md transition">
                                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                                    {s.icon}
                                </div>
                                <div className="text-xs font-black text-orange-500 mb-1">مرحله {s.step}</div>
                                <h3 className="font-black text-gray-900 mb-2">{s.title}</h3>
                                <p className="text-gray-500 text-sm">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Services */}
                <section className="bg-white rounded-3xl border border-gray-100 p-8">
                    <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">خدمات قابل پرداخت با اعتبار</h2>
                    <p className="text-gray-500 text-center mb-8">از اعتبار سفر اقساطی برای تمام خدمات زیر استفاده کنید</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { icon: <Plane className="w-7 h-7" />, name: "بلیط هواپیما", color: "bg-blue-50 text-blue-600" },
                            { icon: <Bus className="w-7 h-7" />, name: "بلیط اتوبوس", color: "bg-orange-50 text-orange-600" },
                            { icon: <Hotel className="w-7 h-7" />, name: "رزرو هتل", color: "bg-green-50 text-green-600" },
                            { icon: <Compass className="w-7 h-7" />, name: "تور مسافرتی", color: "bg-purple-50 text-purple-600" },
                        ].map(s => (
                            <div key={s.name} className={`${s.color} rounded-2xl p-6 flex flex-col items-center gap-3 font-bold`}>
                                {s.icon}
                                <span className="text-sm">{s.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tours */}
                <section>
                    <h2 className="text-2xl font-black text-gray-900 mb-6">تورهای اقساطی محبوب</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {tours.map(tour => (
                            <a
                                key={tour.name}
                                href={tour.href}
                                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl">{tour.emoji}</span>
                                    <div>
                                        <h3 className="font-black text-gray-900 group-hover:text-orange-600 transition">{tour.name}</h3>
                                        <p className="text-gray-400 text-xs">{tour.desc}</p>
                                    </div>
                                </div>
                                <div className="text-left">
                                    <p className="text-orange-600 font-black text-sm">{tour.price}</p>
                                    <ArrowLeft className="w-4 h-4 text-gray-300 group-hover:text-orange-400 transition mt-1 mx-auto" />
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Benefits */}
                <section className="bg-gradient-to-bl from-orange-500 to-amber-600 rounded-3xl p-8 text-white">
                    <h2 className="text-2xl font-black mb-6 text-center">چرا سفر اقساطی افغانی‌بابا؟</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { emoji: "🔒", title: "بدون ضامن", desc: "نیازی به معرفی ضامن ندارید" },
                            { emoji: "⚡", title: "تأیید سریع", desc: "درخواست شما ظرف ۲۴ ساعت بررسی می‌شود" },
                            { emoji: "💳", title: "بدون پیش‌پرداخت", desc: "با ۰ تومان پیش‌پرداخت سفرت را شروع کن" },
                            { emoji: "📱", title: "مدیریت آنلاین", desc: "مدیریت اقساط از طریق اپ افغانی‌بابا" },
                            { emoji: "🌍", title: "تمام مقاصد", desc: "داخلی و خارجی، هر مقصد دلخواهت" },
                            { emoji: "📞", title: "پشتیبانی ۲۴/۷", desc: "تیم ما همیشه در کنار شماست" },
                        ].map(b => (
                            <div key={b.title} className="bg-white/15 backdrop-blur rounded-2xl p-4 flex items-start gap-3">
                                <span className="text-2xl">{b.emoji}</span>
                                <div>
                                    <h3 className="font-black">{b.title}</h3>
                                    <p className="text-white/75 text-sm">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Application Form */}
                <section className="bg-white rounded-3xl border border-gray-100 p-8 max-w-2xl mx-auto w-full">
                    <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">درخواست اعتبار سفر</h2>
                    <p className="text-gray-500 text-center mb-8 text-sm">فرم زیر را پر کنید، کارشناسان ما با شما تماس می‌گیرند</p>
                    {submitted ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="font-black text-xl text-gray-900 mb-2">درخواست ثبت شد!</h3>
                            <p className="text-gray-500">کارشناسان ما در اسرع وقت با شما تماس می‌گیرند.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                        dir="ltr"
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">مبلغ اعتبار مورد نیاز (دلار)</label>
                                <input
                                    type="number"
                                    value={form.amount || credit}
                                    onChange={e => setForm({ ...form, amount: e.target.value })}
                                    placeholder="مثال: 2000"
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl transition shadow-lg shadow-orange-100 text-base"
                            >
                                ثبت درخواست رایگان
                            </button>
                            <p className="text-center text-xs text-gray-400">یا با ما تماس بگیرید: <a href="tel:+93700000000" className="font-bold text-orange-500">۰۷۰۰-۰۰۰۰۰۰۰</a></p>
                        </form>
                    )}
                </section>

                {/* FAQ */}
                <section>
                    <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">سوالات متداول</h2>
                    <div className="space-y-3 max-w-3xl mx-auto">
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

                {/* Contact */}
                <section className="text-center bg-blue-50 border border-blue-100 rounded-3xl p-8">
                    <p className="text-blue-700 font-bold mb-1">سوال دیگری دارید؟</p>
                    <h3 className="text-xl font-black text-gray-900 mb-4">پشتیبانی ۲۴ ساعته افغانی‌بابا</h3>
                    <a
                        href="tel:+93700000000"
                        className="inline-flex items-center gap-3 bg-orange-500 text-white font-black px-8 py-4 rounded-2xl hover:bg-orange-600 transition shadow-lg"
                    >
                        <Phone className="w-5 h-5" />
                        مشاوره رایگان — ۰۷۰۰-۰۰۰۰۰۰۰
                    </a>
                </section>

            </div>

            <Footer />
        </div>
    );
}
