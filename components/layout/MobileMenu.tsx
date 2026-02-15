"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";

type Props = {
  open: boolean;
  onClose: () => void;
  navItems: { label: string; href: string }[];
  userMenuItems?: { label: string; href: string; icon: string }[];
  adminMenuItems?: { label: string; href: string; icon: string }[];
  vendorMenuItems?: { label: string; href: string; icon: string }[];
};

const mobileNavItems = [
  { label: "✈️ پرواز", href: "/flights" },
  { label: "🚌 اتوبوس", href: "/bus-info" },
  { label: "🏨 هتل", href: "/hotels" },
  { label: "🗺️ تور", href: "/tour" },
  { label: "🛂 ویزا", href: "#" },
  { label: "🚕 تاکسی", href: "/taxi" },
];

export default function MobileMenu({ 
  open, 
  onClose, 
  navItems,
  userMenuItems = [],
  adminMenuItems = [],
  vendorMenuItems = []
}: Props) {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-72 bg-white p-6 text-right shadow-2xl overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-semibold text-slate-900">منو</p>
          <button
            className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold"
            onClick={onClose}
          >
            بستن
          </button>
        </div>

        {/* Logo */}
        <div className="mb-4">
          <Link href="/" className="text-xl font-bold" style={{ color: '#F97316' }}>
            AFGHANIBABA
          </Link>
        </div>

        {isAuthenticated && user && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                user.role === 'admin' ? 'bg-purple-100' :
                user.role === 'vendor' ? 'bg-blue-100' :
                'bg-yellow-100'
              }`}>
                <User className={`w-5 h-5 ${
                  user.role === 'admin' ? 'text-purple-700' :
                  user.role === 'vendor' ? 'text-blue-700' :
                  'text-yellow-700'
                }`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
              user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
              user.role === 'vendor' ? 'bg-blue-100 text-blue-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </div>
          </div>
        )}

        <nav className="mt-6 flex flex-col gap-2 text-sm font-medium text-slate-700">
          {mobileNavItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              onClick={onClose}
              className="p-3 rounded-lg hover:bg-gray-50 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <Link 
            href="/help-center" 
            onClick={onClose}
            className="block p-3 text-sm text-slate-700 hover:bg-gray-50 rounded-lg"
          >
            ❓ مرکز پشتیبانی آنلاین
          </Link>
          <Link 
            href="#" 
            onClick={onClose}
            className="block p-3 text-sm text-slate-700 hover:bg-gray-50 rounded-lg"
          >
            🏢 پنل آژانسی
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {isAuthenticated && user ? (
            <>
              {userMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="btn-secondary text-center"
                >
                  {item.icon} {item.label}
                </Link>
              ))}

              {user.role === "vendor" && vendorMenuItems.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-blue-600 mb-2">پنل فروشنده</p>
                  {vendorMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="block p-2 text-sm text-slate-700 hover:bg-blue-50 rounded-lg"
                    >
                      {item.icon} {item.label}
                    </Link>
                  ))}
                </div>
              )}

              {user.role === "admin" && adminMenuItems.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-purple-600 mb-2">پنل مدیریت</p>
                  {adminMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="block p-2 text-sm text-slate-700 hover:bg-purple-50 rounded-lg"
                    >
                      {item.icon} {item.label}
                    </Link>
                  ))}
                </div>
              )}

              <button
                onClick={() => {
                  logout();
                  onClose();
                  router.push("/");
                }}
                className="btn-primary bg-red-500 hover:bg-red-600 mt-4"
              >
                🚪 خروج
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={onClose} className="btn-primary text-center">
                ورود یا ثبت‌نام
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
