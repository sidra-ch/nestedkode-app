"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    CreditCard, Plane, CheckCircle, ChevronLeft, ShieldCheck,
    Lock, Clock, Users
} from "lucide-react";

function FlightPaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const flightId = searchParams?.get("flightId") || "";
    const passengerName = searchParams?.get("passengerName") || "";
    const phone = searchParams?.get("phone") || "";
    const passengers = searchParams?.get("passengers") || "1";
    const date = searchParams?.get("date") || "";
    const price = Number(searchParams?.get("price") || "0");
    const airline = searchParams?.get("airline") || "";
    const flightNumber = searchParams?.get("flightNumber") || "";
    const from = searchParams?.get("from") || "";
    const to = searchParams?.get("to") || "";

    const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet" | "bank">("card");
    const [cardForm, setCardForm] = useState({ number: "", expiry: "", cvv: "", name: "" });
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handlePay = async () => {
        if (paymentMethod === "card") {
            if (!cardForm.number || !cardForm.expiry || !cardForm.cvv) {
                setError("لطفاً تمام فیلدهای کارت را پر کنید");
                return;
            }
        }
        setError("");
        setProcessing(true);
        // Simulate payment processing
        await new Promise(r => setTimeout(r, 2000));
        setProcessing(false);
        setSuccess(true);
    };

    const bookingRef = `AF-${Date.now().toString().slice(-6)}`;

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 font-['Vazirmatn']" dir="rtl">
                <Navbar />
                <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 mb-2">تکت شما صادر شد! 🎉</h1>
                        <p className="text-gray-500 mb-6">پرداخت با موفقیت انجام شد. بلیط به شماره زیر برای شما صادر شده است.</p>

                        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-6">
                            <p className="text-xs text-gray-400 font-bold mb-1">کد پیگیری</p>
                            <p className="text-3xl font-black text-orange-600 tracking-widest">{bookingRef}</p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-5 text-right space-y-3 mb-8 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">مسافر</span>
                                <span className="font-bold text-gray-800">{passengerName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">مسیر</span>
                                <span className="font-bold text-gray-800">{from} ← {to}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">پرواز</span>
                                <span className="font-bold text-gray-800">{airline} · {flightNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">مبلغ پرداختی</span>
                                <span className="font-black text-orange-600">{price.toLocaleString()} AFN</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => router.push("/")}
                                className="py-3 px-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition text-sm"
                            >
                                بازگشت به خانه
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="py-3 px-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition text-sm"
                            >
                                چاپ / دانلود تکت
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-['Vazirmatn']" dir="rtl">
            <Navbar />

            {/* Steps bar */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-center gap-3 text-sm">
                        {["جستجو", "تأیید مسافر", "پرداخت", "تکت"].map((step, i) => (
                            <div key={step} className="flex items-center gap-2">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${i === 2 ? "bg-orange-500 text-white" : i < 2 ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"}`}>
                                    {i < 2 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                                </div>
                                <span className={`font-bold hidden sm:block ${i === 2 ? "text-orange-600" : "text-gray-400"}`}>{step}</span>
                                {i < 3 && <ChevronLeft className="w-4 h-4 text-gray-200" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Payment Section */}
                    <div className="lg:col-span-2 space-y-5">
                        <h1 className="text-2xl font-black text-gray-900">انتخاب روش پرداخت</h1>

                        {/* Payment Methods */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                {[
                                    { id: "card", label: "کارت بانکی", icon: <CreditCard className="w-5 h-5" /> },
                                    { id: "wallet", label: "کیف پول", icon: <span className="text-lg">👛</span> },
                                    { id: "bank", label: "انتقال بانکی", icon: <span className="text-lg">🏦</span> },
                                ].map(m => (
                                    <button
                                        key={m.id}
                                        onClick={() => setPaymentMethod(m.id as any)}
                                        className={`p-4 rounded-2xl border-2 transition flex flex-col items-center gap-2 text-sm font-bold ${paymentMethod === m.id ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200"}`}
                                    >
                                        {m.icon}
                                        <span>{m.label}</span>
                                    </button>
                                ))}
                            </div>

                            {paymentMethod === "card" && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">شماره کارت</label>
                                        <input
                                            value={cardForm.number}
                                            onChange={e => setCardForm({ ...cardForm, number: e.target.value.replace(/\D/g, "").slice(0, 16) })}
                                            placeholder="1234 5678 9012 3456"
                                            dir="ltr"
                                            maxLength={16}
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition font-mono tracking-widest"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">تاریخ انقضا</label>
                                            <input
                                                value={cardForm.expiry}
                                                onChange={e => setCardForm({ ...cardForm, expiry: e.target.value })}
                                                placeholder="MM/YY"
                                                dir="ltr"
                                                maxLength={5}
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition font-mono"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">CVV2</label>
                                            <input
                                                value={cardForm.cvv}
                                                onChange={e => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                                                placeholder="123"
                                                dir="ltr"
                                                type="password"
                                                maxLength={4}
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">نام دارنده کارت</label>
                                        <input
                                            value={cardForm.name}
                                            onChange={e => setCardForm({ ...cardForm, name: e.target.value })}
                                            placeholder="نام همانطور که روی کارت است"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition"
                                        />
                                    </div>
                                </div>
                            )}

                            {paymentMethod === "wallet" && (
                                <div className="text-center py-8">
                                    <p className="text-5xl mb-3">👛</p>
                                    <p className="font-black text-gray-900 mb-1">موجودی کیف پول</p>
                                    <p className="text-3xl font-black text-green-600 mb-2">12,500 AFN</p>
                                    {price > 12500 ? (
                                        <p className="text-red-500 text-sm font-bold">موجودی کافی نیست. لطفاً روش دیگری انتخاب کنید.</p>
                                    ) : (
                                        <p className="text-green-600 text-sm font-bold">موجودی کافی برای پرداخت ✓</p>
                                    )}
                                </div>
                            )}

                            {paymentMethod === "bank" && (
                                <div className="bg-blue-50 rounded-2xl p-5 text-sm text-blue-800 space-y-2">
                                    <p className="font-black">اطلاعات حساب بانکی افغانی‌بابا:</p>
                                    <p>بانک: بانک ملی افغانستان</p>
                                    <p dir="ltr" className="font-mono">شماره حساب: ۱۰۳۲-۴۵۶۷-۸۹۰۰</p>
                                    <p className="font-bold">در توضیحات واریز، کد <span className="text-blue-600">{bookingRef}</span> را ذکر کنید.</p>
                                </div>
                            )}

                            {error && (
                                <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold">
                                    {error}
                                </div>
                            )}
                        </div>

                        {/* Security Badge */}
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                            <Lock className="w-4 h-4 text-green-500" />
                            <span>پرداخت شما از طریق درگاه امن رمزگذاری شده است</span>
                            <ShieldCheck className="w-4 h-4 text-green-500" />
                        </div>

                        {/* Pay Button */}
                        <button
                            onClick={handlePay}
                            disabled={processing}
                            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-black py-4 rounded-2xl transition shadow-lg text-base flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    در حال پردازش...
                                </>
                            ) : (
                                <>
                                    <Lock className="w-5 h-5" />
                                    پرداخت {price.toLocaleString()} AFN
                                </>
                            )}
                        </button>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-4">
                            <h3 className="font-black text-gray-900 border-b border-gray-50 pb-3">خلاصه سفارش</h3>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                                    <Plane className="w-5 h-5 text-orange-500" />
                                </div>
                                <div>
                                    <p className="font-black text-gray-900 text-sm">{airline}</p>
                                    <p className="text-orange-500 text-xs font-bold">{flightNumber}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">مسیر</span>
                                    <span className="font-bold text-gray-800">{from} ← {to}</span>
                                </div>
                                {date && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> تاریخ</span>
                                        <span className="font-bold text-gray-800">
                                            {new Date(date).toLocaleDateString("fa-AF", { month: "long", day: "numeric" })}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-400 flex items-center gap-1"><Users className="w-3 h-3" /> مسافر</span>
                                    <span className="font-bold text-gray-800">{passengers} نفر</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">نام</span>
                                    <span className="font-bold text-gray-800 text-xs">{passengerName}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-black text-gray-900">مجموع</span>
                                    <span className="font-black text-xl text-orange-600">{price.toLocaleString()} <span className="text-xs text-gray-400">AFN</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default function FlightPaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin w-12 h-12 rounded-full border-4 border-orange-200 border-t-orange-500" />
            </div>
        }>
            <FlightPaymentContent />
        </Suspense>
    );
}
