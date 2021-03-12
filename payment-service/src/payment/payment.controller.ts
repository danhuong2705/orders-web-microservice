import { Controller, Logger } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern } from '@nestjs/microservices';
import { VERIFY_ORDER_MSG_PARTTEN } from '../contants/payment.constants';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  private logger = new Logger('payment ');

  @MessagePattern(VERIFY_ORDER_MSG_PARTTEN)
  verifyPayment(data: any) {
    return this.paymentService.verifyPayment(data);
  }
}
