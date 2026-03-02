"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronRight, Calendar, Clock, ShieldCheck, User } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import { t, getCurrentLanguage } from "@/lib/i18n";

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

  const { user: authUser, isAuthenticated, register, login } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lang, setLang] = useState<any>('fa');

  useEffect(() => {
    setLang(getCurrentLanguage());
  }, []);

  // Pre-fill user data if authenticated
  useEffect(() => {
    if (isAuthenticated && authUser) {
      if (authUser.name) {
        const parts = authUser.name.split(" ");
        setFirstName(parts[0] || "");
        setLastName(parts.slice(1).join(" ") || "");
      }
      if (authUser.phone) {
        setPhone(authUser.phone);
      } else if (authUser.email && authUser.email.includes("@")) {
        const emailParts = authUser.email.split("@");
        if (emailParts[0] && /^\d+$/.test(emailParts[0])) {
          setPhone(emailParts[0]);
        }
      }
    }
  }, [isAuthenticated, authUser]);

  useEffect(() => {
    fetchBusDetails();
  }, [busId]);

  const fetchBusDetails = async () => {
    try {
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

  const compName = bus?.company || bus?.busName || "SiMPLE Bus";
  const orig = bus?.origin || bus?.from || "کابل";
  const dest = bus?.destination || bus?.to || "مزار شریف";
  const prc = bus?.price || 800;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
      alert(t('bus.error.select.seat', lang));
      return;
    }

    console.log("Submitting booking:", {
      firstName,
      phone,
      lastName,
      password,
      isAuthenticated,
      selectedSeats
    });

    const isMissingData = !firstName.trim() || !phone.trim() || (!isAuthenticated && (!lastName.trim() || !password));
    if (isMissingData) {
      const missingFields = [];
      if (!firstName.trim()) missingFields.push(t('bus.first.name', lang));
      if (!phone.trim()) missingFields.push(t('bus.phone', lang));
      if (!isAuthenticated && !lastName.trim()) missingFields.push(t('bus.last.name', lang));
      if (!isAuthenticated && !password) missingFields.push(t('bus.password', lang));

      console.log("Missing fields detected:", missingFields);
      const msg = t('bus.error.fill.fields', lang).replace('{fields}', missingFields.join(lang === 'en' ? ", " : "، "));
      alert(msg);
      return;
    }

    setIsSubmitting(true);
    try {
      if (!isAuthenticated) {
        if (!password) {
          alert(t('bus.error.choose.password', lang));
          setIsSubmitting(false);
          return;
        }

        const shadowEmail = `${phone}@afghanibaba.com`;
        const fullName = `${firstName} ${lastName}`;

        try {
          await register(fullName, shadowEmail, password, phone);
        } catch (regErr: any) {
          if (regErr.message?.includes("already registered")) {
            try {
              await login(shadowEmail, password);
            } catch (loginErr: any) {
              throw new Error(t('bus.error.phone.registered', lang));
            }
          } else {
            throw regErr;
          }
        }
      }

      const currentState = useAuthStore.getState();
      const currentAuthUser = currentState.user;
      const currentIsAuthenticated = currentState.isAuthenticated;

      const bookingData = {
        bookingType: "BUS",
        tripDetails: {
          from: orig,
          to: dest,
          departureDate: date,
          busId: bus?._id || busId
        },
        travelers: selectedSeats.map(s => ({
          fullName: `${firstName} ${lastName}`,
          gender: gender.toUpperCase(),
          dateOfBirth: "1995-01-01",
          seatNumber: String(s)
        })),
        contact: {
          phone: phone,
          email: currentIsAuthenticated ? currentAuthUser?.email : `${phone}@afghanibaba.com`,
          whatsapp: hasWhatsApp ? phone : undefined
        },
        totalAmount: prc * selectedSeats.length,
        paymentMethod: "OFFICE"
      };

      const res = await fetch(`/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentState.token}`
        },
        body: JSON.stringify(bookingData)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        if (errorData.errors) {
          const errorMsg = Object.entries(errorData.errors).map(([f, m]) => `${f}: ${m}`).join("\n");
          throw new Error(errorMsg);
        }
        throw new Error(errorData.message || (lang === 'en' ? "Booking failed" : "خطا در ثبت تکت"));
      }

      const data = await res.json();
      if (data.success && data.bookingReference) {
        router.push(`/booking/confirmation/${data.bookingReference}`);
      } else {
        throw new Error(data.message || (lang === 'en' ? "Booking failed" : "خطا در ثبت تکت"));
      }
    } catch (error: any) {
      alert(error.message || (lang === 'en' ? "Error occurred. Please try again." : "خطایی رخ داد. لطفاً دوباره تلاش کنید."));
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

  const leftSeatsRows = [
    [4, 3], [8, 7], [12, 11], [16, 15], [20, 19],
    [22, 21], [24, 23], [26, 25], [30, 29], [34, 33],
    [38, 37], [42, 41], [46, 45]
  ];
  const rightSeatsRows = [
    [2, 1], [6, 5], [10, 9], [14, 13], [18, 17],
    null, [28, 27], [32, 31], [36, 35], [40, 39], [44, 43]
  ];
  const lastRow = [47, 48, 49, 50, 51];

  const renderSeat = (num: number) => {
    const isBooked = bookedSeats.includes(num);
    const isSelected = selectedSeats.includes(num);
    let baseClass = "w-10 h-10 flex items-center justify-center text-sm font-bold rounded-lg transition-colors border shadow-sm";
    if (isBooked) baseClass += " bg-red-100 text-red-500 border-red-200 cursor-not-allowed";
    else if (isSelected) baseClass += " bg-emerald-500 text-white border-emerald-600 shadow-md transform scale-105";
    else baseClass += " bg-white text-gray-700 border-gray-300 hover:border-emerald-500 hover:text-emerald-500 cursor-pointer";
    return (
      <div key={num} onClick={() => handleSeatClick(num)} className={baseClass}>{num}</div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition mb-4">
            <ChevronRight size={20} className={lang === 'en' ? 'rotate-180' : ''} />
            <span className="font-bold">{t('bus.back.to.search', lang)}</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-200 mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">{orig} - {dest}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-500 font-medium">
              <span className="flex items-center gap-2">
                <Calendar size={18} className="text-orange-500" />
                {new Date(date).toLocaleDateString(lang === 'en' ? 'en-US' : (lang === 'ps' ? 'ps-AF' : 'fa-AF'), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
              <span className="flex items-center gap-2">
                <Clock size={18} className="text-orange-500" />
                {bus?.departureTime} {parseInt((bus?.departureTime || '0').split(':')[0]) < 12 ? t('bus.am', lang) : t('bus.pm', lang)}
              </span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-4 md:p-6 shadow-sm flex items-center gap-8">
            <div className="text-center px-4">
              <p className="text-2xl font-black text-orange-500">{compName}</p>
              <p className="text-sm font-bold text-gray-400 mt-1">{bus?.seats || 51} {t('bus.seats.count', lang)} | {t('bus.vip', lang)}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4 text-sm font-bold">
            <div className="flex items-center gap-2 text-orange-600">
              <span className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center">1</span>
              <span>{t('bus.select.seat', lang)}</span>
            </div>
            <div className="w-16 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">2</span>
              <span>{t('bus.passenger.info', lang)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-6">
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                {t('bus.select.seat', lang)}
              </h2>
              <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-xl text-[10px] font-bold">
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-white border border-gray-300 rounded-full"></div>{t('bus.status.available', lang)}</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-100 border border-red-200 rounded-full"></div>{t('bus.status.booked', lang)}</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div>{t('bus.status.selected', lang)}</div>
              </div>

              <div className="text-center mb-6">
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                  {t('bus.seats.limit', lang).replace('{max}', String(maxSeats))}
                </span>
              </div>

              <div className="bg-gray-100 rounded-[3rem] p-4 max-w-[280px] mx-auto border-[6px] border-gray-300 shadow-inner">
                <div className="mb-8 mt-2 flex justify-start pl-6">
                  <div className="w-10 h-10 rounded-full border-4 border-gray-600 relative after:content-[''] after:absolute after:w-1 after:h-6 after:bg-gray-600 after:top-1 after:left-[14px]"></div>
                </div>
                <div className="flex justify-between">
                  <div className="space-y-3">
                    {leftSeatsRows.map((row, i) => (<div key={i} className="flex gap-2">{renderSeat(row[0])}{renderSeat(row[1])}</div>))}
                  </div>
                  <div className="space-y-3">
                    {rightSeatsRows.map((row, i) => (
                      <div key={i} className="flex gap-2">
                        {row === null ? <div className="w-[88px] h-10 bg-gray-300 rounded-lg flex items-center justify-center font-bold text-xs text-gray-500">WC</div> : <>{renderSeat(row[0])}{renderSeat(row[1])}</>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 justify-center mt-3">{lastRow.map(n => renderSeat(n))}</div>
              </div>

              <div className="mt-8 pt-4 border-t flex justify-between items-center font-bold">
                <span>{lang === 'en' ? 'Total' : 'مجموع'}:</span>
                <span className="text-xl text-orange-500">{prc * selectedSeats.length} {t('bus.currency', lang)}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-orange-500" />
                {t('bus.passenger.info', lang)}
              </h2>

              <div className={`${isAuthenticated ? 'bg-green-50' : 'bg-blue-50'} border rounded-2xl p-4 mb-8 flex gap-4`}>
                <div className="text-2xl">{isAuthenticated ? '✅' : 'ℹ️'}</div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <strong className="font-bold">{t('bus.account.info', lang)}</strong>
                    {isAuthenticated ? <span className="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full">{t('bus.verified', lang)}</span> : <Link href="/login" className="text-blue-600 underline text-xs font-bold">{t('bus.login.prompt', lang)}</Link>}
                  </div>
                  <p className="text-sm">
                    {isAuthenticated ? t('bus.verified.desc', lang) : t('bus.confidential.desc', lang)}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">{t('bus.first.name', lang)} *</label>
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} disabled={isAuthenticated} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">{t('bus.last.name', lang)} *</label>
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} disabled={isAuthenticated} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">{t('bus.phone', lang)} *</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} disabled={isAuthenticated} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-left" dir="ltr" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">{t('bus.gender', lang)}</label>
                    <div className="flex gap-4">
                      <button type="button" onClick={() => setGender('male')} className={`flex-1 py-3 rounded-xl font-bold border transition ${gender === 'male' ? 'bg-orange-500 text-white' : 'bg-gray-50'}`}>{t('bus.male', lang)}</button>
                      <button type="button" onClick={() => setGender('female')} className={`flex-1 py-3 rounded-xl font-bold border transition ${gender === 'female' ? 'bg-pink-500 text-white' : 'bg-gray-50'}`}>{t('bus.female', lang)}</button>
                    </div>
                  </div>
                </div>

                {!isAuthenticated && (
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mt-8">
                    <h3 className="font-bold mb-4">{t('bus.secure.account', lang)}</h3>
                    <p className="text-sm text-gray-600 mb-4">{t('bus.secure.desc', lang)}</p>
                    <div className="max-w-md">
                      <label className="block text-sm font-bold mb-2">{t('bus.password', lang)} *</label>
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3" placeholder="••••••••" dir="ltr" />
                    </div>
                    <p className="text-[10px] text-orange-600 mt-2 font-bold italic">
                      {t('bus.existing.account.note', lang)}
                    </p>
                  </div>
                )}

                <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-medium bg-gray-50 border border-gray-100 p-6 rounded-2xl mt-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <p><strong className="text-gray-900">{t('bus.note.title', lang)}:</strong> {t('bus.note.1', lang)}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <p><strong className="text-gray-900">{t('bus.note.2.title', lang)}</strong> {t('bus.note.2.content', lang)}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <p><strong className="text-gray-900">{t('bus.note.3.title', lang)}</strong> {t('bus.note.3.content', lang)}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-900 text-white p-6 rounded-2xl mt-12 shadow-xl">
                  <div>
                    <p className="text-gray-400 text-sm">{t('bus.total.payable', lang)}</p>
                    <p className="text-3xl font-black text-orange-400">{prc * selectedSeats.length} {t('bus.currency', lang)}</p>
                  </div>
                  <button type="submit" disabled={selectedSeats.length === 0 || isSubmitting} className="w-full md:w-auto px-12 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl transition-all disabled:bg-gray-600">
                    {isSubmitting ? "..." : t('bus.confirm.booking', lang)}
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
