"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CreditCard, Wallet, Landmark, ShieldCheck, ChevronRight, Check } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";

export default function PaymentPage() {
    const params = useParams();
    const router = useRouter();
    const bookingId = params?.id as string || "";
    const { token } = useAuthStore();

    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (bookingId) {
            fetchBookingDetails();
        }
    }, [bookingId]);

    const fetchBookingDetails = async () => {
        try {
            const res = await fetch(`/api/bookings/${bookingId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.success) {
                setBooking(data.booking);
            }
        } catch (err) {
            console.error("Fetch booking error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            const res = await fetch(`/api/bookings/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    bookingId,
                    paymentMethod: paymentMethod === 'card' ? 'online' : 'offline',
                    passengers: booking.passengerDetails || [],
                })
            });

            const data = await res.json();
            if (data.success) {
                alert("پرداخت با موفقیت انجام شد و تکت شما تایید گردید!");
                router.push("/bus");
            } else {
                alert(data.message || "خطا در پردازش پرداخت");
            }
        } catch (err) {
            console.error("Payment error:", err);
            alert("متأسفانه خطایی در پرداخت رخ داد.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
                <p className="text-xl font-bold text-gray-900 mb-4">اطلاعات پرداختی یافت نشد.</p>
                <button onClick={() => router.push('/bus')} className="bg-orange-500 text-white px-6 py-2 rounded-lg">بازگشت</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
            <Navbar />

            <main className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-12 gap-10">

                    {/* PAYMENT METHODS */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
                            <h1 className="text-2xl font-black text-gray-900 mb-8 border-b border-gray-100 pb-4">روش پرداخت</h1>

                            <div className="grid gap-4">
                                {/* CARD */}
                                <div
                                    onClick={() => setPaymentMethod("card")}
                                    className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer group flex items-center justify-between ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${paymentMethod === 'card' ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                                            <CreditCard size={32} />
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900 text-lg">کارت بانکی / آنلاین</p>
                                            <p className="text-xs font-bold text-gray-400 mt-1 italic tracking-wider">VISA, MasterCard, etc.</p>
                                        </div>
                                    </div>
                                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-200'}`}>
                                        {paymentMethod === 'card' && <Check size={20} />}
                                    </div>
                                </div>

                                {/* WALLET / AFGHANIBABA */}
                                <div
                                    onClick={() => setPaymentMethod("wallet")}
                                    className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer group flex items-center justify-between ${paymentMethod === 'wallet' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${paymentMethod === 'wallet' ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                                            <Wallet size={32} />
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900 text-lg">کیف پول افغانی‌بابا</p>
                                            <p className="text-xs font-bold text-gray-400 mt-1">پرداخت سریع با موجودی حساب</p>
                                        </div>
                                    </div>
                                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === 'wallet' ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-200'}`}>
                                        {paymentMethod === 'wallet' && <Check size={20} />}
                                    </div>
                                </div>

                                {/* BANK TRANSFER */}
                                <div
                                    onClick={() => setPaymentMethod("bank")}
                                    className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer group flex items-center justify-between ${paymentMethod === 'bank' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${paymentMethod === 'bank' ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                                            <Landmark size={32} />
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900 text-lg">حواله / انتقال بانکی</p>
                                            <p className="text-xs font-bold text-gray-400 mt-1">بانک ملی، کابل بانک، عزیزی بانک</p>
                                        </div>
                                    </div>
                                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === 'bank' ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-200'}`}>
                                        {paymentMethod === 'bank' && <Check size={20} />}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-orange-50 p-6 rounded-[2rem] border border-orange-100 flex items-start gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm shrink-0 border border-orange-100">
                                <ShieldCheck size={28} />
                            </div>
                            <div className="text-sm leading-relaxed">
                                <p className="text-lg font-black text-gray-900 mb-1">پرداخت امن و تضمین شده</p>
                                <p className="text-gray-600 font-medium">تمامی تراکنشهای شما توسط سیستمهای امنیتی افغانی‌بابا محافظت شده و حریم خصوصی شما اولویت ماست. در صورت لغو سفر، بازگشت وجه طبق قوانین صورت میگیرد.</p>
                            </div>
                        </div>
                    </div>

                    {/* TOTAL SUMMARY COLUMN */}
                    <div className="lg:col-span-4">
                        <div className="bg-gray-900 text-white rounded-[2rem] shadow-2xl p-8 sticky top-32 overflow-hidden">
                            {/* Visual Circle Decorations */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>

                            <div className="relative z-10">
                                <h2 className="text-xl font-black mb-8 pb-4 border-b border-white/10 italic tracking-tighter">خلاصه فاکتور</h2>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-center text-gray-400 text-sm font-bold uppercase tracking-widest">
                                        <span>تعداد چوکی:</span>
                                        <span className="text-white font-black text-lg">{booking.totalSeats}</span>
                                    </div>

                                    <div className="flex justify-between items-center text-gray-400 text-sm font-bold uppercase tracking-widest">
                                        <span>قیمت فی نفر:</span>
                                        <span className="text-white font-black text-lg">{booking.pricePerSeat} AFN</span>
                                    </div>

                                    <div className="pt-8 border-t border-white/10 mt-10">
                                        <p className="text-gray-400 font-bold mb-2">مجموعاً قابل پرداخت:</p>
                                        <p className="text-5xl font-black text-orange-500">{booking.totalPrice} <span className="text-xl font-light opacity-60">AFN</span></p>
                                    </div>

                                    <button
                                        onClick={handlePayment}
                                        disabled={isProcessing}
                                        className="w-full mt-10 py-5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:text-gray-400 text-white font-black text-xl rounded-2xl shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 border-b-4 border-orange-700 disabled:border-transparent"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                                <span>در حال اتصال به درگاه...</span>
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard size={28} />
                                                <span>تکمیل عملیات پرداخت</span>
                                            </>
                                        )}
                                    </button>

                                    <button
                                        onClick={() => router.back()}
                                        className="w-full mt-4 py-3 text-white/50 hover:text-white font-bold transition flex items-center justify-center gap-2"
                                    >
                                        <ChevronRight size={18} />
                                        بازگشت و اصلاح
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
