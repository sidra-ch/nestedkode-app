"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { ChevronDown, User, LogOut, LayoutDashboard, Plane, Hotel, Bus, Compass, ShoppingBag, Menu, X, HelpCircle, MapPin } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [flightDropdownOpen, setFlightDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-300 shadow-sm" style={{ direction: "rtl" }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Right Side: Logo and Main Navigation */}
          <div className="hidden md:flex items-center gap-2 md:gap-4 flex-1">
            {/* Logo */}
            <Link href="/" className="hidden md:flex items-center gap-1 flex-shrink-0">
              <div className="text-xl md:text-2xl font-bold text-afghanibaba-primary">افغانی‌بابا</div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {/* Flight Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-afghanibaba-primary hover:bg-orange-50 rounded transition text-sm">
                  <Plane className="h-4 w-4" />
                  <span className="font-medium whitespace-nowrap">بلیط هواپیما</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute right-0 mt-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 group-hover:opacity-100 transition invisible group-hover:visible z-50">
                  <Link href="/flights?type=domestic" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-right transition">
                    پرواز داخلی
                  </Link>
                  <Link href="/flights?type=international" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-right transition">
                    پرواز خارجی
                  </Link>
                </div>
              </div>

              {/* Hotel */}
              <Link href="/hotels" className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-afghanibaba-primary hover:bg-orange-50 rounded transition text-sm">
                <Hotel className="h-4 w-4" />
                <span className="font-medium whitespace-nowrap">هتل</span>
              </Link>

              {/* Bus */}
              <Link href="/bus" className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-afghanibaba-primary hover:bg-orange-50 rounded transition text-sm">
                <Bus className="h-4 w-4" />
                <span className="font-medium whitespace-nowrap">اتوبوس</span>
              </Link>

              {/* Taxi */}
              <Link href="/taxi" className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-afghanibaba-primary hover:bg-orange-50 rounded transition text-sm">
                <ShoppingBag className="h-4 w-4" />
                <span className="font-medium whitespace-nowrap">تاکسی</span>
              </Link>

              {/* Tour */}
              <Link href="/tour" className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-afghanibaba-primary hover:bg-orange-50 rounded transition text-sm">
                <Compass className="h-4 w-4" />
                <span className="font-medium whitespace-nowrap">تور</span>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Icons */}
          <div className="flex md:hidden items-center justify-around flex-1 gap-3">
            <Link href="/flights" title="پروازها" className="p-2 text-gray-700 hover:text-afghanibaba-primary rounded transition">
              <Plane className="h-5 w-5" />
            </Link>
            <Link href="/hotels" title="هتل‌ها" className="p-2 text-gray-700 hover:text-afghanibaba-primary rounded transition">
              <Hotel className="h-5 w-5" />
            </Link>
            <Link href="/bus" title="اتوبوس" className="p-2 text-gray-700 hover:text-afghanibaba-primary rounded transition">
              <Bus className="h-5 w-5" />
            </Link>
            <Link href="/taxi" title="تاکسی" className="p-2 text-gray-700 hover:text-afghanibaba-primary rounded transition">
              <ShoppingBag className="h-5 w-5" />
            </Link>
            <Link href="/tour" title="تور" className="p-2 text-gray-700 hover:text-afghanibaba-primary rounded transition">
              <Compass className="h-5 w-5" />
            </Link>
          </div>



          {/* Left Side: Support, My Travels, Auth */}
          <div className="flex items-center gap-2 md:gap-4 lg:gap-6 flex-shrink-0">
            {/* Support Center - Desktop & Tablet */}
            <Link href="/help-center" className="hidden md:flex items-center gap-2 text-gray-700 hover:text-afghanibaba-primary transition" title="مرکز پشتیبانی آنلاین">
              <HelpCircle className="h-5 w-5" />
              <span className="text-sm font-medium whitespace-nowrap">پشتیبانی</span>
            </Link>

            {/* My Travels - Desktop & Tablet */}
            <Link href="/my-bookings" className="hidden md:flex items-center gap-2 text-gray-700 hover:text-afghanibaba-primary transition" title="سفرهای من">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium whitespace-nowrap">سفرهای من</span>
            </Link>

            {/* Divider - Desktop & Tablet */}
            <div className="hidden md:block w-px h-6 bg-gray-300"></div>

            {/* Auth Section */}
            {isAuthenticated && user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-afghanibaba-primary transition"
                >
                  <div className="w-6 h-6 rounded-full bg-afghanibaba-primary text-white flex items-center justify-center text-xs font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium hidden lg:inline">{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {userMenuOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition">
                      <User className="h-4 w-4" />
                      <span>پروفایل</span>
                    </Link>
                    {user.role === "admin" && (
                      <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition">
                        <LayoutDashboard className="h-4 w-4" />
                        <span>داشبورد ادمین</span>
                      </Link>
                    )}
                    {user.role === "vendor" && (
                      <Link href="/vendor/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition">
                        <LayoutDashboard className="h-4 w-4" />
                        <span>داشبورد فروشنده</span>
                      </Link>
                    )}
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition w-full text-right"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>خروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login" className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-afghanibaba-primary transition text-sm lg:text-base">
                  <User className="h-4 w-4 lg:h-5 lg:w-5" />
                  <span className="hidden lg:inline">ورود</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-afghanibaba-primary transition"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-50 border-t border-gray-200 py-4 space-y-2">
            <Link href="/flights" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
              <Plane className="h-5 w-5" />
              <span>پروازها</span>
            </Link>
            <Link href="/hotels" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
              <Hotel className="h-5 w-5" />
              <span>هتل</span>
            </Link>
            <Link href="/bus" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
              <Bus className="h-5 w-5" />
              <span>اتوبوس</span>
            </Link>
            <Link href="/taxi" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
              <ShoppingBag className="h-5 w-5" />
              <span>تاکسی</span>
            </Link>
            <Link href="/tour" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
              <Compass className="h-5 w-5" />
              <span>تور</span>
            </Link>
            <hr className="my-2 border-gray-300" />
            <Link href="/help-center" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
              <HelpCircle className="h-5 w-5" />
              <span>پشتیبانی</span>
            </Link>
            <Link href="/my-bookings" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
              <MapPin className="h-5 w-5" />
              <span>سفرهای من</span>
            </Link>
            {isAuthenticated && user ? (
              <>
                <hr className="my-2 border-gray-300" />
                <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
                  <User className="h-5 w-5" />
                  <span>پروفایل</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded transition w-full text-right">
                  <LogOut className="h-5 w-5" />
                  <span>خروج</span>
                </button>
              </>
            ) : (
              <>
                <hr className="my-2 border-gray-300" />
                <Link href="/login" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
                  <User className="h-5 w-5" />
                  <span>ورود / ثبت‌نام</span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
