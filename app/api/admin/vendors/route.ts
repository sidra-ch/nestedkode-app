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

    const query: any = { role: 'vendor' };
    if (status === 'pending') {
      query.isApproved = false;
    } else if (status === 'approved') {
      query.isApproved = true;
    }

    const vendors = await User.find(query).select('-password').sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: vendors.length,
        vendors,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get vendors error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch vendors', error: error.message },
      { status: 500 }
    );
  }
}
