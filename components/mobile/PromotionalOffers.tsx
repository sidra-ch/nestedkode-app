"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  badge?: string;
}

const offers: Offer[] = [
  {
    id: "1",
    title: "تخفیف ویژه پرواز",
    description: "تا ۳۰٪ تخفیف بلیط هواپیما",
    image: "/assets/banner-1.jpg",
    link: "/flights",
    badge: "۳۰٪ تخفیف",
  },
  {
    id: "2",
    title: "رزرو هتل",
    description: "بهترین هتل‌ها با قیمت مناسب",
    image: "/assets/banner-5.jpg",
    link: "/hotels",
    badge: "پیشنهاد ویژه",
  },
  {
    id: "3",
    title: "تورهای نوروزی",
    description: "تورهای داخلی و خارجی",
    image: "/assets/banner-3.jpg",
    link: "/tour",
    badge: "جدید",
  },
];

export default function PromotionalOffers() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">پیشنهادهای ویژه</h2>
        <Link href="/offers" className="text-sm text-orange-500 font-medium">
          همه پیشنهادها
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {offers.map((offer) => (
              <div key={offer.id} className="min-w-full">
                <Link href={offer.link} className="block relative h-[180px]">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
                  
                  {/* Badge */}
                  {offer.badge && (
                    <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {offer.badge}
                    </div>
                  )}

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-bold mb-1">{offer.title}</h3>
                    <p className="text-sm text-white/90">{offer.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-3 gap-2">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-6 bg-orange-500" : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to offer ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
