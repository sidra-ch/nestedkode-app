import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Hotel from "@/models/Hotel";
import { verifyToken } from "@/lib/auth";

// GET /api/hotels - Search and list hotels
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const stars = searchParams.get("stars");
    const type = searchParams.get("type");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const vendorId = searchParams.get("vendorId");

    const query: any = { isActive: true };

    if (city) query.city = city;
    if (stars) query.stars = parseInt(stars);
    if (type) query.type = type;
    if (vendorId) query.vendorId = vendorId;

    if (minPrice || maxPrice) {
      query["rooms.price"] = {};
      if (minPrice) query["rooms.price"].$gte = parseInt(minPrice);
      if (maxPrice) query["rooms.price"].$lte = parseInt(maxPrice);
    }

    const hotels = await Hotel.find(query)
      .sort({ rating: -1, stars: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: hotels.length,
      hotels,
    });
  } catch (error: any) {
    console.error("Error fetching hotels:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/hotels - Create new hotel (vendor/admin only)
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
      "name",
      "description",
      "city",
      "address",
      "stars",
      "type",
      "rooms",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `فیلد ${field} الزامی است` },
          { status: 400 }
        );
      }
    }

    // Validate rooms
    if (!Array.isArray(body.rooms) || body.rooms.length === 0) {
      return NextResponse.json(
        { success: false, error: "حداقل یک نوع اتاق باید تعریف شود" },
        { status: 400 }
      );
    }

    const hotelData = {
      ...body,
      vendorId: decoded.role === "vendor" ? decoded.userId : body.vendorId,
    };

    const hotel = await Hotel.create(hotelData);

    return NextResponse.json(
      {
        success: true,
        message: "هتل با موفقیت ایجاد شد",
        hotel,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating hotel:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
