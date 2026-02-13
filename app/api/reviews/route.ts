import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Review from "@/models/Review";
import { verifyToken } from "@/lib/auth";

// GET /api/reviews - Get reviews for a service
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const serviceType = searchParams.get("serviceType");
    const serviceId = searchParams.get("serviceId");
    const userId = searchParams.get("userId");
    const isApproved = searchParams.get("isApproved");

    const query: any = {};

    if (serviceType) query.serviceType = serviceType;
    if (serviceId) query.serviceId = serviceId;
    if (userId) query.userId = userId;
    if (isApproved !== null) query.isApproved = isApproved === "true";

    const reviews = await Review.find(query)
      .populate("userId", "name")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/reviews - Create review (authenticated users only)
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
    const requiredFields = ["serviceType", "serviceId", "rating", "title", "comment"];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `فیلد ${field} الزامی است` },
          { status: 400 }
        );
      }
    }

    // Check if user already reviewed this service
    const existingReview = await Review.findOne({
      userId: decoded.userId,
      serviceType: body.serviceType,
      serviceId: body.serviceId,
    });

    if (existingReview) {
      return NextResponse.json(
        { success: false, error: "شما قبلاً این سرویس را نظر داده‌اید" },
        { status: 400 }
      );
    }

    const reviewData = {
      ...body,
      userId: decoded.userId,
      userName: body.userName || "کاربر",
      isApproved: false, // Admin must approve
    };

    const review = await Review.create(reviewData);

    return NextResponse.json(
      {
        success: true,
        message: "نظر شما ثبت شد و پس از تایید نمایش داده می‌شود",
        review,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
