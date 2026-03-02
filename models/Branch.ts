import mongoose, { Schema, Document } from "mongoose";

export interface IBranch extends Document {
    name: string;
    city: string;
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
    latitude: number;
    longitude: number;
    isMainBranch: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const BranchSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            index: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        whatsapp: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        isMainBranch: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Index for city-based searches
BranchSchema.index({ city: 1, isMainBranch: -1 });

export default mongoose.models.Branch || mongoose.model<IBranch>("Branch", BranchSchema);
