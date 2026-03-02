"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Plane, Clock, ShieldCheck, Star, Users, MapPin, ChevronLeft, Filter, ArrowRight } from "lucide-react";

// Mock flight data matching Alibaba structure but for Afghan routes
const MOCK_FLIGHTS = [
    {
        _id: "mock1",
        airline: "کام ایر",
        airlineCode: "RQ",
        flightNumber: "RQ-112",
        class: "economy",
        ticketType: "سیستمی",
        aircraft: "Boeing 737",
        from: "کابل",
        to: "هرات",
        departureTime: "2026-03-25T08:00:00",
        arrivalTime: "2026-03-25T09:15:00",
        price: 4500,
        availableSeats: 5,
        rating: 4.5
    },
    {
        _id: "mock2",
        airline: "آریانا افغان",
        airlineCode: "FG",
        flightNumber: "FG-405",
        class: "economy",
        ticketType: "سیستمی",
        aircraft: "Airbus A310",
        from: "کابل",
        to: "هرات",
        departureTime: "2026-03-25T14:30:00",
        arrivalTime: "2026-03-25T15:45:00",
        price: 4200,
        availableSeats: 9,
        rating: 4.2
    },
    {
        _id: "mock3",
        airline: "کام ایر",
        airlineCode: "RQ",
        flightNumber: "RQ-208",
        class: "business",
        ticketType: "سیستمی",
        aircraft: "Boeing 737",
        from: "کابل",
        to: "هرات",
        departureTime: "2026-03-25T18:00:00",
        arrivalTime: "2026-03-25T19:15:00",
        price: 8500,
        availableSeats: 2,
        rating: 4.8
    },
    {
        _id: "mock4",
        airline: "آریانا افغان",
        airlineCode: "FG",
        flightNumber: "FG-301",
        class: "economy",
        ticketType: "چارتر",
        aircraft: "Boeing 737",
        from: "کابل",
        to: "هرات",
        departureTime: "2026-03-25T06:15:00",
        arrivalTime: "2026-03-25T07:30:00",
        price: 3800,
        availableSeats: 12,
        rating: 4.0
    }
];

function FlightResultsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const originParam = searchParams?.get("from") || "";
    const destinationParam = searchParams?.get("to") || "";
    const dateParam = searchParams?.get("date") || "";
    const passengers = searchParams?.get("passengers") || "1 نفر";

    const origin = originParam || "کابل";
    const destination = destinationParam || "هرات";
    const date = dateParam || new Date().toISOString();

    const [flights, setFlights] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const [sortBy, setSortBy] = useState("پیشنهاد افغانی‌بابا");

    useEffect(() => {
        setIsMounted(true);
        // Simulate API fetch delay for realism
        const timer = setTimeout(() => {
            setFlights(MOCK_FLIGHTS);
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [origin, destination, date]);

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

    const sortOptions = ["پیشنهاد افغانی‌بابا", "زودترین", "دیرترین", "ارزان‌ترین", "گران‌ترین"];

    return (
        <div className="min-h-screen bg-[#f3f4f6] flex flex-col font-sans" dir="rtl">
            <Navbar />

            <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 py-8">

                {/* Top Summary Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 gap-4">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                            بلیط هواپیما {origin} به {destination}
                        </h1>
                        <p className="text-sm text-gray-500 flex items-center gap-3">
                            <span>{new Date(date).toLocaleDateString("fa-AF", { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span>{passengers}</span>
                        </p>
                    </div>

                    <button
                        onClick={() => router.push('/flights')}
                        className="px-6 py-2.5 border border-orange-500 text-orange-500 rounded-lg text-sm font-bold hover:bg-orange-50 transition-colors"
                    >
                        تغییر جستجو
                    </button>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">

                    {/* Right Sidebar Filters */}
                    <div className="hidden lg:col-span-3 lg:block space-y-4">
                        {/* Results count */}
                        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-sm">
                            <span className="text-gray-500">نتایج: </span>
                            <span className="font-bold text-gray-900">{flights.length}</span>
                        </div>

                        {/* Filters Box */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden text-sm">

                            {/* Ticket Type */}
                            <div className="p-4 border-b border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4">نوع بلیط</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500" defaultChecked />
                                        <span className="text-gray-700">سیستمی</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500" defaultChecked />
                                        <span className="text-gray-700">چارتر</span>
                                    </label>
                                </div>
                            </div>

                            {/* Class */}
                            <div className="p-4 border-b border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4">کلاس پروازی</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500" defaultChecked />
                                        <span className="text-gray-700">اکونومی</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500" defaultChecked />
                                        <span className="text-gray-700">بیزینس</span>
                                    </label>
                                </div>
                            </div>

                            {/* Airlines */}
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 mb-4">شرکت‌های هواپیمایی</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <input type="checkbox" className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500" defaultChecked />
                                            <span className="text-gray-700">کام ایر</span>
                                        </div>
                                        <span className="text-xs text-gray-400">از ۴,۵۰۰</span>
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <input type="checkbox" className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500" defaultChecked />
                                            <span className="text-gray-700">آریانا افغان</span>
                                        </div>
                                        <span className="text-xs text-gray-400">از ۳,۸۰۰</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Results Area */}
                    <div className="lg:col-span-9 space-y-4">

                        {/* Date Carousel (Mock) */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-2 overflow-x-auto scollbar-hide items-center justify-between text-sm">
                            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"><ChevronLeft className="w-4 h-4 rotate-180" /></button>
                            <div className="flex gap-2 w-full justify-between">
                                {[
                                    { day: "چهارشنبه - 12/27", price: "5,881" },
                                    { day: "پنج‌شنبه - 12/28", price: "7,222" },
                                    { day: "جمعه - 12/29", price: "5,168" },
                                    { day: "شنبه - 01/01", price: "5,250" },
                                    { day: "یکشنبه - 01/02", price: "5,619" },
                                    { day: "دوشنبه - 01/03", price: "6,032" },
                                ].map((d, i) => (
                                    <div key={i} className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer min-w-[90px] ${i === 2 ? 'bg-orange-50 border border-orange-200 text-orange-600' : 'hover:bg-gray-50 text-gray-500'}`}>
                                        <span className="text-[11px] mb-1">{d.day}</span>
                                        <span className={`font-bold ${i === 2 ? 'text-orange-600' : 'text-gray-900'}`}>{d.price}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
                        </div>

                        {/* Sorting Bar */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap items-center gap-4 text-sm">
                            <span className="text-gray-500">مرتب‌سازی:</span>
                            {sortOptions.map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => setSortBy(opt)}
                                    className={`px-3 py-1.5 rounded-md transition-colors ${sortBy === opt ? 'bg-orange-50 text-orange-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {opt}
                                </button>
                            ))}
                            <span className="text-[11px] text-gray-400 mr-auto block w-full md:w-auto mt-2 md:mt-0 text-left">
                                قیمت‌ها برای یک بزرگسال محاسبه شده است.
                            </span>
                        </div>


                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-100">
                                <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mb-4"></div>
                                <p className="font-bold text-gray-500">در حال جستجوی پروازها...</p>
                            </div>
                        ) : flights.length === 0 ? (
                            <div className="bg-white rounded-xl p-16 text-center border border-gray-100 shadow-sm">
                                <div className="text-6xl mb-6">🏜️</div>
                                <h3 className="text-2xl font-black text-gray-900 mb-2">پروازی یافت نشد</h3>
                                <p className="text-gray-400 font-medium mb-8">متأسفانه برای تاریخ و مسیر انتخاب شده پروازی موجود نیست.</p>
                                <button
                                    onClick={() => router.push('/flights')}
                                    className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition"
                                >
                                    جستجوی مجدد
                                </button>
                            </div>
                        ) : (
                            flights.map((flight) => (
                                <div key={flight._id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all flex flex-col md:flex-row relative overflow-hidden group">

                                    {/* Main Flight Info (70%) */}
                                    <div className="w-full md:w-[75%] p-5 flex flex-col justify-between">

                                        {/* Top row: tags */}
                                        <div className="flex gap-2 mb-4">
                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                                {flight.ticketType}
                                            </span>
                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                                {flight.class === 'economy' ? 'اکونومی' : 'بیزینس'}
                                            </span>
                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                                {flight.aircraft}
                                            </span>
                                        </div>

                                        {/* Middle row: Airline & Times */}
                                        <div className="flex items-center gap-6">
                                            {/* Airline Brand */}
                                            <div className="flex items-center gap-3 w-32 border-l border-gray-100 pl-4 shrink-0">
                                                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center font-bold text-gray-400 text-xl overflow-hidden shadow-sm">
                                                    {flight.airlineCode}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">{flight.airline}</p>
                                                </div>
                                            </div>

                                            {/* Times & Route */}
                                            <div className="flex-1 flex items-center justify-between px-4">
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-gray-900 leading-none mb-1">
                                                        {new Date(flight.departureTime).toLocaleTimeString("fa-AF", { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{flight.from}</p>
                                                </div>

                                                <div className="flex-1 flex flex-col items-center px-4">
                                                    <div className="flex items-center w-full gap-2 relative">
                                                        <div className="w-2 h-2 rounded-full border border-gray-300"></div>
                                                        <div className="flex-1 h-px bg-gray-300 relative">
                                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-gray-400 bg-white px-2 text-[10px]">
                                                                ۱ ساعت و ۱۵ دقیقه
                                                            </div>
                                                        </div>
                                                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                                    </div>
                                                </div>

                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-gray-900 leading-none mb-1">
                                                        {new Date(flight.arrivalTime).toLocaleTimeString("fa-AF", { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{flight.to}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom row: Links */}
                                        <div className="flex gap-4 mt-6 text-xs font-bold text-orange-500 mt-auto">
                                            <button className="hover:text-orange-600">اطلاعات پرواز</button>
                                            <button className="hover:text-orange-600">قوانین استرداد</button>
                                        </div>

                                    </div>

                                    {/* Action Area (25%) */}
                                    <div className="w-full md:w-[25%] bg-gray-50 border-t md:border-t-0 md:border-r border-gray-100 p-5 flex flex-col justify-center items-center md:items-stretch group-hover:bg-orange-50/30 transition-colors">

                                        <div className="text-center mb-4">
                                            <div className="flex items-baseline justify-center gap-1 mb-1">
                                                <span className="text-2xl font-bold text-orange-500">{flight.price.toLocaleString()}</span>
                                                <span className="text-xs text-gray-500">افغانی</span>
                                            </div>
                                            <p className="text-[10px] text-gray-400">نرخ رسمی ایرلاین</p>
                                        </div>

                                        <button
                                            onClick={() => handleBook(flight._id)}
                                            className="w-full py-2.5 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition shadow-sm"
                                        >
                                            انتخاب پرواز
                                        </button>

                                        {flight.availableSeats < 10 && (
                                            <p className="text-[11px] text-red-500 text-center mt-2 font-bold">
                                                {flight.availableSeats} صندلی باقی مانده
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
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
