import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import Bus from '@/models/Bus';
import Booking from '@/models/Booking';
import Payment from '@/models/Payment';
import { getUserFromRequest } from '@/lib/auth';

// GET - Admin dashboard statistics
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 401 }
      );
    }

    await connectDB();

    // Get statistics
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalVendors = await User.countDocuments({ role: 'vendor' });
    const pendingVendors = await User.countDocuments({ role: 'vendor', isApproved: false });
    const totalBuses = await Bus.countDocuments();
    const activeBuses = await Bus.countDocuments({ isActive: true });
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    const totalPayments = await Payment.countDocuments();
    const completedPayments = await Payment.countDocuments({ status: 'completed' });

    // Calculate total revenue
    const revenueResult = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // Recent bookings
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(10);

    return NextResponse.json(
      {
        success: true,
        statistics: {
          users: {
            total: totalUsers,
            vendors: totalVendors,
            pendingVendors,
          },
          buses: {
            total: totalBuses,
            active: activeBuses,
          },
          bookings: {
            total: totalBookings,
            pending: pendingBookings,
            completed: completedBookings,
          },
          payments: {
            total: totalPayments,
            completed: completedPayments,
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
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard data', error: (error as Error).message },
      { status: 500 }
    );
  }
}
