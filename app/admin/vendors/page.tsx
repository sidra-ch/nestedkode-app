"use client";

import { useEffect, useState, useRef } from "react";
import useAuthStore from "@/store/useAuthStore";
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

type VendorForm = {
  name: string;
  email: string;
};

type EditVendorState = {
  id: string;
  name: string;
  email: string;
} | null;

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<VendorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState<VendorForm>({ name: "", email: "" });
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [editVendor, setEditVendor] = useState<EditVendorState>(null);
  const [editForm, setEditForm] = useState<VendorForm>({ name: "", email: "" });
  const [editError, setEditError] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteVendorId, setDeleteVendorId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchVendors = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/admin/vendors`);
      if (!res.ok) throw new Error("FAILED_TO_LOAD");
      const data = await res.json();
      setVendors(data.items || []);
    } catch {
      setError("Failed to load vendors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // Add Vendor logic
  const token = useAuthStore((state) => state.token);

  const handleAddVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormLoading(true);
    try {
      if (!form.name.trim() || !form.email.trim()) {
        setFormError("Name and email are required.");
        setFormLoading(false);
        return;
      }
      const res = await fetch(`${API_BASE}/api/admin/vendors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setFormError(data?.message || "Failed to add vendor.");
      } else {
        setShowAddModal(false);
        setForm({ name: "", email: "" });
        fetchVendors();
      }
    } catch {
      setFormError("Failed to add vendor.");
    } finally {
      setFormLoading(false);
    }
  };

  // Edit Vendor logic
  const openEditModal = (vendor: VendorItem) => {
    setEditVendor({ id: vendor.id, name: vendor.name, email: vendor.email });
    setEditForm({ name: vendor.name, email: vendor.email });
    setEditError(null);
  };

  const handleEditVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editVendor) return;
    setEditError(null);
    setEditLoading(true);
    try {
      if (!editForm.name.trim() || !editForm.email.trim()) {
        setEditError("Name and email are required.");
        setEditLoading(false);
        return;
      }
      const res = await fetch(`${API_BASE}/api/admin/vendors/${editVendor.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) {
        const data = await res.json();
        setEditError(data?.message || "Failed to update vendor.");
      } else {
        setEditVendor(null);
        fetchVendors();
      }
    } catch {
      setEditError("Failed to update vendor.");
    } finally {
      setEditLoading(false);
    }
  };

  // Delete Vendor logic
  const handleDeleteVendor = async () => {
    if (!deleteVendorId) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/vendors/${deleteVendorId}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) {
        // Optionally handle error
      }
      setDeleteVendorId(null);
      fetchVendors();
    } catch {
      // Optionally handle error
      setDeleteVendorId(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Vendor Management</h1>
        <div className="mb-4 flex justify-end">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
            onClick={() => {
              setShowAddModal(true);
              setTimeout(() => nameInputRef.current?.focus(), 100);
            }}
          >
            + Add Vendor
          </button>
        </div>
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
                  <th className="py-2">Actions</th>
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
                    <td className="py-2 flex gap-2">
                      <button
                        className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                        onClick={() => openEditModal(vendor)}
                      >Edit</button>
                      <button
                        className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                        onClick={() => setDeleteVendorId(vendor.id)}
                      >Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Edit Vendor Modal */}
      {editVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setEditVendor(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Vendor</h2>
            <form onSubmit={handleEditVendor}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editForm.name}
                  onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border rounded px-3 py-2"
                  value={editForm.email}
                  onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
              {editError && <p className="text-red-600 text-sm mb-2">{editError}</p>}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                  onClick={() => setEditVendor(null)}
                >Cancel</button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                  disabled={editLoading}
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Vendor Modal */}
      {deleteVendorId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setDeleteVendorId(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Delete Vendor</h2>
            <p className="mb-4">Are you sure you want to delete this vendor? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                onClick={() => setDeleteVendorId(null)}
                disabled={deleteLoading}
              >Cancel</button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700"
                onClick={handleDeleteVendor}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Add Vendor Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                onClick={() => {
                  setShowAddModal(false);
                  setFormError(null);
                  setForm({ name: "", email: "" });
                }}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4">Add Vendor</h2>
              <form onSubmit={handleAddVendor}>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Name</label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full border rounded px-3 py-2"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
                {formError && <p className="text-red-600 text-sm mb-2">{formError}</p>}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                    onClick={() => {
                      setShowAddModal(false);
                      setFormError(null);
                      setForm({ name: "", email: "" });
                    }}
                  >Cancel</button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                    disabled={formLoading}
                  >
                    {formLoading ? "Adding..." : "Add Vendor"}
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
