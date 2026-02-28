import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../lib/cloudinary';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Adjust as needed
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { file, folder } = req.body;
  if (!file) {
    return res.status(400).json({ success: false, message: 'No file provided' });
  }

  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: folder || 'nestedkode',
    });
    res.status(200).json({ success: true, data: uploadResponse });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Upload failed', error });
  }
}
