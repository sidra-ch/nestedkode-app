"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TrainTickets() {
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1,
  });

  const popularRoutes = [
    { from: "کابل", to: "مزار شریف", price: "از 150 افغانی", duration: "8 ساعت" },
    { from: "هرات", to:"کابل", price: "از 200 افغانی", duration: "12 ساعت" },
    { from: "مزار", to: "هرات", price: "از 180 افغانی", duration: "10 ساعت" },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 bg-linear-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto h-full max-w-6xl px-4 flex flex-col justify-center">
          <h1 className="text-right text-4xl font-bold text-white mb-4">
            خرید بلیط قطار
          </h1>
          <p className="text-right text-lg text-white/90 mb-8">
            رزرو آنلاین بلیط راه‌آهن در سراسر افغانستان
          </p>

          {/* Search Box */}
          <div className="rounded-2xl bg-white p-6 shadow-xl max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">مبدا</label>
                <input
                  type="text"
                  placeholder="کابل"
                  value={searchData.from}
                  onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-right"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">مقصد</label>
                <input
                  type="text"
                  placeholder="مزار شریف"
                  value={searchData.to}
                  onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-right"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تاریخ حرکت</label>
                <input
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>
              <div className="flex items-end">
                <button className="w-full rounded-lg bg-[#FDB713] px-6 py-3 font-semibold text-black hover:bg-[#e6a512]">
                  جستجو
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">مسیرهای محبوب قطار</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularRoutes.map((route, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {route.from} → {route.to}
                </h3>
                <span className="text-sm text-gray-500">{route.duration}</span>
              </div>
              <p className="text-2xl font-bold text-[#FDB713] mb-4">{route.price}</p>
              <Link
                href={`/search-results?from=${route.from}&to=${route.to}&type=train`}
                className="block w-full text-center rounded-lg border border-[#FDB713] px-4 py-2 font-semibold text-[#FDB713] hover:bg-[#fff7e0]"
              >
                مشاهده قطارها
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">چرا بلیط قطار از افغانی‌بابا؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">رزرو آنلاین سریع</h3>
              <p className="text-sm text-gray-600">خرید بلیط در کمتر از 2 دقیقه</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">انتخاب صندلی</h3>
              <p className="text-sm text-gray-600">انتخاب دقیق صندلی مورد نظر</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">قیمت مناسب</h3>
              <p className="text-sm text-gray-600">بهترین قیمت‌ها در بازار</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
