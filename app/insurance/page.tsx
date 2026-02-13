"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { assetPath } from "@/lib/assetPath";

const insuranceTypes = [
  { id: 1, name: "بیمه مسافرتی پایه", price: 15, coverage: "۵۰,۰۰۰ دلار", duration: "۷ روز", features: ["پوشش پزشکی", "بازگشت اضطراری"] },
  { id: 2, name: "بیمه مسافرتی استاندارد", price: 25, coverage: "۱۰۰,۰۰۰ دلار", duration: "۷ روز", features: ["پوشش پزشکی", "بازگشت اضطراری", "گم شدن چمدان"] },
  { id: 3, name: "بیمه مسافرتی ویژه", price: 40, coverage: "۲۰۰,۰۰۰ دلار", duration: "۷ روز", features: ["پوشش پزشکی", "بازگشت اضطراری", "گم شدن چمدان", "بیمه لغو سفر"] },
];

const countries = ["همه کشورها", "دوبی", "ترکیه", "هند", "ایران", "آلمان", "انگلستان"];

export default function InsurancePage() {
  const [selectedType, setSelectedType] = useState(insuranceTypes[0]);

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <Navbar />
      <main>
        <div className="relative h-48 overflow-hidden">
          <img src={assetPath("/assets/banner-5.jpg")} alt="بیمه" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl font-semibold text-white">بیمه مسافرتی</h1>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm mb-8">
            <h2 className="text-lg font-semibold text-slate-900 text-right mb-4">دریافت آنلاین بیمه مسافرتی</h2>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">کشور مقصد</label>
                <select className="input-field">
                  {countries.map((c) => (<option key={c}>{c}</option>))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">تاریخ سفر</label>
                <input type="date" className="input-field" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">مدت سفر (روز)</label>
                <input type="number" min="1" className="input-field" placeholder="تعداد روز" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {insuranceTypes.map((insurance) => (
              <div 
                key={insurance.id} 
                onClick={() => setSelectedType(insurance)}
                className={`cursor-pointer rounded-2xl border-2 p-6 transition ${
                  selectedType.id === insurance.id 
                    ? "border-[#FDB713] bg-white shadow-md" 
                    : "border-black/5 bg-white shadow-sm hover:shadow-md"
                }`}
              >
                <h3 className="text-base font-semibold text-slate-900">{insurance.name}</h3>
                <p className="mt-2 text-sm text-slate-600">پوشش: {insurance.coverage}</p>
                <p className="mt-1 text-sm text-slate-600">مدت: {insurance.duration}</p>
                <ul className="mt-4 space-y-2">
                  {insurance.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="text-[#FDB713]">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <span className="text-2xl font-bold text-[#FDB713]">${insurance.price}</span>
                  <span className="text-xs text-slate-500 mr-1">/هر نفر</span>
                </div>
                <button className={`mt-4 w-full rounded-full py-2 text-sm font-semibold transition ${
                  selectedType.id === insurance.id 
                    ? "bg-[#FDB713] text-black" 
                    : "border border-black/10 text-slate-600"
                }`}>
                  خرید آنلاین
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-8">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 text-right">بیمه مسافرتی | سفری امن</h2>
            <p className="mt-4 text-sm text-slate-600 text-right">
              افغانی‌بابا امکان خرید آنلاین بیمه مسافرتی را برای تمام مقاصد فراهم کرده است.
              با خرید بیمه، سفری بدون نگرانی را تجربه کنید.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
