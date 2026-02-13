import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';

// PUT - Approve/reject vendor
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const { isApproved } = body;

    const vendor = await User.findById(params.id);

    if (!vendor || vendor.role !== 'vendor') {
      return NextResponse.json(
        { success: false, message: 'Vendor not found' },
        { status: 404 }
      );
    }

    const updatedVendor = await User.findByIdAndUpdate(
      params.id,
      { isApproved },
      { new: true }
    ).select('-password');

    return NextResponse.json(
      {
        success: true,
        message: isApproved ? 'Vendor approved successfully' : 'Vendor rejected',
        vendor: updatedVendor,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update vendor error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update vendor', error: error.message },
      { status: 500 }
    );
  }
}
