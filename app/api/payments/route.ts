import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Payment from '@/models/Payment';
import Booking from '@/models/Booking';
import { getUserFromRequest } from '@/lib/auth';
import { generateTransactionId } from '@/lib/helpers';

// GET - Get payments
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
    }
    // Admin and vendor can see all payments related to their bookings

    const payments = await Payment.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: payments.length,
        payments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get payments error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch payments', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST - Create payment
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { bookingId, paymentMethod, amount } = body;

    // Validation
    if (!bookingId || !paymentMethod || !amount) {
      return NextResponse.json(
        { success: false, message: 'Booking ID, payment method, and amount are required' },
        { status: 400 }
      );
    }

    // Verify booking exists and belongs to user
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    if (booking.userId !== user.userId && user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Access denied' },
        { status: 403 }
      );
    }

    // Check if payment already exists for this booking
    const existingPayment = await Payment.findOne({ bookingId, status: 'completed' });
    if (existingPayment) {
      return NextResponse.json(
        { success: false, message: 'Payment already completed for this booking' },
        { status: 400 }
      );
    }

    // Generate transaction ID
    const transactionId = generateTransactionId();

    // Create payment
    const payment = await Payment.create({
      bookingId,
      userId: user.userId,
      amount,
      currency: 'AFN',
      paymentMethod,
      status: 'completed', // In real app, this would be 'pending' until payment gateway confirms
      transactionId,
      paymentGateway: 'Manual', // Replace with actual gateway
    });

    // Update booking payment status
    await Booking.findByIdAndUpdate(bookingId, {
      paymentStatus: 'paid',
      paymentId: payment._id,
      status: 'confirmed',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Payment processed successfully',
        payment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create payment error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process payment', error: (error as Error).message },
      { status: 500 }
    );
  }
}
