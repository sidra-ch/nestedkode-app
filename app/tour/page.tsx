"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { assetPath } from "@/lib/assetPath";

const mockTours = [
  { id: 1, name: "تور بامیان", city: "بامیان", duration: "۳ روز و ۲ شب", price: 250, image: assetPath("/assets/bamyan-tour.jpg"), available: true },
  { id: 2, name: "تور مزار شریف", city: "مزار شریف", duration: "۲ روز و ۱ شب", price: 180, image: assetPath("/assets/mazar-tour.jpg"), available: true },
  { id: 3, name: "تور هرات", city: "هرات", duration: "۳ روز و ۲ شب", price: 220, image: assetPath("/assets/herat-hero.jpg"), available: true },
  { id: 4, name: "تور پنجشیر", city: "پنجشیر", duration: "۲ روز و ۱ شب", price: 150, image: assetPath("/assets/panjshir-tour.jpg"), available: true },
  { id: 5, name: "تور قندهار", city: "قندهار", duration: "۳ روز و ۲ شب", price: 200, image: assetPath("/assets/kandahar-tour.jpg"), available: true },
  { id: 6, name: "تور کابل", city: "کابل", duration: "۱ روز", price: 80, image: assetPath("/assets/kabul-tour.jpg"), available: true },
];

export default function TourPage() {
  const [tours] = useState(mockTours);

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <Navbar />
      <main>
        <div className="relative h-48 overflow-hidden">
          <img src={assetPath("/assets/bamyan-tour.jpg")} alt="تور" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl font-semibold text-white">تور</h1>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-8">
          <h2 className="text-xl font-semibold text-slate-900 text-right mb-6">تورهای پیشنهادی</h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <div key={tour.id} className="group rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img src={tour.image} alt={tour.name} className="h-full w-full object-cover transition group-hover:scale-110" />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-slate-900">{tour.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{tour.city} - {tour.duration}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-[#FDB713]">${tour.price}</span>
                      <span className="text-xs text-slate-500 mr-1">هر نفر</span>
                    </div>
                    <button className="btn-primary text-xs">رزرو</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-8">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 text-right">تور | سفر به نقاط دیدنی افغانستان</h2>
            <p className="mt-4 text-sm text-slate-600 text-right">
              افغانی‌بابا بهترین تورهای داخلی افغانستان را با بهترین قیمت ارائه می‌دهد.
              از تور بامیان گرفته تا مزار شریف و هرات، بهترین تجربه سفر را با ما داشته باشید.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
