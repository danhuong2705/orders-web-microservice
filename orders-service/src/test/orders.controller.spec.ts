import { Test } from '@nestjs/testing';
import { OrdersProcessor } from '../processors/orders.processor';
import { OrdersController } from '../controllers/orders.controller';
import { OrdersService } from '../services/orders.service';
import { createdOrder } from './___mocks___';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../schemas/order.schema';
import { BullModule } from '@nestjs/bull';
import { DatabaseModule } from '../modules/database.module';
import { HttpModule } from '@nestjs/common';
import { OrdersModule } from '../modules/orders.module';
import { ORDER_STATE, TOKEN } from '../constants/orderState.constants';

describe('OrdersModule', () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          {
            name: Order.name,
            schema: OrderSchema,
          },
        ]),
        MongooseModule.forRoot('mongodb://localhost/orders'),
        BullModule.forRoot({
          redis: {
            host: 'localhost',
            port: 6379,
          },
        }),
        BullModule.registerQueue({
          name: 'orders',
        }),
        DatabaseModule,
        HttpModule,
        OrdersModule,
      ],
      controllers: [OrdersController],
      providers: [OrdersService, OrdersProcessor],
    }).compile();

    ordersService = moduleRef.get<OrdersService>(OrdersService);
    ordersController = moduleRef.get<OrdersController>(OrdersController);
  });
  describe('OrderController: createOrder', () => {
    it('should return with valid orderId', async () => {
      const newOrder = await ordersController.createOrder(createdOrder);

      expect(newOrder.data.orderId).toEqual(createdOrder.orderId);
    });
  });
  describe('OrderController: getDetailOrder', () => {
    it('should return with valid orderId', async () => {
      const newOrder = await ordersController.createOrder(createdOrder);
      const res = await ordersController.getOrderDetail(newOrder.data.orderId);
      expect(res.data.orderId).toEqual(newOrder.data.orderId);
    });
  });
  describe('OrderController: update', () => {
    it('Should return the order with valid id and cancel state', async () => {
      const newOrder = await ordersController.createOrder(createdOrder);
      const cancelledOrder = await ordersController.updateOrderState({
        orderId: newOrder.data.orderId,
        state: ORDER_STATE.CANCELLED,
      });

      expect(cancelledOrder.data.orderId).toEqual(newOrder.data.orderId);
      expect(cancelledOrder.data.state).toEqual(ORDER_STATE.CANCELLED);
    });
  });
});
