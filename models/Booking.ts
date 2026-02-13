import mongoose, { Schema, Model } from 'mongoose';

export interface IBooking {
  _id?: string;
  userId: string;
  userName: string;
  userEmail: string;
  busId: string;
  busName: string;
  busNumber: string;
  vendorId: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  travelDate: Date;
  seats: string[];
  totalSeats: number;
  pricePerSeat: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentId?: string;
  passengerDetails?: {
    name: string;
    age: number;
    gender: string;
    seatNumber: string;
  }[];
  bookingDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    busId: {
      type: String,
      required: true,
      index: true,
    },
    busName: {
      type: String,
      required: true,
    },
    busNumber: {
      type: String,
      required: true,
    },
    vendorId: {
      type: String,
      required: true,
      index: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    travelDate: {
      type: Date,
      required: true,
    },
    seats: {
      type: [String],
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    pricePerSeat: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },
    paymentId: {
      type: String,
    },
    passengerDetails: [{
      name: String,
      age: Number,
      gender: String,
      seatNumber: String,
    }],
    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for faster queries
BookingSchema.index({ userId: 1, status: 1 });
BookingSchema.index({ vendorId: 1, status: 1 });
BookingSchema.index({ travelDate: 1 });

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
