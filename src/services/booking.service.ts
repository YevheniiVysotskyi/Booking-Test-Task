import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { Order } from '../schemas/order.entity';
import { BookableObject } from 'src/schemas/bookable-object.entity';

@Injectable()
export class BookingService {
  constructor(
    @Inject("BookingRepository")
    private bookingRepository: typeof BookableObject,
    @Inject("OrdersRepository")
    private orderRepository: typeof Order,
  ) {}

  async createBookingObject(data: Partial<BookableObject>): Promise<BookableObject> {
    return this.bookingRepository.create(data);
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll<Order>();
  }

  async createOrder(data: Partial<Order>): Promise<Order> {
    const bookingObject = await this.bookingRepository.findByPk(data.bookingObjectId);
    
    if (!bookingObject) {
      throw new ConflictException('Booking object not found');
    }
    
    if (bookingObject.availableUnits < data.quantity) {
      throw new ConflictException('Not enough available units');
    }

    return this.orderRepository.create(data);
  }

}