import mongoose, { Schema, Model } from 'mongoose';

export interface IBooking {
  _id?: string;
  bookingReference: string; // AFB-YYYY-00001
  bookingType: "FLIGHT" | "UMRAH" | "TOUR" | "BUS";
  userId: string;
  userName: string;
  userEmail: string;

  tripDetails: {
    from: string;
    to: string;
    departureDate: Date;
    returnDate?: Date;
    airline?: string;
    busId?: string;
  };

  travelers: {
    fullName: string;
    gender: string;
    dateOfBirth: Date;
    passportNumber?: string;
    passportExpiry?: Date;
    seatNumber?: string;
  }[];

  contact: {
    phone: string;
    whatsapp?: string;
    email: string;
    province?: string;
    city?: string;
  };

  paymentMethod?: "OFFICE" | "BANK" | "MPAISA";
  paymentStatus: "pending_office_payment" | "pending_verification" | "paid";
  bookingStatus: "pending_payment" | "confirmed" | "cancelled";

  transactionId?: string;
  receiptImage?: string;
  totalAmount: number;
  holdExpiresAt: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    bookingReference: { type: String, unique: true, required: true },
    bookingType: {
      type: String,
      enum: ["FLIGHT", "UMRAH", "TOUR", "BUS"],
      required: true
    },
    userId: { type: String, required: true, index: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },

    tripDetails: {
      from: { type: String, required: true },
      to: { type: String, required: true },
      departureDate: { type: Date, required: true },
      returnDate: { type: Date },
      airline: { type: String },
      busId: { type: String },
    },

    travelers: [
      {
        fullName: { type: String, required: true },
        gender: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        passportNumber: { type: String },
        passportExpiry: { type: Date },
        seatNumber: { type: String },
      },
    ],

    contact: {
      phone: { type: String, required: true },
      whatsapp: { type: String },
      email: { type: String, required: true },
      province: { type: String },
      city: { type: String },
    },

    paymentMethod: {
      type: String,
      enum: ["OFFICE", "BANK", "MPAISA"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending_office_payment", "pending_verification", "paid"],
      default: "pending_verification",
    },
    bookingStatus: {
      type: String,
      enum: ["pending_payment", "confirmed", "cancelled"],
      default: "pending_payment",
    },

    transactionId: { type: String },
    receiptImage: { type: String },
    totalAmount: { type: Number, required: true },
    holdExpiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

// Create indexes for faster queries
BookingSchema.index({ userId: 1, bookingStatus: 1 });
BookingSchema.index({ bookingReference: 1 });
BookingSchema.index({ holdExpiresAt: 1 }, { expireAfterSeconds: 0 }); // Automatic deletion after expiry if needed, or just for query

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
