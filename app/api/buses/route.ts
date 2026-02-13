import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Bus from '@/models/Bus';
import { getUserFromRequest } from '@/lib/auth';

// GET - List all buses or search
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const date = searchParams.get('date');
    const vendorId = searchParams.get('vendorId');

    const query: any = { isActive: true };

    if (from) query.from = new RegExp(from, 'i');
    if (to) query.to = new RegExp(to, 'i');
    if (vendorId) query.vendorId = vendorId;

    const buses = await Bus.find(query).sort({ departureTime: 1 });

    return NextResponse.json(
      {
        success: true,
        count: buses.length,
        buses,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get buses error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch buses', error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new bus (Vendor only)
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);

    if (!user || (user.role !== 'vendor' && user.role !== 'admin')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized - Vendor or Admin access required' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const {
      busName,
      busNumber,
      busType,
      totalSeats,
      from,
      to,
      departureTime,
      arrivalTime,
      duration,
      price,
      amenities,
      images,
    } = body;

    // Validation
    if (!busName || !busNumber || !busType || !totalSeats || !from || !to || !departureTime || !arrivalTime || !price) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Check if bus number already exists
    const existingBus = await Bus.findOne({ busNumber });
    if (existingBus) {
      return NextResponse.json(
        { success: false, message: 'Bus number already exists' },
        { status: 400 }
      );
    }

    // Get vendor name from user
    const User = (await import('@/models/User')).default;
    const vendor = await User.findById(user.userId);

    const bus = await Bus.create({
      vendorId: user.userId,
      vendorName: vendor?.name || 'Unknown',
      busName,
      busNumber,
      busType,
      totalSeats,
      availableSeats: totalSeats,
      from,
      to,
      departureTime,
      arrivalTime,
      duration: duration || 'TBD',
      price,
      amenities: amenities || [],
      images: images || [],
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Bus created successfully',
        bus,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create bus error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create bus', error: error.message },
      { status: 500 }
    );
  }
}
