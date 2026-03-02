"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, Info, Shield, Calendar, Users, MapPin, CreditCard, User, Mail, Phone, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";

const BranchesMap = dynamic(() => import("@/components/maps/BranchesMap"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">Loading Map...</div>
});

const CheckoutContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const hotelId = searchParams?.get("hotelId");
    const roomId = searchParams?.get("roomId");
    const checkIn = searchParams?.get("checkIn");
    const checkOut = searchParams?.get("checkOut");
    const guests = searchParams?.get("guests");

    const [hotel, setHotel] = useState<any>(null);
    const [selectedRoom, setSelectedRoom] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [branches, setBranches] = useState<any[]>([]);

    // Form State
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialRequests: ""
    });

    useEffect(() => {
        if (!hotelId) return;

        // Fetch hotel details
        fetch(`/api/hotels/${hotelId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setHotel(data.hotel);
                    // Find selected room
                    if (roomId !== null && data.hotel.rooms) {
                        // Check if roomId is an index or an _id
                        const room = data.hotel.rooms.find((r: any, idx: number) => r._id === roomId || idx.toString() === roomId);
                        setSelectedRoom(room || data.hotel.rooms[0]);
                    }
                }
            })
            .finally(() => setLoading(false));

        // Fetch branches for the map
        fetch('/api/branches')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setBranches(data.branches);
                }
            });
    }, [hotelId, roomId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, we would call an API to create the booking
        // For now, we'll just redirect to the confirmation page
        const confirmUrl = `/booking-confirm/hotel?hotelId=${hotelId}&hotelName=${encodeURIComponent(hotel?.name)}&roomType=${encodeURIComponent(selectedRoom?.roomType)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&firstName=${formData.firstName}&lastName=${formData.lastName}`;
        router.push(confirmUrl);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    const durationInDays = () => {
        if (!checkIn || !checkOut) return 1;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 1;
    };

    const totalPrice = (selectedRoom?.price || 0) * durationInDays();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col" style={{ direction: "rtl" }}>
            <Navbar />

            <main className="flex-1 py-12">
                <div className="container mx-auto px-4">
                    {/* Progress Header */}
                    <div className="flex items-center justify-center mb-12">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                                <span className="text-gray-900 font-bold">اطلاعات مسافر</span>
                            </div>
                            <div className="w-16 h-[2px] bg-gray-200"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold">2</div>
                                <span className="text-gray-400">تایید و پرداخت</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Column: Form */}
                        <div className="lg:w-2/3 space-y-8">
                            {/* Guest Details */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="bg-blue-50 p-3 rounded-xl">
                                        <User className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">مشخصات مسافر اصلی</h2>
                                </div>

                                <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">نام</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="نام خود را وارد کنید"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">نام خانوادگی</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="نام خانوادگی خود را وارد کنید"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">ایمیل</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="example@mail.com"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-left"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">شماره تماس</label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+93 7XX XXX XXX"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-left"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-medium text-gray-700">درخواست‌های ویژه (اختیاری)</label>
                                        <textarea
                                            rows={4}
                                            placeholder="اگر توضیحاتی دارید اینجا بنویسید..."
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            value={formData.specialRequests}
                                            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Payment Info */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="bg-green-50 p-3 rounded-xl">
                                        <CreditCard className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">روش پرداخت</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    <div className="border-2 border-blue-600 bg-blue-50/50 rounded-2xl p-6 relative cursor-pointer">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-5 h-5 rounded-full border-4 border-blue-600 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                            </div>
                                            <span className="font-bold text-gray-900">کارت‌های عضو شتاب</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mr-8">پرداخت آنلاین با تمامی کارت‌های بانکی عضو شتاب</p>
                                    </div>

                                    <div className="border border-gray-100 rounded-2xl p-6 relative cursor-not-allowed opacity-60">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-5 h-5 rounded-full border border-gray-300"></div>
                                            <span className="font-bold text-gray-900">کیف پول</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mr-8">موجودی کافی نیست</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-4">
                                    <Shield className="h-5 w-5 text-blue-600 mt-1" />
                                    <div>
                                        <div className="font-bold text-gray-900 text-sm">پرداخت امن</div>
                                        <p className="text-xs text-gray-600 mt-1">کلیه پرداخت‌های شما از طریق درگاه‌های بانکی معتبر و پروتکل امن SSL انجام می‌شود.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Support Map */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">دفاتر و شعب پشتیبانی</h2>
                                <div className="rounded-xl overflow-hidden h-[300px] border border-gray-100">
                                    <BranchesMap branches={branches} className="w-full h-full" />
                                </div>
                                <p className="text-xs text-gray-500 mt-4">شما می‌توانید برای دریافت بلیط فیزیکی یا تغییر رزرو به هر یک از شعب ما مراجعه کنید.</p>
                            </div>
                        </div>

                        {/* Right Column: Summary */}
                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-4">
                                <div className="bg-blue-600 p-6 text-white text-center">
                                    <h3 className="text-xl font-bold">خلاصه رزرو</h3>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2 truncate">{hotel?.name}</h4>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <MapPin className="h-3 w-3" />
                                            <span>{hotel?.city}</span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-[10px] text-gray-400 mb-1">تاریخ ورود</div>
                                            <div className="text-sm font-bold text-gray-800">{checkIn || '---'}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-400 mb-1">تاریخ خروج</div>
                                            <div className="text-sm font-bold text-gray-800">{checkOut || '---'}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">نوع اتاق:</span>
                                            <span className="text-gray-900 font-medium">{selectedRoom?.roomType}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">مدت اقامت:</span>
                                            <span className="text-gray-900 font-medium">{durationInDays()} شب</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">تعداد مسافر:</span>
                                            <span className="text-gray-900 font-medium">{guests || 1} نفر</span>
                                        </div>
                                    </div>

                                    <hr className="border-gray-100" />

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">قیمت هر شب:</span>
                                            <span className="text-gray-900 font-medium">{selectedRoom?.price.toLocaleString()} افغانی</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-extrabold">
                                            <span className="text-gray-900">مبلغ کل:</span>
                                            <span className="text-blue-600">{totalPrice.toLocaleString()} افغانی</span>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        form="checkout-form"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md mt-6"
                                    >
                                        تایید و پرداخت نهایی
                                    </button>

                                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                                        <Shield className="h-3 w-3" />
                                        <span>ضمانت بهترین قیمت افغانی‌بابا</span>
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
};

export default function HotelCheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
