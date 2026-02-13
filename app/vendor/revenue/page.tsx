"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type RevenueItem = {
  route: string;
  busesToday: number;
  seatsSold: number;
  revenue: number;
};

export default function VendorRevenuePage() {
  const [vendorIdInput, setVendorIdInput] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [routes, setRoutes] = useState<RevenueItem[]>([]);
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

    const fetchRevenue = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_BASE}/api/vendor/revenue?vendorId=${encodeURIComponent(vendorId)}`
        );
        if (!res.ok) throw new Error("FAILED_TO_LOAD");
        const data = await res.json();
        if (active) setRoutes(data.items || []);
      } catch (fetchError) {
        if (active) setError("Failed to load revenue.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchRevenue();
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Route Revenue</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Vendor ID</p>
              <p className="text-xs text-gray-500">Shows revenue for your routes.</p>
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
            <p className="text-sm text-gray-600">Loading revenue...</p>
          ) : routes.length === 0 ? (
            <p className="text-sm text-gray-600">No revenue data found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-2">Route</th>
                    <th className="py-2">Buses today</th>
                    <th className="py-2">Seats sold</th>
                    <th className="py-2">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((route) => (
                    <tr key={route.route} className="border-t">
                      <td className="py-2 text-gray-900 font-medium">{route.route}</td>
                      <td className="py-2 text-gray-600">{route.busesToday}</td>
                      <td className="py-2 text-gray-600">{route.seatsSold}</td>
                      <td className="py-2 text-gray-600">${route.revenue}</td>
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
