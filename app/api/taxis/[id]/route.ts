import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Taxi from "@/models/Taxi";
import { verifyToken } from "@/lib/auth";

// GET /api/taxis/[id] - Get single taxi
export async function GET(
  request: NextRequest,  
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const taxi = await Taxi.findById(id)
      .populate("driverId", "name email phone")
      .lean();

    if (!taxi) {
      return NextResponse.json(
        { success: false, error: "تاکسی یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      taxi,
    });
  } catch (error) {
    console.error("Error fetching taxi:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// PUT /api/taxis/[id] - Update taxi (driver/admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: "دسترسی غیر مجاز" },
        { status: 403 }
      );
    }

    await connectDB();
    const { id } = await params;

    const taxi = await Taxi.findById(id);

    if (!taxi) {
      return NextResponse.json(
        { success: false, error: "تاکسی یافت نشد" },
        { status: 404 }
      );
    }

    // Drivers can only update their own taxis
    if (
      decoded.role !== "admin" &&
      taxi.driverId?.toString() !== decoded.userId
    ) {
      return NextResponse.json(
        { success: false, error: "دسترسی غیر مجاز" },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Update taxi
    Object.assign(taxi, body);
    await taxi.save();

    return NextResponse.json({
      success: true,
      message: "تاکسی با موفقیت به‌روزرسانی شد",
      taxi,
    });
  } catch (error) {
    console.error("Error updating taxi:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE /api/taxis/[id] - Delete taxi (driver/admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: "دسترسی غیر مجاز" },
        { status: 403 }
      );
    }

    await connectDB();
    const { id } = await params;

    const taxi = await Taxi.findById(id);

    if (!taxi) {
      return NextResponse.json(
        { success: false, error: "تاکسی یافت نشد" },
        { status: 404 }
      );
    }

    // Drivers can only delete their own taxis
    if (
      decoded.role !== "admin" &&
      taxi.driverId?.toString() !== decoded.userId
    ) {
      return NextResponse.json(
        { success: false, error: "دسترسی غیر مجاز" },
        { status: 403 }
      );
    }

    await Taxi.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "تاکسی با موفقیت حذف شد",
    });
  } catch (error) {
    console.error("Error deleting taxi:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
