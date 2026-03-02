"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Star, ChevronRight, MapPin, Wifi, Car, Coffee, Users, Check, X, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function HotelDetailPage() {
  const params = useParams();
  const hotelId = params?.id as string || "default";

  // Dynamic hotel data based on URL parameter
  const getHotelData = (id: string) => {
    const hotelDatabase: Record<string, any> = {
      "clock-tower-hotel": {
        name: "Clock Tower Hotel",
        stars: 5,
        rating: 6.1,
        reviewCount: 33,
        location: "Shahr-e Now, Afghanistan",
        images: ["https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel1.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel2.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel3.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel4.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel5.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel6.webp"]
      },
      "afghania-guest-house": {
        name: "Afghania Guest House",
        stars: 3,
        rating: 8.1,
        reviewCount: 109,
        location: "Kabul, Afghanistan",
        images: ["https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel2.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel3.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel4.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel5.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel6.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel1.webp"]
      },
      "afghan-arya-guest-house-tours": {
        name: "Afghan Arya Guest House & Tours",
        stars: 3,
        rating: 9.5,
        reviewCount: 38,
        location: "Kabul, Afghanistan",
        images: ["https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel3.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel4.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel5.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel6.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel1.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel2.webp"]
      },
      "sarwari-guesthouse-qargha": {
        name: "Sarwari Guesthouse Qargha",
        stars: 4,
        rating: 9.6,
        reviewCount: 5,
        location: "Kabul, Afghanistan",
        images: ["https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel4.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel5.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel6.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel1.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel2.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel3.webp"]
      },
      "star-shirpoor-guest-house": {
        name: "Star Shirpoor Guest House",
        stars: 3,
        rating: 6.2,
        reviewCount: 4,
        location: "Kabul, Afghanistan",
        images: ["https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel5.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel6.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel1.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel2.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel3.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel4.webp"]
      },
      "kabul-star-hotel-restaurant": {
        name: "Kabul Star Hotel & Restaurant",
        stars: 5,
        rating: 7.9,
        reviewCount: 42,
        location: "Shīrpūr, Afghanistan",
        images: ["https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel6.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel1.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel2.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel3.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel4.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel5.webp"]
      },
      "kefayat-hotel": {
        name: "Kefayat Hotel",
        stars: 4,
        rating: 9.2,
        reviewCount: 4,
        location: "Balkh, Afghanistan",
        images: ["https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel7.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel8.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel9.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel10.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel11.webp"]
      },
      "shahzadaguesthouse": {
        name: "Shahzadaguesthouse",
        stars: 4,
        rating: 10,
        reviewCount: 1,
        location: "Kabul, Afghanistan",
        images: ["https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel8.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel9.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel10.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel11.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel1.webp"]
      },
      "herat-star-hotel": {
        name: "Herat Star Hotel",
        stars: 4,
        rating: 6.7,
        reviewCount: 3,
        location: "Herāt, Afghanistan",
        images: ["https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel9.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel10.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel11.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel1.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel2.webp"]
      },
      "kabul-taj-hotel": {
        name: "Kabul Taj Hotel",
        stars: 5,
        rating: 7.5,
        reviewCount: 2,
        location: "Kabul, Afghanistan",
        images: ["https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel10.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel11.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel1.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel2.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel3.webp"]
      },
      "khyber-hotel": {
        name: "Khyber Hotel",
        stars: 3,
        rating: 8.5,
        reviewCount: 28,
        location: "Kabul, Afghanistan",
        images: ["https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel11.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel1.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel2.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel3.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel4.webp"]
      }
    };

    // Return the specific hotel data or default data
    return hotelDatabase[id] || {
      name: "Clock Tower Hotel",
      stars: 5,
      rating: 6.1,
      reviewCount: 33,
      location: "Shahr-e Now, Afghanistan",
      images: ["https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel1.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel2.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel3.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel4.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel5.webp", "https://res.cloudinary.com/dnml0bygi/image/upload/v1733225966/hotel6.webp"]
    };
  };

  const hotelData = {
    ...getHotelData(hotelId),
    amenities: [
      "خدمات اينترنت بی‌سیم (Wifi)",
      "پذیرش شبانه‌روزی",
      "صرافی",
      "خدمات اينترنت بی‌سیم در قسمت پذیرش",
      "انبارنگهداری چمدان",
      "آسانسور",
      "دستگاه خودپرداز بانک",
      "نمازخانه",
      "ارائه خدمات تورهای شهری و تفریحی",
      "تاکسی سرویس",
      "صبحانه‌ی بوفه و متنوع",
      "امکانات ویژه برای معلولان"
    ],
    rooms: [
      {
        id: 1,
        name: "اتاق دوتخته",
        type: "استاندارد",
        capacity: "1 بزرگسال",
        meal: "صبحانه",
        refundable: false,
        price: 5200000,
        image: "/assets/tour1.jpg"
      },
      {
        id: 2,
        name: "اتاق دو تخته VIP",
        type: "VIP",
        capacity: "1 بزرگسال",
        meal: "صبحانه",
        refundable: false,
        price: 6900000,
        image: "/assets/tour2.jpg"
      },
      {
        id: 3,
        name: "اتاق سه تخته",
        type: "استاندارد",
        capacity: "1 بزرگسال",
        meal: "صبحانه",
        refundable: false,
        price: 7300000,
        image: "/assets/tour3.jpg"
      },
      {
        id: 4,
        name: "اتاق هانی مون",
        type: "هانی مون",
        capacity: "1 بزرگسال",
        meal: "صبحانه",
        refundable: false,
        price: 7800000,
        image: "/assets/tour4.jpg"
      },
      {
        id: 5,
        name: "اتاق دوتخته",
        type: "استاندارد",
        capacity: "1 بزرگسال",
        meal: "صبحانه + ناهار + شام",
        refundable: false,
        price: 11140000,
        image: "/assets/tour1.jpg"
      }
    ],
    reviews: [
      {
        id: 1,
        name: "احمد",
        type: "خریدار افغانی‌بابا",
        date: "بهمن ۱۴۰۴",
        rating: 3.2,
        comment: "سرویس رفت و برگشت به حرم یک روز حوله ندادن 😂 زنگ زدیم سرکار گذاشتن برای پیگیری حوله اتاق روز دوم نسکافه شارژ نکردن"
      },
      {
        id: 2,
        name: "جعفر",
        type: "خریدار افغانی‌بابا",
        date: "مرداد ۱۴۰۴",
        rating: 3.5,
        comment: "در تماس تلفنی به پشتیبانی هتل نکات مختلف فرهنگی رو گوشزد کردم. اتاق شیک ضعف فرهنگی"
      },
      {
        id: 3,
        name: "سپبده",
        type: "خریدار افغانی‌بابا",
        date: "اردیبهشت ۱۴۰۴",
        rating: 5,
        comment: "هتل نگین مصلی برخلاف چند انتقاد غیرمنصفانه ایی که ازش خوندم،هتل بسیار شیک،کارمندان بااخلاق،تمیز،غذاهای متنوع،ترانسفر رفت و برگشت به حرم هر یکساعت،و......"
      }
    ],
    nearbyPlaces: [
      { name: "مرکز خرید آرمان", type: "مرکز خرید", walkTime: "11 دقیقه پیاده", driveTime: "3 دقیقه با ماشین", distance: "751 متر" },
      { name: "مجتمع تجاری ابریشم", type: "مرکز خرید", walkTime: "12 دقیقه پیاده", driveTime: "3 دقیقه با ماشین", distance: "826 متر" },
      { name: "مرکز خرید آسمان", type: "مرکز خرید", walkTime: "13 دقیقه پیاده", driveTime: "4 دقیقه با ماشین", distance: "897 متر" },
      { name: "خانه تاریخی توکلی", type: "جاذبه تاریخی", walkTime: "14 دقیقه پیاده", driveTime: "3 دقیقه با ماشین", distance: "1 کیلومتر" }
    ],
    importantPlaces: [
      { name: "حرم مطهر امام رضا (ع)", type: "مکان مذهبی", walkTime: "22 دقیقه پیاده", driveTime: "4 دقیقه با ماشین", distance: "1.7 کیلومتر" },
      { name: "آرامگاه نادرشاه افشار", type: "جاذبه تاریخی", walkTime: "34 دقیقه پیاده", driveTime: "6 دقیقه با ماشین", distance: "2.5 کیلومتر" },
      { name: "پردیس سینمایی هویزه", type: "سرگرمی", walkTime: "44 دقیقه پیاده", driveTime: "9 دقیقه با ماشین", distance: "3.7 کیلومتر" }
    ],
    suggestedHotels: [
      { name: "هتل الماس 2 مشهد", stars: 5, price: 2970000 },
      { name: "هتل بین المللی گلدن پالاس مشهد", stars: 5, price: 3230000 },
      { name: "هتل الماس مشهد", stars: 4, price: 2500000 },
      { name: "هتل تبرک مشهد", stars: 4, price: 2312500 }
    ]
  };

  const [activeTab, setActiveTab] = useState("amenities");
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: "rtl" }}>
      <Navbar />
      
      <main className="flex-1">
        {/* Hotel Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Link href="/" className="hover:text-orange-500">افغانی‌بابا</Link>
              <span>/</span>
              <Link href="/hotels" className="hover:text-orange-500">هتل‌ها</Link>
              <span>/</span>
              <span>هتل های شهر مشهد</span>
              <span>/</span>
              <span className="text-gray-900">{hotelData.name}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{hotelData.name}</h1>
          </div>
        </div>

        {/* Hotel Images */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden">
                <Image 
                  src={hotelData.images[selectedImage]} 
                  alt={hotelData.name}
                  fill
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-lg text-sm">
                  {selectedImage + 1} از {hotelData.images.length}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {hotelData.images.slice(0, 4).map((image, index) => (
                <div 
                  key={index}
                  className={`relative h-24 lg:h-32 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedImage === index ? 'border-orange-500' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image src={image} alt={`${hotelData.name} ${index + 1}`} fill className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hotel Info */}
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(hotelData.stars)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <span className="text-lg font-bold text-gray-900">{hotelData.stars} ستاره</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-orange-500">{hotelData.rating}</span>
                    <span className="text-gray-600">امتیاز {hotelData.reviewCount} کاربر</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="h-5 w-5 text-orange-500" />
                  <span>{hotelData.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <span className="text-xl">📤</span>
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <span className="text-xl">❤️</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex flex-wrap border-b">
              {[
                { id: "amenities", label: "امکانات و ویژگی‌ها" },
                { id: "rooms", label: "اتاق‌ها" },
                { id: "reviews", label: "نظرات کاربران" },
                { id: "location", label: "مکان‌های مهم اطراف هتل" },
                { id: "rules", label: "قوانین و مقررات هتل" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Amenities Tab */}
              {activeTab === "amenities" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">امکانات و ویژگی‌ها</h3>
                    <button className="text-orange-500 hover:text-orange-600 font-medium">
                      مشاهده همه امکانات
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {hotelData.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rooms Tab */}
              {activeTab === "rooms" && (
                <div>
                  {/* Special Offer Banner */}
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">تخفیف‌های ویژه هتل افغانی‌بابا</h3>
                        <p className="text-gray-600 text-sm">با ورود/ثبت نام در افغانی‌بابا تخفیف‌های ویژه هتل را مشاهده کنید.</p>
                      </div>
                      <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                        ورود/ثبت نام
                      </button>
                    </div>
                  </div>

                  {/* Free Services */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <h4 className="font-bold text-gray-900 mb-2">خدمات رایگان هتل {hotelData.name}:</h4>
                    <p className="text-gray-700">ترانسفر رفت و برگشت 24 ساعته به حرم، پارکینگ، یک قطعه عکس</p>
                    <p className="text-gray-700 mt-1">هافبرد هتل {hotelData.name} صبحانه و شام میباشد</p>
                  </div>

                  {/* Room Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hotelData.rooms.map((room) => (
                      <div key={room.id} className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-48">
                          <Image src={room.image} alt={room.name} fill className="w-full h-full object-cover" />
                          {!room.refundable && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                              غیرقابل استرداد
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-gray-900 mb-2">{room.name}</h4>
                          <div className="space-y-1 text-sm text-gray-600 mb-4">
                            <p>{room.capacity}</p>
                            <p>{room.meal}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-gray-500">قیمت برای 1 شب</p>
                              <p className="text-lg font-bold text-gray-900">{room.price.toLocaleString()}تومان</p>
                            </div>
                            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                              رزرو اتاق
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div>
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl font-bold text-orange-500">{hotelData.rating}</div>
                      <div>
                        <p className="text-gray-900 font-medium">بر اساس امتیاز {hotelData.reviewCount} کاربر</p>
                        <p className="text-sm text-gray-600">پیشنهاد ٪76 مسافران</p>
                      </div>
                    </div>
                    {/* Rating Breakdown */}
                    <div className="space-y-2">
                      {[
                        { label: "نظافت اتاق و هتل", score: 4.5 },
                        { label: "نحوه پیگیری و رفتار پرسنل", score: 4 },
                        { label: "خدمات و امکانات هتل", score: 4 },
                        { label: "کیفیت صبحانه یا غذا", score: 3.9 },
                        { label: "موقعیت مکانی", score: 3.6 },
                        { label: "ارزش نسبت به قیمت", score: 3.5 }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <span className="text-sm text-gray-700 w-48">{item.label}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full" 
                              style={{ width: `${(item.score / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-700 w-8">{item.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900">آخرین نظرات این هتل ({hotelData.reviews.length} نظر)</h4>
                    {hotelData.reviews.map((review) => (
                      <div key={review.id} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-gray-600">👤</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-bold text-gray-900">{review.name}</p>
                                <p className="text-sm text-gray-600">{review.type} • {review.date}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                  />
                                ))}
                                <span className="text-sm text-gray-700 mr-2">{review.rating}</span>
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                            <button className="text-orange-500 hover:text-orange-600 text-sm mt-2">
                              بیشتر
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3 text-orange-500 hover:text-orange-600 font-medium mt-4">
                    مشاهده همه نظرات
                  </button>
                </div>
              )}

              {/* Location Tab */}
              {activeTab === "location" && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">موقعیت مکانی هتل</h3>
                    <div className="flex items-center gap-2 text-gray-700 mb-6">
                      <MapPin className="h-5 w-5 text-orange-500" />
                      <span>{hotelData.location}</span>
                    </div>
                  </div>

                  {/* Nearby Places */}
                  <div className="mb-8">
                    <h4 className="font-bold text-gray-900 mb-4">اطراف هتل</h4>
                    <div className="space-y-3">
                      {hotelData.nearbyPlaces.map((place, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{place.name}</p>
                            <p className="text-sm text-gray-600">{place.type}</p>
                          </div>
                          <div className="text-left text-sm">
                            <p className="text-gray-700">{place.walkTime}</p>
                            <p className="text-gray-600">{place.driveTime}</p>
                            <p className="text-gray-500">{place.distance}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Important Places */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">مکان‌های مهم شهر</h4>
                    <div className="space-y-3">
                      {hotelData.importantPlaces.map((place, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{place.name}</p>
                            <p className="text-sm text-gray-600">{place.type}</p>
                          </div>
                          <div className="text-left text-sm">
                            <p className="text-gray-700">{place.walkTime}</p>
                            <p className="text-gray-600">{place.driveTime}</p>
                            <p className="text-gray-500">{place.distance}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">فاصله‌ها تقریبی محاسبه شده است.</p>
                </div>
              )}

              {/* Rules Tab */}
              {activeTab === "rules" && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-6">قوانین و مقررات هتل</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">ساعت ورود</h4>
                        <p className="text-gray-700">14:00</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">ساعت خروج</h4>
                        <p className="text-gray-700">12:00</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">نکات ضروری</h4>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li>• نرخ مهمان خارجی با ایرانی، یکسان است.</li>
                          <li>• ترانسفر از هتل به حرم مطهر رضوی، رایگان است.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-2">هزینه های جانبی</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      شرایط اقامت کودک و امکان استفاده از تخت اضافه در هر اتاق، بر اساس «نشان» نمایش داده شده مشخص میشود. در صورتی که نشان «محاسبه آنلاین نرخ کودک» را مشاهده میکنید، هزینه اقامت کودک در قیمت نهایی رزرو لحاظ شده است. اما اگر نشان «هزینه کودک به صورت حضوری» نمایش داده شود، هزینه اقامت کودک مطابق قوانین هتل و در زمان پذیرش از مسافر دریافت خواهد شد.
                    </p>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-2">هتل‌های مشهد</h4>
                    <div className="flex flex-wrap gap-2">
                      {["هتل سی نور مشهد", "هتل الماس 2", "هتل الماس 1", "هتل سارینا مشهد", "هتل درویشی مشهد", "هتل قصر طلایی مشهد", "هتل مدینه الرضا", "هتل قصر مشهد", "هتل قصر الضیافه مشهد", "هتل اطلس مشهد", "هتل رز درویشی", "هتل جواد مشهد", "هتل سایه مشهد", "هتل رضویه مشهد"].map((hotel, index) => (
                        <span key={index} className="text-sm text-blue-600 hover:underline cursor-pointer">
                          {hotel}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Suggested Hotels */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">هتل های پیشنهادی مشهد</h2>
          <div className="text-sm text-gray-600 mb-4">۱۱ اسفند تا ۱۲ اسفند, ۱ شب</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotelData.suggestedHotels.map((hotel, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="h-32 bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 right-2 text-white">
                    <p className="font-bold text-sm">{hotel.name}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    ))}
                    <span className="text-sm text-gray-600 mr-1">{hotel.stars} ستاره</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">1 بزرگسال, 1 اتاق</div>
                  <div className="text-lg font-bold text-gray-900">{hotel.price.toLocaleString()}تومان</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
