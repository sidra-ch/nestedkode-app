"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
  price: number;
  busType: string;
};

export default function EditBusPage() {
  const router = useRouter();
  const params = useParams();
  const busId = params.id as string;
  const { user, token, isAuthenticated } = useAuthStore();

  const [bus, setBus] = useState<Bus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    origin: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    seats: 0,
    price: 0,
    busType: "Standard",
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "vendor") {
      router.push("/login");
      return;
    }

    fetchBus();
  }, [isAuthenticated, user, router, token]);

  const fetchBus = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/vendor/bus/${busId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setBus(data);
        setFormData(data);
      } else {
        setError("Failed to load bus");
      }
    } catch (err) {
      setError("Error loading bus");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "seats" || name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/vendor/bus/${busId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Bus updated successfully!");
        router.push("/vendor/buses");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Failed to update bus");
      }
    } catch (err) {
      setError("Error updating bus");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated || user?.role !== "vendor") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Bus</h1>

        {loading ? (
          <p className="text-gray-600">Loading bus details...</p>
        ) : error ? (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Origin
                </label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Departure Time
                </label>
                <input
                  type="datetime-local"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Arrival Time
                </label>
                <input
                  type="datetime-local"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Number of Seats
                </label>
                <input
                  type="number"
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Price per Seat
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Bus Type
                </label>
                <select
                  name="busType"
                  value={formData.busType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                >
                  <option>Standard</option>
                  <option>AC</option>
                  <option>Premium</option>
                  <option>Sleeper</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <button
                type="button"
                onClick={() => router.push("/vendor/buses")}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg disabled:opacity-60"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
