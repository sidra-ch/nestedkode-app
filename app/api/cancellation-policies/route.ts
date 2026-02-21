import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import CancellationPolicy from '@/models/CancellationPolicy';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const serviceType = searchParams.get('serviceType');
    const serviceId = searchParams.get('serviceId');

    const query: any = { isActive: true };

    if (serviceType) {
      query.serviceType = serviceType;
    }

    if (serviceId) {
      query.$or = [{ serviceId }, { isDefault: true }];
    }

    const policies = await CancellationPolicy.find(query).sort({ isDefault: 1 });

    return NextResponse.json({
      success: true,
      count: policies.length,
      policies,
    });

  } catch (error: any) {
    console.error('Get policies error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch policies' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Admin access required' }, { status: 403 });
    }

    await connectDB();

    const body = await request.json();
    const { serviceType, serviceId, name, rules, isDefault } = body;

    if (!serviceType || !name || !rules || !Array.isArray(rules)) {
      return NextResponse.json(
        { success: false, message: 'Service type, name, and rules are required' },
        { status: 400 }
      );
    }

    if (isDefault) {
      await CancellationPolicy.updateMany(
        { serviceType, isDefault: true },
        { isDefault: false }
      );
    }

    const policy = await CancellationPolicy.create({
      serviceType,
      serviceId,
      name,
      rules,
      isDefault: isDefault || false,
      isActive: true,
      createdBy: user.userId,
    });

    return NextResponse.json({
      success: true,
      policy,
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create policy error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create policy' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Admin access required' }, { status: 403 });
    }

    await connectDB();

    const body = await request.json();
    const { policyId, ...updateData } = body;

    if (!policyId) {
      return NextResponse.json(
        { success: false, message: 'Policy ID is required' },
        { status: 400 }
      );
    }

    const policy = await CancellationPolicy.findByIdAndUpdate(
      policyId,
      updateData,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      policy,
    });

  } catch (error: any) {
    console.error('Update policy error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update policy' },
      { status: 500 }
    );
  }
}
