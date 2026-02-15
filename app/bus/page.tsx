"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Clock, Star, Calendar, ChevronDown, Bus as BusIcon, ChevronUp, ChevronDown as ChevronDownIcon } from "lucide-react";

interface Bus {
  _id: string;
  operatorName: string;
  operatorPhone: string;
  busType: "luxury" | "standard" | "economy";
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: Date;
  price: number;
  totalSeats: number;
  availableSeats: number;
  rating?: number;
  amenities: string[];
  image?: string;
}

const provinces = [
  { name: "کابل", icon: "🏛️" },
  { name: "کندهار", icon: "🏜️" },
  { name: "هرات", icon: "🌆" },
  { name: "بلخ", icon: "🕌" },
  { name: "مزار شریف", icon: "🕌" },
  { name: "ننگرهار", icon: "⛰️" },
  { name: "لغمان", icon: "🌲" },
  { name: "پیشاور", icon: "🏘️" },
  { name: "بامیان", icon: "❄️" },
  { name: "غزنی", icon: "🏔️" },
  { name: "جلال‌آباد", icon: "🌳" },
];

// Bus images from assets/bus folder (fallback to placeholder)
const busImages = [
  "/assets/bus/bus1.webp",
  "/assets/bus/bus2.webp",
  "/assets/bus/bus3.webp",
];

const mockBuses: Bus[] = [
  {
    _id: "1",
    operatorName: "اتوبوس کابل",
    operatorPhone: "+93 700 123 456",
    busType: "luxury",
    from: "کابل",
    to: "مزار شریف",
    departureTime: "08:00",
    arrivalTime: "14:30",
    departureDate: new Date(),
    price: 25,
    totalSeats: 50,
    availableSeats: 15,
    rating: 4.7,
    amenities: ["تهویه مطبوع", "وای فای", "هدست"],
    image: busImages[0],
  },
  {
    _id: "2",
    operatorName: "اتوبوس هرات",
    operatorPhone: "+93 700 234 567",
    busType: "standard",
    from: "کابل",
    to: "هرات",
    departureTime: "09:00",
    arrivalTime: "18:00",
    departureDate: new Date(),
    price: 35,
    totalSeats: 45,
    availableSeats: 10,
    rating: 4.5,
    amenities: ["تهویه مطبوع", "وای فای"],
    image: busImages[1],
  },
  {
    _id: "3",
    operatorName: "اتوبوس قندهار",
    operatorPhone: "+93 700 345 678",
    busType: "economy",
    from: "کابل",
    to: "قندهار",
    departureTime: "07:00",
    arrivalTime: "16:00",
    departureDate: new Date(),
    price: 20,
    totalSeats: 60,
    availableSeats: 25,
    rating: 4.3,
    amenities: ["تهویه مطبوع"],
    image: busImages[2],
  },
];

export default function BusPage() {
  const [buses, setBuses] = useState<Bus[]>(mockBuses);
  const [loading, setLoading] = useState(true);
  const [originDropdown, setOriginDropdown] = useState(false);
  const [destinationDropdown, setDestinationDropdown] = useState(false);
  const [originSearch, setOriginSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch("/api/buses");
        const data = await response.json();
        if (data.success && data.buses?.length > 0) {
          setBuses(
            data.buses.map((b: any, i: number) => ({
              ...b,
              image: b.image || busImages[i % busImages.length],
            }))
          );
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchBuses();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedOrigin) params.set("from", selectedOrigin);
    if (selectedDestination) params.set("to", selectedDestination);
    if (departureDate) params.set("date", departureDate);
    window.location.href = `/search-results?type=bus&${params.toString()}`;
  };

  const getBusTypeLabel = (type: string) =>
    ({ luxury: "لوکس", standard: "استاندارد", economy: "اقتصادی" }[type] || type);

  const faqs = [
    { q: "آیا خرید بلیط اتوبوس برای کودکان زیر ۲ سال الزامی است؟", a: "قیمت بلیط اتوبوس برای کودکان زیر دو سال، در صورتی که صندلی به آن‌ها تعلق نگیرد رایگان است. در صورت نیاز به صندلی، هزینه کامل بلیط پرداخت می‌شود." },
    { q: "نحوه رزرو بلیط اتوبوس در افغانی‌بابا چگونه است؟", a: "مبدا، مقصد، تاریخ حرکت و تعداد بلیط را انتخاب می‌کنید. سپس بلیط‌های موجود را می‌بینید و با کارت بانکی بلیط را می‌خرید." },
    { q: "آیا بعد از خرید بلیط اتوبوس امکان تعویض صندلی وجود دارد؟", a: "خیر. بعد از خرید بلیط اتوبوس، امکان تعویض صندلی وجود ندارد." },
    { q: "استرداد بلیط اتوبوس چگونه است؟", a: "وارد حساب کاربری شوید، از بخش سفارشات و استردادها، سفارش را انتخاب و گزینه استرداد را بزنید. مبلغ طبق قوانین به حساب شما برمی‌گردد." },
    { q: "میزان بار مجاز هر مسافر چقدر است؟", a: "میزان بار مجاز معمولاً ۲۰ کیلوگرم است. برخی شرکت‌ها با دریافت هزینه تا ۴۰ کیلوگرم هم ارائه می‌دهند." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: "rtl" }}>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Search Form inside overlay, like Home Page */}
        <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/assets/bus/hero.webp'), url('/assets/home-page.webp')` }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <div className="text-center text-white mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">بلیط اتوبوس</h1>
              <p className="text-white/90">رزرو سریع و مقایسه قیمت همه شهرها</p>
            </div>
            {/* Search Form - same style as home page */}
            <div className="container mx-auto px-3 sm:px-4 w-full max-w-3xl">
              <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-3 sm:p-4 md:p-6 lg:p-8 overflow-hidden shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-end gap-3 sm:gap-4 md:gap-6">
                  <div className="relative w-full lg:flex-1 lg:min-w-0">
                    <label className="block text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">مبدا (شهر، پایانه)</label>

                  <input
                    type="text"
                    placeholder="شهر یا پایانه"
                    value={selectedOrigin || originSearch}
                    onChange={(e) => {
                      setOriginSearch(e.target.value);
                      setOriginDropdown(true);
                      if (!e.target.value) setSelectedOrigin("");
                    }}
                    onFocus={() => setOriginDropdown(true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right text-base min-h-[48px]"
                  />
                  <ChevronDown className="absolute left-3 top-[50%] -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  {originDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-[110] max-h-48 overflow-y-auto">
                      {provinces
                        .filter((p) => p.name.includes(originSearch) || !originSearch)
                        .map((p) => (
                          <button
                            key={p.name}
                            onClick={() => {
                              setSelectedOrigin(p.name);
                              setOriginSearch("");
                              setOriginDropdown(false);
                            }}
                            className="w-full px-4 py-3 min-h-[44px] text-right hover:bg-orange-50 flex items-center justify-between"
                          >
                            <span>{p.name}</span>
                            <span>{p.icon}</span>
                          </button>
                        ))}
                    </div>
                  )}
                </div>

                <div className="relative w-full lg:flex-1 lg:min-w-0">
                  <label className="block text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">مقصد (شهر، پایانه)</label>
                  <input
                    type="text"
                    placeholder="شهر یا پایانه"
                    value={selectedDestination || destinationSearch}
                    onChange={(e) => {
                      setDestinationSearch(e.target.value);
                      setDestinationDropdown(true);
                      if (!e.target.value) setSelectedDestination("");
                    }}
                    onFocus={() => setDestinationDropdown(true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right text-base min-h-[48px]"
                  />
                  <ChevronDown className="absolute left-3 top-[50%] -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  {destinationDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-[110] max-h-48 overflow-y-auto">
                      {provinces
                        .filter((p) => p.name.includes(destinationSearch) || !destinationSearch)
                        .map((p) => (
                          <button
                            key={p.name}
                            onClick={() => {
                              setSelectedDestination(p.name);
                              setDestinationSearch("");
                              setDestinationDropdown(false);
                            }}
                            className="w-full px-4 py-3 min-h-[44px] text-right hover:bg-orange-50 flex items-center justify-between"
                          >
                            <span>{p.name}</span>
                            <span>{p.icon}</span>
                          </button>
                        ))}
                    </div>
                  )}
                </div>

                <div className="relative w-full sm:col-span-2 lg:flex-1 lg:min-w-0">
                  <label className="block text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">تاریخ حرکت</label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-right text-base min-h-[48px]"
                  />
                </div>

                <button
                  onClick={handleSearch}
                  className="w-full sm:col-span-2 lg:w-auto lg:flex-shrink-0 px-6 md:px-8 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition shadow-md min-h-[48px]"
                >
                  جستجو
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bus list with images + seat selection */}
        <section className="container mx-auto px-3 sm:px-4 mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-right">اتوبوس‌های موجود</h2>
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-orange-500 border-t-transparent" />
            </div>
          ) : (
            <div className="space-y-6">
              {buses.map((bus) => (
                <div
                  key={bus._id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Bus image - from assets/bus folder */}
                    <div className="md:w-64 flex-shrink-0 relative h-48 md:h-auto md:min-h-[140px] bg-gray-100">
                      <img
                        src={bus.image || busImages[0]}
                        alt={bus.operatorName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='140' viewBox='0 0 256 140'%3E%3Crect fill='%23e5e7eb' width='256' height='140'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='14'%3E🚌%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div className="flex-1 p-4 md:p-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3 sm:gap-4">
                      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 order-2 sm:order-1">
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{bus.operatorName}</p>
                          <p className="text-sm text-gray-600">{getBusTypeLabel(bus.busType)}</p>
                          {bus.rating && (
                            <div className="flex items-center gap-1 mt-1 justify-end">
                              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                              <span className="text-sm font-medium">{bus.rating}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-right">
                          <span className="font-semibold">{bus.from}</span>
                          <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
                          <span className="font-semibold">{bus.to}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4 shrink-0" />
                            {bus.departureTime} - {bus.arrivalTime}
                          </span>
                          <span>{bus.availableSeats} صندلی خالی</span>
                        </div>
                      </div>
                      <div className="text-right sm:text-left order-1 sm:order-2 flex flex-col gap-2 sm:items-end">
                        <p className="text-xl sm:text-2xl font-bold text-orange-500">${bus.price}</p>
                        <p className="text-xs text-gray-500">به ازای هر نفر</p>
                        <Link
                          href={`/bus-booking/${bus._id}?date=${departureDate || new Date().toISOString().split("T")[0]}`}
                          className="inline-block w-full sm:w-auto text-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition min-h-[48px] flex items-center justify-center"
                        >
                          انتخاب صندلی
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* سایر خدمات افغانی‌بابا - like Alibaba */}
        <section className="container mx-auto px-3 sm:px-4 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-right">سایر خدمات افغانی‌بابا</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <Link href="#" className="border border-gray-200 rounded-xl p-6 hover:bg-orange-50 transition text-right">
              <h3 className="font-bold text-gray-900 mb-2">سفرکارت (سازمانی)</h3>
              <p className="text-sm text-gray-600">کارت سفر برای سازمان‌ها</p>
            </Link>
            <Link href="#" className="border border-gray-200 rounded-xl p-6 hover:bg-orange-50 transition text-right">
              <h3 className="font-bold text-gray-900 mb-2">سفر اقساطی</h3>
              <p className="text-sm text-gray-600">پرداخت اقساطی بلیط</p>
            </Link>
            <Link href="#" className="border border-gray-200 rounded-xl p-6 hover:bg-orange-50 transition text-right">
              <h3 className="font-bold text-gray-900 mb-2">ویزای سفر</h3>
              <p className="text-sm text-gray-600">اخذ ویزا برای سفر</p>
            </Link>
          </div>
        </section>

        {/* اپلیکیشن */}
        <section className="container mx-auto px-3 sm:px-4 mb-8 sm:mb-12">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-right flex-1 w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">اپلیکیشن افغانی‌بابا</h2>
              <p className="text-gray-600 mb-4">سریع‌تر و مطمئن‌تر به سفر بروید. مشاهده لینک‌های دانلود. قابلیت نصب روی Android و iOS.</p>
              <div className="flex gap-3">
                <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium">دانلود Android</span>
                <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium">دانلود iOS</span>
              </div>
            </div>
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">📱</div>
          </div>
        </section>

        {/* پرسش های شما - FAQ */}
        <section className="container mx-auto px-3 sm:px-4 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-right">پرسش های شما</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 flex items-center justify-between text-right hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-gray-600 text-right text-sm">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* بلیط اتوبوس - intro text */}
        <section className="container mx-auto px-3 sm:px-4 mb-8 sm:mb-12">
          <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-right">بلیط اتوبوس</h2>
            <p className="text-gray-600 text-right leading-relaxed">
              سفر با اتوبوس به دلیل پایین بودن هزینه و راحتی و امنیت بالا مورد استقبال مسافران است. با افغانی‌بابا دیگر نیازی نیست برای خرید بلیط اتوبوس به ترمینال مراجعه کنید. مبدا، مقصد و تاریخ حرکت را انتخاب کنید تا لیست اتوبوس‌های مختلف با قیمت و امکان انتخاب صندلی را ببینید.
            </p>
          </div>
        </section>

        {/* استرداد بلیط اتوبوس */}
        <section className="container mx-auto px-3 sm:px-4 mb-8 sm:mb-12">
          <div className="bg-orange-50 rounded-xl p-4 sm:p-6 md:p-8 border border-orange-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-right">استرداد بلیط اتوبوس</h2>
            <p className="text-gray-700 text-right">
              برای استرداد آنلاین بلیط اتوبوس وارد حساب کاربری شوید و از بخش «سفارشات و استردادها» سفارش را انتخاب کنید. پس از تکمیل مراحل، مبلغ طبق قوانین به حساب شما برمی‌گردد.
            </p>
          </div>
        </section>

        {/* شرکت‌های اتوبوس‌رانی */}
        <section className="container mx-auto px-3 sm:px-4 mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-right">شرکت‌های اتوبوس‌رانی</h2>
          <p className="text-gray-600 text-right mb-4">شما می‌توانید بلیط اتوبوس را از شرکت‌های معتبر رزرو کنید.</p>
          <div className="flex flex-wrap gap-3">
            {["اتوبوس کابل", "اتوبوس هرات", "اتوبوس قندهار", "رویال سفر", "همسفر"].map((name) => (
              <span key={name} className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">{name}</span>
            ))}
          </div>
        </section>

        {/* City links - بلیط اتوبوس کابل به هرات */}
        <section className="container mx-auto px-3 sm:px-4 mb-10 sm:mb-16">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 text-right">جستجوی بلیط اتوبوس سراسر افغانستان</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            <Link href="/search-results?type=bus&from=کابل&to=هرات" className="text-gray-600 hover:text-orange-500 text-sm">بلیط اتوبوس کابل به هرات</Link>
            <Link href="/search-results?type=bus&from=هرات&to=کابل" className="text-gray-600 hover:text-orange-500 text-sm">بلیط اتوبوس هرات به کابل</Link>
            <Link href="/search-results?type=bus&from=کابل&to=مزار شریف" className="text-gray-600 hover:text-orange-500 text-sm">بلیط اتوبوس کابل به مزار شریف</Link>
            <Link href="/search-results?type=bus&from=مزار شریف&to=کابل" className="text-gray-600 hover:text-orange-500 text-sm">بلیط اتوبوس مزار به کابل</Link>
            <Link href="/search-results?type=bus&from=کابل&to=قندهار" className="text-gray-600 hover:text-orange-500 text-sm">بلیط اتوبوس کابل به قندهار</Link>
            <Link href="/search-results?type=bus&from=کابل&to=بامیان" className="text-gray-600 hover:text-orange-500 text-sm">بلیط اتوبوس کابل به بامیان</Link>
            <Link href="/search-results?type=bus&from=کابل&to=جلال‌آباد" className="text-gray-600 hover:text-orange-500 text-sm">بلیط اتوبوس کابل به جلال‌آباد</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
