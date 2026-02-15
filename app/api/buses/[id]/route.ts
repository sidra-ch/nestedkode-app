import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Bus from '@/models/Bus';
import { getUserFromRequest } from '@/lib/auth';

// GET - Get single bus
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const bus = await Bus.findById(id);

    if (!bus) {
      return NextResponse.json(
        { success: false, message: 'Bus not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        bus,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get bus error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch bus', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// PUT - Update bus (Vendor/Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = getUserFromRequest(request);

    if (!user || (user.role !== 'vendor' && user.role !== 'admin')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;

    const bus = await Bus.findById(id);

    if (!bus) {
      return NextResponse.json(
        { success: false, message: 'Bus not found' },
        { status: 404 }
      );
    }

    // Check if user owns this bus (unless admin)
    if (user.role === 'vendor' && bus.vendorId !== user.userId) {
      return NextResponse.json(
        { success: false, message: 'You can only update your own buses' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const updatedBus = await Bus.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Bus updated successfully',
        bus: updatedBus,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update bus error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update bus', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE - Delete bus (Vendor/Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = getUserFromRequest(request);

    if (!user || (user.role !== 'vendor' && user.role !== 'admin')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;

    const bus = await Bus.findById(id);

    if (!bus) {
      return NextResponse.json(
        { success: false, message: 'Bus not found' },
        { status: 404 }
      );
    }

    // Check if user owns this bus (unless admin)
    if (user.role === 'vendor' && bus.vendorId !== user.userId) {
      return NextResponse.json(
        { success: false, message: 'You can only delete your own buses' },
        { status: 403 }
      );
    }

    await Bus.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: 'Bus deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete bus error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete bus', error: (error as Error).message },
      { status: 500 }
    );
  }
}
