import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import OTP from '@/models/OTP';
import { hashOTP } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
        }

        // Generate 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = await hashOTP(otpCode);

        // Save to DB
        await OTP.findOneAndUpdate(
            { email: email.toLowerCase() },
            {
                otp: hashedOtp,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
                attempts: 0
            },
            { upsert: true, new: true }
        );

        // In a real production app, you would send this via Nodemailer/Twilio
        // For this project, we'll log it for testing and return a success message
        console.log(`[AUTH] OTP for ${email}: ${otpCode}`);

        return NextResponse.json({
            success: true,
            message: 'OTP sent successfully. Please check your email.',
            // Only include this in development/testing if user doesn't have an email service set up
            debugOtp: process.env.NODE_ENV === 'development' ? otpCode : undefined
        });

    } catch (error: any) {
        console.error('Request OTP error:', error);
        return NextResponse.json({ success: false, message: 'Failed to request OTP' }, { status: 500 });
    }
}
