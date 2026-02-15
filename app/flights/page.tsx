"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Plane, Users, MapPin, Clock, Star } from "lucide-react";

interface Flight {
  _id: string;
  airline: string;
  flightNumber: string;
  flightType: "domestic" | "international";
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: Date;
  price: number;
  totalSeats: number;
  availableSeats: number;
  rating?: number;
  class: "economy" | "business";
}

const mockFlights: Flight[] = [
  {
    _id: "1",
    airline: "کام ایر",
    flightNumber: "KA101",
    flightType: "domestic",
    from: "کابل",
    to: "هرات",
    departureTime: "10:00",
    arrivalTime: "11:30",
    departureDate: new Date(),
    price: 120,
    totalSeats: 150,
    availableSeats: 45,
    rating: 4.6,
    class: "economy"
  },
  {
    _id: "2",
    airline: "آریانا افغان",
    flightNumber: "FG205",
    flightType: "domestic",
    from: "کابل",
    to: "مزار شریف",
    departureTime: "14:00",
    arrivalTime: "15:15",
    departureDate: new Date(),
    price: 95,
    totalSeats: 180,
    availableSeats: 60,
    rating: 4.4,
    class: "economy"
  },
  {
    _id: "3",
    airline: "کام ایر",
    flightNumber: "KA302",
    flightType: "international",
    from: "کابل",
    to: "دبی",
    departureTime: "08:30",
    arrivalTime: "11:00",
    departureDate: new Date(),
    price: 350,
    totalSeats: 200,
    availableSeats: 30,
    rating: 4.7,
    class: "business"
  }
];

export default function FlightsPage() {
  const [flights] = useState<Flight[]>(mockFlights);
  const [filterType, setFilterType] = useState<"all" | "domestic" | "international">("all");

  const filteredFlights = filterType === "all" 
    ? flights 
    : flights.filter(f => f.flightType === filterType);

  const getClassLabel = (flightClass: string) => {
    return flightClass === "economy" ? "اقتصادی" : "بیزنس";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: "rtl" }}>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-72 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 mx-auto h-full max-w-6xl px-4 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-3">رزرو پرواز</h1>
            <p className="text-white/90">سریع‌ترین راه برای سفر با بهترین قیمت‌ها</p>
          </div>
        </section>

        {/* Filters */}
        <section className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex gap-3">
            <button
              onClick={() => setFilterType("all")}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filterType === "all" 
                  ? "bg-blue-500 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              همه پروازها
            </button>
            <button
              onClick={() => setFilterType("domestic")}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filterType === "domestic" 
                  ? "bg-blue-500 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              پرواز داخلی
            </button>
            <button
              onClick={() => setFilterType("international")}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filterType === "international" 
                  ? "bg-blue-500 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              پرواز خارجی
            </button>
          </div>
        </section>

        {/* Flights List */}
        <section className="mx-auto max-w-6xl px-4 pb-12">
          <div className="space-y-4">
            {filteredFlights.map((flight) => (
              <div key={flight._id} className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-md">
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  {/* Airline Info */}
                  <div className="md:col-span-1 text-right">
                    <div className="flex items-center gap-2 justify-end mb-2">
                      <Plane className="h-5 w-5 text-blue-500" />
                      <p className="text-lg font-bold text-gray-900">{flight.airline}</p>
                    </div>
                    <p className="text-sm text-gray-600">{flight.flightNumber}</p>
                    <p className="text-xs text-gray-500 mt-1">{getClassLabel(flight.class)}</p>
                    {flight.rating && (
                      <div className="flex items-center justify-end gap-1 mt-2">
                        <span className="text-sm font-semibold text-gray-700">{flight.rating}</span>
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      </div>
                    )}
                  </div>

                  {/* Route */}
                  <div className="md:col-span-1 text-right">
                    <div className="flex items-center justify-end gap-2 mb-2">
                      <span className="font-semibold text-gray-900">{flight.from}</span>
                      <MapPin className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="border-r-2 border-gray-300 h-6 mr-2" />
                    <div className="flex items-center justify-end gap-2 mt-2">
                      <span className="font-semibold text-gray-900">{flight.to}</span>
                      <MapPin className="h-4 w-4 text-green-500" />
                    </div>
                  </div>

                  {/* Time */}
                  <div className="md:col-span-1 text-right">
                    <div className="flex items-center justify-end gap-2 mb-3">
                      <span className="font-semibold text-gray-900">حرکت: {flight.departureTime}</span>
                      <Clock className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm text-gray-600">ورود: {flight.arrivalTime}</span>
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Seats */}
                  <div className="md:col-span-1 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm">
                        {flight.availableSeats} / {flight.totalSeats} صندلی
                      </span>
                      <Users className="h-4 w-4 text-purple-500" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {flight.flightType === "domestic" ? "پرواز داخلی" : "پرواز بین‌المللی"}
                    </p>
                  </div>

                  {/* Price & Book */}
                  <div className="md:col-span-1 text-right">
                    <p className="text-xs text-gray-500 mb-1">قیمت</p>
                    <p className="text-3xl font-bold text-blue-500">${flight.price}</p>
                    <p className="text-xs text-gray-600 mb-3">به ازای هر نفر</p>
                    <Link
                      href={`/flight-booking/${flight._id}`}
                      className="block w-full rounded-lg px-6 py-3 font-semibold text-center text-white bg-blue-500 hover:bg-blue-600 transition"
                    >
                      رزرو پرواز
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Info Cards */}
        <section className="mx-auto max-w-6xl px-4 mb-12 grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-right">
            <div className="text-3xl mb-3">✈️</div>
            <h3 className="font-bold text-gray-900 mb-2">پروازهای مستقیم</h3>
            <p className="text-sm text-gray-600">
              بدون توقف و با کمترین زمان سفر
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 text-right">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-bold text-gray-900 mb-2">بهترین قیمت‌ها</h3>
            <p className="text-sm text-gray-600">
              تضمین بهترین قیمت در بازار
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 text-right">
            <div className="text-3xl mb-3">🎫</div>
            <h3 className="font-bold text-gray-900 mb-2">رزرو آنلاین</h3>
            <p className="text-sm text-gray-600">
              رزرو سریع و آسان با چند کلیک
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
