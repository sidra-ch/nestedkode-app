/**
 * Notification Service for Email and SMS
 * This service handles sending booking confirmations and updates to users
 */

interface EmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface SMSParams {
  to: string;
  message: string;
}

interface BookingNotificationData {
  bookingNumber: string;
  passengerName: string;
  email?: string;
  phone: string;
  origin: string;
  destination: string;
  travelDate: string;
  departureTime: string;
  seatNumbers: number[];
  totalPrice: number;
}

class NotificationService {
  // Email configuration (can be updated with actual SMTP settings)
  private emailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  };

  // SMS configuration (can be updated with actual SMS gateway)
  private smsConfig = {
    apiKey: process.env.SMS_API_KEY || '',
    apiUrl: process.env.SMS_API_URL || '',
  };

  /**
   * Send booking confirmation email
   */
  async sendBookingConfirmationEmail(data: BookingNotificationData): Promise<boolean> {
    try {
      if (!data.email) {
        console.log('No email provided, skipping email notification');
        return false;
      }

      const emailHtml = this.generateBookingEmailTemplate(data);
      
      const emailParams: EmailParams = {
        to: data.email,
        subject: `تایید رزرو - ${data.bookingNumber}`,
        html: emailHtml,
        text: this.generateBookingEmailText(data),
      };

      // TODO: Integrate with actual email service (NodeMailer, SendGrid, etc.)
      console.log('Email would be sent to:', emailParams.to);
      console.log('Subject:', emailParams.subject);
      
      // Simulated success for now
      return true;
    } catch (error) {
      console.error('Failed to send booking confirmation email:', error);
      return false;
    }
  }

  /**
   * Send booking confirmation SMS
   */
  async sendBookingConfirmationSMS(data: BookingNotificationData): Promise<boolean> {
    try {
      const message = this.generateBookingSMSText(data);
      
      const smsParams: SMSParams = {
        to: data.phone,
        message,
      };

      // TODO: Integrate with actual SMS gateway
      console.log('SMS would be sent to:', smsParams.to);
      console.log('Message:', smsParams.message);
      
      // Simulated success for now
      return true;
    } catch (error) {
      console.error('Failed to send booking confirmation SMS:', error);
      return false;
    }
  }

  /**
   * Send both email and SMS notifications
   */
  async sendBookingConfirmation(data: BookingNotificationData): Promise<{
    emailSent: boolean;
    smsSent: boolean;
  }> {
    const [emailSent, smsSent] = await Promise.all([
      this.sendBookingConfirmationEmail(data),
      this.sendBookingConfirmationSMS(data),
    ]);

    return { emailSent, smsSent };
  }

  /**
   * Send booking cancellation notification
   */
  async sendCancellationNotification(data: BookingNotificationData): Promise<boolean> {
    try {
      const message = `رزرو شما با شماره ${data.bookingNumber} لغو شد. در صورت پرداخت، مبلغ به حساب شما بازگردانده خواهد شد.`;
      
      if (data.email) {
        // Send cancellation email
        console.log('Cancellation email would be sent to:', data.email);
      }
      
      // Send cancellation SMS
      console.log('Cancellation SMS would be sent to:', data.phone);
      console.log('Message:', message);
      
      return true;
    } catch (error) {
      console.error('Failed to send cancellation notification:', error);
      return false;
    }
  }

  /**
   * Generate booking confirmation email HTML template
   */
  private generateBookingEmailTemplate(data: BookingNotificationData): string {
    return `
      <!DOCTYPE html>
      <html dir="rtl" lang="fa">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تایید رزرو</title>
        <style>
          body {
            font-family: 'Vazirmatn', Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
            direction: rtl;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            background-color: #F97316;
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 30px 20px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            padding: 15px;
            border-bottom: 1px solid #eee;
          }
          .info-label {
            color: #666;
            font-weight: bold;
          }
          .info-value {
            color: #333;
          }
          .footer {
            background-color: #f9f9f9;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
          .button {
            display: inline-block;
            background-color: #F97316;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✓ رزرو شما تایید شد</h1>
            <p>شماره پیگیری: ${data.bookingNumber}</p>
          </div>
          
          <div class="content">
            <h2>جزئیات سفر شما</h2>
            
            <div class="info-row">
              <span class="info-label">نام مسافر:</span>
              <span class="info-value">${data.passengerName}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">مسیر:</span>
              <span class="info-value">${data.origin} → ${data.destination}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">تاریخ سفر:</span>
              <span class="info-value">${data.travelDate}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">ساعت حرکت:</span>
              <span class="info-value">${data.departureTime}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">شماره صندلی:</span>
              <span class="info-value">${data.seatNumbers.join(', ')}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">مبلغ پرداختی:</span>
              <span class="info-value">${data.totalPrice.toLocaleString()} افغانی</span>
            </div>
            
            <div style="text-align: center;">
              <a href="https://afghanibaba.com/my-bookings" class="button">
                مشاهده رزرو
              </a>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #fff7e0; border-radius: 5px;">
              <strong>نکات مهم:</strong>
              <ul style="margin: 10px 0; padding-right: 20px;">
                <li>لطفاً 30 دقیقه قبل از حرکت در ترمینال حضور داشته باشید</li>
                <li>داشتن کارت شناسایی معتبر الزامی است</li>
                <li>این بلیط قابل انتقال نیست</li>
              </ul>
            </div>
          </div>
          
          <div class="footer">
            <p>با تشکر از انتخاب افغانی‌بابا</p>
            <p>پشتیبانی 24 ساعته: 0700-123-456</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Generate booking confirmation email plain text
   */
  private generateBookingEmailText(data: BookingNotificationData): string {
    return `
رزرو شما تایید شد!

شماره پیگیری: ${data.bookingNumber}

جزئیات سفر:
- نام مسافر: ${data.passengerName}
- مسیر: ${data.origin} → ${data.destination}
- تاریخ: ${data.travelDate}
- ساعت: ${data.departureTime}
- صندلی: ${data.seatNumbers.join(', ')}
- مبلغ: ${data.totalPrice.toLocaleString()} افغانی

لطفاً 30 دقیقه قبل از حرکت در ترمینال حضور داشته باشید.

با تشکر از انتخاب افغانی‌بابا
    `.trim();
  }

  /**
   * Generate booking confirmation SMS text
   */
  private generateBookingSMSText(data: BookingNotificationData): string {
    return `افغانی‌بابا: رزرو شما تایید شد. شماره پیگیری: ${data.bookingNumber}. مسیر: ${data.origin}-${data.destination}. تاریخ: ${data.travelDate}. صندلی: ${data.seatNumbers.join(',')}`;
  }
}

// Export singleton instance
export const notificationService = new NotificationService();

// Export types
export type { BookingNotificationData, EmailParams, SMSParams };
