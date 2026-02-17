"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plane, Bus, Hotel, Compass, Car, Globe, ArrowRightLeft, Calendar, Users, ChevronDown } from "lucide-react";

interface SearchTab {
  key: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: SearchTab[] = [
  { key: "domestic-flight", label: "پرواز داخلی", icon: <Plane className="h-5 w-5" /> },
  { key: "international-flight", label: "پرواز خارجی", icon: <Globe className="h-5 w-5" /> },
  { key: "bus", label: "اتوبوس", icon: <Bus className="h-5 w-5" /> },
  { key: "hotel", label: "هتل", icon: <Hotel className="h-5 w-5" /> },
];

const provinces = [
  "کابل", "هرات", "قندهار", "مزار شریف", "جلال‌آباد", "کندز",
  "بامیان", "غزنی", "بدخشان", "پکتیا", "پکتیکا", "خوست",
];

export default function MobileSearchTabs() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("domestic-flight");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  const handleSearch = () => {
    if (!origin || !destination || !departureDate) {
      alert("لطفاً تمام فیلدها را پر کنید");
      return;
    }

    let route = "/flights";
    if (activeTab === "bus") route = "/bus";
    else if (activeTab === "hotel") route = "/hotels";
    else if (activeTab === "tour") route = "/tour";
    else if (activeTab === "taxi") route = "/taxi";

    router.push(route);
  };

  const swapCities = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl mx-4 -mt-8 relative z-20">
      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex flex-col items-center justify-center flex-1 min-w-[70px] py-3 px-2 transition-all ${
              activeTab === tab.key
                ? "text-orange-500 border-b-2 border-orange-500 bg-orange-50/30"
                : "text-gray-500"
            }`}
          >
            {tab.icon}
            <span className="text-xs mt-1 font-medium whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Search Form */}
      <div className="p-4 space-y-3">
        {/* Origin & Destination */}
        <div className="space-y-3">
          {/* Origin */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1 text-right">مبدا</label>
            <div className="relative">
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                onFocus={() => setShowOriginDropdown(true)}
                onBlur={() => setTimeout(() => setShowOriginDropdown(false), 200)}
                placeholder="انتخاب شهر"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
              <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              
              {showOriginDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
                  {provinces.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setOrigin(city);
                        setShowOriginDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-right hover:bg-orange-50 text-sm border-b border-gray-100 last:border-0"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2">
            <button
              onClick={swapCities}
              className="p-2 bg-orange-500 rounded-full shadow-md hover:bg-orange-600 transition"
              aria-label="Swap cities"
            >
              <ArrowRightLeft className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Destination */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1 text-right">مقصد</label>
            <div className="relative">
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => setShowDestDropdown(true)}
                onBlur={() => setTimeout(() => setShowDestDropdown(false), 200)}
                placeholder="انتخاب شهر"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
              <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              
              {showDestDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
                  {provinces.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setDestination(city);
                        setShowDestDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-right hover:bg-orange-50 text-sm border-b border-gray-100 last:border-0"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dates & Passengers */}
        <div className="grid grid-cols-2 gap-3">
          {/* Departure Date */}
          <div>
            <label className="block text-sm text-gray-600 mb-1 text-right">تاریخ رفت</label>
            <div className="relative">
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-right focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Return Date */}
          {activeTab !== "bus" && (
            <div>
              <label className="block text-sm text-gray-600 mb-1 text-right">تاریخ برگشت</label>
              <div className="relative">
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-right focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* Passengers */}
        {activeTab !== "hotel" && activeTab !== "taxi" && (
          <div>
            <label className="block text-sm text-gray-600 mb-1 text-right">مسافران</label>
            <div className="relative">
              <select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none"
              >
                <option value="1">۱ مسافر</option>
                <option value="2">۲ مسافر</option>
                <option value="3">۳ مسافر</option>
                <option value="4">۴ مسافر</option>
                <option value="5">۵ مسافر</option>
              </select>
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-600 transition shadow-md"
        >
          جستجو
        </button>
      </div>
    </div>
  );
}
