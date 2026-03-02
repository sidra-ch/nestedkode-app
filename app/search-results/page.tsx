"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Star, ChevronRight, MapPin, Calendar, Users } from "lucide-react";

const SearchResultsContent = () => {
  const searchParams = useSearchParams();
  const type = searchParams?.get("type") || "bus";
  const destination = searchParams?.get("destination") || "";
  const departure = searchParams?.get("departure") || "";
  const returnDate = searchParams?.get("return") || "";
  const passengers = searchParams?.get("passengers") || "1";

  const [loading, setLoading] = useState(false);
  const [buses, setBuses] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (type !== "bus") return;
    setLoading(true);
    setError("");
    const params = new URLSearchParams();
    if (destination) params.set("from", "کابل");
    if (destination) params.set("to", destination);
    if (departure) params.set("date", departure);
    fetch(`/api/buses?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBuses(data.buses);
        } else {
          setError(data.message || "نتایج یافت نشد.");
        }
      })
      .catch(() => setError("خطا در دریافت نتایج."))
      .finally(() => setLoading(false));
  }, [type, destination, departure]);

  // Hotel data for different cities
  const hotelData = {
    "مشهد": [
      { name: "هتل آترک مشهد", stars: 4, image: "/assets/tour1.jpg" },
      { name: "هتل ارغوان مشهد", stars: 5, image: "/assets/tour2.jpg" },
      { name: "هتل الماس 2 مشهد", stars: 5, image: "/assets/tour3.jpg" },
      { name: "هتل نین مسال مشهد", stars: 5, image: "/assets/tour4.jpg" },
      { name: "هتل جوهر المولک مشهد", stars: 4, image: "/assets/tour5.jpg" },
      { name: "هتل درویشی مشهد", stars: 5, image: "/assets/tour6.jpg" },
      { name: "هتل گلدن پالاس مشهد", stars: 5, image: "/assets/tour1.jpg" },
      { name: "هتل اطلس مشهد", stars: 3, image: "/assets/tour2.jpg" },
      { name: "هتل مدینه الرضا مشهد", stars: 5, image: "/assets/tour3.jpg" },
      { name: "هتل سی نور مشهد", stars: 5, image: "/assets/tour4.jpg" },
      { name: "هتل مشهد پالاس", stars: 5, image: "/assets/tour5.jpg" },
    ],
    "تهران": [
      { name: "هتل پارسیان آزادی تهران", stars: 5, image: "/assets/tour6.jpg" },
      { name: "هتل استقلال تهران", stars: 5, image: "/assets/tour1.jpg" },
      { name: "هتل لاله تهران", stars: 5, image: "/assets/tour2.jpg" },
      { name: "هتل اوین تهران", stars: 4, image: "/assets/tour3.jpg" },
      { name: "هتل اسپیناس تهران", stars: 5, image: "/assets/tour4.jpg" },
      { name: "هتل آرامیس تهران", stars: 4, image: "/assets/tour5.jpg" },
      { name: "هتل اسپیناس پالاس تهران", stars: 5, image: "/assets/tour6.jpg" },
    ],
    "کیش": [
      { name: "هتل آریا کیش", stars: 5, image: "/assets/tour1.jpg" },
      { name: "هتل میراژ کیش", stars: 5, image: "/assets/tour2.jpg" },
      { name: "هتل شایان کیش", stars: 5, image: "/assets/tour3.jpg" },
      { name: "هتل پانوراما کیش", stars: 5, image: "/assets/tour4.jpg" },
      { name: "هتل ایران کیش", stars: 5, image: "/assets/tour5.jpg" },
      { name: "هتل داریوش کیش", stars: 5, image: "/assets/tour6.jpg" },
      { name: "هتل ترنج کیش", stars: 5, image: "/assets/tour1.jpg" },
      { name: "هتل پالاس کیش", stars: 5, image: "/assets/tour2.jpg" },
      { name: "هتل بین‌المللی کیش", stars: 5, image: "/assets/tour3.jpg" },
    ]
  };

  // City icons data
  const cityIcons = [
    { name: "تهران", icon: "🏛️" },
    { name: "مشهد", icon: "🕌" },
    { name: "کیش", icon: "🏖️" },
    { name: "شیراز", icon: "🌸" },
    { name: "اصفهان", icon: "🏰" },
    { name: "تبریز", icon: "🏔️" },
    { name: "آنتالیا", icon: "🌊" },
    { name: "استانبول", icon: "🕌" },
    { name: "وان", icon: "🏞️" },
    { name: "دبی", icon: "🏙️" },
    { name: "پاریس", icon: "🗼" },
    { name: "ایروان", icon: "⛪" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: "rtl" }}>
      <Navbar />
      <main className="flex-1">
        {/* Keep existing hero and search form structure */}
        <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-cover bg-center transition-all duration-300" style={{ backgroundImage: `url('/assets/home-page.webp')`, filter: "brightness(1.05) contrast(1.15)" }} />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-sm text-center mb-1">نتایج جستجوی هتل</h1>
            <p className="text-base md:text-lg text-gray-200 text-center font-medium">با افغانی‌بابا، آسان، سریع و مطمئن</p>
          </div>
        </div>

        {/* Search info */}
        <div className="container mx-auto px-4 -mt-8 md:-mt-12 lg:-mt-16 relative z-20 mb-12">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8">
            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
              <span className="font-bold text-gray-900">مقصد: <b className="text-orange-600">{destination}</b></span>
              <span className="font-bold text-gray-900">تاریخ ورود: <b className="text-orange-600">{departure}</b></span>
              <span className="font-bold text-gray-900">تاریخ خروج: <b className="text-orange-600">{returnDate}</b></span>
              <span className="font-bold text-gray-900">مسافران: <b className="text-orange-600">{passengers}</b></span>
            </div>
          </div>
        </div>

        {/* Hotel Results - Booking.com Style */}
        {type === "hotel" && (
          <div className="container mx-auto px-4">
            {/* Search Header */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Find your perfect stay</h2>
                  <p className="text-gray-600">{destination}: 21 properties found</p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <span className="text-lg">🗺️</span>
                    <span>Show on map</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <span className="text-lg">🗺️</span>
                    <span>Show on map</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filters Sidebar */}
              <div className="lg:w-1/4">
                <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
                  <h3 className="font-bold text-gray-900 mb-4">Popular filters</h3>
                  
                  {/* Property Type */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Property type</h4>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-orange-500" defaultChecked />
                          <span className="text-sm">Hotels</span>
                        </div>
                        <span className="text-sm text-gray-500">12</span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-orange-500" defaultChecked />
                          <span className="text-sm">Apartments</span>
                        </div>
                        <span className="text-sm text-gray-500">8</span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-orange-500" />
                          <span className="text-sm">Hostels</span>
                        </div>
                        <span className="text-sm text-gray-500">1</span>
                      </label>
                    </div>
                  </div>

                  {/* Facilities */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Facilities</h4>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-orange-500" defaultChecked />
                          <span className="text-sm">Free WiFi</span>
                        </div>
                        <span className="text-sm text-gray-500">18</span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-orange-500" defaultChecked />
                          <span className="text-sm">Parking</span>
                        </div>
                        <span className="text-sm text-gray-500">20</span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-orange-500" defaultChecked />
                          <span className="text-sm">Restaurant</span>
                        </div>
                        <span className="text-sm text-gray-500">8</span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-orange-500" />
                          <span className="text-sm">Swimming pool</span>
                        </div>
                        <span className="text-sm text-gray-500">4</span>
                      </label>
                    </div>
                  </div>

                  {/* Review Score */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Review score</h4>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-orange-500" />
                          <span className="text-sm">Superb: 9+</span>
                        </div>
                        <span className="text-sm text-gray-500">7</span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-orange-500" />
                          <span className="text-sm">Very good: 8+</span>
                        </div>
                        <span className="text-sm text-gray-500">9</span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-orange-500" />
                          <span className="text-sm">Good: 7+</span>
                        </div>
                        <span className="text-sm text-gray-500">11</span>
                      </label>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Property rating</h4>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-orange-500" />
                          <span className="text-sm">5 stars</span>
                        </div>
                        <span className="text-sm text-gray-500">4</span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-orange-500" />
                          <span className="text-sm">4 stars</span>
                        </div>
                        <span className="text-sm text-gray-500">1</span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-orange-500" />
                          <span className="text-sm">3 stars</span>
                        </div>
                        <span className="text-sm text-gray-500">6</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hotel Listings with Map */}
              <div className="lg:w-3/4">
                {/* Results Header */}
                <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                  <p className="text-gray-600">Afghanistan: 21 properties found</p>
                  <p className="text-sm text-orange-600 mt-1">Please review any travel advisories provided by your government to make an informed decision about your stay in this area, which may be considered conflict-affected.</p>
                </div>

                {/* Map Section */}
                <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
                  <div className="relative h-96 bg-gray-100">
                    {/* Map Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🗺️</div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Map</h3>
                          <p className="text-gray-600">Showing 21 properties in {destination || 'Afghanistan'}</p>
                        </div>
                      </div>
                      
                      {/* Map Markers */}
                      <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg cursor-pointer hover:scale-110 transition-transform z-10">
                        1
                      </div>
                      <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg cursor-pointer hover:scale-110 transition-transform z-10">
                        2
                      </div>
                      <div className="absolute bottom-1/3 left-1/2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg cursor-pointer hover:scale-110 transition-transform z-10">
                        3
                      </div>
                      <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg cursor-pointer hover:scale-110 transition-transform z-10">
                        4
                      </div>
                      <div className="absolute bottom-1/4 right-1/2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg cursor-pointer hover:scale-110 transition-transform z-10">
                        5
                      </div>
                    </div>
                    
                    {/* Map Controls */}
                    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 z-20">
                      <button className="p-2 hover:bg-gray-100 rounded">
                        <span className="text-lg">+</span>
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded">
                        <span className="text-lg">-</span>
                      </button>
                    </div>
                    
                    {/* Map Legend */}
                    <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-20">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                        <span>Hotel locations</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hotel Cards */}
                <div className="space-y-4">
                  {[
                    {
                      name: "Clock Tower Hotel",
                      location: "Shahr-e Now",
                      stars: 5,
                      rating: 6.1,
                      reviews: 33,
                      description: "Clock Tower Hotel in Shahr-e Now features 5-star accommodation with a garden, a terrace and a restaurant. The accommodation provides a 24-hour front desk, airport transfers, room service and free...",
                      image: "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel1.webp"
                    },
                    {
                      name: "Afghania Guest House",
                      location: "Kabul",
                      stars: 3,
                      rating: 8.1,
                      reviews: 109,
                      description: "Afghania Guest House is offering accommodation in Kabul. Each accommodation at the 3-star hotel has garden views, and guests can enjoy access to a garden and to a terrace.",
                      image: "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel2.webp"
                    },
                    {
                      name: "Afghan Arya Guest House & Tours",
                      location: "Kabul",
                      stars: 3,
                      rating: 9.5,
                      reviews: 38,
                      description: "Featuring a garden, Afghan Arya Guest House & Tours is situated in Kabul. Boasting a shared kitchen, this property also provides guests with a children's playground.",
                      image: "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel3.webp",
                      locationScore: 9.6
                    },
                    {
                      name: "Sarwari Guesthouse Qargha",
                      location: "Kabul",
                      stars: 4,
                      rating: 9.6,
                      reviews: 5,
                      description: "Sarwari Guesthouse Qargha is a recently renovated apartment in Kabul, where guests can make the most of its garden and barbecue facilities.",
                      image: "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel4.webp"
                    },
                    {
                      name: "Star Shirpoor Guest House",
                      location: "Kabul",
                      stars: 3,
                      rating: 6.2,
                      reviews: 4,
                      description: "Featuring a garden, Star Shirpoor Guest House is located in Kabul. Among the facilities of this property are a restaurant, room service and a 24-hour front desk, along with free WiFi throughout the...",
                      image: "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel5.webp"
                    },
                    {
                      name: "Kabul Star Hotel & Restaurant",
                      location: "Shīrpūr",
                      stars: 5,
                      rating: 7.9,
                      reviews: 42,
                      description: "Kabul Star Hotel & Restaurant in Shīrpūr features 5-star accommodation with a terrace.",
                      image: "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel6.webp"
                    },
                    {
                      name: "Kefayat Hotel",
                      location: "Balkh",
                      stars: 4,
                      rating: 9.2,
                      reviews: 4,
                      description: "Kefayat Hotel features a fitness centre, garden, a shared lounge and terrace in Balkh.",
                      image: "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel7.webp"
                    },
                    {
                      name: "Shahzadaguesthouse",
                      location: "Kabul",
                      stars: 4,
                      rating: 10,
                      reviews: 1,
                      description: "Shahzadaguesthouse is situated in Kabul. Fitted with a balcony, the accommodation offers air conditioning and features a flat-screen TV and a private bathroom with shower.",
                      image: "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel8.webp",
                      locationScore: 10
                    },
                    {
                      name: "Herat Star Hotel",
                      location: "Herāt",
                      stars: 4,
                      rating: 6.7,
                      reviews: 3,
                      description: "Herat Star Hotel is located in Herāt. This 4-star hotel offers a concierge service and dry cleaning services.",
                      image: "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel9.webp"
                    },
                    {
                      name: "Kabul Taj Hotel",
                      location: "Kabul",
                      stars: 5,
                      rating: 7.5,
                      reviews: 2,
                      description: "Set in Kabul, Kabul Taj Hotel offers 5-star accommodation with a terrace and a bar. Offering a restaurant, the property also has a garden, as well as a sauna and a hot tub.",
                      image: "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel10.webp"
                    },
                    {
                      name: "Khyber Hotel",
                      location: "Kabul",
                      stars: 3,
                      rating: 8.5,
                      reviews: 28,
                      description: "Khyber Hotel is offering accommodation in Kabul. This 3-star hotel offers a shared kitchen and a shared lounge. There is a terrace and guests can make use of free WiFi and free private parking.",
                      image: "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel11.webp"
                    }
                  ].map((hotel, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                      <div className="flex flex-col lg:flex-row">
                        {/* Hotel Image */}
                        <div className="lg:w-1/3">
                          <div className="relative h-48 lg:h-full min-h-[200px]">
                            <div className="absolute inset-0 bg-gray-200 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none overflow-hidden">
                              <img 
                                src={hotel.image} 
                                alt={hotel.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  if (target.parentElement) {
                                    target.parentElement.innerHTML = `<div class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500"><div class="text-center"><div class="text-4xl mb-2">🏨</div><div class="text-sm">${hotel.name}</div></div></div>`;
                                  }
                                }}
                              />
                            </div>
                            {hotel.locationScore && (
                              <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium z-10">
                                Location {hotel.locationScore}
                              </div>
                            )}
                            {/* Debug info - remove later */}
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs opacity-0 hover:opacity-100 z-20">
                              {hotel.image.split('/').pop()}
                            </div>
                          </div>
                        </div>
                        
                        {/* Hotel Info */}
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>{hotel.location}</span>
                                <div className="flex items-center gap-1">
                                  {[...Array(hotel.stars)].map((_, i) => (
                                    <Star key={i} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="text-left">
                              <div className="flex items-center gap-1 mb-1">
                                <span className="text-2xl font-bold text-blue-600">{hotel.rating}</span>
                                <span className="text-sm text-gray-600">{hotel.reviews} reviews</span>
                              </div>
                              <div className="text-sm text-gray-600">
                                {hotel.rating >= 9 ? 'Exceptional' : hotel.rating >= 8 ? 'Very good' : hotel.rating >= 7 ? 'Good' : hotel.rating >= 6 ? 'Pleasant' : 'Fair'}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hotel.description}</p>
                          
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-xs text-gray-500">Opens in new window</p>
                            </div>
                            <Link href={`/hotel/${hotel.name.replace(/\s+/g, '-').toLowerCase()}`} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                              Show prices
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Keep existing bus results */}
        {type === "bus" && (
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-right">نتایج جستجو</h1>
            <div className="bg-white rounded-xl p-6 mb-8 shadow">
              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <span className="font-bold text-gray-900">نوع: <b className="text-orange-600">{type}</b></span>
                <span className="font-bold text-gray-900">مبدا: <b className="text-orange-600">کابل</b></span>
                <span className="font-bold text-gray-900">مقصد: <b className="text-orange-600">{destination}</b></span>
                <span className="font-bold text-gray-900">تاریخ: <b className="text-orange-600">{departure}</b></span>
                <span className="font-bold text-gray-900">مسافران: <b className="text-orange-600">{passengers}</b></span>
              </div>
            </div>
            <div>
              {loading && <div className="text-center text-gray-500 py-8">در حال بارگذاری...</div>}
              {error && <div className="text-center text-red-500 py-8">{error}</div>}
              {!loading && !error && buses.length === 0 && (
                <div className="text-center text-gray-500 py-8">هیچ اتوبوسی یافت نشد.</div>
              )}
              <div className="grid gap-6">
                {buses.map((bus) => (
                  <div key={bus._id} className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-md">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1 text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-lg text-gray-900">{bus.busName}</span>
                          <span className="text-xs text-gray-500">{bus.busType}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-gray-700">{bus.from}</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-gray-700">{bus.to}</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-1">تاریخ حرکت: {bus.departureTime}</div>
                        <div className="text-xs text-gray-500 mb-1">قیمت: <span className="font-bold text-orange-500">{bus.price} افغانی</span></div>
                        <div className="text-xs text-gray-500">صندلی‌های خالی: {bus.availableSeats} / {bus.totalSeats}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Link href={`/bus-booking/${bus._id}?from=${encodeURIComponent("کابل")}&to=${encodeURIComponent(destination)}&date=${departure}&passengers=${passengers}`} className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition">رزرو</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other types */}
        {type !== "bus" && type !== "hotel" && (
          <div className="container mx-auto px-4 py-12">
            <div className="text-center text-gray-500 py-12">
              <p>در حال حاضر فقط جستجوی اتوبوس و هتل پیاده‌سازی شده است.</p>
              <Link href="/hotels" className="inline-block mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition">بازگشت به هتل‌ها</Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
