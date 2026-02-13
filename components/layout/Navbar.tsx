"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { User, ChevronDown } from "lucide-react";
import MobileMenu from "./MobileMenu";
import useAuthStore from "@/store/useAuthStore";
import { navItems, userMenuItems, adminMenuItems, vendorMenuItems } from "@/lib/routes";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Right Side: Logo & Main Links (RTL) */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-semibold" style={{ color: '#F97316' }}>AFGHANIBABA</Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/flights" className="hover:text-afghanibaba-primary transition-colors">پرواز</Link>
            <Link href="/hotels" className="hover:text-afghanibaba-primary transition-colors">هتل</Link>
            <Link href="/restaurant" className="hover:text-afghanibaba-primary transition-colors">رستوران</Link>
            <Link href="/bus-info" className="hover:text-afghanibaba-primary transition-colors">اتوبوس</Link>
            <Link href="/taxi" className="hover:text-afghanibaba-primary transition-colors">تاکسی</Link>
          </nav>
        </div>

        {/* Left Side: Actions */}
        <div className="flex items-center gap-4">
          <Link href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">
            <span className="hidden sm:inline">پشتیبانی</span>
          </Link>
          {isAuthenticated && (
            <Link
              href="/my-bookings"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
            >
              <span className="hidden sm:inline">سفرهای من</span>
            </Link>
          )}          <div className="h-6 w-[1px] bg-gray-200 mx-2 hidden md:block" />
          {isAuthenticated && user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    user.role === 'admin' ? 'bg-purple-100' :
                    user.role === 'vendor' ? 'bg-blue-100' :
                    'bg-yellow-100'
                  }`}>
                    <User className={`w-4 h-4 ${
                      user.role === 'admin' ? 'text-purple-700' :
                      user.role === 'vendor' ? 'text-blue-700' :
                      'text-yellow-700'
                    }`} />
                  </div>
                  <span className="text-slate-700">{user.name}</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
              </button>

              {userMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Logged in as</p>
                    <p className="text-sm font-semibold text-gray-900">{user.email}</p>
                    <p className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'vendor' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </p>
                  </div>

                  {/* User Menu Items */}
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      {item.icon} {item.label}
                    </Link>
                  ))}

                  {/* Vendor Menu Items */}
                  {user.role === "vendor" && (
                    <>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <p className="px-4 py-1 text-xs font-semibold text-blue-600">Vendor Panel</p>
                        {vendorMenuItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            {item.icon} {item.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Admin Menu Items */}
                  {user.role === "admin" && (
                    <>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <p className="px-4 py-1 text-xs font-semibold text-purple-600">Admin Panel</p>
                        {adminMenuItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            {item.icon} {item.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="border-t border-gray-100 mt-2">
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                        router.push("/");
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all"
            >
              <User size={18} /> ورود یا ثبت‌نام
            </Link>
          )}
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold"
            onClick={() => setMenuOpen(true)}
          >
            منو
          </button>
        </div>
      </div>

      <MobileMenu 
        open={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        navItems={navItems}
        userMenuItems={userMenuItems}
        adminMenuItems={adminMenuItems}
        vendorMenuItems={vendorMenuItems}
      />
    </header>
  );
}
