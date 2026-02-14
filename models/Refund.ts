import mongoose, { Schema, Model } from 'mongoose';

export interface IRefund {
  _id?: string;
  paymentId: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed' | 'failed';
  reason: string;
  refundMethod: 'original_payment' | 'bank_transfer' | 'wallet';
  bankDetails?: {
    accountNumber: string;
    iban: string;
    bankName: string;
  };
  adminNote?: string;
  processedAt?: Date;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const RefundSchema = new Schema<IRefund>(
  {
    paymentId: {
      type: String,
      required: true,
      index: true,
    },
    bookingId: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'AFN',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'processed', 'failed'],
      default: 'pending',
      index: true,
    },
    reason: {
      type: String,
      required: true,
    },
    refundMethod: {
      type: String,
      enum: ['original_payment', 'bank_transfer', 'wallet'],
      default: 'original_payment',
    },
    bankDetails: {
      accountNumber: String,
      iban: String,
      bankName: String,
    },
    adminNote: String,
    processedAt: Date,
    createdBy: String,
  },
  {
    timestamps: true,
  }
);

RefundSchema.index({ userId: 1, status: 1 });
RefundSchema.index({ bookingId: 1 });

const Refund: Model<IRefund> = 
  mongoose.models.Refund || mongoose.model<IRefund>('Refund', RefundSchema);

export default Refund;
