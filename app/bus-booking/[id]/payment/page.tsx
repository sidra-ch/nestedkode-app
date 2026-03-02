"use client";

import { useSearchParams, useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, Suspense } from "react";

function BusBookingPaymentContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const busId = (params?.id ?? "") as string;
  const seats = searchParams?.get("seats") || "";
  const date = searchParams?.get("date") || "";
  const passengers = searchParams?.get("passengers") || "";

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      router.push(`/bus-booking/${busId}/success?seats=${seats}&date=${date}&passengers=${passengers}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Bus Booking Payment</h1>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <p className="mb-2"><strong>Bus ID:</strong> {busId}</p>
          <p className="mb-2"><strong>Selected Seats:</strong> {seats}</p>
          <p className="mb-2"><strong>Date:</strong> {date}</p>
          <p className="mb-2"><strong>Passengers:</strong> {passengers}</p>
        </div>
        <form onSubmit={handlePayment} className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
          <div className="mb-4">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="mr-2"
              />
              Card
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                className="mr-2"
              />
              Cash
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
                className="mr-2"
              />
              Bank Transfer
            </label>
          </div>
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
            disabled={processing}
          >
            {processing ? "Processing..." : "Pay & Confirm"}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default function BusBookingPaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    }>
      <BusBookingPaymentContent />
    </Suspense>
  );
}
