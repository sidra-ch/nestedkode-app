import { PaymentRequest, PaymentResponse, GatewayInterface, GatewayConfig, PaymentGateway } from './types';
import { generateTransactionId } from '../helpers';

export class PaymentService {
  private gateways: Map<string, GatewayInterface> = new Map();

  registerGateway(code: string, gateway: GatewayInterface) {
    this.gateways.set(code, gateway);
  }

  async initializePayment(
    request: PaymentRequest, 
    config: GatewayConfig
  ): Promise<PaymentResponse> {
    const gateway = this.gateways.get(request.gateway);
    
    if (!gateway) {
      return {
        success: false,
        message: `Payment gateway ${request.gateway} not found`,
      };
    }

    try {
      return await gateway.initializePayment(request, config);
    } catch (error: any) {
      console.error('Payment initialization error:', error);
      return {
        success: false,
        message: error.message || 'Payment initialization failed',
      };
    }
  }

  async verifyPayment(
    gatewayCode: PaymentGateway,
    transactionId: string,
    config: GatewayConfig
  ): Promise<PaymentResponse> {
    const gateway = this.gateways.get(gatewayCode);
    
    if (!gateway) {
      return {
        success: false,
        message: `Payment gateway ${gatewayCode} not found`,
      };
    }

    try {
      return await gateway.verifyPayment(transactionId, config);
    } catch (error: any) {
      console.error('Payment verification error:', error);
      return {
        success: false,
        message: error.message || 'Payment verification failed',
      };
    }
  }

  async processOfflinePayment(
    bookingId: string,
    amount: number,
    userId: string,
    paymentMethod: 'bank_transfer' | 'cash',
    transactionDetails: {
      referenceNumber?: string;
      bankName?: string;
      transferDate?: Date;
      notes?: string;
    }
  ): Promise<{ success: boolean; payment?: any; message?: string }> {
    const transactionId = generateTransactionId();
    
    return {
      success: true,
      message: 'Offline payment request submitted. Admin will verify and confirm.',
      payment: {
        bookingId,
        userId,
        amount,
        currency: 'AFN',
        paymentMethod,
        status: 'pending',
        transactionId,
        metadata: transactionDetails,
      },
    };
  }

  calculateFinalAmount(
    baseAmount: number,
    discountAmount: number,
    gatewayFeePercentage: number,
    gatewayFeeFixed: number
  ): {
    subtotal: number;
    discount: number;
    gatewayFee: number;
    total: number;
  } {
    const subtotal = baseAmount;
    const discount = Math.min(discountAmount, subtotal);
    const afterDiscount = subtotal - discount;
    const gatewayFee = (afterDiscount * (gatewayFeePercentage / 100)) + gatewayFeeFixed;
    const total = afterDiscount + gatewayFee;

    return {
      subtotal,
      discount,
      gatewayFee: Math.round(gatewayFee),
      total: Math.round(total),
    };
  }
}

export const paymentService = new PaymentService();
