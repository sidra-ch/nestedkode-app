import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const user = getUserFromRequest(request);

        // Security: Only Admins can verify payments
        if (!user || (user.role !== 'admin' && user.role !== 'agency_admin')) {
            return NextResponse.json({ success: false, message: "Unauthorized. Admin access required." }, { status: 403 });
        }

        const { bookingId, action } = await request.json(); // action: "verify" | "reject"

        if (!bookingId || !action) {
            return NextResponse.json({ success: false, message: "Booking ID and action are required" }, { status: 400 });
        }

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
        }

        if (action === "verify") {
            // Status Transition: pending_verification -> confirmed
            booking.bookingStatus = "confirmed";
            booking.paymentStatus = "paid";
            booking.verifiedAt = new Date();
            booking.verifiedBy = user.userId;

            // Extend hold for confirmation or mark as final
            // A confirmed booking shouldn't expire via TTL
            booking.holdExpiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year out
        } else if (action === "reject") {
            booking.bookingStatus = "cancelled";
            booking.paymentStatus = "unpaid";
        }

        await booking.save();

        return NextResponse.json({
            success: true,
            message: action === "verify" ? "Payment verified successfully" : "Payment rejected and booking cancelled",
            bookingStatus: booking.bookingStatus
        });

    } catch (error: any) {
        console.error("Payment verification error:", error);
        return NextResponse.json({ success: false, message: "Failed to verify payment" }, { status: 500 });
    }
}
