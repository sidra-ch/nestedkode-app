import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Restaurant from "@/models/Restaurant";
import { verifyToken } from "@/lib/auth";

// GET: Get restaurant by ID
// PUT: Update restaurant (vendor can update own, admin can update any)
// DELETE: Delete restaurant (admin only)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid restaurant ID" },
        { status: 400 }
      );
    }

    await mongoose.connect(process.env.MONGODB_URI as string);

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return NextResponse.json(
        { success: false, error: "Restaurant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Restaurant retrieved successfully",
        data: restaurant,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch restaurant" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 403 }
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid restaurant ID" },
        { status: 400 }
      );
    }

    await mongoose.connect(process.env.MONGODB_URI as string);

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return NextResponse.json(
        { success: false, error: "Restaurant not found" },
        { status: 404 }
      );
    }

    // Check authorization: vendor can only update own, admin can update any
    if (
      decoded.role === "vendor" &&
      restaurant.vendorId.toString() !== decoded.userId
    ) {
      return NextResponse.json(
        { success: false, error: "You can only update your own restaurants" },
        { status: 403 }
      );
    }

    const body = await req.json();

    // Update fields
    const updateData = {
      name: body.name || restaurant.name,
      description: body.description || restaurant.description,
      cuisineType: body.cuisineType || restaurant.cuisineType,
      location: body.location || restaurant.location,
      phone: body.phone || restaurant.phone,
      email: body.email || restaurant.email,
      operatingHours: body.operatingHours || restaurant.operatingHours,
      seatingCapacity: body.seatingCapacity || restaurant.seatingCapacity,
      hasParking: body.hasParking !== undefined ? body.hasParking : restaurant.hasParking,
      hasWifi: body.hasWifi !== undefined ? body.hasWifi : restaurant.hasWifi,
      hasDelivery: body.hasDelivery !== undefined ? body.hasDelivery : restaurant.hasDelivery,
      hasReservation: body.hasReservation !== undefined ? body.hasReservation : restaurant.hasReservation,
      acceptsOnlinePayment: body.acceptsOnlinePayment !== undefined ? body.acceptsOnlinePayment : restaurant.acceptsOnlinePayment,
      priceRange: body.priceRange || restaurant.priceRange,
      images: body.images || restaurant.images,
      menuItems: body.menuItems || restaurant.menuItems,
      minOrderValue: body.minOrderValue !== undefined ? body.minOrderValue : restaurant.minOrderValue,
    };

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Restaurant updated successfully",
        data: updatedRestaurant,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating restaurant:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update restaurant" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Only admins can delete restaurants" },
        { status: 403 }
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid restaurant ID" },
        { status: 400 }
      );
    }

    await mongoose.connect(process.env.MONGODB_URI as string);

    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (!restaurant) {
      return NextResponse.json(
        { success: false, error: "Restaurant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Restaurant deleted successfully",
        data: restaurant,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete restaurant" },
      { status: 500 }
    );
  }
}
