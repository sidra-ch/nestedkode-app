import { v2 as cloudinary } from 'cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // List images from the 'nestedkode' folder (change as needed)
    const result = await cloudinary.search
      .expression('folder:nestedkode/*')
      .sort_by('created_at','desc')
      .max_results(30)
      .execute();

    const images = result.resources.map((img: any) => ({
      url: img.secure_url,
      public_id: img.public_id,
    }));

    res.status(200).json({ success: true, images });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch images', error });
  }
}
