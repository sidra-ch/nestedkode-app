import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Branch from "@/models/Branch";

export async function GET() {
    try {
        await dbConnect();
        const branches = await Branch.find({}).sort({ isMainBranch: -1, name: 1 });
        return NextResponse.json({ success: true, branches });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message || "Failed to fetch branches" },
            { status: 500 }
        );
    }
}
