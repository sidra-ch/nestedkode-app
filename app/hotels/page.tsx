"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, Users, Star, Clock, Shield, Plane, Bus, Map, Hotel as HotelIcon, ChevronDown } from "lucide-react";

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
  { q: "چگونه می‌توانم از هتل و فرآیند رزرو آن اطلاعاتی کسب کنم؟", a: "با مراجعه به صفحه هتل مورد نظر می‌توانید تمام اطلاعات مربوط به هتل، امکانات و فرآیند رزرو را مشاهده کنید." },
  { q: "چگونه می‌توانم هتل خارجی را رزرو کنم؟ آیا امکان پرداخت با کارت شتاب وجود دارد؟", a: "بله، برای رزرو هتل خارجی می‌توانید از کارت‌های شتاب استفاده کنید. فرآیند رزرو بسیار ساده و امن است." },
  { q: "آیا امکان کنسلی رزرو و بازگشت وجه پس از رزرو هتل وجود دارد؟", a: "بله، بسته به قوانین هتل امکان کنسلی و استرداد وجه وجود دارد." },
  { q: "چه ساعتی می‌توانیم چک این و چه ساعتی باید چک اوت کنیم؟", a: "معمولاً ساعت چک این از 14:00 و چک اوت تا 12:00 ظهر است." },
  { q: "ورود و خروج نیمه‌chargear چیست؟", a: "ورود نیمه‌chargear به معنای پرداخت هزینه برای ورود زودتر از زمان معمول یا خروج دیرتر از زمان معمول است." },
];

export default function HotelsPage() {
  // Removed unused originDropdown
  const [destinationDropdown, setDestinationDropdown] = useState(false);
  const [dateDropdown, setDateDropdown] = useState(false);
  // Removed unused originSearch
  const [destinationSearch, setDestinationSearch] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1 بزرگسال، 1 اتاق");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Removed unused handleSwapCities

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    searchParams.set('origin', selectedOrigin);
    searchParams.set('destination', selectedDestination);
    searchParams.set('departure', departureDate);
    searchParams.set('return', returnDate);
    searchParams.set('passengers', passengers);
    window.location.href = `/search-results?type=hotel&${searchParams.toString()}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: 'rtl' }}>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Image */}
        <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/assets/home-page.webp')` }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="container mx-auto px-4 pt-20 relative z-10">
          </div>
        </div>

        {/* Search Card */}
        <div className="container mx-auto px-4 -mt-16 md:-mt-20 lg:-mt-24 relative z-20 mb-12 md:mb-16">
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 md:p-6 lg:p-8">
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-3 md:gap-4 flex-wrap lg:flex-nowrap">
                <div className="relative flex-1 min-w-[180px]">
                  <div className="text-xs md:text-sm text-gray-900 font-bold mb-1 md:mb-2 text-right">مقصد یا هتل</div>
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
                    className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 text-right font-bold text-gray-900 placeholder:text-gray-400"
                  />
                  <ChevronDown className="absolute left-3 top-10 h-5 text-gray-400 pointer-events-none" />
                  {destinationDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                      {provinces.filter(p => p.name.includes(destinationSearch) || destinationSearch === "").map(province => (
                        <button
                          key={province.name}
                          onClick={() => { setSelectedDestination(province.name); setDestinationSearch(""); setDestinationDropdown(false); }}
                          className="w-full px-4 py-3 text-right hover:bg-orange-50 flex items-center justify-between"
                        >
                          <span>{province.name}</span>
                          <span>{province.icon}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative flex-1 min-w-[160px]">
                  <div className="text-xs md:text-sm text-gray-900 font-bold mb-1 md:mb-2 text-right">تاریخ ورود</div>
                  <div onClick={() => setDateDropdown(!dateDropdown)} className="w-full px-4 py-3 border border-gray-400 rounded-lg cursor-pointer flex items-center justify-between font-bold text-gray-900">
                    <span className="text-gray-500">انتخاب تاریخ</span>
                    <Calendar className="h-5 text-gray-400" />
                  </div>
                  {dateDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 p-4 space-y-3">
                      <div>
                        <label className="text-sm text-gray-700 mb-2 block text-right font-medium">تاریخ ورود</label>
                        <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-right" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-700 mb-2 block text-right font-medium">تاریخ خروج</label>
                        <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-right" />
                      </div>
                      <button onClick={() => setDateDropdown(false)} className="w-full py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600">تایید</button>
                    </div>
                  )}
                </div>

                <div className="relative flex-1 min-w-[140px]">
                  <div className="text-xs md:text-sm text-gray-900 font-bold mb-1 md:mb-2 text-right">مسافران و اتاق</div>
                  <Users className="absolute left-3 top-10 h-5 text-gray-400 pointer-events-none" />
                  <select value={passengers} onChange={(e) => setPassengers(e.target.value)} className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 text-right pr-10 font-bold text-gray-900">
                    <option value="1 بزرگسال، 1 اتاق">1 بزرگسال، 1 اتاق</option>
                    <option value="2 بزرگسال، 1 اتاق">2 بزرگسال، 1 اتاق</option>
                    <option value="2 بزرگسال، 2 اتاق">2 بزرگسال، 2 اتاق</option>
                    <option value="خانواده">خانواده</option>
                  </select>
                </div>

                <button onClick={handleSearch} className="px-8 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 mt-6 md:mt-7 shadow-md whitespace-nowrap">
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
              <h2 className="text-xl font-bold text-gray-900">هتل‌های محبوب {city}</h2>
              <Link href={`/search-results?type=hotel&destination=${city}`} className="text-orange-500 font-medium hover:underline">
                مشاهده همه هتل‌ها
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hotels.map((hotel, index) => (
                <Link key={index} href={`/search-results?type=hotel&destination=${city}&hotel=${hotel.name}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                    <div className="h-32 md:h-40 overflow-hidden">
                      <Image src={hotel.image} alt={hotel.name} width={400} height={160} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">{hotel.name}</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(hotel.stars)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        ))}
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
                  <a href="#" className="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-medium rounded-lg hover:bg-gray-100">
                    <span>🍎</span>
                    <span>دانلود iOS</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-medium rounded-lg hover:bg-gray-100">
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

        {/* Trust Features */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm text-right">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-blue-500" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">معتمدترین عرضه‌کننده</h3>
              <p className="text-gray-600 text-sm">ارائه خدمات گردشگری با کیفیت و قابل اعتماد</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-right">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <HotelIcon className="h-7 w-7 text-green-500" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">تمام هتل‌های داخلی و خارجی</h3>
              <p className="text-gray-600 text-sm">کامل‌ترین سایت رزرو هتل‌های داخلی و خارجی</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-right">
              <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-purple-500" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">دسترسی آسان، هر زمان</h3>
              <p className="text-gray-600 text-sm">جستجو، خرید و استرداد از طریق وب‌سایت و اپلیکیشن</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
