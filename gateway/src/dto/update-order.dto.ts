import { IsInt } from "class-validator";
import { ORDER_STATE } from "src/constants";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty()
  @IsInt()
  state: ORDER_STATE;
}
