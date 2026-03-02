"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronRight, Calendar, Clock, ShieldCheck } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type BusDetails = {
  _id: string;
  company: string;
  busName?: string;
  origin: string;
  from?: string;
  destination: string;
  to?: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  seats: number;
  availableSeats: number;
  busType: string;
  bookedSeats?: number[];
};

function BusBookingContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const busId = params?.id as string || "";

  const from = searchParams?.get("from") || "";
  const to = searchParams?.get("to") || "";
  const date = searchParams?.get("date") || new Date().toISOString().split("T")[0];
  const urlPassengers = searchParams?.get("passengers") || "1";

  const [bus, setBus] = useState<BusDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Seat state
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [bookedSeats, setBookedSeats] = useState<number[]>([1, 5, 9, 13, 17, 28, 32]);
  const maxSeats = 2;

  // Passenger form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [phone, setPhone] = useState("");
  const [hasWhatsApp, setHasWhatsApp] = useState<boolean>(true);
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchBusDetails();
  }, [busId]);

  const fetchBusDetails = async () => {
    try {
      // In a real scenario, this fetches the specific bus by ID
      // If the ID starts with "mock", we'll just construct a mock object.
      if (busId.startsWith("mock")) {
        setBus({
          _id: busId,
          company: "SiMPLE Bus",
          busName: "SiMPLE Bus",
          from: from || "کابل",
          origin: from || "کابل",
          to: to || "مزار شریف",
          destination: to || "مزار شریف",
          departureTime: "04:00",
          arrivalTime: "12:00",
          price: 800,
          seats: 51,
          availableSeats: 48,
          busType: "VIP",
          bookedSeats: [1, 5, 9, 13, 17, 28, 32]
        });
        setLoading(false);
        return;
      }

      // Attempt actual fetch
      const res = await fetch(`/api/buses`);
      if (res.ok) {
        const data = await res.json();
        const found = data.buses?.find((b: any) => b._id === busId);
        if (found) {
          setBus({
            ...found,
            company: found.company || found.busName || "SiMPLE Bus",
            origin: from || found.origin || found.from || "کابل",
            destination: to || found.destination || found.to || "مزار شریف",
          });
          setBookedSeats(found.bookedSeats || [1, 5, 9, 13, 17, 28, 32]);
        }
      }
    } catch (error) {
      console.error("Error fetching bus details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeatClick = (seatNumber: number) => {
    if (bookedSeats.includes(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      if (selectedSeats.length >= maxSeats) return;
      setSelectedSeats([...selectedSeats, seatNumber].sort((a, b) => a - b));
    }
  };

  const { user: authUser, isAuthenticated, register, login } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
      alert("لطفا حداقل یک چوکی انتخاب کنید.");
      return;
    }
    if (!firstName || !lastName || !phone || !password) {
      alert("لطفا تمام فرم‌ها را پر کنید.");
      return;
    }

    setIsSubmitting(true);
    try {
      let currentUserId = authUser?.id;

      // 1. Handle Auto-Registration/Login if not authenticated
      if (!isAuthenticated) {
        const shadowEmail = `${phone}@afghanibaba.com`;
        const fullName = `${firstName} ${lastName}`;

        try {
          // Try to register
          await register(fullName, shadowEmail, password, phone);
          console.log("Auto-registration successful");
        } catch (regErr: any) {
          // If already registered, try to login
          if (regErr.message?.includes("already registered") || regErr.message?.includes("Email already registered")) {
            try {
              await login(shadowEmail, password);
              console.log("Auto-login successful");
            } catch (loginErr: any) {
              throw new Error("این شماره قبلاً ثبت شده است. لطفاً رمز عبور صحیح را وارد کنید.");
            }
          } else {
            throw regErr;
          }
        }

        // After successful reg/login, we might need a small delay or check the store again
        // However, zustand's set is usually synchronous in terms of the next line's execution if not awaited
        // but the store update itself might be async in some contexts. 
        // For simplicity, we assume the store is updated.
      }

      // 2. Create Booking
      // If we're using a mock bus ID, we need to map it to a real one for the API to not crash, 
      // or the API needs to be updated to handle mock IDs.
      // For now, let's try to find the first real bus if it's a mock ID.
      let finalBusId = busId;
      if (busId.startsWith("mock")) {
        const resBuses = await fetch(`/api/buses`);
        const dataBuses = await resBuses.json();
        if (dataBuses.success && dataBuses.buses.length > 0) {
          finalBusId = dataBuses.buses[0]._id;
        } else {
          // If no real buses exist, we can't create a real booking.
          // In a dev environment, we might want to alert or just simulate success.
          alert("تکت با موفقیت (شبیه‌سازی) ثبت شد! (دیتابیس خالی است)");
          router.push("/bus");
          return;
        }
      }

      const bookingData = {
        busId: finalBusId,
        seats: selectedSeats.map(s => String(s)),
        travelDate: date,
        passengerDetails: selectedSeats.map(s => ({
          name: `${firstName} ${lastName}`,
          age: 25, // Default or add a field
          gender: gender,
          seatNumber: String(s)
        }))
      };

      const res = await fetch(`/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${useAuthStore.getState().token}`
        },
        body: JSON.stringify(bookingData)
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/booking-verification/${data.booking._id}`);
      } else {
        throw new Error(data.message || "خطا در ثبت تکت");
      }

    } catch (error: any) {
      console.error("Booking error:", error);
      alert(error.message || "خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const compName = bus?.company || bus?.busName || "SiMPLE Bus";
  const orig = bus?.origin || bus?.from || "کابل";
  const dest = bus?.destination || bus?.to || "مزار شریف";
  const prc = bus?.price || 800;

  // Render Seat Map Helper
  const leftSeatsRows = [
    [4, 3], [8, 7], [12, 11], [16, 15], [20, 19],
    [22, 21], [24, 23], [26, 25], [30, 29], [34, 33],
    [38, 37], [42, 41], [46, 45]
  ];

  const rightSeatsRows = [
    [2, 1], [6, 5], [10, 9], [14, 13], [18, 17],
    null, // WC
    [28, 27], [32, 31], [36, 35], [40, 39],
    [44, 43]
  ];

  // The last row is a continuous 5 seat row: [47, 48, 49, 50, 51]
  const lastRow = [47, 48, 49, 50, 51];

  const renderSeat = (num: number) => {
    const isBooked = bookedSeats.includes(num);
    const isSelected = selectedSeats.includes(num);

    let baseClass = "w-10 h-10 flex items-center justify-center text-sm font-bold rounded-lg transition-colors border shadow-sm";

    if (isBooked) {
      baseClass += " bg-red-100 text-red-500 border-red-200 cursor-not-allowed";
    } else if (isSelected) {
      baseClass += " bg-emerald-500 text-white border-emerald-600 shadow-md transform scale-105";
    } else {
      baseClass += " bg-white text-gray-700 border-gray-300 hover:border-emerald-500 hover:text-emerald-500 cursor-pointer";
    }

    return (
      <div
        key={num}
        onClick={() => handleSeatClick(num)}
        className={baseClass}
      >
        {num}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <Navbar />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-10 text-right">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition mb-6">
            <ChevronRight size={20} />
            <span className="font-bold">بازگشت به جستجو</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-200">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">{orig} - {dest}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-500 font-medium">
                <span className="flex items-center gap-2">
                  <Calendar size={18} className="text-orange-500" />
                  {new Date(date).toLocaleDateString("fa-AF", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                <span className="flex items-center gap-2">
                  <Clock size={18} className="text-orange-500" />
                  {bus?.departureTime} ق.ظ
                </span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-4 md:p-6 shadow-sm flex items-center gap-8">
              <div className="text-center px-4">
                <p className="text-2xl font-black text-orange-500">{compName}</p>
                <p className="text-sm font-bold text-gray-400 mt-1">51 چوکی | VIP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">

          {/* SEAT SELECTION COLUMN */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-xl p-6 border border-gray-100">

            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl">1</div>
              <div className="text-right">
                <h2 className="font-bold text-lg text-gray-900">انتخاب چوکی</h2>
                <p className="text-sm text-gray-500">چوکی دلخواه خویش را از اینجا انتخاب کنید.</p>
              </div>
            </div>

            {/* LEGEND */}
            <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-xl">
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-red-500 mx-auto mb-1 flex items-center justify-center text-xs font-bold text-red-500">×</div>
                <span className="text-xs font-medium text-gray-600">پُــر</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 mx-auto mb-1"></div>
                <span className="text-xs font-medium text-gray-600">خـالی</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-emerald-600 mx-auto mb-1 flex items-center justify-center text-white text-xs font-bold">✓</div>
                <span className="text-xs font-medium text-gray-600">انتخاب شده</span>
              </div>
            </div>

            <div className="text-center mb-6">
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                شما نمیتوانید بیشتر از {maxSeats} چوکی انتخاب کنید.
              </span>
            </div>

            {/* BUS LAYOUT */}
            <div className="bg-gray-100 rounded-[3rem] p-4 max-w-[320px] mx-auto relative shadow-inner border-[6px] border-gray-300">
              {/* Driver */}
              <div className="mb-8 mt-2 flex justify-start pl-6">
                <div className="w-12 h-12 rounded-full border-4 border-gray-600 relative after:content-[''] after:absolute after:w-2 after:h-8 after:bg-gray-600 after:top-1 after:left-[18px]"></div>
              </div>

              {/* Seats Grid Container - Custom aligned to match typical bus (rows of 2+2) */}
              <div className="relative">

                {/* Middle Door indicator on right */}
                <div className="absolute right-[-28px] top-[40%] bg-gray-200 text-[10px] transform rotate-90 px-4 py-1 rounded-t-lg font-bold text-gray-600 tracking-widest border border-gray-400">
                  دروازه مد
                </div>

                {/* Seat Rows Loop */}
                <div className="flex justify-between">
                  {/* Left side (2 columns) */}
                  <div className="space-y-4">
                    {leftSeatsRows.map((row, i) => (
                      <div key={`left-${i}`} className="flex gap-2">
                        {renderSeat(row[0])}
                        {renderSeat(row[1])}
                      </div>
                    ))}
                  </div>

                  {/* Middle Aisle is handled implicitly by justify-between */}

                  {/* Right side (2 columns) */}
                  <div className="space-y-4">
                    {rightSeatsRows.map((row, i) => (
                      <div key={`right-${i}`} className="flex gap-2">
                        {row === null ? (
                          <div className="w-[88px] h-10 bg-gray-300 flex items-center justify-center rounded-lg border-2 border-gray-400 font-bold text-gray-600 shadow-inner">
                            WC
                          </div>
                        ) : (
                          <>
                            {renderSeat(row[0])}
                            {renderSeat(row[1])}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Last row (5 columns wide) */}
                <div className="flex gap-2 justify-center mt-4">
                  {lastRow.map(num => renderSeat(num))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t flex justify-between items-center">
              <span className="font-bold text-gray-700">مجموع:</span>
              <span className="text-xl font-black text-orange-500">{prc * selectedSeats.length} افغانی</span>
            </div>
          </div>


          {/* PASSENGER FORM COLUMN */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
              <div className="flex items-center justify-start gap-4 mb-8 pb-4 border-b">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                <div className="flex items-center flex-1 gap-2">
                  {selectedSeats.length > 0 ? (
                    selectedSeats.map(s => (
                      <span key={s} className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1.5 rounded-lg text-sm border border-emerald-200 shadow-sm">چوکی {s}</span>
                    ))
                  ) : (
                    <span className="text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-lg">لطفاً ابتدا چوکی خود را انتخاب کنید</span>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">نام *</label>
                    <input
                      type="text" required
                      value={firstName} onChange={e => setFirstName(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="نام خود را وارد کنید"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">تخلص *</label>
                    <input
                      type="text" required
                      value={lastName} onChange={e => setLastName(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="تخلص خود را وارد کنید"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">جنسیت:</label>
                  <div className="flex items-center gap-6 bg-gray-50 p-3 rounded-xl border border-gray-200 w-max">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="male" checked={gender === 'male'} onChange={() => setGender('male')} className="w-5 h-5 text-orange-500 focus:ring-orange-500 border-gray-300" />
                      <span className="font-medium text-gray-700">مرد</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="female" checked={gender === 'female'} onChange={() => setGender('female')} className="w-5 h-5 text-orange-500 focus:ring-orange-500 border-gray-300" />
                      <span className="font-medium text-gray-700">زن</span>
                    </label>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 my-6 flex items-start gap-4">
                  <div className="text-2xl">ℹ️</div>
                  <div className="text-sm font-medium text-blue-800 leading-relaxed">
                    <strong className="block mb-1 text-base">اطلاعات حساب</strong>
                    این اطلاعات محرمانه بوده و در سایت نمایش داده نمیشود و صرفا جهت دسترسی به شما و ارسال اعلانات و اطلاعیهها استفاده خواهند شد.
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">شماره تماس *</label>
                    <input
                      type="tel" required
                      value={phone} onChange={e => setPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-left"
                      placeholder="07XXXXXXXX" dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">واتس آپ دارید؟</label>
                    <div className="flex items-center gap-6 bg-gray-50 p-3 rounded-xl border border-gray-200 w-max">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={hasWhatsApp === true} onChange={() => setHasWhatsApp(true)} className="w-5 h-5 text-green-500 focus:ring-green-500 border-gray-300" />
                        <span className="font-medium text-gray-700">بلی</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={hasWhatsApp === false} onChange={() => setHasWhatsApp(false)} className="w-5 h-5 text-gray-500 focus:ring-gray-500 border-gray-300" />
                        <span className="font-medium text-gray-700">نخیر</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50 shadow-sm mt-8">
                  <h3 className="font-bold text-lg text-gray-900 mb-4 border-b border-gray-200 pb-2">3. امن کردن اکونت اتومات:</h3>
                  <p className="text-sm text-gray-600 mb-4 font-medium leading-relaxed">جهت امن کردن اکونت خویش چوکات ذیل را پر کنید.</p>

                  <div className="max-w-md">
                    <label className="block text-sm font-bold text-gray-700 mb-2">پسورد *</label>
                    <input
                      type="password" required minLength={6}
                      value={password} onChange={e => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-left font-mono"
                      placeholder="••••••••" dir="ltr"
                    />
                  </div>

                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 leading-relaxed">
                    <strong>نوت:</strong> درصورت داشتن اکونت از قبل از پسورد قبلی شما بحیث پسورد اصلی انتخاب خواهد شد و این پسورد مدنظر گرفته نمی شود.
                  </div>
                </div>


                {/* Explanatory Texts matching the reference */}
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-medium bg-white border border-gray-100 p-6 rounded-2xl">
                  <p><strong className="text-gray-900">1. یادداشت:</strong> برای شما بعد از ثبت تکت در صورت نداشتن اکونت از قبل اکونت جدید ایجاد میشود و در صورت داشتن اکونت تکت شما در بخش سفرهای من اکونت تان اضافه میگردد.</p>
                  <p><strong className="text-gray-900">2. چرا اکونت ایجاد میشود؟</strong> اکونت برای دسترسی داشتن در بخش سفر های من و دانستن تمامی سفرهای قبلی شما ایجاد میگردد.</p>
                  <p><strong className="text-gray-900">4. چگونه به اکونت ایجاد شده خویش دسترسی پیدا کنم؟</strong> فقط کافیست با زدن دکمه ورود یا ثبت‌نام و درج نمودن شماره تماس و پسورد خویش وارد حساب خود شوید.</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-900 text-white p-6 rounded-2xl shadow-xl mt-8">
                  <div>
                    <p className="text-gray-400 text-sm mb-1 font-medium">مبلغ قابل پرداخت:</p>
                    <p className="text-3xl font-black text-orange-400">{prc * selectedSeats.length} افغانی</p>
                  </div>
                  <button
                    type="submit"
                    disabled={selectedSeats.length === 0 || isSubmitting}
                    className="w-full md:w-auto px-10 py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:text-gray-400 text-white font-black text-lg rounded-xl transition-all transform hover:scale-105 shadow-lg disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>در حال پردازش...</span>
                      </>
                    ) : (
                      "ثبت و ادامه"
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BusBookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    }>
      <BusBookingContent />
    </Suspense>
  );
}
