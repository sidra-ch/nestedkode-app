import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Booking from "@/models/Booking";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const user = getUserFromRequest(request);

        if (!user) {
            return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
        }

        const { bookingId, receiptImage, transactionId } = await request.json();

        if (!bookingId || !receiptImage) {
            return NextResponse.json({ success: false, message: "Booking ID and receipt image are required" }, { status: 400 });
        }

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
        }

        // Security: Only the booking owner or an admin can upload a receipt
        if (booking.userId !== user.userId && user.role !== 'admin' && user.role !== 'agency_admin') {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        // Status Transition: seat_held -> pending_verification
        booking.receiptImage = receiptImage;
        booking.transactionId = transactionId || booking.transactionId;
        booking.bookingStatus = "pending_verification";
        booking.paymentStatus = "pending_verification";

        // Once proof is uploaded, we might want to extend the hold or rely on the status
        // For manual verification, we typically stop the TTL deletion logic
        // By changing status away from seat_held, we might have different logic elsewhere
        // In our case, the TTL index is on holdExpiresAt, so we should push it forward
        booking.holdExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h for Admin to verify

        await booking.save();

        return NextResponse.json({
            success: true,
            message: "Receipt uploaded successfully. Admin will verify your payment shortly.",
            bookingStatus: booking.bookingStatus
        });

    } catch (error: any) {
        console.error("Receipt upload error:", error);
        return NextResponse.json({ success: false, message: "Failed to upload receipt" }, { status: 500 });
    }
}
