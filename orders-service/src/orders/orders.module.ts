import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../datatabase/database.module';
import { Order, OrderSchema } from './order.schema';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { BullModule } from '@nestjs/bull';
import { OrdersProcessor } from './orders.processor';
import { ClientProxyFactory } from '@nestjs/microservices';
import configuration from '../config/configuration';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    BullModule.registerQueue({
      name: 'orders',
    }),
    DatabaseModule,
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersProcessor,
    {
      provide: 'PAYMENT_SERVICE',
      useFactory: () => {
        const paymentServiceOptions = configuration().paymentService as any;
        return ClientProxyFactory.create(paymentServiceOptions);
      },
      inject: [],
    },
  ],
})
export class OrdersModule {}
