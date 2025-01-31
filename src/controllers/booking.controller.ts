import { Controller, Get } from '@nestjs/common';
import { BookingService } from '../services/booking.service';

@Controller()
export class BookingController {
  constructor(private readonly appService: BookingService) {}

  @Get()
  getHello(): string {
    return "Hi";
  }
}
