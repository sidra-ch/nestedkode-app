"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Bus, AlertCircle, ChevronLeft } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type BusDetails = {
  _id: string;
  company: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  seats: number;
  availableSeats: number;
  busType: string;
  bookedSeats?: number[];
};

export default function BusBookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const busId = params?.id as string || "";
  
  const date = searchParams?.get("date") || new Date().toISOString().split("T")[0];
  const passengers = searchParams?.get("passengers") || "1";

  const [bus, setBus] = useState<BusDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const maxSeats = 2;

  useEffect(() => {
    fetchBusDetails();
  }, [busId]);

  const fetchBusDetails = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/bus/${busId}`);
      if (res.ok) {
        const data = await res.json();
        setBus(data);
        setBookedSeats(data.bookedSeats || [1, 5, 9, 13, 17, 28, 32]); // Mock booked seats
      }
    } catch (error) {
      console.error("Error fetching bus details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeatClick = (seatNumber: number) => {
    if (bookedSeats.includes(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      if (selectedSeats.length >= maxSeats) {
        return; // Max seats reached
      }
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const getSeatColor = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      return "bg-blue-500 text-white hover:bg-blue-600";
    }
    if (bookedSeats.includes(seatNumber)) {
      return "bg-gray-700 text-gray-400 cursor-not-allowed";
    }
    return "bg-gray-200 text-gray-800 hover:bg-gray-300";
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) return;
    
    const queryParams = new URLSearchParams({
      seats: selectedSeats.join(","),
      date: date,
      passengers: passengers,
    });
    
    router.push(`/bus-booking/${busId}/confirm?${queryParams.toString()}`);
  };

  // Seat layout configuration
  const leftSeats = [
    [4, 3],
    [8, 7],
    [12, 11],
    [16, 15],
    [20, 19],
    [22, 21],
    [24, 23],
    [26, 25],
    [30, 29],
    [34, 33],
    [38, 37],
    [42, 41],
    [46, 45],
    [51, 50],
  ];

  const rightSeats = [
    [2, 1],
    [6, 5],
    [10, 9],
    [14, 13],
    [18, 17],
    null, // WC placeholder
    [28, 27],
    [32, 31],
    [36, 35],
    [40, 39],
    [44, 43],
    [49, 48, 47],
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ChevronLeft size={20} />
          <span>بازگشت</span>
        </button>

        {/* Bus Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Bus className="text-yellow-500" size={24} />
                {bus?.company ? bus.company : ""}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {bus?.origin} → {bus?.destination}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                تاریخ سفر: {new Date(date).toLocaleDateString("fa-AF")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-yellow-500">AFN {bus?.price}</p>
              <p className="text-xs text-gray-500">به ازای هر صندلی</p>
            </div>
          </div>
        </div>

        {/* Status Legend */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex flex-wrap gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-500"></div>
              <span className="text-gray-700">انتخاب شده</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gray-200"></div>
              <span className="text-gray-700">خالی</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gray-700"></div>
              <span className="text-gray-700">رزرو شده</span>
            </div>
          </div>
        </div>

        {/* Alert Message */}
        {selectedSeats.length >= maxSeats && (
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 mb-4 flex items-center gap-2">
            <AlertCircle className="text-pink-600" size={20} />
            <p className="text-sm text-pink-800">
              شما نمی‌توانید بیش از {maxSeats} صندلی انتخاب کنید
            </p>
          </div>
        )}

        {/* Seat Layout */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Steering Wheel */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 border-4 border-gray-800 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-600 rounded-full"></div>
            </div>
          </div>

          {/* Door Label */}
          <div className="text-center text-xs text-gray-500 mb-3">
            <span className="bg-gray-100 px-3 py-1 rounded">دروازه</span>
          </div>

          {/* Seat Grid */}
          <div className="flex justify-center gap-8 mb-6">
            {/* Left Side */}
            <div className="space-y-2">
              {leftSeats.map((row, idx) => (
                <div key={`left-${idx}`} className="flex gap-2">
                  {row.map((seatNum) => (
                    <button
                      key={seatNum}
                      onClick={() => handleSeatClick(seatNum)}
                      disabled={bookedSeats.includes(seatNum)}
                      className={`w-10 h-10 rounded text-xs font-semibold transition-all ${getSeatColor(
                        seatNum
                      )}`}
                    >
                      {seatNum}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* Right Side */}
            <div className="space-y-2">
              {rightSeats.map((row, idx) => (
                <div key={`right-${idx}`} className="flex gap-2">
                  {row === null ? (
                    <div className="w-20 h-10 bg-gray-300 rounded flex items-center justify-center text-xs font-bold text-gray-700">
                      WC
                    </div>
                  ) : (
                    row.map((seatNum) => (
                      <button
                        key={seatNum}
                        onClick={() => handleSeatClick(seatNum)}
                        disabled={bookedSeats.includes(seatNum)}
                        className={`w-10 h-10 rounded text-xs font-semibold transition-all ${getSeatColor(
                          seatNum
                        )}`}
                      >
                        {seatNum}
                      </button>
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Middle Door Label */}
          <div className="text-center text-xs text-gray-500 mb-4">
            <span className="bg-gray-100 px-3 py-1 rounded">دروازه</span>
          </div>
        </div>

        {/* Selected Seats Display */}
        {selectedSeats.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              صندلی‌های انتخاب شده:
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <span
                  key={seat}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {seat}
                </span>
              ))}
            </div>
            <p className="text-lg font-bold text-gray-900 mt-3">
              قیمت کل: AFN {(bus?.price || 0) * selectedSeats.length}
            </p>
          </div>
        )}

        {/* Confirm Button */}
        <div className="mt-6">
          <button
            onClick={handleConfirm}
            disabled={selectedSeats.length === 0}
            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-bold py-4 rounded-lg transition-colors"
          >
            {selectedSeats.length === 0
              ? "صندلی خود را انتخاب کنید"
              : `تایید و ادامه (${selectedSeats.length} صندلی)`}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
