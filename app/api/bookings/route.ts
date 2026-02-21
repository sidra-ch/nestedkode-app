import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import Bus from '@/models/Bus';
import User from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';
import { generateBookingId } from '@/lib/helpers';

// GET - Get bookings
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    let query: any = {};

    // Filter based on role
    if (user.role === 'user') {
      query.userId = user.userId;
    } else if (user.role === 'vendor') {
      query.vendorId = user.userId;
    }
    // Admin can see all bookings

    const bookings = await Booking.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: bookings.length,
        bookings,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get bookings error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch bookings', error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create booking
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized - Please login' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { busId, seats, travelDate, passengerDetails } = body;

    // Validation
    if (!busId || !seats || seats.length === 0 || !travelDate) {
      return NextResponse.json(
        { success: false, message: 'Bus ID, seats, and travel date are required' },
        { status: 400 }
      );
    }

    // Get bus details
    const bus = await Bus.findById(busId);
    if (!bus) {
      return NextResponse.json(
        { success: false, message: 'Bus not found' },
        { status: 404 }
      );
    }

    // Check seat availability
    if (bus.availableSeats < seats.length) {
      return NextResponse.json(
        { success: false, message: 'Not enough seats available' },
        { status: 400 }
      );
    }

    // Get user details
    const userData = await User.findById(user.userId);

    // Calculate total price
    const totalSeats = seats.length;
    const totalPrice = bus.price * totalSeats;

    // Create booking
    const booking = await Booking.create({
      userId: user.userId,
      userName: userData?.name || 'User',
      userEmail: userData?.email || '',
      busId: bus._id,
      busName: bus.busName,
      busNumber: bus.busNumber,
      vendorId: bus.vendorId,
      from: bus.from,
      to: bus.to,
      departureTime: bus.departureTime,
      arrivalTime: bus.arrivalTime,
      travelDate: new Date(travelDate),
      seats,
      totalSeats,
      pricePerSeat: bus.price,
      totalPrice,
      status: 'pending',
      paymentStatus: 'pending',
      passengerDetails: passengerDetails || [],
    });

    // Update bus available seats
    await Bus.findByIdAndUpdate(busId, {
      $inc: { availableSeats: -totalSeats },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Booking created successfully',
        booking,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create booking error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create booking', error: error.message },
      { status: 500 }
    );
  }
}
