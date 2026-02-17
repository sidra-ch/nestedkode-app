"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// Removed unused useRouter import
import { ChevronDown, ArrowRightLeft, Users } from "lucide-react";

// Simple toast for error messages
function showToast(msg: string) {
  if (typeof window !== "undefined") {
    const toast = document.createElement("div");
    toast.innerText = msg;
    toast.style.position = "fixed";
    toast.style.top = "24px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#F87171";
    toast.style.color = "#fff";
    toast.style.padding = "12px 24px";
    toast.style.borderRadius = "12px";
    toast.style.fontWeight = "bold";
    toast.style.zIndex = "9999";
    toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
  }
}

// Removed unused types and variables from old search form logic


const provinces = [
  { name: "کابل", icon: "🏛️" },
  { name: "هرات", icon: "🌆" },
  { name: "قندهار", icon: "🏜️" },
  { name: "مزار شریف", icon: "🕌" },
  { name: "جلال‌آباد", icon: "🍊" },
  { name: "کندز", icon: "🌾" },
  { name: "بامیان", icon: "❄️" },
  { name: "غزنی", icon: "🏔️" },
  { name: "بدخشان", icon: "💎" },
  { name: "پکتیا", icon: "🌲" },
  { name: "پکتیکا", icon: "⛰️" },
  { name: "خوست", icon: "🥜" },
  { name: "هلمند", icon: "🌊" },
  { name: "نیمروز", icon: "☀️" },
  { name: "فراه", icon: "🏜️" },
  { name: "بادغیس", icon: "🌰" },
  { name: "غور", icon: "🏰" },
  { name: "دایکندی", icon: "🌸" },
  { name: "ارزگان", icon: "🍑" },
  { name: "زابل", icon: "🏹" },
  { name: "میدان وردک", icon: "🍎" },
  { name: "لوگر", icon: "⛏️" },
  { name: "پروان", icon: "🍇" },
  { name: "کاپیسا", icon: "🍓" },
  { name: "پنجشیر", icon: "🦁" },
  { name: "لغمان", icon: "🥦" },
  { name: "کنر", icon: "🌲" },
  { name: "نورستان", icon: "🏔️" },
  { name: "تخار", icon: "🧂" },
  { name: "بغلان", icon: "🏭" },
  { name: "سمنگان", icon: "🥜" },
  { name: "سرپل", icon: "🛢️" },
  { name: "جوزجان", icon: "🔥" },
  { name: "فاریاب", icon: "🍇" }
];

export default function BusSearchForm() {
    const router = useRouter();
  const [originDropdown, setOriginDropdown] = useState(false);
  const [destinationDropdown, setDestinationDropdown] = useState(false);
  const [originSearch, setOriginSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1 Passenger");

  const handleSwapCities = () => {
    const temp = selectedOrigin;
    setSelectedOrigin(selectedDestination);
    setSelectedDestination(temp);
  };

  const handleSearch = () => {
    if (!selectedOrigin || !selectedDestination || !departureDate) {
      showToast("لطفاً همه فیلدها را پر کریں");
      return;
    }
    let url = "/bus";
    if (activeTab === "domestic" || activeTab === "foreign") url = "/flights";
    if (activeTab === "tour") url = "/tour";
    if (activeTab === "hotel") url = "/hotel";
    if (activeTab === "taxi") url = "/taxi";
    router.push(url);
  };

  // Tab definitions
  const tabList = [
    { key: "domestic", label: "پرواز داخلی", icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12l10 6 10-6-10-6-10 6z" /></svg> },
    { key: "foreign", label: "پرواز خارجی", icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /></svg> },
    { key: "tour", label: "تور", icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="4" /></svg> },
    { key: "bus", label: "اتوبوس", icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="10" rx="3" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg> },
    { key: "hotel", label: "هتل", icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="6" width="12" height="12" rx="2" /></svg> },
    { key: "taxi", label: "تاکسی", icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="10" width="16" height="6" rx="3" /><circle cx="8" cy="16" r="2" /><circle cx="16" cy="16" r="2" /></svg> },
  ];

  const [activeTab, setActiveTab] = useState("bus");

  // Navigation logic
  const handleTabClick = (key: string) => {
    setActiveTab(key);
    // You can add navigation here if needed
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-black p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex justify-center gap-4 md:gap-8 mb-6 md:mb-8 overflow-x-auto scrollbar-hide" tabIndex={0} role="tablist">
        {tabList.map(tab => (
          <button
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            className={`flex flex-col items-center group focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg flex-shrink-0 ${activeTab === tab.key ? "text-black" : "text-gray-400"}`}
            role="tab"
            aria-selected={activeTab === tab.key}
          >
            <span className={`mb-2 ${activeTab === tab.key ? "text-black" : "text-gray-400"}`}>{tab.icon}</span>
            <span className={`text-sm md:text-xl font-bold whitespace-nowrap ${activeTab === tab.key ? "text-black" : "text-gray-400"}`}>{tab.label}</span>
          </button>
        ))}
      </div>
      {/* Render form for each tab */}
      {["bus", "domestic", "foreign", "tour", "hotel", "taxi"].includes(activeTab) && (
        <div className="flex items-end justify-between gap-3 flex-wrap">
          {/* Origin City Dropdown */}
          <div className="relative flex-1 min-w-[160px] w-full md:w-auto">
            <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">مبدا</div>
            <input
              type="text"
              placeholder="Origin (city)"
              value={selectedOrigin || originSearch}
              onChange={(e) => {
                setOriginSearch(e.target.value);
                setOriginDropdown(true);
                if (!e.target.value) {
                  setSelectedOrigin("");
                }
              }}
              onFocus={() => {
                setOriginDropdown(true);
                setOriginSearch("");
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black text-right text-sm text-gray-900 cursor-pointer"
            />
            <ChevronDown className="absolute left-3 top-10 h-4 w-4 text-gray-400 pointer-events-none" />
            {originDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                {provinces
                  .filter((p) => p.name.includes(originSearch) || originSearch === "")
                  .map((province) => (
                    <button
                      key={province.name}
                      onClick={() => {
                        setSelectedOrigin(province.name);
                        setOriginSearch("");
                        setOriginDropdown(false);
                      }}
                      className="w-full px-3 py-2.5 text-right text-sm hover:bg-orange-50 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                    >
                      <span>{province.name}</span>
                      <span className="text-lg">{province.icon}</span>
                    </button>
                  ))}
              </div>
            )}
          </div>
          {/* Swap Icon */}
          <button
            onClick={handleSwapCities}
            className="p-2.5 rounded-full bg-orange-500 hover:bg-orange-600 transition flex-shrink-0 mb-1 shadow-md"
          >
            <ArrowRightLeft className="h-4 w-4 text-white" />
          </button>
          {/* Destination City Dropdown */}
          <div className="relative flex-1 min-w-[160px] w-full md:w-auto">
            <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">مقصد</div>
            <input
              type="text"
              placeholder="Destination (city)"
              value={selectedDestination || destinationSearch}
              onChange={(e) => {
                setDestinationSearch(e.target.value);
                setDestinationDropdown(true);
                if (!e.target.value) {
                  setSelectedDestination("");
                }
              }}
              onFocus={() => {
                setDestinationDropdown(true);
                setDestinationSearch("");
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black text-right text-sm text-gray-900 cursor-pointer"
            />
            <ChevronDown className="absolute left-3 top-10 h-4 w-4 text-gray-400 pointer-events-none" />
            {destinationDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                {provinces
                  .filter((p) => p.name.includes(destinationSearch) || destinationSearch === "")
                  .map((province) => (
                    <button
                      key={province.name}
                      onClick={() => {
                        setSelectedDestination(province.name);
                        setDestinationSearch("");
                        setDestinationDropdown(false);
                      }}
                      className="w-full px-3 py-2.5 text-right text-sm hover:bg-orange-50 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                    >
                      <span>{province.name}</span>
                      <span className="text-lg">{province.icon}</span>
                    </button>
                  ))}
              </div>
            )}
          </div>
          {/* Departure Date Selector */}
          <div className="relative flex-1 min-w-[140px] w-full sm:w-auto">
            <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">تاریخ حرکت</div>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black text-right text-sm text-gray-900 cursor-pointer"
            />
          </div>
          {/* Return Date Selector */}
          <div className="relative flex-1 min-w-[140px] w-full sm:w-auto">
            <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">تاریخ برگشت</div>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black text-right text-sm text-gray-900 cursor-pointer"
            />
          </div>
          {/* Passengers */}
          <div className="relative flex-1 min-w-[120px] w-full sm:w-auto">
            <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">مسافران</div>
            <Users className="absolute left-3 top-10 h-4 w-4 text-gray-400 pointer-events-none" />
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black text-right text-sm text-gray-900 cursor-pointer">
              <option value="">Passengers</option>
              <option value="1 Passenger">1 Passenger</option>
              <option value="2 Passengers">2 Passengers</option>
              <option value="3 Passengers">3 Passengers</option>
              <option value="4 Passengers">4 Passengers</option>
            </select>
          </div>
          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full md:w-auto px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition text-sm whitespace-nowrap flex-shrink-0 shadow-md">
            Search
          </button>
        </div>
      )}
    </div>
  );
}
