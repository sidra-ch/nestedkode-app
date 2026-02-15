"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TaxiForm from "@/components/search/TaxiForm";
import { Calendar, Users, Shield, Headphones, TrendingUp, Plane, Hotel, Bus, Compass, Car, ChevronDown, ArrowRightLeft, ChevronUp } from "lucide-react";

type TabKey = "پرواز داخلی" | "پرواز خارجی" | "اتوبوس" | "هتل" | "تاکسی" | "تور";

// Afghanistan Provinces
const provinces = [
  { name: "کابل", icon: "🏛️" },
  { name: "کندهار", icon: "🏜️" },
  { name: "هرات", icon: "🌆" },
  { name: "بلخ", icon: "🕌" },
  { name: "ننگرهار", icon: "⛰️" },
  { name: "لغمان", icon: "🌲" },
  { name: "پیشاور", icon: "🏘️" },
  { name: "بامیان", icon: "❄️" },
  { name: "غزنی", icon: "🏔️" },
  { name: "زابل", icon: "🌅" },
  { name: "ارزگان", icon: "🏜️" },
  { name: "یکاولنگ", icon: "⛰️" },
  { name: "جوزجان", icon: "🌾" },
  { name: "سمنگان", icon: "🌻" },
  { name: "بلک آب", icon: "💧" },
  { name: "فاریاب", icon: "🌄" },
  { name: "فراه", icon: "🏜️" },
  { name: "ہلمند", icon: "🌊" },
  { name: "نیمروز", icon: "☀️" },
  { name: "اوروزگان", icon: "🌆" },
  { name: "خوست", icon: "⛰️" },
  { name: "پکتیا", icon: "🏔️" },
  { name: "پکتیکا", icon: "⛏️" },
  { name: "لوگر", icon: "🌲" },
  { name: "وارداک", icon: "🏞️" },
  { name: "کاپیسا", icon: "⛰️" },
  { name: "پنجشیر", icon: "🗻" },
  { name: "نورستان", icon: "🌲" },
  { name: "کنر", icon: "💧" },
  { name: "لاغمان", icon: "🌊" },
  { name: "سری پل", icon: "🌾" },
  { name: "ستار تھال", icon: "🏜️" },
  { name: "بدخشان", icon: "🏔️" },
  { name: "تخار", icon: "🌄" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("پرواز داخلی");
  const [tripType, setTripType] = useState<"یک طرفه" | "رفت و برگشت">("رفت و برگشت");
  const [originDropdown, setOriginDropdown] = useState(false);
  const [destinationDropdown, setDestinationDropdown] = useState(false);
  const [dateDropdown, setDateDropdown] = useState(false);
  const [originSearch, setOriginSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1 Passenger");
  const [openFaq, setOpenFaq] = useState<number | null>(null);


  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    searchParams.set('origin', selectedOrigin);
    searchParams.set('destination', selectedDestination);
    searchParams.set('departure', departureDate);
    searchParams.set('return', returnDate);
    searchParams.set('passengers', passengers);
    searchParams.set('trip', tripType);
    window.location.href = `/search-results?${searchParams.toString()}`;
  };

  const handleSwapCities = () => {
    const temp = selectedOrigin;
    setSelectedOrigin(selectedDestination);
    setSelectedDestination(temp);
  };

  // Removed unused variables: tabs and faqs
  /* const tabs: TabKey[] = ["پرواز داخلی", "پرواز خارجی", "اتوبوس", "هتل", "تاکسی", "تور"]; */

  /* const faqs = [
    { q: "چند روز قبل از پرواز بلیط هواپیما بخریم؟", a: "بهترین زمان برای خرید بلیط هواپیما معمولاً 2 تا 3 هفته قبل از سفر است." },
    { q: "در هر پرواز میزان بار مجاز چقدر است؟", a: "میزان بار مجاز بسته به ایرلاین متفاوت است. معمولاً 20 تا 30 کیلوگرم مجاز است." },
    { q: "نرخ بلیط برای نوزادان و کودکان چگونه است؟", a: "نوزادان (زیر 2 سال) معمولاً بدون صندلی و با 10% قیمت بزرگسالان سفر می‌کنند." },
    { q: "رزرو آنلاین هزینه بیشتری از خرید حضوری دارد؟", a: "خیر، رزرو آنلاین معمولاً هزینه کمتری دارد و امکان مقایسه قیمت‌ها فراهم است." },
    { q: "آیا پس از خرید اینترنتی امکان استرداد وجود دارد؟", a: "بله، بسته به قوانین ایرلاین امکان استرداد با کسر جریمه وجود دارد." },
    { q: "هنگام رزرو آنلاین امکان انتخاب صندلی هست؟", a: "بله، در بسیاری از ایرلاین‌ها امکان انتخاب صندلی هنگام خرید وجود دارد." },
  ]; */

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: 'rtl' }}>
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/assets/home-page.webp')` }}
          />
          <div className="absolute inset-0 bg-white/60" />
          <div className="container mx-auto px-4 pt-20 relative z-10">
          </div>
        </div>

        {/* Search Card */}
        <div className="container mx-auto px-4 -mt-16 md:-mt-20 lg:-mt-24 relative z-20 mb-12 md:mb-16">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 md:p-6 lg:p-8">
            {/* Tabs with Icons */}
            <div className="flex gap-4 align-center  justify-between -md:gap-6 lg:gap-8 border-b border-gray-800 mb-4 md:mb-6 overflow-x-auto">
              {[
                { key: "پرواز داخلی", icon: Plane },
                { key: "پرواز خارجی", icon: Plane },
                { key: "اتوبوس", icon: Bus },
                { key: "هتل", icon: Hotel },
                { key: "تاکسی", icon: Car },
                { key: "تور", icon: Compass },
              ].map(({ key, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as TabKey)}
                  className={`pb-3 md:pb-4 flex items-center gap-2 transition-all whitespace-nowrap ${
                    activeTab === key
                      ? 'border-b-2 border-orange-500 text-orange-500 font-bold text-lg md:text-xl'
                      : 'text-gray-800 hover:text-gray-800 font-bold text-lg md:text-xl'
                  }`}
                >
                  <Icon className="h-6 w-6 md:h-6 md:w-6" />
                  {key}
                </button>
              ))}
            </div>

            {/* Search Form */}
            {activeTab === "تاکسی" || activeTab === "تور" ? (
              activeTab === "تاکسی" ? <TaxiForm /> : <div className="text-center text-gray-500 py-8">فرم تور در حال توسعه است</div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {(activeTab === "پرواز داخلی" || activeTab === "پرواز خارجی") && (
                  <div className="flex gap-4 md:gap-6 text-right">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tripType"
                        checked={tripType === "رفت و برگشت"}
                        onChange={() => setTripType("رفت و برگشت")}
                        className="w-4 h-4 text-orange-500 accent-orange-500"
                      />
                      <span className="text-sm md:text-base text-gray-700">رفت و برگشت</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tripType"
                        checked={tripType === "یک طرفه"}
                        onChange={() => setTripType("یک طرفه")}
                        className="w-4 h-4 text-orange-500 accent-orange-500"
                      />
                      <span className="text-sm md:text-base text-gray-700">یک طرفه</span>
                    </label>
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 flex-wrap lg:flex-nowrap">
                  {/* Origin City Dropdown */}
                  <div className="relative flex-1 min-w-[200px]">
                    <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">مبدا</div>
                    <input
                      type="text"
                      placeholder="Origin (city)"
                      value={selectedOrigin || originSearch}
                      onChange={(e) => {
                        setOriginSearch(e.target.value);
                        setOriginDropdown(true);
                        if (!e.target.value) {
                          setSelectedOrigin("");
                        }
                      }}
                      onFocus={() => setOriginDropdown(true)}
                      className="w-full px-4 py-3 md:py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right text-sm md:text-base text-gray-900 cursor-pointer"
                    />
                    <ChevronDown className="absolute left-3 top-10 md:top-11 h-4 w-4 md:h-5 md:w-5 text-gray-400 pointer-events-none" />
                    
                    {originDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 md:max-h-60 overflow-y-auto">
                        {provinces
                          .filter((p) =>
                            p.name.includes(originSearch) || originSearch === ""
                          )
                          .map((province) => (
                            <button
                              key={province.name}
                              onClick={() => {
                                setSelectedOrigin(province.name);
                                setOriginSearch("");
                                setOriginDropdown(false);
                              }}
                              className="w-full px-3 md:px-4 py-2.5 md:py-3 text-right text-sm md:text-base hover:bg-orange-50 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                            >
                              <span>{province.name}</span>
                              <span className="text-lg md:text-xl">{province.icon}</span>
                            </button>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Swap Icon */}
                  <button
                    onClick={handleSwapCities}
                    className="p-2.5 md:p-3 rounded-full bg-orange-500 hover:bg-orange-600 transition flex-shrink-0 mt-6 md:mt-7 xl:mt-8 shadow-md"
                  >
                    <ArrowRightLeft className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </button>

                  {/* Destination City Dropdown */}
                  <div className="relative flex-1 min-w-[200px]">
                    <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">مقصد</div>
                    <input
                      type="text"
                      placeholder="Destination (city)"
                      value={selectedDestination || destinationSearch}
                      onChange={(e) => {
                        setDestinationSearch(e.target.value);
                        setDestinationDropdown(true);
                        if (!e.target.value) {
                          setSelectedDestination("");
                        }
                      }}
                      onFocus={() => setDestinationDropdown(true)}
                      className="w-full px-4 py-3 md:py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right text-sm md:text-base text-gray-900 cursor-pointer"
                    />
                    <ChevronDown className="absolute left-3 top-10 md:top-11 h-4 w-4 md:h-5 md:w-5 text-gray-400 pointer-events-none" />
                    
                    {destinationDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 md:max-h-60 overflow-y-auto">
                        {provinces
                          .filter((p) =>
                            p.name.includes(destinationSearch) || destinationSearch === ""
                          )
                          .map((province) => (
                            <button
                              key={province.name}
                              onClick={() => {
                                setSelectedDestination(province.name);
                                setDestinationSearch("");
                                setDestinationDropdown(false);
                              }}
                              className="w-full px-3 md:px-4 py-2.5 md:py-3 text-right text-sm md:text-base hover:bg-orange-50 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                            >
                              <span>{province.name}</span>
                              <span className="text-lg md:text-xl">{province.icon}</span>
                            </button>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Date Selector - Mobile & Tablet: Combined, Large Desktop: Separate */}
                  <div className="relative flex-1 min-w-[180px] xl:hidden">
                    <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">تاریخ</div>
                    <div
                      onClick={() => setDateDropdown(!dateDropdown)}
                      className="w-full px-4 py-3 md:py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right text-sm md:text-base text-gray-900 cursor-pointer flex items-center justify-between"
                    >
                      <span className="text-gray-500">Move date</span>
                      <Calendar className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                    </div>
                    
                    {dateDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 space-y-3">
                        {/* Departure Date Block */}
                        <div className="p-3 border border-gray-200 rounded-lg">
                          <label className="text-xs md:text-sm text-gray-700 mb-2 block text-right font-medium">تاریخ رفت</label>
                          <input
                            type="date"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-right text-sm md:text-base text-gray-900 cursor-pointer"
                            onClick={(e) => e.currentTarget.showPicker?.()}
                          />
                        </div>
                        
                        {/* Return Date Block - Only show if round trip */}
                        {tripType === "رفت و برگشت" && (
                          <div className="p-3 border border-gray-200 rounded-lg">
                            <label className="text-xs md:text-sm text-gray-700 mb-2 block text-right font-medium">تاریخ برگشت</label>
                            <input
                              type="date"
                              value={returnDate}
                              onChange={(e) => setReturnDate(e.target.value)}
                              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-right text-sm md:text-base text-gray-900 cursor-pointer"
                              onClick={(e) => e.currentTarget.showPicker?.()}
                            />
                          </div>
                        )}
                        
                        <button
                          onClick={() => setDateDropdown(false)}
                          className="w-full py-2.5 bg-orange-500 text-white rounded-lg text-sm md:text-base font-medium hover:bg-orange-600 transition"
                        >
                          تایید
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Date gone - Large Desktop only (1280px+) */}
                  <div className="relative flex-1 min-w-[180px] hidden xl:block">
                    <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">تاریخ رفت</div>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full px-4 py-3 md:py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right text-sm md:text-base text-gray-900 cursor-pointer"
                      onClick={(e) => e.currentTarget.showPicker?.()}
                    />
                  </div>

                  {/* Return date - Large Desktop only (1280px+) */}
                  {tripType === "رفت و برگشت" && (
                    <div className="relative flex-1 min-w-[180px] hidden xl:block">
                      <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">تاریخ برگشت</div>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full px-4 py-3 md:py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right text-sm md:text-base text-gray-900 cursor-pointer"
                        onClick={(e) => e.currentTarget.showPicker?.()}
                      />
                    </div>
                  )}

                  {/* Passengers */}
                  <div className="relative flex-1 min-w-[160px]">
                    <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">مسافران</div>
                    <Users className="absolute left-3 top-10 md:top-11 h-4 w-4 md:h-5 md:w-5 text-gray-400 pointer-events-none" />
                    <select 
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                      className="w-full px-4 py-3 md:py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right text-sm md:text-base text-gray-900 cursor-pointer">
                      <option value="">Passengers</option>
                      <option value="1 Passenger">1 Passenger</option>
                      <option value="2 Passengers">2 Passengers</option>
                      <option value="3 Passengers">3 Passengers</option>
                      <option value="4 Passengers">4 Passengers</option>
                    </select>
                  </div>

                  {/* Search Button */}
                  <button 
                    onClick={handleSearch}
                    className="px-6 md:px-8 py-3 md:py-3.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition text-sm md:text-base whitespace-nowrap flex-shrink-0 mt-6 md:mt-7 xl:mt-8 shadow-md">
                    Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Other Afghanibaba Services */}
        <div className="container mx-auto px-4 mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-right">خدمات دیگر افغانی‌بابا</h1>
          
          <div className="border border-gray-300 rounded-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Travel Visa */}
              <div className="flex flex-col items-center text-center gap-4 p-4 rounded-lg hover:bg-orange-50 transition">
                <div className="flex items-center gap-3">
                  <img src="/assets/Home-page/home-card-1.svg" alt="Travel Visa" className="h-12 w-12 md:h-16 md:w-16 object-contain" />
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">تاشیره سفر</h3>
                </div>
                <p className="text-sm md:text-base text-gray-600">اخذ تاشیره برای کشورهای مختلف</p>
              </div>

              {/* Installment Travel */}
              <div className="flex flex-col items-center text-center gap-4 p-4 rounded-lg hover:bg-orange-50 transition">
                <div className="flex items-center gap-3">
                  <img src="/assets/Home-page/home-card-2.svg" alt="Installment Travel" className="h-12 w-12 md:h-16 md:w-16 object-contain" />
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">سفر اقساط</h3>
                </div>
                <p className="text-sm md:text-base text-gray-600">پرداخت هزینه سفر به صورت اقساط</p>
              </div>

              {/* Travel Card */}
              <div className="flex flex-col items-center text-center gap-4 p-4 rounded-lg hover:bg-orange-50 transition">
                <div className="flex items-center gap-3">
                  <img src="/assets/Home-page/home-card-3.svg" alt="Travel Card" className="h-12 w-12 md:h-16 md:w-16 object-contain" />
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">کارت سفر</h3>
                </div>
                <p className="text-sm md:text-base text-gray-600">کارت ویژه برای مسافران</p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Services Section - 2 Cards with Image & Text */}
        <div className="container mx-auto px-4 mb-14 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="p-4 md:p-6 rounded-xl overflow-hidden hover:shadow-lg transition">
              <Image 
                src="/assets/Home-page/home-card-6.webp" 
                alt="Service Card 6" 
                width={800}
                height={600}
                className="w-full h-64 md:h-60 rounded-lg object-cover"
              />
            </div>

            {/* Card 2 */}
            <div className="p-4 md:p-6 rounded-xl overflow-hidden hover:shadow-lg transition">
              <Image 
                src="/assets/Home-page/home-card-7.webp" 
                alt="Service Card 7" 
                width={800}
                height={600}
                className="w-full h-64 md:h-60 rounded-lg object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mobile App Download Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-6 md:p-12">
              {/* QR Code Section */}
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <Image 
                    src="/assets/Home-page/home-card-5.png" 
                    alt="QR Code" 
                    width={192}
                    height={192}
                    className="w-40 h-40 md:w-48 md:h-48 object-contain mx-auto"
                  />
                  <p className="text-sm text-gray-600 mt-4">کود را اسکن کنید</p>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col justify-center text-right">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">اپلیکیشن افغانی‌بابا</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  سریع‌تر و مطمئن‌تر به سفر بروید. اپلیکیشن افغانی‌بابا را دانلود کنید و از تمام خدمات سفر در هر جای و هر زمان استفاده کنید.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#" className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition text-center justify-center">
                    <span>🍎</span>
                    <span>دانلود iOS</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition text-center justify-center">
                    <span>🤖</span>
                    <span>دانلود Android</span>
                  </a>
                </div>
              </div>

              {/* Mobile Phone Image Section */}
              <div className="flex items-center justify-center">
                <Image 
                  src="/assets/Home-page/home-card-4.webp" 
                  alt="Mobile App Screenshot" 
                  width={176}
                  height={256}
                  className="w-40 h-56 md:w-44 md:h-64 object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section - Airline Questions */}
        <div className="container mx-auto px-4 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-right">سوالات رایج درباره بلیط هواپیما</h2>
          <div className="space-y-4">
            {[
              { q: "چند روز قبل از پرواز بلیط هواپیما بخریم؟", a: "بهترین زمان برای خرید بلیط هواپیما معمولاً 2 تا 3 هفته قبل از سفر است." },
              { q: "میزان بار مجاز در هر پرواز چقدر است؟", a: "میزان بار مجاز بسته به ایرلاین متفاوت است. معمولاً 20 تا 30 کیلوگرم مجاز است." },
              { q: "نرخ بلیط برای نوزادان و کودکان زیر 12 سال چگونه است؟", a: "نوزادان (زیر 2 سال) معمولاً بدون صندلی و با 10% قیمت بزرگسالان سفر می‌کنند." },
              { q: "آیا رزرو آنلاین بلیط هزینه بیشتری از خرید حضوری دارد؟", a: "خیر، رزرو آنلاین معمولاً هزینه کمتری دارد و امکان مقایسه قیمت‌ها فراهم است." },
              { q: "آیا امکان استرداد بلیط پس از خرید اینترنتی وجود دارد؟", a: "بله، بسته به قوانین ایرلاین امکان استرداد با کسر جریمه وجود دارد." },
              { q: "آیا هنگام رزرو آنلاین امکان انتخاب صندلی وجود دارد؟", a: "بله، در بسیاری از ایرلاین‌ها امکان انتخاب صندلی هنگام خرید وجود دارد." },
            ].map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 flex items-center justify-between text-right hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-orange-500 font-bold text-lg">{index + 1}.</span>
                    <span className="font-medium text-gray-900">{faq.q}</span>
                  </div>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-gray-600 text-right pr-10">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="bg-white rounded-xl p-8 md:p-12" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">خرید بلیط هواپیما از افغانی‌بابا</h2>
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-right">
                افغانی‌بابا، بزرگ‌ترین و معتبرترین پلتفرم آنلاین خرید بلیط هواپیما، اتوبوس و قطار در کشور است. این سیستم از سال 2014 با هدف تسهیل خدمات سفر آنلاین فعالیت می‌کند.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-orange-50 rounded-xl">
                <div className="text-4xl mb-3">⭐</div>
                <h3 className="font-bold text-gray-900 mb-2">97.2% رضایت مشتری</h3>
                <p className="text-sm text-gray-600">رضایت کامل کاربران از خدمات پلتفرم</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-gray-900 mb-2">سرعت و راحتی</h3>
                <p className="text-sm text-gray-600">خرید سریع و آسان بلیط به صورت آنلاین</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-bold text-gray-900 mb-2">بهترین قیمت</h3>
                <p className="text-sm text-gray-600">تضمین کمترین نرخ بازار</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-4xl mb-3">🔄</div>
                <h3 className="font-bold text-gray-900 mb-2">استرداد آنلاین</h3>
                <p className="text-sm text-gray-600">امکان کنسلی و استرداد وجه به صورت آنلاین</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-4 text-right">تقویم قیمت بلیط هواپیما</h3>
              <p className="text-gray-600 text-right">
                یکی از مفیدترین ابزارهای افغانی‌بابا برای خرید آنلاین بلیط، تقویم قیمت است. با استفاده از این تقویم، می‌توانید نوسانات قیمت بلیط را در روزهای قبل و بعد از تاریخ مورد نظر خود مشاهده کنید.
              </p>
            </div>
          </div>
        </div>

        {/* Flight Search Filters Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="bg-white rounded-xl p-8 md:p-12" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-right">فیلترهای جستجوی پرواز</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Domestic Flights */}
              <div className="p-6 border border-gray-200 rounded-xl">
                <h3 className="font-bold text-xl text-gray-900 mb-4 text-right">فیلترهای پرواز داخلی</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-600 text-right">
                    <span className="text-orange-500">✓</span>
                    انتخاب بلیط بر اساس زمان پرواز
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 text-right">
                    <span className="text-orange-500">✓</span>
                    انتخاب بر اساس نوع بلیط
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 text-right">
                    <span className="text-orange-500">✓</span>
                    فیلتر بلیط بر اساس کلاس پرواز
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 text-right">
                    <span className="text-orange-500">✓</span>
                    انتخاب ایرلاین داخلی
                  </li>
                </ul>
              </div>

              {/* International Flights */}
              <div className="p-6 border border-gray-200 rounded-xl">
                <h3 className="font-bold text-xl text-gray-900 mb-4 text-right">فیلترهای پرواز خارجی</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-600 text-right">
                    <span className="text-orange-500">✓</span>
                    انتخاب بلیط بر اساس زمان پرواز
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 text-right">
                    <span className="text-orange-500">✓</span>
                    انتخاب بلیط بر اساس زمان رسیدن به مقصد
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 text-right">
                    <span className="text-orange-500">✓</span>
                    خرید بلیط بر اساس تعداد توقف: مستقیم - یک توقف - دو توقف
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 text-right">
                    <span className="text-orange-500">✓</span>
                    فیلتر بلیط بر اساس میزان بار مجاز
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 text-right">
                    <span className="text-orange-500">✓</span>
                    فیلتر فرودگاه مبدا، مقصد و توقف
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Airlines Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="bg-white rounded-xl p-8 md:p-12" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-right">خرید بلیط از معتبرترین ایرلاین‌ها</h2>
            <p className="text-gray-600 mb-8 text-right">
              شما حق انتخاب از ایرلاین‌های مختلف را دارید و می‌توانید بلیط پرواز داخلی و خارجی خود را از معتبرترین ایرلاین‌ها خریداری کنید.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-4 text-right">ایرلاین‌های داخلی</h3>
                <div className="flex flex-wrap gap-2">
                  {['کام ایر', 'آریانا', 'Afghan Jet', 'Saf Airways', 'Kam Air'].map((airline, index) => (
                    <span key={index} className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">{airline}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-4 text-right">ایرلاین‌های خارجی</h3>
                <div className="flex flex-wrap gap-2">
                  {['Emirates', 'Qatar Airways', 'Turkish Airlines', 'Flydubai', 'Air Arabia'].map((airline, index) => (
                    <span key={index} className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">{airline}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3 text-right">پروازهای داخلی</h3>
                  <p className="text-gray-600 text-right">
                    خرید بلیط برای تمام مسیرهای پروازی داخلی با تنوع بالای ایرلاین‌ها و قیمت‌های مختلف. از جمله: کابل-مشهد، کابل-تهران، کابل-هرات و...
                  </p>
                </div>
                <div className="p-6 bg-green-50 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3 text-right">پروازهای خارجی</h3>
                  <p className="text-gray-600 text-right">
                    خرید بلیط برای مقاصد بین‌المللی متنوع از جمله ترکیه، امارات، اروپا، آسیا و آمریکا با بهترین قیمت‌ها.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-orange-50 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3 text-right">امکان استرداد بلیط در افغانی‌بابا</h3>
              <p className="text-gray-600 text-right">
                یکی از ویژگی‌های برجسته افغانی‌بابا، امکان استرداد آنلاین بلیط هواپیما است. اگر برنامه سفر شما تغییر کرد، می‌توانید به راحتی بلیط خود را کنسل کرده و وجه را در کوتاه‌ترین زمان دریافت کنید.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-right">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">افغانی‌بابا، همراه شما در سفر</h2>
                <p className="text-white/90 mb-6 leading-relaxed">
                  ارائه تمام خدمات سفر (پرواز، قطار، اتوبوس، هتل و تور) با بهترین کیفیت و قیمت. پشتیبانی 24 ساعته در تمام مراحل سفر.
                </p>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 px-6 py-3 rounded-lg">
                    <div className="text-2xl font-bold">۲۴/۷</div>
                    <div className="text-sm">پشتیبانی</div>
                  </div>
                  <div className="bg-white/20 px-6 py-3 rounded-lg">
                    <div className="text-2xl font-bold">+۵۰</div>
                    <div className="text-sm">ایرلاین</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">✈️</div>
                  <h3 className="text-xl font-bold">معتمدترین عرضه‌کننده محصولات گردشگری در افغانستان</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-6 bg-white rounded-xl" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Headphones className="h-6 w-6 text-blue-500" />
              </div>
              <div className="text-right">
                <h3 className="font-bold text-gray-900">پشتیبانی ۲۴ ساعته</h3>
                <p className="text-sm text-gray-600">همیشه در کنار شما هستیم</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 bg-white rounded-xl" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-right">
                <h3 className="font-bold text-gray-900">بهترین قیمت</h3>
                <p className="text-sm text-gray-600">تضمین کمترین نرخ بازار</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 bg-white rounded-xl" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div className="flex-shrink-0 w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-500" />
              </div>
              <div className="text-right">
                <h3 className="font-bold text-gray-900">استرداد آنلاین</h3>
                <p className="text-sm text-gray-600">فرآیند ساده و سریع</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="container mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-right">خدمات ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/flights" className="group p-8 bg-white rounded-xl hover:shadow-lg transition text-right">
              <div className="text-4xl mb-4">✈️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-afghanibaba-primary transition">
                بلیط هواپیما
              </h3>
              <p className="text-gray-600">
                رزرو بلیط پروازهای داخلی و بین‌المللی با بهترین نرخ
              </p>
            </Link>

            <Link href="/hotels" className="group p-8 bg-white rounded-xl hover:shadow-lg transition text-right">
              <div className="text-4xl mb-4">🏨</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-afghanibaba-primary transition">
                رزرو هتل
              </h3>
              <p className="text-gray-600">
                رزرو هتل‌های معتبر در سراسر کشور و جهان
              </p>
            </Link>

            <Link href="/bus" className="group p-8 bg-white rounded-xl hover:shadow-lg transition text-right">
              <div className="text-4xl mb-4">🚌</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-afghanibaba-primary transition">
                بلیط اتوبوس
              </h3>
              <p className="text-gray-600">
                رزرو اتوبوس‌های بین‌شهری با امکانات کامل
              </p>
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
