import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Hotel from "@/models/Hotel";
import Booking from "@/models/Booking";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");

    // Basic query
    let query: any = {};
    if (city) {
      query.city = { $regex: new RegExp(city, "i") };
    }

    const hotels = await Hotel.find(query).sort({ rating: -1 }).lean();

    // PRODUCTION HARDENING: Filter rooms based on active holds/bookings
    // 1. Get all active bookings/holds for these hotels
    const hotelIds = hotels.map(h => h._id.toString());
    const activeBookings = await Booking.find({
      "tripDetails.hotelId": { $in: hotelIds },
      bookingStatus: { $ne: "cancelled" },
      holdExpiresAt: { $gt: new Date() } // Only count if not expired
    }).lean();

    // 2. Adjust availableRooms in memory for this search
    const hotelsWithAvailability = hotels.map((hotel: any) => {
      if (!hotel.rooms) return hotel;

      const refinedRooms = hotel.rooms.map((room: any) => {
        const heldCount = activeBookings.filter(b =>
          b.tripDetails.hotelId === hotel._id.toString() &&
          b.tripDetails.roomId === (room._id || room.roomType)
        ).length;

        return {
          ...room,
          availableRooms: Math.max(0, room.availableRooms - heldCount)
        };
      });

      return { ...hotel, rooms: refinedRooms };
    });

    return NextResponse.json({ success: true, hotels: hotelsWithAvailability });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch hotels" }, { status: 500 });
  }
}
