import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import FlightBooking from "@/models/FlightBooking";
import Flight from "@/models/Flight";
import { getUserFromRequest } from "@/lib/auth";

// POST /api/flight-bookings - Create a flight reservation
export async function POST(request: NextRequest) {
    try {
        const user = getUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const body = await request.json();
        const { flightId, passengerDetails, contactPhone, contactEmail, totalPrice } = body;

        // Fetch flight details
        const flight = await Flight.findById(flightId);

        // Fallback for mock flights
        const flightData = flight || {
            airline: "Kam Air",
            flightNumber: "RQ-101",
            from: "Kabul",
            to: "Istanbul",
            departureTime: new Date(),
            arrivalTime: new Date(Date.now() + 7200000),
            Price: 25000,
            class: "economy",
            vendorId: null
        };

        const newBooking = await FlightBooking.create({
            userId: user.userId,
            userName: (user as any).name || "User",
            userEmail: user.email,
            flightId: flightId,
            airline: flightData.airline,
            flightNumber: flightData.flightNumber,
            from: flightData.from,
            to: flightData.to,
            departureTime: flightData.departureTime,
            arrivalTime: flightData.arrivalTime,
            flightClass: flightData.class || "economy",
            totalPassengers: passengerDetails.length,
            pricePerPassenger: flightData.Price || flightData.price || 0,
            totalPrice: totalPrice,
            status: "pending",
            paymentStatus: "pending",
            passengerDetails: passengerDetails,
            vendorId: flightData.vendorId?.toString()
        });

        // Update flight capacity (if real)
        if (flight) {
            await Flight.findByIdAndUpdate(flightId, {
                $inc: { availableSeats: -passengerDetails.length }
            });
        }

        return NextResponse.json({
            success: true,
            message: "Flight booking created",
            booking: newBooking
        }, { status: 201 });

    } catch (error: any) {
        console.error("Flight booking create error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// GET /api/flight-bookings - List user bookings
export async function GET(request: NextRequest) {
    try {
        const user = getUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const bookings = await FlightBooking.find({ userId: user.userId }).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            count: bookings.length,
            bookings
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
