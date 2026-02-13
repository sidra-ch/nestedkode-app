import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Restaurant from "@/models/Restaurant";
import { verifyToken } from "@/lib/auth";

// GET: Search restaurants with filters
// POST: Create new restaurant (vendor/admin only)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");
    const cuisine = searchParams.get("cuisine");
    const minRating = searchParams.get("minRating");
    const priceRange = searchParams.get("priceRange");
    const hasDelivery = searchParams.get("hasDelivery");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    await mongoose.connect(process.env.MONGODB_URI as string);

    const query: any = { isApproved: true, isActive: true };

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Cuisine type filter
    if (cuisine) {
      query.cuisineType = cuisine;
    }

    // Rating filter
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    // Price range filter
    if (priceRange) {
      query.priceRange = priceRange;
    }

    // Delivery filter
    if (hasDelivery === "true") {
      query.hasDelivery = true;
    }

    const skip = (page - 1) * limit;
    const restaurants = await Restaurant.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ rating: -1, reviews_count: -1 });

    const total = await Restaurant.countDocuments(query);

    return NextResponse.json(
      {
        success: true,
        message: "Restaurants retrieved successfully",
        data: restaurants,
        count: restaurants.length,
        total,
        page,
        pages: Math.ceil(total / limit),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "vendor") {
      return NextResponse.json(
        { success: false, error: "Only vendors can create restaurants" },
        { status: 403 }
      );
    }

    const body = await req.json();

    // Validate required fields
    const requiredFields = [
      "name",
      "description",
      "cuisineType",
      "location",
      "phone",
      "seatingCapacity",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    await mongoose.connect(process.env.MONGODB_URI as string);

    // Check if restaurant already exists
    const existingRestaurant = await Restaurant.findOne({
      vendorId: decoded.userId,
      name: body.name,
    });

    if (existingRestaurant) {
      return NextResponse.json(
        { success: false, error: "Restaurant with this name already exists" },
        { status: 400 }
      );
    }

    const restaurantData = {
      ...body,
      vendorId: decoded.userId,
      vendorName: decoded.name || "Unknown",
      vendorPhone: decoded.phone || "",
      isApproved: false, // Requires admin approval
      isActive: true,
    };

    const newRestaurant = new Restaurant(restaurantData);
    await newRestaurant.save();

    return NextResponse.json(
      {
        success: true,
        message: "Restaurant created successfully. Awaiting admin approval.",
        data: newRestaurant,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create restaurant" },
      { status: 500 }
    );
  }
}
