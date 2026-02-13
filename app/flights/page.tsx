"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { assetPath } from "@/lib/assetPath";

const airlines = ["همه ایرلاین‌ها", "ماهان", "زاگرس", "کیش ایر", "قشم ایر", "آسمان", "ایران ایر", "وارش"];
const flightTypes = ["رفت و برگشت", "یک طرفه"];

const mockFlights = [
  { id: 1, airline: "ماهان", flightNumber: "W5-101", origin: "کابل", destination: "دوبی", departure: "08:00", arrival: "10:30", duration: "2:30", price: 220, type: "سیستمی" },
  { id: 2, airline: "زاگرس", flightNumber: "Z4-205", origin: "کابل", destination: "دوبی", departure: "10:30", arrival: "13:00", duration: "2:30", price: 195, type: "چارتر" },
  { id: 3, airline: "کیش ایر", flightNumber: "Y9-401", origin: "کابل", destination: "دوبی", departure: "14:00", arrival: "16:30", duration: "2:30", price: 210, type: "سیستمی" },
  { id: 4, airline: "قشم ایر", flightNumber: "QB-303", origin: "کابل", destination: "دوبی", departure: "16:30", arrival: "19:00", duration: "2:30", price: 185, type: "چارتر" },
  { id: 5, airline: "آسمان", flightNumber: "B9-507", origin: "کابل", destination: "دوبی", departure: "19:00", arrival: "21:30", duration: "2:30", price: 230, type: "سیستمی" },
  { id: 6, airline: "ماهان", flightNumber: "W5-108", origin: "مزار شریف", destination: "دوبی", departure: "09:00", arrival: "12:00", duration: "3:00", price: 240, type: "سیستمی" },
];

export default function FlightsPage() {
  const [tripType, setTripType] = useState(flightTypes[0]);
  const [selectedAirline, setSelectedAirline] = useState(airlines[0]);
  const [flights, setFlights] = useState(mockFlights);
  const [searchParams, setSearchParams] = useState({ origin: "", destination: "", date: "", returnDate: "" });

  const handleSearch = () => {
    const filtered = mockFlights.filter(flight => {
      if (searchParams.origin && flight.origin !== searchParams.origin) return false;
      if (searchParams.destination && flight.destination !== searchParams.destination) return false;
      if (selectedAirline !== "همه ایرلاین‌ها" && flight.airline !== selectedAirline) return false;
      return true;
    });
    setFlights(filtered.length > 0 ? filtered : mockFlights);
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <Navbar />
      <main>
        <div className="relative h-48 overflow-hidden">
          <img src={assetPath("/assets/kabul-hero.jpg")} alt="پرواز" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl font-semibold text-white">جستجوی پرواز</h1>
          </div>
        </div>

        <div className="mx-auto max-w-6xl -mt-8 px-4">
          <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-xl">
            <div className="mb-4 flex flex-wrap gap-2">
              {flightTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setTripType(type)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    tripType === type ? "bg-[#FDB713] text-black" : "border border-black/10 text-slate-600"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">مبدا</label>
                <input
                  type="text"
                  placeholder="شهر مبدا"
                  className="input-field"
                  value={searchParams.origin}
                  onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value })}
                  list="origin-options"
                />
                <datalist id="origin-options">
                  <option value="کابل" />
                  <option value="مزار شریف" />
                  <option value="هرات" />
                  <option value="قندهار" />
                </datalist>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">مقصد</label>
                <input
                  type="text"
                  placeholder="شهر مقصد"
                  className="input-field"
                  value={searchParams.destination}
                  onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                  list="dest-options"
                />
                <datalist id="dest-options">
                  <option value="دوبی" />
                  <option value="استانبول" />
                  <option value="دهلی" />
                  <option value="تهران" />
                  <option value="مشهد" />
                </datalist>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">تاریخ رفت</label>
                <input type="date" className="input-field" />
              </div>
              {tripType === "رفت و برگشت" && (
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">تاریخ برگشت</label>
                  <input type="date" className="input-field" />
                </div>
              )}
              <div className="flex items-end">
                <button onClick={handleSearch} className="btn-primary h-12 w-full px-6">جستجو</button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[250px_1fr]">
            <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-lg h-fit">
              <h3 className="mb-4 text-sm font-semibold text-slate-900">فیلترها</h3>
              
              <div className="mb-4">
                <label className="mb-2 block text-xs font-semibold text-slate-600">ایرلاین</label>
                <select className="input-field" value={selectedAirline} onChange={(e) => setSelectedAirline(e.target.value)}>
                  {airlines.map((airline) => (
                    <option key={airline} value={airline}>{airline}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-xs font-semibold text-slate-600">نوع بلیط</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" className="rounded border-gray-300" /> سیستمی
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" className="rounded border-gray-300" /> چارتر
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">قیمت</label>
                <input type="range" min="0" max="500" className="w-full" />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>0 دلار</span>
                  <span>500 دلار</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{flights.length} پرواز یافت شد</span>
                <select className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm">
                  <option>مرتب سازی: ارزان‌ترین</option>
                  <option>زودترین</option>
                  <option>گران‌ترین</option>
                </select>
              </div>

              {flights.map((flight) => (
                <div key={flight.id} className="rounded-3xl border border-black/5 bg-white p-5 shadow-lg hover:shadow-xl transition">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1e6]">
                        <span className="text-lg font-bold text-[#FDB713]">{flight.airline[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{flight.airline}</p>
                        <p className="text-xs text-slate-500">{flight.flightNumber}</p>
                      </div>
                    </div>

                    <div className="flex flex-1 items-center justify-center gap-4">
                      <div className="text-center">
                        <p className="text-xl font-bold text-slate-900">{flight.departure}</p>
                        <p className="text-xs text-slate-500">{flight.origin}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-slate-400">{flight.duration}</span>
                        <div className="h-px w-24 bg-slate-300 relative">
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-1 text-[10px] text-slate-400">←</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-slate-900">{flight.arrival}</p>
                        <p className="text-xs text-slate-500">{flight.destination}</p>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#FDB713]">${flight.price}</p>
                      <p className="text-xs text-slate-500">{flight.type}</p>
                      <button className="mt-2 btn-primary text-xs">انتخاب</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-6xl px-4">
          <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-900">بلیط هواپیما | رزرو آنلاین</h2>
            <p className="mt-4 text-sm text-slate-600">
              افغانی‌بابا امکان رزرو آنلاین بلیط پرواز داخلی و خارجی را با بهترین قیمت فراهم کرده است.
              شما می‌توانید از بین ایرلاین‌های مختلف انتخاب کرده و در کوتاه‌ترین زمان بلیط خود را خریداری کنید.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-[#f5f6f8] p-4">
                <h4 className="font-semibold text-slate-900">پروازهای داخلی</h4>
                <p className="mt-2 text-xs text-slate-600">کابل، مزار شریف، هرات، قندهار و...</p>
              </div>
              <div className="rounded-2xl bg-[#f5f6f8] p-4">
                <h4 className="font-semibold text-slate-900">پروازهای خارجی</h4>
                <p className="mt-2 text-xs text-slate-600">دوبی، استانبول، دهلی، تهران و...</p>
              </div>
              <div className="rounded-2xl bg-[#f5f6f8] p-4">
                <h4 className="font-semibold text-slate-900">پشتیبانی ۲۴/۷</h4>
                <p className="mt-2 text-xs text-slate-600">تیم پشتیبانی در تمام مراحل کنار شماست</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
