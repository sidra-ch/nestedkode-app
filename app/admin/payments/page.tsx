"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type PaymentItem = {
  _id: string;
  amount: number;
  status: string;
  method: string;
  createdAt: string;
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchPayments = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/payments`);
        if (!res.ok) throw new Error("FAILED_TO_LOAD");
        const data = await res.json();
        if (active) setPayments(data.items || []);
      } catch (fetchError) {
        if (active) setError("Failed to load payments.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchPayments();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Payment Reports</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          {loading ? (
            <p className="text-sm text-gray-600">Loading payments...</p>
          ) : payments.length === 0 ? (
            <p className="text-sm text-gray-600">No payments found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-2">ID</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Method</th>
                    <th className="py-2">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment._id} className="border-t">
                      <td className="py-2 text-gray-600">{payment._id.slice(-6)}</td>
                      <td className="py-2 text-gray-600">${payment.amount}</td>
                      <td className="py-2 text-gray-600">{payment.status}</td>
                      <td className="py-2 text-gray-600">{payment.method}</td>
                      <td className="py-2 text-gray-600">
                        {new Date(payment.createdAt).toLocaleString()}
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
