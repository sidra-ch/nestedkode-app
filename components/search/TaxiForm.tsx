"use client";

import { useState } from "react";
import { MapPin, Clock, Users, Search } from "lucide-react";

export default function TaxiForm() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengerCount, setPassengerCount] = useState("1");

  const kabulDistricts = [
    "شیر پور",
    "کارته سه",
    "کارته چار",
    "سپیضار",
    "دیار پول",
    "خانآباد",
    "وزیرآباد",
    "تیموری",
  ];

  const handleSearch = () => {
    if (!pickup || !destination || !date) {
      alert("لطفاً تمام فیلدها را پر کنید");
      return;
    }
    console.log({ pickup, destination, date, time, passengerCount });
    // TODO: Navigate to taxi search results
  };

  return (
    <div className="w-full space-y-4 rounded-2xl bg-white p-6 shadow-lg">
      <h3 className="text-lg font-bold text-right text-gray-900">تاکسی را رزرو کنید</h3>

      {/* Pickup & Destination */}
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            <MapPin className="mb-1 inline h-4 w-4" /> مکان برداشتن
          </label>
          <input
            type="text"
            list="pickup-options"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="کارته سه، کابل"
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm"
          />
          <datalist id="pickup-options">
            {kabulDistricts.map((district) => (
              <option key={district} value={district} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            <MapPin className="mb-1 inline h-4 w-4" /> مقصد
          </label>
          <input
            type="text"
            list="dest-options"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="ایر پورت حامد کرزی"
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm"
          />
          <datalist id="dest-options">
            {kabulDistricts.concat(["ایر پورت حامد کرزی"]).map((district) => (
              <option key={district} value={district} />
            ))}
          </datalist>
        </div>
      </div>

      {/* Date, Time, Passengers */}
      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            <Clock className="mb-1 inline h-4 w-4" /> تاریخ
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            <Clock className="mb-1 inline h-4 w-4" /> وقت
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            <Users className="mb-1 inline h-4 w-4" /> مسافران
          </label>
          <select
            value={passengerCount}
            onChange={(e) => setPassengerCount(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm"
          >
            <option value="1">۱ نفر</option>
            <option value="2">۲ نفر</option>
            <option value="3">۳ نفر</option>
            <option value="4">۴ نفر</option>
            <option value="5">۵ نفر</option>
            <option value="6">۶ نفر</option>
            <option value="7">۷ نفر</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full rounded-lg bg-afghanibaba-primary px-6 py-3 font-bold text-white transition hover:bg-afghanibaba-dark"
      >
        <Search className="mb-1 inline h-4 w-4" /> جستجوی تاکسی
      </button>

      {/* Info Text */}
      <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-xs text-blue-700">
        <span>💡</span>
        <p>
          قیمت نهایی بسته به فاصله و کلاس خودرو متفاوت است. قیمت دقیق پس از انتخاب تاکسی نمایش داده خواهد شد.
        </p>
      </div>
    </div>
  );
}
