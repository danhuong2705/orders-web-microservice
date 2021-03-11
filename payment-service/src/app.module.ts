import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/payment.module';

@Module({
  imports: [PaymentModule],
})
export class AppModule {}