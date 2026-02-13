import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: "booking" | "payment" | "reminder" | "refund" | "general";
  title: string;
  message: string;
  channel: "email" | "sms" | "both";
  status: "pending" | "sent" | "failed";
  metadata?: {
    bookingId?: string;
    serviceType?: string;
    amount?: number;
  };
  sentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["booking", "payment", "reminder", "refund", "general"],
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
      enum: ["email", "sms", "both"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
      index: true,
    },
    metadata: {
      bookingId: String,
      serviceType: String,
      amount: Number,
    },
    sentAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
NotificationSchema.index({ userId: 1, status: 1 });
NotificationSchema.index({ type: 1, createdAt: -1 });

export default mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema);
