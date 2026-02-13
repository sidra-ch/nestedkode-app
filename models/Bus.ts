import mongoose, { Schema, Model } from 'mongoose';

export interface IBus {
  _id?: string;
  vendorId: string;
  vendorName: string;
  busName: string;
  busNumber: string;
  busType: 'AC' | 'Non-AC' | 'Sleeper' | 'Semi-Sleeper';
  totalSeats: number;
  availableSeats: number;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  amenities: string[];
  images?: string[];
  isActive: boolean;
  rating?: number;
  totalReviews?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const BusSchema = new Schema<IBus>(
  {
    vendorId: {
      type: String,
      required: true,
      index: true,
    },
    vendorName: {
      type: String,
      required: true,
    },
    busName: {
      type: String,
      required: [true, 'Bus name is required'],
      trim: true,
    },
    busNumber: {
      type: String,
      required: [true, 'Bus number is required'],
      unique: true,
      trim: true,
    },
    busType: {
      type: String,
      enum: ['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper'],
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 0,
    },
    from: {
      type: String,
      required: true,
      trim: true,
    },
    to: {
      type: String,
      required: true,
      trim: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4.5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound indexes for faster searches
BusSchema.index({ from: 1, to: 1, departureTime: 1 });
BusSchema.index({ vendorId: 1, isActive: 1 });

const Bus: Model<IBus> = mongoose.models.Bus || mongoose.model<IBus>('Bus', BusSchema);

export default Bus;
