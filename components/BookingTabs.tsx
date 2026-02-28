"use client";

import { useState } from "react";
import SearchTabs from "./search/SearchTabs";
import { Plane, Hotel, Bus, Compass, Car } from "lucide-react";

export type TabKey = "domestic-flight" | "foreign-flight" | "bus" | "hotel" | "tour" | "taxi";

const TABS: { key: TabKey; label: string; icon: React.ReactElement }[] = [
  { key: "domestic-flight", label: "پرواز داخلی", icon: <Plane className="w-6 h-6 md:w-7 md:h-7" /> },
  { key: "foreign-flight", label: "پرواز خارجی", icon: <Plane className="w-6 h-6 md:w-7 md:h-7" /> },
  { key: "bus", label: "اتوبوس", icon: <Bus className="w-6 h-6 md:w-7 md:h-7" /> },
  { key: "hotel", label: "هتل", icon: <Hotel className="w-6 h-6 md:w-7 md:h-7" /> },
  { key: "tour", label: "تور", icon: <Compass className="w-6 h-6 md:w-7 md:h-7" /> },
  { key: "taxi", label: "تاکسی", icon: <Car className="w-6 h-6 md:w-7 md:h-7" /> },
];

interface BookingTabsProps {
  activeTab?: TabKey;
  onTabChange?: (tab: TabKey) => void;
}

export default function BookingTabs({ activeTab: controlledTab, onTabChange }: BookingTabsProps) {
  const [internalTab, setInternalTab] = useState<TabKey>("domestic-flight");
  const activeTab = controlledTab ?? internalTab;
  const setActiveTab = onTabChange ?? setInternalTab;

  return (
    <div
      className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 px-4 py-4 md:px-8 md:py-8 max-w-6xl mx-auto
        md:rounded-2xl md:shadow-lg
        sticky md:static top-0 z-50"
    >
      {/* Tabs: fixed row – no move on click, stable layout */}
      <div
        className="flex gap-4 md:gap-8 mb-6 md:mb-8 overflow-x-auto scrollbar-hide whitespace-nowrap overflow-y-visible items-end h-12 md:h-14 flex-nowrap"
        tabIndex={0}
        role="tablist"
        style={{ scrollBehavior: "smooth" }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 flex-shrink-0 min-w-0 py-2 h-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded-lg transition-colors duration-200 relative
              ${activeTab === tab.key ? "text-blue-600 font-semibold" : "text-gray-500 font-normal hover:text-gray-700"}`}
            role="tab"
            aria-selected={activeTab === tab.key}
            style={{ border: "none", boxShadow: "none" }}
          >
            <span className="flex-shrink-0">{tab.icon}</span>
            <span className="text-xs md:text-base truncate">{tab.label}</span>
            {/* Blue underline – active tab only, smooth */}
            <span
              className={`absolute bottom-0 right-0 left-0 h-0.5 rounded-full transition-all duration-200 ${
                activeTab === tab.key ? "opacity-100 scale-x-100 bg-blue-500" : "opacity-0 scale-x-0 bg-blue-500"
              }`}
              style={{ transformOrigin: "center" }}
            />
          </button>
        ))}
      </div>
      {/* Form: smooth transition when tab changes */}
      <div className="min-h-[260px] md:min-h-[100px] transition-all duration-300 ease-out">
        <SearchTabs activeTab={activeTab} />
      </div>
    </div>
  );
}
