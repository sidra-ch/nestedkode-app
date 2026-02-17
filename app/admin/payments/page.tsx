"use client";

import { useEffect, useState, useRef } from "react";
import useAuthStore from "@/store/useAuthStore";
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

type PaymentForm = {
  amount: string;
  status: string;
  method: string;
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState<PaymentForm>({ amount: "", status: "paid", method: "cash" });
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/admin/payments`);
      if (!res.ok) throw new Error("FAILED_TO_LOAD");
      const data = await res.json();
      setPayments(data.items || []);
    } catch {
      setError("Failed to load payments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Add Payment logic
  const token = useAuthStore((state) => state.token);

  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormLoading(true);
    try {
      if (!form.amount.trim() || isNaN(Number(form.amount))) {
        setFormError("Valid amount is required.");
        setFormLoading(false);
        return;
      }
      if (!form.status.trim() || !form.method.trim()) {
        setFormError("Status and method are required.");
        setFormLoading(false);
        return;
      }
      const res = await fetch(`${API_BASE}/api/admin/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          amount: Number(form.amount),
          status: form.status,
          method: form.method,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setFormError(data?.message || "Failed to add payment.");
      } else {
        setShowAddModal(false);
        setForm({ amount: "", status: "paid", method: "cash" });
        fetchPayments();
      }
    } catch {
      setFormError("Failed to add payment.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Payment Reports</h1>
        <div className="mb-4 flex justify-end">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
            onClick={() => {
              setShowAddModal(true);
              setTimeout(() => amountInputRef.current?.focus(), 100);
            }}
          >
            + Add Payment
          </button>
        </div>
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

        {/* Add Payment Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                onClick={() => {
                  setShowAddModal(false);
                  setFormError(null);
                  setForm({ amount: "", status: "paid", method: "cash" });
                }}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4">Add Payment</h2>
              <form onSubmit={handleAddPayment}>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Amount</label>
                  <input
                    ref={amountInputRef}
                    type="number"
                    className="w-full border rounded px-3 py-2"
                    value={form.amount}
                    onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Status</label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    required
                  >
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Method</label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    value={form.method}
                    onChange={e => setForm(f => ({ ...f, method: e.target.value }))}
                    required
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="bank">Bank</option>
                  </select>
                </div>
                {formError && <p className="text-red-600 text-sm mb-2">{formError}</p>}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                    onClick={() => {
                      setShowAddModal(false);
                      setFormError(null);
                      setForm({ amount: "", status: "paid", method: "cash" });
                    }}
                  >Cancel</button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                    disabled={formLoading}
                  >
                    {formLoading ? "Adding..." : "Add Payment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
