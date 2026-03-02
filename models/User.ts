import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional for OTP-only users
  role: 'user' | 'vendor' | 'admin' | 'agency_admin';
  phone?: string;
  agencyId?: mongoose.Types.ObjectId;
  isVerified: boolean;
  lastLogin?: Date;
  loginCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['user', 'vendor', 'admin', 'agency_admin'],
      default: 'user',
    },
    phone: {
      type: String,
      trim: true,
    },
    agencyId: {
      type: Schema.Types.ObjectId,
      ref: 'Agency',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    loginCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
