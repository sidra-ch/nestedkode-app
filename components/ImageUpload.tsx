"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  value?: string | string[];
  onChange: (url: string | string[]) => void;
  multiple?: boolean;
  type: 'tour' | 'bus' | 'hotel' | 'taxi' | 'flight' | 'restaurant';
  maxFiles?: number;
}

export default function ImageUpload({ 
  value, 
  onChange, 
  multiple = false, 
  type,
  maxFiles = 5 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const currentImages = Array.isArray(value) ? value : value ? [value] : [];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check max files limit
    if (multiple && currentImages.length + files.length > maxFiles) {
      setError(`حداکثر ${maxFiles} تصویر مجاز است`);
      return;
    }

    setUploading(true);
    setError('');

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          uploadedUrls.push(data.url);
        } else {
          throw new Error(data.message);
        }
      }

      if (multiple) {
        onChange([...currentImages, ...uploadedUrls]);
      } else {
        onChange(uploadedUrls[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در آپلود تصویر');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (url: string) => {
    try {
      // Delete from server
      await fetch(`/api/upload?url=${encodeURIComponent(url)}`, {
        method: 'DELETE',
      });

      // Update state
      if (multiple) {
        const updated = currentImages.filter(img => img !== url);
        onChange(updated);
      } else {
        onChange('');
      }
    } catch (err) {
      console.error('Error deleting image:', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div>
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <div className="text-orange-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">
                  {multiple ? 'تصاویر را اینجا بکشید یا کلیک کنید' : 'تصویر را اینجا بکشید یا کلیک کنید'}
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP (حداکثر 5MB)</p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple={multiple}
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Preview Images */}
      {currentImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentImages.map((url, index) => (
            <div key={index} className="relative group">
              <Image
                src={url}
                alt={`تصویر ${index + 1}`}
                width={200}
                height={128}
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      {multiple && currentImages.length > 0 && (
        <p className="text-sm text-gray-500 text-right">
          {currentImages.length} از {maxFiles} تصویر
        </p>
      )}
    </div>
  );
}
