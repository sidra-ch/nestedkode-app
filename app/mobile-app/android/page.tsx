"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Download, ChevronLeft } from "lucide-react";

export default function AndroidAppPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-white relative" dir="rtl">
            <Navbar />

            <main className="flex-1 w-full relative">
                {/* Hero Section */}
                <section className="bg-gray-50 pt-16 pb-20 border-b border-gray-100 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-3xl -mr-[400px] -mt-[400px]"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl -ml-[300px] -mb-[300px]"></div>

                    <div className="max-w-6xl mx-auto px-4 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">

                            {/* Text Content */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                                        اپلیکیشن <span className="text-orange-500">افغانی‌بابا</span>
                                    </h1>
                                    <p className="text-xl text-gray-600 font-bold">کاربردی‌ترین اپلیکیشن سفر</p>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-gray-600 font-medium leading-relaxed max-w-lg">
                                        سریع‌تر و مطمئن‌تر به سفر بروید. اپلیکیشن افغانی‌بابا را دانلود کنید و از تمام خدمات سفر در هر جای و هر زمان استفاده کنید. پوشش کامل پروازها، قطارها، اتوبوس‌ها، تورها، هتل‌ها و اقامتگاه‌ها در یک اپلیکیشن.
                                    </p>
                                </div>

                                {/* Download Links */}
                                <div className="space-y-6 pt-4">
                                    <h3 className="font-bold text-gray-900 text-lg">دانلود نسخه اندروید</h3>

                                    <div className="flex flex-wrap gap-4">
                                        <a href="#" className="flex items-center gap-3 px-6 py-4 border-2 border-gray-200 text-gray-900 rounded-2xl hover:border-orange-500 hover:text-orange-500 transition group hover:-translate-y-1">
                                            <div className="text-3xl">☕</div>
                                            <div className="text-right">
                                                <div className="font-black">کافه بازار</div>
                                            </div>
                                        </a>

                                        <a href="#" className="flex items-center gap-3 px-6 py-4 border-2 border-gray-200 text-gray-900 rounded-2xl hover:border-orange-500 hover:text-orange-500 transition group hover:-translate-y-1">
                                            <div className="text-3xl">Ⓜ️</div>
                                            <div className="text-right">
                                                <div className="font-black">مایکت</div>
                                            </div>
                                        </a>

                                        <a href="#" className="flex items-center gap-3 px-6 py-4 border-2 border-gray-200 text-orange-500 border-orange-500 bg-orange-50 rounded-2xl hover:bg-orange-100 transition group hover:-translate-y-1 shadow-sm">
                                            <Download className="text-orange-500 transition-colors" size={24} />
                                            <div className="text-right font-black">
                                                دانلود مستقیم
                                            </div>
                                        </a>
                                    </div>

                                    <div className="flex gap-6 mt-4">
                                        <a href="#" className="inline-flex items-center gap-2 text-gray-600 font-bold hover:text-gray-900 transition group">
                                            دانلود نسخه iOS
                                            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform border border-gray-300 rounded-full p-0.5" />
                                        </a>
                                        <a href="#" className="inline-flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600 transition group">
                                            استفاده از وب‌اپلیکیشن
                                            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform border border-orange-300 rounded-full p-0.5" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Hero Image & QR code */}
                            <div className="relative flex justify-center lg:justify-end">
                                {/* The main hero app screenshot/mockup */}
                                <div className="relative w-full max-w-[400px] lg:max-w-[500px] z-20">
                                    <Image
                                        src="/assets/mobile app/app-1.webp"
                                        alt="Afghanibaba App"
                                        width={500}
                                        height={600}
                                        className="w-full h-auto drop-shadow-2xl"
                                        priority
                                    />

                                    {/* QR Code floating card */}
                                    <div className="absolute -left-10 md:left-0 bottom-10 bg-white p-4 rounded-3xl shadow-2xl border border-gray-50 flex items-center gap-4 animate-bounce hover:animate-none transition-all duration-300">
                                        <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center p-2">
                                            <Image src="/assets/mobile app/app-5.svg" alt="QR Code" width={64} height={64} className="w-full h-full" />
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900 text-sm mb-1">برای دانلود اسکن کنید</p>
                                            <a href="#" className="text-xs text-orange-500 font-bold hover:underline">مشاهده لینک‌های دانلود</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Statistics Section */}
                <section className="py-16 bg-white border-b border-gray-100">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-100">

                            <div className="flex flex-col items-center text-center pt-8 md:pt-0">
                                <Image src="/assets/mobile app/app-2.svg" alt="Users" width={64} height={64} className="mb-4 w-16 h-16" />
                                <h3 className="text-4xl font-black text-gray-900 mb-2 mt-2">۵,۶۰۰,۰۰۰</h3>
                                <p className="text-gray-500 font-bold">بیش از تعداد نصب</p>
                            </div>

                            <div className="flex flex-col items-center text-center pt-8 md:pt-0">
                                <Image src="/assets/mobile app/app-3.svg" alt="Satisfaction" width={64} height={64} className="mb-4 w-16 h-16" />
                                <h3 className="text-4xl font-black text-gray-900 mb-2 mt-2">۹۴٪</h3>
                                <p className="text-gray-500 font-bold">بیش از رضایت کاربران</p>
                            </div>

                            <div className="flex flex-col items-center text-center pt-8 md:pt-0">
                                <Image src="/assets/mobile app/app-4.svg" alt="Orders" width={64} height={64} className="mb-4 w-16 h-16" />
                                <h3 className="text-4xl font-black text-gray-900 mb-2 mt-2">۱۴,۰۰۰,۰۰۰</h3>
                                <p className="text-gray-500 font-bold">سفارش موفق محصولات گردشگری</p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-24 bg-gray-50 overflow-hidden">
                    <div className="max-w-6xl mx-auto px-4 space-y-32">

                        {/* Feature 1 */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-500/10 rounded-full blur-3xl -z-10"></div>
                                <Image src="/assets/mobile app/app-6.webp" alt="Experiences" width={500} height={500} className="w-full max-w-[450px] mx-auto drop-shadow-xl" />
                            </div>
                            <div className="order-1 md:order-2 space-y-4">
                                <h3 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">همهٔ سفر، در یک اپلیکیشن</h3>
                                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                    پوشش کامل پروازها، قطارها، اتوبوس‌ها، تورها، هتل‌ها و اقامتگاه‌ها.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2: Alibaba Plus (Afghanibaba Plus) */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-4">
                                <h3 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">تجربه‌های ناب مسافران قبلی در افغانی‌بابا پلاس</h3>
                                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                    مشاهده هزاران تجربه دست اول از جاذبه‌های دیدنی + امکان ثبت تجربه.
                                </p>
                            </div>
                            <div className="relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
                                <Image src="/assets/mobile app/app-10.webp" alt="Plus" width={500} height={500} className="w-full max-w-[450px] mx-auto drop-shadow-xl" />
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
                                <Image src="/assets/mobile app/app-7.png" alt="Price Calendar" width={500} height={500} className="w-full max-w-[450px] mx-auto drop-shadow-xl" />
                            </div>
                            <div className="order-1 md:order-2 space-y-4">
                                <h3 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">مشاهده به‌صرفه‌ترین زمان سفر</h3>
                                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                    نمایش ارزان‌ترین بلیط روزهای قبل و بعد، با تقویم قیمتی افغانی‌بابا.
                                </p>
                            </div>
                        </div>

                        {/* Feature 4 */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-4">
                                <h3 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">مشاهده به‌صرفه‌ترین راه‌های سفر</h3>
                                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                    امکان مقایسه قیمت بلیط پرواز، قطار و اتوبوس برای مقصد دلخواه.
                                </p>
                            </div>
                            <div className="relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
                                <Image src="/assets/mobile app/app-8.webp" alt="Compare prices" width={500} height={500} className="w-full max-w-[450px] mx-auto drop-shadow-xl" />
                            </div>
                        </div>

                        {/* Feature 5 */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-500/10 rounded-full blur-3xl -z-10"></div>
                                <Image src="/assets/mobile app/app-9.webp" alt="Peace of mind" width={500} height={500} className="w-full max-w-[450px] mx-auto drop-shadow-xl" />
                            </div>
                            <div className="order-1 md:order-2 space-y-4">
                                <h3 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">خریدی آگاهانه، سفری لذت‌بخش</h3>
                                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                    مشاهده اطلاعات کامل بلیط‌ها، تورها و تصاویر هتل‌ها قبل از خرید.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Bottom Services Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-12">

                        <div className="text-center space-y-4 pr-0 lg:pr-8">
                            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-500">
                                <Image src="/assets/mobile app/app-11.svg" alt="Refund" width={48} height={48} className="w-12 h-12" />
                            </div>
                            <h4 className="text-xl font-black text-gray-900">سفر با خیال آسوده</h4>
                            <p className="text-gray-500 font-medium pb-2">استرداد آنلاین و آسان</p>
                        </div>

                        <div className="text-center space-y-4 px-0 lg:px-4">
                            <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-500">
                                <Image src="/assets/mobile app/app-12.svg" alt="News" width={48} height={48} className="w-12 h-12" />
                            </div>
                            <h4 className="text-xl font-black text-gray-900">دانستنی‌های سفر</h4>
                            <p className="text-gray-500 font-medium pb-2">پوشش داغ‌ترین اخبار و اطلاعات سفر</p>
                        </div>

                        <div className="text-center space-y-4 pl-0 lg:pl-8">
                            <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-orange-500">
                                <Image src="/assets/mobile app/app-13.svg" alt="Support" width={48} height={48} className="w-12 h-12" />
                            </div>
                            <h4 className="text-xl font-black text-gray-900">پشتیبانی ۲۴ساعته</h4>
                            <p className="text-gray-500 font-medium pb-2">پاسخگویی شایسته در همه ایام سال</p>
                        </div>

                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
