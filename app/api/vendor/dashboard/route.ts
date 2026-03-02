import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Bus from '@/models/Bus';
import Booking from '@/models/Booking';
import Payment from '@/models/Payment';
import { getUserFromRequest } from '@/lib/auth';

// GET - Vendor dashboard statistics
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);

    if (!user || user.role !== 'vendor') {
      return NextResponse.json(
        { success: false, message: 'Vendor access required' },
        { status: 401 }
      );
    }

    await connectDB();

    // Get vendor statistics
    const totalBuses = await Bus.countDocuments({ vendorId: user.userId });
    const activeBuses = await Bus.countDocuments({ vendorId: user.userId, isActive: true });
    const totalBookings = await Booking.countDocuments({ vendorId: user.userId });
    const pendingBookings = await Booking.countDocuments({ vendorId: user.userId, status: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ vendorId: user.userId, status: 'confirmed' });

    // Calculate total revenue
    const bookings = await Booking.find({ vendorId: user.userId, paymentStatus: 'paid' });
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

    // Recent bookings
    const recentBookings = await Booking.find({ vendorId: user.userId })
      .sort({ createdAt: -1 })
      .limit(10);

    return NextResponse.json(
      {
        success: true,
        statistics: {
          buses: {
            total: totalBuses,
            active: activeBuses,
          },
          bookings: {
            total: totalBookings,
            pending: pendingBookings,
            confirmed: confirmedBookings,
          },
          revenue: {
            total: totalRevenue,
            currency: 'AFN',
          },
        },
        recentBookings,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Vendor dashboard error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard data', error: error.message },
      { status: 500 }
    );
  }
}
