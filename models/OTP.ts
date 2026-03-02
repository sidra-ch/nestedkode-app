import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOTP extends Document {
    email: string;
    otp: string; // Hashed OTP
    expiresAt: Date;
    attempts: number;
}

const OTPSchema = new Schema<IOTP>(
    {
        email: {
            type: String,
            required: true,
            index: true,
        },
        otp: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
            index: { expires: '5m' }, // TTL index for automatic deletion
        },
        attempts: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const OTP: Model<IOTP> = mongoose.models.OTP || mongoose.model<IOTP>('OTP', OTPSchema);

export default OTP;
