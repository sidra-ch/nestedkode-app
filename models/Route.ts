import mongoose, { Schema, Model } from 'mongoose';

export interface IRoute {
  _id?: string;
  from: string;
  to: string;
  distance: number; // in kilometers
  duration: string; // e.g., "6h 30m"
  isActive: boolean;
  popularRoute: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const RouteSchema = new Schema<IRoute>(
  {
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
    distance: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    popularRoute: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create unique compound index
RouteSchema.index({ from: 1, to: 1 }, { unique: true });

const Route: Model<IRoute> = mongoose.models.Route || mongoose.model<IRoute>('Route', RouteSchema);

export default Route;
