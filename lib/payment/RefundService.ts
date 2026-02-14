import Refund from '@/models/Refund';
import Payment from '@/models/Payment';
import Booking from '@/models/Booking';
import CancellationPolicy from '@/models/CancellationPolicy';
import { calculateRefundAmount } from './types';

export interface CancellationResult {
  allowed: boolean;
  refundAmount?: number;
  refundPercentage?: number;
  penaltyPercentage?: number;
  message?: string;
}

export async function calculateRefund(
  bookingId: string,
  serviceType: 'flight' | 'hotel' | 'bus' | 'taxi'
): Promise<CancellationResult> {
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return { allowed: false, message: 'رزرو یافت نشد' };
    }

    if (booking.status === 'cancelled') {
      return { allowed: false, message: 'این رزرو قبلاً کنسل شده است' };
    }

    if (booking.paymentStatus !== 'paid') {
      return { allowed: false, message: 'این رزرو پرداخت نشده است' };
    }

    const policy = await CancellationPolicy.findOne({
      serviceType,
      $or: [{ serviceId: bookingId }, { isDefault: true }],
      isActive: true,
    }).sort({ isDefault: 1 });

    if (!policy) {
      return { allowed: true, refundAmount: booking.totalPrice, refundPercentage: 100, message: 'کنسلی با بازگشت کامل وجه امکان‌پذیر است' };
    }

    const departureTime = new Date(booking.travelDate).getTime();
    const now = Date.now();
    const hoursUntilDeparture = (departureTime - now) / (1000 * 60 * 60);

    let applicableRule = policy.rules.find(r => r.hoursBeforeDeparture <= hoursUntilDeparture);

    if (!applicableRule) {
      applicableRule = policy.rules[policy.rules.length - 1];
    }

    if (!applicableRule) {
      return { allowed: false, message: 'سیاست کنسلی تعریف نشده است' };
    }

    const refundPercentage = applicableRule.refundPercentage;
    const refundAmount = calculateRefundAmount(booking.totalPrice, refundPercentage);

    return {
      allowed: refundPercentage > 0,
      refundAmount: Math.round(refundAmount),
      refundPercentage,
      penaltyPercentage: applicableRule.penaltyPercentage,
      message: `قابل کنسلی. ${refundPercentage}% وجه بازگشت داده می‌شود.`,
    };
  } catch (error) {
    console.error('Calculate refund error:', error);
    return { allowed: false, message: 'خطا در محاسبه کنسلی' };
  }
}

export async function processRefund(
  bookingId: string,
  userId: string,
  reason: string,
  refundMethod: 'original_payment' | 'bank_transfer' | 'wallet',
  bankDetails?: {
    accountNumber: string;
    iban: string;
    bankName: string;
  }
): Promise<{ success: boolean; refund?: any; message?: string }> {
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return { success: false, message: 'رزرو یافت نشد' };
    }

    if (booking.userId !== userId) {
      return { success: false, message: 'دسترسی غیرمجاز' };
    }

    const serviceType = booking.busId ? 'bus' : 'flight';
    const refundCalc = await calculateRefund(bookingId, serviceType);

    if (!refundCalc.allowed) {
      return { success: false, message: refundCalc.message || 'کنسلی امکان‌پذیر نیست' };
    }

    const refund = await Refund.create({
      paymentId: booking.paymentId,
      bookingId: booking._id,
      userId: booking.userId,
      amount: refundCalc.refundAmount,
      currency: 'AFN',
      status: 'pending',
      reason,
      refundMethod,
      bankDetails,
    });

    await Booking.findByIdAndUpdate(bookingId, {
      status: 'cancelled',
      paymentStatus: 'refunded',
    });

    return {
      success: true,
      refund,
      message: `درخواست کنسلی ثبت شد. ${refundCalc.refundPercentage}% وجه (${refundCalc.refundAmount} AFN) بازگشت داده می‌شود.`,
    };
  } catch (error) {
    console.error('Process refund error:', error);
    return { success: false, message: 'خطا در پردازش کنسلی' };
  }
}

export async function approveRefund(
  refundId: string,
  adminId: string,
  adminNote?: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const refund = await Refund.findByIdAndUpdate(
      refundId,
      {
        status: 'approved',
        adminNote,
        processedAt: new Date(),
      },
      { new: true }
    );

    if (!refund) {
      return { success: false, message: 'درخواست بازگشت وجه یافت نشد' };
    }

    return { success: true, message: 'درخواست بازگشت وجه تایید شد' };
  } catch (error) {
    console.error('Approve refund error:', error);
    return { success: false, message: 'خطا در تایید بازگشت وجه' };
  }
}
