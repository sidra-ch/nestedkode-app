"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { ChevronDown, User, LogOut, LayoutDashboard, Plane, Hotel, Bus, Compass, ShoppingBag, Menu, X, HelpCircle, MapPin, Car } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
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
    <nav
      className="sticky top-0 left-0 right-0 z-[100] bg-white border-b border-gray-300 shadow-sm"
      style={{ direction: "rtl", paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      {/* Mobile: Centered Logo Row */}
      <div id="mobile-navbar-logo" className="block md:hidden w-full bg-white border-b border-gray-200 transition-colors duration-300">
        <div className="flex items-center justify-center h-14">
          <Link href="/" className="flex items-center justify-center" style={{ width: '100%' }}>
            <span className="text-xl font-extrabold text-gray-800 tracking-tight">افغانی‌بابا</span>
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 px-2 sm:px-0">
          {/* Mobile Menu Button - Left Side on Mobile (RTL) */}
          <button
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo - Hidden on mobile, Visible on Desktop */}
          <Link href="/" className="hidden md:flex items-center gap-1 flex-shrink-0">
            <div className="text-xl md:text-2xl font-bold text-afghanibaba-primary">افغانی‌بابا</div>
          </Link>

          {/* Mobile Center - Just an icon or empty? User said "only icons visible, logo hidden". 
              Let's put the user icon on the left (RTL end) and maybe a home icon or just space. 
              Actually, usually search/home icons are key. Let's keep it simple. */}

          {/* Right Side: Main Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-2 md:gap-4 flex-1 mr-4">
            {/* Desktop Nav Links ... (existing) */}
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

              {/* Other Links */}
              <Link href="/bus" className="flex items-center px-3 py-2 text-gray-700 hover:text-black font-medium text-[15px] transition-colors rounded-md">
                <span>بلیط اتوبوس</span>
              </Link>
              <Link href="/tour" className="flex items-center px-3 py-2 text-gray-700 hover:text-black font-medium text-[15px] transition-colors rounded-md">
                <span>تور</span>
              </Link>
              <Link href="/hotels" className="flex items-center px-3 py-2 text-gray-700 hover:text-black font-medium text-[15px] transition-colors rounded-md">
                <span>هتل</span>
              </Link>
              <Link href="/taxi" className="flex items-center px-3 py-2 text-gray-700 hover:text-black font-medium text-[15px] transition-colors rounded-md">
                <span>تاکسی</span>
              </Link>
            </div>
          </div>

          {/* Left Section: User Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile User Icon */}
            <div className="md:hidden">
              {isAuthenticated && user ? (
                <Link href="/profile" className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <User className="h-6 w-6" />
                </Link>
              ) : (
                <Link href="/login" className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                  <User className="h-6 w-6" />
                  <span className="sr-only">Login</span>
                </Link>
              )}
            </div>

            {/* Desktop User Section */}
            <div className="hidden md:flex items-center gap-3 lg:gap-5">
              <div className="flex items-center gap-4 lg:gap-6 pl-2 border-l border-gray-200 h-8">
                <Link href="/help-center" className="flex items-center gap-2 text-gray-700 hover:text-black transition" title="مرکز پشتیبانی آنلاین">
                  <HelpCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">پشتیبانی</span>
                </Link>
                <Link href="/my-bookings" className="flex items-center gap-2 text-gray-700 hover:text-black transition" title="سفرهای من">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-medium">سفرهای من</span>
                </Link>
              </div>

              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 text-gray-700 hover:text-black transition pl-1"
                  >
                    <User className="h-5 w-5 lg:h-6 lg:w-6" />
                    <span className="text-sm font-medium hidden lg:inline max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden">
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 mb-1">
                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 mt-1 truncate">{user.email}</p>
                      </div>
                      <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition">
                        <User className="h-4 w-4" />
                        <span>حساب کاربری</span>
                      </Link>
                      <Link href="/my-bookings" className="md:hidden flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition">
                        <MapPin className="h-4 w-4" />
                        <span>سفرهای من</span>
                      </Link>
                      {user.role === "admin" && (
                        <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition">
                          <LayoutDashboard className="h-4 w-4" />
                          <span>داشبورد ادمین</span>
                        </Link>
                      )}
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition w-full text-right"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>خروج از حساب</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="flex items-center gap-2 text-gray-700 hover:text-black transition">
                  <User className="h-5 w-5 lg:h-6 lg:w-6" />
                  <span className="text-sm font-medium hidden sm:inline">ورود یا ثبت‌نام</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[200] md:hidden">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />

            {/* Drawer */}
            <div className="absolute right-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl flex flex-col">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <span className="font-bold text-lg">افغانی‌بابا</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white rounded-full hover:bg-gray-100 transition">
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-2">
                <div className="px-4 py-2">
                  <p className="text-xs font-semibold text-gray-500 mb-2">خدمات گردشگری</p>
                  <div className="space-y-1">
                    <Link href="/flights" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                      <Plane className="h-5 w-5" />
                      <span className="font-medium">بلیط هواپیما</span>
                    </Link>
                    <Link href="/bus" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                      <Bus className="h-5 w-5" />
                      <span className="font-medium">بلیط اتوبوس</span>
                    </Link>
                    <Link href="/tour" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                      <Compass className="h-5 w-5" />
                      <span className="font-medium">تور مسافرتی</span>
                    </Link>
                    <Link href="/hotels" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                      <Hotel className="h-5 w-5" />
                      <span className="font-medium">هتل</span>
                    </Link>
                    <Link href="/taxi" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                      <Car className="h-5 w-5" />
                      <span className="font-medium">تاکسی</span>
                    </Link>
                  </div>
                </div>

                <div className="border-t border-gray-100 my-2"></div>

                <div className="px-4 py-2">
                  <p className="text-xs font-semibold text-gray-500 mb-2">سایر</p>
                  <div className="space-y-1">
                    <Link href="/help-center" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                      <HelpCircle className="h-5 w-5" />
                      <span className="font-medium">مرکز پشتیبانی</span>
                    </Link>
                    <Link href="/my-bookings" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                      <MapPin className="h-5 w-5" />
                      <span className="font-medium">سفرهای من</span>
                    </Link>
                  </div>
                </div>
              </div>

              {isAuthenticated && user && (
                <div className="p-4 border-t border-gray-100 bg-gray-50">
                  <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-200 text-red-600 rounded-lg hover:bg-red-50 transition font-medium">
                    <LogOut className="h-5 w-5" />
                    <span>خروج از حساب</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Mobile: Sticky Icon Bar (hidden initially, shown on scroll via JS) */}
      <div id="mobile-sticky-icons" className="fixed bottom-0 left-0 right-0 z-[120] bg-white border-t border-gray-200 flex justify-around items-center py-2 md:hidden transition-all duration-300" style={{ boxShadow: '0 -2px 8px rgba(0,0,0,0.04)', paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))' }}>
        <Link href="/flights" className={`flex flex-col items-center font-bold text-xs ${pathname.startsWith('/flights') ? 'text-orange-500' : 'text-gray-600'}`}>
          <Plane className="h-6 w-6 mb-1" color={pathname.startsWith('/flights') ? '#f97316' : '#4b5563'} />
          <span className="hidden xs:block">پرواز</span>
        </Link>
        <Link href="/bus" className={`flex flex-col items-center font-bold text-xs ${pathname.startsWith('/bus') ? 'text-orange-500' : 'text-gray-600'}`}>
          <Bus className="h-6 w-6 mb-1" color={pathname.startsWith('/bus') ? '#f97316' : '#4b5563'} />
          <span className="hidden xs:block">اتوبوس</span>
        </Link>
        <Link href="/hotels" className={`flex flex-col items-center font-bold text-xs ${pathname.startsWith('/hotels') ? 'text-orange-500' : 'text-gray-600'}`}>
          <Hotel className="h-6 w-6 mb-1" color={pathname.startsWith('/hotels') ? '#f97316' : '#4b5563'} />
          <span className="hidden xs:block">هتل</span>
        </Link>
        <Link href="/tour" className={`flex flex-col items-center font-bold text-xs ${pathname.startsWith('/tour') ? 'text-orange-500' : 'text-gray-600'}`}>
          <Compass className="h-6 w-6 mb-1" color={pathname.startsWith('/tour') ? '#f97316' : '#4b5563'} />
          <span className="hidden xs:block">تور</span>
        </Link>
        <Link href="/taxi" className={`flex flex-col items-center font-bold text-xs ${pathname.startsWith('/taxi') ? 'text-orange-500' : 'text-gray-600'}`}>
          <Car className="h-6 w-6 mb-1" color={pathname.startsWith('/taxi') ? '#f97316' : '#4b5563'} />
          <span className="hidden xs:block">تاکسی</span>
        </Link>
      </div>
      {/* Mobile navbar color change on scroll */}
      <script suppressHydrationWarning>{`
        if (typeof window !== 'undefined') {
          window.addEventListener('scroll', function() {
            var logo = document.getElementById('mobile-navbar-logo');
            var icons = document.getElementById('mobile-sticky-icons');
            if (window.scrollY > 40) {
              if (logo) logo.style.background = '#111';
              if (logo) logo.style.color = '#fff';
              if (icons) icons.style.background = '#111';
            } else {
              if (logo) logo.style.background = '#fff';
              if (logo) logo.style.color = '#222';
              if (icons) icons.style.background = '#fff';
            }
          });
        }
      `}</script>
    </nav>
  );
}
