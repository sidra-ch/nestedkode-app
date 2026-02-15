import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Define Cloudinary upload result type
interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: unknown;
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST - Upload image file to Cloudinary
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

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `nestedkode/${type || 'general'}`,
          resource_type: 'auto',
          quality: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(buffer);
    });

    const uploadResult = result as CloudinaryUploadResult;

    return NextResponse.json(
      {
        success: true,
        message: 'File uploaded successfully',
        url: uploadResult.secure_url,
        filename: uploadResult.public_id,
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

// DELETE - Delete uploaded image from Cloudinary
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('publicId');

    if (!publicId) {
      return NextResponse.json(
        { success: false, message: 'No public ID provided' },
        { status: 400 }
      );
    }

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      return NextResponse.json(
        { success: true, message: 'File deleted successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'File not found on Cloudinary' },
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
