import { HttpStatus } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    private logger;
    verifyPayment(data: any): {
        status: HttpStatus;
        message: string;
        data: import("../contants/payment.constants").PAYMENT_STATE;
        errors: any;
    };
}
