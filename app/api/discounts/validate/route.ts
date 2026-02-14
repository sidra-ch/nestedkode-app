import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { validateDiscountCode } from '@/lib/payment/DiscountService';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { code, serviceType, totalPrice } = body;

    if (!code || !serviceType || !totalPrice) {
      return NextResponse.json(
        { success: false, message: 'کد، نوع سرویس و مبلغ الزامی است' },
        { status: 400 }
      );
    }

    const result = await validateDiscountCode(code, serviceType, totalPrice);

    if (result.valid) {
      return NextResponse.json({
        success: true,
        discount: result.discount?.value,
        calculatedDiscount: result.calculatedDiscount,
        message: 'کد تخفیف معتبر است',
      });
    }

    return NextResponse.json({
      success: false,
      message: result.message || 'کد تخفیف نامعتبر است',
    });

  } catch (error: any) {
    console.error('Discount validation error:', error);
    return NextResponse.json(
      { success: false, message: 'خطا در اعتبارسنجی کد تخفیف' },
      { status: 500 }
    );
  }
}
