import mongoose, { Schema, Model } from 'mongoose';

export interface INotificationSettings {
  _id?: string;
  key: string;
  value: any;
  category: 'email' | 'sms' | 'general';
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const NotificationSettingsSchema = new Schema<INotificationSettings>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    value: {
      type: Schema.Types.Mixed,
      required: true,
    },
    category: {
      type: String,
      enum: ['email', 'sms', 'general'],
      default: 'general',
    },
    description: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

NotificationSettingsSchema.index({ category: 1, isActive: 1 });

const NotificationSettings: Model<INotificationSettings> = 
  mongoose.models.NotificationSettings || mongoose.model<INotificationSettings>('NotificationSettings', NotificationSettingsSchema);

export default NotificationSettings;
