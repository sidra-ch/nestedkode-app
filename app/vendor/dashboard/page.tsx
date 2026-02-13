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

export default function VendorDashboardPage() {
  const [vendorIdInput, setVendorIdInput] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [stats, setStats] = useState({
    busesRunningToday: 0,
    seatsSold: 0,
    revenue: 0,
  });
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

    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_BASE}/api/vendor/revenue?vendorId=${encodeURIComponent(vendorId)}`
        );
        if (!res.ok) throw new Error("FAILED_TO_LOAD");
        const data = await res.json();
        const items: RevenueItem[] = data.items || [];
        if (!active) return;

        const totals = items.reduce(
          (acc, item) => {
            acc.busesRunningToday += item.busesToday || 0;
            acc.seatsSold += item.seatsSold || 0;
            acc.revenue += item.revenue || 0;
            return acc;
          },
          { busesRunningToday: 0, seatsSold: 0, revenue: 0 }
        );

        setStats(totals);
      } catch (fetchError) {
        if (active) setError("Failed to load vendor stats.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchStats();
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Vendor Dashboard</h1>
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-gray-600">Vendor ID</p>
            <p className="text-xs text-gray-500">Used to load your dashboard data.</p>
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

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Buses running today", value: stats.busesRunningToday },
            { label: "Seats sold", value: stats.seatsSold },
            { label: "Revenue", value: `$${stats.revenue}` },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-lg shadow-sm p-4">
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {loading ? "--" : item.value}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
