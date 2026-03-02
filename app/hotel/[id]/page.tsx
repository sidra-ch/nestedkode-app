"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Star, MapPin, Check, Wifi, Coffee, Car, Shield, Info, ChevronLeft, ChevronRight, Calendar, Users, Phone, Mail } from "lucide-react";

const HotelDetailContent = () => {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';
  const searchParams = useSearchParams();
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  const checkIn = searchParams?.get("checkIn") || "";
  const checkOut = searchParams?.get("checkOut") || "";
  const guests = searchParams?.get("guests") || "";

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/hotels/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setHotel(data.hotel);
        } else {
          setError(data.error || "هتل مورد نظر یافت نشد.");
        }
      })
      .catch(() => setError("خطا در دریافت اطلاعات هتل."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">🏨</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || "Hotel not found"}</h2>
          <Link href="/hotels" className="text-blue-600 hover:underline">بازگشت به جستجوی هتل‌ها</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const amenities = hotel.amenities || [];
  const images = hotel.images || ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ direction: "rtl" }}>
      <Navbar />

      <main className="flex-1 pb-12">
        {/* Breadcrumbs & Header */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-blue-600">صفحه اصلی</Link>
              <ChevronLeft className="h-4 w-4" />
              <Link href="/hotels" className="hover:text-blue-600">هتل‌ها</Link>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-gray-900 font-medium">{hotel.name}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{hotel.name}</h1>
                  <div className="flex items-center gap-0.5">
                    {[...Array(hotel.stars || 0)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded ml-2">ویژه</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{hotel.address}, {hotel.city}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-left md:text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="bg-blue-600 text-white font-bold p-2 rounded-lg text-lg">{hotel.rating || '8.5'}</span>
                    <div>
                      <div className="font-bold text-gray-900">عالی</div>
                      <div className="text-xs text-gray-500">{hotel.reviewCount || 0} دیدگاه</div>
                    </div>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-md">
                  رزرو اتاق
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 aspect-[21/9]">
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden group">
              <img
                src={images[activeImage]}
                alt={hotel.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="hidden lg:grid grid-cols-2 grid-rows-2 lg:col-span-2 gap-4">
              {images.slice(1, 5).map((img: string, idx: number) => (
                <div
                  key={idx}
                  className="relative rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setActiveImage(idx + 1)}
                >
                  <img src={img} alt={`${hotel.name} ${idx + 2}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
              {images.length > 5 && (
                <div className="relative rounded-xl overflow-hidden cursor-pointer group">
                  <img src={images[5]} alt="More" className="w-full h-full object-cover blur-[2px]" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-xl">
                    +{images.length - 5} عکس بیشتر
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Tabs/Sections */}
        <div className="container mx-auto px-4 mt-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Details */}
            <div className="lg:w-2/3">
              {/* Description */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">توضیحات هتل</h2>
                <p className="text-gray-600 leading-relaxed text-justify">
                  {hotel.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  {amenities.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Availability */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <div className="p-8 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">انتخاب اتاق</h2>
                  <p className="text-sm text-gray-500 mt-1">از {checkIn || '---'} تا {checkOut || '---'}</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-sm font-bold text-gray-900">نوع اتاق</th>
                        <th className="px-6 py-4 text-sm font-bold text-gray-900">ظرفیت</th>
                        <th className="px-6 py-4 text-sm font-bold text-gray-900">امکانات</th>
                        <th className="px-6 py-4 text-sm font-bold text-gray-900">قیمت هر شب</th>
                        <th className="px-6 py-4 text-sm font-bold text-gray-900"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {hotel.rooms?.map((room: any, idx: number) => (
                        <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                          <td className="px-6 py-6">
                            <div className="font-bold text-gray-900">{room.roomType}</div>
                            <div className="text-xs text-orange-600 mt-1">تنها {room.availableRooms} اتاق باقی‌مانده</div>
                          </td>
                          <td className="px-6 py-6">
                            <div className="flex items-center gap-1 text-gray-700">
                              <Users className="h-4 w-4" />
                              <span className="text-sm">{room.capacity} نفر</span>
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <div className="flex flex-wrap gap-2 max-w-[200px]">
                              {room.amenities?.slice(0, 3).map((a: string, i: number) => (
                                <span key={i} className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-500">
                                  {a}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <div className="text-lg font-bold text-blue-600">{room.price.toLocaleString()} افغانی</div>
                            <div className="text-[10px] text-gray-400">شامل مالیات و هزینه‌ها</div>
                          </td>
                          <td className="px-6 py-6 text-left">
                            <Link
                              href={`/checkout/hotel?hotelId=${hotel._id}&roomId=${room._id || idx}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-sm text-sm"
                            >
                              رزرو
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Policies */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">قوانین و مقررات</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-blue-50 p-2 rounded-lg h-fit">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">ساعت ورود و خروج</h4>
                      <p className="text-sm text-gray-600">ورود از ساعت {hotel.checkInTime || '14:00'} | خروج تا ساعت {hotel.checkOutTime || '12:00'}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-blue-50 p-2 rounded-lg h-fit">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">سیاست لغو رزرو</h4>
                      <p className="text-sm text-gray-600">{hotel.policies?.cancellation || 'قوانین کنسلی بسته به نوع اتاق متفاوت است.'}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-blue-50 p-2 rounded-lg h-fit">
                      <Info className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">کودکان و تخت‌های اضافی</h4>
                      <p className="text-sm text-gray-600">{hotel.policies?.children || 'کودکان در هر سنی پذیرفته می‌شوند.'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:w-1/3">
              {/* Quick Contact */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 sticky top-4">
                <h3 className="font-bold text-gray-900 mb-4">تماس با هتل</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <Phone className="h-4 w-4" />
                    </div>
                    <span>{hotel.contact?.phone || '+93XXXXXXXX'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span>{hotel.contact?.email || 'contact@hotel.com'}</span>
                  </div>
                </div>

                <hr className="my-6 border-gray-100" />

                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-orange-600 shrink-0" />
                    <div>
                      <div className="font-bold text-orange-900 text-sm">نیاز به راهنمایی دارید؟</div>
                      <p className="text-xs text-orange-700 mt-1">تیم پشتیبانی افغانی‌بابا ۲۴/۷ برای کمک به شما در دسترس است.</p>
                      <button className="text-orange-900 font-bold text-xs mt-2 underline">تماس با پشتیبانی</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default function HotelDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    }>
      <HotelDetailContent />
    </Suspense>
  );
}
