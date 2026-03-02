"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle, Calendar, Users, MapPin, Printer, Download, Home, Phone, Mail, ChevronRight, ChevronLeft } from "lucide-react";
import BranchesMap from "@/components/maps/BranchesMap";

const ConfirmationContent = () => {
    const searchParams = useSearchParams();
    const hotelName = searchParams?.get("hotelName");
    const roomType = searchParams?.get("roomType");
    const checkIn = searchParams?.get("checkIn");
    const checkOut = searchParams?.get("checkOut");
    const guests = searchParams?.get("guests");
    const firstName = searchParams?.get("firstName");
    const lastName = searchParams?.get("lastName");

    const [bookingId, setBookingId] = useState("");
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        // Generate a random booking ID
        const randomId = "AB-" + Math.random().toString(36).substr(2, 9).toUpperCase();
        setBookingId(randomId);

        // Fetch branches for the map
        fetch('/api/branches')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setBranches(data.branches);
                }
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col" style={{ direction: "rtl" }}>
            <Navbar />

            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Success Banner */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-green-100 text-center mb-10 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6 text-green-500 animate-bounce">
                            <CheckCircle className="h-10 w-10" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">رزرو شما با موفقیت تایید شد!</h1>
                        <p className="text-gray-500 mb-8 text-lg">با تشکر از اعتماد شما به افغانی‌بابا. جزئیات رزرو به ایمیل شما ارسال شد.</p>

                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <div className="bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
                                <div className="text-[10px] text-gray-400 mb-1">شماره رزرو (Ref ID)</div>
                                <div className="text-xl font-black text-blue-600 tracking-wider">{bookingId}</div>
                            </div>
                            <div className="bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
                                <div className="text-[10px] text-gray-400 mb-1">نام مسافر</div>
                                <div className="text-lg font-bold text-gray-800">{firstName} {lastName}</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Booking Details */}
                        <div className="md:col-span-2 space-y-8">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">جزئیات هتل و اتاق</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                                        <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                                            🏨
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">{hotelName}</h3>
                                            <p className="text-sm text-gray-600">{roomType}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                                                <Calendar className="h-3 w-3" />
                                                <span>تاریخ ورود</span>
                                            </div>
                                            <div className="font-bold text-gray-800">{checkIn}</div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                                                <Calendar className="h-3 w-3" />
                                                <span>تاریخ خروج</span>
                                            </div>
                                            <div className="font-bold text-gray-800">{checkOut}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Users className="h-4 w-4" />
                                        <span>تعداد مسافران: <b>{guests} نفر</b></span>
                                    </div>
                                </div>
                            </div>

                            {/* Support Branches Map */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">پشتیبانی حضوری</h2>
                                <p className="text-sm text-gray-600 mb-4 text-justify leading-relaxed">
                                    اگر به هر دلیلی نیاز به تغییر رزرو یا مشاوره حضوری دارید، همکاران ما در شعب افغانی‌بابا آماده خدمت‌رسانی به شما هستند.
                                </p>
                                <div className="rounded-xl overflow-hidden h-[300px] border border-gray-100">
                                    <BranchesMap branches={branches} className="w-full h-full" />
                                </div>
                            </div>
                        </div>

                        {/* Actions & Help */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-6">اقدامات</h3>
                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-100 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <Printer className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                                            <span className="text-sm font-medium">چاپ واچر</span>
                                        </div>
                                        <ChevronLeft className="h-4 w-4 text-gray-300 group-hover:text-blue-600" />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-100 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <Download className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                                            <span className="text-sm font-medium">دانلود PDF</span>
                                        </div>
                                        <ChevronLeft className="h-4 w-4 text-gray-300 group-hover:text-blue-600" />
                                    </button>
                                    <Link href="/" className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-100 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <Home className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                                            <span className="text-sm font-medium">بازگشت به خانه</span>
                                        </div>
                                        <ChevronLeft className="h-4 w-4 text-gray-300 group-hover:text-blue-600" />
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-orange-600 rounded-2xl p-6 text-white text-center shadow-lg shadow-orange-600/20">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-1">نیاز به پشتیبانی فوری؟</h3>
                                <p className="text-white/80 text-xs mb-6 px-4">۲۴ ساعته، ۷ روز هفته پاسخگوی تماس‌های شما هستیم.</p>
                                <div className="bg-white/10 py-3 rounded-xl font-black text-xl tracking-widest dir-ltr">
                                    +93 729 001 001
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default function HotelConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        }>
            <ConfirmationContent />
        </Suspense>
    );
}
