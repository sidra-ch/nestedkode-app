import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import FlightBooking from "@/models/FlightBooking";
import { getUserFromRequest } from "@/lib/auth";

// GET /api/flight-bookings/[id] - Get single flight booking
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = getUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { id } = await params;
        const booking = await FlightBooking.findById(id);

        if (!booking) {
            return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
        }

        // Verify ownership
        if (booking.userId.toString() !== user.userId.toString()) {
            return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 });
        }

        return NextResponse.json({
            success: true,
            booking
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
