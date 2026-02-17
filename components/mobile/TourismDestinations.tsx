"use client";

import Image from "next/image";
import Link from "next/link";

const destinations = [
  {
    id: 1,
    name: "بامیان",
    image: "/assets/bamyan-tour.jpg",
    description: "دریاچه‌های بند امیر",
  },
  {
    id: 2,
    name: "هرات",
    image: "/assets/banner-2.jpg",
    description: "مسجد جامع هرات",
  },
  {
    id: 3,
    name: "مزار شریف",
    image: "/assets/banner-3.jpg",
    description: "مسجد آبی",
  },
  {
    id: 4,
    name: "کابل",
    image: "/assets/banner-4.jpg",
    description: "باغ بابر",
  },
  {
    id: 5,
    name: "قندهار",
    image: "/assets/banner-1.jpg",
    description: "شهر قدیم",
  },
  {
    id: 6,
    name: "جلال‌آباد",
    image: "/assets/banner-5.jpg",
    description: "باغ‌های نارنج",
  },
];

export default function TourismDestinations() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {destinations.map((dest) => (
          <Link
            key={dest.id}
            href={`/tour?destination=${dest.name}`}
            className="group relative h-40 rounded-xl overflow-hidden"
          >
            <Image
              src={dest.image}
              alt={dest.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
              <h3 className="text-lg font-bold mb-1">{dest.name}</h3>
              <p className="text-xs text-white/90">{dest.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
