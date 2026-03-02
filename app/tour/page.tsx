"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, Users, ChevronDown, ArrowRightLeft, Star, Phone, Clock, Shield, Headphones, Compass } from "lucide-react";
import { formatDualDate } from "@/lib/date-utils";
import DatePicker, { DateObject } from "react-multi-date-picker";

const provinces = [
  { name: "کابل", icon: "🏛️" },
  { name: "کندهار", icon: "🏜️" },
  { name: "هرات", icon: "🌆" },
  { name: "بلخ", icon: "🕌" },
  { name: "ننگرهار", icon: "⛰️" },
  { name: "بامیان", icon: "❄️" },
  { name: "مزار شریف", icon: "🕌" },
  { name: "جلال‌آباد", icon: "🌳" },
];

const destinations = [
  { name: "کابل", image: "/assets/tour5.jpg" },
  { name: "هرات", image: "/assets/tour2.jpg" },
  { name: "مزار شریف", image: "/assets/tour3.jpg" },
  { name: "بامیان", image: "/assets/tour1.jpg" },
  { name: "قندهار", image: "/assets/tour4.jpg" },
  { name: "غزنی", image: "/assets/tour6.jpg" },
];

const tourCategories = [
  { id: "all", label: "همه" },
  { id: "domestic", label: "تور داخلی" },
  { id: "nowruz_domestic", label: "تور داخلی نوروز" },
  { id: "taxi", label: "تور تاکسی" },
  { id: "oneday", label: "تور یک روزه" },
  { id: "exhibition", label: "تور نمایشگاه و رویداد" },
];

interface Tour {
  id?: number;
  _id?: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  priceUSD: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  city: string;
}

const tours: Tour[] = [
  {
    id: 1,
    title: "تور بامیان ۳ روزه",
    description: "بازدید از بت‌های باستانی و دریاچه‌های بامیان",
    duration: "۳ روز - هتل ۴ ستاره",
    price: 250,
    priceUSD: 180,
    image: "/assets/bamyan-tour.jpg",
    category: "domestic",
    rating: 4.8,
    reviews: 124,
    city: "بامیان",
  },
  {
    id: 2,
    title: "تور هرات ۴ روزه",
    description: "قلعه هرات، مسجد شمس‌الائمه و بازار قدیم",
    duration: "۴ روز - هتل ۴ ستاره",
    price: 320,
    priceUSD: 230,
    image: "/assets/heart-tour.jpg",
    category: "domestic",
    rating: 4.6,
    reviews: 89,
    city: "هرات",
  },
  {
    id: 3,
    title: "تور مزار شریف ۲ روزه",
    description: "زیارت آرامگاه Imam علی (ع) و بازار شهر",
    duration: "۲ روز - هتل ۳ ستاره",
    price: 180,
    priceUSD: 130,
    image: "/assets/mazar-tour.jpg",
    category: "domestic",
    rating: 4.7,
    reviews: 198,
    city: "مزار شریف",
  },
  {
    id: 4,
    title: "تور قندهار ۳ روزه",
    description: "اماکن تاریخی و بازار سنتی قندهار",
    duration: "۳ روز - هتل ۳ ستاره",
    price: 200,
    priceUSD: 145,
    image: "/assets/kandahar-tour.jpg",
    category: "domestic",
    rating: 4.4,
    reviews: 52,
    city: "قندهار",
  },
  {
    id: 5,
    title: "تور یک روزه کابل",
    description: "بازدید از موزه ملی، ارگ و بازار",
    duration: "۱ روز - بدون پرواز",
    price: 80,
    priceUSD: 55,
    image: "/assets/kabul-tour.jpg",
    category: "oneday",
    rating: 4.5,
    reviews: 67,
    city: "کابل",
  },
  {
    id: 6,
    title: "تور غزنی ۲ روزه",
    description: "بازدید از مناره‌های باستانی و اماکن تاریخی غزنی",
    duration: "۲ روز - هتل ۳ ستاره",
    price: 150,
    priceUSD: 110,
    image: "/assets/ghazni-tour.jpg",
    category: "domestic",
    rating: 4.5,
    reviews: 45,
    city: "غزنی",
  },
  {
    id: 7,
    title: "تور پنجشیر ۳ روزه",
    description: "کوه‌های زیبا، طبیعت سبز و دریاچه سیاه‌رود",
    duration: "۳ روز - هتل ۳ ستاره",
    price: 220,
    priceUSD: 160,
    image: "/assets/panjshir-tour.jpg",
    category: "domestic",
    rating: 4.7,
    reviews: 78,
    city: "پنجشیر",
  },
  {
    id: 8,
    title: "تور تخار ۲ روزه",
    description: "بازدید از طبیعت زیبای شمال و چشمه‌های طبیعی",
    duration: "۲ روز - هتل ۳ ستاره",
    price: 170,
    priceUSD: 125,
    image: "/assets/tour1.jpg",
    category: "domestic",
    rating: 4.3,
    reviews: 36,
    city: "تخار",
  },
  {
    id: 9,
    title: "تاکسی شهری کابل",
    description: "گشت‌وگذار در پایتخت با راهنمای مجرب",
    duration: "۱ روز - تاکسی اختصاصی",
    price: 50,
    priceUSD: 35,
    image: "/assets/kabul-hero.jpg",
    category: "taxi",
    rating: 4.6,
    reviews: 89,
    city: "کابل",
  },
  {
    id: 10,
    title: "تاکسی بامیان",
    description: "ترانسفر اختصاصی به تمام نقاط دیدنی بامیان",
    duration: "۱ روز - تاکسی اختصاصی",
    price: 80,
    priceUSD: 55,
    image: "/assets/bamyan-tour.jpg",
    category: "taxi",
    rating: 4.8,
    reviews: 124,
    city: "بامیان",
  },
  {
    id: 11,
    title: "تاکسی مزار شریف",
    description: "ایاب و ذهاب راحت در شهر مزار و اطراف",
    duration: "۱ روز - تاکسی اختصاصی",
    price: 60,
    priceUSD: 42,
    image: "/assets/mazar-hero.jpg",
    category: "taxi",
    rating: 4.7,
    reviews: 156,
    city: "مزار شریف",
  },
  {
    id: 12,
    title: "تاکسی هرات",
    description: "بازدید از اماکن تاریخی هرات با تاکسی لوکس",
    duration: "۱ روز - تاکسی اختصاصی",
    price: 70,
    priceUSD: 48,
    image: "/assets/herat-hero.jpg",
    category: "taxi",
    rating: 4.5,
    reviews: 92,
    city: "هرات",
  },
  {
    id: 13,
    title: "جشنواره بهار بامیان",
    description: "موسیقی محلی، رقص سنتی و غذاهای محلی بامیان",
    duration: "۲ روز - هتل ۴ ستاره",
    price: 180,
    priceUSD: 130,
    image: "/assets/tour2.jpg",
    category: "exhibition",
    rating: 4.9,
    reviews: 210,
    city: "بامیان",
  },
  {
    id: 14,
    title: "نمایشگاه صنایع دستی کابل",
    description: "صنایع دستی اصیل افغانی در قلب پایتخت",
    duration: "۱ روز - بدون اقامت",
    price: 30,
    priceUSD: 20,
    image: "/assets/tour4.jpg",
    category: "exhibition",
    rating: 4.6,
    reviews: 145,
    city: "کابل",
  },
  {
    id: 15,
    title: "مراسم نوروز در مزار شریف",
    description: "شرکت در جشن میله گل سرخ و برافراشتن جنده سخی",
    duration: "۲ روز - هتل ۳ ستاره",
    price: 120,
    priceUSD: 85,
    image: "/assets/tour3.jpg",
    category: "exhibition",
    rating: 4.8,
    reviews: 89,
    city: "مزار شریف",
  },
  {
    id: 16,
    title: "جشنواره موسیقی در هرات",
    description: "اجرای زنده موسیقی دوتار و هنرمندان هراتی",
    duration: "۱ روز - بدون اقامت",
    price: 25,
    priceUSD: 18,
    image: "/assets/tour6.jpg",
    category: "exhibition",
    rating: 4.7,
    reviews: 178,
    city: "هرات",
  },
  {
    id: 17,
    title: "نمایشگاه کتاب کابل",
    description: "گردهمایی ناشران و نویسندگان برتر در پایتخت",
    duration: "۱ روز - بدون اقامت",
    price: 20,
    priceUSD: 15,
    image: "/assets/tour5.jpg",
    category: "exhibition",
    rating: 4.5,
    reviews: 92,
    city: "کابل",
  },
  {
    id: 18,
    title: "مسابقه بزکشی بامیان",
    description: "شور و هیجان ورزش باستانی بزکشی در دشت‌های سبز",
    duration: "۱ روز - تماشای ویژه",
    price: 45,
    priceUSD: 32,
    image: "/assets/tour1.jpg",
    category: "exhibition",
    rating: 4.6,
    reviews: 67,
    city: "بامیان",
  },
];

const popularRoutes = [
  { name: "کابل", count: 24 },
  { name: "بامیان", count: 18 },
  { name: "هرات", count: 15 },
  { name: "مزار شریف", count: 22 },
  { name: "قندهار", count: 12 },
  { name: "غزنی", count: 10 },
  { name: "پنجشیر", count: 8 },
  { name: "تخار", count: 6 },
];

export default function ToursPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [originDropdown, setOriginDropdown] = useState(false);
  const [destinationDropdown, setDestinationDropdown] = useState(false);
  const [dateDropdown, setDateDropdown] = useState(false);
  const [originSearch, setOriginSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [passengers, setPassengers] = useState("1 Passenger");
  const [dynamicTours, setDynamicTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch tours from API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('/api/tours');
        const data = await response.json();
        if (data.success && data.tours.length > 0) {
          setDynamicTours(data.tours);
        } else {
          // Fallback to hardcoded tours if no data
          setDynamicTours(tours);
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
        // Fallback to hardcoded tours on error
        setDynamicTours(tours);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const handleSwapCities = () => {
    const temp = selectedOrigin;
    setSelectedOrigin(selectedDestination);
    setSelectedDestination(temp);
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    searchParams.set('origin', selectedOrigin);
    searchParams.set('destination', selectedDestination);
    searchParams.set('departure', departureDate);
    searchParams.set('passengers', passengers);
    searchParams.set('type', 'tour');
    window.location.href = `/search-results?${searchParams.toString()}`;
  };

  const allTours = dynamicTours.length > 0 ? dynamicTours : tours;
  const filteredTours = activeCategory === "all"
    ? allTours
    : allTours.filter(tour => tour.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: 'rtl' }}>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Image - Same as Home */}
        <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://res.cloudinary.com/dwmxdyvd2/image/upload/v1772226653/tourimg_fkfaay.webp')` }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="container mx-auto px-4 pt-20 relative z-10">
          </div>
        </div>

        {/* Search Card */}
        <div className="container mx-auto px-4 -mt-16 md:-mt-20 lg:-mt-24 relative z-20 mb-12 md:mb-16">
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 md:p-6 lg:p-8">
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-between gap-2 flex-wrap lg:flex-nowrap">
                <div className="relative flex-1 min-w-[180px]">
                  <div className="text-xs md:text-sm text-gray-900 font-bold mb-1 md:mb-2 text-right">مبدا</div>
                  <input
                    type="text"
                    placeholder="Origin"
                    value={selectedOrigin || originSearch}
                    onChange={(e) => {
                      setOriginSearch(e.target.value);
                      setOriginDropdown(true);
                      if (!e.target.value) setSelectedOrigin("");
                    }}
                    onFocus={() => setOriginDropdown(true)}
                    className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 text-right font-bold text-gray-900 placeholder:text-gray-400"
                  />
                  <ChevronDown className="absolute left-3 top-10 h-5 text-gray-400 pointer-events-none" />
                  {originDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                      {provinces.filter(p => p.name.includes(originSearch) || originSearch === "").map(province => (
                        <button
                          key={province.name}
                          onClick={() => { setSelectedOrigin(province.name); setOriginSearch(""); setOriginDropdown(false); }}
                          className="w-full px-4 py-3 text-right hover:bg-orange-50 flex items-center justify-between"
                        >
                          <span>{province.name}</span>
                          <span>{province.icon}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button onClick={handleSwapCities} className="p-2.5 rounded-full bg-orange-500 hover:bg-orange-600 mt-6 md:mt-7 shadow-md">
                  <ArrowRightLeft className="h-4 w-4 text-white" />
                </button>

                <div className="relative flex-1 min-w-[180px]">
                  <div className="text-xs md:text-sm text-gray-900 font-bold mb-1 md:mb-2 text-right">مقصد</div>
                  <input
                    type="text"
                    placeholder="Destination"
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
                  <div className="text-xs md:text-sm text-gray-900 font-bold mb-1 md:mb-2 text-right">تاریخ</div>
                  <div onClick={() => setDateDropdown(!dateDropdown)} className="w-full px-4 py-3 border border-gray-400 rounded-lg cursor-pointer flex items-center justify-between hover:bg-gray-50 transition">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                    <span className="font-bold text-gray-900">{departureDate || 'Select Date'}</span>
                  </div>
                  {dateDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 p-4 space-y-3">
                      <div>
                        <label className="text-sm text-gray-700 mb-2 block text-right font-medium">تاریخ</label>
                        <DatePicker
                          value={departureDate}
                          onChange={(date: any) => {
                            const dateStr = date instanceof DateObject ? date.format("YYYY-MM-DD") : (date ? new Date(date).toISOString().split('T')[0] : "");
                            setDepartureDate(dateStr);
                          }}
                          calendarPosition="bottom-right"
                          fixMainPosition
                          render={(value, openCalendar) => (
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-right text-sm text-gray-900 cursor-pointer flex items-center justify-between" onClick={openCalendar}>
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                              <span className="font-bold">{departureDate || "Select Date"}</span>
                            </div>
                          )}
                        />
                      </div>
                      <button onClick={() => setDateDropdown(false)} className="w-full py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition">تایید</button>
                    </div>
                  )}
                </div>

                <div className="relative flex-1 min-w-[140px]">
                  <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">مسافران</div>
                  <Users className="absolute left-3 top-10 h-5 text-gray-400 pointer-events-none" />
                  <select value={passengers} onChange={(e) => setPassengers(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-right pr-10">
                    <option value="1 Passenger">1 مسافر</option>
                    <option value="2 Passengers">2 مسافر</option>
                    <option value="3 Passengers">3 مسافر</option>
                    <option value="4 Passengers">4 مسافر</option>
                  </select>
                </div>

                <button onClick={handleSearch} className="px-8 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 mt-6 md:mt-7 shadow-md whitespace-nowrap">
                  جستجو
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Best Tour Destinations Section */}
        <section className="container mx-auto px-4 mb-12 md:mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">بهترین مقاصد گردشگری</h2>
            <p className="text-gray-600">بهترین مقاصد گردشگری برای سفری فراموش‌نشدنی و لذت‌بخش</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {destinations.map((city, index) => (
              <Link
                key={index}
                href={`/search-results?type=tour&destination=${city.name}`}
                className="group"
              >
                <div className="relative rounded-xl overflow-hidden mb-3">
                  <Image
                    src={city.image}
                    alt={city.name}
                    width={400}
                    height={160}
                    className="w-full h-32 md:h-40 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                </div>
                <p className="text-center font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">{city.name}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Category Filter Tabs Section */}
        <section className="container mx-auto px-4 mb-8">
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex gap-2 md:gap-4 min-w-max pb-1">
              {tourCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-3 text-sm md:text-base font-medium whitespace-nowrap transition-colors relative ${activeCategory === category.id
                    ? 'text-orange-500'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {category.label}
                  {activeCategory === category.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tour Cards Listing Section */}
        <section className="container mx-auto px-4 mb-12">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTours.map((tour, index) => (
                <Link key={tour._id || tour.id || index} href={`/tour/${tour._id || tour.id || index + 1}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 text-right">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">{tour.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tour.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <Clock className="h-3 w-3" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-semibold">{tour.rating}</span>
                          <span className="text-xs text-gray-400">({tour.reviews})</span>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500">از</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-orange-500">{tour.price.toLocaleString()}</span>
                          <span className="text-xs text-gray-600">افغانی</span>
                        </div>
                        <span className="text-xs text-gray-400">(${tour.priceUSD})</span>
                      </div>
                      <div className="mt-3 text-center text-sm font-medium text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        مشاهده جزئیات ←
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* View All Tours CTA */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center">
            <button className="px-10 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              مشاهده همه تورهای انتخابی
            </button>
          </div>
        </section>

        {/* Mobile App Download Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-3 gap-8 p-8 md:p-12 items-center">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <Image src="/assets/Home-page/home-card-5.png" alt="QR Code" width={160} height={160} className="w-32 h-32 md:w-40 md:h-40 mx-auto" />
                  <p className="text-sm text-gray-600 mt-3">کد را اسکن کنید</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">اپلیکیشن افغانی‌بابا</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  سریع‌تر و مطمئن‌تر به سفر بروید. اپلیکیشن افغانی‌بابا را دانلود کنید و از تمام خدمات سفر در هر جای و هر زمان استفاده کنید.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/mobile-app" className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition justify-center">
                    <span>🍎</span>
                    <span>دانلود iOS</span>
                  </a>
                  <a href="/mobile-app/android" className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition justify-center">
                    <span>🤖</span>
                    <span>دانلود Android</span>
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image src="/assets/Home-page/home-card-4.webp" alt="Mobile App" width={160} height={224} className="w-36 h-52 md:w-40 md:h-56 object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Informational Tourism Content Section */}
        <section className="bg-gray-50 py-12 md:py-16 mb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">سفر با تورهای راهنما دار افغانی‌بابا</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed text-right">
              <p>
                سفر با تورهای راهنما دار یکی از بهترین راه‌ها برای تجربه سفری امن و لذت‌بخش است. با انتخاب تورهای organized، شما از تجربه و دانش محلی راهنمایان حرفه‌ای بهره‌مند می‌شوید و می‌توانید با خیال راحت از جاذبه‌های گردشگری لذت ببرید.
              </p>
              <p>
                افغانی‌بابا بهترین تورهای داخلی و خارجی را با بهترین قیمت‌ها ارائه می‌دهد. از تورهای داخلی مانند بامیان، هرات، مزار شریف و قندهار تا تورهای خارجی مانند ترکیه، دبی و امارات، همه با بهترین کیفیت و خدمات.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                  <div className="text-3xl mb-2">🛡️</div>
                  <h3 className="font-bold text-gray-900 mb-1">ایمنی</h3>
                  <p className="text-sm text-gray-600">سفر امن با برنامه‌ریزی دقیق</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                  <div className="text-3xl mb-2">📋</div>
                  <h3 className="font-bold text-gray-900 mb-1">برنامه‌ریزی</h3>
                  <p className="text-sm text-gray-600">سفر بدون دردسر و نگرانی</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                  <div className="text-3xl mb-2">💡</div>
                  <h3 className="font-bold text-gray-900 mb-1">دانش محلی</h3>
                  <p className="text-sm text-gray-600">آشنایی با فرهنگ و تاریخ</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Routes Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-right">مسیرهای پرطرفدار</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {popularRoutes.map((route, index) => (
                <Link
                  key={index}
                  href={`/search-results?type=tour&destination=${route.name}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 transition group"
                >
                  <span className="text-gray-700 group-hover:text-orange-500 transition-colors">{route.name}</span>
                  <span className="text-xs text-gray-400">({route.count} تور)</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Service Features Section */}
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
                <Compass className="h-7 w-7 text-green-500" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">خدمات کامل سفر</h3>
              <p className="text-gray-600 text-sm">پرواز، هتل، حمل‌ونقل و تورهای گردشگری</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-right">
              <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <Headphones className="h-7 w-7 text-purple-500" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">پشتیبانی ۲۴ ساعته</h3>
              <p className="text-gray-600 text-sm">راهنمایی و کمک در تمام مراحل سفر</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
