"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function BookingConfirmPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmation</h1>
        <p className="text-gray-600">Ticket confirmation details will appear here.</p>
      </main>
      <Footer />
    </div>
  );
}
