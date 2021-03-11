import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database.module';
import { Order, OrderSchema } from '../schemas/order.schema';
import { OrdersService } from '../services/orders.service';
import { OrdersController } from '../controllers/orders.controller';
import { BullModule } from '@nestjs/bull';
import { OrdersProcessor } from '../processors/orders.processor';
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
  providers: [OrdersService, OrdersProcessor],
})
export class OrdersModule {}
