"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Plane, Bus, Hotel, Compass, Car,
    ChevronDown, User, HelpCircle, MapPin,
    ArrowRight, Smartphone, Lock, CheckCircle,
    ExternalLink, Phone, Mail, Instagram, Twitter, Facebook
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useAuthStore from "@/store/useAuthStore";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type Booking = {
    _id: string;
    busId?: {
        origin?: string;
        destination?: string;
        company?: string;
        departureTime?: string;
    };
    seats: number[];
    totalPrice: number;
    paymentStatus: string;
    status: string;
    bookingDate?: string;
};

export default function MyTravelsPage() {
    const router = useRouter();
    const { user, token, isAuthenticated } = useAuthStore();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            fetchBookings();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, token]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/api/booking`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setBookings(data.items || []);
            }
        } catch (err) {
            console.error("Error loading bookings:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex flex-col" dir="rtl">
            <Navbar />

            <main className="flex-1">
                {isAuthenticated ? (
                    /* AUTHENTICATED STATE */
                    <div className="container mx-auto px-4 py-8 md:py-12">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Sidebar Menu */}
                            <aside className="w-full md:w-64 space-y-2">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 font-['Noto_Sans_Arabic']">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                            <User size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{user?.name}</h3>
                                            <p className="text-xs text-gray-500">{user?.email}</p>
                                        </div>
                                    </div>
                                    <Link href="/profile" className="text-sm font-medium text-orange-600 hover:underline">مشاهده حساب کاربری</Link>
                                </div>

                                <nav className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 font-['Noto_Sans_Arabic']">
                                    <Link href="/mytravels" className="flex items-center gap-3 px-6 py-4 bg-orange-50 text-orange-600 border-r-4 border-orange-500 font-bold transition">
                                        <MapPin size={20} />
                                        <span>سفرهای من</span>
                                    </Link>
                                    <Link href="/help-center" className="flex items-center gap-3 px-6 py-4 text-gray-700 hover:bg-gray-50 transition">
                                        <HelpCircle size={20} />
                                        <span>مرکز پشتیبانی</span>
                                    </Link>
                                </nav>
                            </aside>

                            {/* Main Content */}
                            <section className="flex-1 font-['Noto_Sans_Arabic']">
                                <div className="flex items-center justify-between mb-8">
                                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">سفرهای من</h1>
                                    <div className="flex gap-2">
                                        {['همه', 'پرواز', 'هتل', 'اتوبوس'].map((tab) => (
                                            <button
                                                key={tab}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${tab === 'همه' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {loading ? (
                                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                                        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                        <p className="text-gray-500">در حال بارگذاری سفرها...</p>
                                    </div>
                                ) : bookings.length === 0 ? (
                                    <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
                                        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Compass size={64} className="text-gray-300" />
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">هنوز سفری ندارید!</h2>
                                        <p className="text-gray-500 mb-8 max-w-md mx-auto">چمدان‌هایتان را ببندید! اولین سفر خود را با افغانی‌بابا رزرو کنید و از تجربه یک سفر لذت‌بخش بهره‌مند شوید.</p>
                                        <Link
                                            href="/bus"
                                            className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold px-8 py-4 rounded-2xl hover:bg-orange-600 transition shadow-lg shadow-orange-200"
                                        >
                                            <span>جستجوی بلیط اتوبوس</span>
                                            <ArrowRight size={20} />
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {bookings.map((booking) => (
                                            <div key={booking._id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:border-orange-200 transition group">
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-orange-500 transition">
                                                            <Bus size={30} />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="font-bold text-lg text-gray-900">{booking.busId?.origin}</span>
                                                                <ArrowRight size={16} className="text-gray-400" />
                                                                <span className="font-bold text-lg text-gray-900">{booking.busId?.destination}</span>
                                                            </div>
                                                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                                                <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{booking.busId?.company}</span>
                                                                <span>{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString('fa-IR') : 'تاریخ نامشخص'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
                                                        <div className="text-left md:text-right">
                                                            <p className="text-xs text-gray-400 mb-1">مبلغ نهایی</p>
                                                            <p className="text-xl font-extrabold text-orange-500">{booking.totalPrice.toLocaleString()} <span className="text-xs font-normal">دلار</span></p>
                                                        </div>
                                                        <Link
                                                            href={`/my-bookings`}
                                                            className="bg-gray-50 text-gray-700 hover:bg-orange-50 hover:text-orange-600 px-5 py-3 rounded-xl text-sm font-bold transition flex items-center gap-2"
                                                        >
                                                            <span>جزئیات بلیط</span>
                                                            <ExternalLink size={16} />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                ) : (
                    /* UNAUTHENTICATED STATE - ALIBABA STYLE LOGIN */
                    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden py-12 px-4 font-['Noto_Sans_Arabic']">
                        {/* Background pattern similar to Alibaba */}
                        <div className="absolute inset-0 z-0 opacity-5">
                            <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-[100px] translate-x-1/2 translate-y-1/2"></div>
                        </div>

                        <div className="container max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
                            {/* Left Side Content */}
                            <div className="flex-1 text-right order-2 md:order-1 hidden md:block">
                                <h1 className="text-4xl lg:text-5xl font-extrabold text-[#333] mb-6 leading-tight">
                                    افغانی‌بابا رتبه یک سفر در افغانستان
                                </h1>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    برای خرید آسان و امن و مشاهده تخفیف‌های ویژه افغانی‌بابا، شماره موبایل خود را وارد کنید.
                                </p>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex items-center gap-4 bg-white/50 backdrop-blur p-4 rounded-2xl border border-white">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 font-bold">24/7</div>
                                        <p className="font-bold text-gray-700">پشتیبانی شبانه‌روزی</p>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white/50 backdrop-blur p-4 rounded-2xl border border-white">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold">تضمین</div>
                                        <p className="font-bold text-gray-700">ارزان‌ترین قیمت</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side Login Card */}
                            <div className="w-full md:w-[420px] order-1 md:order-2">
                                <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-2xl shadow-orange-100 border border-orange-50 transition-all hover:shadow-orange-200">
                                    <div className="mb-10 text-center">
                                        <div className="text-3xl font-black text-orange-500 mb-2">افغانی‌بابا</div>
                                        <p className="text-gray-500">سفرهای من</p>
                                    </div>

                                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-right">ورود یا ثبت‌نام</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-2 text-right">شماره موبایل</label>
                                            <div className="relative group">
                                                <input
                                                    type="tel"
                                                    placeholder="مثلاً ۰۹۱۲۳۴۵۶۷۸۹"
                                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 text-left font-medium text-lg focus:border-orange-400 focus:bg-white transition-all outline-none"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-400 border-r pr-3 h-6 cursor-default">
                                                    <Smartphone size={18} />
                                                    <span className="text-xs font-bold mr-1">+98</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => router.push("/login")}
                                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-lg py-5 rounded-[20px] transition-all shadow-xl shadow-orange-100 hover:shadow-orange-200 active:scale-[0.98]"
                                        >
                                            تایید و دریافت کد
                                        </button>

                                        <button
                                            onClick={() => router.push("/login")}
                                            className="w-full flex items-center justify-center gap-2 text-gray-500 font-bold text-sm hover:text-gray-900 transition-colors"
                                        >
                                            <Lock size={16} />
                                            <span>ورود با رمز عبور</span>
                                        </button>
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-gray-50">
                                        <p className="text-[11px] text-gray-400 leading-relaxed text-right">
                                            استفاده از افغانی‌بابا به معنی پذیرش <Link href="/" className="text-blue-500 hover:underline">قوانین و مقررات</Link> است. این سرویس طبق استانداردهای امنیتی طراحی شده است.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />

            <style jsx>{`
        .container {
          max-width: 1200px;
        }
      `}</style>
        </div>
    );
}
