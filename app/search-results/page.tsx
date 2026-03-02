"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Star, ChevronRight, MapPin, Calendar, Users, Bus, Hotel as HotelIcon } from "lucide-react";
import BranchesMap from "@/components/maps/BranchesMap";
import { formatDualDate } from "@/lib/date-utils";

const SearchResultsContent = () => {
  const searchParams = useSearchParams();
  const [hotels, setHotels] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [buses, setBuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const rawType = searchParams?.get("type") || "hotel";
  const type = rawType.toLowerCase().trim();

  const city = searchParams?.get("city") || "";
  const checkIn = searchParams?.get("checkIn") || "";
  const checkOut = searchParams?.get("checkOut") || "";
  const guests = searchParams?.get("guests") || "";

  // Aliases for bus search compatibility
  const destination = city || searchParams?.get("to") || "";
  const departure = checkIn || searchParams?.get("date") || "";
  const returnDate = checkOut || "";
  const passengers = guests || searchParams?.get("passengers") || "";

  useEffect(() => {
    // Fetch branches for the map
    fetch('/api/branches')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBranches(data.branches);
        }
      });
  }, []);

  useEffect(() => {
    if (type !== "hotel") return;
    setLoading(true);
    setError("");
    const params = new URLSearchParams();
    if (city) params.set("city", city);

    fetch(`/api/hotels?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setHotels(data.hotels);
        } else {
          setError(data.error || "هتلی یافت نشد.");
        }
      })
      .catch(() => setError("خطا در دریافت لیست هتل‌ها."))
      .finally(() => setLoading(false));
  }, [type, city]);

  useEffect(() => {
    if (type !== "bus") return;
    setLoading(true);
    setError("");
    const params = new URLSearchParams();
    if (destination) params.set("from", "کابل");
    if (destination) params.set("to", destination);
    if (departure) params.set("date", departure);
    fetch(`/api/buses?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBuses(data.buses);
        } else {
          setError(data.message || "نتایج یافت نشد.");
        }
      })
      .catch(() => setError("خطا در دریافت نتایج."))
      .finally(() => setLoading(false));
  }, [type, destination, departure]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: "rtl" }}>
      <Navbar />
      <main className="flex-1">
        {/* Banner Section */}
        <div className="w-full h-[200px] md:h-[250px] relative overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${type === 'hotel' ? 'https://res.cloudinary.com/dwmxdyvd2/image/upload/v1772226652/hotelimg_exmle5.webp' : '/assets/home-page.webp'})`,
              filter: "brightness(0.7)"
            }}
          />
          <div className="relative z-10 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {type === "hotel" ? "نتایج جستجوی هتل" : "نتایج جستجوی اتوبوس"}
            </h1>
            <p className="text-gray-200">بهترین قیمت‌ها با افغانی‌بابا</p>
          </div>
        </div>

        {/* Search Info Card */}
        <div className="container mx-auto px-4 -mt-10 relative z-20 mb-10">
          <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs mb-1">نوع جستجو</span>
                <span className="font-bold text-gray-900">{type === "hotel" ? "هتل" : "اتوبوس"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs mb-1">مقصد</span>
                <span className="font-bold text-gray-900">{destination || "همه‌جا"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs mb-1">تاریخ</span>
                <span className="font-bold text-gray-900 text-xs md:text-sm">{formatDualDate(departure) || "نامشخص"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs mb-1">تعداد</span>
                <span className="font-bold text-gray-900">{passengers || "۱ نفر"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-gray-500 font-medium">در حال جستجو...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">خطایی رخ داد</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link href="/" className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold">جستجوی مجدد</Link>
          </div>
        )}

        {/* Hotel Results */}
        {!loading && !error && type === "hotel" && (
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6 mb-12">
              <div className="lg:w-3/4 space-y-6">
                {hotels.length === 0 ? (
                  <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                    <div className="text-4xl mb-4">🏨</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">هتلی یافت نشد</h3>
                    <p className="text-gray-500 mb-6">متأسفانه برای مقصد انتخاب شده هتلی در پایگاه داده ما موجود نیست.</p>
                    <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg">تغییر شهر</Link>
                  </div>
                ) : (
                  hotels.map((hotel) => (
                    <div key={hotel._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-48 md:h-auto relative">
                          <img
                            src={hotel.images?.[0] || "/assets/hotel-placeholder.jpg"}
                            alt={hotel.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <MapPin className="h-4 w-4" />
                                <span>{hotel.city} - {hotel.address}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-bold flex items-center gap-1">
                                {hotel.rating || "4.5"}
                                <Star className="h-3 w-3 fill-white" />
                              </div>
                              <span className="text-[10px] text-gray-400 mt-1">{hotel.reviewCount || 120} نظر</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-6">
                            {(hotel.amenities || []).slice(0, 4).map((amenity: string, i: number) => (
                              <span key={i} className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs border border-gray-100">
                                {amenity}
                              </span>
                            ))}
                          </div>

                          <div className="flex justify-between items-end border-t border-gray-50 pt-4">
                            <div className="text-right">
                              <div className="text-xs text-gray-400">قیمت برای هر شب</div>
                              <div className="text-xl font-black text-blue-600">{hotel.rooms?.[0]?.price.toLocaleString()} افغانی</div>
                            </div>
                            <Link
                              href={`/hotel/${hotel._id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                            >
                              مشاهده اتاق‌ها
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="lg:w-1/4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                  <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-orange-500" />
                      موقعیت روی نقشه
                    </h3>
                  </div>
                  <div className="h-64">
                    <BranchesMap branches={branches} className="h-full w-full" />
                  </div>
                  <div className="p-4 bg-orange-50 flex items-center gap-3">
                    <div className="bg-orange-500 p-2 rounded-full">
                      <Star className="h-4 w-4 text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-orange-900">پیشنهاد افغانی‌بابا</div>
                      <div className="text-[10px] text-orange-700">بهترین قیمت تضمین شده در این شهر</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bus Results */}
        {!loading && !error && type === "bus" && (
          <div className="container mx-auto px-4 py-8">
            <div className="grid gap-6 mb-12">
              {buses.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                  <div className="text-4xl mb-4">🚌</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">اتوبوسی یافت نشد</h3>
                  <p className="text-gray-500">متأسفانه برای مسیر انتخاب شده اتوبوسی در این تاریخ موجود نیست.</p>
                </div>
              ) : (
                buses.map((bus) => (
                  <div key={bus._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                            <Bus className="h-6 w-6 text-orange-500" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">{bus.busName}</h3>
                            <span className="text-xs text-gray-500">{bus.busType}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-700 mb-4">
                          <div className="flex flex-col items-center">
                            <span className="font-bold">{bus.departureTime}</span>
                            <span className="text-xs text-gray-400">{bus.from}</span>
                          </div>
                          <div className="flex-1 flex flex-col items-center">
                            <div className="w-full h-[2px] bg-gray-100 relative">
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                <ChevronRight className="h-4 w-4 text-orange-400" />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="font-bold">-</span>
                            <span className="text-xs text-gray-400">{bus.to}</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-48 flex flex-col items-center justify-center border-t md:border-t-0 md:border-r border-gray-50 pt-4 md:pt-0">
                        <div className="text-xl font-black text-orange-500 mb-4">{bus.price.toLocaleString()} افغانی</div>
                        <Link
                          href={`/bus-booking/${bus._id}?from=${encodeURIComponent("کابل")}&to=${encodeURIComponent(destination)}&date=${departure}&passengers=${passengers}`}
                          className="w-full py-2.5 bg-orange-500 text-white rounded-lg font-bold text-center hover:bg-orange-600 transition shadow-sm"
                        >
                          رزرو صندلی
                        </Link>
                        <p className="text-[10px] text-gray-400 mt-2">صندلی خالی: {bus.availableSeats}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Fallback for other types */}
        {!loading && type !== "hotel" && type !== "bus" && (
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="text-4xl mb-4">🛫</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">بخش در حال توسعه</h2>
            <p className="text-gray-600 mb-8">جستجوی {type} در حال حاضر فعال نیست. لطفاً از بخش اتوبوس یا هتل استفاده کنید.</p>
            <div className="flex justify-center gap-4">
              <Link href="/hotels" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold">هتل‌ها</Link>
              <Link href="/bus" className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold">اتوبوس‌ها</Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
