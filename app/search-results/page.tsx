"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type FilterType = {
  busType: string[];
  priceRange: [number, number];
  departureTime: string[];
  amenities: string[];
};

export default function SearchResults() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";

  const [buses, setBuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("price");
  const [filters, setFilters] = useState<FilterType>({
    busType: [],
    priceRange: [0, 10000],
    departureTime: [],
    amenities: [],
  });

  useEffect(() => {
    fetchBuses();
  }, [from, to]);

  const fetchBuses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/buses?from=${from}&to=${to}`);
      const data = await response.json();
      if (data.success) {
        setBuses(data.buses);
      }
    } catch (error) {
      console.error("Failed to fetch buses:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedBuses = buses
    .filter((bus) => {
      if (filters.busType.length && !filters.busType.includes(bus.busType)) return false;
      if (bus.price < filters.priceRange[0] || bus.price > filters.priceRange[1]) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "departure") return a.departureTime.localeCompare(b.departureTime);
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Search Summary */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-900">
                {from} → {to}
              </h1>
              <p className="text-sm text-gray-600">{date}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">مرتب‌سازی:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
              >
                <option value="price">ارزان‌ترین</option>
                <option value="departure">زودترین حرکت</option>
                <option value="rating">بهترین امتیاز</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-sm sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">فیلترها</h2>

              {/* Bus Type Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">نوع اتوبوس</h3>
                <div className="space-y-2">
                  {["VIP", "AC", "Non-AC", "Sleeper"].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.busType.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({ ...filters, busType: [...filters.busType, type] });
                          } else {
                            setFilters({
                              ...filters,
                              busType: filters.busType.filter((t) => t !== type),
                            });
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">محدوده قیمت</h3>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    setFilters({ ...filters, priceRange: [0, Number(e.target.value)] })
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                  <span>0 افغانی</span>
                  <span>{filters.priceRange[1]} افغانی</span>
                </div>
              </div>

              {/* Departure Time */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">زمان حرکت</h3>
                <div className="space-y-2">
                  {["صبح (06-12)", "ظهر (12-18)", "شب (18-24)"].map((time) => (
                    <label key={time} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700">{time}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() =>
                  setFilters({
                    busType: [],
                    priceRange: [0, 10000],
                    departureTime: [],
                    amenities: [],
                  })
                }
                className="w-full rounded-lg border border-gray-300 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                پاک کردن فیلترها
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#FDB713] border-r-transparent"></div>
                <p className="mt-4 text-gray-600">در حال جستجو...</p>
              </div>
            ) : filteredAndSortedBuses.length === 0 ? (
              <div className="rounded-lg bg-white p-12 text-center shadow-sm">
                <p className="text-lg text-gray-600">موردی یافت نشد</p>
                <p className="mt-2 text-sm text-gray-500">لطفا فیلترها را تغییر دهید</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedBuses.map((bus) => (
                  <div
                    key={bus._id}
                    className="rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{bus.busName}</h3>
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            {bus.busType}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{bus.vendorName}</p>

                        <div className="mt-4 grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">حرکت</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {bus.departureTime}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">رسیدن</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {bus.arrivalTime}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">مدت سفر</p>
                            <p className="text-sm font-semibold text-gray-900">{bus.duration}</p>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {bus.amenities?.slice(0, 4).map((amenity: string, idx: number) => (
                            <span
                              key={idx}
                              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-left">
                        <div className="mb-2">
                          <p className="text-2xl font-bold text-[#FDB713]">
                            {bus.price.toLocaleString()}
                            <span className="text-sm text-gray-600"> افغانی</span>
                          </p>
                          <p className="text-xs text-gray-500">
                            {bus.availableSeats} صندلی باقی‌مانده
                          </p>
                        </div>
                        <Link
                          href={`/bus-booking/${bus._id}`}
                          className="block w-full rounded-lg bg-[#FDB713] px-6 py-3 text-center font-semibold text-black hover:bg-[#e6a512]"
                        >
                          انتخاب صندلی
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
