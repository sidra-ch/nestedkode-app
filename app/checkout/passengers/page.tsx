"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PassengerDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const [passengers, setPassengers] = useState([
    { name: "", age: "", gender: "male", seatNumber: "" },
  ]);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
  });

  const addPassenger = () => {
    setPassengers([...passengers, { name: "", age: "", gender: "male", seatNumber: "" }]);
  };

  const updatePassenger = (index: number, field: string, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const removePassenger = (index: number) => {
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const isValid = passengers.every(
      (p) => p.name && p.age && p.gender
    ) && contactInfo.email && contactInfo.phone;

    if (!isValid) {
      alert("لطفا تمام فیلدها را پر کنید");
      return;
    }

    // Store data and proceed to review
    sessionStorage.setItem("passengerDetails", JSON.stringify({
      passengers,
      contactInfo,
      bookingId,
    }));

    router.push("/checkout/review");
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">اطلاعات مسافران</h1>
          <p className="mt-2 text-gray-600">لطفا اطلاعات مسافران را با دقت وارد کنید</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Passenger Details */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">مسافران</h2>
              <button
                type="button"
                onClick={addPassenger}
                className="rounded-lg border border-[#FDB713] px-4 py-2 text-sm font-semibold text-[#FDB713] hover:bg-[#fff7e0]"
              >
                + افزودن مسافر
              </button>
            </div>

            <div className="space-y-6">
              {passengers.map((passenger, index) => (
                <div key={index} className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">مسافر {index + 1}</h3>
                    {passengers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePassenger(index)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        حذف
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نام و نام خانوادگی <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={passenger.name}
                        onChange={(e) => updatePassenger(index, "name", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-right"
                        placeholder="مثال: احمد رضایی"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        سن <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={passenger.age}
                        onChange={(e) => updatePassenger(index, "age", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-right"
                        placeholder="25"
                        min="1"
                        max="120"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        جنسیت <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={passenger.gender}
                        onChange={(e) => updatePassenger(index, "gender", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-right"
                        required
                      >
                        <option value="male">مرد</option>
                        <option value="female">زن</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        شماره صندلی
                      </label>
                      <input
                        type="text"
                        value={passenger.seatNumber}
                        onChange={(e) => updatePassenger(index, "seatNumber", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-right"
                        placeholder="A12"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">اطلاعات تماس</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ایمیل <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-left"
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  شماره تماس <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-left"
                  placeholder="+93 xxx xxx xxxx"
                  required
                />
              </div>
            </div>
          </div>

          {/* Terms & Submit */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 rounded" required />
              <span className="text-sm text-gray-700">
                قوانین و مقررات سایت و شرایط استرداد بلیط را مطالعه کرده‌ام و می‌پذیرم
              </span>
            </label>

            <div className="mt-6 flex justify-between items-center">
              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
              >
                بازگشت
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#FDB713] px-8 py-3 font-semibold text-black hover:bg-[#e6a512]"
              >
                ادامه به بررسی نهایی
              </button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
