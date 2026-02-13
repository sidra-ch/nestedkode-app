import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Route from '@/models/Route';
import { getUserFromRequest } from '@/lib/auth';

// GET - Get all routes
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const popular = searchParams.get('popular');

    const query: any = { isActive: true };
    if (popular === 'true') {
      query.popularRoute = true;
    }

    const routes = await Route.find(query).sort({ from: 1, to: 1 });

    return NextResponse.json(
      {
        success: true,
        count: routes.length,
        routes,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get routes error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch routes', error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create route (Admin only)
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { from, to, distance, duration, popularRoute } = body;

    // Validation
    if (!from || !to || !distance || !duration) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if route already exists
    const existingRoute = await Route.findOne({ from, to });
    if (existingRoute) {
      return NextResponse.json(
        { success: false, message: 'Route already exists' },
        { status: 400 }
      );
    }

    const route = await Route.create({
      from,
      to,
      distance,
      duration,
      popularRoute: popularRoute || false,
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Route created successfully',
        route,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create route error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create route', error: error.message },
      { status: 500 }
    );
  }
}
