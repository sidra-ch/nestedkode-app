"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useAuthStore from "@/store/useAuthStore";

type Booking = {
  travelDate: string;
  status: string;
  paymentStatus: string;
  totalPrice: number;
};

type Stats = {
  totalBookings: number;
  upcomingTrips: number;
  completedTrips: number;
  totalSpent: number;
};


export default function ProfileDashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    upcomingTrips: 0,
    completedTrips: 0,
    totalSpent: 0,
  });

  const fetchUserStats = async () => {
    try {
      const response = await fetch("/api/bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        const bookings: Booking[] = data.bookings;
        setStats({
          totalBookings: bookings.length,
          upcomingTrips: bookings.filter((b) => new Date(b.travelDate) > new Date() && b.status !== "cancelled").length,
          completedTrips: bookings.filter((b) => b.status === "completed").length,
          totalSpent: bookings.reduce((sum, b) => sum + (b.paymentStatus === "paid" ? b.totalPrice : 0), 0),
        });
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    (async () => {
      await fetchUserStats();
    })();
  }, [isAuthenticated, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">داشبورد کاربری</h1>
          <p className="mt-2 text-gray-600">خوش آمدید {user.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">کل رزروها</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">سفرهای پیش‌رو</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">{stats.upcomingTrips}</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">سفرهای انجام شده</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">{stats.completedTrips}</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مجموع هزینه‌ها</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{stats.totalSpent.toLocaleString()} <span className="text-sm text-gray-600">افغانی</span></p>
              </div>
              <div className="rounded-full bg-yellow-100 p-3">
                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/my-bookings" className="group rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-[#FDB713]/20 p-3 group-hover:bg-[#FDB713]/30 transition">
                <svg className="h-6 w-6 text-[#FDB713]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">سفرهای من</h3>
                <p className="text-sm text-gray-600">مشاهده تمام رزروها</p>
              </div>
            </div>
          </Link>

          <Link href="/bus" className="group rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3 group-hover:bg-blue-200 transition">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">رزرو جدید</h3>
                <p className="text-sm text-gray-600">خرید بلیط سفر</p>
              </div>
            </div>
          </Link>

          <Link href="/help-center" className="group rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3 group-hover:bg-green-200 transition">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">پشتیبانی</h3>
                <p className="text-sm text-gray-600">راهنما و سوالات</p>
              </div>
            </div>
          </Link>
        </div>

        {/* User Info */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">اطلاعات کاربری</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">نام</p>
              <p className="font-semibold text-gray-900">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">ایمیل</p>
              <p className="font-semibold text-gray-900">{user.email}</p>
            </div>
            {user.phone && (
              <div>
                <p className="text-sm text-gray-600">شماره تماس</p>
                <p className="font-semibold text-gray-900">{user.phone}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600">نقش</p>
              <p className="font-semibold text-gray-900">
                {user.role === "admin" ? "مدیر" : user.role === "vendor" ? "فروشنده" : "کاربر"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
