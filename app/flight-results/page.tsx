"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Plane, Clock, ShieldCheck, Star, Users, MapPin, ChevronLeft, Filter, ArrowRight } from "lucide-react";

function FlightResultsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const origin = searchParams?.get("from") || "";
    const destination = searchParams?.get("to") || "";
    const date = searchParams?.get("date") || "";
    const passengers = searchParams?.get("passengers") || "1 نفر";
    const type = searchParams?.get("type") || "domestic";

    const [flights, setFlights] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        fetchFlights();
    }, [origin, destination, date, type]);

    const fetchFlights = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/flights?origin=${origin}&destination=${destination}&date=${date}&type=${type}`);
            const data = await res.json();
            if (data.success) {
                setFlights(data.flights);
            }
        } catch (err) {
            console.error("Fetch flights error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleBook = (flightId: string) => {
        const params = new URLSearchParams(searchParams?.toString() || "");
        router.push(`/flight-confirmation/${flightId}?${params.toString()}`);
    };

    if (!isMounted) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
            <Navbar />

            <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-10">

                {/* TOP SEARCH SUMMARY BOX */}
                <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-10 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-full bg-orange-500/5 -skew-x-12 transform translate-x-10"></div>

                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                            <Plane size={32} />
                        </div>
                        <div className="text-right">
                            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">{origin} <span className="text-orange-500 px-2">←</span> {destination}</h1>
                            <p className="text-gray-600 font-bold flex items-center gap-3">
                                <span>{date ? new Date(date).toLocaleDateString("fa-AF", { weekday: 'long', day: 'numeric', month: 'long' }) : "---"}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span>{passengers}</span>
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => router.push('/flights')}
                        className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-orange-500 transition-all hover:shadow-lg active:scale-95 flex items-center gap-2 group shrink-0"
                    >
                        <Filter size={18} className="group-hover:rotate-12 transition-transform" />
                        تغییر جستجو
                    </button>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">

                    {/* LEFT SIDEBAR FILTERS (DUMMY) */}
                    <div className="hidden lg:col-span-3 lg:block space-y-6">
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                            <h3 className="font-black text-gray-900 mb-6 border-b border-gray-50 pb-4">فیلترها</h3>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">ایرلاین‌ها</p>
                                    <div className="space-y-3">
                                        {['کام ایر', 'آریانا افغان', 'صافی'].map(airline => (
                                            <label key={airline} className="flex items-center gap-3 cursor-pointer group">
                                                <div className="w-5 h-5 rounded-md border-2 border-gray-200 group-hover:border-orange-500 transition-colors"></div>
                                                <span className="font-bold text-gray-600 group-hover:text-gray-900">{airline}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">زمان حرکت</p>
                                    <div className="space-y-3 font-bold text-sm text-gray-600">
                                        <p className="hover:text-orange-500 cursor-pointer">🌅 صبح (00:00 - 12:00)</p>
                                        <p className="hover:text-orange-500 cursor-pointer">☀️ بعد از ظهر (12:00 - 18:00)</p>
                                        <p className="hover:text-orange-500 cursor-pointer">🌙 شب (18:00 - 24:00)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-125 transition-transform"></div>
                            <h4 className="font-black text-xl mb-2 relative z-10">پیشنهاد ویژه</h4>
                            <p className="text-orange-100 text-sm font-medium mb-4 relative z-10">با رزرو از اپلیکیشن افغانی‌بابا ۱۰٪ تخفیف بگیرید.</p>
                            <button className="w-full py-3 bg-white text-orange-500 rounded-xl font-black text-xs hover:bg-orange-50 transition-colors relative z-10">دانلود اپلیکیشن</button>
                        </div>
                    </div>

                    {/* RESULTS LIST */}
                    <div className="lg:col-span-9 space-y-6">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100">
                                <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mb-4"></div>
                                <p className="font-black text-gray-400 italic">در حال جستجوی بهترین پروازها...</p>
                            </div>
                        ) : flights.length === 0 ? (
                            <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
                                <div className="text-6xl mb-6">🏜️</div>
                                <h3 className="text-2xl font-black text-gray-900 mb-2">پروازی یافت نشد</h3>
                                <p className="text-gray-400 font-medium mb-8">متأسفانه برای تاریخ و مسیر انتخاب شده پروازی موجود نیست.</p>
                                <button
                                    onClick={() => router.push('/flights')}
                                    className="px-10 py-4 bg-orange-500 text-white rounded-2xl font-black hover:bg-orange-600 transition shadow-xl"
                                >
                                    جستجوی مجدد
                                </button>
                            </div>
                        ) : (
                            flights.map((flight) => (
                                <div key={flight._id} className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-orange-200 transition-all flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">

                                    {/* Airline & Class */}
                                    <div className="w-full md:w-1/4 text-right flex flex-col items-center md:items-start border-b md:border-b-0 md:border-l border-gray-100 pb-6 md:pb-0">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                                                <Plane size={24} />
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 text-lg">{flight.airline}</p>
                                                <p className="text-xs font-black text-orange-500 italic uppercase tracking-wider">{flight.flightNumber}</p>
                                            </div>
                                        </div>
                                        <div className="px-4 py-1.5 bg-gray-100 text-gray-500 rounded-full text-xs font-black group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                            {flight.class === 'economy' ? 'اکونومی' : 'بیزنس'}
                                        </div>
                                    </div>

                                    {/* Route & Times */}
                                    <div className="w-full md:w-2/4 flex items-center justify-between gap-4">
                                        <div className="text-center">
                                            <p className="text-3xl font-black text-gray-900 mb-1">{new Date(flight.departureTime).toLocaleTimeString("fa-AF", { hour: '2-digit', minute: '2-digit' })}</p>
                                            <p className="text-sm font-bold text-gray-400 capitalize">{flight.from}</p>
                                        </div>

                                        <div className="flex-1 flex flex-col items-center">
                                            <div className="flex items-center w-full gap-2 mb-2">
                                                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                                <div className="flex-1 h-px bg-dashed bg-gradient-to-r from-gray-200 via-orange-300 to-gray-200 relative">
                                                    <Plane size={16} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-500 rotate-90" />
                                                </div>
                                                <div className="w-2 h-2 rounded-full border border-gray-300"></div>
                                            </div>
                                            <p className="text-[10px] font-black text-gray-400 italic">مستقیم (۲ ساعت)</p>
                                        </div>

                                        <div className="text-center">
                                            <p className="text-3xl font-black text-gray-900 mb-1">{new Date(flight.arrivalTime).toLocaleTimeString("fa-AF", { hour: '2-digit', minute: '2-digit' })}</p>
                                            <p className="text-sm font-bold text-gray-400 capitalize">{flight.to}</p>
                                        </div>
                                    </div>

                                    {/* Price & Action */}
                                    <div className="w-full md:w-1/4 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 bg-gray-50 group-hover:bg-orange-50/50 p-6 rounded-3xl transition-colors">
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest italic">قیمت تکت</p>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-3xl font-black text-orange-500">{flight.price.toLocaleString()}</span>
                                                <span className="text-xs font-black text-gray-400">افغانی</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleBook(flight._id)}
                                            className="px-8 py-4 bg-orange-500 text-white rounded-2xl font-black hover:bg-orange-600 transition-all shadow-lg active:scale-95 flex items-center gap-2 group/btn"
                                        >
                                            انتخاب
                                            <ChevronLeft size={18} className="group-hover/btn:-translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}

                        {/* SECURITY BADGE */}
                        <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 flex items-start gap-4">
                            <ShieldCheck className="text-emerald-500 shrink-0" size={32} />
                            <div>
                                <h4 className="font-black text-gray-900 mb-1">گارانتی پایین‌ترین قیمت</h4>
                                <p className="text-sm text-gray-600 font-medium leading-relaxed">افغانی‌بابا تضمین می‌کند که بهترین قیمت‌های ممکن برای پروازهای داخلی و خارجی را برای شما فراهم کرده است.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}

export default function FlightResultsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        }>
            <FlightResultsContent />
        </Suspense>
    );
}
