import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { hashPassword } from '@/lib/helpers';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, password, role = 'user', phone } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      phone,
      isApproved: role === 'vendor' ? false : true, // Vendors need approval
    });

    // Assuming generateToken is defined elsewhere and imported, or needs to be added.
    // For now, I'll assume it's available or will be added by the user.
    // If not, this line will cause a reference error.
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Update initial login activity
    user.lastLogin = new Date();
    user.loginCount = 1;
    await user.save();

    // Remove password from response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      isApproved: user.isApproved,
    };

    return NextResponse.json(
      {
        success: true,
        message: role === 'vendor'
          ? 'Registration successful! Your account is pending approval.'
          : 'Registration successful!',
        token,
        user: userResponse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Registration failed', error: (error as Error).message },
      { status: 500 }
    );
  }
}
