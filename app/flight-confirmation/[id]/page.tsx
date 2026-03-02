"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    Plane, Clock, Users, CheckCircle, ChevronLeft, Shield, AlertCircle
} from "lucide-react";

const mockFlights: Record<string, any> = {
    mock1: {
        _id: "mock1", airline: "Kam Air", flightNumber: "RQ-101",
        from: "کابل", to: "هرات",
        departureTime: new Date(Date.now() + 3600000 * 6),
        arrivalTime: new Date(Date.now() + 3600000 * 8),
        price: 4500, class: "economy", availableSeats: 42,
        logo: "✈️",
    },
    mock2: {
        _id: "mock2", airline: "Ariana Afghan", flightNumber: "FG-205",
        from: "کابل", to: "مزار شریف",
        departureTime: new Date(Date.now() + 3600000 * 10),
        arrivalTime: new Date(Date.now() + 3600000 * 12),
        price: 5200, class: "business", availableSeats: 12,
        logo: "🛩️",
    },
};

function FlightConfirmationContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = params?.id as string;

    const [flight, setFlight] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        firstName: "", lastName: "", phone: "", passport: "", nationality: "افغانستان"
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const passengers = Number(searchParams?.get("passengers")?.replace(/\D/g, "") || "1");
    const date = searchParams?.get("date") || "";

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            if (id?.startsWith("mock")) {
                setFlight(mockFlights[id] || null);
                setLoading(false);
                return;
            }
            try {
                const res = await fetch(`/api/flights/${id}`);
                const data = await res.json();
                if (data.success) setFlight(data.flight);
            } catch {
                setFlight(null);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.firstName.trim()) e.firstName = "نام الزامی است";
        if (!form.lastName.trim()) e.lastName = "نام خانوادگی الزامی است";
        if (!form.phone.trim()) e.phone = "شماره تماس الزامی است";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleContinue = () => {
        if (!validate()) return;
        const query = new URLSearchParams({
            flightId: id,
            passengerName: `${form.firstName} ${form.lastName}`,
            phone: form.phone,
            passport: form.passport,
            passengers: String(passengers),
            date,
            price: String((flight?.price || 0) * passengers),
            airline: flight?.airline || "",
            flightNumber: flight?.flightNumber || "",
            from: flight?.from || "",
            to: flight?.to || "",
        });
        router.push(`/flight-payment?${query.toString()}`);
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-50 font-['Vazirmatn']" dir="rtl">
            <Navbar />
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin w-12 h-12 rounded-full border-4 border-orange-200 border-t-orange-500" />
            </div>
            <Footer />
        </div>
    );

    if (!flight) return (
        <div className="min-h-screen bg-gray-50 font-['Vazirmatn']" dir="rtl">
            <Navbar />
            <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                <p className="text-6xl mb-4">✈️</p>
                <h1 className="text-2xl font-black text-gray-900 mb-2">پرواز یافت نشد</h1>
                <button onClick={() => router.push("/flights")}
                    className="mt-6 bg-orange-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition">
                    بازگشت به جستجو
                </button>
            </div>
            <Footer />
        </div>
    );

    const totalPrice = flight.price * passengers;

    return (
        <div className="min-h-screen bg-gray-50 font-['Vazirmatn']" dir="rtl">
            <Navbar />

            {/* Steps bar */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-center gap-3 text-sm">
                        {["جستجو", "تأیید مسافر", "پرداخت", "تکت"].map((step, i) => (
                            <div key={step} className="flex items-center gap-2">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${i === 1 ? "bg-orange-500 text-white" : i < 1 ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"}`}>
                                    {i < 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                                </div>
                                <span className={`font-bold hidden sm:block ${i === 1 ? "text-orange-600" : "text-gray-400"}`}>{step}</span>
                                {i < 3 && <ChevronLeft className="w-4 h-4 text-gray-200" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

                {/* Flight Summary Card */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">جزئیات پرواز</h2>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl">{flight.logo || "✈️"}</div>
                            <div>
                                <p className="font-black text-gray-900 text-lg">{flight.airline}</p>
                                <p className="text-orange-500 text-sm font-bold">{flight.flightNumber}</p>
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full font-bold text-gray-500">
                                    {flight.class === "economy" ? "اکونومی" : "بیزنس"}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 flex items-center justify-center gap-6">
                            <div className="text-center">
                                <p className="text-2xl font-black text-gray-900">
                                    {new Date(flight.departureTime).toLocaleTimeString("fa-AF", { hour: "2-digit", minute: "2-digit" })}
                                </p>
                                <p className="text-sm text-gray-500 font-bold">{flight.from}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Plane className="w-5 h-5 text-orange-400 mb-1" />
                                <div className="h-px w-16 bg-orange-200" />
                                <p className="text-xs text-gray-400 mt-1">مستقیم</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-black text-gray-900">
                                    {new Date(flight.arrivalTime).toLocaleTimeString("fa-AF", { hour: "2-digit", minute: "2-digit" })}
                                </p>
                                <p className="text-sm text-gray-500 font-bold">{flight.to}</p>
                            </div>
                        </div>

                        <div className="text-center bg-orange-50 rounded-2xl px-6 py-4">
                            <p className="text-xs text-gray-400 font-bold mb-1">قیمت هر نفر</p>
                            <p className="text-2xl font-black text-orange-600">{flight.price.toLocaleString()}</p>
                            <p className="text-xs text-gray-400">افغانستانی</p>
                        </div>
                    </div>

                    {date && (
                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-4 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span className="font-bold">{new Date(date).toLocaleDateString("fa-AF", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
                            <span className="flex items-center gap-1"><Users className="w-4 h-4" />{passengers} مسافر</span>
                        </div>
                    )}
                </div>

                {/* Passenger Form */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-lg font-black text-gray-900 mb-6">اطلاعات مسافر</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { key: "firstName", label: "نام *", placeholder: "نام" },
                            { key: "lastName", label: "نام خانوادگی *", placeholder: "نام خانوادگی" },
                            { key: "phone", label: "شماره تماس *", placeholder: "07xxxxxxx", dir: "ltr" },
                            { key: "passport", label: "شماره پاسپورت", placeholder: "اختیاری" },
                        ].map(f => (
                            <div key={f.key}>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{f.label}</label>
                                <input
                                    value={form[f.key as keyof typeof form]}
                                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                                    placeholder={f.placeholder}
                                    dir={f.dir}
                                    className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3 text-sm outline-none transition ${errors[f.key] ? "border-red-300 focus:border-red-400" : "border-gray-100 focus:border-orange-400"}`}
                                />
                                {errors[f.key] && <p className="text-red-500 text-xs mt-1">{errors[f.key]}</p>}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-700">نام مسافر باید دقیقاً مطابق با پاسپورت یا کارت ملی باشد. در غیر این صورت ممکن است اجازه پرواز داده نشود.</p>
                    </div>
                </div>

                {/* Price Summary */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-lg font-black text-gray-900 mb-4">خلاصه قیمت</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>قیمت بلیط ({passengers} نفر × {flight.price.toLocaleString()} افغانستانی)</span>
                            <span className="font-bold">{totalPrice.toLocaleString()} AFN</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>مالیات و عوارض</span>
                            <span className="font-bold">شامل قیمت</span>
                        </div>
                        <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                            <span className="font-black text-gray-900">مجموع پرداختی</span>
                            <span className="font-black text-2xl text-orange-600">{totalPrice.toLocaleString()} <span className="text-sm">AFN</span></span>
                        </div>
                    </div>
                </div>

                {/* Continue Button */}
                <div className="flex flex-col gap-3">
                    <button onClick={handleContinue}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl transition shadow-lg shadow-orange-100 text-base flex items-center justify-center gap-2">
                        ادامه و رفتن به مرحله پرداخت
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                        <Shield className="w-4 h-4" />
                        <span>اطلاعات شما کاملاً محفوظ است</span>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default function FlightConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin w-12 h-12 rounded-full border-4 border-orange-200 border-t-orange-500" />
            </div>
        }>
            <FlightConfirmationContent />
        </Suspense>
    );
}
