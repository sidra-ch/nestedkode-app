"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { ChevronDown, ChevronRight, User, LogOut, LayoutDashboard, Plane, Hotel, Bus, Compass, ShoppingBag, Menu, X, HelpCircle, MapPin, Car } from "lucide-react";
import { t, getCurrentLanguage, type Language } from "@/lib/i18n";

export default function Navbar() {
  const pathname = usePathname();
  const safePathname = pathname || "";
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [flightDropdownOpen, setFlightDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<Language>("fa");

  useEffect(() => {
    setLang(getCurrentLanguage() as Language);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // State to track mobile sticky icon bar background


  // Hydration-safe: use only Tailwind/static classes for sticky bar

  return (
    <nav
      className="sticky top-0 left-0 right-0 z-[100] bg-white border-b border-gray-300 shadow-sm"
      style={{ direction: "rtl", paddingTop: "env(safe-area-inset-top, 0px)" }}
      suppressHydrationWarning
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 px-2 sm:px-0">
          {/* Mobile Back & Menu Buttons - Left Side on Mobile (RTL) */}
          <div className="md:hidden flex items-center gap-1">
            <button
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            {safePathname !== "/" && (
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-1"
                aria-label="Back"
              >
                <ChevronRight className="h-6 w-6 text-orange-500" />
              </button>
            )}
          </div>

          {/* Desktop: Logo and Nav Links together on right (RTL) */}
          <div className="hidden md:flex items-center gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 flex-shrink-0">
              <div className="text-xl md:text-2xl font-bold text-afghanibaba-primary">Afghan Baba</div>
            </Link>
            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {/* Flight Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-afghanibaba-primary hover:bg-orange-50 rounded transition text-sm">
                  <Plane className="h-4 w-4" />
                  <span className="font-medium whitespace-nowrap">{t('nav.flights', lang)}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute right-0 mt-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 group-hover:opacity-100 transition invisible group-hover:visible z-50">
                  <Link href="/flights?type=domestic" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-right transition">
                    {t('nav.domestic_flights', lang)}
                  </Link>
                  <Link href="/flights?type=international" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-right transition">
                    {t('nav.international_flights', lang)}
                  </Link>
                </div>
              </div>
              {/* Other Links */}
              <Link href="/bus" className="flex items-center px-3 py-2 text-gray-700 hover:text-black font-medium text-[15px] transition-colors rounded-md">
                <span>{t('nav.bus', lang)}</span>
              </Link>
              <Link href="/tour" className="flex items-center px-3 py-2 text-gray-700 hover:text-black font-medium text-[15px] transition-colors rounded-md">
                <span>{t('nav.tour', lang)}</span>
              </Link>
              <Link href="/hotels" className="flex items-center px-3 py-2 text-gray-700 hover:text-black font-medium text-[15px] transition-colors rounded-md">
                <span>{t('nav.hotels', lang)}</span>
              </Link>
              <Link href="/taxi" className="flex items-center px-3 py-2 text-gray-700 hover:text-black font-medium text-[15px] transition-colors rounded-md">
                <span>{t('nav.taxi', lang)}</span>
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
                <Link href="/help-center" className="flex items-center gap-2 text-gray-700 hover:text-black transition" title={t('nav.support', lang)}>
                  <HelpCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">{t('nav.support', lang)}</span>
                </Link>
                <Link href="/mytravels" className="flex items-center gap-2 text-gray-700 hover:text-black transition" title={t('nav.my_travels', lang)}>
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-medium">{t('nav.my_travels', lang)}</span>
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
                        <span>{t('nav.user_profile', lang)}</span>
                      </Link>
                      <Link href="/mytravels" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition">
                        <MapPin className="h-4 w-4" />
                        <span>{t('nav.my_travels', lang)}</span>
                      </Link>
                      {user.role === "admin" && (
                        <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition">
                          <LayoutDashboard className="h-4 w-4" />
                          <span>{t('nav.admin_dashboard', lang)}</span>
                        </Link>
                      )}
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition w-full text-right"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{t('nav.logout', lang)}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="flex items-center gap-2 text-gray-700 hover:text-black transition">
                  <User className="h-5 w-5 lg:h-6 lg:w-6" />
                  <span className="text-sm font-medium hidden sm:inline">{t('nav.login_register', lang)}</span>
                </Link>
              )}
            </div>
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
              <div className="flex items-center gap-2">
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white rounded-full hover:bg-gray-100 transition">
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-gray-500 mb-2">{t('nav.tour', lang)}</p>
                <div className="space-y-1">
                  <Link href="/flights" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                    <Plane className="h-5 w-5" />
                    <span className="font-medium">{t('nav.flights', lang)}</span>
                  </Link>
                  <Link href="/bus" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                    <Bus className="h-5 w-5" />
                    <span className="font-medium">{t('nav.bus', lang)}</span>
                  </Link>
                  <Link href="/tour" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                    <Compass className="h-5 w-5" />
                    <span className="font-medium">{t('nav.tour_travel', lang)}</span>
                  </Link>
                  <Link href="/hotels" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                    <Hotel className="h-5 w-5" />
                    <span className="font-medium">{t('nav.hotels', lang)}</span>
                  </Link>
                  <Link href="/taxi" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                    <Car className="h-5 w-5" />
                    <span className="font-medium">{t('nav.taxi', lang)}</span>
                  </Link>
                </div>
              </div>

              <div className="border-t border-gray-100 my-2"></div>

              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-gray-500 mb-2">{t('nav.help', lang)}</p>
                <div className="space-y-1">
                  <Link href="/help-center" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                    <HelpCircle className="h-5 w-5" />
                    <span className="font-medium">{t('nav.support', lang)}</span>
                  </Link>
                  <Link href="/mytravels" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">{t('nav.my_travels', lang)}</span>
                  </Link>
                </div>
              </div>
            </div>

            {isAuthenticated && user && (
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-200 text-red-600 rounded-lg hover:bg-red-50 transition font-medium">
                  <LogOut className="h-5 w-5" />
                  <span>{t('nav.logout', lang)}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Mobile: Sticky Icon Bar (hidden initially, shown on scroll via JS) */}
      <div
        id="navbar-mobile-sticky-icons"
        className="fixed bottom-0 left-0 right-0 z-[120] border-t border-gray-200 bg-white flex justify-around items-center py-2 md:hidden transition-all duration-300 shadow-[0_-2px_8px_rgba(0,0,0,0.04)] pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]"
      /* Removed all dynamic style props for hydration safety */
      >
        <Link href="/flights" className={`flex flex-col items-center font-bold text-xs ${safePathname.startsWith('/flights') ? 'text-orange-500' : 'text-gray-600'}`}>
          <Plane className="h-6 w-6 mb-1" color={safePathname.startsWith('/flights') ? '#f97316' : '#4b5563'} />
          <span className="hidden xs:block">{t('nav.flights', lang)}</span>
        </Link>
        <Link href="/bus" className={`flex flex-col items-center font-bold text-xs ${safePathname.startsWith('/bus') ? 'text-orange-500' : 'text-gray-600'}`}>
          <Bus className="h-6 w-6 mb-1" color={safePathname.startsWith('/bus') ? '#f97316' : '#4b5563'} />
          <span className="hidden xs:block">{t('nav.bus', lang)}</span>
        </Link>
        <Link href="/hotels" className={`flex flex-col items-center font-bold text-xs ${safePathname.startsWith('/hotels') ? 'text-orange-500' : 'text-gray-600'}`}>
          <Hotel className="h-6 w-6 mb-1" color={safePathname.startsWith('/hotels') ? '#f97316' : '#4b5563'} />
          <span className="hidden xs:block">{t('nav.hotels', lang)}</span>
        </Link>
        <Link href="/tour" className={`flex flex-col items-center font-bold text-xs ${safePathname.startsWith('/tour') ? 'text-orange-500' : 'text-gray-600'}`}>
          <Compass className="h-6 w-6 mb-1" color={safePathname.startsWith('/tour') ? '#f97316' : '#4b5563'} />
          <span className="hidden xs:block">{t('nav.tour', lang)}</span>
        </Link>
        <Link href="/taxi" className={`flex flex-col items-center font-bold text-xs ${safePathname.startsWith('/taxi') ? 'text-orange-500' : 'text-gray-600'}`}>
          <Car className="h-6 w-6 mb-1" color={safePathname.startsWith('/taxi') ? '#f97316' : '#4b5563'} />
          <span className="hidden xs:block">{t('nav.taxi', lang)}</span>
        </Link>
      </div>
      {/* Mobile navbar color change on scroll handled in React useEffect */}
    </nav>
  );
}
