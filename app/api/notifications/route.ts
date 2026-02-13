import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Notification from "@/models/Notification";
import { verifyToken } from "@/lib/auth";

// GET /api/notifications - Get user notifications
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");

    const query: any = { userId: decoded.userId };

    if (status) query.status = status;
    if (type) query.type = type;

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/notifications - Create notification (system/admin only)
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
        { success: false, error: "فقط ادمین می‌تواند اعلان ایجاد کند" },
        { status: 403 }
      );
    }

    await connectDB();

    const body = await request.json();

    // Validate required fields
    const requiredFields = ["userId", "type", "title", "message", "channel"];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `فیلد ${field} الزامی است` },
          { status: 400 }
        );
      }
    }

    const notification = await Notification.create(body);

    // TODO: Implement actual email/SMS sending logic here
    // For now, just mark as sent
    if (body.channel === "email" || body.channel === "both") {
      // await sendEmail(notification);
    }
    if (body.channel === "sms" || body.channel === "both") {
      // await sendSMS(notification);
    }

    notification.status = "sent";
    notification.sentAt = new Date();
    await notification.save();

    return NextResponse.json(
      {
        success: true,
        message: "اعلان با موفقیت ارسال شد",
        notification,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating notification:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
