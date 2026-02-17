import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { comparePassword } from '@/lib/helpers';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if vendor is approved
    if (user.role === 'vendor' && !user.isApproved) {
      return NextResponse.json(
        { success: false, message: 'Your vendor account is pending approval' },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // User response without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      vendorId: user.vendorId,
      isApproved: user.isApproved,
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        token,
        user: userResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    // Extra logging for debugging
    console.error('Login error:', error);
    try {
      return NextResponse.json(
        { success: false, message: 'Login failed', error: (error as Error).message },
        { status: 500 }
      );
    } catch (jsonError) {
      // Fallback: return plain text if JSON response fails
      return new Response('Login failed: ' + (error as Error).message, { status: 500, headers: { 'Content-Type': 'text/plain' } });
    }
  }
}
