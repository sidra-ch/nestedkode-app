"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type BookingItem = {
  _id: string;
  busId?: {
    origin?: string;
    destination?: string;
    company?: string;
  };
  seats: number[];
  totalPrice: number;
  paymentStatus: string;
  bookingDate?: string;
};

export default function VendorBookingsPage() {
  const [vendorIdInput, setVendorIdInput] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("vendorId");
    if (saved) {
      setVendorId(saved);
      setVendorIdInput(saved);
    }
  }, []);

  useEffect(() => {
    if (!vendorId) return;
    let active = true;

    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_BASE}/api/vendor/bookings?vendorId=${encodeURIComponent(vendorId)}`
        );
        if (!res.ok) throw new Error("FAILED_TO_LOAD");
        const data = await res.json();
        if (active) setBookings(data.items || []);
      } catch (fetchError) {
        if (active) setError("Failed to load bookings.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchBookings();
    return () => {
      active = false;
    };
  }, [vendorId]);

  const applyVendorId = () => {
    const value = vendorIdInput.trim();
    setVendorId(value);
    if (value) {
      window.localStorage.setItem("vendorId", value);
    } else {
      window.localStorage.removeItem("vendorId");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Booking List</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Vendor ID</p>
              <p className="text-xs text-gray-500">Shows bookings for your buses.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                type="text"
                value={vendorIdInput}
                onChange={(event) => setVendorIdInput(event.target.value)}
                placeholder="Enter vendor ID"
                className="w-full sm:w-72 rounded-md border border-gray-200 px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={applyVendorId}
                className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-500"
              >
                Apply
              </button>
            </div>
          </div>

          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          {loading ? (
            <p className="text-sm text-gray-600">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="text-sm text-gray-600">No bookings found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-2">Route</th>
                    <th className="py-2">Company</th>
                    <th className="py-2">Seats</th>
                    <th className="py-2">Total</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="border-t">
                      <td className="py-2 text-gray-600">
                        {booking.busId?.origin} → {booking.busId?.destination}
                      </td>
                      <td className="py-2 text-gray-600">{booking.busId?.company || "-"}</td>
                      <td className="py-2 text-gray-600">{booking.seats?.length || 0}</td>
                      <td className="py-2 text-gray-600">${booking.totalPrice}</td>
                      <td className="py-2 text-gray-600">{booking.paymentStatus}</td>
                      <td className="py-2 text-gray-600">
                        {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
