import { InjectQueue } from '@nestjs/bull';
import { Controller, HttpStatus, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Queue } from 'bull';
import { DELAY_TIME, ORDER_STATE } from '../constants/orderState.constants';

import {
  IOrderListResponse,
  IOrderResponse,
} from '../interfaces/order.interface';
import { OrdersService } from '../services/orders.service';

@Controller('api/orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    @InjectQueue('orders') private orderQueue: Queue,
  ) {}
  private logger = new Logger('OrderController');

  @MessagePattern('order-list')
  async getOrderList(): Promise<IOrderListResponse> {
    try {
      const orders = await this.ordersService.getOrderList();
      return {
        status: HttpStatus.OK,
        message: 'get orders successfully',
        data: orders,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Error',
        data: null,
        errors: { message: 'An error occurred' },
      };
    }
  }
  @MessagePattern('order-detail')
  async getOrderDetail(orderId: string): Promise<IOrderResponse> {
    try {
      const order = await this.ordersService.getOrderDetail(orderId);
      return {
        status: HttpStatus.OK,
        message: 'get order successfully',
        data: order,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Error',
        data: null,
        errors: { message: 'Order not found' },
      };
    }
  }
  @MessagePattern('create-order')
  async createOrder(data: any): Promise<IOrderResponse> {
    try {
      const order = await this.ordersService.createOrder(data);
      return {
        status: HttpStatus.CREATED,
        message: 'Create order successfully',
        data: order,
        errors: null,
      };
    } catch (err) {
      console.log(err);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'errors',
        data: null,
        errors: { message: 'An expected error occurs' },
      };
    }
  }

  @MessagePattern('update-order')
  async updateOrderState(data: any): Promise<IOrderResponse> {
    try {
      const updatedOrder = await this.ordersService.updateOrderState(
        data.orderId,
        data.state,
      );
      if (updatedOrder.state === ORDER_STATE.CONFIRMED) {
        await this.orderQueue.add(updatedOrder, { delay: DELAY_TIME });
      }
      return {
        status: HttpStatus.OK,
        message: 'Update order successfully',
        data: updatedOrder,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error',
        data: null,
        errors: { message: 'An error occurred while updating order' },
      };
    }
  }
}
