import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IOrderItem } from './order-item.dto';
export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  orderId: string;

  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsInt()
  state: number;

  @ApiProperty()
  @IsInt()
  totalPrice: number;

  @ApiProperty()
  @IsString()
  createdAt: string;

  @ApiProperty()
  orderItems: Array<IOrderItem>;
}
