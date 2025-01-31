import { PartialType } from '@nestjs/swagger';
import { CreateBookableObjectDto } from './create-bookable-object.dto';

export class UpdateBookableObjectDto extends PartialType(CreateBookableObjectDto) {}