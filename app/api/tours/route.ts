import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Tour from '@/models/Tour';

// GET - Get all tours or search tours
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const city = searchParams.get('city');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');

    const query: Record<string, unknown> = { isActive: true, isApproved: true };

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Filter by city
    if (city) {
      query.city = city;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search in title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    const tours = await Tour.find(query).sort({ rating: -1, createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: tours.length,
        tours,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get tours error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tours', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST - Create a new tour (vendor only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      title,
      description,
      category,
      city,
      duration,
      price,
      priceUSD,
      image,
      images,
      availableSeats,
      totalSeats,
      departureDate,
      returnDate,
      includes,
      excludes,
      highlights,
      itinerary,
      vendorId,
    } = body;

    // Validation
    if (!title || !description || !category || !city || !duration || !price || !image || !availableSeats || !totalSeats) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create tour
    const tour = await Tour.create({
      title,
      description,
      category,
      city,
      duration,
      price,
      priceUSD,
      image,
      images: images || [],
      availableSeats,
      totalSeats,
      departureDate,
      returnDate,
      includes: includes || [],
      excludes: excludes || [],
      highlights: highlights || [],
      itinerary: itinerary || [],
      vendorId,
      isActive: true,
      isApproved: false, // Requires admin approval
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Tour created successfully. Pending approval.',
        tour,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create tour error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create tour', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
