import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Discount from "@/models/Discount";
import { verifyToken } from "@/lib/auth";

// GET /api/discounts - List all discounts (admin) or validate code (users)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const serviceType = searchParams.get("serviceType");

    if (code) {
      // Validate discount code
      const now = new Date();
      const discount = await Discount.findOne({
        code: code.toUpperCase(),
        isActive: true,
        validFrom: { $lte: now },
        validUntil: { $gte: now },
      });

      if (!discount) {
        return NextResponse.json(
          { success: false, error: "کد تخفیف معتبر نیست" },
          { status: 404 }
        );
      }

      // Check if discount applies to this service type
      if (serviceType && !discount.serviceTypes.includes(serviceType as any)) {
        return NextResponse.json(
          { success: false, error: "این کد تخفیف برای این سرویس معتبر نیست" },
          { status: 400 }
        );
      }

      // Check usage limit
      if (discount.usageLimit > 0 && discount.usedCount >= discount.usageLimit) {
        return NextResponse.json(
          { success: false, error: "ظرفیت استفاده از این کد تخفیف تمام شده است" },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        discount,
      });
    }

    // Admin: List all discounts
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
        { success: false, error: "دسترسی غیر مجاز" },
        { status: 403 }
      );
    }

    const discounts = await Discount.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: discounts.length,
      discounts,
    });
  } catch (error: any) {
    console.error("Error fetching discounts:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/discounts - Create discount (admin only)
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
        { success: false, error: "فقط ادمین می‌تواند کد تخفیف ایجاد کند" },
        { status: 403 }
      );
    }

    await connectDB();

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "code",
      "description",
      "type",
      "value",
      "serviceTypes",
      "validFrom",
      "validUntil",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `فیلد ${field} الزامی است` },
          { status: 400 }
        );
      }
    }

    // Check if code already exists
    const existingDiscount = await Discount.findOne({
      code: body.code.toUpperCase(),
    });

    if (existingDiscount) {
      return NextResponse.json(
        { success: false, error: "این کد تخفیف قبلاً استفاده شده است" },
        { status: 400 }
      );
    }

    const discountData = {
      ...body,
      code: body.code.toUpperCase(),
      createdBy: decoded.userId,
    };

    const discount = await Discount.create(discountData);

    return NextResponse.json(
      {
        success: true,
        message: "کد تخفیف با موفقیت ایجاد شد",
        discount,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating discount:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
