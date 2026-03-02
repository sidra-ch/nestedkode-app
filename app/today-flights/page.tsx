"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Plane, Clock, MapPin, Users, Star, ChevronDown, Search } from "lucide-react";

export default function TodayFlightsPage() {
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [originDropdown, setOriginDropdown] = useState(false);
  const [destinationDropdown, setDestinationDropdown] = useState(false);
  const [searchOrigin, setSearchOrigin] = useState("");
  const [searchDestination, setSearchDestination] = useState("");

  const cities = [
    "کابل", "مزار شریف", "هرات", "قندهار", "بامیان", "جلال‌آباد", 
    "پنجشیر", "تخار", "بلخ", "غزنی", "ننگرهار", "اردویز"
  ];

  const todayFlights = [
    {
      id: 1,
      airline: "کام ایر",
      flightNumber: "KAM-101",
      origin: "کابل",
      destination: "مزار شریف",
      departureTime: "08:30",
      arrivalTime: "09:45",
      price: "2,450",
      availableSeats: 45,
      rating: 4.5,
      aircraft: "Boeing 737"
    },
    {
      id: 2,
      airline: "آریانا",
      flightNumber: "AFG-202",
      origin: "کابل",
      destination: "هرات",
      departureTime: "10:15",
      arrivalTime: "11:30",
      price: "1,850",
      availableSeats: 32,
      rating: 4.2,
      aircraft: "Airbus A320"
    },
    {
      id: 3,
      airline: "Afghan Jet",
      flightNumber: "AFJ-303",
      origin: "مزار شریف",
      destination: "کابل",
      departureTime: "12:00",
      arrivalTime: "13:15",
      price: "2,200",
      availableSeats: 28,
      rating: 4.3,
      aircraft: "Boeing 737"
    },
    {
      id: 4,
      airline: "Saf Airways",
      flightNumber: "SAF-404",
      origin: "کابل",
      destination: "قندهار",
      departureTime: "14:30",
      arrivalTime: "15:45",
      price: "1,650",
      availableSeats: 38,
      rating: 4.1,
      aircraft: "Airbus A319"
    },
    {
      id: 5,
      airline: "کام ایر",
      flightNumber: "KAM-505",
      origin: "هرات",
      destination: "کابل",
      departureTime: "16:00",
      arrivalTime: "17:15",
      price: "1,950",
      availableSeats: 42,
      rating: 4.4,
      aircraft: "Boeing 737"
    },
    {
      id: 6,
      airline: "آریانا",
      flightNumber: "AFG-606",
      origin: "کابل",
      destination: "جلال‌آباد",
      departureTime: "18:30",
      arrivalTime: "19:30",
      price: "1,250",
      availableSeats: 35,
      rating: 4.0,
      aircraft: "Airbus A320"
    }
  ];

  const filteredFlights = todayFlights.filter(flight => {
    const originMatch = !selectedOrigin || flight.origin === selectedOrigin;
    const destinationMatch = !selectedDestination || flight.destination === selectedDestination;
    return originMatch && destinationMatch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: 'rtl' }}>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">پروازهای امروز</h1>
              <p className="text-lg text-blue-100">بهترین پروازهای امروز در تمام مسیرهای داخلی</p>
            </div>
          </div>
        </div>

        {/* Search Filters */}
        <div className="container mx-auto px-4 -mt-8 relative z-10 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Origin */}
              <div className="relative">
                <label className="text-sm text-gray-700 font-bold mb-2 block text-right">مبدأ</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="انتخاب شهر مبدأ"
                    value={selectedOrigin || searchOrigin}
                    onChange={(e) => {
                      setSearchOrigin(e.target.value);
                      setOriginDropdown(true);
                      if (!e.target.value) setSelectedOrigin("");
                    }}
                    onFocus={() => setOriginDropdown(true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-medium"
                  />
                  <ChevronDown className="absolute left-3 top-3.5 h-5 text-gray-400 pointer-events-none" />
                  {originDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                      {cities.filter(city => city.includes(searchOrigin) || searchOrigin === "").map(city => (
                        <button
                          key={city}
                          onClick={() => { setSelectedOrigin(city); setSearchOrigin(""); setOriginDropdown(false); }}
                          className="w-full px-4 py-3 text-right hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Destination */}
              <div className="relative">
                <label className="text-sm text-gray-700 font-bold mb-2 block text-right">مقصد</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="انتخاب شهر مقصد"
                    value={selectedDestination || searchDestination}
                    onChange={(e) => {
                      setSearchDestination(e.target.value);
                      setDestinationDropdown(true);
                      if (!e.target.value) setSelectedDestination("");
                    }}
                    onFocus={() => setDestinationDropdown(true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-medium"
                  />
                  <ChevronDown className="absolute left-3 top-3.5 h-5 text-gray-400 pointer-events-none" />
                  {destinationDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                      {cities.filter(city => city.includes(searchDestination) || searchDestination === "").map(city => (
                        <button
                          key={city}
                          onClick={() => { setSelectedDestination(city); setSearchDestination(""); setDestinationDropdown(false); }}
                          className="w-full px-4 py-3 text-right hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedOrigin || selectedDestination) && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => { setSelectedOrigin(""); setSelectedDestination(""); setSearchOrigin(""); setSearchDestination(""); }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  پاک کردن فیلترها
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Flights List */}
        <div className="container mx-auto px-4 mb-12">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {filteredFlights.length} پرواز امروز
                {(selectedOrigin || selectedDestination) && (
                  <span className="text-gray-500 font-normal mr-2">
                    {selectedOrigin && `از ${selectedOrigin}`}
                    {selectedOrigin && selectedDestination && " به "}
                    {selectedDestination && `به ${selectedDestination}`}
                  </span>
                )}
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredFlights.map((flight) => (
                <div key={flight.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Airline Info */}
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Plane className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{flight.airline}</h3>
                          <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                          <p className="text-sm text-gray-500">{flight.aircraft}</p>
                        </div>
                      </div>
                    </div>

                    {/* Route */}
                    <div className="lg:col-span-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{flight.departureTime}</p>
                          <p className="text-sm text-gray-600">{flight.origin}</p>
                        </div>
                        <div className="flex-1 px-4">
                          <div className="relative">
                            <div className="border-t-2 border-dashed border-gray-300"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                              <Plane className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 text-center mt-2">1 ساعت 15 دقیقه</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{flight.arrivalTime}</p>
                          <p className="text-sm text-gray-600">{flight.destination}</p>
                        </div>
                      </div>
                    </div>

                    {/* Seats & Rating */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{flight.availableSeats} صندلی خالی</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm text-gray-600">{flight.rating}</span>
                      </div>
                    </div>

                    {/* Price & Book */}
                    <div className="lg:col-span-3">
                      <div className="text-left">
                        <p className="text-2xl font-bold text-blue-600">{flight.price} AFN</p>
                        <p className="text-sm text-gray-500 mb-3">به ازای هر نفر</p>
                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                          رزرو پرواز
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredFlights.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">پروازی یافت نشد</h3>
                <p className="text-gray-500">هیچ پروازی برای مسیر انتخابی امروز یافت نشد</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
