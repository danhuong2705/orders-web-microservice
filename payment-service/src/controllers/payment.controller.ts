import { Controller, HttpStatus, Logger } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  private logger = new Logger('payment ');

  @MessagePattern('verify-order')
  verifyPayment(data: any) {
    const res = this.paymentService.verifyPayment(data);
    return {
      status: HttpStatus.OK,
      message: 'verify order successfully',
      data: res,
      errors: null,
    };
  }
}
