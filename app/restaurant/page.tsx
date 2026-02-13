"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RestaurantForm from "@/components/search/RestaurantForm";
import { MapPin, Star, Clock, Users, UtensilsCrossed, Wifi, Car, DollarSign } from "lucide-react";

interface Restaurant {
  _id: string;
  name: string;
  cuisineType: string;
  location: string;
  rating: number;
  reviews_count: number;
  priceRange: "budget" | "moderate" | "premium";
  hasWifi: boolean;
  hasParking: boolean;
  hasDelivery: boolean;
  operatingHours: { open: string; close: string };
  images: string[];
  seatingCapacity: number;
}

export default function RestaurantPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    cuisine: "Afghan",
    location: "",
  });

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const query = new URLSearchParams();
        if (filters.cuisine) query.append("cuisine", filters.cuisine);
        if (filters.location) query.append("location", filters.location);

        const response = await fetch(`/api/restaurants?${query.toString()}`);
        const data = await response.json();

        if (data.success) {
          setRestaurants(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [filters]);

  const getPriceDisplay = (priceRange: string) => {
    const prices: Record<string, string> = {
      budget: "۱۰۰ - ۳۰۰ هزار",
      moderate: "۳۰۰ - ۸۰۰ هزار",
      premium: "۸۰۰+ هزار",
    };
    return prices[priceRange] || "نامعلوم";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ direction: "rtl" }}>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative h-72"
          style={{ background: 'linear-gradient(to right, #F97316, #FB923C)' }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 mx-auto h-full max-w-6xl px-4 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-3">رستوران‌های برتر افغانستان</h1>
            <p className="text-white/90">بهترین رستوران‌ها را پیدا کنید و میز خود را رزرو کنید</p>
          </div>
        </section>

        {/* Search Section */}
        <section className="mx-auto max-w-6xl px-4 -mt-20 relative z-20 mb-12">
          <RestaurantForm />
        </section>

        {/* Filters Section */}
        <section className="mx-auto max-w-6xl px-4 mb-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">نوع غذا</label>
              <select
                value={filters.cuisine}
                onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm"
              >
                <option value="Afghan">افغانی</option>
                <option value="Indian">هندی</option>
                <option value="Turkish">ترکی</option>
                <option value="Persian">فارسی</option>
                <option value="Mediterranean">مدیترانه ای</option>
                <option value="Asian">آسیایی</option>
                <option value="International">بین المللی</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">منطقہ</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                placeholder="کابل، مزار شریف..."
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">قیمت</label>
              <select
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm"
              >
                <option value="">همه</option>
                <option value="budget">ارزان</option>
                <option value="moderate">متوسط</option>
                <option value="premium">گران</option>
              </select>
            </div>
          </div>
        </section>

        {/* Restaurants Grid */}
        <section className="mx-auto max-w-6xl px-4 mb-12">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">در حال بارگذاری...</p>
            </div>
          ) : restaurants && restaurants.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {restaurants.map((restaurant) => (
                <Link
                  key={restaurant._id}
                  href={`/restaurant/${restaurant._id}`}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    {restaurant.images?.[0] ? (
                      <img
                        src={restaurant.images[0]}
                        alt={restaurant.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-afghani baba-light to-gray-200">
                        <UtensilsCrossed className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 text-right mb-2">{restaurant.name}</h3>

                    {/* Rating */}
                    <div className="flex items-center justify-end gap-2 mb-3">
                      <span className="text-sm font-semibold text-gray-700">
                        ({restaurant.reviews_count})
                      </span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.round(restaurant.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <p className="flex items-center justify-end gap-2">
                        <span>{restaurant.cuisineType}</span>
                        <UtensilsCrossed className="h-4 w-4" />
                      </p>
                      <p className="flex items-center justify-end gap-2">
                        <span>{restaurant.location}</span>
                        <MapPin className="h-4 w-4" />
                      </p>
                      <p className="flex items-center justify-end gap-2">
                        <span>{restaurant.operatingHours?.open} - {restaurant.operatingHours?.close}</span>
                        <Clock className="h-4 w-4" />
                      </p>
                    </div>

                    {/* Features */}
                    <div className="mb-4 flex flex-wrap justify-end gap-2">
                      {restaurant.hasWifi && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
                          <Wifi className="h-3 w-3" /> وای فای
                        </span>
                      )}
                      {restaurant.hasParking && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs text-green-700">
                          <Car className="h-3 w-3" /> پارکینگ
                        </span>
                      )}
                      {restaurant.hasDelivery && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-1 text-xs text-purple-700">
                          🚚 تحویل
                        </span>
                      )}
                    </div>

                    {/* Price & Button */}
                    <div className="flex items-center justify-between">
                      <button 
                        className="w-full rounded-lg px-6 py-3 font-semibold text-white transition"
                        style={{ backgroundColor: '#F97316' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C2410C')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F97316')}
                      >
                        رزرو کنید
                      </button>
                      <p className="text-xs font-semibold text-gray-500">
                        {getPriceDisplay(restaurant.priceRange)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">رستورانی یافت نشد</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
