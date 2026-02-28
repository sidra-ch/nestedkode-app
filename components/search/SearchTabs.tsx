"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ArrowRightLeft, Users } from "lucide-react";
import { AFGHANISTAN_PROVINCES } from "@/lib/constants/provinces";
import Toast from "@/components/ui/Toast";
import type { TabKey } from "@/components/BookingTabs";

const inputBase =
  "w-full h-14 px-4 rounded-xl border border-gray-300 text-right text-gray-900 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200";

type TravelFormState = {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  tripType: "oneway" | "roundtrip";
  adultCount: number;
  childCount: number;
  infantCount: number;
};

type HotelFormState = {
  city: string;
  checkIn: string;
  checkOut: string;
  guests: number;
};

type TaxiFormState = {
  origin: string;
  destination: string;
  date: string;
};

const defaultTravel: TravelFormState = {
  origin: "",
  destination: "",
  departureDate: new Date().toISOString().slice(0, 10),
  returnDate: "",
  tripType: "oneway",
  adultCount: 1,
  childCount: 0,
  infantCount: 0,
};

const defaultHotel: HotelFormState = {
  city: "",
  checkIn: new Date().toISOString().slice(0, 10),
  checkOut: "",
  guests: 1,
};

const defaultTaxi: TaxiFormState = {
  origin: "",
  destination: "",
  date: new Date().toISOString().slice(0, 10),
};

interface SearchTabsProps {
  activeTab: TabKey;
}

export default function SearchTabs({ activeTab }: SearchTabsProps) {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastOpen(true);
  }, []);

  // Per-tab form state (preserved when switching tabs)
  const [travelForm, setTravelForm] = useState<Record<string, TravelFormState>>({
    "domestic-flight": { ...defaultTravel },
    "foreign-flight": { ...defaultTravel },
    bus: { ...defaultTravel },
    tour: { ...defaultTravel },
  });
  const [hotelForm, setHotelForm] = useState<HotelFormState>(defaultHotel);
  const [taxiForm, setTaxiForm] = useState<TaxiFormState>(defaultTaxi);

  const [tripTypeDropdownOpen, setTripTypeDropdownOpen] = useState(false);
  const [originDropdown, setOriginDropdown] = useState(false);
  const [destinationDropdown, setDestinationDropdown] = useState(false);
  const [passengerDropdown, setPassengerDropdown] = useState(false);
  const [cityDropdown, setCityDropdown] = useState(false);
  const [originSearch, setOriginSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [swapRotate, setSwapRotate] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const isFlight = activeTab === "domestic-flight" || activeTab === "foreign-flight";
  const isTravelForm = isFlight || activeTab === "bus" || activeTab === "tour";
  const isHotel = activeTab === "hotel";
  const isTaxi = activeTab === "taxi";

  const travel = travelForm[activeTab] ?? defaultTravel;
  const setTravel = (updater: (prev: TravelFormState) => TravelFormState) => {
    setTravelForm((prev) => ({ ...prev, [activeTab]: updater(prev[activeTab] ?? defaultTravel) }));
  };

  // Sync origin !== destination: clear destination if same
  useEffect(() => {
    if (travel.origin && travel.destination && travel.origin === travel.destination) {
      setTravel((p) => ({ ...p, destination: "" }));
      showToast("مبدا و مقصد نمی‌تواند یکسان باشد");
    }
  }, [travel.origin, travel.destination]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setTripTypeDropdownOpen(false);
        setOriginDropdown(false);
        setDestinationDropdown(false);
        setPassengerDropdown(false);
        setCityDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSwap = () => {
    setSwapRotate(true);
    setTravel((p) => ({
      ...p,
      origin: p.destination,
      destination: p.origin,
    }));
    setTimeout(() => setSwapRotate(false), 300);
  };

  const handleTaxiSwap = () => {
    setSwapRotate(true);
    setTaxiForm((p) => ({ ...p, origin: p.destination, destination: p.origin }));
    setTimeout(() => setSwapRotate(false), 300);
  };

  const passengerSummary =
    travel.adultCount === 1 && !travel.childCount && !travel.infantCount
      ? "1 بزرگسال"
      : `${travel.adultCount} بزرگسال${travel.childCount ? `، ${travel.childCount} کودک` : ""}${travel.infantCount ? `، ${travel.infantCount} نوزاد` : ""}`;

  const filterProvinces = (search: string) =>
    AFGHANISTAN_PROVINCES.filter((p) => p.name.includes(search) || !search.trim());

  const validateAndSubmitTravel = () => {
    if (travel.origin === travel.destination && travel.origin) {
      showToast("مبدا و مقصد نمی‌تواند یکسان باشد");
      return;
    }
    if (!travel.origin || !travel.destination) {
      showToast("مبدا و مقصد را انتخاب کنید");
      return;
    }
    if (!travel.departureDate) {
      showToast("تاریخ رفت را انتخاب کنید");
      return;
    }
    if (travel.tripType === "roundtrip" && travel.returnDate) {
      if (new Date(travel.returnDate) <= new Date(travel.departureDate)) {
        showToast("تاریخ برگشت باید بعد از تاریخ رفت باشد");
        return;
      }
    }
    if (travel.adultCount < 1) {
      showToast("حداقل یک بزرگسال لازم است");
      return;
    }
    const params = new URLSearchParams({
      origin: travel.origin,
      destination: travel.destination,
      date: travel.departureDate,
      adults: String(travel.adultCount),
      children: String(travel.childCount),
      infants: String(travel.infantCount),
    });
    if (travel.tripType === "roundtrip" && travel.returnDate) params.set("returnDate", travel.returnDate);
    if (activeTab === "bus") router.push(`/bus?${params.toString()}`);
    else if (activeTab === "tour") router.push(`/tour?${params.toString()}`);
    else router.push(`/flights?${params.toString()}`);
  };

  const validateAndSubmitHotel = () => {
    if (!hotelForm.city) {
      showToast("شهر را انتخاب کنید");
      return;
    }
    if (!hotelForm.checkIn) {
      showToast("تاریخ ورود را انتخاب کنید");
      return;
    }
    if (!hotelForm.checkOut) {
      showToast("تاریخ خروج را انتخاب کنید");
      return;
    }
    if (hotelForm.guests < 1) {
      showToast("حداقل یک مهمان لازم است");
      return;
    }
    router.push(
      `/hotels?city=${encodeURIComponent(hotelForm.city)}&checkIn=${hotelForm.checkIn}&checkOut=${hotelForm.checkOut}&guests=${hotelForm.guests}`
    );
  };

  const validateAndSubmitTaxi = () => {
    if (!taxiForm.origin || !taxiForm.destination) {
      showToast("مبدا و مقصد را انتخاب کنید");
      return;
    }
    if (taxiForm.origin === taxiForm.destination) {
      showToast("مبدا و مقصد نمی‌تواند یکسان باشد");
      return;
    }
    if (!taxiForm.date) {
      showToast("تاریخ را انتخاب کنید");
      return;
    }
    router.push(
      `/taxi?origin=${encodeURIComponent(taxiForm.origin)}&destination=${encodeURIComponent(taxiForm.destination)}&date=${taxiForm.date}`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTravelForm) validateAndSubmitTravel();
    else if (isHotel) validateAndSubmitHotel();
    else if (isTaxi) validateAndSubmitTaxi();
  };

  const originPlaceholder =
    activeTab === "bus"
      ? "شهر مبدا"
      : activeTab === "tour"
        ? "مبدا تور"
        : isFlight
          ? "مبدا پرواز"
          : "مبدا";
  const destPlaceholder =
    activeTab === "bus"
      ? "شهر مقصد"
      : activeTab === "tour"
        ? "مقصد تور"
        : isFlight
          ? "مقصد پرواز"
          : "مقصد";

  return (
    <>
      <form ref={formRef} className="w-full transition-opacity duration-200 ease-out" onSubmit={handleSubmit}>
        {/* Travel form: Flight, Bus, Tour */}
        {isTravelForm && (
          <>
            {isFlight && (
              <div className="mb-4 w-full max-w-[140px]">
                <div className="relative">
                  <button
                    type="button"
                    className="w-full flex items-center justify-start gap-2 px-2 py-2 border border-gray-300 rounded-xl bg-white text-sm font-semibold text-right cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 h-14"
                    onClick={() => setTripTypeDropdownOpen((o) => !o)}
                  >
                    <span className="pr-1">{travel.tripType === "oneway" ? "یک طرفه" : "رفت و برگشت"}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                  {tripTypeDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                      <button
                        type="button"
                        className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-100 ${travel.tripType === "oneway" ? "text-orange-600 font-bold" : "text-gray-700"}`}
                        onClick={() => { setTravel((p) => ({ ...p, tripType: "oneway" })); setTripTypeDropdownOpen(false); }}
                      >
                        یک طرفه
                      </button>
                      <button
                        type="button"
                        className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-100 ${travel.tripType === "roundtrip" ? "text-orange-600 font-bold" : "text-gray-700"}`}
                        onClick={() => { setTravel((p) => ({ ...p, tripType: "roundtrip" })); setTripTypeDropdownOpen(false); }}
                      >
                        رفت و برگشت
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col md:grid md:grid-cols-[1.2fr_auto_1.2fr_1fr_1fr_1fr_auto] gap-4 items-end space-y-3 md:space-y-0">
              {/* Origin */}
              <div className="relative w-full">
                <label className="block text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">مبدا</label>
                <input
                  type="text"
                  placeholder={originPlaceholder}
                  value={travel.origin || originSearch}
                  onChange={(e) => {
                    setOriginSearch(e.target.value);
                    setOriginDropdown(true);
                    if (!e.target.value) setTravel((p) => ({ ...p, origin: "" }));
                  }}
                  onFocus={() => {
                    setOriginDropdown(true);
                    setOriginSearch("");
                  }}
                  className={inputBase}
                  autoComplete="off"
                />
                <ChevronDown className="absolute left-4 top-[2.6rem] h-4 w-4 text-gray-400 pointer-events-none" />
                {originDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto transition-opacity duration-200">
                    {filterProvinces(originSearch).map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-gray-100 text-right ${travel.origin === p.name ? "font-bold bg-orange-50" : ""}`}
                        onClick={() => {
                          setTravel((prev) => ({ ...prev, origin: p.name }));
                          setOriginDropdown(false);
                          setOriginSearch("");
                        }}
                      >
                        <span>{p.icon}</span>
                        <span>{p.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Swap – centered between origin and destination */}
              <div className="flex justify-center items-end pb-0 md:pb-0">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="bg-white border border-gray-300 rounded-full p-2.5 shadow-sm hover:bg-gray-100 transition-all duration-300"
                  style={{ transform: swapRotate ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <ArrowRightLeft className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Destination */}
              <div className="relative w-full">
                <label className="block text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">مقصد</label>
                <input
                  type="text"
                  placeholder={destPlaceholder}
                  value={travel.destination || destinationSearch}
                  onChange={(e) => {
                    setDestinationSearch(e.target.value);
                    setDestinationDropdown(true);
                    if (!e.target.value) setTravel((p) => ({ ...p, destination: "" }));
                  }}
                  onFocus={() => {
                    setDestinationDropdown(true);
                    setDestinationSearch("");
                  }}
                  className={inputBase}
                  autoComplete="off"
                />
                <ChevronDown className="absolute left-4 top-[2.6rem] h-4 w-4 text-gray-400 pointer-events-none" />
                {destinationDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto transition-opacity duration-200">
                    {filterProvinces(destinationSearch).map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-gray-100 text-right ${travel.destination === p.name ? "font-bold bg-orange-50" : ""}`}
                        onClick={() => {
                          setTravel((prev) => ({ ...prev, destination: p.name }));
                          setDestinationDropdown(false);
                          setDestinationSearch("");
                        }}
                      >
                        <span>{p.icon}</span>
                        <span>{p.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Departure */}
              <div className="w-full">
                <label className="block text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">تاریخ رفت</label>
                <input
                  type="date"
                  value={travel.departureDate}
                  onChange={(e) => setTravel((p) => ({ ...p, departureDate: e.target.value }))}
                  className={inputBase}
                />
              </div>

              {/* Return (flights only) */}
              <div className="w-full">
                <label className="block text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">تاریخ برگشت</label>
                <input
                  type="date"
                  value={travel.returnDate}
                  onChange={(e) => setTravel((p) => ({ ...p, returnDate: e.target.value }))}
                  className={inputBase}
                  disabled={travel.tripType !== "roundtrip"}
                />
              </div>

              {/* Passengers */}
              <div className="relative w-full">
                <label className="block text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">مسافران</label>
                <button
                  type="button"
                  className={`${inputBase} flex items-center justify-between bg-white`}
                  onClick={() => setPassengerDropdown((v) => !v)}
                >
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>{passengerSummary}</span>
                </button>
                {passengerDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 flex flex-col gap-3 transition-opacity duration-200">
                    <div className="flex justify-between items-center text-right">
                      <span>بزرگسال</span>
                      <div className="flex gap-2 items-center">
                        <button
                          type="button"
                          onClick={() => setTravel((p) => ({ ...p, adultCount: Math.max(1, p.adultCount - 1) }))}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span>{travel.adultCount}</span>
                        <button
                          type="button"
                          onClick={() => setTravel((p) => ({ ...p, adultCount: p.adultCount + 1 }))}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-right">
                      <span>کودک</span>
                      <div className="flex gap-2 items-center">
                        <button
                          type="button"
                          onClick={() => setTravel((p) => ({ ...p, childCount: Math.max(0, p.childCount - 1) }))}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span>{travel.childCount}</span>
                        <button
                          type="button"
                          onClick={() => setTravel((p) => ({ ...p, childCount: p.childCount + 1 }))}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-right">
                      <span>نوزاد</span>
                      <div className="flex gap-2 items-center">
                        <button
                          type="button"
                          onClick={() => setTravel((p) => ({ ...p, infantCount: Math.max(0, p.infantCount - 1) }))}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span>{travel.infantCount}</span>
                        <button
                          type="button"
                          onClick={() => setTravel((p) => ({ ...p, infantCount: p.infantCount + 1 }))}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="mt-2 bg-orange-500 text-white rounded-xl py-2 font-medium hover:bg-orange-600"
                      onClick={() => setPassengerDropdown(false)}
                    >
                      تایید
                    </button>
                  </div>
                )}
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="w-full md:w-auto h-14 px-6 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 active:scale-95 transition-all duration-200 flex items-center justify-center col-span-1 md:col-span-1"
              >
                جستجو
              </button>
            </div>
          </>
        )}

        {/* Hotel form */}
        {isHotel && (
          <div className="flex flex-col md:grid md:grid-cols-[1.2fr_1fr_1fr_1fr_auto] gap-4 items-end space-y-3 md:space-y-0">
            <div className="relative w-full md:col-span-1">
              <label className="block text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">شهر</label>
              <input
                type="text"
                placeholder="شهر یا استان"
                value={hotelForm.city || citySearch}
                onChange={(e) => {
                  setCitySearch(e.target.value);
                  setCityDropdown(true);
                  if (!e.target.value) setHotelForm((p) => ({ ...p, city: "" }));
                }}
                onFocus={() => {
                  setCityDropdown(true);
                  setCitySearch("");
                }}
                className={inputBase}
                autoComplete="off"
              />
              <ChevronDown className="absolute left-4 top-[2.6rem] h-4 w-4 text-gray-400 pointer-events-none" />
              {cityDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
                  {filterProvinces(citySearch).map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-gray-100 text-right ${hotelForm.city === p.name ? "font-bold bg-orange-50" : ""}`}
                      onClick={() => {
                        setHotelForm((prev) => ({ ...prev, city: p.name }));
                        setCityDropdown(false);
                        setCitySearch("");
                      }}
                    >
                      <span>{p.icon}</span>
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full">
              <label className="block text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">ورود</label>
              <input
                type="date"
                value={hotelForm.checkIn}
                onChange={(e) => setHotelForm((p) => ({ ...p, checkIn: e.target.value }))}
                className={inputBase}
              />
            </div>
            <div className="w-full">
              <label className="block text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">خروج</label>
              <input
                type="date"
                value={hotelForm.checkOut}
                onChange={(e) => setHotelForm((p) => ({ ...p, checkOut: e.target.value }))}
                className={inputBase}
              />
            </div>
            <div className="w-full">
              <label className="block text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">تعداد مهمان</label>
              <input
                type="number"
                min={1}
                value={hotelForm.guests}
                onChange={(e) => setHotelForm((p) => ({ ...p, guests: Math.max(1, parseInt(e.target.value, 10) || 1) }))}
                className={inputBase}
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto h-14 px-6 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 active:scale-95 transition-all duration-200"
            >
              جستجو
            </button>
          </div>
        )}

        {/* Taxi form */}
        {isTaxi && (
          <div className="flex flex-col md:grid md:grid-cols-[1.2fr_auto_1.2fr_1fr_auto] gap-4 items-end space-y-3 md:space-y-0">
            <div className="relative w-full">
              <label className="block text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">مبدا</label>
              <input
                type="text"
                placeholder="مبدا"
                value={taxiForm.origin || originSearch}
                onChange={(e) => {
                  setOriginSearch(e.target.value);
                  setOriginDropdown(true);
                  if (!e.target.value) setTaxiForm((p) => ({ ...p, origin: "" }));
                }}
                onFocus={() => {
                  setOriginDropdown(true);
                  setOriginSearch("");
                }}
                className={inputBase}
                autoComplete="off"
              />
              <ChevronDown className="absolute left-4 top-[2.6rem] h-4 w-4 text-gray-400 pointer-events-none" />
              {originDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
                  {filterProvinces(originSearch).map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-gray-100 text-right ${taxiForm.origin === p.name ? "font-bold bg-orange-50" : ""}`}
                      onClick={() => {
                        setTaxiForm((prev) => ({ ...prev, origin: p.name }));
                        setOriginDropdown(false);
                        setOriginSearch("");
                      }}
                    >
                      <span>{p.icon}</span>
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-center items-end">
              <button
                type="button"
                onClick={handleTaxiSwap}
                className="bg-white border border-gray-300 rounded-full p-2.5 shadow-sm hover:bg-gray-100 transition-transform duration-300"
                style={{ transform: swapRotate ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <ArrowRightLeft className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="relative w-full">
              <label className="block text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">مقصد</label>
              <input
                type="text"
                placeholder="مقصد"
                value={taxiForm.destination || destinationSearch}
                onChange={(e) => {
                  setDestinationSearch(e.target.value);
                  setDestinationDropdown(true);
                  if (!e.target.value) setTaxiForm((p) => ({ ...p, destination: "" }));
                }}
                onFocus={() => {
                  setDestinationDropdown(true);
                  setDestinationSearch("");
                }}
                className={inputBase}
                autoComplete="off"
              />
              <ChevronDown className="absolute left-4 top-[2.6rem] h-4 w-4 text-gray-400 pointer-events-none" />
              {destinationDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
                  {filterProvinces(destinationSearch).map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-gray-100 text-right ${taxiForm.destination === p.name ? "font-bold bg-orange-50" : ""}`}
                      onClick={() => {
                        setTaxiForm((prev) => ({ ...prev, destination: p.name }));
                        setDestinationDropdown(false);
                        setDestinationSearch("");
                      }}
                    >
                      <span>{p.icon}</span>
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full">
              <label className="block text-xs md:text-sm text-gray-500 mb-1 md:mb-2 text-right">تاریخ</label>
              <input
                type="date"
                value={taxiForm.date}
                onChange={(e) => setTaxiForm((p) => ({ ...p, date: e.target.value }))}
                className={inputBase}
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto h-14 px-6 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 active:scale-95 transition-all duration-200"
            >
              جستجو
            </button>
          </div>
        )}
      </form>

      <Toast message={toastMessage} open={toastOpen} onClose={() => setToastOpen(false)} />
    </>
  );
}
