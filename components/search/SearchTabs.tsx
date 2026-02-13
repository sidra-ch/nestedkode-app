"use client";

import { useMemo, useState } from "react";

type TabKey =
  | "پرواز داخلی"
  | "پرواز خارجی"
  | "اتوبوس"
  | "تور"
  | "هتل"
  | "ویلا و اقامتگاه";

type Field = {
  name: string;
  placeholder: string;
  type?: string;
};

const tabFields: Record<TabKey, Field[]> = {
  "پرواز داخلی": [
    { name: "from", placeholder: "شهر مبدا" },
    { name: "to", placeholder: "شهر مقصد" },
    { name: "depart", placeholder: "تاریخ رفت", type: "date" },
    { name: "return", placeholder: "تاریخ برگشت", type: "date" },
    { name: "passengers", placeholder: "مسافر" },
  ],
  "پرواز خارجی": [
    { name: "from", placeholder: "شهر مبدا" },
    { name: "to", placeholder: "شهر مقصد" },
    { name: "depart", placeholder: "تاریخ رفت", type: "date" },
    { name: "return", placeholder: "تاریخ برگشت", type: "date" },
    { name: "passengers", placeholder: "مسافر" },
  ],
  اتوبوس: [
    { name: "from", placeholder: "شهر مبدا" },
    { name: "to", placeholder: "شهر مقصد" },
    { name: "depart", placeholder: "تاریخ رفت", type: "date" },
    { name: "return", placeholder: "تاریخ برگشت", type: "date" },
    { name: "passengers", placeholder: "مسافر" },
  ],
  تور: [
    { name: "destination", placeholder: "شهر مقصد" },
    { name: "depart", placeholder: "تاریخ رفت", type: "date" },
    { name: "nights", placeholder: "تعداد شب" },
    { name: "passengers", placeholder: "مسافر" },
  ],
  هتل: [
    { name: "destination", placeholder: "شهر مقصد" },
    { name: "checkin", placeholder: "تاریخ ورود", type: "date" },
    { name: "checkout", placeholder: "تاریخ خروج", type: "date" },
    { name: "rooms", placeholder: "اتاق" },
    { name: "guests", placeholder: "نفر" },
  ],
  "ویلا و اقامتگاه": [
    { name: "destination", placeholder: "شهر مقصد" },
    { name: "checkin", placeholder: "تاریخ ورود", type: "date" },
    { name: "checkout", placeholder: "تاریخ خروج", type: "date" },
    { name: "rooms", placeholder: "ویلا" },
    { name: "guests", placeholder: "نفر" },
  ],
};

const tabs: TabKey[] = ["پرواز داخلی", "پرواز خارجی", "اتوبوس", "تور", "هتل", "ویلا و اقامتگاه"];
const cityOptions = [
  "کابل",
  "مزار شریف",
  "هرات",
  "قندهار",
  "بامیان",
  "دوبی",
  "استانبول",
  "دهلی",
  "تهران",
  "مشهد",
];

export default function SearchTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("پرواز داخلی");

  const fields = useMemo(() => tabFields[activeTab], [activeTab]);

  return (
    <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-2xl shadow-black/10">
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-black/5 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              activeTab === tab
                ? "bg-[#FDB713] text-black"
                : "border border-black/10 bg-white text-slate-700 hover:bg-[#fff7e0]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]">
        {fields.map((field) => (
          <input
            key={field.name}
            className="input-field transition-all duration-300"
            placeholder={field.placeholder}
            type={field.type ?? "text"}
            list={field.type === "date" ? undefined : "city-options"}
          />
        ))}
        <button className="btn-primary h-12 px-8">جستجو</button>
      </div>

      <datalist id="city-options">
        {cityOptions.map((city) => (
          <option key={city} value={city} />
        ))}
      </datalist>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500">
        <span>پشتیبانی ۲۴ ساعته</span>
        <span className="h-1 w-1 rounded-full bg-slate-300" />
        <span>تضمین کمترین قیمت</span>
        <span className="h-1 w-1 rounded-full bg-slate-300" />
        <span>استرداد آنلاین</span>
      </div>
    </div>
  );
}
