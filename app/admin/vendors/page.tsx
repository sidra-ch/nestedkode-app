"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type VendorItem = {
  id: string;
  name: string;
  email: string;
  buses: number;
  revenue: number;
  isActive: boolean;
};

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<VendorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchVendors = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/vendors`);
        if (!res.ok) throw new Error("FAILED_TO_LOAD");
        const data = await res.json();
        if (active) setVendors(data.items || []);
      } catch (fetchError) {
        if (active) setError("Failed to load vendors.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchVendors();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Vendor Management</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          {loading ? (
            <p className="text-sm text-gray-600">Loading vendors...</p>
          ) : vendors.length === 0 ? (
            <p className="text-sm text-gray-600">No vendors found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-2">Name</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Buses</th>
                    <th className="py-2">Revenue</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => (
                    <tr key={vendor.id} className="border-t">
                      <td className="py-2 font-medium text-gray-900">{vendor.name}</td>
                      <td className="py-2 text-gray-600">{vendor.email}</td>
                      <td className="py-2 text-gray-600">{vendor.buses}</td>
                      <td className="py-2 text-gray-600">${vendor.revenue}</td>
                      <td className="py-2 text-gray-600">{vendor.isActive ? "Active" : "Suspended"}</td>
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
