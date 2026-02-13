import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Hotel from "@/models/Hotel";
import { verifyToken } from "@/lib/auth";

// GET /api/hotels/[id] - Get single hotel
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const hotel = await Hotel.findById(params.id).lean();

    if (!hotel) {
      return NextResponse.json(
        { success: false, error: "هتل یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      hotel,
    });
  } catch (error: any) {
    console.error("Error fetching hotel:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/hotels/[id] - Update hotel (vendor/admin only)
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

    const hotel = await Hotel.findById(params.id);

    if (!hotel) {
      return NextResponse.json(
        { success: false, error: "هتل یافت نشد" },
        { status: 404 }
      );
    }

    // Vendors can only update their own hotels
    if (
      decoded.role === "vendor" &&
      hotel.vendorId?.toString() !== decoded.userId
    ) {
      return NextResponse.json(
        { success: false, error: "دسترسی غیر مجاز" },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Update hotel
    Object.assign(hotel, body);
    await hotel.save();

    return NextResponse.json({
      success: true,
      message: "هتل با موفقیت به‌روزرسانی شد",
      hotel,
    });
  } catch (error: any) {
    console.error("Error updating hotel:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/hotels/[id] - Delete hotel (admin only)
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
        { success: false, error: "فقط ادمین می‌تواند هتل را حذف کند" },
        { status: 403 }
      );
    }

    await connectDB();

    const hotel = await Hotel.findByIdAndDelete(params.id);

    if (!hotel) {
      return NextResponse.json(
        { success: false, error: "هتل یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "هتل با موفقیت حذف شد",
    });
  } catch (error: any) {
    console.error("Error deleting hotel:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
