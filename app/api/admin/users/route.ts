import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const auth = getUserFromRequest(request);
        if (!auth || auth.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const users = await User.find({}, 'name email role lastLogin loginCount isApproved')
            .sort({ lastLogin: -1 })
            .limit(50);

        const stats = {
            totalUsers: await User.countDocuments(),
            activeToday: await User.countDocuments({
                lastLogin: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
            }),
            vendors: await User.countDocuments({ role: 'vendor' }),
            admins: await User.countDocuments({ role: 'admin' })
        };

        return NextResponse.json({
            success: true,
            users,
            stats
        });
    } catch (error) {
        console.error('Admin users API error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
