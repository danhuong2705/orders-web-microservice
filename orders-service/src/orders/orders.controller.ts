import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  Controller,
  Inject,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Queue } from 'bull';
import {
  CREATE_ORDER_MSG_PARTTEN,
  DELAY_TIME,
  GET_ORDER_DETAIL_MSG_PARTTEN,
  GET_ORDER_LIST_MSG_PARTTEN,
  ORDER_STATE,
  PAYMENT_STATE,
  UPDATE_ORDER_MSG_PARTTEN,
  UPDATE_STATE_CONDITION_GROUP,
  VERIFY_ORDER_MSG_PARTTEN,
} from '../constants/orders.constants';
import { Order } from './order.schema';
import { OrdersService } from './orders.service';

@Controller('api/orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    @InjectQueue('orders') private orderQueue: Queue,
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientProxy,
  ) {}
  private logger = new Logger('OrderController');

  async handleCreatedOrder(data: any) {
    const paymentResult = await this.paymentClient
      .send(VERIFY_ORDER_MSG_PARTTEN, data.orderId)
      .toPromise();
    const updatedOrder = await this.ordersService.updateOrderState(
      data.orderId,
      paymentResult === PAYMENT_STATE.CONFIRMED
        ? ORDER_STATE.CONFIRMED
        : ORDER_STATE.CANCELLED,
    );
    if (updatedOrder.state === ORDER_STATE.CONFIRMED) {
      await this.orderQueue.add(updatedOrder, { delay: DELAY_TIME });
    }
    return updatedOrder;
  }
  @MessagePattern(GET_ORDER_LIST_MSG_PARTTEN)
  async getOrderList(): Promise<Order[]> {
    return await this.ordersService.getOrderList();
  }
  @MessagePattern(GET_ORDER_DETAIL_MSG_PARTTEN)
  async getOrderDetail(orderId: string): Promise<Order> {
    return await this.ordersService.getOrderDetail(orderId);
  }
  @MessagePattern(CREATE_ORDER_MSG_PARTTEN)
  async createOrder(data: any): Promise<Order> {
    const createdOrder = await this.ordersService.createOrder(data);
    if (createdOrder) this.handleCreatedOrder(createdOrder);
    return createdOrder;
  }

  @MessagePattern(UPDATE_ORDER_MSG_PARTTEN)
  async updateOrderState(data: any) {
    const order = await this.ordersService.getOrderDetail(data.orderId);
    if (!order) {
      return new NotFoundException();
    }
    const isUpdateable = UPDATE_STATE_CONDITION_GROUP.find(
      (state) => state.current === order.state && state.update === data.state,
    );
    if (!isUpdateable) {
      return new BadRequestException();
    }
    const updatedOrder = await this.ordersService.updateOrderState(
      data.orderId,
      data.state,
    );
    return updatedOrder;
  }
}
