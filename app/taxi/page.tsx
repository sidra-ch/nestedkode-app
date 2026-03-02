"use client";

import { useState, useEffect, Suspense } from "react";
// import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Users, Star, Clock, CheckCircle } from "lucide-react";

interface Taxi {
  _id: string;
  driverName: string;
  driverPhone: string;
  vehicleType: "sedan" | "suv" | "minivan" | "luxury";
  vehicleModel: string;
  vehiclePlate: string;
  vehicleColor: string;
  from: string;
  to: string;
  departureTime: string;
  departureDate: string; // should be string for API data
  price: number;
  totalSeats: number;
  availableSeats: number;
  amenities: string[];
  isApproved: boolean;
  rating?: number;
}

const mockTaxis: Taxi[] = [
  {
    _id: "1",
    driverName: "احمد الله",
    driverPhone: "+93 700 123 456",
    vehicleType: "sedan",
    vehicleModel: "تویوتا کمری",
    vehiclePlate: "۱۲۳۴۵",
    vehicleColor: "سفید",
    from: "کابل",
    to: "مزار شریف",
    departureTime: "08:00",
    departureDate: new Date().toISOString(),
    price: 1500,
    totalSeats: 4,
    availableSeats: 3,
    amenities: ["کیسه هوا", "اینترنت", "آب معدنی"],
    isApproved: true,
    rating: 4.8
  },
  {
    _id: "2",
    driverName: "محمد حسین",
    driverPhone: "+93 700 234 567",
    vehicleType: "suv",
    vehicleModel: "لندکروزر",
    vehiclePlate: "۵۶۷۸۹",
    vehicleColor: "مشکی",
    from: "کابل",
    to: "هرات",
    departureTime: "09:00",
    departureDate: new Date().toISOString(),
    price: 2500,
    totalSeats: 6,
    availableSeats: 4,
    amenities: ["کیسه هوا", "سیستم صوتی", "تهویه مطبوع"],
    isApproved: true,
    rating: 4.9
  },
  {
    _id: "3",
    driverName: "عبدالله",
    driverPhone: "+93 700 345 678",
    vehicleType: "minivan",
    vehicleModel: "هیوندای استارکس",
    vehiclePlate: "۹۰۱۲۳",
    vehicleColor: "سفید",
    from: "کابل",
    to: "قندهار",
    departureTime: "07:00",
    departureDate: new Date().toISOString(),
    price: 1800,
    totalSeats: 7,
    availableSeats: 5,
    amenities: ["تهویه مطبوع", "موقعیت یاب", "آب معدنی"],
    isApproved: true,
    rating: 4.7
  },
];

function TaxiPageContent() {
  const [taxis, setTaxis] = useState<Taxi[]>(mockTaxis);
  const [loading, setLoading] = useState(true);
  const [filters] = useState({
    from: "",
    to: "",
    date: "",
  });

  useEffect(() => {
    const fetchTaxis = async () => {
      try {
        const query = new URLSearchParams();
        if (filters.from) query.append("from", filters.from);
        if (filters.to) query.append("to", filters.to);
        if (filters.date) query.append("date", filters.date);

        const response = await fetch(`/api/taxis?${query.toString()}`);
        const data = await response.json();

        if (data.success) {
          setTaxis(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch taxis:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaxis();
  }, [filters]);

  const getVehicleIcon = (vehicleType: string) => {
    const types: Record<string, string> = {
      sedan: "🚗",
      suv: "🚙",
      minivan: "🚐",
      luxury: "🏎️",
    };
    return types[vehicleType] || "🚗";
  };

  const getVehicleLabel = (vehicleType: string) => {
    const labels: Record<string, string> = {
      sedan: "سدان",
      suv: "اس یو وی",
      minivan: "مینی ون",
      luxury: "لوکس",
    };
    return labels[vehicleType] || vehicleType;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: "rtl" }}>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Image */}
        <section className="relative h-72 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/assets/taxi1.jpg')` }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 mx-auto h-full max-w-6xl px-4 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-3">تاکسی بین‌شهری</h1>
            <p className="text-white/90">سفری راحت و امن با تاکسی‌های معتبر</p>
          </div>
        </section>

        {/* Popular Routes */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">مسیرهای محبوب تاکسی</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/taxi?from=کابل&to=مزار شریف" className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md">
              <div>
                <p className="text-sm font-semibold text-gray-900">کابل → مزار شریف</p>
                <p className="text-xs text-gray-500">از ۱۵۰۰ افغانی</p>
              </div>
              <span className="text-xs font-semibold text-orange-500">رزرو</span>
            </Link>
            <Link href="/taxi?from=کابل&to=هرات" className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md">
              <div>
                <p className="text-sm font-semibold text-gray-900">کابل → هرات</p>
                <p className="text-xs text-gray-500">از ۲۵۰۰ افغانی</p>
              </div>
              <span className="text-xs font-semibold text-orange-500">رزرو</span>
            </Link>
            <Link href="/taxi?from=کابل&to=قندهار" className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md">
              <div>
                <p className="text-sm font-semibold text-gray-900">کابل → قندهار</p>
                <p className="text-xs text-gray-500">از ۱۸۰۰ افغانی</p>
              </div>
              <span className="text-xs font-semibold text-orange-500">رزرو</span>
            </Link>
          </div>
        </section>

        {/* Taxis Grid */}
        <section className="mx-auto max-w-6xl px-4 mb-12">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">در حال بارگذاری...</p>
            </div>
          ) : taxis && taxis.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">تاکسی‌های موجود</h2>
              {taxis.map((taxi) => (
                <div
                  key={taxi._id}
                  className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-md"
                >
                  <div className="grid md:grid-cols-5 gap-6 items-center">
                    {/* Driver & Vehicle Info */}
                    <div className="md:col-span-1 text-right">
                      <div className="flex items-center gap-3 mb-2 justify-end">
                        <div>
                          <p className="text-sm font-semibold text-gray-700">راننده</p>
                          <p className="text-lg font-bold text-gray-900">{taxi.driverName}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-xl font-bold text-orange-600">{taxi.driverName[0]}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-1 mt-2">
                        <span className="text-xs text-green-600">تأیید شده</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      {taxi.rating && (
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <span className="text-sm font-semibold text-gray-700">{taxi.rating}</span>
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        </div>
                      )}
                    </div>

                    {/* Vehicle Details */}
                    <div className="md:col-span-1 text-right">
                      <p className="text-3xl">{getVehicleIcon(taxi.vehicleType)}</p>
                      <p className="text-sm font-semibold text-gray-700 mt-2">{getVehicleLabel(taxi.vehicleType)}</p>
                      <p className="text-xs text-gray-500">{taxi.vehicleModel}</p>
                      <p className="text-xs text-gray-500 mt-1 font-mono">{taxi.vehiclePlate}</p>
                    </div>

                    {/* Route */}
                    <div className="md:col-span-1 text-right">
                      <div className="flex items-center justify-end gap-2 mb-2">
                        <span className="font-semibold text-gray-900">{taxi.from}</span>
                        <MapPin className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="border-r-2 border-gray-300 h-6 mr-2" />
                      <div className="flex items-center justify-end gap-2 mt-2">
                        <span className="font-semibold text-gray-900">{taxi.to}</span>
                        <MapPin className="h-4 w-4 text-green-500" />
                      </div>
                    </div>

                    {/* Time & Capacity */}
                    <div className="md:col-span-1 text-right">
                      <div className="flex items-center justify-end gap-2 mb-3">
                        <span className="font-semibold text-gray-900">
                          {new Date(taxi.departureDate).toLocaleDateString("fa-AF")} {taxi.departureTime}
                        </span>
                        <Clock className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm">
                          {taxi.availableSeats} / {taxi.totalSeats} صندلی
                        </span>
                        <Users className="h-4 w-4 text-purple-500" />
                      </div>
                      {taxi.amenities?.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500">
                            {taxi.amenities.slice(0, 2).join(" • ")}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Price & Book */}
                    <div className="md:col-span-1 text-right">
                      <p className="text-xs text-gray-500 mb-1">قیمت</p>
                      <p className="text-3xl font-bold text-orange-500">{taxi.price}</p>
                      <p className="text-xs text-gray-600 mb-3">افغانی</p>
                      <button
                        className="w-full rounded-lg px-6 py-3 font-semibold text-white bg-orange-500 hover:bg-orange-600 transition"
                      >
                        رزرو تاکسی
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">تاکسی‌ای یافت نشد</p>
            </div>
          )}
        </section>

        {/* Info Section */}
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
            <h3 className="font-bold text-gray-900 mb-2">رانندگان تأیید شده</h3>
            <p className="text-sm text-gray-600">
              تمام رانندگان توسط افغانی‌بابا بررسی و تأیید شده‌اند
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

export default function TaxiPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">در حال بارگذاری...</div>}>
      <TaxiPageContent />
    </Suspense>
  );
}
