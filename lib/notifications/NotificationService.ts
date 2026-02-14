import Notification from '@/models/Notification';
import NotificationSettings from '@/models/NotificationSettings';

export type NotificationType = 'booking_confirmation' | 'payment_confirmation' | 'payment_reminder' | 'refund_notification' | 'travel_reminder' | 'cancellation';

export interface SendNotificationParams {
  userId: string;
  userEmail?: string;
  userPhone?: string;
  type: NotificationType;
  title: string;
  message: string;
  channel: 'email' | 'sms' | 'both';
  metadata?: {
    bookingId?: string;
    serviceType?: string;
    amount?: number;
    departureTime?: string;
  };
}

export async function sendNotification(params: SendNotificationParams): Promise<{ success: boolean; notification?: any; message?: string }> {
  try {
    const { 
      userId, 
      userEmail, 
      userPhone, 
      type, 
      title, 
      message, 
      channel, 
      metadata 
    } = params;

    const settings = await NotificationSettings.findOne({ key: `notify_${type}`, isActive: true });
    
    if (settings && settings.value === false) {
      return { success: false, message: 'این نوع اعلان غیرفعال است' };
    }

    const notification = await Notification.create({
      userId,
      type: type as any,
      title,
      message,
      channel,
      status: 'pending',
      metadata,
    });

    if (channel === 'email' || channel === 'both') {
      await sendEmail(userEmail, title, message, metadata);
    }

    if (channel === 'sms' || channel === 'both') {
      await sendSMS(userPhone, message);
    }

    await Notification.findByIdAndUpdate(notification._id, {
      status: 'sent',
      sentAt: new Date(),
    });

    return { success: true, notification };
  } catch (error) {
    console.error('Send notification error:', error);
    return { success: false, message: 'خطا در ارسال اعلان' };
  }
}

async function sendEmail(email: string | undefined, subject: string, body: string, metadata?: any): Promise<boolean> {
  if (!email) return false;
  
  try {
    console.log(`[EMAIL] To: ${email}`);
    console.log(`[EMAIL] Subject: ${subject}`);
    console.log(`[EMAIL] Body: ${body}`);
    
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

async function sendSMS(phone: string | undefined, message: string): Promise<boolean> {
  if (!phone) return false;
  
  try {
    console.log(`[SMS] To: ${phone}`);
    console.log(`[SMS] Message: ${message}`);
    
    return true;
  } catch (error) {
    console.error('SMS sending error:', error);
    return false;
  }
}

export async function sendBookingConfirmation(
  userId: string,
  userEmail: string,
  userPhone: string,
  booking: {
    _id: string;
    from: string;
    to: string;
    travelDate: Date;
    seats: string[];
    totalPrice: number;
  }
): Promise<void> {
  await sendNotification({
    userId,
    userEmail,
    userPhone,
    type: 'booking_confirmation',
    title: 'تایید رزرو',
    message: `رزرو شما با موفقیت انجام شد. کد رزرو: ${booking._id}`,
    channel: 'both',
    metadata: {
      bookingId: booking._id,
      amount: booking.totalPrice,
    },
  });
}

export async function sendPaymentConfirmation(
  userId: string,
  userEmail: string,
  userPhone: string,
  booking: { _id: string; totalPrice: number },
  payment: { transactionId: string }
): Promise<void> {
  await sendNotification({
    userId,
    userEmail,
    userPhone,
    type: 'payment_confirmation',
    title: 'تایید پرداخت',
    message: `پرداخت شما با موفقیت انجام شد. کد تراکنش: ${payment.transactionId}`,
    channel: 'both',
    metadata: {
      bookingId: booking._id,
      amount: booking.totalPrice,
    },
  });
}

export async function sendTravelReminder(
  userId: string,
  userEmail: string,
  userPhone: string,
  booking: {
    _id: string;
    from: string;
    to: string;
    travelDate: Date;
    departureTime: string;
  },
  hoursBefore: number
): Promise<void> {
  await sendNotification({
    userId,
    userEmail,
    userPhone,
    type: 'travel_reminder',
    title: 'یادآوری سفر',
    message: `پرواز شما از ${booking.from} به ${booking.to} در ${hoursBefore} ساعت دیگر.`,
    channel: 'both',
    metadata: {
      bookingId: booking._id,
      departureTime: booking.departureTime,
    },
  });
}

export async function sendRefundNotification(
  userId: string,
  userEmail: string,
  userPhone: string,
  refund: { amount: number; status: string }
): Promise<void> {
  await sendNotification({
    userId,
    userEmail,
    userPhone,
    type: 'refund_notification',
    title: 'اطلاع بازگشت وجه',
    message: `بازگشت وجه به مبلغ ${refund.amount} AFN با وضعیت: ${refund.status}`,
    channel: 'both',
    metadata: {
      amount: refund.amount,
    },
  });
}
