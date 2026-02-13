import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Flight from "@/models/Flight";
import { verifyToken } from "@/lib/auth";

// GET /api/flights - Search and list flights
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const date = searchParams.get("date");
    const type = searchParams.get("type"); // domestic | international
    const flightClass = searchParams.get("class");
    const vendorId = searchParams.get("vendorId");

    const query: any = { status: "scheduled" };

    if (origin) query.origin = origin;
    if (destination) query.destination = destination;
    if (type) query.type = type;
    if (flightClass) query.class = flightClass;
    if (vendorId) query.vendorId = vendorId;

    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);

      query.departureTime = {
        $gte: searchDate,
        $lt: nextDay,
      };
    }

    const flights = await Flight.find(query)
      .sort({ departureTime: 1, price: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: flights.length,
      flights,
    });
  } catch (error: any) {
    console.error("Error fetching flights:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/flights - Create new flight (vendor/admin only)
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
    if (!decoded || (decoded.role !== "vendor" && decoded.role !== "admin")) {
      return NextResponse.json(
        { success: false, error: "دسترسی غیر مجاز" },
        { status: 403 }
      );
    }

    await connectDB();

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "flightNumber",
      "airline",
      "origin",
      "destination",
      "departureTime",
      "arrivalTime",
      "duration",
      "price",
      "totalSeats",
      "type",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `فیلد ${field} الزامی است` },
          { status: 400 }
        );
      }
    }

    // Check if flight number already exists
    const existingFlight = await Flight.findOne({
      flightNumber: body.flightNumber,
    });

    if (existingFlight) {
      return NextResponse.json(
        { success: false, error: "شماره پرواز تکراری است" },
        { status: 400 }
      );
    }

    const flightData = {
      ...body,
      availableSeats: body.totalSeats,
      vendorId: decoded.role === "vendor" ? decoded.userId : body.vendorId,
    };

    const flight = await Flight.create(flightData);

    return NextResponse.json(
      {
        success: true,
        message: "پرواز با موفقیت ایجاد شد",
        flight,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating flight:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
