import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import Hotel from "@/models/Hotel";
import { generateBookingReference } from "@/lib/helpers";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const user = getUserFromRequest(request);

        // In a production app, we require auth. 
        // For now, if no user, we might allow guest but with session tracking.
        // Let's assume auth is required for booking as part of the SaaS hardening.
        if (!user) {
            return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
        }

        const {
            hotelId,
            roomId,
            checkIn,
            checkOut,
            guests,
            travelers,
            contact,
            paymentMethod,
            totalAmount
        } = await request.json();

        // 1. Validate availability again during booking (Double check for race conditions)
        const hotel = await Hotel.findById(hotelId).lean();
        if (!hotel) return NextResponse.json({ success: false, message: "Hotel not found" }, { status: 404 });

        const room = (hotel.rooms as any[]).find(r => r._id?.toString() === roomId || r.roomType === roomId);
        if (!room) return NextResponse.json({ success: false, message: "Room not found" }, { status: 404 });

        const activeHolds = await Booking.countDocuments({
            "tripDetails.hotelId": hotelId,
            "tripDetails.roomId": roomId,
            bookingStatus: { $in: ["seat_held", "pending_payment", "pending_verification", "confirmed"] },
            holdExpiresAt: { $gt: new Date() }
        });

        if (activeHolds >= room.availableRooms) {
            return NextResponse.json({ success: false, message: "No rooms available for these dates" }, { status: 400 });
        }

        // 2. Create Booking with seat_held status
        const bookingReference = generateBookingReference();
        const holdExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minute hold

        const booking = await Booking.create({
            bookingReference,
            bookingType: "HOTEL",
            userId: user.userId,
            tripDetails: {
                from: "N/A", // Not applicable for hotel
                to: hotel.city,
                departureDate: new Date(checkIn),
                returnDate: new Date(checkOut),
                hotelId,
                roomId
            },
            travelers,
            contact,
            paymentMethod,
            paymentStatus: "unpaid",
            bookingStatus: "seat_held",
            totalAmount,
            currency: "AFN",
            holdExpiresAt
        });

        return NextResponse.json({
            success: true,
            message: "Room held successfully",
            bookingId: booking._id,
            bookingReference,
            expiresAt: holdExpiresAt
        });

    } catch (error: any) {
        console.error("Hotel booking error:", error);
        return NextResponse.json({ success: false, message: "Failed to create booking" }, { status: 500 });
    }
}
