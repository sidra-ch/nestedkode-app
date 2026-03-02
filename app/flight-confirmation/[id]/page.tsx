"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Plane, User, Phone, Mail, ChevronRight, Info, ShieldCheck, Ticket } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";

function FlightConfirmationContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const flightId = params?.id as string || "";
    const { user, token, register, login } = useAuthStore();

    const [flight, setFlight] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Form State
    const [numPassengers, setNumPassengers] = useState(1);
    const [passengerDetails, setPassengerDetails] = useState<any[]>([{ name: "", age: "", gender: "male" }]);
    const [contactPhone, setContactPhone] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [password, setPassword] = useState(""); // For auto-registration

    useEffect(() => {
        setIsMounted(true);
        const passengersFromUrl = searchParams?.get("passengers");
        if (passengersFromUrl) {
            const count = parseInt(passengersFromUrl.split(" ")[0]) || 1;
            setNumPassengers(count);
            setPassengerDetails(Array(count).fill(0).map(() => ({ name: "", age: "", gender: "male" })));
        }
        fetchFlightDetails();
    }, [flightId]);

    const fetchFlightDetails = async () => {
        try {
            const res = await fetch(`/api/flights/${flightId}`);
            const data = await res.json();
            if (data.success) {
                setFlight(data.flight);
            } else {
                // Mock fallback if needed
                setFlight({
                    airline: "Kam Air",
                    flightNumber: "RQ-101",
                    from: searchParams?.get("from") || "Kabul",
                    to: searchParams?.get("to") || "Istanbul",
                    departureTime: new Date().toISOString(),
                    arrivalTime: new Date(Date.now() + 7200000).toISOString(),
                    price: 25000,
                    class: "economy"
                });
            }
        } catch (err) {
            console.error("Fetch flight info error:", err);
        } finally {
            setLoading(false);
        }
    };

    const updatePassenger = (idx: number, field: string, value: any) => {
        const updated = [...passengerDetails];
        updated[idx] = { ...updated[idx], [field]: value };
        setPassengerDetails(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            let currentToken = token;
            let currentUser = user;

            // Auto-registration if not logged in
            if (!token) {
                if (!contactPhone || !password) {
                    alert("لطفاً شماره تماس و رمز عبور را برای ایجاد حساب وارد کنید.");
                    setSubmitting(false);
                    return;
                }

                const shadowEmail = `${contactPhone}@afghanibaba.com`;
                try {
                    await register(passengerDetails[0].name || "User", shadowEmail, password);
                    currentToken = useAuthStore.getState().token;
                    currentUser = useAuthStore.getState().user;
                } catch (regErr: any) {
                    console.log("Registration failed, trying login...", regErr);
                    try {
                        await login(shadowEmail, password);
                        currentToken = useAuthStore.getState().token;
                        currentUser = useAuthStore.getState().user;
                    } catch (loginErr: any) {
                        alert("خطا در ورود یا ثبت‌نام. لطفاً اطلاعات را بررسی کنید.");
                        setSubmitting(false);
                        return;
                    }
                }
            }

            // Submit Flight Booking
            const res = await fetch("/api/flight-bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                },
                body: JSON.stringify({
                    flightId,
                    passengerDetails,
                    contactPhone,
                    contactEmail: contactEmail || `${contactPhone}@afghanibaba.com`,
                    totalPrice: (flight?.price || 0) * numPassengers
                })
            });

            const data = await res.json();
            if (data.success) {
                router.push(`/flight-payment/${data.booking._id}`);
            } else {
                alert(data.message || "خطا در ثبت رزرو پرواز");
            }
        } catch (err) {
            console.error("Booking error:", err);
            alert("متأسفانه خطایی در سیستم رخ داد.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>;

    return (
        <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
            <Navbar />

            <main className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-12 gap-10">

                    {/* LEFT: PASSENGER FORM */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100">
                            <h1 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                                <User size={28} className="text-orange-500" />
                                مشخصات مسافرین
                            </h1>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                {passengerDetails.map((p, idx) => (
                                    <div key={idx} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 space-y-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-sm">{idx + 1}</div>
                                            <span className="font-black text-gray-900">مسافر {idx + 1}</span>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-black text-gray-400 mb-2 mr-2">نام و تخلص (کامل)</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={p.name}
                                                    onChange={e => updatePassenger(idx, 'name', e.target.value)}
                                                    className="w-full px-5 py-4 rounded-2xl border-2 border-transparent bg-white focus:border-orange-500 transition-all font-bold text-gray-800 shadow-sm"
                                                    placeholder="مثلاً: محمد احمدی"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-black text-gray-400 mb-2 mr-2">سن</label>
                                                    <input
                                                        required
                                                        type="number"
                                                        value={p.age}
                                                        onChange={e => updatePassenger(idx, 'age', e.target.value)}
                                                        className="w-full px-5 py-4 rounded-2xl border-2 border-transparent bg-white focus:border-orange-500 transition-all font-bold text-gray-800 shadow-sm"
                                                        placeholder="25"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-black text-gray-400 mb-2 mr-2">جنسیت</label>
                                                    <select
                                                        value={p.gender}
                                                        onChange={e => updatePassenger(idx, 'gender', e.target.value)}
                                                        className="w-full px-5 py-4 rounded-2xl border-2 border-transparent bg-white focus:border-orange-500 transition-all font-bold text-gray-800 shadow-sm appearance-none"
                                                    >
                                                        <option value="male">مرد</option>
                                                        <option value="female">زن</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-8 border-t border-gray-100">
                                    <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                        <Phone size={24} className="text-blue-500" />
                                        اطلاعات تماس و حساب
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-black text-gray-400 mb-2 mr-2">شماره موبایل</label>
                                            <input
                                                required
                                                type="tel"
                                                value={contactPhone}
                                                onChange={e => setContactPhone(e.target.value)}
                                                className="w-full px-5 py-4 rounded-2xl border-2 border-transparent bg-white focus:border-blue-500 transition-all font-bold text-gray-800 shadow-sm"
                                                placeholder="07XXXXXXXX"
                                            />
                                        </div>
                                        {!token && (
                                            <div>
                                                <label className="block text-xs font-black text-gray-400 mb-2 mr-2">رمز عبور (برای پیگیری رزرو)</label>
                                                <input
                                                    required
                                                    type="password"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    className="w-full px-5 py-4 rounded-2xl border-2 border-transparent bg-white focus:border-blue-500 transition-all font-bold text-gray-800 shadow-sm"
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    disabled={submitting}
                                    className="w-full py-6 bg-orange-500 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-orange-600 transform active:scale-95 transition-all flex items-center justify-center gap-4 border-b-8 border-orange-700 disabled:opacity-50"
                                >
                                    {submitting ? (
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                    ) : (
                                        <>
                                            <Ticket size={32} />
                                            تایید و ادامه به پرداخت
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT: TICKET SUMMARY */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden sticky top-32">
                            <div className="bg-gray-900 p-8 text-white relative">
                                <div className="absolute top-0 left-0 w-full h-full bg-orange-500/10 -skew-x-12"></div>
                                <h2 className="text-xl font-black mb-1 relative z-10">خلاصه پرواز</h2>
                                <p className="text-xs font-bold text-gray-400 relative z-10 italic">{flight?.airline} | {flight?.flightNumber}</p>
                            </div>

                            <div className="p-8 space-y-8">
                                <div className="flex justify-between items-center group" suppressHydrationWarning>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-gray-900 mb-1">{isMounted && flight?.departureTime ? new Date(flight.departureTime).toLocaleTimeString("fa-AF", { hour: '2-digit', minute: '2-digit' }) : "--:--"}</p>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{flight?.from}</p>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center px-4">
                                        <Plane size={20} className="text-orange-500 mb-2 rotate-90 group-hover:scale-110 transition-transform" />
                                        <div className="w-full h-px bg-dashed bg-gray-200"></div>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-2xl font-black text-gray-900 mb-1">{isMounted && flight?.arrivalTime ? new Date(flight.arrivalTime).toLocaleTimeString("fa-AF", { hour: '2-digit', minute: '2-digit' }) : "--:--"}</p>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{flight?.to}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-gray-50 flex flex-col">
                                    <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                                        <span>تعداد مسافرین:</span>
                                        <span className="text-gray-900 font-black">{numPassengers} نفر</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                                        <span>قیمت فی نفر:</span>
                                        <span className="text-gray-900 font-black">{flight?.price.toLocaleString()} AFN</span>
                                    </div>
                                    <div className="pt-6 mt-2 border-t-2 border-dashed border-gray-100 flex justify-between items-center">
                                        <span className="font-black text-gray-900 text-lg">مبلغ کل:</span>
                                        <span className="text-3xl font-black text-orange-500 italic">{(flight?.price * numPassengers).toLocaleString()} <span className="text-xs opacity-60">AFN</span></span>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-50 space-y-3">
                                    <div className="flex items-center gap-3 text-emerald-600 font-bold text-sm bg-emerald-50 p-4 rounded-2xl">
                                        <ShieldCheck size={20} />
                                        <span>صدور آنی بلیط پس از پرداخت</span>
                                    </div>
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

export default function FlightConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        }>
            <FlightConfirmationContent />
        </Suspense>
    );
}
