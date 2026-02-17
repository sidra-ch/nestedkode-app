"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  link: string;
}

const destinations: Destination[] = [
  {
    id: "1",
    name: "بامیان",
    image: "/assets/bamyan-tour.jpg",
    description: "دریاچه‌های بند امیر",
    link: "/tour?destination=bamyan",
  },
  {
    id: "2",
    name: "هرات",
    image: "/assets/banner-2.jpg",
    description: "شهر تاریخی هرات",
    link: "/tour?destination=herat",
  },
  {
    id: "3",
    name: "مزار شریف",
    image: "/assets/banner-3.jpg",
    description: "مسجد آبی",
    link: "/tour?destination=mazar",
  },
  {
    id: "4",
    name: "کابل",
    image: "/assets/banner-4.jpg",
    description: "پایتخت افغانستان",
    link: "/tour?destination=kabul",
  },
];

export default function PopularDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">مقاصد محبوب</h2>
        <Link href="/tour" className="text-sm text-orange-500 font-medium">
          مشاهده همه
        </Link>
      </div>

      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(${currentIndex * 100}%)` }}
          >
            {destinations.map((dest) => (
              <div key={dest.id} className="min-w-full">
                <Link href={dest.link} className="block relative h-[240px] group">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
                    <p className="text-sm text-white/90">{dest.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
          aria-label="Previous destination"
        >
          <ChevronRight className="h-5 w-5 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
          aria-label="Next destination"
        >
          <ChevronLeft className="h-5 w-5 text-gray-800" />
        </button>

        {/* Indicators */}
        <div className="flex justify-center mt-3 gap-2">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-6 bg-orange-500" : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
