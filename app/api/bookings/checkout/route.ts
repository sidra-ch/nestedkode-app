import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import Payment from '@/models/Payment';
import { getUserFromRequest } from '@/lib/auth';
import { generateTransactionId } from '@/lib/helpers';
import { validateDiscountCode, applyDiscountCode } from '@/lib/payment/DiscountService';
import { sendBookingConfirmation, sendPaymentConfirmation } from '@/lib/notifications/NotificationService';

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
    const {
      bookingId,
      passengers,
      discountCode,
      discountAmount = 0,
      paymentMethod,
      bankDetails
    } = body;

    if (!bookingId) {
      return NextResponse.json(
        { success: false, message: 'Booking ID is required' },
        { status: 400 }
      );
    }

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

    let finalPrice = booking.totalAmount;

    if (discountCode && discountAmount > 0) {
      const discountValidation = await validateDiscountCode(
        discountCode,
        'bus',
        booking.totalAmount
      );

      if (discountValidation.valid) {
        await applyDiscountCode(discountCode);
        finalPrice = booking.totalAmount - discountAmount;
      }
    }

    const transactionId = generateTransactionId();

    const paymentStatus = paymentMethod === 'online' ? 'pending' :
      paymentMethod === 'cash' ? 'pending' : 'pending';

    const payment = await Payment.create({
      bookingId: booking._id,
      userId: user.userId,
      amount: finalPrice,
      currency: 'AFN',
      paymentMethod: paymentMethod === 'online' ? 'card' :
        paymentMethod === 'cash' ? 'cash' : 'bank_transfer',
      status: 'pending',
      transactionId,
      paymentGateway: paymentMethod === 'online' ? 'Stripe' : 'Offline',
      metadata: {
        discountCode: discountCode || null,
        discountAmount: discountAmount || 0,
        bankDetails: paymentMethod === 'offline' ? bankDetails : null,
      },
    });

    await Booking.findByIdAndUpdate(bookingId, {
      travelers: passengers.map((p: any) => ({
        fullName: `${p.firstName} ${p.lastName}`,
        fatherName: p.fatherName || '',
        passportNumber: p.passportNumber,
        dateOfBirth: new Date(p.dateOfBirth),
        gender: p.gender,
        email: p.email || '',
        phone: p.phone || '',
        specialNeeds: p.specialNeeds || '',
        seatNumber: p.seatNumber || '',
      })),
      paymentId: payment._id,
      paymentStatus: 'paid',
      bookingStatus: 'confirmed',
    });

    const userEmail = passengers[0]?.email || '';
    const userPhone = passengers[0]?.phone || '';

    await sendBookingConfirmation(
      user.userId,
      userEmail,
      userPhone,
      {
        _id: booking._id.toString(),
        from: booking.tripDetails.from,
        to: booking.tripDetails.to,
        travelDate: booking.travelDate || new Date(),
        seats: booking.travelers.map(t => t.seatNumber || '').filter(s => s !== '') as any,
        totalPrice: finalPrice,
      }
    );

    const responseData = {
      success: true,
      message: paymentMethod === 'offline'
        ? 'درخواست پرداخت آفلاین ثبت شد. منتظر تایید مدیریت باشید.'
        : 'رزرو با موفقیت تایید شد',
      booking: {
        ...booking.toObject(),
        paymentStatus: 'pending',
        bookingStatus: 'confirmed',
      },
      payment: payment,
    };

    if (paymentMethod === 'online') {
      (responseData as any).paymentUrl = `/payment?bookingId=${bookingId}&amount=${finalPrice}`;
    }

    return NextResponse.json(responseData, { status: 201 });

  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process checkout', error: error.message },
      { status: 500 }
    );
  }
}
