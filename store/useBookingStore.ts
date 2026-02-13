import { create } from "zustand";
import { persist } from "zustand/middleware";

type Passenger = {
  name: string;
  age: string;
  idNumber: string;
};

type BookingState = {
  activeBusId: string | null;
  selectedSeats: number[];
  passengers: Record<number, Passenger>;
  timeRange: [number, number];
  typeFilter: string;
  setActiveBusId: (busId: string | null) => void;
  setSelectedSeats: (seats: number[]) => void;
  setPassengers: (passengers: Record<number, Passenger>) => void;
  setTimeRange: (range: [number, number]) => void;
  setTypeFilter: (filter: string) => void;
  resetSelection: () => void;
};

const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      activeBusId: null,
      selectedSeats: [],
      passengers: {},
      timeRange: [0, 24],
      typeFilter: "all",
      setActiveBusId: (busId) => set({ activeBusId: busId }),
      setSelectedSeats: (seats) => set({ selectedSeats: seats }),
      setPassengers: (passengers) => set({ passengers }),
      setTimeRange: (range) => set({ timeRange: range }),
      setTypeFilter: (filter) => set({ typeFilter: filter }),
      resetSelection: () => set({ selectedSeats: [], passengers: {} }),
    }),
    {
      name: "bus-booking-store",
      partialize: (state) => ({
        selectedSeats: state.selectedSeats,
        passengers: state.passengers,
      }),
    }
  )
);

export default useBookingStore;
