"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, Users, Star, ChevronDown, Plane, Bus, Map, Instagram, Twitter, Facebook, Youtube, Phone, Mail } from "lucide-react";
import { formatDualDate } from "@/lib/date-utils";
import DatePicker, { DateObject } from "react-multi-date-picker";

const provinces = [
  { name: "کابل", icon: "🏛️" },
  { name: "مزار شریف", icon: "🕌" },
  { name: "هرات", icon: "🌆" },
  { name: "قندهار", icon: "🏜️" },
  { name: "بامیان", icon: "❄️" },
  { name: "جلال‌آباد", icon: "🌳" },
  { name: "پنجشیر", icon: "🏔️" },
  { name: "تخار", icon: "🌄" },
  { name: "بلخ", icon: "🕌" },
  { name: "غزنی", icon: "🏰" },
];

const popularHotels = {
  "کابل": [
    { name: "هتل سرینا کابل", stars: 5, image: "/assets/tour1.jpg" },
    { name: "هتل کابل استار", stars: 4, image: "/assets/tour2.jpg" },
    { name: "هتل انترکانتیننتال", stars: 5, image: "/assets/tour3.jpg" },
    { name: "هتل کارلتون", stars: 4, image: "/assets/tour4.jpg" },
    { name: "هتل نیو کابل", stars: 3, image: "/assets/tour5.jpg" },
    { name: "هتل گراند کابل", stars: 5, image: "/assets/tour6.jpg" },
    { name: "هتل پارک کابل", stars: 4, image: "/assets/tour1.jpg" },
    { name: "هتل ریجنسی", stars: 5, image: "/assets/tour2.jpg" },
  ],
  "مزار شریف": [
    { name: "هتل مرجان مزار شریف", stars: 5, image: "/assets/tour3.jpg" },
    { name: "هتل نیلوفر مزار شریف", stars: 4, image: "/assets/tour4.jpg" },
    { name: "هتل سیتی مزار شریف", stars: 4, image: "/assets/tour5.jpg" },
    { name: "هتل امیر مزار شریف", stars: 3, image: "/assets/tour6.jpg" },
    { name: "هتل زرین مزار شریف", stars: 5, image: "/assets/tour1.jpg" },
    { name: "هتل قدس مزار شریف", stars: 4, image: "/assets/tour2.jpg" },
    { name: "هتل سلطان مزار شریف", stars: 5, image: "/assets/tour3.jpg" },
    { name: "هتل رواق مزار شریف", stars: 4, image: "/assets/tour4.jpg" },
  ],
  "هرات": [
    { name: "هتل پارس هرات", stars: 5, image: "/assets/tour5.jpg" },
    { name: "هتل الیزابت هرات", stars: 4, image: "/assets/tour6.jpg" },
    { name: "هتل سلطانیه هرات", stars: 4, image: "/assets/tour1.jpg" },
    { name: "هتل قدیم هرات", stars: 3, image: "/assets/tour2.jpg" },
    { name: "هتل صفا هرات", stars: 5, image: "/assets/tour3.jpg" },
    { name: "هتل جواهر هرات", stars: 4, image: "/assets/tour4.jpg" },
    { name: "هتل ارکیده هرات", stars: 5, image: "/assets/tour5.jpg" },
    { name: "هتل بهار هرات", stars: 4, image: "/assets/tour6.jpg" },
  ],
};

const cityIcons = [
  { name: "کابل", icon: "/assets/tour1.jpg" },
  { name: "مزار شریف", icon: "/assets/tour2.jpg" },
  { name: "هرات", icon: "/assets/tour3.jpg" },
  { name: "قندهار", icon: "/assets/tour4.jpg" },
  { name: "بامیان", icon: "/assets/tour5.jpg" },
  { name: "غزنی", icon: "/assets/tour6.jpg" },
  { name: "پنجشیر", icon: "/assets/tour1.jpg" },
  { name: "تخار", icon: "/assets/tour2.jpg" },
  { name: "جلال‌آباد", icon: "/assets/tour3.jpg" },
  { name: "بلخ", icon: "/assets/tour4.jpg" },
  { name: "ننگرهار", icon: "/assets/tour5.jpg" },
  { name: "اردویز", icon: "/assets/tour6.jpg" },
];

const faqs = [
  { q: "چگونه می‌توانم از هتل و فرآیند رزرو آن اطلاعاتی کسب کنم؟", a: "با مراجعه به صفحه هتل مورد نظر می‌توانید تمام اطلاعات مربوط به هتل، امکانات و فرآیند رزرو را مشاهده کنید. تصاویر، موقعیت مکانی و فاصله تا جاذبه‌های گردشگری نیز در دسترس است." },
  { q: "چگونه می‌توانم هتل خارجی را رزرو کنم؟ آیا امکان پرداخت با کارت شتاب وجود دارد؟", a: "بله، برای رزرو هتل خارجی می‌توانید از کارت‌های شتاب استفاده کنید. فرآیند رزرو بسیار ساده و امن است و هزینه به ریال پرداخت می‌شود." },
  { q: "آیا امکان کنسلی رزرو و بازگشت وجه پس از رزرو هتل وجود دارد؟", a: "بله، بسته به قوانین هتل امکان کنسلی و استرداد وجه وجود دارد. شرایط کنسلی برای هر هتل متفاوت است و قبل از رزرو نمایش داده می‌شود." },
  { q: "چه ساعتی می‌توانیم چک این و چه ساعتی باید چک اوت کنیم؟", a: "معمولاً ساعت چک این از 14:00 و چک اوت تا 12:00 ظهر است. این زمان ممکن است در هتل‌های مختلف متفاوت باشد." },
  { q: "ورود و خروج نیمه‌ساعت چیست؟", a: "ورود نیمه‌ساعت به معنای پرداخت هزینه برای ورود زودتر از زمان معمول یا خروج دیرتر از زمان معمول است." },
  { q: "تا چه سنی کودکان رایگان هستند و تخت آن‌ها چگونه است؟", a: "شرایط سنی کودکان رایگان بسته به هتل متفاوت است. معمولاً کودکان زیر 2 سال بدون تخت و کودکان 2-12 سال با تخت اضافه رایگان هستند." },
  { q: "تفاوت اتاق‌ها مانند دابل یا توئین، جونیور یا امپریال یا سوئیت چیست؟", a: "دابل: یک تخت دو نفره، توئین: دو تخت یک نفره، جونیور: اتاق بزرگتر با فضای نشیمن، امپریال: لوکس‌ترین نوع اتاق، سوئیت: اتاق با فضای جداگانه نشیمن و خواب" },
  { q: "ووچر چیست؟", a: "ووچر سند الکترونیکی است که پس از پرداخت هزینه هتل دریافت می‌کنید و با آن می‌توانید در هتل پذیرش شوید." },
  { q: "دلیل نرخ‌های پایین هتل‌های افغانی‌بابا چیست؟", a: "افغانی‌بابا با هتل‌ها قرارداد مستقیم دارد و هزینه واسطه‌ها را حذف می‌کند، بنابراین بهترین قیمت را ارائه می‌دهد." },
  { q: "آیا مبلغ ذکر شده در سایت افغانی‌بابا نهایی است؟ آیا امکان تغییر آن بعداً وجود دارد؟", a: "بله، مبلغ نمایش داده شده نهایی است و پس از رزرو تغییر نمی‌کند. تمام هزینه‌ها شامل مالیات و عوارض است." },
];

export default function HotelsPage() {
  const [destinationDropdown, setDestinationDropdown] = useState(false);
  const [dateDropdown, setDateDropdown] = useState(false);
  const [destinationSearch, setDestinationSearch] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1 بزرگسال، 1 اتاق");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    searchParams.set('type', 'hotel');
    searchParams.set('city', selectedDestination);
    searchParams.set('checkIn', departureDate);
    searchParams.set('checkOut', returnDate);
    searchParams.set('guests', passengers);
    window.location.href = `/search-results?${searchParams.toString()}`;
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: 'rtl' }}>
      <Navbar />

      <main className="flex-1">
        {/* Enhanced Hero Section */}
        <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://res.cloudinary.com/dwmxdyvd2/image/upload/v1772226652/hotelimg_exmle5.webp')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                رزرو بهترین هتل‌ها در سراسر افغانستان
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                با افغانی‌بابا، اقامتی راحت و مطمئن را تجربه کنید
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Search Card */}
        <div className="container mx-auto px-4 -mt-8 md:-mt-12 lg:-mt-16 relative z-20 mb-12">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8">
            {/* Search Form - No Service Tabs */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <label className="text-sm text-gray-900 font-bold mb-2 block text-right">مقصد یا هتل</label>
                  <input
                    type="text"
                    placeholder="شهر یا نام هتل"
                    value={selectedDestination || destinationSearch}
                    onChange={(e) => {
                      setDestinationSearch(e.target.value);
                      setDestinationDropdown(true);
                      if (!e.target.value) setSelectedDestination("");
                    }}
                    onFocus={() => setDestinationDropdown(true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right font-medium text-gray-900 placeholder:text-gray-400"
                  />
                  <ChevronDown className="absolute left-3 top-11 h-5 text-gray-400 pointer-events-none" />
                  {destinationDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                      {provinces.filter(p => p.name.includes(destinationSearch) || destinationSearch === "").map(province => (
                        <button
                          key={province.name}
                          onClick={() => { setSelectedDestination(province.name); setDestinationSearch(""); setDestinationDropdown(false); }}
                          className="w-full px-4 py-3 text-right hover:bg-orange-50 flex items-center justify-between border-b border-gray-100 last:border-b-0"
                        >
                          <span className="font-medium">{province.name}</span>
                          <span>{province.icon}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div className="relative group/date">
                    <label className="text-sm text-gray-900 font-bold mb-2 block text-right">تاریخ ورود</label>
                    <div className="relative">
                      <DatePicker
                        value={departureDate}
                        onChange={(date: any) => {
                          const dateStr = date instanceof DateObject ? date.format("YYYY-MM-DD") : (date ? new Date(date).toISOString().split('T')[0] : "");
                          setDepartureDate(dateStr);
                        }}
                        calendarPosition="bottom-right"
                        fixMainPosition
                        render={(value, openCalendar) => (
                          <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-right font-medium text-gray-900 text-sm h-[46px] flex items-center justify-between cursor-pointer" onClick={openCalendar}>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                            <span className="font-bold">{departureDate || "Select Date"}</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative group/date">
                    <label className="text-sm text-gray-900 font-bold mb-2 block text-right">تاریخ خروج</label>
                    <div className="relative">
                      <DatePicker
                        value={returnDate}
                        onChange={(date: any) => {
                          const dateStr = date instanceof DateObject ? date.format("YYYY-MM-DD") : (date ? new Date(date).toISOString().split('T')[0] : "");
                          setReturnDate(dateStr);
                        }}
                        calendarPosition="bottom-right"
                        fixMainPosition
                        render={(value, openCalendar) => (
                          <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-right font-medium text-gray-900 text-sm h-[46px] flex items-center justify-between cursor-pointer" onClick={openCalendar}>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                            <span className="font-bold">{returnDate || "Select Date"}</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="text-sm text-gray-900 font-bold mb-2 block text-right">مسافران و اتاق</label>
                  <Users className="absolute left-3 top-11 h-5 text-gray-400 pointer-events-none" />
                  <select value={passengers} onChange={(e) => setPassengers(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right pr-10 font-medium text-gray-900 appearance-none">
                    <option value="1 بزرگسال، 1 اتاق">1 بزرگسال، 1 اتاق</option>
                    <option value="2 بزرگسال، 1 اتاق">2 بزرگسال، 1 اتاق</option>
                    <option value="2 بزرگسال، 2 اتاق">2 بزرگسال، 2 اتاق</option>
                    <option value="خانواده">خانواده</option>
                  </select>
                  <ChevronDown className="absolute left-3 top-11 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-center mt-6">
                <button onClick={handleSearch} className="px-12 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 shadow-lg transition-all transform hover:scale-105">
                  جستجو
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Other Services Banner */}
        <section className="container mx-auto px-4 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              <Link href="/flights" className="flex items-center gap-2 text-gray-700 hover:text-orange-500">
                <Plane className="h-5 w-5" />
                <span className="font-medium">بلیط هواپیما</span>
              </Link>
              <Link href="/bus" className="flex items-center gap-2 text-gray-700 hover:text-orange-500">
                <Bus className="h-5 w-5" />
                <span className="font-medium">بلیط اتوبوس</span>
              </Link>
              <Link href="/tour" className="flex items-center gap-2 text-gray-700 hover:text-orange-500">
                <Map className="h-5 w-5" />
                <span className="font-medium">تور</span>
              </Link>
              <Link href="/taxi" className="flex items-center gap-2 text-gray-700 hover:text-orange-500">
                <Bus className="h-5 w-5" />
                <span className="font-medium">تاکسی</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Popular Hotels in Different Cities */}
        {Object.entries(popularHotels).map(([city, hotels]) => (
          <section key={city} className="container mx-auto px-4 mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">هتل‌های محبوب {city}</h2>
                <p className="text-gray-600">بهترین هتل‌های {city} با بهترین قیمت</p>
              </div>
              <Link href={`/search-results?type=hotel&destination=${city}`} className="flex items-center gap-2 px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 font-medium transition-colors">
                <span>مشاهده همه هتل‌ها</span>
                <span className="text-lg">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hotels.map((hotel, index) => (
                <Link key={index} href={`/search-results?type=hotel&destination=${city}&hotel=${hotel.name}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative h-40 md:h-48 overflow-hidden">
                      <Image src={hotel.image} alt={hotel.name} fill className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <div className="flex items-center gap-1">
                          {[...Array(hotel.stars)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2">{hotel.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{hotel.stars} ستاره</span>
                        <div className="flex items-center gap-1 text-orange-500">
                          <span className="text-sm font-medium">از</span>
                          <span className="text-lg font-bold">{((hotel.name.length * 13) % 300) + 200}</span>
                          <span className="text-sm">دالر</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* City Icons Section */}
        <section className="container mx-auto px-4 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-right">هتل‌ها</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {cityIcons.map((city, index) => (
              <Link key={index} href={`/search-results?type=hotel&destination=${city.name}`} className="group">
                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition text-center">
                  <div className="h-16 w-16 md:h-20 md:w-20 mx-auto mb-2 rounded-full overflow-hidden">
                    <Image src={city.icon} alt={city.name} width={80} height={80} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-medium text-gray-800 group-hover:text-orange-500">{city.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* App Download Section */}
        <section className="container mx-auto px-4 mb-12">
          <div className="bg-gradient-to-l from-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">اپلیکیشن افغانی‌بابا</h2>
                <p className="text-white/90 mb-6 leading-relaxed">
                  سفر سریع‌تر و مطمئن‌تر با اپلیکیشن افغانی‌بابا. امکان جستجو، خرید و استرداد از طریق وب‌سایت و اپلیکیشن.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/mobile-app" className="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-medium rounded-lg hover:bg-gray-100">
                    <span>🍎</span>
                    <span>دانلود iOS</span>
                  </a>
                  <a href="/mobile-app/android" className="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-medium rounded-lg hover:bg-gray-100">
                    <span>🤖</span>
                    <span>دانلود Android</span>
                  </a>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <Image src="/assets/Home-page/home-card-5.png" alt="QR Code" width={160} height={160} className="w-32 h-32 md:w-40 md:h-40" />
              </div>
            </div>
          </div>
        </section>

        {/* Hotel Booking Info Section */}
        <section className="bg-gray-50 py-12 mb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">رزرو هتل با افغانی‌بابا</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed text-right">
              <p>
                افغانی‌بابا به عنوان معتمدترین پلتفرم خرید بلیط و خدمات گردشگری، امکان رزرو آنلاین هتل‌های داخلی و خارجی را فراهم می‌کند. برای رزرو هتل در افغانی‌بابا، کافیست به صفحه هتل‌ها مراجعه کنید، مقصد و بازه زمانی خود را مشخص کنید و سپس جستجو کنید.
              </p>
              <p>
                در صفحه نتایج جستجو، محبوب‌ترین هتل‌ها به ترتیب نمایش داده می‌شوند. با کلیک بر روی هر هotel، می‌توانید جزئیات کامل هتل شامل تصاویر، امکانات، موقعیت مکانی بر روی نقشه و فاصله تا جاذبه‌های گردشگری را مشاهده کنید.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                  <div className="text-3xl mb-2">💰</div>
                  <h3 className="font-bold text-gray-900 mb-1">بهترین قیمت</h3>
                  <p className="text-sm text-gray-600">تضمین کمترین نرخ بازار</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                  <div className="text-3xl mb-2">🔄</div>
                  <h3 className="font-bold text-gray-900 mb-1">استرداد آسان</h3>
                  <p className="text-sm text-gray-600">کنسلی و بازگشت وجه</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                  <div className="text-3xl mb-2">📞</div>
                  <h3 className="font-bold text-gray-900 mb-1">پشتیبانی ۲۴/۷</h3>
                  <p className="text-sm text-gray-600">راهنمایی در تمام مراحل</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">سوالات متداول درباره رزرو هتل</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-4 flex items-center justify-between text-right hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronDown className="h-5 w-5 text-gray-400 rotate-180" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-600 text-right">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Simple Trust Features */}
        <section className="container mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">چرا افغانی‌بابا را انتخاب کنیم؟</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow text-right">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">معتمدترین عرضه‌کننده</h3>
              <p className="text-gray-600 text-sm leading-relaxed">ارائه خدمات گردشگری با کیفیت و قابل اعتماد برای بهترین تجربه سفر</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow text-right">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🏨</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">تمام هتل‌های داخلی و خارجی</h3>
              <p className="text-gray-600 text-sm leading-relaxed">کامل‌ترین سایت رزرو هتل‌های داخلی و خارجی با بهترین قیمت‌ها</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow text-right">
              <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🎧</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">دسترسی آسان، هر زمان</h3>
              <p className="text-gray-600 text-sm leading-relaxed">جستجو، خرید و استرداد از طریق وب‌سایت و اپلیکیشن با پشتیبانی ۲۴/۷</p>
            </div>
          </div>
        </section>

        <Footer />

      </main>
    </div>
  );
}
