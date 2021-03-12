import { PAYMENT_STATE } from '../contants/payment.constants';
export declare class PaymentService {
    verifyPayment(orderId: string): PAYMENT_STATE;
}
