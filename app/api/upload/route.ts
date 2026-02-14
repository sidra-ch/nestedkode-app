import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

// POST - Upload image file
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'tour', 'bus', 'hotel', etc.

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid file type. Only JPEG, PNG, and WebP allowed' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: 'File size too large. Maximum 5MB allowed' },
        { status: 400 }
      );
    }

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', type || 'general');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split('.').pop();
    const filename = `${type || 'image'}-${timestamp}-${randomString}.${extension}`;

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return public URL
    const publicUrl = `/uploads/${type || 'general'}/${filename}`;

    return NextResponse.json(
      {
        success: true,
        message: 'File uploaded successfully',
        url: publicUrl,
        filename,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Upload failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete uploaded image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { success: false, message: 'No file URL provided' },
        { status: 400 }
      );
    }

    // Security: Ensure the file is in uploads directory
    if (!url.startsWith('/uploads/')) {
      return NextResponse.json(
        { success: false, message: 'Invalid file path' },
        { status: 400 }
      );
    }

    const filepath = path.join(process.cwd(), 'public', url);
    
    if (existsSync(filepath)) {
      const { unlink } = await import('fs/promises');
      await unlink(filepath);
      
      return NextResponse.json(
        { success: true, message: 'File deleted successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'File not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Delete failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
