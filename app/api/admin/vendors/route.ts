import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';

// GET - Get all vendors
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const query: Record<string, unknown> = { role: 'vendor' };

    const vendors = await User.find(query).select('-password').sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: vendors.length,
        vendors,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get vendors error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch vendors', error: (error as Error).message },
      { status: 500 }
    );
  }
}
// POST - Create a new vendor
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await request.json();
    const { name, email } = body;
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check if vendor already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Vendor with this email already exists' },
        { status: 409 }
      );
    }

    const newVendor = new User({
      name,
      email: email.toLowerCase(),
      role: 'vendor',
    });
    await newVendor.save();

    return NextResponse.json(
      { success: true, vendor: { id: newVendor._id, name: newVendor.name, email: newVendor.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create vendor error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create vendor', error: (error as Error).message },
      { status: 500 }
    );
  }
}
