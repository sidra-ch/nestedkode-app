"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    CheckCircle,
    MapPin,
    Phone,
    MessageCircle,
    Download,
    ArrowRight,
    ShieldCheck,
    Calendar,
    User,
    Clock
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

function ConfirmationContent() {
    const params = useParams();
    const router = useRouter();
    const reference = params?.reference as string;
    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, fetch booking by reference
        // For demo, we'll simulate a fetch
        setTimeout(() => {
            setBooking({
                reference: reference || "AFB-2024-00001",
                status: "pending_verification",
                paymentMethod: "BANK",
                totalAmount: 25,
                trip: {
                    from: "کابل",
                    to: "هرات",
                    date: "۱۴۰۲/۱۲/۱۵"
                }
            });
            setLoading(false);
        }, 1000);
    }, [reference]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
            </div>
        );
    }

    const handleWhatsApp = () => {
        const text = `سلام، من یک رزرو با کد ${reference} انجام دادم. لطفا راهنمایی کنید.`;
        window.open(`https://wa.me/93700102030?text=${encodeURIComponent(text)}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-['Vazirmatn']" dir="rtl">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto space-y-8">

                    {/* Success Header */}
                    <div className="text-center space-y-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto"
                        >
                            <CheckCircle size={48} />
                        </motion.div>
                        <h1 className="text-3xl font-black text-[#002855]">رزرو شما با موفقیت ثبت شد!</h1>
                        <p className="text-gray-500 font-medium">کد رهگیری شما: <span className="text-[#D4AF37] font-black tracking-widest bg-orange-50 px-3 py-1 rounded-lg ml-2">{reference}</span></p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Payment & Next Steps */}
                        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Clock className="text-[#D4AF37]" size={20} />
                                مراحل بعدی
                            </h2>

                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-orange-50 text-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 font-bold">۱</div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        در صورتی که روش **حواله بانکی** را انتخاب کرده‌اید، لطفا فیش واریزی خود را از طریق واتس‌آپ ارسال کنید.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-orange-50 text-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 font-bold">۲</div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        کارشناسان ما پس از بررسی پرداخت، بلیط نهایی را برای شما صادر و ارسال خواهند کرد.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-50">
                                <button
                                    onClick={handleWhatsApp}
                                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition shadow-lg shadow-green-100"
                                >
                                    <MessageCircle size={24} />
                                    ارسال فیش در واتس‌آپ
                                </button>
                            </div>
                        </div>

                        {/* Office Information */}
                        <div className="bg-[#002855] rounded-[32px] p-8 text-white space-y-6 shadow-xl shadow-blue-900/10">
                            <h2 className="text-xl font-bold flex items-center gap-2 text-[#D4AF37]">
                                <MapPin size={20} />
                                اطلاعات دفتر مرکزی
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-blue-200 font-bold uppercase mb-1">آدرس</p>
                                    <p className="text-sm">کابل، شهر نو، چهارراهی حاجی یعقوب، ساختمان افغانی‌بابا</p>
                                </div>
                                <div>
                                    <p className="text-xs text-blue-200 font-bold uppercase mb-1">تلفن پشتیبانی</p>
                                    <p className="text-xl font-black flex items-center gap-2" dir="ltr">
                                        <Phone size={18} className="text-[#D4AF37]" />
                                        +93 700 10 20 30
                                    </p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="text-xs text-white/60 mb-2">ساعت کاری</p>
                                    <p className="text-sm font-bold">همه روزه ۸:۰۰ صبح الی ۸:۰۰ شب</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Booking Summary Card */}
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 pb-6 border-b border-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#002855]">
                                    <ShieldCheck size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900">جزئیات رزرو</h3>
                                    <p className="text-sm text-gray-400">ثبت شده در {new Date().toLocaleDateString('fa-IR')}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-6 py-3 rounded-2xl border-2 border-gray-100 text-gray-600 font-bold flex items-center gap-2 hover:bg-gray-50 transition">
                                    <Download size={18} />
                                    دانلود خلاصه
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="space-y-1">
                                <p className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1">
                                    <MapPin size={12} /> مسیر
                                </p>
                                <p className="font-black text-gray-900">{booking.trip.from} به {booking.trip.to}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1">
                                    <Calendar size={12} /> تاریخ
                                </p>
                                <p className="font-black text-gray-900">{booking.trip.date}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1">
                                    <User size={12} /> مبلغ پرداخت
                                </p>
                                <p className="font-black text-[#002855]">{booking.totalAmount} دلار</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1">
                                    <ShieldCheck size={12} /> وضعیت
                                </p>
                                <p className="font-black text-orange-500">در انتظار تایید</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center pt-8">
                        <button
                            onClick={() => router.push("/mytravels")}
                            className="flex items-center gap-2 text-gray-400 hover:text-[#002855] font-bold transition group"
                        >
                            <span>مشاهده تمام سفرهای من</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function ConfirmationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">درحال بارگذاری...</div>}>
            <ConfirmationContent />
        </Suspense>
    );
}
