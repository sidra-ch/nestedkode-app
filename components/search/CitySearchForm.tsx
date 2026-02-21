"use client";

import React, { useRef, useState, useEffect } from "react";
import { Airplay, Globe, Bed, Bus, Car, ArrowRightLeft, ChevronDown, Users, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";



const categories = [
  { name: "پرواز داخلی", icon: <Airplay className="w-10 h-10 sm:w-8 sm:h-8 text-gray-800" /> },
  { name: "پرواز خارجی", icon: <Globe className="w-10 h-10 sm:w-8 sm:h-8 text-gray-800" /> },
  { name: "اتوبوس", icon: <Bus className="w-10 h-10 sm:w-8 sm:h-8 text-gray-800" /> },
  { name: "تور", icon: <MapPin className="w-10 h-10 sm:w-8 sm:h-8 text-gray-800" /> },
  { name: "هتل", icon: <Bed className="w-10 h-10 sm:w-8 sm:h-8 text-gray-800" /> },
  { name: "تاکسی", icon: <Car className="w-10 h-10 sm:w-8 sm:h-8 text-gray-800" /> },
];

const PROVINCES = [
  { name: "کابل", icon: "🏛️" },
  { name: "کندهار", icon: "🏜️" },
  { name: "هرات", icon: "🌆" },
  { name: "بلخ", icon: "🕌" },
  { name: "ننگرهار", icon: "⛰️" },
  { name: "لغمان", icon: "🌲" },
  { name: "پیشاور", icon: "🏘️" },
  { name: "بامیان", icon: "❄️" },
  { name: "غزنی", icon: "🏔️" },
  { name: "زابل", icon: "🌅" },
  { name: "ارزگان", icon: "🏜️" },
  { name: "یکاولنگ", icon: "⛰️" },
  { name: "جوزجان", icon: "🌾" },
  { name: "سمنگان", icon: "🌻" },
  { name: "بلک آب", icon: "💧" },
  { name: "فاریاب", icon: "🌄" },
  { name: "فراه", icon: "🏜️" },
  { name: "ہلمند", icon: "🌊" },
  { name: "نیمروز", icon: "☀️" },
  { name: "اوروزگان", icon: "🌆" },
  { name: "خوست", icon: "⛰️" },
  { name: "پکتیا", icon: "🏔️" },
  { name: "پکتیکا", icon: "⛏️" },
  { name: "لوگر", icon: "🌲" },
  { name: "وارداک", icon: "🏞️" },
  { name: "کاپیسا", icon: "⛰️" },
  { name: "پنجشیر", icon: "🗻" },
  { name: "نورستان", icon: "🌲" },
  { name: "کنر", icon: "💧" },
  { name: "لاغمان", icon: "🌊" },
  { name: "سری پل", icon: "🌾" },
  { name: "ستار تھال", icon: "🏜️" },
  { name: "بدخشان", icon: "🏔️" },
  { name: "تخار", icon: "🌄" },
];






export const CitySearchForm: React.FC = () => {
  const [originDropdown, setOriginDropdown] = useState(false);
  const [destinationDropdown, setDestinationDropdown] = useState(false);
  const [originSearch, setOriginSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1 Passenger");

  const originRef = useRef<HTMLDivElement | null>(null);
  const destinationRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();


  // Strict outside click detection for origin dropdown
  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        originDropdown &&
        originRef.current &&
        !originRef.current.contains(event.target as Node)
      ) {
        setOriginDropdown(false);
      }
      if (
        destinationDropdown &&
        destinationRef.current &&
        !destinationRef.current.contains(event.target as Node)
      ) {
        setDestinationDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [originDropdown, destinationDropdown]);

  // Swap logic
  const handleSwap = () => {
    const temp = selectedOrigin;
    setSelectedOrigin(selectedDestination);
    setSelectedDestination(temp);
    setOriginDropdown(false);
    setDestinationDropdown(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Only proceed if both cities and date are selected
    if (!selectedOrigin || !selectedDestination || !departureDate) return;
    const params = new URLSearchParams();
    params.set("from", selectedOrigin);
    params.set("to", selectedDestination);
    params.set("date", departureDate);
    if (passengers) params.set("passengers", passengers);
    router.push(`/search-results?${params.toString()}`);
  };

  return (
    <form
      className="w-full bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4"
      onSubmit={handleSearch}
    >
      {/* Categories Heading */}
      <div className="flex w-full mb-2 justify-between">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex-1 flex flex-col items-center cursor-pointer text-gray-700"
          >
            <div className="p-2 rounded-full mb-1">{cat.icon}</div>
            <span className="text-xs font-medium">{cat.name}</span>
          </div>
        ))}
      </div>
      {/* Search Fields and Button Inline */}
      <div className="flex flex-row gap-4 items-center flex-nowrap w-full">
        {/* Origin City */}
        <div className="relative flex-1 w-full" ref={originRef}>
          <label className="block text-sm text-gray-600 mb-1 text-right">مبدا</label>
          <div className="relative">
            <input
              type="text"
              placeholder="انتخاب شهر"
              value={originSearch || selectedOrigin}
              onChange={e => {
                setOriginSearch(e.target.value);
                setOriginDropdown(true);
                if (!e.target.value) setSelectedOrigin("");
              }}
              onFocus={() => {
                setOriginDropdown(true);
                setOriginSearch("");
              }}
              onBlur={() => setTimeout(() => setOriginDropdown(false), 150)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right text-gray-900 bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              autoComplete="off"
            />
            <ChevronDown className="absolute left-3 top-4 h-4 w-4 text-gray-400 pointer-events-none" />
            {originDropdown && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
                {PROVINCES.filter(
                  p => (p.name.includes(originSearch) || originSearch === "") && p.name !== selectedDestination
                ).map(province => (
                  <button
                    key={province.name}
                    type="button"
                    className="w-full flex items-center justify-between text-right px-4 py-2 hover:bg-orange-50 text-gray-900 border-b border-gray-100 last:border-b-0"
                    onMouseDown={e => {
                      setSelectedOrigin(province.name);
                      setOriginSearch("");
                      setOriginDropdown(false);
                      e.preventDefault();
                    }}
                    role="option"
                    aria-selected={selectedOrigin === province.name}
                  >
                    <span>{province.name}</span>
                    <span className="text-lg">{province.icon}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Swap Button */}
        <div className="flex items-center justify-center mt-6 md:mt-8">
          <button
            type="button"
            onClick={handleSwap}
            className="p-3 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors text-white shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="تغییر مبدا و مقصد"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>
        </div>
        {/* Destination City */}
        <div className="relative flex-1 w-full" ref={destinationRef}>
          <label className="block text-sm text-gray-600 mb-1 text-right">مقصد</label>
          <div className="relative">
            <input
              type="text"
              placeholder="انتخاب شهر"
              value={destinationSearch || selectedDestination}
              onChange={e => {
                setDestinationSearch(e.target.value);
                setDestinationDropdown(true);
                if (!e.target.value) setSelectedDestination("");
              }}
              onFocus={() => {
                setDestinationDropdown(true);
                setDestinationSearch("");
              }}
              onBlur={() => setTimeout(() => setDestinationDropdown(false), 150)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right text-gray-900 bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              autoComplete="off"
            />
            <ChevronDown className="absolute left-3 top-4 h-4 w-4 text-gray-400 pointer-events-none" />
            {destinationDropdown && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
                {PROVINCES.filter(
                  p => (p.name.includes(destinationSearch) || destinationSearch === "") && p.name !== selectedOrigin
                ).map(province => (
                  <button
                    key={province.name}
                    type="button"
                    className="w-full flex items-center justify-between text-right px-4 py-2 hover:bg-orange-50 text-gray-900 border-b border-gray-100 last:border-b-0"
                    onMouseDown={e => {
                      setSelectedDestination(province.name);
                      setDestinationSearch("");
                      setDestinationDropdown(false);
                      e.preventDefault();
                    }}
                    role="option"
                    aria-selected={selectedDestination === province.name}
                  >
                    <span>{province.name}</span>
                    <span className="text-lg">{province.icon}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Departure Date */}
        <div className="flex-1 w-full">
          <label className="block text-sm text-gray-600 mb-1 text-right">تاریخ رفت</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
        {/* Return Date */}
        <div className="flex-1 w-full">
          <label className="block text-sm text-gray-600 mb-1 text-right">تاریخ برگشت (اختیاری)</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
        {/* Passengers */}
        <div className="flex-1 w-full">
          <label className="flex text-sm text-gray-600 mb-1 text-right items-center gap-2">
            <Users className="h-5 w-5 text-gray-400" />
            مسافران
          </label>
          <select
            value={passengers}
            onChange={e => setPassengers(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="1 Passenger">1 مسافر</option>
            <option value="2 Passengers">2 مسافر</option>
            <option value="3 Passengers">3 مسافر</option>
            <option value="4 Passengers">4 مسافر</option>
            <option value="5 Passengers">5 مسافر</option>
            <option value="6 Passengers">6 مسافر</option>
            <option value="7 Passengers">7 مسافر</option>
            <option value="8 Passengers">8 مسافر</option>
          </select>
        </div>
        {/* Search Button Inline */}
        <div className="flex items-end justify-end w-full md:w-auto mt-0">
          <button
            type="submit"
            className="px-8 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition text-base shadow-md"
          >
            جستجو
          </button>
        </div>
      </div>
    </form>
  );
};

export default CitySearchForm;
