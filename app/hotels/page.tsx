"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { assetPath } from "@/lib/assetPath";

const hotelStars = ["همه ستاره‌ها", "۵ ستاره", "۴ ستاره", "۳ ستاره", "۲ ستاره", "یک ستاره"];
const cities = ["کابل", "مزار شریف", "هرات", "قندهار", "بامیان"];

const mockHotels = [
  { id: 1, name: "هتل بین‌المللی کابل", city: "کابل", stars: 5, price: 150, rating: 4.8, amenities: ["وای‌فای", "استخر", "رستوران", "پارکینگ"], image: assetPath("/assets/kabul-hero.jpg") },
  { id: 2, name: "هتل سیتی کابل", city: "کابل", stars: 4, price: 90, rating: 4.5, amenities: ["وای‌فای", "رستوران", "پارکینگ"], image: assetPath("/assets/banner-2.jpg") },
  { id: 3, name: "هتل مزار", city: "مزار شریف", stars: 5, price: 120, rating: 4.7, amenities: ["وای‌فای", "استخر", "رستوران"], image: assetPath("/assets/mazar-hero.jpg") },
  { id: 4, name: "هتل هرات", city: "هرات", stars: 4, price: 80, rating: 4.3, amenities: ["وای‌فای", "رستوران"], image: assetPath("/assets/herat-hero.jpg") },
  { id: 5, name: "هتل قندهار", city: "قندهار", stars: 3, price: 60, rating: 4.0, amenities: ["وای‌فای", "پارکینگ"], image: assetPath("/assets/kandahar-tour.jpg") },
  { id: 6, name: "هتل بامیان", city: "بامیان", stars: 3, price: 50, rating: 4.2, amenities: ["وای‌فای", "رستوران"], image: assetPath("/assets/bamyan-hero.jpg") },
];

export default function HotelsPage() {
  const [searchParams, setSearchParams] = useState({ city: "", checkin: "", checkout: "", guests: "1" });
  const [selectedStars, setSelectedStars] = useState(hotelStars[0]);
  const [hotels, setHotels] = useState(mockHotels);

  const handleSearch = () => {
    const filtered = mockHotels.filter(hotel => {
      if (searchParams.city && hotel.city !== searchParams.city) return false;
      if (selectedStars !== "همه ستاره‌ها" && hotel.stars !== parseInt(selectedStars[0])) return false;
      return true;
    });
    setHotels(filtered.length > 0 ? filtered : mockHotels);
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <Navbar />
      <main>
        <div className="relative h-48 overflow-hidden">
          <img src={assetPath("/assets/banner-2.jpg")} alt="هتل" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl font-semibold text-white">رزرو هتل</h1>
          </div>
        </div>

        <div className="mx-auto max-w-6xl -mt-8 px-4">
          <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-xl">
            <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">شهر</label>
                <input
                  type="text"
                  placeholder="شهر مقصد"
                  className="input-field"
                  value={searchParams.city}
                  onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
                  list="city-options"
                />
                <datalist id="city-options">
                  {cities.map((city) => (<option key={city} value={city} />))}
                </datalist>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">تاریخ ورود</label>
                <input type="date" className="input-field" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">تاریخ خروج</label>
                <input type="date" className="input-field" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">تعداد شب</label>
                <input type="number" min="1" placeholder="1" className="input-field" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">تعداد مهمان</label>
                <input type="number" min="1" placeholder="1" className="input-field" />
              </div>
              <div className="flex items-end">
                <button onClick={handleSearch} className="btn-primary h-12 w-full px-6">جستجو</button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[250px_1fr]">
            <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-lg h-fit">
              <h3 className="mb-4 text-sm font-semibold text-slate-900">فیلترها</h3>
              
              <div className="mb-4">
                <label className="mb-2 block text-xs font-semibold text-slate-600">ستاره هتل</label>
                <select className="input-field" value={selectedStars} onChange={(e) => setSelectedStars(e.target.value)}>
                  {hotelStars.map((star) => (<option key={star} value={star}>{star}</option>))}
                </select>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-xs font-semibold text-slate-600">قیمت شب</label>
                <input type="range" min="0" max="300" className="w-full" />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>0 دلار</span>
                  <span>300 دلار</span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">امکانات</label>
                <div className="space-y-2">
                  {["وای‌فای", "استخر", "رستوران", "پارکینگ", "باشگاه"].map((amenity) => (
                    <label key={amenity} className="flex items-center gap-2 text-sm text-slate-600">
                      <input type="checkbox" className="rounded border-gray-300" /> {amenity}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{hotels.length} هتل یافت شد</span>
                <select className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm">
                  <option>مرتب سازی: پیشنهادی</option>
                  <option>ارزان‌ترین</option>
                  <option>گران‌ترین</option>
                  <option>امتیاز بالا</option>
                </select>
              </div>

              {hotels.map((hotel) => (
                <div key={hotel.id} className="rounded-3xl border border-black/5 bg-white shadow-lg hover:shadow-xl transition overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-64 h-48 md:h-auto">
                      <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{hotel.name}</h3>
                          <p className="text-sm text-slate-600 mt-1">{hotel.city}</p>
                          <div className="flex items-center gap-1 mt-2">
                            {Array(hotel.stars).fill("★").map((s, i) => (
                              <span key={i} className="text-[#FDB713] text-sm">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-1 justify-end">
                            <span className="text-sm font-semibold text-slate-900">{hotel.rating}</span>
                            <span className="bg-[#22c55e] text-white text-xs px-2 py-0.5 rounded">عالی</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {hotel.amenities.map((a, i) => (
                          <span key={i} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">{a}</span>
                        ))}
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <p className="text-xs text-slate-500">قیمت برای هر شب</p>
                        <div className="text-left">
                          <p className="text-2xl font-bold text-[#FDB713]">${hotel.price}</p>
                          <button className="mt-2 btn-primary text-xs">رزرو</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-6xl px-4">
          <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-900">رزرو هتل در افغانستان</h2>
            <p className="mt-4 text-sm text-slate-600">
              افغانی‌بابا امکان رزرو آنلاین هتل در سراسر افغانستان را فراهم کرده است.
              از هتل‌های لوکس کابل تا اقامتگاه‌های اقتصادی شهرهای مختلف، بهترین گزینه‌ها را با قیمت مناسب бронируйте.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-[#f5f6f8] p-4">
                <h4 className="font-semibold text-slate-900">بهترین قیمت</h4>
                <p className="mt-2 text-xs text-slate-600">تضمین کمترین قیمت رزرو هتل</p>
              </div>
              <div className="rounded-2xl bg-[#f5f6f8] p-4">
                <h4 className="font-semibold text-slate-900">انتخاب گسترده</h4>
                <p className="mt-2 text-xs text-slate-600">هزاران هتل در شهرهای مختلف</p>
              </div>
              <div className="rounded-2xl bg-[#f5f6f8] p-4">
                <h4 className="font-semibold text-slate-900">رزرو آسان</h4>
                <p className="mt-2 text-xs text-slate-600">ثبت نام در چند دقیقه</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
