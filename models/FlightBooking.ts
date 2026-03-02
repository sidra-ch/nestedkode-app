import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IFlightBooking extends Document {
    userId: string;
    userName: string;
    userEmail: string;
    flightId: string;
    airline: string;
    flightNumber: string;
    from: string;
    to: string;
    departureTime: Date;
    arrivalTime: Date;
    flightClass: 'economy' | 'business' | 'first';
    totalPassengers: number;
    pricePerPassenger: number;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    paymentStatus: 'pending' | 'paid' | 'refunded';
    paymentId?: string;
    passengerDetails: {
        name: string;
        age: number;
        gender: string;
        passportNumber?: string;
        nationality?: string;
    }[];
    bookingDate: Date;
    vendorId?: string;
}

const FlightBookingSchema = new Schema<IFlightBooking>(
    {
        userId: { type: String, required: true, index: true },
        userName: { type: String, required: true },
        userEmail: { type: String, required: true },
        flightId: { type: String, required: true, index: true },
        airline: { type: String, required: true },
        flightNumber: { type: String, required: true },
        from: { type: String, required: true },
        to: { type: String, required: true },
        departureTime: { type: Date, required: true },
        arrivalTime: { type: Date, required: true },
        flightClass: { type: String, enum: ['economy', 'business', 'first'], default: 'economy' },
        totalPassengers: { type: Number, required: true },
        pricePerPassenger: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
        paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' },
        paymentId: { type: String },
        passengerDetails: [{
            name: { type: String, required: true },
            age: { type: Number, required: true },
            gender: { type: String, required: true },
            passportNumber: { type: String },
            nationality: { type: String },
        }],
        bookingDate: { type: Date, default: Date.now },
        vendorId: { type: String, index: true },
    },
    { timestamps: true }
);

const FlightBooking: Model<IFlightBooking> = mongoose.models.FlightBooking || mongoose.model<IFlightBooking>('FlightBooking', FlightBookingSchema);

export default FlightBooking;
