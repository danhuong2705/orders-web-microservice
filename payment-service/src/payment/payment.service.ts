import { Injectable, NotFoundException } from '@nestjs/common';
import { PAYMENT_STATE } from '../contants/payment.constants';

@Injectable()
export class PaymentService {
  verifyPayment(orderId: string): PAYMENT_STATE {
    if (!orderId) {
      throw new NotFoundException('Order not found');
    }
    const randomNumber = Math.round(Math.random());
    return randomNumber === 1
      ? PAYMENT_STATE.CONFIRMED
      : PAYMENT_STATE.DECLINED;
  }
}
