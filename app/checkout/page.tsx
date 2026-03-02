"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ShieldCheck,
    Clock,
    User,
    Users,
    CreditCard,
    MapPin,
    Phone,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    CheckCircle2
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
type Passenger = {
    fullName: string;
    gender: string;
    dateOfBirth: string;
    passportNumber?: string;
    passportExpiry?: string;
};

type ContactInfo = {
    phone: string;
    whatsapp: string;
    email: string;
    province: string;
    city: string;
};

type PaymentMethod = "OFFICE" | "BANK" | "MPAISA";

// --- Mock / Props Data ---
const TRIP_DETAILS = {
    type: "BUS",
    from: "کابل",
    to: "هرات",
    departureDate: "۱۴۰۲/۱۲/۱۵",
    airline: "احمدشاه ابدالی",
    pricePerPerson: 25,
};

function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State
    const [passengers, setPassengers] = useState<Passenger[]>([
        { fullName: "", gender: "MALE", dateOfBirth: "" }
    ]);
    const [contact, setContact] = useState<ContactInfo>({
        phone: "",
        whatsapp: "",
        email: "",
        province: "",
        city: ""
    });
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("OFFICE");
    const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSummaryMobile, setShowSummaryMobile] = useState(false);

    // Timer logic
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    // Handlers
    const addPassenger = () => {
        setPassengers([...passengers, { fullName: "", gender: "MALE", dateOfBirth: "" }]);
    };

    const removePassenger = (index: number) => {
        if (passengers.length > 1) {
            setPassengers(passengers.filter((_, i) => i !== index));
        }
    };

    const updatePassenger = (index: number, fields: Partial<Passenger>) => {
        const newPassengers = [...passengers];
        newPassengers[index] = { ...newPassengers[index], ...fields };
        setPassengers(newPassengers);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (timeLeft <= 0) {
            alert("زمان شما به پایان رسیده است. لطفا مجدد تلاش کنید.");
            return;
        }

        setIsSubmitting(true);
        // TODO: Connect to API
        setTimeout(() => {
            setIsSubmitting(false);
            router.push("/booking/confirmation/AFB-2024-00001");
        }, 1500);
    };

    const totalPrice = passengers.length * TRIP_DETAILS.pricePerPerson;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-['Vazirmatn']" dir="rtl">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Main Form Section */}
                    <div className="flex-1 max-w-3xl w-full space-y-8">
                        <header className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-black text-[#002855]">تکمیل رزرو و پرداخت</h1>
                                <p className="text-gray-500 mt-2">لطفا اطلاعات مسافران را مطابق پاسپورت یا تذکره وارد کنید.</p>
                            </div>
                            <div className={`hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl border ${timeLeft < 180 ? 'bg-red-50 border-red-100 text-red-600' : 'bg-orange-50 border-orange-100 text-orange-600'}`}>
                                <Clock size={20} />
                                <span className="font-bold text-lg">{formatTime(timeLeft)}</span>
                            </div>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Traveler Details */}
                            <section className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#002855] text-white rounded-xl flex items-center justify-center">
                                            <Users size={20} />
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900">اطلاعات مسافران</h2>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addPassenger}
                                        className="text-sm font-bold text-[#D4AF37] hover:underline"
                                    >
                                        + افزودن مسافر جدید
                                    </button>
                                </div>

                                {passengers.map((p, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={idx}
                                        className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 relative group"
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg text-xs font-bold">مسافر شماره {idx + 1}</span>
                                            {passengers.length > 1 && (
                                                <button type="button" onClick={() => removePassenger(idx)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition">حذف</button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">نام و نام خانوادگی (لاتین)</label>
                                                <input
                                                    required
                                                    value={p.fullName}
                                                    onChange={e => updatePassenger(idx, { fullName: e.target.value })}
                                                    placeholder="E.g. AHMAD REZAIE"
                                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3 outline-none focus:border-[#D4AF37] transition font-medium"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">جنسیت</label>
                                                <div className="flex gap-2">
                                                    {["MALE", "FEMALE"].map(g => (
                                                        <button
                                                            key={g}
                                                            type="button"
                                                            onClick={() => updatePassenger(idx, { gender: g })}
                                                            className={`flex-1 py-3 rounded-2xl border-2 transition font-bold ${p.gender === g ? 'bg-[#002855] text-white border-[#002855]' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}
                                                        >
                                                            {g === "MALE" ? "مرد" : "زن"}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">تاریخ تولد</label>
                                                <input
                                                    required
                                                    type="date"
                                                    value={p.dateOfBirth}
                                                    onChange={e => updatePassenger(idx, { dateOfBirth: e.target.value })}
                                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3 outline-none focus:border-[#D4AF37] transition"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">شماره پاسپورت / تذکره</label>
                                                <input
                                                    value={p.passportNumber}
                                                    onChange={e => updatePassenger(idx, { passportNumber: e.target.value })}
                                                    placeholder="P1234567"
                                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3 outline-none focus:border-[#D4AF37] transition font-medium"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </section>

                            {/* Contact Info */}
                            <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#002855] text-white rounded-xl flex items-center justify-center">
                                        <Phone size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">اطلاعات تماس</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">شماره موبایل</label>
                                        <input
                                            required
                                            type="tel"
                                            value={contact.phone}
                                            onChange={e => setContact({ ...contact, phone: e.target.value })}
                                            placeholder="07xxxxxxx"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3 text-left outline-none focus:border-[#D4AF37] transition"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">ایمیل</label>
                                        <input
                                            required
                                            type="email"
                                            value={contact.email}
                                            onChange={e => setContact({ ...contact, email: e.target.value })}
                                            placeholder="name@example.com"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3 text-left outline-none focus:border-[#D4AF37] transition"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Payment Method */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#002855] text-white rounded-xl flex items-center justify-center">
                                        <CreditCard size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">روش پرداخت</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { id: "OFFICE", title: "پرداخت حضوری", desc: "دفاتر مرکزی افغانی‌بابا" },
                                        { id: "BANK", title: "حواله بانکی", desc: "انتقال مستقیم به حساب" },
                                        { id: "MPAISA", title: "ام‌پیسا", desc: "پرداخت سریع موبایلی" },
                                    ].map(m => (
                                        <button
                                            key={m.id}
                                            type="button"
                                            onClick={() => setSelectedPayment(m.id as PaymentMethod)}
                                            className={`text-right p-5 rounded-[24px] border-2 transition relative overflow-hidden ${selectedPayment === m.id ? 'border-[#D4AF37] bg-orange-50/30' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                                        >
                                            {selectedPayment === m.id && (
                                                <div className="absolute top-3 left-3 text-[#D4AF37]">
                                                    <CheckCircle2 size={24} />
                                                </div>
                                            )}
                                            <p className={`font-black text-lg ${selectedPayment === m.id ? 'text-[#002855]' : 'text-gray-900'}`}>{m.title}</p>
                                            <p className="text-xs text-gray-500 mt-1">{m.desc}</p>
                                        </button>
                                    ))}
                                </div>

                                {/* Conditional Fields */}
                                <AnimatePresence mode="wait">
                                    {selectedPayment === "OFFICE" && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100">
                                            <p className="text-sm font-bold text-[#002855] leading-relaxed">
                                                لطفا پس از تایید رزرو، حداکثر تا ۲ ساعت به نزدیک‌ترین دفتر افغانی‌بابا در شهر خود مراجعه کنید.
                                                <br /><span className="text-gray-500 font-medium">آدرس: چهارراهی حاجی یعقوب، کابل، افغانستان</span>
                                            </p>
                                        </motion.div>
                                    )}
                                    {selectedPayment === "BANK" && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="p-6 bg-white rounded-3xl border border-gray-100 space-y-4">
                                            <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                                <p className="text-xs text-gray-400 mb-1">شماره حساب بانکی (عزیزی بانک)</p>
                                                <p className="font-black text-lg text-[#002855]">000123456789</p>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 italic">آپلود فیش واریزی</label>
                                                <input type="file" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#D4AF37] hover:file:bg-orange-100 cursor-pointer" />
                                            </div>
                                        </motion.div>
                                    )}
                                    {selectedPayment === "MPAISA" && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="p-6 bg-white rounded-3xl border border-gray-100 space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-red-50/50 rounded-2xl border border-red-100">
                                                <p className="text-sm font-bold text-red-700">شماره پرداخت ام‌پیسا:</p>
                                                <p className="font-black text-xl text-red-700 tracking-widest">0700102030</p>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">شناسه تراکنش (ID)</label>
                                                <input placeholder="Transaction ID" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3 outline-none focus:border-[#D4AF37] transition font-medium" />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </section>

                            {/* Submit - Desktop */}
                            <button
                                type="submit"
                                disabled={isSubmitting || timeLeft <= 0}
                                className="hidden lg:block w-full bg-[#D4AF37] hover:bg-[#B08D26] text-white font-black text-xl py-6 rounded-[24px] transition-all shadow-xl shadow-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "در حال ثبت اطلاعات..." : `تکمیل رزرو و پرداخت (${totalPrice} دلار)`}
                            </button>
                        </form>
                    </div>

                    {/* Sidebar Summary */}
                    <aside className="w-full lg:w-[380px] lg:sticky lg:top-24 space-y-4">
                        <div className="bg-white rounded-[32px] p-8 shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden relative">
                            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#002855] via-[#D4AF37] to-[#002855]"></div>

                            <h3 className="text-xl font-black text-gray-900 mb-6">خلاصه سفر</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#002855]">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">مسیر انتخابی</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="font-black text-gray-800">{TRIP_DETAILS.from}</span>
                                            <span className="text-gray-300">←</span>
                                            <span className="font-black text-gray-800">{TRIP_DETAILS.to}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">تاریخ حرکت</p>
                                        <p className="font-bold text-gray-700 mt-1">{TRIP_DETAILS.departureDate}</p>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">تعداد مسافر</p>
                                        <p className="font-bold text-gray-700 mt-1">{passengers.length} نفر</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-50 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">قیمت پایه (هر نفر)</span>
                                        <span className="font-bold text-gray-700">{TRIP_DETAILS.pricePerPerson} دلار</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">مالیات و عوارض</span>
                                        <span className="font-bold text-green-600">رایگان</span>
                                    </div>
                                    <div className="pt-4 flex justify-between items-end border-t border-gray-100">
                                        <span className="font-black text-lg text-gray-900">مبلغ قابل پرداخت</span>
                                        <div className="text-left">
                                            <span className="text-3xl font-black text-[#002855]">{totalPrice}</span>
                                            <span className="text-sm font-bold text-gray-400 mr-2">دلار</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-[#002855] rounded-[24px] text-white flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                <ShieldCheck size={24} className="text-[#D4AF37]" />
                            </div>
                            <div>
                                <p className="text-sm font-bold">ضمانت قیمت افغانی‌بابا</p>
                                <p className="text-[10px] text-white/60">امن‌ترین و ارزان‌ترین رزرو آنلاین در افغانستان</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Mobile Sticky Button */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50">
                <div className="container mx-auto flex items-center gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-black text-[#002855]">{totalPrice}</span>
                            <span className="text-xs font-bold text-gray-400">دلار</span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-bold">مجموع برای {passengers.length} نفر</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting || timeLeft <= 0}
                        className="flex-[2] bg-[#D4AF37] text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-100"
                    >
                        تکمیل رزرو
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">درحال بارگذاری...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
