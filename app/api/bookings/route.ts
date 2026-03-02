import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import Bus from '@/models/Bus';
import User from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';
import { generateBookingReference } from '@/lib/helpers';
import { z } from 'zod';

const bookingSchema = z.object({
  bookingType: z.enum(["FLIGHT", "UMRAH", "TOUR", "BUS"]),
  tripDetails: z.object({
    from: z.string(),
    to: z.string(),
    departureDate: z.string().or(z.date()),
    busId: z.string().optional(),
    airline: z.string().optional(),
  }),
  travelers: z.array(z.object({
    fullName: z.string(),
    gender: z.string(),
    dateOfBirth: z.string().or(z.date()),
    passportNumber: z.string().optional(),
  })),
  contact: z.object({
    phone: z.string(),
    email: z.string().email(),
    whatsapp: z.string().optional(),
  }),
  totalAmount: z.number(),
  paymentMethod: z.enum(["OFFICE", "BANK", "MPAISA"]),
});

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

// POST - Create booking (Unified for Flight/Bus/Tour)
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
    const {
      bookingType,
      tripDetails,
      travelers,
      contact,
      totalAmount,
      paymentMethod
    } = body;

    // Validation with Zod
    const validation = bookingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid input data', errors: validation.error.format() },
        { status: 400 }
      );
    }

    // Set hold expiry (15 minutes from now)
    const holdExpiresAt = new Date();
    holdExpiresAt.setMinutes(holdExpiresAt.getMinutes() + 15);

    // Set statuses based on payment method
    let paymentStatus: "pending_office_payment" | "pending_verification" | "paid" = "pending_verification";
    if (paymentMethod === "OFFICE") {
      paymentStatus = "pending_office_payment";
    }

    // Get user details for name
    const userData = await User.findById(user.userId);

    // Create booking
    const booking = await Booking.create({
      bookingReference: generateBookingReference(),
      bookingType,
      userId: user.userId,
      userName: userData?.name || 'User',
      userEmail: user.email || '',
      tripDetails,
      travelDate: new Date(tripDetails.departureDate),
      travelers,
      contact,
      totalAmount,
      paymentMethod,
      paymentStatus,
      bookingStatus: "pending_payment",
      holdExpiresAt
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Booking created successfully. Please complete payment within 15 minutes.',
        bookingReference: booking.bookingReference,
        holdExpiresAt: booking.holdExpiresAt
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
