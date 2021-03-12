import { Test } from '@nestjs/testing';
import { OrdersProcessor } from '../orders/orders.processor';
import { OrdersController } from '../orders/orders.controller';
import { OrdersService } from '../orders/orders.service';
import { createdOrder } from './___mocks___';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../orders/order.schema';
import { BullModule } from '@nestjs/bull';
import { DatabaseModule } from '../datatabase/database.module';
import { ORDER_STATE } from '../constants/orders.constants';
import configuration from '../config/configuration';
import { ClientProxyFactory } from '@nestjs/microservices';

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
    }).compile();

    ordersService = moduleRef.get<OrdersService>(OrdersService);
    ordersController = moduleRef.get<OrdersController>(OrdersController);
  });
  describe('OrderController: createOrder', () => {
    it('should return with valid orderId', async () => {
      const newOrder = await ordersController.createOrder(createdOrder);

      expect(newOrder.orderId).toEqual(createdOrder.orderId);
    });
  });
  describe('OrderController: getDetailOrder', () => {
    it('should return with valid orderId', async () => {
      const newOrder = await ordersController.createOrder(createdOrder);
      const res = await ordersController.getOrderDetail(newOrder.orderId);
      expect(res.orderId).toEqual(newOrder.orderId);
    });
  });
  describe('OrderController: update', () => {
    it('Should return the order with valid id and cancel state', async () => {
      const newOrder = await ordersController.createOrder(createdOrder);
      const cancelledOrder = await ordersController.updateOrderState({
        orderId: newOrder.orderId,
        state: ORDER_STATE.CANCELLED,
      });
      if (cancelledOrder) {
        //@ts-ignore
        expect(cancelledOrder.orderId).toEqual(newOrder.orderId);
        //@ts-ignore
        expect(cancelledOrder.state).toEqual(ORDER_STATE.CANCELLED);
      }
    });
  });
});
