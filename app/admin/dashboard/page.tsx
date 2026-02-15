"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import useAuthStore from "@/store/useAuthStore";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/login");
      return;
    }
  }, [isAuthenticated, user, router]);

  const handleExportBookings = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/export/bookings`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bookings.csv";
        a.click();
      } else {
        alert("Failed to export bookings");
      }
    } catch {
      alert("Error exporting bookings");
    }
  };

  const handleExportPayments = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/export/payments`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "payments.csv";
        a.click();
      } else {
        alert("Failed to export payments");
      }
    } catch {
      alert("Error exporting payments");
    }
  };

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">داشبورد ادمین</h1>

        {/* Export Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">خروجی داده</h2>
          <div className="flex gap-3">
            <button
              onClick={handleExportBookings}
              className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-4 py-2 rounded-lg font-semibold"
            >
              خروجی رزروها (CSV)
            </button>
            <button
              onClick={handleExportPayments}
              className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg font-semibold"
            >
              خروجی پرداخت‌ها (CSV)
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">دسترسی سریع</h2>
          <div className="flex flex-wrap gap-4">
            <a href="/admin/payments" className="text-orange-600 hover:underline font-medium">پرداخت‌ها</a>
            <a href="/admin/routes" className="text-orange-600 hover:underline font-medium">مسیرها</a>
            <a href="/admin/vendors" className="text-orange-600 hover:underline font-medium">فروشندگان</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </ProtectedRoute>
  );
}
