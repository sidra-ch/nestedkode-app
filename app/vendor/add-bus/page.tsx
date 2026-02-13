"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useAuthStore from "@/store/useAuthStore";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function VendorAddBusPage() {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    company: "",
    origin: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    seats: "",
    price: "",
    busType: "Standard",
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "vendor") {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/vendor/bus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          seats: Number(form.seats),
          price: Number(form.price),
          vendorId: user?.id,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add bus");
      }

      const data = await res.json();
      alert("Bus added successfully!");
      router.push("/vendor/buses");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add bus");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Bus</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Company Name</label>
            <input
              type="text"
              name="company"
              required
              value={form.company}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Origin</label>
              <input
                type="text"
                name="origin"
                required
                value={form.origin}
                onChange={handleChange}
                placeholder="e.g., کابل"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Destination</label>
              <input
                type="text"
                name="destination"
                required
                value={form.destination}
                onChange={handleChange}
                placeholder="e.g., مزار شریف"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Departure Time</label>
              <input
                type="datetime-local"
                name="departureTime"
                required
                value={form.departureTime}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Arrival Time</label>
              <input
                type="datetime-local"
                name="arrivalTime"
                required
                value={form.arrivalTime}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Total Seats</label>
              <input
                type="number"
                name="seats"
                required
                min="1"
                value={form.seats}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Price per Seat ($)</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Bus Type</label>
              <select
                name="busType"
                value={form.busType}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="Standard">Standard</option>
                <option value="VIP">VIP</option>
                <option value="اقتصادی">اقتصادی</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-yellow-400 py-3 font-semibold text-black hover:bg-yellow-500 disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Bus"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
