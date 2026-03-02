"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type Booking = {
  _id: string;
  busId?: {
    origin?: string;
    destination?: string;
  };
  seats: number[];
  totalPrice: number;
  paymentStatus: string;
};

function PaymentConfirmContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams?.get("bookingId");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!bookingId) {
        setError("No booking ID provided");
        setLoading(false);
        return;
      }

      try {
        const bookingRes = await fetch(`${API_BASE}/api/booking/${bookingId}`);
        if (bookingRes.ok) {
          const bookingData = await bookingRes.json();
          setBooking(bookingData.item);
        }
      } catch (err) {
        setError((err as Error).message || "Failed to load booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-12">
          <p className="text-center text-gray-600">Loading payment confirmation...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-12">
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h1 className="text-2xl font-bold text-red-700 mb-2">Payment Error</h1>
            <p className="text-red-600">{error}</p>
            <Link href="/bus" className="inline-block mt-4 text-blue-600 hover:underline">
              Back to search
            </Link>
          </div>
        ) : booking ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">Your booking has been confirmed.</p>

            <div className="bg-white rounded-lg p-6 text-left mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-semibold text-gray-900">{booking._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Route:</span>
                <span className="font-semibold text-gray-900">
                  {booking.busId?.origin} → {booking.busId?.destination}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seats:</span>
                <span className="font-semibold text-gray-900">{booking.seats.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold text-green-600">${booking.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold text-green-600">{booking.paymentStatus}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              A confirmation email has been sent. Your ticket will be available on your account.
            </p>

            <div className="flex gap-3">
              <Link
                href="/bus"
                className="flex-1 rounded-lg bg-yellow-400 py-3 font-semibold text-black hover:bg-yellow-500"
              >
                Search Another Bus
              </Link>
              <Link
                href="/my-bookings"
                className="flex-1 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-50"
              >
                View My Bookings
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600">No booking found</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function PaymentConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-2xl mx-auto px-4 py-12">
            <p className="text-center text-gray-600">Loading...</p>
          </main>
          <Footer />
        </div>
      }
    >
      <PaymentConfirmContent />
    </Suspense>
  );
}
