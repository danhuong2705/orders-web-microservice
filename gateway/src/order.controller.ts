import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CREATE_ORDER_MSG_PARTTEN,
  GET_ORDER_DETAIL_MSG_PARTTEN,
  GET_ORDER_LIST_MSG_PARTTEN,
  UPDATE_ORDER_MSG_PARTTEN,
} from './constants';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('api/orders')
export class OrderController {
  constructor(
    @Inject('ORDERS_SERVICE') private readonly ordersClient: ClientProxy,
  ) {}
  logger = new Logger('gateway');
  async onApplicationBootstrap() {
    await this.ordersClient.connect();
  }
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const createdOrder = await this.ordersClient
      .send(CREATE_ORDER_MSG_PARTTEN, createOrderDto)
      .toPromise();
    return createdOrder;
  }
  @Put(':orderId')
  async updateOrderState(
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const res = await this.ordersClient
      .send(UPDATE_ORDER_MSG_PARTTEN, {
        orderId: orderId,
        state: updateOrderDto.state,
      })
      .toPromise();
    this.logger.log(res);
    if (res.status === HttpStatus.BAD_REQUEST) throw new BadRequestException();
    if (res.status === HttpStatus.NOT_FOUND) throw new NotFoundException();
    return res;
  }
  @Get(':orderId')
  async getOrderDetail(@Param('orderId') orderId: string) {
    const order = await this.ordersClient
      .send(GET_ORDER_DETAIL_MSG_PARTTEN, orderId)
      .toPromise();
    if (!order) {
      throw new NotFoundException('order not found');
    }
    return order;
  }

  @Get()
  async getOrderList() {
    return await this.ordersClient
      .send(GET_ORDER_LIST_MSG_PARTTEN, true)
      .toPromise();
  }
}
