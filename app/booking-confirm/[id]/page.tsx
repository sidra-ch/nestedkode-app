"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle, Download, Printer, Calendar, Users, CreditCard, Bus } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type BookingDetails = {
  _id: string;
  bookingNumber: string;
  userId: string;
  busId?: {
    company: string;
    origin: string;
    destination: string;
    departureTime: string;
  };
  passengers: {
    name: string;
    phone: string;
    nationalId: string;
  }[];
  seats: number[];
  totalPrice: number;
  paymentStatus: string;
  bookingStatus: string;
  travelDate: string;
  createdAt: string;
};

export default function BookingConfirmPage() {
  const params = useParams();
  const bookingId = params?.id as string || "";
  
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useCallback to avoid missing dependency warning
  const fetchBookingDetails = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/bookings/${bookingId}`);
      const data = await response.json();
      if (data.success) {
        setBooking(data.booking);
      } else {
        setError('Booking not found');
      }
    } catch (err) {
      console.error('Failed to fetch booking:', err);
      setError('Failed to load booking details');
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId, fetchBookingDetails]);

  // fetchBookingDetails is now defined with useCallback above

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate PDF or download ticket
    alert('Download feature will be implemented with PDF generation');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">در حال بارگذاری...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 font-medium">{error || 'رزرو یافت نشد'}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ direction: 'rtl' }}>
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 mb-6 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">رزرو شما با موفقیت ثبت شد!</h1>
          <p className="text-gray-600 mb-4">شماره پیگیری: <span className="font-bold text-gray-900">{booking.bookingNumber || bookingId.slice(-8).toUpperCase()}</span></p>
          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              <Printer className="h-5 w-5" />
              چاپ بلیط
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              <Download className="h-5 w-5" />
              دانلود بلیط
            </button>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">جزئیات سفر</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Route Info */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Bus className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">مسیر</p>
                <p className="font-bold text-gray-900">
                  {booking.busId?.origin || 'مبدا'} → {booking.busId?.destination || 'مقصد'}
                </p>
                <p className="text-sm text-gray-600 mt-1">{booking.busId?.company || 'شرکت حمل‌ونقل'}</p>
              </div>
            </div>

            {/* Travel Date */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">تاریخ و ساعت</p>
                <p className="font-bold text-gray-900">{new Date(booking.travelDate).toLocaleDateString('fa-IR')}</p>
                <p className="text-sm text-gray-600 mt-1">ساعت: {booking.busId?.departureTime || '--:--'}</p>
              </div>
            </div>

            {/* Seats */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">صندلی‌ها</p>
                <p className="font-bold text-gray-900">
                  {booking.seats?.join(', ') || 'بدون اطلاعات'}
                </p>
                <p className="text-sm text-gray-600 mt-1">{booking.passengers?.length || 0} مسافر</p>
              </div>
            </div>

            {/* Payment */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">مبلغ پرداختی</p>
                <p className="font-bold text-gray-900">{booking.totalPrice?.toLocaleString()} افغانی</p>
                <p className="text-sm text-green-600 mt-1">پرداخت شده ✓</p>
              </div>
            </div>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">مشخصات مسافران</h2>
          
          <div className="space-y-4">
            {booking.passengers && booking.passengers.length > 0 ? (
              booking.passengers.map((passenger, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{passenger.name}</p>
                    <p className="text-sm text-gray-600">تلفن: {passenger.phone}</p>
                    <p className="text-sm text-gray-600">کد ملی: {passenger.nationalId}</p>
                  </div>
                  <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    صندلی {booking.seats?.[index] || index + 1}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">اطلاعات مسافران در دسترس نیست</p>
            )}
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-3 text-right">نکات مهم:</h3>
          <ul className="space-y-2 text-sm text-gray-700 text-right list-disc list-inside">
            <li>لطفاً 30 دقیقه قبل از حرکت در ترمینال حضور داشته باشید</li>
            <li>داشتن کارت شناسایی معتبر الزامی است</li>
            <li>این بلیط قابل انتقال به دیگران نیست</li>
            <li>برای تغییرات یا کنسلی به پشتیبانی مراجعه کنید</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
