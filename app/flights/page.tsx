"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Plane, Users, MapPin, Clock, Star, ArrowRightLeft, Calendar, ChevronDown } from "lucide-react";

interface Flight {
  _id: string;
  airline: string;
  flightNumber: string;
  flightType: "domestic" | "international";
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: Date;
  price: number;
  totalSeats: number;
  availableSeats: number;
  rating?: number;
  class: "economy" | "business";
}

const provinces = [
  { name: "کابل", icon: "🏛️" },
  { name: "هرات", icon: "🌆" },
  { name: "قندهار", icon: "🏜️" },
  { name: "مزار شریف", icon: "🕌" },
  { name: "جلال‌آباد", icon: "🍊" },
  { name: "کندز", icon: "🌾" },
  { name: "بامیان", icon: "❄️" },
  { name: "غزنی", icon: "🏔️" },
];

const countries = [
  { name: "ترکیه", code: "TR", icon: "🇹🇷" },
  { name: "امارات متحده عربی", code: "AE", icon: "🇦🇪" },
  { name: "پاکستان", code: "PK", icon: "🇵🇰" },
  { name: "ایران", code: "IR", icon: "🇮🇷" },
  { name: "هندوستان", code: "IN", icon: "🇮🇳" },
  { name: "آلمان", code: "DE", icon: "🇩🇪" },
  { name: "ایالات متحده آمریکا", code: "US", icon: "🇺🇸" },
  { name: "عربستان سعودی", code: "SA", icon: "🇸🇦" },
];

export default function FlightsPage() {
  const [searchMode, setSearchMode] = useState<"domestic" | "international">("domestic");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [passengers, setPassengers] = useState("1 نفر");

  const [originDropdown, setOriginDropdown] = useState(false);
  const [destinationDropdown, setDestinationDropdown] = useState(false);
  const [originSearch, setOriginSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);

  const handleSwapCities = () => {
    const temp = selectedOrigin;
    setSelectedOrigin(selectedDestination);
    setSelectedDestination(temp);
  };

  const handleSearch = () => {
    const errors: string[] = [];
    if (!selectedOrigin) errors.push("origin");
    if (!selectedDestination) errors.push("destination");
    if (!departureDate) errors.push("date");

    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const params = new URLSearchParams();
    params.set("from", selectedOrigin);
    params.set("to", selectedDestination);
    params.set("date", departureDate);
    params.set("passengers", passengers);
    params.set("type", searchMode);

    window.location.href = `/flight-results?${params.toString()}`;
  };

  const getInputClass = (field: string) => {
    const isError = validationErrors.includes(field);
    return `w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 text-right text-sm md:text-base text-gray-900 cursor-pointer transition-all ${isError ? "border-red-500 bg-red-50 shadow-sm shadow-red-100" : "border-gray-400 focus:border-orange-500 bg-white font-bold placeholder:text-gray-400"
      }`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: "rtl" }}>
      <Navbar />

      <main className="flex-1">
        {/* New Hero Section Inspired by modern UI */}
        <div className="bg-gray-900 text-white pt-16 pb-32 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-black mb-6 italic tracking-tight">رزرو آنلاین پرواز</h1>
            <p className="text-xl text-gray-400 font-medium">تجربه سفری آسان و مطمئن با افغانی‌بابا</p>
          </div>
        </div>

        {/* Validation Toast */}
        {showToast && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-red-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce">
            <span className="text-2xl">⚠️</span>
            <span className="font-black text-lg">لطفاً تمام موارد ضروری را تکمیل کنید.</span>
          </div>
        )}

        {/* Search Card */}
        <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-20 mb-20">
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-6 md:p-10 border border-gray-100">

            {/* Toggle Switch */}
            <div className="flex justify-center mb-10">
              <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-1">
                <button
                  onClick={() => { setSearchMode("domestic"); setSelectedOrigin(""); setSelectedDestination(""); }}
                  className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${searchMode === 'domestic' ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  پرواز داخلی
                </button>
                <button
                  onClick={() => { setSearchMode("international"); setSelectedOrigin(""); setSelectedDestination(""); }}
                  className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${searchMode === 'international' ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  پرواز خارجی
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-end">
              {/* Origin */}
              <div className="lg:col-span-3 relative">
                <label className="block text-sm font-black text-gray-900 mb-3 pr-2">از کجا (مبدا)</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={searchMode === 'domestic' ? "انتخاب شهر..." : "انتخاب کشور..."}
                    value={selectedOrigin || originSearch}
                    onChange={(e) => {
                      setOriginSearch(e.target.value);
                      setOriginDropdown(true);
                      if (!e.target.value) setSelectedOrigin("");
                    }}
                    onFocus={() => { setOriginDropdown(true); setOriginSearch(""); }}
                    className={getInputClass("origin")}
                  />
                  {validationErrors.includes("origin") && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 font-black text-xl">!</span>
                  )}
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>

                {originDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 max-h-60 overflow-y-auto p-2">
                    {(searchMode === 'domestic' ? provinces : countries)
                      .filter(p => p.name.includes(originSearch) || !originSearch)
                      .map(p => (
                        <button
                          key={p.name}
                          onClick={() => {
                            setSelectedOrigin(p.name);
                            setValidationErrors(prev => prev.filter(e => e !== 'origin'));
                            setOriginDropdown(false);
                          }}
                          className="w-full flex items-center justify-between p-4 hover:bg-orange-50 rounded-xl transition-colors mb-1 last:mb-0"
                        >
                          <span className="font-bold text-gray-800">{p.name}</span>
                          <span className="text-xl">{p.icon}</span>
                        </button>
                      ))
                    }
                  </div>
                )}
              </div>

              {/* Swap */}
              <div className="lg:col-span-1 flex justify-center pb-2">
                <button
                  onClick={handleSwapCities}
                  className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-orange-500 transition-all hover:scale-110 shadow-lg"
                >
                  <ArrowRightLeft size={20} />
                </button>
              </div>

              {/* Destination */}
              <div className="lg:col-span-3 relative">
                <label className="block text-sm font-black text-gray-900 mb-3 pr-2">به کجا (مقصد)</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={searchMode === 'domestic' ? "انتخاب شهر..." : "انتخاب کشور..."}
                    value={selectedDestination || destinationSearch}
                    onChange={(e) => {
                      setDestinationSearch(e.target.value);
                      setDestinationDropdown(true);
                      if (!e.target.value) setSelectedDestination("");
                    }}
                    onFocus={() => { setDestinationDropdown(true); setDestinationSearch(""); }}
                    className={getInputClass("destination")}
                  />
                  {validationErrors.includes("destination") && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 font-black text-xl">!</span>
                  )}
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>

                {destinationDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 max-h-60 overflow-y-auto p-2">
                    {(searchMode === 'domestic' ? provinces : countries)
                      .filter(p => p.name.includes(destinationSearch) || !destinationSearch)
                      .map(p => (
                        <button
                          key={p.name}
                          onClick={() => {
                            setSelectedDestination(p.name);
                            setValidationErrors(prev => prev.filter(e => e !== 'destination'));
                            setDestinationDropdown(false);
                          }}
                          className="w-full flex items-center justify-between p-4 hover:bg-orange-50 rounded-xl transition-colors mb-1 last:mb-0"
                        >
                          <span className="font-bold text-gray-800">{p.name}</span>
                          <span className="text-xl">{p.icon}</span>
                        </button>
                      ))
                    }
                  </div>
                )}
              </div>

              {/* Date */}
              <div className="lg:col-span-2 relative">
                <label className="block text-sm font-black text-gray-900 mb-3 pr-2">تاریخ رفت</label>
                <div className="relative">
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => {
                      setDepartureDate(e.target.value);
                      setValidationErrors(prev => prev.filter(err => err !== 'date'));
                    }}
                    className={getInputClass("date")}
                    onClick={(e) => e.currentTarget.showPicker?.()}
                  />
                  {!departureDate && <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />}
                  {validationErrors.includes("date") && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 font-black text-xl">!</span>
                  )}
                </div>
              </div>

              {/* Passengers */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-black text-gray-700 mb-3 pr-2">مسافران</label>
                <div className="relative">
                  <select
                    value={passengers}
                    onChange={e => setPassengers(e.target.value)}
                    className="w-full px-4 py-[15px] border border-gray-200 rounded-xl bg-white text-gray-900 font-bold focus:ring-2 focus:ring-orange-500 items-center justify-between"
                  >
                    <option>1 نفر</option>
                    <option>2 نفر</option>
                    <option>3 نفر</option>
                    <option>4 نفر</option>
                  </select>
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>

              {/* Search Button */}
              <div className="lg:col-span-1">
                <button
                  onClick={handleSearch}
                  className="w-full h-14 bg-orange-500 text-white rounded-xl shadow-lg shadow-orange-100 font-black flex items-center justify-center hover:bg-orange-600 transition-all hover:scale-[1.02] transform active:scale-95"
                >
                  بگرد
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Categories Section */}
        <section className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-20">
          {[
            { title: "پروازهای امروز", icon: "✈️", color: "bg-blue-50 text-blue-600" },
            { title: "ارزان‌ترین ها", icon: "💰", color: "bg-emerald-50 text-emerald-600" },
            { title: "رزرو فوری", icon: "⚡", color: "bg-orange-50 text-orange-600" },
            { title: "پشتیبانی ویژه", icon: "📞", color: "bg-purple-50 text-purple-600" }
          ].map(cat => (
            <div key={cat.title} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group text-center">
              <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <p className="font-black text-gray-900">{cat.title}</p>
            </div>
          ))}
        </section>

      </main>

      <Footer />
    </div>
  );
}
