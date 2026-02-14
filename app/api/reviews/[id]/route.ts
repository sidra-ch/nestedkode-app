import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Review from "@/models/Review";
import { verifyToken } from "@/lib/auth";

// PUT /api/reviews/[id] - Update review (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
        { success: false, error: "فقط ادمین می‌تواند نظرات را ویرایش کند" },
        { status: 403 }
      );
    }

    await connectDB();
    const { id } = await params;

    const body = await request.json();

    const review = await Review.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!review) {
      return NextResponse.json(
        { success: false, error: "نظر یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "نظر با موفقیت به‌روزرسانی شد",
      review,
    });
  } catch (error: any) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/reviews/[id] - Delete review (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
        { success: false, error: "فقط ادمین می‌تواند نظرات را حذف کند" },
        { status: 403 }
      );
    }

    await connectDB();
    const { id } = await params;

    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return NextResponse.json(
        { success: false, error: "نظر یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "نظر با موفقیت حذف شد",
    });
  } catch (error: any) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
