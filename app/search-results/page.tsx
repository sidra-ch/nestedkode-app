"use client";


import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "bus";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";
  const passengers = searchParams.get("passengers") || "1";

  const [loading, setLoading] = useState(false);
  const [buses, setBuses] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (type !== "bus") return;
    setLoading(true);
    setError("");
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (date) params.set("date", date);
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
  }, [type, from, to, date]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: "rtl" }}>
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-right">نتایج جستجو</h1>
        <div className="bg-white rounded-xl p-6 mb-8 shadow">
          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            <span>نوع: <b>{type}</b></span>
            <span>مبدا: <b>{from}</b></span>
            <span>مقصد: <b>{to}</b></span>
            <span>تاریخ: <b>{date}</b></span>
            <span>مسافران: <b>{passengers}</b></span>
          </div>
        </div>
        {type === "bus" && (
          <div>
            {loading && <div className="text-center text-gray-500 py-8">در حال بارگذاری...</div>}
            {error && <div className="text-center text-red-500 py-8">{error}</div>}
            {!loading && !error && buses.length === 0 && (
              <div className="text-center text-gray-500 py-8">هیچ اتوبوسی یافت نشد.</div>
            )}
            <div className="grid gap-6">
              {buses.map((bus) => (
                <div key={bus._id} className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-md">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-lg text-gray-900">{bus.busName}</span>
                        <span className="text-xs text-gray-500">{bus.busType}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-700">{bus.from}</span>
                        <span className="text-gray-400">→</span>
                        <span className="text-gray-700">{bus.to}</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-1">تاریخ حرکت: {bus.departureTime}</div>
                      <div className="text-xs text-gray-500 mb-1">قیمت: <span className="font-bold text-orange-500">{bus.price} افغانی</span></div>
                      <div className="text-xs text-gray-500">صندلی‌های خالی: {bus.availableSeats} / {bus.totalSeats}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Link href={`/bus-booking/${bus._id}`} className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition">رزرو</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {type !== "bus" && (
          <div className="text-center text-gray-500 py-12">
            <p>در حال حاضر فقط جستجوی اتوبوس پیاده‌سازی شده است.</p>
            <Link href="/bus" className="inline-block mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition">بازگشت به اتوبوس‌ها</Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
