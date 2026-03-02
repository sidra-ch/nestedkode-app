import mongoose, { Schema, Model } from 'mongoose';

export type BookingStatus =
  | "seat_held"           // Initial state when user starts checkout
  | "pending_payment"     // User submitted traveler info, waiting for proof
  | "pending_verification" // User uploaded proof, waiting for Admin
  | "confirmed"           // Admin verified payment
  | "ticket_issued"       // Final stage
  | "cancelled"           // Expired or manually cancelled
  | "failed";             // Payment failed

export type PaymentStatus =
  | "unpaid"
  | "pending_verification"
  | "paid"
  | "refunded";

export interface IBooking {
  _id?: string;
  bookingReference: string;
  bookingType: "FLIGHT" | "UMRAH" | "TOUR" | "BUS" | "HOTEL";
  userId: string;
  vendorId?: string;
  agencyId?: string; // For future SaaS scaling
  userName?: string;
  userEmail?: string;

  tripDetails: {
    from: string;
    to: string;
    departureDate: Date;
    returnDate?: Date;
    hotelId?: string;
    roomId?: string;
    busId?: string;
    airline?: string;
  };

  travelDate?: Date;

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
  };

  paymentMethod: "OFFICE" | "BANK" | "MPAISA";
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;

  transactionId?: string;
  paymentId?: string;
  receiptImage?: string; // Cloudinary URL
  totalAmount: number;
  currency: "AFN" | "USD";

  holdExpiresAt: Date; // TTL for seat/room lock
  verifiedAt?: Date;
  verifiedBy?: string; // Admin User ID

  createdAt?: Date;
  updatedAt?: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    bookingReference: { type: String, unique: true, required: true, index: true },
    bookingType: {
      type: String,
      enum: ["FLIGHT", "UMRAH", "TOUR", "BUS", "HOTEL"],
      required: true
    },
    userId: { type: String, required: true, index: true },
    vendorId: { type: String, index: true },
    agencyId: { type: String },
    userName: { type: String },
    userEmail: { type: String },

    tripDetails: {
      from: { type: String, required: true },
      to: { type: String, required: true },
      departureDate: { type: Date, required: true },
      returnDate: { type: Date },
      hotelId: { type: String },
      roomId: { type: String },
      busId: { type: String },
      airline: { type: String },
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
    },

    paymentMethod: {
      type: String,
      enum: ["OFFICE", "BANK", "MPAISA"],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "pending_verification", "paid", "refunded"],
      default: "unpaid",
    },
    bookingStatus: {
      type: String,
      enum: ["seat_held", "pending_payment", "pending_verification", "confirmed", "ticket_issued", "cancelled", "failed"],
      default: "seat_held",
    },

    transactionId: { type: String },
    paymentId: { type: String },
    receiptImage: { type: String },
    totalAmount: { type: Number, required: true },
    currency: { type: String, enum: ["AFN", "USD"], default: "AFN" },
    travelDate: { type: Date },

    holdExpiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
    verifiedAt: { type: Date },
    verifiedBy: { type: String },
  },
  {
    timestamps: true,
  }
);

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
