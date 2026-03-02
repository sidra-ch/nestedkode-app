"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import useAuthStore from "@/store/useAuthStore";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type RevenueItem = {
  route: string;
  busesToday: number;
  seatsSold: number;
  revenue: number;
};

export default function VendorDashboardPage() {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuthStore();

  const [stats, setStats] = useState({
    busesRunningToday: 0,
    seatsSold: 0,
    revenue: 0,
    totalBuses: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "vendor") {
      router.push("/login");
      return;
    }

    const vendorId = user.vendorId || user.id;
    if (!vendorId) return;

    let active = true;

    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_BASE}/api/vendor/revenue?vendorId=${encodeURIComponent(vendorId)}`,
          {
            headers: { "Authorization": `Bearer ${token}` }
          }
        );
        if (!res.ok) throw new Error("FAILED_TO_LOAD");
        const data = await res.json();
        const items: RevenueItem[] = data.items || [];
        if (!active) return;

        const totals = items.reduce(
          (acc, item) => {
            acc.busesRunningToday += item.busesToday || 0;
            acc.seatsSold += item.seatsSold || 0;
            acc.revenue += item.revenue || 0;
            return acc;
          },
          { busesRunningToday: 0, seatsSold: 0, revenue: 0, totalBuses: items.length }
        );

        setStats(totals);
      } catch (fetchError) {
        if (active) setError("Failed to load vendor stats.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchStats();
    return () => {
      active = false;
    };
  }, [isAuthenticated, user, router, token]);

  if (!isAuthenticated || user?.role !== "vendor") {
    return null;
  }

  return (
    <ProtectedRoute allowedRoles={["vendor"]}>
      <div className="min-h-screen bg-gray-50 flex flex-col font-['Noto_Sans_Arabic']" dir="rtl">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-10 w-full">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-black text-gray-900">پنل فروشنده</h1>
              <p className="text-gray-500 mt-1">خوش آمدید، {user.name}</p>
            </div>
            <a
              href="/vendor/add-bus"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-orange-200 transition"
            >
              + ثبت اتوبوس جدید
            </a>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Business Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 transition hover:shadow-md">
              <p className="text-gray-500 text-sm mb-2">سرویس‌های امروز</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-gray-900">{loading ? "..." : stats.busesRunningToday}</span>
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">BUSES</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 transition hover:shadow-md">
              <p className="text-gray-500 text-sm mb-2">بلیط‌های فروخته شده</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-green-600">{loading ? "..." : stats.seatsSold}</span>
                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold">TICKETS</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 transition hover:shadow-md">
              <p className="text-gray-500 text-sm mb-2">درآمد کل (امروز)</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-orange-600">{loading ? "..." : `دلار ${stats.revenue}`}</span>
                <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">REVENUE</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 transition hover:shadow-md">
              <p className="text-gray-500 text-sm mb-2">کل ناوگان فعال</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-purple-600">{loading ? "..." : stats.totalBuses}</span>
                <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-bold">FLEET</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">گزارشات تحلیلی</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">به زودی می‌توانید گزارشات دقیق‌تری از فروش و عملکرد مسیرهای خود را در این بخش مشاهده کنید.</p>
                <div className="flex gap-4 justify-center">
                  <a href="/vendor/bookings" className="text-orange-600 font-bold hover:bg-orange-50 px-6 py-3 rounded-2xl transition">مشاهده رزروها</a>
                  <a href="/vendor/buses" className="text-gray-600 font-bold hover:bg-gray-50 px-6 py-3 rounded-2xl transition">مدیریت اتوبوس‌ها</a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">دسترسی سریع</h2>
                <div className="grid grid-cols-1 gap-3">
                  <a href="/vendor/buses" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-2xl flex items-center justify-between group transition">
                    <span className="font-bold text-gray-700 group-hover:text-orange-500">لیست اتوبوس‌ها</span>
                    <span className="text-gray-300">←</span>
                  </a>
                  <a href="/vendor/bookings" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-2xl flex items-center justify-between group transition">
                    <span className="font-bold text-gray-700 group-hover:text-orange-500">تاریخچه رزروها</span>
                    <span className="text-gray-300">←</span>
                  </a>
                  <a href="/vendor/revenue" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-2xl flex items-center justify-between group transition">
                    <span className="font-bold text-gray-700 group-hover:text-orange-500">گزارش مالی</span>
                    <span className="text-gray-300">←</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
