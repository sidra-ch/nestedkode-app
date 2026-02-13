"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function BookingReview() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Retrieve passenger details from session storage
    const stored = sessionStorage.getItem("passengerDetails");
    if (stored) {
      setBookingData(JSON.parse(stored));
    } else {
      router.push("/");
    }
  }, []);

  const handleConfirmBooking = async () => {
    if (!bookingData) return;

    setLoading(true);
    try {
      // Update booking with passenger details
      const response = await fetch(`/api/bookings/${bookingData.bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          passengerDetails: bookingData.passengers,
          contactEmail: bookingData.contactInfo.email,
          contactPhone: bookingData.contactInfo.phone,
        }),
      });

      if (response.ok) {
        // Proceed to payment
        router.push(`/payment?bookingId=${bookingData.bookingId}`);
      } else {
        alert("خطا در ثبت اطلاعات");
      }
    } catch (error) {
      console.error("Booking confirmation error:", error);
      alert("خطا در ثبت اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  if (!bookingData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">بررسی نهایی و پرداخت</h1>
          <p className="mt-2 text-gray-600">لطفا اطلاعات را بررسی کنید</p>
        </div>

        {/* Passenger Details Review */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">مسافران</h2>
          <div className="space-y-3">
            {bookingData.passengers.map((passenger: any, index: number) => (
              <div key={index} className="rounded-lg border border-gray-200 p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">نام</p>
                    <p className="font-semibold text-gray-900">{passenger.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">سن</p>
                    <p className="font-semibold text-gray-900">{passenger.age}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">جنسیت</p>
                    <p className="font-semibold text-gray-900">
                      {passenger.gender === "male" ? "مرد" : "زن"}
                    </p>
                  </div>
                  {passenger.seatNumber && (
                    <div>
                      <p className="text-gray-500">صندلی</p>
                      <p className="font-semibold text-gray-900">{passenger.seatNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information Review */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">اطلاعات تماس</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">ایمیل</p>
              <p className="font-semibold text-gray-900">{bookingData.contactInfo.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">شماره تماس</p>
              <p className="font-semibold text-gray-900">{bookingData.contactInfo.phone}</p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mb-6 rounded-lg bg-yellow-50 border border-yellow-200 p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">⚠️ نکات مهم</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-yellow-800">
            <li>لطفا اطلاعات مسافران را با مدارک شناسایی مطابقت دهید</li>
            <li>بلیط الکترونیکی به ایمیل شما ارسال خواهد شد</li>
            <li>حداقل 30 دقیقه قبل از حرکت حضور داشته باشید</li>
            <li>شرایط کنسلی و استرداد را مطالعه کنید</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <button
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            disabled={loading}
          >
            ویرایش اطلاعات
          </button>
          <button
            onClick={handleConfirmBooking}
            disabled={loading}
            className="rounded-lg bg-[#FDB713] px-8 py-3 font-semibold text-black hover:bg-[#e6a512] disabled:opacity-50"
          >
            {loading ? "در حال پردازش..." : "تایید و پرداخت"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
