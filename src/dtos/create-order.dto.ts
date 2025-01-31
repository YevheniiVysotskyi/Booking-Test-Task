import { IsNumber, IsPositive, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  bookingObjectId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  endDate: Date;
}