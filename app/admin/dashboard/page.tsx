"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import useAuthStore from "@/store/useAuthStore";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/login");
      return;
    }
    fetchData();
  }, [isAuthenticated, user, router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/admin/users`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportBookings = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/export/bookings`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bookings.csv";
        a.click();
      }
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  const handleExportPayments = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/export/payments`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "payments.csv";
        a.click();
      }
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50 flex flex-col font-['Noto_Sans_Arabic']" dir="rtl">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-10 w-full">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-black text-gray-900">داشبورد مدیریت</h1>
            <div className="flex gap-2 text-sm text-gray-500">
              <span>آخرین بروزرسانی: {new Date().toLocaleTimeString('fa-IR')}</span>
            </div>
          </div>

          {/* Activity Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 transition hover:shadow-md">
              <p className="text-gray-500 text-sm mb-2">کل کاربران</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-gray-900">{stats?.totalUsers || 0}</span>
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold font-sans">TOTAL</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 transition hover:shadow-md">
              <p className="text-gray-500 text-sm mb-2">فعال امروز</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-green-600">{stats?.activeToday || 0}</span>
                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold font-sans">ONLINE</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 transition hover:shadow-md">
              <p className="text-gray-500 text-sm mb-2">فروشندگان</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-orange-600">{stats?.vendors || 0}</span>
                <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold font-sans">VENDORS</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 transition hover:shadow-md">
              <p className="text-gray-500 text-sm mb-2">مدیران</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-purple-600">{stats?.admins || 0}</span>
                <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-bold font-sans">ADMINS</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Recent Logins Table */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">آخرین فعالیت کاربران</h2>
                <button onClick={fetchData} className="text-orange-500 hover:text-orange-600 text-sm font-bold">بروزرسانی</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">کاربر</th>
                      <th className="px-6 py-4">نقش</th>
                      <th className="px-6 py-4">آخرین ورود</th>
                      <th className="px-6 py-4">تعداد ورود</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-400 font-sans italic">Loading...</td></tr>
                    ) : users.length === 0 ? (
                      <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-400">داده‌ای یافت نشد</td></tr>
                    ) : (
                      users.map((u) => (
                        <tr key={u._id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-gray-900">{u.name}</span>
                              <span className="text-xs text-gray-500 font-sans">{u.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase font-sans ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                u.role === 'vendor' ? 'bg-blue-100 text-blue-700' :
                                  'bg-gray-100 text-gray-600'
                              }`}>
                              {u.role === 'admin' ? 'مدیر' : u.role === 'vendor' ? 'فروشنده' : 'کاربر'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 font-sans">
                            {u.lastLogin ? new Date(u.lastLogin).toLocaleString('fa-IR') : '---'}
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm font-bold text-gray-700 font-sans">{u.loginCount || 0}</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions & Export */}
            <div className="space-y-6 text-right">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">خروجی داده‌ها</h2>
                <div className="space-y-3">
                  <button
                    onClick={handleExportBookings}
                    className="w-full bg-orange-50 text-orange-600 hover:bg-orange-100 py-4 rounded-2xl font-bold transition flex items-center justify-center gap-2"
                  >
                    <span>خروجی رزروها (CSV)</span>
                  </button>
                  <button
                    onClick={handleExportPayments}
                    className="w-full bg-green-50 text-green-600 hover:bg-green-100 py-4 rounded-2xl font-bold transition flex items-center justify-center gap-2"
                  >
                    <span>خروجی پرداخت‌ها (CSV)</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">دسترسی سریع</h2>
                <div className="grid grid-cols-2 gap-3">
                  <a href="/admin/vendors" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-2xl text-center group transition">
                    <p className="font-bold text-gray-700 group-hover:text-orange-500">فروشندگان</p>
                  </a>
                  <a href="/admin/payments" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-2xl text-center group transition">
                    <p className="font-bold text-gray-700 group-hover:text-orange-500">پرداخت‌ها</p>
                  </a>
                  <a href="/admin/routes" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-2xl text-center group transition">
                    <p className="font-bold text-gray-700 group-hover:text-orange-500">مسیرها</p>
                  </a>
                  <a href="/admin" className="bg-orange-50 p-4 rounded-2xl text-center group transition">
                    <p className="font-bold text-orange-600">بروزرسانی</p>
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
