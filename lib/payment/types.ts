export type PaymentGateway = 'stripe' | 'paypal' | 'razorpay' | 'mellat' | 'zarinpal' | 'offline';

export interface PaymentRequest {
  amount: number;
  currency: string;
  bookingId: string;
  userId: string;
  userEmail: string;
  userPhone: string;
  description: string;
  gateway: PaymentGateway;
  returnUrl: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  message?: string;
  gatewayResponse?: any;
}

export interface RefundRequest {
  paymentId: string;
  amount: number;
  reason: string;
}

export interface RefundResponse {
  success: boolean;
  refundId?: string;
  message?: string;
}

export interface GatewayConfig {
  merchantId?: string;
  terminalId?: string;
  username?: string;
  password?: string;
  publicKey?: string;
  privateKey?: string;
  apiKey?: string;
  webhookSecret?: string;
}

export interface GatewayInterface {
  name: string;
  code: string;
  initializePayment(request: PaymentRequest, config: GatewayConfig): Promise<PaymentResponse>;
  verifyPayment(transactionId: string, config: GatewayConfig): Promise<PaymentResponse>;
  refund(request: RefundRequest, config: GatewayConfig): Promise<RefundResponse>;
}

export function calculateGatewayFee(amount: number, percentageFee: number, fixedFee: number): number {
  return (amount * (percentageFee / 100)) + fixedFee;
}

export function calculateRefundAmount(
  originalAmount: number, 
  refundPercentage: number
): number {
  return originalAmount * (refundPercentage / 100);
}
