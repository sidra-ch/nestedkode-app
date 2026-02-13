"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronDown } from "lucide-react";
import useBookingStore from "@/store/useBookingStore";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type Bus = {
  _id: string;
  company: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  currency?: string;
  seats: number;
  seatsAvailable?: number;
  bookedSeats?: number[];
  busType?: string;
};

type Passenger = {
  name: string;
  age: string;
  idNumber: string;
};

const faqItems = [
  { id: 1, question: "What time do buses depart from this route?", answer: "Buses typically depart between 06:00 AM and 21:00 PM from the terminal." },
  { id: 2, question: "Can I cancel my bus ticket?", answer: "Yes, you can cancel your ticket and receive a refund after the cancellation fee is applied." },
  { id: 3, question: "How many minutes before departure should we be at the terminal?", answer: "It is recommended to arrive at least 30 minutes before departure time." },
];

const normalizeTime = (value: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
};

function BusSearchContent() {
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const date = searchParams.get("date") || "";
  const passengersCount = Math.max(Number(searchParams.get("passengers") || 1), 1);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const {
    timeRange,
    setTimeRange,
    typeFilter,
    setTypeFilter,
    activeBusId,
    setActiveBusId,
    selectedSeats,
    setSelectedSeats,
    passengers,
    setPassengers,
    resetSelection,
  } = useBookingStore();

  useEffect(() => {
    if (!origin || !destination) return;
    let cancelled = false;

    const fetchBuses = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set("from", origin);
        params.set("to", destination);
        if (date) params.set("date", date);
        const res = await fetch(`${API_BASE}/api/buses?${params.toString()}`);
        if (!res.ok) {
          throw new Error("FAILED_TO_FETCH_BUSES");
        }
        const data = await res.json();
        if (!cancelled) {
          setBuses(data.items || []);
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError("Could not load buses. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchBuses();
    return () => {
      cancelled = true;
    };
  }, [origin, destination, date]);

  const filteredBuses = useMemo(() => {
    return buses.filter((bus) => {
      const hour = Number(String(bus.departureTime || "").split("T")[1]?.split(":")[0] || String(bus.departureTime).split(":")[0]);
      const matchesTime = Number.isFinite(hour) ? hour >= timeRange[0] && hour <= timeRange[1] : true;
      const matchesType = typeFilter === "all" || (bus.busType || "").toLowerCase() === typeFilter.toLowerCase();
      return matchesTime && matchesType;
    });
  }, [buses, timeRange, typeFilter]);

  const clearSelection = () => {
    resetSelection();
    setActionError(null);
    setBookingId(null);
  };

  const handleSelectBus = (busId: string) => {
    if (activeBusId === busId) {
      setActiveBusId(null);
      clearSelection();
      return;
    }
    setActiveBusId(busId);
    clearSelection();
  };

  const toggleSeat = (seat: number, bookedSeats: number[]) => {
    if (bookedSeats.includes(seat)) return;
    if (selectedSeats.includes(seat)) {
      const nextSeats = selectedSeats.filter((s) => s !== seat);
      setSelectedSeats(nextSeats);
      const nextPassengers = { ...passengers };
      delete nextPassengers[seat];
      setPassengers(nextPassengers);
      setActionError(null);
      return;
    }

    if (selectedSeats.length >= passengersCount) {
      setActionError(`You can select up to ${passengersCount} seats.`);
      return;
    }

    setSelectedSeats([...selectedSeats, seat]);
    setActionError(null);
  };

  const updatePassenger = (seat: number, field: keyof Passenger, value: string) => {
    setPassengers({
      ...passengers,
      [seat]: {
        name: passengers[seat]?.name || "",
        age: passengers[seat]?.age || "",
        idNumber: passengers[seat]?.idNumber || "",
        [field]: value,
      },
    });
  };

  const handleBooking = async (bus: Bus) => {
    setActionError(null);
    setBookingId(null);

    if (selectedSeats.length === 0) {
      setActionError("Please select at least one seat.");
      return;
    }

    const passengerList = selectedSeats.map((seat) => passengers[seat]);
    const hasMissing = passengerList.some((passenger) => !passenger || !passenger.name || !passenger.age || !passenger.idNumber);
    if (hasMissing) {
      setActionError("Please fill passenger information for all selected seats.");
      return;
    }

    setBookingLoading(true);
    try {
      const bookingRes = await fetch(`${API_BASE}/api/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          busId: bus._id,
          seats: selectedSeats,
          passengers: passengerList.map((passenger) => ({
            name: passenger.name,
            age: Number(passenger.age),
            idNumber: passenger.idNumber,
          })),
          totalPrice: bus.price * selectedSeats.length,
          date,
        }),
      });

      if (!bookingRes.ok) {
        const errorData = await bookingRes.json().catch(() => null);
        setActionError(errorData?.error || "Booking failed.");
        return;
      }

      const bookingData = await bookingRes.json();
      setBookingId(bookingData.item?._id || null);

      const paymentRes = await fetch(`${API_BASE}/api/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: bookingData.item?._id,
          totalPrice: bus.price * selectedSeats.length,
        }),
      });

      if (paymentRes.ok) {
        const paymentData = await paymentRes.json();
        if (paymentData?.paymentUrl) {
          window.location.href = paymentData.paymentUrl;
        }
      }
    } catch (submitError) {
      setActionError("Booking failed. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {origin && destination ? `${origin} to ${destination} bus ticket` : "Bus Search Results"}
          </h1>
          {date && <p className="text-gray-600 text-lg">{formatDate(date)}</p>}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Departure time</h3>

              <div className="space-y-4">
                <div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={timeRange[0]}
                    onChange={(e) => setTimeRange([parseInt(e.target.value), timeRange[1]])}
                    className="w-full"
                  />
                </div>
                <div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={timeRange[1]}
                    onChange={(e) => setTimeRange([timeRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-4">
                  <span className="text-sm text-gray-600">{String(timeRange[0]).padStart(2, "0")}:00</span>
                  <span className="text-sm text-gray-600">{String(timeRange[1]).padStart(2, "0")}:00</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Bus type</h4>
                <div className="flex flex-col gap-2">
                  {["all", "VIP", "اقتصادی"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setTypeFilter(type)}
                      className={`rounded-md border px-3 py-2 text-sm text-right ${typeFilter === type ? "border-yellow-500 bg-yellow-50 text-yellow-700" : "border-gray-200 text-gray-600"}`}
                    >
                      {type === "all" ? "All" : type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            {loading && <p className="text-gray-600">Loading buses...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && filteredBuses.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Results: 0</h2>
                <p className="text-gray-600 text-lg mb-6">There are no buses for this date.</p>
                <p className="text-gray-700 mb-6">You can change your departure date.</p>
                <Link href="/bus" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg transition">
                  Change Date
                </Link>
              </div>
            )}

            {!loading && filteredBuses.length > 0 && (
              <div className="space-y-4">
                <p className="text-lg font-semibold text-gray-900 mb-6">Results: {filteredBuses.length}</p>

                {filteredBuses.map((bus) => {
                  const bookedSeats = bus.bookedSeats || [];
                  const seatsAvailable = bus.seatsAvailable ?? Math.max(bus.seats - bookedSeats.length, 0);
                  const showBooking = activeBusId === bus._id;
                  const totalPrice = bus.price * selectedSeats.length;

                  return (
                    <div key={bus._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex-1 w-full">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{bus.company}</h3>
                          <p className="text-sm text-gray-600 mb-4">{bus.busType || "Standard"} • {bus.seats} seats</p>

                          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                            <div>
                              <p className="text-2xl font-bold text-gray-900">{normalizeTime(bus.departureTime)}</p>
                              <p className="text-sm text-gray-600">{bus.origin}</p>
                            </div>

                            <div className="flex-1 max-w-sm w-full">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">{bus.arrivalTime ? "" : ""}</span>
                                <div className="flex-1 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                              </div>
                              <p className="text-xs text-green-600 font-semibold mt-2">{seatsAvailable} seats available</p>
                            </div>

                            <div>
                              <p className="text-2xl font-bold text-gray-900">{normalizeTime(bus.arrivalTime)}</p>
                              <p className="text-sm text-gray-600">{bus.destination}</p>
                            </div>
                          </div>
                        </div>

                        <div className="text-right md:text-left">
                          <p className="text-3xl font-bold text-yellow-500 mb-2">{bus.currency || "$"}{bus.price}</p>
                          <p className="text-xs text-gray-600 mb-4">per person</p>
                          <Link
                            href={`/bus-booking/${bus._id}?date=${date}&passengers=${passengersCount}`}
                            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-lg transition"
                          >
                            Select Seats
                          </Link>
                        </div>
                      </div>

                      {showBooking && (
                        <div className="mt-6 border-t border-gray-200 pt-6">
                          <div className="grid lg:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-lg font-bold text-gray-900 mb-3">Select seats</h4>
                              <p className="text-sm text-gray-600 mb-4">You can select up to {passengersCount} seats.</p>
                              {actionError && <p className="text-sm text-red-500 mb-3">{actionError}</p>}

                              <div className="grid grid-cols-4 gap-2">
                                {Array.from({ length: bus.seats }, (_, index) => {
                                  const seat = index + 1;
                                  const isBooked = bookedSeats.includes(seat);
                                  const isSelected = selectedSeats.includes(seat);
                                  return (
                                    <button
                                      key={seat}
                                      disabled={isBooked}
                                      onClick={() => toggleSeat(seat, bookedSeats)}
                                      className={`rounded-md border px-2 py-2 text-sm font-semibold transition ${
                                        isBooked
                                          ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                                          : isSelected
                                            ? "border-yellow-500 bg-yellow-400 text-black"
                                            : "border-gray-200 bg-white text-gray-700 hover:border-yellow-400"
                                      }`}
                                    >
                                      {seat}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-lg font-bold text-gray-900 mb-3">Passenger info</h4>
                              <div className="space-y-4">
                                {selectedSeats.length === 0 && (
                                  <p className="text-sm text-gray-600">Select seats to enter passenger details.</p>
                                )}

                                {selectedSeats.map((seat) => (
                                  <div key={seat} className="rounded-lg border border-gray-200 p-4">
                                    <p className="text-sm font-semibold text-gray-900 mb-3">Seat {seat}</p>
                                    <div className="grid sm:grid-cols-3 gap-3">
                                      <input
                                        type="text"
                                        placeholder="Name"
                                        value={passengers[seat]?.name || ""}
                                        onChange={(e) => updatePassenger(seat, "name", e.target.value)}
                                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                                      />
                                      <input
                                        type="number"
                                        placeholder="Age"
                                        value={passengers[seat]?.age || ""}
                                        onChange={(e) => updatePassenger(seat, "age", e.target.value)}
                                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                                      />
                                      <input
                                        type="text"
                                        placeholder="ID / Passport"
                                        value={passengers[seat]?.idNumber || ""}
                                        onChange={(e) => updatePassenger(seat, "idNumber", e.target.value)}
                                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-4 flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-gray-600">Total price</p>
                                  <p className="text-lg font-bold text-gray-900">{bus.currency || "$"}{totalPrice}</p>
                                </div>
                                <button
                                  onClick={() => handleBooking(bus)}
                                  disabled={bookingLoading}
                                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg transition disabled:opacity-60"
                                >
                                  {bookingLoading ? "Booking..." : "Proceed to payment"}
                                </button>
                              </div>
                              {bookingId && (
                                <p className="mt-3 text-sm text-green-600">
                                  Booking created. Redirecting to payment...
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Frequently asked questions about {origin && destination ? `${origin} to ${destination} bus` : "bus tickets"}
          </h2>

          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 transition flex items-center justify-between"
                >
                  <span className="text-lg font-bold text-gray-900">{item.id}) {item.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-yellow-500 transition flex-shrink-0 ${expandedFaq === item.id ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedFaq === item.id && (
                  <div className="px-6 pb-4 pt-2 border-t border-gray-200">
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            Buying {origin && destination ? `${origin} to ${destination}` : ""} bus tickets has never been easier. Buying bus tickets from Alibaba, the number one online ticket seller, at the best price, will not take more than two minutes. You can see the schedule and different bus companies for this route here. Of course, note that the price of bus tickets can vary depending on the day and time you choose. It is possible to easily buy bus tickets online and for other routes from all terminals and from all bus companies such as Afghan Golf, Kalidi Travel, Aman Transport, and Shah Trans on Alibaba.
          </p>
        </div>
      </div>
    </>
  );
}

export default function BusInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <BusSearchContent />
      </Suspense>
      <Footer />
    </div>
  );
}
