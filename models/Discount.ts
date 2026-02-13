import mongoose, { Schema, Document } from "mongoose";

export interface IDiscount extends Document {
  code: string;
  description: string;
  type: "percentage" | "fixed";
  value: number;
  serviceTypes: ("flight" | "hotel" | "bus" | "taxi")[];
  minPurchase: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const DiscountSchema: Schema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    serviceTypes: {
      type: [String],
      enum: ["flight", "hotel", "bus", "taxi"],
      required: true,
    },
    minPurchase: {
      type: Number,
      default: 0,
    },
    maxDiscount: {
      type: Number,
    },
    usageLimit: {
      type: Number,
      default: 0, // 0 means unlimited
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
DiscountSchema.index({ code: 1, isActive: 1 });
DiscountSchema.index({ validFrom: 1, validUntil: 1 });

export default mongoose.models.Discount || mongoose.model<IDiscount>("Discount", DiscountSchema);
