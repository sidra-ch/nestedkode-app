import mongoose, { Schema, Document } from "mongoose";

export interface IMenuItem extends Document {
  name: string;
  name_en?: string;
  description: string;
  price: number;
  currency: string;
  category: "appetizer" | "main" | "dessert" | "beverage" | "special";
  image?: string;
  vegetarian: boolean;
  spicyLevel: 0 | 1 | 2 | 3; // 0 = not spicy, 3 = very spicy
}

export interface ITableAvailability extends Document {
  date: Date;
  time: string;
  capacity: number; // 2, 4, 6, 8 person tables
  availableCount: number;
}

export interface IRestaurant extends Document {
  name: string;
  name_en?: string;
  description: string;
  cuisineType: "Afghan" | "Indian" | "Turkish" | "Persian" | "Mediterranean" | "Asian" | "International";
  location: string;
  latitude?: number;
  longitude?: number;
  vendorId: mongoose.Types.ObjectId;
  vendorName: string;
  vendorPhone: string;
  email?: string;
  phone: string;
  operatingHours: {
    open: string; // "11:00"
    close: string; // "23:00"
  };
  cuisineTypes: string[];
  menuItems: IMenuItem[];
  images: string[];
  rating: number; // 1-5
  reviews_count: number;
  priceRange: "budget" | "moderate" | "premium"; // Price indicator
  seatingCapacity: number; // Total seats
  hasParking: boolean;
  hasWifi: boolean;
  hasDelivery: boolean;
  hasReservation: boolean;
  acceptsOnlinePayment: boolean;
  currency: "AFN" | "USD" | "PKR";
  minOrderValue?: number;
  deliveryDays: number[]; // 0 = Sunday to 6 = Saturday
  tableAvailability: ITableAvailability[];
  isApproved: boolean; // Vendor approval status
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  name_en: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    enum: ["AFN", "USD", "PKR"],
    default: "AFN",
  },
  category: {
    type: String,
    enum: ["appetizer", "main", "dessert", "beverage", "special"],
    required: true,
  },
  image: {
    type: String,
  },
  vegetarian: {
    type: Boolean,
    default: false,
  },
  spicyLevel: {
    type: Number,
    enum: [0, 1, 2, 3],
    default: 1,
  },
});

const TableAvailabilitySchema: Schema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    enum: [2, 4, 6, 8],
    required: true,
  },
  availableCount: {
    type: Number,
    required: true,
    min: 0,
  },
});

const RestaurantSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    name_en: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    cuisineType: {
      type: String,
      enum: [
        "Afghan",
        "Indian",
        "Turkish",
        "Persian",
        "Mediterranean",
        "Asian",
        "International",
      ],
      required: true,
      index: true,
    },
    location: {
      type: String,
      required: true,
      index: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    vendorName: {
      type: String,
      required: true,
    },
    vendorPhone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    operatingHours: {
      open: {
        type: String,
        required: true,
      },
      close: {
        type: String,
        required: true,
      },
    },
    menuItems: {
      type: [MenuItemSchema],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 4.5,
    },
    reviews_count: {
      type: Number,
      default: 0,
      min: 0,
    },
    priceRange: {
      type: String,
      enum: ["budget", "moderate", "premium"],
      default: "moderate",
    },
    seatingCapacity: {
      type: Number,
      required: true,
      min: 4,
    },
    hasParking: {
      type: Boolean,
      default: false,
    },
    hasWifi: {
      type: Boolean,
      default: true,
    },
    hasDelivery: {
      type: Boolean,
      default: false,
    },
    hasReservation: {
      type: Boolean,
      default: true,
    },
    acceptsOnlinePayment: {
      type: Boolean,
      default: true,
    },
    currency: {
      type: String,
      enum: ["AFN", "USD", "PKR"],
      default: "AFN",
    },
    minOrderValue: {
      type: Number,
      default: 0,
    },
    deliveryDays: {
      type: [Number],
      default: [0, 1, 2, 3, 4, 5, 6],
    },
    tableAvailability: {
      type: [TableAvailabilitySchema],
      default: [],
    },
    isApproved: {
      type: Boolean,
      default: false,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for efficient searches
RestaurantSchema.index({ location: 1, cuisineType: 1, isApproved: 1 });
RestaurantSchema.index({ rating: -1, reviews_count: -1 });
RestaurantSchema.index({ vendorId: 1 });
RestaurantSchema.index({ "tableAvailability.date": 1, "tableAvailability.time": 1 });

export default mongoose.models.Restaurant ||
  mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);
