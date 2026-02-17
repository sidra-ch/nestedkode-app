"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, User, Search } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";

export default function MobileHeader({ onMenuOpen }: { onMenuOpen: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="flex items-center justify-between px-4 h-16">
        {/* Menu Button - Left in RTL */}
        <button
          onClick={onMenuOpen}
          className={`p-2 rounded-lg transition-colors ${
            isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/20"
          }`}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Logo - Center */}
        <Link
          href="/"
          className={`absolute left-1/2 -translate-x-1/2 text-xl font-extrabold transition-colors ${
            isScrolled ? "text-gray-800" : "text-white"
          }`}
        >
          افغانی‌بابا
        </Link>

        {/* User Icon - Right in RTL */}
        <Link
          href={isAuthenticated ? "/profile" : "/login"}
          className={`p-2 rounded-lg transition-colors ${
            isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/20"
          }`}
          aria-label={isAuthenticated ? "Profile" : "Login"}
        >
          <User className="h-6 w-6" />
        </Link>
      </div>
    </header>
  );
}
