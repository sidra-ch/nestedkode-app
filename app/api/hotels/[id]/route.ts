import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Hotel from "@/models/Hotel";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await dbConnect();
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return NextResponse.json({ success: false, error: "Hotel not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, hotel });
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch hotel details" }, { status: 500 });
  }
}
