"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronDown, ArrowRightLeft, Calendar, Users, Star, MapPin, Clock } from "lucide-react";

interface Bus {
  _id: string;
  operatorName: string;
  operatorPhone: string;
  busType: "luxury" | "standard" | "economy";
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: Date;
  price: number;
  totalSeats: number;
  availableSeats: number;
  rating?: number;
  amenities: string[];
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

const mockBuses: Bus[] = [
  {
    _id: "1",
    operatorName: "اتوبوس کابل",
    operatorPhone: "+93 700 123 456",
    busType: "luxury",
    from: "کابل",
    to: "مزار شریف",
    departureTime: "08:00",
    arrivalTime: "14:30",
    departureDate: new Date(),
    price: 25,
    totalSeats: 50,
    availableSeats: 15,
    rating: 4.7,
    amenities: ["تهویه مطبوع", "وای فای", "هدست"]
  },
  {
    _id: "2",
    operatorName: "اتوبوس هرات",
    operatorPhone: "+93 700 234 567",
    busType: "standard",
    from: "کابل",
    to: "هرات",
    departureTime: "09:00",
    arrivalTime: "18:00",
    departureDate: new Date(),
    price: 35,
    totalSeats: 45,
    availableSeats: 10,
    rating: 4.5,
    amenities: ["تهویه مطبوع", "وای فای"]
  },
  {
    _id: "3",
    operatorName: "اتوبوس قندهار",
    operatorPhone: "+93 700 345 678",
    busType: "economy",
    from: "کابل",
    to: "قندهار",
    departureTime: "07:00",
    arrivalTime: "16:00",
    departureDate: new Date(),
    price: 20,
    totalSeats: 60,
    availableSeats: 25,
    rating: 4.3,
    amenities: ["تهویه مطبوع"]
  }
];

export default function BusPage() {
  const [buses, setBuses] = useState<Bus[]>(mockBuses);
  const [loading, setLoading] = useState(true);
  const [originDropdown, setOriginDropdown] = useState(false);
  const [destinationDropdown, setDestinationDropdown] = useState(false);
  const [dateDropdown, setDateDropdown] = useState(false);
  const [originSearch, setOriginSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1 Passenger");

  // Fetch buses from API
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch('/api/buses');
        const data = await response.json();
        if (data.success && data.buses && data.buses.length > 0) {
          setBuses(data.buses);
        } else {
          // Fallback to mock buses
          setBuses(mockBuses);
        }
      } catch (error) {
        console.error('Error fetching buses:', error);
        setBuses(mockBuses);
      } finally {
        setLoading(false);
      }
    };
    fetchBuses();
  }, []);

  const handleSwapCities = () => {
    const temp = selectedOrigin;
    setSelectedOrigin(selectedDestination);
    setSelectedDestination(temp);
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    searchParams.set('from', selectedOrigin);
    searchParams.set('to', selectedDestination);
    searchParams.set('date', departureDate);
    searchParams.set('passengers', passengers);
    window.location.href = `/search-results?type=bus&${searchParams.toString()}`;
  };

  const getBusTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      luxury: "لوکس",
      standard: "استاندارد",
      economy: "اقتصادی"
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: "rtl" }}>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Image */}
        <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/assets/bus-page/bus-page.webp')` }}
          />
          <div className="absolute inset-0 bg-white/60" />
          <div className="container mx-auto px-4 pt-20 relative z-10">
          </div>
        </div>

        {/* Search Card */}
        <div className="container mx-auto px-4 -mt-16 md:-mt-20 lg:-mt-24 relative z-20 mb-12 md:mb-16">
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 md:p-6 lg:p-8">
            {/* Search Form */}
            <div className="space-y-4 md:space-y-6">
              {/* Trip Type */}
              <div className="flex items-center justify-between gap-2 flex-wrap lg:flex-nowrap">
                {/* Origin City Dropdown */}
                <div className="relative flex-1 min-w-[200px]">
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
                      setOriginSearch(""); // Clear search
                    }}
                    className="w-full px-4 py-3 md:py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right text-sm md:text-base text-gray-900 cursor-pointer"
                  />
                  <ChevronDown className="absolute left-3 top-10 md:top-11 h-4 w-4 md:h-5 md:w-5 text-gray-400 pointer-events-none" />

                  {originDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 md:max-h-60 overflow-y-auto">
                      {provinces
                        .filter((p) =>
                          p.name.includes(originSearch) || originSearch === ""
                        )
                        .map((province) => (
                          <button
                            key={province.name}
                            onClick={() => {
                              setSelectedOrigin(province.name);
                              setOriginSearch("");
                              setOriginDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 text-right text-sm md:text-base hover:bg-orange-50 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                          >
                            <span>{province.name}</span>
                            <span className="text-lg md:text-xl">{province.icon}</span>
                          </button>
                        ))}
                    </div>
                  )}
                </div>

                {/* Swap Icon */}
                <button
                  onClick={handleSwapCities}
                  className="p-2.5 md:p-3 rounded-full bg-orange-500 hover:bg-orange-600 transition flex-shrink-0 mt-6 md:mt-7 xl:mt-8 shadow-md"
                >
                  <ArrowRightLeft className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </button>

                {/* Destination City Dropdown */}
                <div className="relative flex-1 min-w-[200px]">
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
                      setDestinationSearch(""); // Clear search
                    }}
                    className="w-full px-4 py-3 md:py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right text-sm md:text-base text-gray-900 cursor-pointer"
                  />
                  <ChevronDown className="absolute left-3 top-10 md:top-11 h-4 w-4 md:h-5 md:w-5 text-gray-400 pointer-events-none" />

                  {destinationDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 md:max-h-60 overflow-y-auto">
                      {provinces
                        .filter((p) =>
                          p.name.includes(destinationSearch) || destinationSearch === ""
                        )
                        .map((province) => (
                          <button
                            key={province.name}
                            onClick={() => {
                              setSelectedDestination(province.name);
                              setDestinationSearch("");
                              setDestinationDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 text-right text-sm md:text-base hover:bg-orange-50 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                          >
                            <span>{province.name}</span>
                            <span className="text-lg md:text-xl">{province.icon}</span>
                          </button>
                        ))}
                    </div>
                  )}
                </div>

                {/* Date Selector */}
                <div className="relative flex-1 min-w-[180px] xl:hidden">
                  <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">تاریخ</div>
                  <div
                    onClick={() => setDateDropdown(!dateDropdown)}
                    className="w-full px-4 py-3 md:py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right text-sm md:text-base text-gray-900 cursor-pointer flex items-center justify-between"
                  >
                    <span className="text-gray-500">Move date</span>
                    <Calendar className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                  </div>

                  {dateDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 space-y-3">
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <label className="text-xs md:text-sm text-gray-700 mb-2 block text-right font-medium">تاریخ رفت</label>
                        <input
                          type="date"
                          value={departureDate}
                          onChange={(e) => setDepartureDate(e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-right text-sm md:text-base text-gray-900 cursor-pointer"
                          onClick={(e) => e.currentTarget.showPicker?.()}
                        />
                      </div>

                      <div className="p-3 border border-gray-200 rounded-lg">
                        <label className="text-xs md:text-sm text-gray-700 mb-2 block text-right font-medium">تاریخ برگشت (اختیاری)</label>
                        <input
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-right text-sm md:text-base text-gray-900 cursor-pointer"
                          onClick={(e) => e.currentTarget.showPicker?.()}
                        />
                      </div>

                      <button
                        onClick={() => setDateDropdown(false)}
                        className="w-full py-2.5 bg-orange-500 text-white rounded-lg text-sm md:text-base font-medium hover:bg-orange-600 transition"
                      >
                        تایید
                      </button>
                    </div>
                  )}
                </div>

                {/* Departure Date - Large Desktop only */}
                <div className="relative flex-1 min-w-[180px] hidden xl:block">
                  <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">تاریخ رفت</div>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full px-4 py-3 md:py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right text-sm md:text-base text-gray-900 cursor-pointer"
                    onClick={(e) => e.currentTarget.showPicker?.()}
                  />
                </div>

                {/* Return Date - Large Desktop only */}
                <div className="relative flex-1 min-w-[180px] hidden xl:block">
                  <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">تاریخ برگشت (اختیاری)</div>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-4 py-3 md:py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right text-sm md:text-base text-gray-900 cursor-pointer"
                    onClick={(e) => e.currentTarget.showPicker?.()}
                  />
                </div>

                {/* Passengers */}
                <div className="relative flex-1 min-w-[160px]">
                  <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">مسافران</div>
                  <Users className="absolute left-3 top-10 md:top-11 h-4 w-4 md:h-5 md:w-5 text-gray-400 pointer-events-none" />
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full px-4 py-3 md:py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right text-sm md:text-base text-gray-900 cursor-pointer">
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
                  className="px-6 md:px-8 py-3 md:py-3.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition text-sm md:text-base whitespace-nowrap flex-shrink-0 mt-6 md:mt-7 xl:mt-8 shadow-md">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Buses List */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">اتوبوس‌های موجود</h2>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {buses.map((bus) => (
                <div key={bus._id} className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-md">
                  <div className="grid md:grid-cols-5 gap-6 items-center">
                    {/* Operator Info */}
                    <div className="md:col-span-1 text-right">
                      <p className="text-sm text-gray-600">اپراتور</p>
                      <p className="text-lg font-bold text-gray-900">{bus.operatorName}</p>
                      <p className="text-xs text-gray-500 mt-1">{getBusTypeLabel(bus.busType)}</p>
                      {bus.rating && (
                        <div className="flex items-center justify-end gap-1 mt-2">
                          <span className="text-sm font-semibold text-gray-700">{bus.rating}</span>
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        </div>
                      )}
                    </div>

                    {/* Route */}
                    <div className="md:col-span-1 text-right">
                      <div className="flex items-center justify-end gap-2 mb-2">
                        <span className="font-semibold text-gray-900">{bus.from}</span>
                        <MapPin className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="border-r-2 border-gray-300 h-6 mr-2" />
                      <div className="flex items-center justify-end gap-2 mt-2">
                        <span className="font-semibold text-gray-900">{bus.to}</span>
                        <MapPin className="h-4 w-4 text-green-500" />
                      </div>
                    </div>

                    {/* Time */}
                    <div className="md:col-span-1 text-right">
                      <div className="flex items-center justify-end gap-2 mb-3">
                        <span className="font-semibold text-gray-900">{bus.departureTime}</span>
                        <Clock className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm text-gray-600">{bus.arrivalTime}</span>
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    {/* Seats */}
                    <div className="md:col-span-1 text-right">
                      <div className="flex items-center justify-end gap-2 mb-2">
                        <span className="text-sm">
                          {bus.availableSeats} / {bus.totalSeats} صندلی
                        </span>
                        <Users className="h-4 w-4 text-purple-500" />
                      </div>
                      {bus.amenities?.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500">
                            {bus.amenities.join(" • ")}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Price & Book */}
                    <div className="md:col-span-1 text-right">
                      <p className="text-xs text-gray-500 mb-1">قیمت</p>
                      <p className="text-3xl font-bold text-orange-500">${bus.price}</p>
                      <p className="text-xs text-gray-600 mb-3">به ازای هر نفر</p>
                      <Link
                        href={`/bus-booking/${bus._id}`}
                        className="block w-full rounded-lg px-6 py-3 font-semibold text-center text-white bg-orange-500 hover:bg-orange-600 transition"
                      >
                        رزرو بلیط
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Info Cards */}
        <section className="mx-auto max-w-6xl px-4 mb-12 grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-right">
            <div className="text-3xl mb-3">💳</div>
            <h3 className="font-bold text-gray-900 mb-2">پرداخت امن</h3>
            <p className="text-sm text-gray-600">
              تمام پرداخت‌ها از طریق درگاه‌های معتبر انجام می‌شود
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 text-right">
            <div className="text-3xl mb-3">⭐</div>
            <h3 className="font-bold text-gray-900 mb-2">اپراتورهای تأیید شده</h3>
            <p className="text-sm text-gray-600">
              تمام اپراتورها توسط افغانی‌بابا بررسی و تأیید شده‌اند
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 text-right">
            <div className="text-3xl mb-3">📞</div>
            <h3 className="font-bold text-gray-900 mb-2">پشتیبانی ۲۴/۷</h3>
            <p className="text-sm text-gray-600">
              تیم پشتیبانی ما همیشه برای کمک آماده است
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}