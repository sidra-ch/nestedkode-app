import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Tour from '@/models/Tour';

type RouteParams = {
  params: Promise<{ id: string }>;
};

// GET - Get single tour by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;

    const tour = await Tour.findById(id);

    if (!tour) {
      return NextResponse.json(
        { success: false, message: 'Tour not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        tour,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get tour error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tour', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT - Update tour
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const tour = await Tour.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!tour) {
      return NextResponse.json(
        { success: false, message: 'Tour not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Tour updated successfully',
        tour,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update tour error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update tour', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete tour
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;

    const tour = await Tour.findByIdAndDelete(id);

    if (!tour) {
      return NextResponse.json(
        { success: false, message: 'Tour not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Tour deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete tour error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete tour', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
