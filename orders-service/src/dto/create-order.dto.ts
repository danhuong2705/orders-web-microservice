import { Type } from 'class-transformer';
import { IsString, IsInt, IsArray, ValidateNested } from 'class-validator';
import { IOrderItem } from './order-item.dto';
export class CreateOrderDto {
  @IsString()
  orderId: string;

  @IsInt()
  userId: number;

  @IsInt()
  state: number;

  @IsInt()
  totalPrice: number;

  @IsString()
  createdAt: string;

  orderItems: Array<IOrderItem>;
}
