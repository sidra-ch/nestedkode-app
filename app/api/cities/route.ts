import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import City from "@/models/City";
import { verifyToken } from "@/lib/auth";

// GET /api/cities - List cities/airports
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // domestic | international
    const search = searchParams.get("search");

    const query: any = { isActive: true };

    if (type) query.type = type;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { nameEn: { $regex: search, $options: "i" } },
        { namePs: { $regex: search, $options: "i" } },
        { airportCode: { $regex: search, $options: "i" } },
      ];
    }

    const cities = await City.find(query)
      .sort({ name: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: cities.length,
      cities,
    });
  } catch (error: any) {
    console.error("Error fetching cities:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/cities - Create city (admin only)
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
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "فقط ادمین می‌تواند شهر اضافه کند" },
        { status: 403 }
      );
    }

    await connectDB();

    const body = await request.json();

    // Validate required fields
    const requiredFields = ["name", "nameEn", "namePs", "type"];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `فیلد ${field} الزامی است` },
          { status: 400 }
        );
      }
    }

    // Check if city already exists
    const existingCity = await City.findOne({
      $or: [
        { name: body.name },
        { airportCode: body.airportCode },
      ],
    });

    if (existingCity) {
      return NextResponse.json(
        { success: false, error: "این شهر قبلاً ثبت شده است" },
        { status: 400 }
      );
    }

    const city = await City.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "شهر با موفقیت اضافه شد",
        city,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating city:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
