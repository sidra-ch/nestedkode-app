"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageUpload from "@/components/ImageUpload";
import useAuthStore from "@/store/useAuthStore";

export default function VendorAddTourPage() {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "domestic",
    city: "",
    duration: "",
    price: "",
    priceUSD: "",
    totalSeats: "",
    departureDate: "",
    returnDate: "",
    includes: "",
    highlights: "",
    image: "",
    images: [] as string[],
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "vendor") {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const tourData = {
        title: form.title,
        description: form.description,
        category: form.category,
        city: form.city,
        duration: form.duration,
        price: Number(form.price),
        priceUSD: form.priceUSD ? Number(form.priceUSD) : undefined,
        image: form.image || form.images[0] || "",
        images: form.images.length > 0 ? form.images : [form.image],
        totalSeats: Number(form.totalSeats),
        availableSeats: Number(form.totalSeats),
        departureDate: form.departureDate ? new Date(form.departureDate) : undefined,
        returnDate: form.returnDate ? new Date(form.returnDate) : undefined,
        includes: form.includes.split('\n').filter(item => item.trim()),
        highlights: form.highlights.split('\n').filter(item => item.trim()),
        vendorId: user?.id,
        isActive: true,
        isApproved: false,
      };

      const res = await fetch('/api/tours', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(tourData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add tour");
      }

      alert("تور با موفقیت اضافه شد! منتظر تایید مدیر باشید.");
      router.push("/vendor/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add tour");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ direction: 'rtl' }}>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-right">افزودن تور جدید</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-right">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2 text-right">عنوان تور</label>
            <input
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="مثلاً: تور 3 روزه بامیان"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-right"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2 text-right">توضیحات</label>
            <textarea
              name="description"
              required
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="توضیحات کامل درباره تور..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-right"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 text-right">دسته‌بندی</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-right"
              >
                <option value="domestic">تور داخلی</option>
                <option value="nowruz_domestic">تور داخلی نوروزی</option>
                <option value="taxi">تور با تاکسی</option>
                <option value="oneday">تور یک روزه</option>
                <option value="exhibition">تور نمایشگاهی</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 text-right">شهر</label>
              <input
                type="text"
                name="city"
                required
                value={form.city}
                onChange={handleChange}
                placeholder="مثلاً: بامیان، هرات، مزار"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-right"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 text-right">مدت زمان</label>
              <input
                type="text"
                name="duration"
                required
                value={form.duration}
                onChange={handleChange}
                placeholder="مثلاً: 3 روز و 2 شب"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 text-right">ظرفیت کل</label>
              <input
                type="number"
                name="totalSeats"
                required
                min="1"
                value={form.totalSeats}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-right"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 text-right">قیمت (افغانی)</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 text-right">قیمت (دلار) - اختیاری</label>
              <input
                type="number"
                name="priceUSD"
                min="0"
                value={form.priceUSD}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-right"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 text-right">تاریخ رفت</label>
              <input
                type="date"
                name="departureDate"
                value={form.departureDate}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 text-right">تاریخ برگشت</label>
              <input
                type="date"
                name="returnDate"
                value={form.returnDate}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-right"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2 text-right">
              موارد شامل تور (هر مورد در یک خط)
            </label>
            <textarea
              name="includes"
              value={form.includes}
              onChange={handleChange}
              rows={4}
              placeholder="حمل و نقل&#10;صبحانه&#10;راهنمای تور&#10;بیمه مسافرتی"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-right"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2 text-right">
              نکات برجسته (هر مورد در یک خط)
            </label>
            <textarea
              name="highlights"
              value={form.highlights}
              onChange={handleChange}
              rows={4}
              placeholder="بازدید از  بند امیر&#10;دیدار از بوداهای بامیان&#10;غذای محلی"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-right"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2 text-right">تصاویر تور</label>
            <ImageUpload
              value={form.images}
              onChange={(urls) => setForm({ 
                ...form, 
                images: Array.isArray(urls) ? urls : [urls],
                image: Array.isArray(urls) ? urls[0] : urls
              })}
              multiple={true}
              type="tour"
              maxFiles={5}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? "در حال ارسال..." : "افزودن تور"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              انصراف
            </button>
          </div>

          <p className="text-sm text-gray-500 text-right">
            ⚠️ تور شما پس از بررسی توسط مدیر تایید و منتشر می‌شود.
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}
