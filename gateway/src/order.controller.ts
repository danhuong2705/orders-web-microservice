import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_STATE, PAYMENT_STATE } from './constants';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  IOrderListResponse,
  IOrderResponse,
} from './interfaces/order.interface';

@Controller('api/orders')
export class OrderController {
  constructor(
    @Inject('ORDERS_SERVICE') private readonly ordersClient: ClientProxy,
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientProxy,
  ) {}
  logger = new Logger('gateway');
  async onApplicationBootstrap() {
    await this.ordersClient.connect();
  }
  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<IOrderResponse> {
    const createdOrder: IOrderResponse = await this.ordersClient
      .send('create-order', createOrderDto)
      .toPromise();

    const paymentResult = await this.paymentClient
      .send('verify-order', createdOrder.data.orderId)
      .toPromise();

    const updatedOrder: IOrderResponse = await this.ordersClient
      .send('update-order', {
        orderId: createdOrder.data.orderId,
        state:
          paymentResult.data === PAYMENT_STATE.CONFIRMED
            ? ORDER_STATE.CONFIRMED
            : ORDER_STATE.CANCELLED,
      })
      .toPromise();
    return {
      status: updatedOrder.status,
      errors: updatedOrder.errors,
      data: updatedOrder.data,
      message: updatedOrder.message,
    };
  }
  @Put(':orderId')
  async updateOrderState(
    @Param() params,
    @Body() body,
  ): Promise<IOrderResponse> {
    const updatedOrder: IOrderResponse = await this.ordersClient
      .send('update-order', { orderId: params.orderId, state: body.state })
      .toPromise();
    return {
      status: updatedOrder.status,
      errors: updatedOrder.errors,
      data: updatedOrder.data,
      message: updatedOrder.message,
    };
  }
  @Get(':orderId')
  async getOrderDetail(@Param() params): Promise<IOrderResponse> {
    const orderDetail: IOrderResponse = await this.ordersClient
      .send('order-detail', params.orderId)
      .toPromise();
    return {
      status: orderDetail.status,
      errors: orderDetail.errors,
      data: orderDetail.data,
      message: orderDetail.message,
    };
  }

  @Get()
  async getOrderList() {
    const orders: IOrderListResponse = await this.ordersClient
      .send('order-list', true)
      .toPromise();
    return {
      status: orders.status,
      errors: orders.errors,
      data: orders.data,
      message: orders.message,
    };
  }
}
