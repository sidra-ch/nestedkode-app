"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useAuthStore from "@/store/useAuthStore";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type Booking = {
  _id: string;
  busId?: {
    origin?: string;
    destination?: string;
    company?: string;
    departureTime?: string;
  };
  seats: number[];
  totalPrice: number;
  paymentStatus: string;
  status: string;
  bookingDate?: string;
};

export default function MyBookingsPage() {
  const router = useRouter();
  const { token, isAuthenticated } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, router, token]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all bookings and filter by user (in production, use dedicated endpoint)
      const res = await fetch(`${API_BASE}/api/booking`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setBookings(data.items || []);
      } else {
        setError("Failed to load bookings");
      }
    } catch (err) {
      setError((err as Error).message || "Error loading bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    setCancelling(bookingId);
    try {
      const res = await fetch(`${API_BASE}/api/booking/${bookingId}/cancel`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        alert("Booking cancelled successfully");
        fetchBookings();
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to cancel booking");
      }
    } catch (err) {
      alert((err as Error).message || "Error cancelling booking");
    } finally {
      setCancelling(null);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Bookings</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-gray-600">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-600 mb-4">You don&apos;t have any bookings yet.</p>
            <a
              href="/bus"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg"
            >
              Search Buses
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {booking.busId?.origin} → {booking.busId?.destination}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <strong>Company:</strong> {booking.busId?.company || "N/A"}
                      </p>
                      <p>
                        <strong>Booking ID:</strong> {booking._id}
                      </p>
                      <p>
                        <strong>Seats:</strong> {booking.seats.join(", ")}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {booking.bookingDate
                          ? new Date(booking.bookingDate).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                      <p className="text-2xl font-bold text-yellow-500">${booking.totalPrice}</p>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : booking.paymentStatus === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.paymentStatus}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "cancelled"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {booking.status || "Active"}
                      </span>
                    </div>
                  </div>
                </div>

                {booking.status !== "cancelled" && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      disabled={cancelling === booking._id}
                      className="rounded-lg bg-red-100 text-red-700 px-4 py-2 font-semibold hover:bg-red-200 disabled:opacity-60"
                    >
                      {cancelling === booking._id ? "Cancelling..." : "Cancel Booking"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
