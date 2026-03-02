"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useAuthStore from "@/store/useAuthStore";

function BusBookingConfirmContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const busId = params?.id as string || "";
  const seats = searchParams?.get("seats") || "";
  const date = searchParams?.get("date") || "";
  const passengers = searchParams?.get("passengers") || "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useAuthStore((state) => state.token);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          busId,
          seats: seats.split(",").map((s) => s.trim()),
          travelDate: date,
        }),
      });
      let data: any = {};
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        setError("خطا در ارتباط با سرور. لطفا دوباره تلاش کنید.");
        setLoading(false);
        return;
      }
      if (!res.ok || !data.booking?._id) {
        setError(data.message || "خطا در ثبت رزرو");
        setLoading(false);
        return;
      }
      router.push(`/checkout/passengers?bookingId=${data.booking._id}`);
    } catch (err: any) {
      setError(err.message || "خطا در ثبت رزرو");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Confirm Your Bus Booking</h1>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <p className="mb-2"><strong>Bus ID:</strong> {busId}</p>
          <p className="mb-2"><strong>Selected Seats:</strong> {seats}</p>
          <p className="mb-2"><strong>Date:</strong> {date}</p>
          <p className="mb-2"><strong>Passengers:</strong> {passengers}</p>
        </div>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Processing..." : "Proceed to Passenger Details"}
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default function BusBookingConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    }>
      <BusBookingConfirmContent />
    </Suspense>
  );
}
