"use client";

import Link from "next/link";
import { Plane, Bus, Hotel, Compass, Car, Shield, CreditCard, Building2 } from "lucide-react";

const mainServices = [
  { id: 1, name: "پرواز", icon: Plane, href: "/flights", color: "bg-blue-50 text-blue-600" },
  { id: 2, name: "اتوبوس", icon: Bus, href: "/bus", color: "bg-green-50 text-green-600" },
  { id: 3, name: "هتل", icon: Hotel, href: "/hotels", color: "bg-purple-50 text-purple-600" },
  { id: 4, name: "تور", icon: Compass, href: "/tour", color: "bg-orange-50 text-orange-600" },
  { id: 5, name: "تاکسی", icon: Car, href: "/taxi", color: "bg-yellow-50 text-yellow-600" },
];

const otherServices = [
  { id: 1, name: "ویزا", icon: Shield, href: "/visa", color: "bg-indigo-50 text-indigo-600" },
  { id: 2, name: "سفر اقساطی", icon: CreditCard, href: "/installment", color: "bg-pink-50 text-pink-600" },
  { id: 3, name: "سفر شرکتی", icon: Building2, href: "/corporate", color: "bg-teal-50 text-teal-600" },
];

export default function QuickServices() {
  return (
    <div className="px-4 py-6 space-y-6">
      {/* Main Services */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4 text-right">خدمات اصلی</h2>
        <div className="grid grid-cols-3 gap-3">
          {mainServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                href={service.href}
                className={`${service.color} rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95`}
              >
                <Icon className="h-8 w-8" />
                <span className="text-sm font-medium text-center">{service.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Other Services */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4 text-right">سایر خدمات</h2>
        <div className="grid grid-cols-3 gap-3">
          {otherServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                href={service.href}
                className={`${service.color} rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95`}
              >
                <Icon className="h-8 w-8" />
                <span className="text-sm font-medium text-center">{service.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
