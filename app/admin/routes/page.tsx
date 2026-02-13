"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type RouteStat = {
  route: string;
  buses: number;
  seatsSold: number;
  revenue: number;
  averagePrice: number;
};

export default function AdminRoutesPage() {
  const [routes, setRoutes] = useState<RouteStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchRoutes = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/routes`);
        if (!res.ok) throw new Error("FAILED_TO_LOAD");
        const data = await res.json();
        if (active) setRoutes(data.items || []);
      } catch (fetchError) {
        if (active) setError("Failed to load routes.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchRoutes();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Route Analytics</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          {loading ? (
            <p className="text-sm text-gray-600">Loading routes...</p>
          ) : routes.length === 0 ? (
            <p className="text-sm text-gray-600">No route data available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-2">Route</th>
                    <th className="py-2">Buses</th>
                    <th className="py-2">Seats sold</th>
                    <th className="py-2">Revenue</th>
                    <th className="py-2">Avg. price</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((route) => (
                    <tr key={route.route} className="border-t">
                      <td className="py-2 font-medium text-gray-900">{route.route}</td>
                      <td className="py-2 text-gray-600">{route.buses}</td>
                      <td className="py-2 text-gray-600">{route.seatsSold}</td>
                      <td className="py-2 text-gray-600">${route.revenue}</td>
                      <td className="py-2 text-gray-600">${route.averagePrice}</td>
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
