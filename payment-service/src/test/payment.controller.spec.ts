import { Test } from '@nestjs/testing';
import { PaymentController } from '../payment/payment.controller';
import { PAYMENT_STATE } from '../contants/payment.constants';
import { PaymentService } from '../payment/payment.service';

describe('PaymentController', () => {
  let paymentController: PaymentController;
  let paymentService: PaymentService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [PaymentService],
    }).compile();

    paymentService = moduleRef.get<PaymentService>(PaymentService);
    paymentController = moduleRef.get<PaymentController>(PaymentController);
  });
  describe('Payment Controller: verifyPayment', () => {
    it('Should return correct response', async () => {
      const result = PAYMENT_STATE.CONFIRMED || PAYMENT_STATE.DECLINED;

      expect(await paymentController.verifyPayment('asas')).toEqual(result);
    });
  });
});
