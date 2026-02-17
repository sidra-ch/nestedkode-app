"use client";

import { useState } from "react";
import { MapPin, Clock, Users, Search } from "lucide-react";

export default function TaxiForm() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengerCount, setPassengerCount] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can replace this with your actual search logic or API call
    alert(
      `Pickup: ${pickup}\nDestination: ${destination}\nDate: ${date}\nTime: ${time}\nPassengers: ${passengerCount}`
    );
  };

  return (
    <form
      className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Pickup Location */}
        <div className="flex-1 w-full">
          <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <MapPin className="w-5 h-5 text-gray-500" />
            Pickup Location
          </label>
          <input
            type="text"
            placeholder="Enter pickup location"
            value={pickup}
            onChange={e => setPickup(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          />
        </div>
        {/* Destination */}
        <div className="flex-1 w-full">
          <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <MapPin className="w-5 h-5 text-gray-500" />
            Destination
          </label>
          <input
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={e => setDestination(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Date */}
        <div className="flex-1 w-full">
          <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Clock className="w-5 h-5 text-gray-500" />
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          />
        </div>
        {/* Time */}
        <div className="flex-1 w-full">
          <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Clock className="w-5 h-5 text-gray-500" />
            Time
          </label>
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          />
        </div>
        {/* Passengers */}
        <div className="flex-1 w-full">
          <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Users className="w-5 h-5 text-gray-500" />
            Passengers
          </label>
          <select
            value={passengerCount}
            onChange={e => setPassengerCount(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          >
            {[...Array(8)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1} Passenger{i === 0 ? "" : "s"}</option>
            ))}
          </select>
        </div>
        {/* Search Button */}
        <div className="flex items-end justify-end w-full md:w-auto mt-4 md:mt-0">
          <button
            type="submit"
            className="px-8 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition text-base shadow-md flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
