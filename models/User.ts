import mongoose, { Schema, Model } from 'mongoose';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'vendor' | 'admin';
  phone?: string;
  vendorId?: string;
  isApproved: boolean;
  lastLogin?: Date;
  loginCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
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
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['user', 'vendor', 'admin'],
      default: 'user',
    },
    phone: {
      type: String,
      trim: true,
    },
    vendorId: {
      type: String,
      trim: true,
    },
    isApproved: {
      type: Boolean,
      default: true,
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
