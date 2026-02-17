"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plane, Bus, Hotel, Compass, Car } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/flights", icon: Plane, label: "پرواز", key: "flights" },
    { href: "/bus", icon: Bus, label: "اتوبوس", key: "bus" },
    { href: "/hotels", icon: Hotel, label: "هتل", key: "hotels" },
    { href: "/tour", icon: Compass, label: "تور", key: "tour" },
    { href: "/taxi", icon: Car, label: "تاکسی", key: "taxi" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[90] bg-white border-t border-gray-200 md:hidden"
      style={{
        boxShadow: "0 -2px 8px rgba(0,0,0,0.04)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ href, icon: Icon, label, key }) => {
          const isActive = pathname.startsWith(`/${key}`);
          return (
            <Link
              key={key}
              href={href}
              className={`flex flex-col items-center justify-center min-w-[60px] py-1 transition-colors ${
                isActive ? "text-orange-500" : "text-gray-600"
              }`}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
