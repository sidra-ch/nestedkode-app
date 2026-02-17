"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, User, Plane, Bus, Hotel, Compass, Car, Shield, HelpCircle } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";

type Props = {
  onClose: () => void;
};

export default function MobileMenu({ onClose }: Props) {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <div className="fixed inset-0 z-[200] md:hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute right-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <span className="font-bold text-lg">افغانی‌بابا</span>
          <button onClick={onClose} className="p-2 bg-white rounded-full hover:bg-gray-100 transition">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {isAuthenticated && user && (
            <div className="px-4 py-3 mb-2 bg-orange-50 border-b border-orange-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center">
                  <User className="w-5 h-5 text-orange-700" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          <div className="px-4 py-2">
            <p className="text-xs font-semibold text-gray-500 mb-2">خدمات گردشگری</p>
            <div className="space-y-1">
              <Link href="/flights" onClick={onClose} className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                <Plane className="h-5 w-5" />
                <span className="font-medium">بلیط هواپیما</span>
              </Link>
              <Link href="/bus" onClick={onClose} className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                <Bus className="h-5 w-5" />
                <span className="font-medium">بلیط اتوبوس</span>
              </Link>
              <Link href="/tour" onClick={onClose} className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                <Compass className="h-5 w-5" />
                <span className="font-medium">تور مسافرتی</span>
              </Link>
              <Link href="/hotels" onClick={onClose} className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                <Hotel className="h-5 w-5" />
                <span className="font-medium">هتل</span>
              </Link>
              <Link href="/taxi" onClick={onClose} className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                <Car className="h-5 w-5" />
                <span className="font-medium">تاکسی</span>
              </Link>
              <Link href="/visa" onClick={onClose} className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition">
                <Shield className="h-5 w-5" />
                <span className="font-medium">ویزا</span>
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-100 my-2"></div>

          <div className="px-4 py-2">
            <p className="text-xs font-semibold text-gray-500 mb-2">سایر</p>
            <div className="space-y-1">
              <Link href="/help-center" onClick={onClose} className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                <HelpCircle className="h-5 w-5" />
                <span className="font-medium">مرکز پشتیبانی</span>
              </Link>
              {isAuthenticated && (
                <Link href="/my-bookings" onClick={onClose} className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                  <Compass className="h-5 w-5" />
                  <span className="font-medium">سفرهای من</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          {isAuthenticated && user ? (
            <button
              onClick={() => {
                logout();
                onClose();
                router.push("/");
              }}
              className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-200 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
            >
              <span>🚪</span>
              <span>خروج از حساب</span>
            </button>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium"
            >
              <User className="h-5 w-5" />
              <span>ورود یا ثبت‌نام</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
