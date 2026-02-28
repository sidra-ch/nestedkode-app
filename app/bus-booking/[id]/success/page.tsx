"use client";

import { useSearchParams, useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function BusBookingSuccessPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const busId = params?.id as string || "";
  const seats = searchParams?.get("seats") || "";
  const date = searchParams?.get("date") || "";
  const passengers = searchParams?.get("passengers") || "";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold mb-6 text-green-700">Booking Confirmed!</h1>
        <div className="bg-white rounded-lg shadow p-6 mb-6 inline-block">
          <p className="mb-2"><strong>Bus ID:</strong> {busId}</p>
          <p className="mb-2"><strong>Seats:</strong> {seats}</p>
          <p className="mb-2"><strong>Date:</strong> {date}</p>
          <p className="mb-2"><strong>Passengers:</strong> {passengers}</p>
        </div>
        <p className="mb-4 text-lg text-gray-700">Thank you for booking with us!</p>
        <a
          href="/my-bookings"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          View My Bookings
        </a>
      </main>
      <Footer />
    </div>
  );
}
