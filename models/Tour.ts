import mongoose, { Schema, Model } from 'mongoose';

export interface ITour {
  _id?: string;
  title: string;
  description: string;
  category: 'domestic' | 'nowruz_domestic' | 'taxi' | 'oneday' | 'exhibition';
  city: string;
  duration: string;
  price: number;
  priceUSD?: number;
  image: string;
  images?: string[];
  rating?: number;
  reviews?: number;
  availableSeats: number;
  totalSeats: number;
  departureDate?: Date;
  returnDate?: Date;
  includes: string[];
  excludes?: string[];
  highlights?: string[];
  itinerary?: {
    day: number;
    title: string;
    description: string;
    activities: string[];
  }[];
  vendorId?: string;
  isActive: boolean;
  isApproved: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const TourSchema = new Schema<ITour>(
  {
    title: {
      type: String,
      required: [true, 'Tour title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Tour description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Tour category is required'],
      enum: ['domestic', 'nowruz_domestic', 'taxi', 'oneday', 'exhibition'],
      default: 'domestic',
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    priceUSD: {
      type: Number,
      min: [0, 'Price cannot be negative'],
    },
    image: {
      type: String,
      required: [true, 'Main image is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: {
      type: Number,
      min: 0,
      default: 0,
    },
    availableSeats: {
      type: Number,
      required: [true, 'Available seats is required'],
      min: [0, 'Available seats cannot be negative'],
    },
    totalSeats: {
      type: Number,
      required: [true, 'Total seats is required'],
      min: [1, 'Total seats must be at least 1'],
    },
    departureDate: {
      type: Date,
    },
    returnDate: {
      type: Date,
    },
    includes: {
      type: [String],
      default: [],
    },
    excludes: {
      type: [String],
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
    itinerary: {
      type: [
        {
          day: { type: Number, required: true },
          title: { type: String, required: true },
          description: { type: String, required: true },
          activities: { type: [String], default: [] },
        },
      ],
      default: [],
    },
    vendorId: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
TourSchema.index({ city: 1, category: 1, isActive: 1, isApproved: 1 });
TourSchema.index({ price: 1 });
TourSchema.index({ rating: -1 });
TourSchema.index({ vendorId: 1 });

const Tour: Model<ITour> = mongoose.models.Tour || mongoose.model<ITour>('Tour', TourSchema);

export default Tour;
