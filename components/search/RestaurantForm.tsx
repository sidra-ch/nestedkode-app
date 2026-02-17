"// File removed as it was extra and not needed."
"// Original file contents were:"
"// \"use client\";"
""
"import { useState } from \"react\";"
"import { MapPin, Clock, Users, Search, UtensilsCrossed } from \"lucide-react\";"
""
"export default function RestaurantForm() {"
"  const [location, setLocation] = useState(\"\");"
"  const [cuisine, setCuisine] = useState(\"Afghan\");"
"  const [date, setDate] = useState(\"\");"
"  const [time, setTime] = useState(\"\");"
"  const [guests, setGuests] = useState(\"2\");"
""
"  const kabul_areas = ["
"    \"کارته سه\"," 
"    \"شیر پور\","
"    \"سپیضار\","
"    \"خانآباد\","
"    \"گلدسته\","
"    \"قصل داریس\","
"    \"آقچه قلعہ\","
"  ];"
""
"  const cuisines = ["
"    \"Afghan - افغانی\","
"    \"Indian - هندی\","
"    \"Turkish - ترکی\","
"    \"Persian - فارسی\","
"    \"Mediterranean - مدیترانه ای\","
"    \"Asian - آسیایی\","
"    \"International - بین المللی\","
"  ];"
""
"  const handleSearch = () => {"
"    if (!location || !date || !time) {"
"      alert(\"لطفاً تمام فیلدها را پر کنید\");"
"      return;"
"    }"
"    console.log({ location, cuisine, date, time, guests });"
"    // TODO: Navigate to restaurant search results"
"  };"
""
"  return ("
"    <div className=\"w-full space-y-4 rounded-2xl bg-white p-6 shadow-lg\">"
"      <h3 className=\"flex items-center gap-2 text-lg font-semibold text-right text-gray-900\">"
"        <UtensilsCrossed className=\"h-5 w-5\" style={{ color: '#F97316' }} />"
"        رستوران را رزرو کنید"
"      </h3>"
""
"      {/* Location & Cuisine */}"
"      <div className=\"grid gap-3 md:grid-cols-2\">"
"        <div>"
"          <label className=\"mb-2 block text-sm font-semibold text-gray-700\">"
"            <MapPin className=\"mb-1 inline h-4 w-4\" /> منطقہ"
"          </label>"
"          <input"
"            type=\"text\""
"            list=\"location-options\""
"            value={location}"
"            onChange={(e) => setLocation(e.target.value)}"
"            placeholder=\"کابل، کارته سے\""
"            className=\"w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm\""
"          />"
"          <datalist id=\"location-options\">"
"            {kabul_areas.map((area) => ("
"              <option key={area} value={area} />"
"            ))}"
"          </datalist>"
"        </div>"
""
"        <div>"
"          <label className=\"mb-2 block text-sm font-semibold text-gray-700\">"
"            <UtensilsCrossed className=\"mb-1 inline h-4 w-4\" /> نوع غذا"
"          </label>"
"          <select"
"            value={cuisine}"
"            onChange={(e) => setCuisine(e.target.value)}"
"            className=\"w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm\""
"          >"
"            {cuisines.map((c) => ("
"              <option key={c} value={c}>"
"                {c}"
"              </option>"
"            ))}"
"          </select>"
"        </div>"
"      </div>"
""
"      {/* Date, Time, Guests */}"
"      <div className=\"grid gap-3 md:grid-cols-3\">"
"        <div>"
"          <label className=\"mb-2 block text-sm font-semibold text-gray-700\">"
"            <Clock className=\"mb-1 inline h-4 w-4\" /> تاریخ"
"          </label>"
"          <input"
"            type=\"date\""
"            value={date}"
"            onChange={(e) => setDate(e.target.value)}"
"            className=\"w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm\""
"          />"
"        </div>"
""
"        <div>"
"          <label className=\"mb-2 block text-sm font-semibold text-gray-700\">"
"            <Clock className=\"mb-1 inline h-4 w-4\" /> وقت"
"          </label>"
"          <input"
"            type=\"time\""
"            value={time}"
"            onChange={(e) => setTime(e.target.value)}"
"            className=\"w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm\""
"          />"
"        </div>"
""
"        <div>"
"          <label className=\"mb-2 block text-sm font-semibold text-gray-700\">"
"            <Users className=\"mb-1 inline h-4 w-4\" /> مہمان ها"
"          </label>"
"          <select"
"            value={guests}"
"            onChange={(e) => setGuests(e.target.value)}"
"            className=\"w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm\""
"          >"
"            <option value=\"1\">۱ نفر</option>"
"            <option value=\"2\">۲ نفر</option>"
"            <option value=\"3\">۳ نفر</option>"
"            <option value=\"4\">۴ نفر</option>"
"            <option value=\"5\">۵ نفر</option>"
"            <option value=\"6\">۶ نفر</option>"
"            <option value=\"8\">۸ نفر</option>"
"            <option value=\"10\">۱۰ نفر</option>"
"            <option value=\"12\">۱۲ نفر</option>"
"          </select>"
"        </div>"
"      </div>"
""
"      {/* Search Button */}"
"      <button"
"        onClick={handleSearch}"
"        className=\"w-full rounded-lg px-6 py-3 font-semibold text-white transition\""
"        style={{ backgroundColor: '#F97316' }}"
"        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C2410C')}"
"        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F97316')}"
"      >"
"        <Search className=\"mb-1 inline h-4 w-4\" /> جستجوی رستوران"
"      </button>"
""
"      {/* Info Text */}"
"      <div className=\"flex items-start gap-2 rounded-lg bg-green-50 p-3 text-xs text-green-700\">"
"        <span>💚</span>"
"        <p>"
"          افغانی‌بابا صرف رستوران‌های تأیید شده و با کیفیت بالا را نمایش می‌دهد. می‌توانید به راحتی رزرو کنید و با یک کلیک"
"          کنسل کنید."
"        </p>"
"      </div>"
"    </div>"
"  );"
"}"
""
"use client";

import { useState } from "react";
import { MapPin, Clock, Users, Search, UtensilsCrossed } from "lucide-react";

export default function RestaurantForm() {
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("Afghan");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");

  const kabul_areas = [
    "کارته سه",
    "شیر پور",
    "سپیضار",
    "خانآباد",
    "گلدسته",
    "قصل داریس",
    "آقچه قلعہ",
  ];

  const cuisines = [
    "Afghan - افغانی",
    "Indian - هندی",
    "Turkish - ترکی",
    "Persian - فارسی",
    "Mediterranean - مدیترانه ای",
    "Asian - آسیایی",
    "International - بین المللی",
  ];

  const handleSearch = () => {
    if (!location || !date || !time) {
      alert("لطفاً تمام فیلدها را پر کنید");
      return;
    }
    console.log({ location, cuisine, date, time, guests });
    // TODO: Navigate to restaurant search results
  };

  return (
    <div className="w-full space-y-4 rounded-2xl bg-white p-6 shadow-lg">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-right text-gray-900">
        <UtensilsCrossed className="h-5 w-5" style={{ color: '#F97316' }} />
        رستوران را رزرو کنید
      </h3>

      {/* Location & Cuisine */}
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            <MapPin className="mb-1 inline h-4 w-4" /> منطقہ
          </label>
          <input
            type="text"
            list="location-options"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="کابل، کارته سے"
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm"
          />
          <datalist id="location-options">
            {kabul_areas.map((area) => (
              <option key={area} value={area} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            <UtensilsCrossed className="mb-1 inline h-4 w-4" /> نوع غذا
          </label>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm"
          >
            {cuisines.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Date, Time, Guests */}
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
            <Users className="mb-1 inline h-4 w-4" /> مہمان ها
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-right text-sm"
          >
            <option value="1">۱ نفر</option>
            <option value="2">۲ نفر</option>
            <option value="3">۳ نفر</option>
            <option value="4">۴ نفر</option>
            <option value="5">۵ نفر</option>
            <option value="6">۶ نفر</option>
            <option value="8">۸ نفر</option>
            <option value="10">۱۰ نفر</option>
            <option value="12">۱۲ نفر</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full rounded-lg px-6 py-3 font-semibold text-white transition"
        style={{ backgroundColor: '#F97316' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C2410C')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F97316')}
      >
        <Search className="mb-1 inline h-4 w-4" /> جستجوی رستوران
      </button>

      {/* Info Text */}
      <div className="flex items-start gap-2 rounded-lg bg-green-50 p-3 text-xs text-green-700">
        <span>💚</span>
        <p>
          افغانی‌بابا صرف رستوران‌های تأیید شده و با کیفیت بالا را نمایش می‌دهد. می‌توانید به راحتی رزرو کنید و با یک کلیک
          کنسل کنید.
        </p>
      </div>
    </div>
  );
}
