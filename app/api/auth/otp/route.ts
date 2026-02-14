import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

interface OTPStore {
  [phone: string]: {
    code: string;
    expires: number;
    attempts: number;
  };
}

const otpStore: OTPStore = {};

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { phone, purpose } = body;

    if (!phone) {
      return NextResponse.json(
        { success: false, message: 'شماره موبایل الزامی است' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ phone });
    if (purpose === 'register' && existingUser) {
      return NextResponse.json(
        { success: false, message: 'این شماره قبلاً ثبت شده است' },
        { status: 400 }
      );
    }

    if (purpose === 'login' && !existingUser) {
      return NextResponse.json(
        { success: false, message: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }

    const now = Date.now();
    const existingOTP = otpStore[phone];

    if (existingOTP && existingOTP.expires > now) {
      const remainingTime = Math.ceil((existingOTP.expires - now) / 1000 / 60);
      return NextResponse.json(
        { success: false, message: `کد تا ${remainingTime} دقیقه دیگر قابل استفاده است` },
        { status: 400 }
      );
    }

    if (existingOTP && existingOTP.attempts >= 5) {
      return NextResponse.json(
        { success: false, message: 'تعداد تلاش‌های شما به حد نصاب رسیده است. لطفاً بعداً تلاش کنید.' },
        { status: 400 }
      );
    }

    const otp = generateOTP();
    otpStore[phone] = {
      code: otp,
      expires: now + 5 * 60 * 1000,
      attempts: (existingOTP?.attempts || 0) + 1,
    };

    console.log(`[OTP] کد تأیید برای ${phone}: ${otp}`);

    return NextResponse.json({
      success: true,
      message: 'کد تأیید ارسال شد',
      expiresIn: 300,
    });

  } catch (error: any) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { success: false, message: 'خطا در ارسال کد تأیید' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, code } = body;

    if (!phone || !code) {
      return NextResponse.json(
        { success: false, message: 'شماره موبایل و کد تأیید الزامی است' },
        { status: 400 }
      );
    }

    const storedOTP = otpStore[phone];
    const now = Date.now();

    if (!storedOTP) {
      return NextResponse.json(
        { success: false, message: 'کد تأیید ارسال نشده است' },
        { status: 400 }
      );
    }

    if (storedOTP.expires < now) {
      delete otpStore[phone];
      return NextResponse.json(
        { success: false, message: 'کد تأیید منقضی شده است' },
        { status: 400 }
      );
    }

    if (storedOTP.code !== code) {
      return NextResponse.json(
        { success: false, message: 'کد تأیید نادرست است' },
        { status: 400 }
      );
    }

    delete otpStore[phone];

    return NextResponse.json({
      success: true,
      message: 'کد تأیید صحیح است',
      verified: true,
    });

  } catch (error: any) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { success: false, message: 'خطا در تأیید کد' },
      { status: 500 }
    );
  }
}
