import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  userId: mongoose.Types.ObjectId;
  userName: string;
  serviceType: "flight" | "hotel" | "bus" | "taxi";
  serviceId: mongoose.Types.ObjectId;
  rating: number;
  title: string;
  comment: string;
  pros: string[];
  cons: string[];
  isApproved: boolean;
  isVerifiedBooking: boolean;
  adminResponse?: string;
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    userName: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      enum: ["flight", "hotel", "bus", "taxi"],
      required: true,
      index: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    pros: {
      type: [String],
      default: [],
    },
    cons: {
      type: [String],
      default: [],
    },
    isApproved: {
      type: Boolean,
      default: false,
      index: true,
    },
    isVerifiedBooking: {
      type: Boolean,
      default: false,
    },
    adminResponse: {
      type: String,
    },
    helpfulCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
ReviewSchema.index({ serviceType: 1, serviceId: 1, isApproved: 1 });
ReviewSchema.index({ rating: -1 });

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
