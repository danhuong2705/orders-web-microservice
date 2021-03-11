import { Test } from '@nestjs/testing';
import { PaymentController } from '../controllers/payment.controller';
import { PAYMENT_STATE, TOKEN } from '../contants/payment.constants';
import { PaymentService } from '../services/payment.service';
import { HttpStatus } from '@nestjs/common';

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
      const result = {
        status: HttpStatus.OK,
        message: 'verify order successfully',
        data: PAYMENT_STATE.CONFIRMED || PAYMENT_STATE.DECLINED,
        errors: null,
      };
      expect(await paymentController.verifyPayment('asas')).toStrictEqual(
        result,
      );
    });
  });
});
