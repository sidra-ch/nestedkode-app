"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Accommodation() {
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
  });

  const featuredProperties = [
    { id: 1, name: "ویلای لوکس بامیان", location: "بامیان", price: 5000, guests: 6, image: null },
    { id: 2, name: "اقامتگاه سنتی هرات", location: "هرات", price: 3500, guests: 4, image: null },
    { id: 3, name: "کلبه کوهستانی پنجشیر", location: "پنجشیر", price: 4000, guests: 5, image: null },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 bg-linear-to-r from-green-600 to-green-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto h-full max-w-6xl px-4 flex flex-col justify-center">
          <h1 className="text-right text-4xl font-bold text-white mb-4">
            رزرو ویلا و اقامتگاه
          </h1>
          <p className="text-right text-lg text-white/90 mb-8">
            بهترین ویلاها و اقامتگاه‌های بومگردی در سراسر افغانستان
          </p>

          {/* Search Box */}
          <div className="rounded-2xl bg-white p-6 shadow-xl max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">مقصد</label>
                <input
                  type="text"
                  placeholder="شهر یا منطقه"
                  value={searchData.location}
                  onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-right"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ورود</label>
                <input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">خروج</label>
                <input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
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

      {/* Featured Properties */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">اقامتگاه‌های پیشنهادی</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <div key={property.id} className="rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.name}</h3>
                <p className="text-sm text-gray-600 mb-4">📍 {property.location}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">تا {property.guests} نفر</span>
                  <span className="text-xl font-bold text-[#FDB713]">
                    {property.price.toLocaleString()} <span className="text-sm text-gray-600">افغانی/شب</span>
                  </span>
                </div>
                <Link
                  href={`/accommodation/${property.id}`}
                  className="block w-full text-center rounded-lg bg-[#FDB713] px-4 py-2 font-semibold text-black hover:bg-[#e6a512]"
                >
                  مشاهده جزئیات
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">دسته‌بندی اقامتگاه‌ها</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "ویلا", icon: "🏡" },
              { name: "کلبه", icon: "🏔️" },
              { name: "اقامتگاه سنتی", icon: "🏘️" },
              { name: "بومگردی", icon: "🌾" },
            ].map((category) => (
              <div key={category.name} className="text-center p-6 rounded-lg border border-gray-200 hover:border-[#FDB713] hover:bg-[#fff7e0] transition cursor-pointer">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">مزایای رزرو با افغانی‌بابا</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">تایید فوری</h3>
            <p className="text-sm text-gray-600">تایید رزرو در کمترین زمان</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">پرداخت امن</h3>
            <p className="text-sm text-gray-600">پرداخت آنلاین با امنیت بالا</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
              <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">پشتیبانی ۲۴ ساعته</h3>
            <p className="text-sm text-gray-600">همراهی در تمام مراحل</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
