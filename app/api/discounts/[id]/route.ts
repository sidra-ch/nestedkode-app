import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Discount from "@/models/Discount";
import { verifyToken } from "@/lib/auth";

// PUT /api/discounts/[id] - Update discount (admin only)
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
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "فقط ادمین می‌تواند کد تخفیف را ویرایش کند" },
        { status: 403 }
      );
    }

    await connectDB();

    const body = await request.json();

    const discount = await Discount.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );

    if (!discount) {
      return NextResponse.json(
        { success: false, error: "کد تخفیف یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "کد تخفیف با موفقیت به‌روزرسانی شد",
      discount,
    });
  } catch (error: any) {
    console.error("Error updating discount:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/discounts/[id] - Delete discount (admin only)
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
        { success: false, error: "فقط ادمین می‌تواند کد تخفیف را حذف کند" },
        { status: 403 }
      );
    }

    await connectDB();

    const discount = await Discount.findByIdAndDelete(params.id);

    if (!discount) {
      return NextResponse.json(
        { success: false, error: "کد تخفیف یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "کد تخفیف با موفقیت حذف شد",
    });
  } catch (error: any) {
    console.error("Error deleting discount:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
