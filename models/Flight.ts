import mongoose, { Schema, Document } from "mongoose";

export interface IFlight extends Document {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  duration: number; // in minutes
  Price: number;
  currency: string;
  totalSeats: number;
  availableSeats: number;
  class: "economy" | "business" | "first";
  type: "domestic" | "international";
  status: "scheduled" | "delayed" | "cancelled" | "completed";
  amenities: string[];
  baggage: {
    cabin: number; // kg
    checked: number; // kg
  };
  vendorId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FlightSchema: Schema = new Schema(
  {
    flightNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    airline: {
      type: String,
      required: true,
      index: true,
    },
    origin: {
      type: String,
      required: true,
      index: true,
    },
    destination: {
      type: String,
      required: true,
      index: true,
    },
    departureTime: {
      type: Date,
      required: true,
      index: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
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
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 0,
    },
    class: {
      type: String,
      enum: ["economy", "business", "first"],
      default: "economy",
    },
    type: {
      type: String,
      enum: ["domestic", "international"],
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "delayed", "cancelled", "completed"],
      default: "scheduled",
    },
    amenities: {
      type: [String],
      default: [],
    },
    baggage: {
      cabin: {
        type: Number,
        default: 7,
      },
      checked: {
        type: Number,
        default: 23,
      },
    },
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
FlightSchema.index({ origin: 1, destination: 1, departureTime: 1 });
FlightSchema.index({ type: 1, status: 1 });

export default mongoose.models.Flight || mongoose.model<IFlight>("Flight", FlightSchema);
