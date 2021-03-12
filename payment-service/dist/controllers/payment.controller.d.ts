import { PaymentService } from '../services/payment.service';
import { PAYMENT_STATE } from 'src/contants/payment.constants';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    private logger;
    verifyPayment(data: any): PAYMENT_STATE;
}
