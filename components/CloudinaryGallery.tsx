"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface CloudinaryImage {
  url: string;
  public_id: string;
}

export default function CloudinaryGallery() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/cloudinary-list');
        const data = await res.json();
        if (data.success) {
          setImages(data.images);
        } else {
          setError(data.message || 'Failed to load images');
        }
      } catch {
        setError('Failed to load images');
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.public_id} className="border rounded-lg overflow-hidden">
            <Image src={img.url} alt={img.public_id} width={300} height={160} className="w-full h-40 object-cover" />
            <div className="p-2 text-xs break-all">{img.public_id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
