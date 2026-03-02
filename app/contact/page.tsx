"use client";

import React, { useEffect, useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";

const BranchesMap = dynamic(() => import("@/components/maps/BranchesMap"), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">Loading Map...</div>
});
import { Phone, Mail, MessageCircle, MapPin, Clock, Send, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface Branch {
    _id: string;
    name: string;
    city: string;
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
    latitude: number;
    longitude: number;
    isMainBranch: boolean;
}

export default function ContactPage() {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBranchId, setSelectedBranchId] = useState<string | undefined>(undefined);

    useEffect(() => {
        fetch('/api/branches')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setBranches(data.branches);
                    const mainBranch = data.branches.find((b: Branch) => b.isMainBranch);
                    if (mainBranch) setSelectedBranchId(mainBranch._id);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const handleBranchClick = (branchId: string) => {
        setSelectedBranchId(branchId);
        // Scroll to map on mobile
        if (window.innerWidth < 768) {
            document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-['Vazirmatn']" dir="rtl">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-[#002855] py-20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                    </div>
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black text-white mb-6"
                        >
                            با ما در <span className="text-[#D4AF37]">ارتباط</span> باشید
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed"
                        >
                            افغانی‌بابا با شبکه‌ای گسترده از شعب در سراسر افغانستان، آماده ارائه خدمات حضوری و آنلاین به شما عزیزان است.
                        </motion.p>
                    </div>
                </section>

                {/* Map & Branches Section */}
                <section id="map-section" className="container mx-auto px-4 py-16 -mt-10 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                        {/* List of Branches */}
                        <div className="lg:col-span-1 space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                            <h2 className="text-2xl font-bold text-[#002855] mb-6 flex items-center gap-3">
                                <MapPin className="text-[#D4AF37]" />
                                شعب افغانی‌بابا
                            </h2>

                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse h-40"></div>
                                ))
                            ) : (
                                branches.map((branch) => (
                                    <motion.div
                                        key={branch._id}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => handleBranchClick(branch._id)}
                                        className={`cursor-pointer p-6 rounded-2xl border-2 transition-all shadow-sm ${selectedBranchId === branch._id
                                            ? 'border-[#D4AF37] bg-orange-50/30'
                                            : 'border-white bg-white hover:border-gray-200'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-black text-lg text-[#002855]">{branch.name}</h3>
                                            {branch.isMainBranch && (
                                                <span className="bg-orange-100 text-[#D4AF37] px-2 py-1 rounded-lg text-[10px] font-bold">شعبه مرکزی</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 mb-4 flex items-start gap-2">
                                            <MapPin size={16} className="mt-0.5 flex-shrink-0 text-gray-400" />
                                            {branch.address}
                                        </p>
                                        <div className="flex flex-wrap gap-4 mt-auto">
                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                                <Phone size={14} className="text-[#D4AF37]" />
                                                {branch.phone}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-green-600">
                                                <MessageCircle size={14} />
                                                واتس‌اپ
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Interactive Map */}
                        <div className="lg:col-span-2 h-[500px] md:h-[600px] lg:h-[700px]">
                            <BranchesMap
                                branches={branches}
                                selectedBranchId={selectedBranchId}
                                onBranchSelect={(branch) => setSelectedBranchId(branch._id)}
                                className="h-full w-full"
                            />
                        </div>

                    </div>
                </section>

                {/* Contact Form Section */}
                <section className="bg-white py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-gray-100">
                            {/* Info Sidebar */}
                            <div className="bg-[#002855] p-10 text-white md:w-2/5 flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full -mr-16 -mt-16"></div>
                                <div className="relative z-10">
                                    <h2 className="text-3xl font-black mb-6">تماس مستقیم</h2>
                                    <p className="text-blue-100/80 mb-10 text-sm leading-relaxed">
                                        تیم پشتیبانی ما به صورت ۲۴ ساعته در تمام روزهای هفته آماده پاسخگویی به سوالات شماست.
                                    </p>

                                    <div className="space-y-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                                <Phone className="text-[#D4AF37]" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-blue-200">تلفن پشتیبانی</p>
                                                <p className="font-bold text-lg" dir="ltr">+93 700 123 456</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                                <Mail className="text-[#D4AF37]" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-blue-200">ایمیل سازمانی</p>
                                                <p className="font-bold text-lg">info@afghanibaba.af</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                                <Clock className="text-[#D4AF37]" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-blue-200">ساعات کاری</p>
                                                <p className="font-bold text-lg">۲۴ ساعته / ۷ روز هفته</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex gap-4">
                                    <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#D4AF37] transition-all">
                                        <span className="text-xl">📱</span>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#D4AF37] transition-all">
                                        <span className="text-xl">🐦</span>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#D4AF37] transition-all">
                                        <span className="text-xl">📘</span>
                                    </a>
                                </div>
                            </div>

                            {/* Form Area */}
                            <div className="p-10 md:w-3/5 bg-white">
                                <h3 className="text-2xl font-black text-[#002855] mb-8">ارسال پیام برای ما</h3>
                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">نام کامل</label>
                                        <input className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-3 outline-none focus:border-[#D4AF37] focus:bg-white transition font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">شماره تماس</label>
                                        <input className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-3 outline-none focus:border-[#D4AF37] focus:bg-white transition font-medium" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-gray-700">موضوع پیام</label>
                                        <select className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-3 outline-none focus:border-[#D4AF37] focus:bg-white transition font-medium appearance-none">
                                            <option>سوالی در مورد رزرو هتل</option>
                                            <option>پیشنهاد یا انتقاد</option>
                                            <option>همکاری با ما</option>
                                            <option>سایر موارد</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-gray-700">متن پیام</label>
                                        <textarea rows={4} className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-3 outline-none focus:border-[#D4AF37] focus:bg-white transition font-medium" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <button className="w-full bg-[#D4AF37] hover:bg-[#B08D26] text-white font-black text-lg py-5 rounded-2xl transition-all shadow-xl shadow-orange-100 flex items-center justify-center gap-3">
                                            ارسال پیام
                                            <Send size={20} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
