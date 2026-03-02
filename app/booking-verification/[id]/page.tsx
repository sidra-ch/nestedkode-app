"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle, Clock, MapPin, User, Receipt, CreditCard, ChevronRight } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";

export default function BookingVerificationPage() {
    const params = useParams();
    const router = useRouter();
    const bookingId = params?.id as string || "";
    const { token } = useAuthStore();

    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
            } else {
                setError(data.message || "خطا در بارگذاری اطلاعات");
            }
        } catch (err) {
            console.error("Fetch booking error:", err);
            setError("متأسفانه خطایی در دریافت اطلاعات رخ داد.");
        } finally {
            setLoading(false);
        }
    };

    const handleProceedToPayment = () => {
        router.push(`/payment/${bookingId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error || !booking) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">خطا</h2>
                    <p className="text-gray-600 mb-6">{error || "اطلاعات رزرو یافت نشد."}</p>
                    <button
                        onClick={() => router.push('/bus')}
                        className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition"
                    >
                        بازگشت به جستجو
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-4 shadow-inner">
                        <CheckCircle size={40} />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900">تاییدی اطلاعات تکت</h1>
                    <p className="text-gray-500 mt-2 font-medium">لطفاً اطلاعات ذیل را قبل از پرداخت نهایی چک کنید.</p>
                </div>

                <div className="grid gap-8">
                    {/* TICKET SUMMARY CARD */}
                    <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 relative">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>

                        <div className="p-8 md:p-10">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-8 border-b border-dashed border-gray-200">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">شماره رزرو</p>
                                    <p className="text-lg font-black text-orange-500 font-mono">#{booking._id?.slice(-8).toUpperCase()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">کمپانی ترانسپورتی</p>
                                    <p className="text-xl font-black text-gray-900">{booking.busName || "SiMPLE Bus"}</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12 mb-10">
                                {/* ROUTE INFO */}
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-400">مسیر سفر</p>
                                            <p className="text-xl font-black text-gray-900">{booking.from} <span className="text-orange-500 px-2 font-light">←</span> {booking.to}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-400">زمان حرکت</p>
                                            <p className="text-lg font-black text-gray-900">
                                                {new Date(booking.travelDate).toLocaleDateString("fa-AF", { year: 'numeric', month: 'long', day: 'numeric' })}
                                                <span className="text-gray-400 font-medium px-2">|</span>
                                                {booking.departureTime}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* SEAT INFO */}
                                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Receipt className="text-orange-500" size={18} />
                                            <p className="text-sm font-bold text-gray-600">چوکی‌های انتخاب شده:</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {booking.seats.map((s: string) => (
                                                <span key={s} className="bg-white border text-gray-900 font-black w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-gray-200 flex justify-between items-center text-lg">
                                        <span className="font-bold text-gray-500 italic">مبلغ مجموعی:</span>
                                        <span className="font-black text-2xl text-orange-500">{booking.totalPrice} افغانی</span>
                                    </div>
                                </div>
                            </div>

                            {/* PASSENGER DETAILS */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2 mb-4">
                                    <User className="text-orange-500" size={20} />
                                    مشخصات مسافرین
                                </h3>
                                <div className="grid gap-3">
                                    {booking.passengerDetails?.map((p: any, idx: number) => (
                                        <div key={idx} className="flex items-center justify-between bg-white border border-gray-100 p-5 rounded-2xl hover:border-orange-200 transition-colors shadow-sm">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-xs">{idx + 1}</div>
                                                <div>
                                                    <p className="font-black text-gray-900 text-lg">{p.name}</p>
                                                    <p className="text-xs text-gray-400 font-bold">{p.gender === 'male' ? 'مرد' : 'زن'}</p>
                                                </div>
                                            </div>
                                            <div className="text-left">
                                                <span className="text-xs font-bold text-gray-400 block mb-1">چوکی</span>
                                                <span className="font-black text-gray-900 text-lg">{p.seatNumber}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-6">
                        <button
                            onClick={() => router.back()}
                            className="w-full md:w-auto px-8 py-4 text-gray-500 font-bold hover:text-gray-900 transition flex items-center gap-2"
                        >
                            <ChevronRight size={18} />
                            اصلاح معلومات
                        </button>

                        <button
                            onClick={handleProceedToPayment}
                            className="w-full md:w-auto min-w-[280px] px-10 py-5 bg-orange-500 text-white font-black text-xl rounded-2xl shadow-xl hover:bg-orange-600 hover:shadow-2xl transform active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            <CreditCard size={24} />
                            تایید و پرداخت
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
