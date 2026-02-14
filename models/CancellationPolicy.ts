import mongoose, { Schema, Model } from 'mongoose';

export interface ICancellationPolicy {
  _id?: string;
  serviceType: 'flight' | 'hotel' | 'bus' | 'taxi';
  serviceId?: string;
  name: string;
  rules: {
    hoursBeforeDeparture: number;
    refundPercentage: number;
    penaltyPercentage: number;
  }[];
  isDefault: boolean;
  isActive: boolean;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CancellationPolicySchema = new Schema<ICancellationPolicy>(
  {
    serviceType: {
      type: String,
      enum: ['flight', 'hotel', 'bus', 'taxi'],
      required: true,
      index: true,
    },
    serviceId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    rules: [{
      hoursBeforeDeparture: {
        type: Number,
        required: true,
      },
      refundPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      penaltyPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
    }],
    isDefault: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: String,
  },
  {
    timestamps: true,
  }
);

CancellationPolicySchema.index({ serviceType: 1, isDefault: 1 });

const CancellationPolicy: Model<ICancellationPolicy> = 
  mongoose.models.CancellationPolicy || mongoose.model<ICancellationPolicy>('CancellationPolicy', CancellationPolicySchema);

export default CancellationPolicy;
