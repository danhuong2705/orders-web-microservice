import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { OrdersService } from '../services/orders.service';
import { ORDER_STATE } from '../constants/orderState.constants';
import { IOrder } from '../interfaces/order.interface';

@Processor('orders')
export class OrdersProcessor {
  constructor(private ordersService: OrdersService) {}
  @Process()
  async transcode(job: Job<unknown>) {
    await this.ordersService.updateOrderState(
      (job.data as IOrder).orderId,
      ORDER_STATE.DELIVERED,
    );
  }
}
