"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TaxiForm from "@/components/search/TaxiForm";
import { MapPin, Users, Car, Star, Clock, CheckCircle } from "lucide-react";

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
  departureDate: Date;
  price: number;
  totalSeats: number;
  availableSeats: number;
  amenities: string[];
  isApproved: boolean;
  rating?: number;
}

export default function TaxiPage() {
  const [taxis, setTaxis] = useState<Taxi[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
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
      minivan: "مینی وان",
      luxury: "لوکسری",
    };
    return labels[vehicleType] || vehicleType;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: "rtl" }}>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-72 bg-gradient-to-r from-blue-600 to-blue-500">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 mx-auto h-full max-w-6xl px-4 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-3">تاکسی را به سادگی رزرو کنید</h1>
            <p className="text-white/90">سریع، ایمن و قابل اعتماد</p>
          </div>
        </section>

        {/* Search Section */}
        <section className="mx-auto max-w-6xl px-4 -mt-20 relative z-20 mb-12">
          <TaxiForm />
        </section>

        {/* Filters Section */}
        <section className="mx-auto max-w-6xl px-4 mb-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">مکان برداشتن</label>
              <input
                type="text"
                value={filters.from}
                onChange={(e) => setFilters({ ...filters, from: e.target.value })}
                placeholder="شهر مبدا"
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">مقصد</label>
              <input
                type="text"
                value={filters.to}
                onChange={(e) => setFilters({ ...filters, to: e.target.value })}
                placeholder="شهر مقصد"
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">تاریخ</label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm"
              />
            </div>
          </div>
        </section>

        {/* Taxis Grid */}
        <section className="mx-auto max-w-6xl px-4 mb-12">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">در حال بارگذاری...</p>
            </div>
          ) : taxis && taxis.length > 0 ? (
            <div className="grid gap-4">
              {taxis.map((taxi) => (
                <div
                  key={taxi._id}
                  className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-md"
                >
                  <div className="grid md:grid-cols-5 gap-6 items-center">
                    {/* Driver & Vehicle Info */}
                    <div className="md:col-span-1 text-right">
                      <p className="text-sm font-semibold text-gray-700 mb-1">راننده</p>
                      <p className="text-lg font-bold text-gray-900">{taxi.driverName}</p>
                      <div className="flex items-center justify-end gap-1 mt-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-green-600">تأیید شده</span>
                      </div>
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
                      <div className="border-r-2 border-gray-300 h-6" />
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
                      <p className="text-3xl font-bold" style={{ color: '#F97316' }}>{taxi.price}</p>
                      <p className="text-xs text-gray-600 mb-3">افغانی</p>
                      <button 
                        className="w-full rounded-lg px-6 py-3 font-semibold text-white transition"
                        style={{ backgroundColor: '#F97316' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C2410C')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F97316')}
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
