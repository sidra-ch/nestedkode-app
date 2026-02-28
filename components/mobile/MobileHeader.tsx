"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, User, ArrowRight } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";

const SCROLL_THRESHOLD = 60;

export default function MobileHeader({ onMenuOpen }: { onMenuOpen: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const sectionTitles: Record<string, string> = {
    "/flights": "پرواز",
    "/bus": "اتوبوس",
    "/hotels": "هتل",
    "/tour": "تور",
    "/taxi": "تاکسی",
  };
  const isHome = pathname === "/";
  const sectionTitle = sectionTitles[pathname] || "";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hideOnScroll = isHome && isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 md:hidden ${
        hideOnScroll ? "h-0 overflow-hidden opacity-0 pointer-events-none" : ""
      }`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      {/* Single orange bar: Menu | افغانی‌بابا (center) | User. On other pages: Back + Title */}
      <div className="w-full h-12 flex items-center justify-between px-3 bg-[#ff6600] shadow-md">
        {isHome ? (
          <>
            <button
              onClick={onMenuOpen}
              className="p-2 text-white rounded-lg hover:bg-white/20"
              aria-label="منو"
            >
              <Menu className="h-6 w-6" />
            </button>
            <span className="text-white text-lg font-extrabold tracking-tight absolute left-1/2 -translate-x-1/2">
              افغانی‌بابا
            </span>
            <Link
              href={isAuthenticated ? "/profile" : "/login"}
              className="p-2 text-white rounded-lg hover:bg-white/20"
              aria-label={isAuthenticated ? "حساب کاربری" : "ورود"}
            >
              <User className="h-6 w-6" />
            </Link>
          </>
        ) : (
          <>
            <button
              className="p-2 text-white"
              onClick={() => window.history.back()}
              aria-label="بازگشت"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
            <span className="text-white text-lg font-extrabold tracking-tight absolute left-1/2 -translate-x-1/2">
              {sectionTitle}
            </span>
            <button
              onClick={onMenuOpen}
              className="p-2 text-white rounded-lg hover:bg-white/20"
              aria-label="منو"
            >
              <Menu className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
