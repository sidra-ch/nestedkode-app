import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Taxi from "@/models/Taxi";
import { verifyToken } from "@/lib/auth";

// GET /api/taxis - Search and list taxis
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");
    const vehicleType = searchParams.get("vehicleType");
    const driverId = searchParams.get("driverId");

    const query: any = { status: "active", isApproved: true };

    if (from) query.from = from;
    if (to) query.to = to;
    if (vehicleType) query.vehicleType = vehicleType;
    if (driverId) query.driverId = driverId;

    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);

      query.departureDate = {
        $gte: searchDate,
        $lt: nextDay,
      };
    }

    const taxis = await Taxi.find(query)
      .populate("driverId", "name email phone")
      .sort({ departureDate: 1, price: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: taxis.length,
      taxis,
    });
  } catch (error: any) {
    console.error("Error fetching taxis:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/taxis - Create new taxi service (driver only)
export async function POST(request: NextRequest) {
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

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "driverName",
      "driverPhone",
      "vehicleType",
      "vehicleModel",
      "vehiclePlate",
      "vehicleColor",
      "from",
      "to",
      "departureDate",
      "departureTime",
      "price",
      "totalSeats",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `فیلد ${field} الزامی است` },
          { status: 400 }
        );
      }
    }

    const taxiData = {
      ...body,
      driverId: decoded.userId,
      availableSeats: body.totalSeats,
      isApproved: decoded.role === "admin", // Auto-approve for admin
    };

    const taxi = await Taxi.create(taxiData);

    return NextResponse.json(
      {
        success: true,
        message: decoded.role === "admin" 
          ? "سرویس تاکسی با موفقیت ایجاد شد"
          : "درخواست شما ثبت شد و پس از تایید فعال می‌شود",
        taxi,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating taxi:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
