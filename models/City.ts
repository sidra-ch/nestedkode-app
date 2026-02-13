import mongoose, { Schema, Document } from "mongoose";

export interface ICity extends Document {
  name: string;
  nameEn: string;
  namePs: string;
  country: string;
  airportCode?: string;
  type: "domestic" | "international";
  isActive: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}

const CitySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    nameEn: {
      type: String,
      required: true,
    },
    namePs: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      default: "Afghanistan",
    },
    airportCode: {
      type: String,
      uppercase: true,
      sparse: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["domestic", "international"],
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    location: {
      latitude: Number,
      longitude: Number,
    },
    timezone: {
      type: String,
      default: "Asia/Kabul",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
CitySchema.index({ name: 1, isActive: 1 });
CitySchema.index({ type: 1, isActive: 1 });

export default mongoose.models.City || mongoose.model<ICity>("City", CitySchema);
