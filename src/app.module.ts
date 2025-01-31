import { Module } from '@nestjs/common';
import { BookingController } from './controllers/booking.controller';
import { BookingService } from './services/booking.service';
import { bookingProviders } from './providers/booking,provider';
import { ordersProviders } from './providers/order.provider';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './services/config.module';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [BookingController],
  providers: [BookingService, ...bookingProviders, ...ordersProviders],
})
export class AppModule {}
