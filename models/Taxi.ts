import mongoose, { Schema, Document } from "mongoose";

export interface ITaxi extends Document {
  driverId: mongoose.Types.ObjectId;
  driverName: string;
  driverPhone: string;
  vehicleType: "sedan" | "suv" | "minivan" | "luxury";
  vehicleModel: string;
  vehiclePlate: string;
  vehicleColor: string;
  from: string;
  to: string;
  departureDate: Date;
  departureTime: string;
  price: number;
  currency: string;
  totalSeats: number;
  availableSeats: number;
  amenities: string[];
  status: "active" | "completed" | "cancelled";
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TaxiSchema: Schema = new Schema(
  {
    driverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    driverPhone: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      enum: ["sedan", "suv", "minivan", "luxury"],
      required: true,
      index: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    vehiclePlate: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleColor: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
      index: true,
    },
    to: {
      type: String,
      required: true,
      index: true,
    },
    departureDate: {
      type: Date,
      required: true,
      index: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "AFN",
    },
    totalSeats: {
      type: Number,
      required: true,
      min: 1,
      max: 7,
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 0,
    },
    amenities: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
    isApproved: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
TaxiSchema.index({ from: 1, to: 1, departureDate: 1, isApproved: 1 });
TaxiSchema.index({ driverId: 1, status: 1 });

export default mongoose.models.Taxi || mongoose.model<ITaxi>("Taxi", TaxiSchema);
