import { IsString, IsNumber, IsPositive, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookableObjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  availableUnits: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  pricePerUnit: number;
}