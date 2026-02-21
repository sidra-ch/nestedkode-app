"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import useAuthStore from "@/store/useAuthStore";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type Bus = {
  _id: string;
  company: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  seats: number;
  availableSeats: number;
  price: number;
  busType: string;
};

export default function VendorBusesPage() {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuthStore();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "vendor") {
      router.push("/login");
      return;
    }

    fetchBuses();
  }, [isAuthenticated, user, router, token]);
  const fetchBuses = async () => {
    let active = true;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_BASE}/api/vendor/bus`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("FAILED_TO_LOAD");
      const data = await res.json();
      if (active) setBuses(data.items || []);
    } catch (fetchError) {
      if (active) setError("Failed to load buses.");
    } finally {
      if (active) setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "vendor") {
      router.push("/login");
      return;
    }

    fetchBuses();
  }, [isAuthenticated, user, router, token]);

  const handleDelete = async (busId: string) => {
    if (!confirm("Are you sure you want to delete this bus?")) return;

    setDeleting(busId);
    try {
      const res = await fetch(`${API_BASE}/api/vendor/bus/${busId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Bus deleted successfully");
        fetchBuses();
      } else {
        alert("Failed to delete bus");
      }
    } catch (err) {
      alert("Error deleting bus");
    } finally {
      setDeleting(null);
    }
  };

  if (!isAuthenticated || user?.role !== "vendor") {
    return null;
  }

  return (
    <ProtectedRoute allowedRoles={["vendor"]}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Buses</h1>
          <a
            href="/vendor/add-bus"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg"
          >
            + Add New Bus
          </a>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-gray-600">Loading buses...</p>
        ) : buses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-600 mb-4">You haven't added any buses yet.</p>
            <a
              href="/vendor/add-bus"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg"
            >
              Add Your First Bus
            </a>
          </div>
        ) : (
          <div className="grid gap-4">
            {buses.map((bus) => (
              <div key={bus._id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="grid md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {bus.origin} → {bus.destination}
                    </h3>
                    <p className="text-sm text-gray-600">{bus.company}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Type:</strong> {bus.busType}
                    </p>
                    <p>
                      <strong>Departure:</strong> {bus.departureTime}
                    </p>
                    <p>
                      <strong>Arrival:</strong> {bus.arrivalTime}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Total Seats:</strong> {bus.seats}
                    </p>
                    <p>
                      <strong>Available:</strong>{" "}
                      <span className="text-green-600 font-semibold">
                        {bus.availableSeats}
                      </span>
                    </p>
                    <p>
                      <strong>Price:</strong> ${bus.price}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <a
                    href={`/vendor/buses/${bus._id}/edit`}
                    className="flex-1 text-center bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-lg font-semibold"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => handleDelete(bus._id)}
                    disabled={deleting === bus._id}
                    className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-60 px-4 py-2 rounded-lg font-semibold"
                  >
                    {deleting === bus._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
    </ProtectedRoute>
  );
}
