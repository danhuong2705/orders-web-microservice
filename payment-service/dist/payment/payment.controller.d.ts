import { PaymentService } from './payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    private logger;
    verifyPayment(data: any): import("../contants/payment.constants").PAYMENT_STATE;
}
