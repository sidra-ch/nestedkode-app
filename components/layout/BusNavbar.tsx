"use client";

import { useState } from "react";
import { ChevronDown, Headphones, User } from "lucide-react";

function VisaDropdown() {
  const [open, setOpen] = useState(false);
  const items = ["علی بابا پلاس", "مجله علی بابا", "بیمه مسافرتی", "سفر اقساطی"];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 cursor-pointer hover:text-black"
      >
        ویزا
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white shadow-md rounded-md border text-base z-50">
          {items.map((item, i) => (
            <div key={i} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FlightDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 cursor-pointer hover:text-black"
      >
        بلیط هواپیما
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md border text-base z-50">
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">پرواز داخلی</div>
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">پرواز خارجی</div>
        </div>
      )}
    </div>
  );
}

type BusNavbarProps = {
  onLoginClick?: () => void;
};

export default function BusNavbar({ onLoginClick }: BusNavbarProps) {
  return (
    <div className="w-full bg-white border-b text-lg">
      <div className="max-w-7xl mx-auto w-full px-2 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-4 justify-start">
          <div className="flex items-center gap-2 font-semibold text-2xl">
            <span className="text-yellow-500 text-4xl">A</span>
            <span>afghanibaba</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-gray-700">
            <VisaDropdown />
            <span className="cursor-pointer hover:text-black">تور</span>
            <span className="cursor-pointer hover:text-black">اقامت</span>
            <span className="cursor-pointer hover:text-black">بلیط اتوبوس</span>
            <FlightDropdown />
          </div>
        </div>

        <div className="hidden md:block flex-1" />

        <div className="flex flex-wrap items-center gap-4 text-gray-700 md:justify-end">
          <button
            type="button"
            onClick={onLoginClick}
            className="flex items-center gap-2 hover:text-black"
          >
            <span>Login or Register</span>
            <User size={16} />
          </button>

          <div className="cursor-pointer hover:text-black">My travels</div>

          <div className="flex items-center gap-2 cursor-pointer hover:text-black">
            <span>Online Support Center</span>
            <Headphones size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
