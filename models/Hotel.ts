import mongoose, { Schema, Document } from "mongoose";

export interface IRoom {
  roomType: string;
  price: number;
  totalRooms: number;
  availableRooms: number;
  capacity: number;
  amenities: string[];
}

export interface IHotel extends Document {
  name: string;
  description: string;
  city: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  stars: number;
  type: "hotel" | "guesthouse" | "apartment" | "rental";
  rooms: IRoom[];
  amenities: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  checkInTime: string;
  checkOutTime: string;
  policies: {
    cancellation: string;
    children: string;
    pets: boolean;
  };
  contact: {
    phone: string;
    email: string;
  };
  vendorId?: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema({
  roomType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  totalRooms: {
    type: Number,
    required: true,
    min: 1,
  },
  availableRooms: {
    type: Number,
    required: true,
    min: 0,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  amenities: {
    type: [String],
    default: [],
  },
});

const HotelSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
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
    location: {
      latitude: Number,
      longitude: Number,
    },
    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      index: true,
    },
    type: {
      type: String,
      enum: ["hotel", "guesthouse", "apartment", "rental"],
      required: true,
      index: true,
    },
    rooms: {
      type: [RoomSchema],
      required: true,
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    checkInTime: {
      type: String,
      default: "14:00",
    },
    checkOutTime: {
      type: String,
      default: "12:00",
    },
    policies: {
      cancellation: String,
      children: String,
      pets: {
        type: Boolean,
        default: false,
      },
    },
    contact: {
      phone: String,
      email: String,
    },
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
HotelSchema.index({ city: 1, stars: 1, isActive: 1 });
HotelSchema.index({ rating: -1 });

export default mongoose.models.Hotel || mongoose.model<IHotel>("Hotel", HotelSchema);
