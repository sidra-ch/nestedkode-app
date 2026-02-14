import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import NotificationSettings from '@/models/NotificationSettings';
import { getUserFromRequest } from '@/lib/auth';

const defaultSettings = [
  { key: 'notify_booking_confirmation', value: true, category: 'general', description: 'ارسال اعلان تایید رزرو', isActive: true },
  { key: 'notify_payment_confirmation', value: true, category: 'general', description: 'ارسال اعلان تایید پرداخت', isActive: true },
  { key: 'notify_travel_reminder', value: true, category: 'general', description: 'ارسال یادآوری سفر', isActive: true },
  { key: 'notify_refund_notification', value: true, category: 'general', description: 'ارسال اعلان بازگشت وجه', isActive: true },
  { key: 'notify_cancellation', value: true, category: 'general', description: 'ارسال اعلان کنسلی', isActive: true },
  { key: 'email_enabled', value: true, category: 'email', description: 'فعال سازی اعلان ایمیلی', isActive: true },
  { key: 'sms_enabled', value: false, category: 'sms', description: 'فعال سازی اعلان پیامکی', isActive: true },
];

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const settings = await NotificationSettings.find();

    const allSettings = defaultSettings.map(defaultSetting => {
      const existing = settings.find(s => s.key === defaultSetting.key);
      return existing || defaultSetting;
    });

    return NextResponse.json({
      success: true,
      settings: allSettings,
    });

  } catch (error: any) {
    console.error('Get settings error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Admin access required' }, { status: 403 });
    }

    await connectDB();

    const body = await request.json();
    const { key, value, category, description } = body;

    if (!key || value === undefined) {
      return NextResponse.json(
        { success: false, message: 'Key and value are required' },
        { status: 400 }
      );
    }

    const setting = await NotificationSettings.findOneAndUpdate(
      { key },
      { value, category, description, isActive: true },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      setting,
    });

  } catch (error: any) {
    console.error('Update setting error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update setting' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Admin access required' }, { status: 403 });
    }

    await connectDB();

    for (const setting of defaultSettings) {
      await NotificationSettings.findOneAndUpdate(
        { key: setting.key },
        setting,
        { upsert: true }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Default settings restored',
    });

  } catch (error: any) {
    console.error('Reset settings error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reset settings' },
      { status: 500 }
    );
  }
}
