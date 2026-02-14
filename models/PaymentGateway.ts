import mongoose, { Schema, Model } from 'mongoose';

export interface IPaymentGateway {
  _id?: string;
  name: string;
  code: string;
  type: 'online' | 'offline';
  isActive: boolean;
  config: {
    merchantId?: string;
    terminalId?: string;
    username?: string;
    password?: string;
    publicKey?: string;
    privateKey?: string;
    webhookUrl?: string;
    callbackUrl?: string;
  };
  fees: {
    percentage: number;
    fixed: number;
  };
  supportedCurrencies: string[];
  supportedMethods: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const PaymentGatewaySchema = new Schema<IPaymentGateway>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['online', 'offline'],
      default: 'online',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    config: {
      merchantId: String,
      terminalId: String,
      username: String,
      password: String,
      publicKey: String,
      privateKey: String,
      webhookUrl: String,
      callbackUrl: String,
    },
    fees: {
      percentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      fixed: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    supportedCurrencies: {
      type: [String],
      default: ['AFN', 'USD', 'EUR'],
    },
    supportedMethods: {
      type: [String],
      default: ['card', 'wallet', 'bank_transfer'],
    },
  },
  {
    timestamps: true,
  }
);

const PaymentGateway: Model<IPaymentGateway> = 
  mongoose.models.PaymentGateway || mongoose.model<IPaymentGateway>('PaymentGateway', PaymentGatewaySchema);

export default PaymentGateway;
