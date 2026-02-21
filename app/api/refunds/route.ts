import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Refund from '@/models/Refund';
import Booking from '@/models/Booking';
import Payment from '@/models/Payment';
import { getUserFromRequest } from '@/lib/auth';
import { calculateRefund, processRefund, approveRefund } from '@/lib/payment/RefundService';
import { sendRefundNotification } from '@/lib/notifications/NotificationService';

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const query: any = {};
    
    if (user.role === 'user') {
      query.userId = user.userId;
    }

    const refunds = await Refund.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: refunds.length,
      refunds,
    });

  } catch (error: any) {
    console.error('Get refunds error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch refunds' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { bookingId, reason, refundMethod, bankDetails } = body;

    if (!bookingId || !reason || !refundMethod) {
      return NextResponse.json(
        { success: false, message: 'Booking ID, reason, and refund method are required' },
        { status: 400 }
      );
    }

    const result = await processRefund(
      bookingId,
      user.userId,
      reason,
      refundMethod,
      refundMethod === 'bank_transfer' ? bankDetails : undefined
    );

    if (result.success) {
      const booking = await Booking.findById(bookingId);
      const payment = await Payment.findById(booking?.paymentId);
      
      if (payment) {
        await sendRefundNotification(
          user.userId,
          payment.metadata?.userEmail || '',
          payment.metadata?.userPhone || '',
          {
            amount: result.refund?.amount || 0,
            status: 'pending',
          }
        );
      }
    }

    return NextResponse.json(result, { status: result.success ? 201 : 400 });

  } catch (error: any) {
    console.error('Create refund error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process refund' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Admin access required' }, { status: 403 });
    }

    await connectDB();

    const body = await request.json();
    const { refundId, action, adminNote } = body;

    if (!refundId || !action) {
      return NextResponse.json(
        { success: false, message: 'Refund ID and action are required' },
        { status: 400 }
      );
    }

    if (action === 'approve') {
      const result = await approveRefund(refundId, user.userId, adminNote);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    }

    if (action === 'reject') {
      const refund = await Refund.findByIdAndUpdate(
        refundId,
        { status: 'rejected', adminNote, processedAt: new Date() },
        { new: true }
      );
      
      return NextResponse.json({
        success: true,
        message: 'Refund request rejected',
        refund,
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    );

  } catch (error: any) {
    console.error('Update refund error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update refund' },
      { status: 500 }
    );
  }
}
