"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import useAuthStore from "@/store/useAuthStore";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type Booking = {
  _id: string;
  busId?: {
    origin?: string;
    destination?: string;
  };
  totalPrice: number;
  paymentStatus: string;
};

type Analytics = {
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
  totalVendors: number;
  recentBookings: Booking[];
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuthStore();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/login");
      return;
    }

    fetchAnalytics();
  }, [isAuthenticated, user, router, token]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE}/api/admin/analytics`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      } else {
        setError("Failed to load analytics");
      }
    } catch (err) {
      setError("Error loading analytics");
    } finally {
      setLoading(false);
    }
  };

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
    } catch (err) {
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
    } catch (err) {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-gray-600">Loading analytics...</p>
        ) : analytics ? (
          <>
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600 text-sm font-semibold mb-2">Total Bookings</p>
                <p className="text-3xl font-bold text-yellow-500">
                  {analytics.totalBookings}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600 text-sm font-semibold mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600">
                  ${analytics.totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600 text-sm font-semibold mb-2">Total Users</p>
                <p className="text-3xl font-bold text-blue-600">
                  {analytics.totalUsers}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600 text-sm font-semibold mb-2">Total Vendors</p>
                <p className="text-3xl font-bold text-purple-600">
                  {analytics.totalVendors}
                </p>
              </div>
            </div>

            {/* Export Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Export Data</h2>
              <div className="flex gap-3">
                <button
                  onClick={handleExportBookings}
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-lg font-semibold"
                >
                  Export Bookings (CSV)
                </button>
                <button
                  onClick={handleExportPayments}
                  className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg font-semibold"
                >
                  Export Payments (CSV)
                </button>
              </div>
            </div>

            {/* Recent Bookings */}
            {analytics.recentBookings && analytics.recentBookings.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Bookings</h2>
                <div className="space-y-3">
                  {analytics.recentBookings.slice(0, 5).map((booking) => (
                    <div
                      key={booking._id}
                      className="flex justify-between items-center border-b border-gray-200 pb-3"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {booking.busId?.origin} → {booking.busId?.destination}
                        </p>
                        <p className="text-xs text-gray-500">{booking._id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${booking.totalPrice}
                        </p>
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            booking.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {booking.paymentStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <a
                    href="/admin/bookings"
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    View All Bookings →
                  </a>
                </div>
              </div>
            )}
          </>
        ) : null}
      </main>
      <Footer />
    </div>
    </ProtectedRoute>
  );
}
