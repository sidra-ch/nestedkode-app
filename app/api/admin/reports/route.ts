import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import Payment from '@/models/Payment';
import Refund from '@/models/Refund';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Admin access required' }, { status: 403 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'bookings';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const format = searchParams.get('format') || 'json';

    let query: any = {};
    let data: any[] = [];

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    switch (type) {
      case 'bookings':
        data = await Booking.find(query)
          .sort({ createdAt: -1 })
          .limit(1000)
          .lean();
        break;

      case 'payments':
        data = await Payment.find(query)
          .sort({ createdAt: -1 })
          .limit(1000)
          .lean();
        break;

      case 'refunds':
        data = await Refund.find(query)
          .sort({ createdAt: -1 })
          .limit(1000)
          .lean();
        break;

      case 'revenue':
        const revenueData = await Payment.aggregate([
          { $match: { status: 'completed', ...query } },
          {
            $group: {
              _id: {
                year: { $year: '$createdAt' },
                month: { $month: '$createdAt' },
              },
              totalAmount: { $sum: '$amount' },
              count: { $sum: 1 },
            },
          },
          { $sort: { '_id.year': -1, '_id.month': -1 } },
        ]);
        return NextResponse.json({
          success: true,
          type: 'revenue',
          data: revenueData,
        });

      case 'summary':
        const summary = {
          totalBookings: await Booking.countDocuments(query),
          totalPayments: await Payment.countDocuments({ ...query, status: 'completed' }),
          totalRefunds: await Refund.countDocuments({ ...query, status: 'processed' }),
          revenue: await Payment.aggregate([
            { $match: { status: 'completed', ...query } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
          ]),
        };
        return NextResponse.json({
          success: true,
          type: 'summary',
          data: summary,
        });

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid report type' },
          { status: 400 }
        );
    }

    if (format === 'csv') {
      if (data.length === 0) {
        return NextResponse.json(
          { success: false, message: 'No data to export' },
          { status: 404 }
        );
      }

      const headers = Object.keys(data[0]).join(',');
      const rows = data.map((item: any) => 
        Object.values(item).map((v: any) => 
          typeof v === 'string' && v.includes(',') ? `"${v}"` : v
        ).join(',')
      );

      const csv = [headers, ...rows].join('\n');

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${type}_report.csv"`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      type,
      count: data.length,
      data,
    });

  } catch (error: any) {
    console.error('Generate report error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate report' },
      { status: 500 }
    );
  }
}
