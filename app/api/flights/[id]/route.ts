import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Flight from "@/models/Flight";
import { verifyToken } from "@/lib/auth";

// GET /api/flights/[id] - Get single flight
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const flight = await Flight.findById(params.id).lean();

    if (!flight) {
      return NextResponse.json(
        { success: false, error: "پرواز یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      flight,
    });
  } catch (error: any) {
    console.error("Error fetching flight:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/flights/[id] - Update flight (vendor/admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json(
        { success: false, error: "غیر مجاز" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || (decoded.role !== "vendor" && decoded.role !== "admin")) {
      return NextResponse.json(
        { success: false, error: "دسترسی غیر مجاز" },
        { status: 403 }
      );
    }

    await connectDB();

    const flight = await Flight.findById(params.id);

    if (!flight) {
      return NextResponse.json(
        { success: false, error: "پرواز یافت نشد" },
        { status: 404 }
      );
    }

    // Vendors can only update their own flights
    if (
      decoded.role === "vendor" &&
      flight.vendorId?.toString() !== decoded.userId
    ) {
      return NextResponse.json(
        { success: false, error: "دسترسی غیر مجاز" },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Update flight
    Object.assign(flight, body);
    await flight.save();

    return NextResponse.json({
      success: true,
      message: "پرواز با موفقیت به‌روزرسانی شد",
      flight,
    });
  } catch (error: any) {
    console.error("Error updating flight:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/flights/[id] - Delete flight (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json(
        { success: false, error: "غیر مجاز" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "فقط ادمین می‌تواند پرواز را حذف کند" },
        { status: 403 }
      );
    }

    await connectDB();

    const flight = await Flight.findByIdAndDelete(params.id);

    if (!flight) {
      return NextResponse.json(
        { success: false, error: "پرواز یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "پرواز با موفقیت حذف شد",
    });
  } catch (error: any) {
    console.error("Error deleting flight:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
