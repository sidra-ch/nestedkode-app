# 🖼️ Dynamic Image Upload System - Implementation Complete

## ✅ What Has Been Implemented

Your project now has a **fully functional dynamic image system** that allows vendors to upload images for tours and buses, and displays them dynamically on the frontend.

---

## 🎯 How It Works

### **1. Image Upload Flow**

```
Vendor → Upload Form → File Selected → API Endpoint → Saved to /public/uploads/ → URL Stored in Database → Frontend Displays
```

### **2. Components Created**

#### **A. Upload API** ([app/api/upload/route.ts](app/api/upload/route.ts))
- **POST**: Upload images (max 5MB, JPG/PNG/WebP only)
- **DELETE**: Remove uploaded images
- Automatically creates directories: `/public/uploads/tour/`, `/public/uploads/bus/`, etc.
- Generates unique filenames with timestamps

#### **B. ImageUpload Component** ([components/ImageUpload.tsx](components/ImageUpload.tsx))  
- Drag & drop interface
- Multiple image upload support
- Preview with remove buttons
- File validation (type & size)
- Loading states

#### **C. Vendor Forms**
- **Tour Form**: [app/vendor/add-tour/page.tsx](app/vendor/add-tour/page.tsx) - Upload up to 5 tour images
- **Bus Form**: [app/vendor/add-bus/page.tsx](app/vendor/add-bus/page.tsx) - Upload up to 5 bus images

#### **D. Dynamic Frontend Pages**
- **Tour Page**: [app/tour/page.tsx](app/tour/page.tsx) - Fetches tours from database API
- **Bus Page**: [app/bus/page.tsx](app/bus/page.tsx) - Fetches buses from database API
- Shows loading spinners while fetching
- Falls back to placeholder data if API fails

---

## 🚀 How to Use (Step by Step)

### **For Vendors:**

#### **Adding a New Tour with Images**

1. **Login as Vendor**
   - Go to `/login`
   - Login with vendor credentials

2. **Navigate to Add Tour**
   - Go to `/vendor/add-tour`

3. **Fill Tour Details**
   - Title, description, category, city
   - Duration, price, dates
   - Highlights, inclusions

4. **Upload Images**
   - Click the upload area or drag images
   - Upload 1-5 images (max 5MB each)
   - See preview thumbnails
   - Remove unwanted images with X button

5. **Submit**
   - Click "افزودن تور" (Add Tour)
   - Tour waits for admin approval
   - Images saved to `/public/uploads/tour/`

#### **Adding a New Bus with Images**

1. **Navigate to Add Bus**
   - Go to `/vendor/add-bus`

2. **Fill Bus Details**
   - Company name, routes, times
   - Seats, price, bus type

3. **Upload Bus Images**
   - Upload interior/exterior photos
   - Up to 5 images

4. **Submit**
   - Images saved to `/public/uploads/bus/`

---

### **For Users (Frontend):**

#### **Viewing Tours**

1. Go to `/tour`
2. **Page now shows**:
   - Tours from database (if available)
   - Dynamic images uploaded by vendors
   - Loading spinner while fetching
   - Falls back to placeholder tours if database empty

#### **Viewing Buses**

1. Go to `/bus`
2. **Page now shows**:
   - Buses from database
   - Dynamic images
   - Real-time availability

---

## 📁 File Structure

```
project/
├── app/
│   ├── api/
│   │   ├── upload/
│   │   │   └── route.ts          ✅ Upload API
│   │   ├── tours/
│   │   │   └── route.ts          ✅ Tours API (returns dynamic data)
│   │   └── buses/
│   │       └── route.ts          ✅ Buses API (returns dynamic data)
│   ├── vendor/
│   │   ├── add-tour/
│   │   │   └── page.tsx          ✅ Tour upload form
│   │   └── add-bus/
│   │       └── page.tsx          ✅ Bus upload form  
│   ├── tour/
│   │   └── page.tsx              ✅ Dynamic tour display
│   └── bus/
│       └── page.tsx              ✅ Dynamic bus display
├── components/
│   └── ImageUpload.tsx           ✅ Reusable upload component
├── models/
│   ├── Tour.ts                   ✅ Tour schema (includes image + images[])
│   └── Bus.ts                    ✅ Bus schema (includes images[])
└── public/
    └── uploads/                  ✅ Uploaded files go here
        ├── tour/
        ├── bus/
        ├── hotel/
        ├── taxi/
        └── flight/
```

---

## 🔧 Technical Details

### **Image Upload API**

**Endpoint**: `POST /api/upload`

**Request**:
```javascript
const formData = new FormData();
formData.append('file', imageFile);
formData.append('type', 'tour'); // or 'bus', 'hotel', etc.

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});
```

**Response**:
```json
{
  "success": true,
  "url": "/uploads/tour/tour-1738456789123-abc123.jpg",
  "filename": "tour-1738456789123-abc123.jpg"
}
```

### **Validation Rules**

- **File types**: JPEG, JPG, PNG, WebP only
- **Max size**: 5MB per file
- **Max files**: 5 images per tour/bus
- **Naming**: `{type}-{timestamp}-{random}.{ext}`

### **Database Schema**

**Tour Model**:
```typescript
image: string;        // Main image URL
images: string[];     // Array of image URLs
```

**Bus Model**:
```typescript
images: string[];     // Array of image URLs
```

---

## 🎨 Usage in Your Code

### **Using ImageUpload Component**

```tsx
import ImageUpload from '@/components/ImageUpload';

// Single image
<ImageUpload
  value={singleImageUrl}
  onChange={(url) => setImageUrl(url)}
  multiple={false}
  type="tour"
/>

// Multiple images
<ImageUpload
  value={imageArray}
  onChange={(urls) => setImages(urls)}
  multiple={true}
  type="bus"
  maxFiles={5}
/>
```

### **Fetching Dynamic Data**

```tsx
// Tours
const response = await fetch('/api/tours');
const data = await response.json();
const tours = data.tours; // Array of tours with images

// Buses  
const response = await fetch('/api/buses');
const data = await response.json();
const buses = data.buses; // Array of buses with images
```

---

## ✨ Features Implemented

- ✅ File upload API with validation
- ✅ Unique filename generation
- ✅ Drag & drop interface
- ✅ Multiple image upload
- ✅ Image preview
- ✅ Delete uploaded images
- ✅ Loading states
- ✅ Error handling
- ✅ Vendor tour form with images
- ✅ Vendor bus form with images
- ✅ Dynamic tour page (fetches from API)
- ✅ Dynamic bus page (fetches from API)
- ✅ Fallback to placeholder data
- ✅ RTL support
- ✅ Responsive design

---

## 🔮 Next Steps (Optional Enhancements)

### **1. Hotels, Taxis, Flights**
Create similar forms for:
- `/vendor/add-hotel/page.tsx`
- `/vendor/add-taxi/page.tsx`
- `/vendor/add-flight/page.tsx`

Just copy the tour form and change:
```tsx
<ImageUpload type="hotel" ... />
<ImageUpload type="taxi" ... />
```

### **2. Cloud Storage (Recommended for Production)**

Replace local upload with **Cloudinary** or **AWS S3**:

```bash
npm install cloudinary
```

Update `app/api/upload/route.ts`:
```typescript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const result = await cloudinary.uploader.upload(file);
return result.secure_url; // Cloud URL
```

### **3. Image Optimization**

Use Next.js `<Image>` component instead of `<img>`:

```tsx
import Image from 'next/image';

<Image 
  src={tour.image} 
  alt={tour.title}
  width={300}
  height={200}
  className="..."
/>
```

### **4. Admin Approval**

In [app/admin/dashboard/page.tsx](app/admin/dashboard/page.tsx):
- Show pending tours with images
- Approve/reject button
- Updates `isApproved: true` in database

---

## 🎯 How to Test

### **1. Add a Tour**
```
1. Go to /vendor/add-tour
2. Fill: "تور 3 روزه بامیان", "بامیان", Category: domestic
3. Upload 2-3 images
4. Click "افزودن تور"
5. Check: Images saved in /public/uploads/tour/
```

### **2. View Tour**
```
1. Go to /tour
2. See your tour with uploaded images
3. If database empty, see placeholder tours
```

### **3. Check Database**
```mongodb
db.tours.find({ title: "تور 3 روزه بامیان" })
// Should show:
{
  image: "/uploads/tour/tour-12345.jpg",
  images: ["/uploads/tour/tour-12345.jpg", "/uploads/tour/tour-12346.jpg"]
}
```

---

## 🐛 Troubleshooting

### **Images not uploading?**
- Check `/public/uploads/` folder exists (API creates it automatically)
- Check file size < 5MB
- Check file type is JPG/PNG/WebP

### **Tour page shows placeholder data?**
- Check if tours exist in database: `db.tours.find({})`
- Check API response: Open DevTools → Network → `/api/tours`
- Page falls back to hardcoded tours if API fails (by design)

### **Images not displaying?**
- Check image URL starts with `/uploads/`
- Check file exists in `/public/uploads/tour/` folder
- Check browser console for 404 errors

---

## 📸 Summary

Your project now has **complete dynamic image functionality**:

1. **Vendors** can upload images via forms
2. **Images** are saved to server  
3. **Database** stores image URLs
4. **Frontend** displays images dynamically
5. **Fallback** to placeholder data if needed

**All Tours and Buses now support dynamic images!** 🎉

For Hotels, Taxis, and Flights, follow the same pattern as Tours.
