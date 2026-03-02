"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CreditCard, Wallet, Landmark, ShieldCheck, ChevronRight, Check, Plane } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";

export default function FlightPaymentPage() {
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
            const res = await fetch(`/api/flight-bookings/${bookingId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.success) {
                setBooking(data.booking);
            }
        } catch (err) {
            console.error("Fetch flight booking error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            // API call to confirm payment - using checkout api logic
            await new Promise(resolve => setTimeout(resolve, 2000));

            alert("پرداخت با موفقیت انجام شد و بلیط طیاره شما صادر گردید!");
            router.push("/flights");
        } catch (err) {
            console.error("Payment error:", err);
            alert("متأسفانه خطایی در پرداخت رخ داد.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>;

    if (!booking) return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4"><p className="text-xl font-bold text-gray-900 mb-4">اطلاعات پرداختی یافت نشد.</p><button onClick={() => router.push('/flights')} className="bg-orange-500 text-white px-6 py-2 rounded-lg">بازگشت</button></div>;

    return (
        <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
            <Navbar />

            <main className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-12 gap-10">

                    {/* PAYMENT METHODS */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
                            <h1 className="text-2xl font-black text-gray-900 mb-8 border-b border-gray-100 pb-4">روش پرداخت هوایی</h1>

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

                                {/* WALLET */}
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
                            </div>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex items-start gap-4">
                            <ShieldCheck className="text-blue-500 shrink-0" size={32} />
                            <div>
                                <h4 className="font-black text-gray-900 mb-1">پرداخت امن شرکت‌های هوایی</h4>
                                <p className="text-sm text-gray-600 font-medium leading-relaxed">تراکنش‌های شما با استانداردهای امنیتی بالا محافظت می‌شود. شماره پیگیری شما پس از پرداخت صادر خواهد شد.</p>
                            </div>
                        </div>
                    </div>

                    {/* TOTAL SUMMARY COLUMN */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
                            <div className="bg-gray-900 p-8 text-white text-center relative">
                                <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 opacity-5" size={150} />
                                <h2 className="text-xl font-black mb-2 relative z-10">فاکتور نهایی</h2>
                                <p className="text-orange-500 font-black relative z-10 uppercase tracking-widest">{booking.airline} Airlines</p>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="flex justify-between items-center text-gray-500 font-bold">
                                    <span>تعداد مسافر:</span>
                                    <span className="text-gray-900 font-black">{booking.totalPassengers} نفر</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-500 font-bold">
                                    <span>ایرلاین:</span>
                                    <span className="text-gray-900 font-black">{booking.airline}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-500 font-bold">
                                    <span>شماره پرواز:</span>
                                    <span className="text-gray-900 font-black">{booking.flightNumber}</span>
                                </div>

                                <div className="pt-6 border-t-4 border-double border-gray-100 mt-6">
                                    <p className="text-gray-400 font-black text-xs uppercase tracking-widest mb-2">مجموع مبلغ قابل پرداخت</p>
                                    <p className="text-4xl font-black text-orange-500 italic">{booking.totalPrice.toLocaleString()} <span className="text-sm opacity-60">AFN</span></p>
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className="w-full mt-8 py-5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:text-gray-400 text-white font-black text-xl rounded-2xl shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 border-b-4 border-orange-700 disabled:border-transparent"
                                >
                                    {isProcessing ? (
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                    ) : (
                                        <>
                                            <CreditCard size={28} />
                                            <span>پرداخت و صدور بلیط</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={() => router.back()}
                                    className="w-full mt-4 py-3 text-gray-400 hover:text-gray-900 font-bold transition flex items-center justify-center gap-2"
                                >
                                    <ChevronRight size={18} />
                                    بازگشت و اصلاح
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
