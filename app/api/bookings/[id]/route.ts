import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import Bus from '@/models/Bus';
import { getUserFromRequest } from '@/lib/auth';

// GET - Get single booking
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check access rights
    if (
      user.role === 'user' &&
      booking.userId !== user.userId
    ) {
      return NextResponse.json(
        { success: false, message: 'Access denied' },
        { status: 403 }
      );
    }

    if (
      user.role === 'vendor' &&
      booking.vendorId !== user.userId
    ) {
      return NextResponse.json(
        { success: false, message: 'Access denied' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        booking,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get booking error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch booking', error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update booking status
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { status, paymentStatus, passengerDetails, contactEmail, contactPhone } = body;

    // Only allow certain roles to update
    if (user.role === 'user' && status !== 'cancelled' && status !== 'confirmed') {
      return NextResponse.json(
        { success: false, message: 'Users can only confirm or cancel bookings' },
        { status: 403 }
      );
    }

    // Handle cancellation - restore seats
    if (status === 'cancelled' && booking.status !== 'cancelled') {
      await Bus.findByIdAndUpdate(booking.busId, {
        $inc: { availableSeats: booking.totalSeats },
      });
    }

    const updateFields: any = { status, paymentStatus };
    if (passengerDetails !== undefined) updateFields.passengerDetails = passengerDetails;
    if (contactEmail !== undefined) updateFields.contactEmail = contactEmail;
    if (contactPhone !== undefined) updateFields.contactPhone = contactPhone;

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Booking updated successfully',
        booking: updatedBooking,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update booking error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update booking', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete booking
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    const { id } = await params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Restore seats if booking wasn't cancelled
    if (booking.status !== 'cancelled') {
      await Bus.findByIdAndUpdate(booking.busId, {
        $inc: { availableSeats: booking.totalSeats },
      });
    }

    await Booking.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: 'Booking deleted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete booking error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete booking', error: error.message },
      { status: 500 }
    );
  }
}
