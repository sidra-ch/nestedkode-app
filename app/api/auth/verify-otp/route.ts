import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import OTP from '@/models/OTP';
import { generateToken } from '@/lib/auth';
import { comparePassword } from '@/lib/helpers'; // Using bcrypt.compare indirectly

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { email, otp } = await request.json();

        if (!email || !otp) {
            return NextResponse.json({ success: false, message: 'Email and OTP are required' }, { status: 400 });
        }

        const otpData = await OTP.findOne({ email: email.toLowerCase() });

        if (!otpData) {
            return NextResponse.json({ success: false, message: 'OTP expired or not requested' }, { status: 400 });
        }

        // Check attempts (Rate limiting)
        if (otpData.attempts >= 5) {
            return NextResponse.json({ success: false, message: 'Too many attempts. Please request a new OTP.' }, { status: 429 });
        }

        // Verify OTP
        const isOtpValid = await comparePassword(otp, otpData.otp);

        if (!isOtpValid) {
            otpData.attempts += 1;
            await otpData.save();
            return NextResponse.json({ success: false, message: 'Invalid OTP' }, { status: 401 });
        }

        // Check expiration (although TTL index handles it, double check)
        if (new Date() > otpData.expiresAt) {
            return NextResponse.json({ success: false, message: 'OTP has expired' }, { status: 400 });
        }

        // Success - Get/Create user
        let user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            // Create new user if first time
            user = await User.create({
                name: email.split('@')[0], // Default name
                email: email.toLowerCase(),
                isVerified: true,
                role: 'user',
            });
        } else if (!user.isVerified) {
            user.isVerified = true;
            await user.save();
        }

        // Delete OTP after successful verification
        await OTP.deleteOne({ email: email.toLowerCase() });

        // Generate JWT
        const token = generateToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        });

        return NextResponse.json({
            success: true,
            message: 'Authentication successful',
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified
            }
        });

    } catch (error: any) {
        console.error('Verify OTP error:', error);
        return NextResponse.json({ success: false, message: 'Verification failed' }, { status: 500 });
    }
}
