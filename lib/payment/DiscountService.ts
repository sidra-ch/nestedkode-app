import Discount from '@/models/Discount';

export interface DiscountValidationResult {
  valid: boolean;
  discount?: {
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    maxDiscount?: number;
  };
  message?: string;
  calculatedDiscount?: number;
}

export async function validateDiscountCode(
  code: string,
  serviceType: 'flight' | 'hotel' | 'bus' | 'taxi',
  totalAmount: number
): Promise<DiscountValidationResult> {
  try {
    const discount = await Discount.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!discount) {
      return {
        valid: false,
        message: 'کد تخفیف نامعتبر است',
      };
    }

    const now = new Date();
    if (now < discount.validFrom || now > discount.validUntil) {
      return {
        valid: false,
        message: 'کد تخفیف منقضی شده است',
      };
    }

    if (discount.usageLimit > 0 && discount.usedCount >= discount.usageLimit) {
      return {
        valid: false,
        message: 'ظرفیت استفاده از این کد به پایان رسیده است',
      };
    }

    if (!discount.serviceTypes.includes(serviceType)) {
      return {
        valid: false,
        message: 'این کد برای این نوع سرویس قابل استفاده نیست',
      };
    }

    if (totalAmount < discount.minPurchase) {
      return {
        valid: false,
        message: `حداقل مبلغ برای استفاده از این کد ${discount.minPurchase} افغانی است`,
      };
    }

    let calculatedDiscount: number;
    if (discount.type === 'percentage') {
      calculatedDiscount = (totalAmount * discount.value) / 100;
      if (discount.maxDiscount && calculatedDiscount > discount.maxDiscount) {
        calculatedDiscount = discount.maxDiscount;
      }
    } else {
      calculatedDiscount = Math.min(discount.value, totalAmount);
    }

    return {
      valid: true,
      discount: {
        code: discount.code,
        type: discount.type as 'percentage' | 'fixed',
        value: discount.value,
        maxDiscount: discount.maxDiscount,
      },
      calculatedDiscount: Math.round(calculatedDiscount),
    };
  } catch (error) {
    console.error('Discount validation error:', error);
    return {
      valid: false,
      message: 'خطا در اعتبارسنجی کد تخفیف',
    };
  }
}

export async function applyDiscountCode(code: string): Promise<{ success: boolean; message?: string }> {
  try {
    const result = await Discount.findOneAndUpdate(
      { code: code.toUpperCase(), isActive: true, $or: [{ usageLimit: 0 }, { usedCount: { $lt: '$usageLimit' } }] },
      { $inc: { usedCount: 1 } },
      { new: true }
    );

    if (!result) {
      return { success: false, message: 'کد تخفیف قابل استفاده نیست' };
    }

    return { success: true };
  } catch (error) {
    console.error('Apply discount error:', error);
    return { success: false, message: 'خطا در اعمال کد تخفیف' };
  }
}
