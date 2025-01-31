import { Injectable, ConflictException, Inject, NotFoundException } from '@nestjs/common';
import { Order } from '../schemas/order.entity';
import { BookableObject } from 'src/schemas/bookable-object.entity';
import { CreateBookableObjectDto } from 'src/dtos/create-bookable-object.dto';
import { UpdateBookableObjectDto } from 'src/dtos/update-bookable-object.dto';
import { CreateOrderDto } from 'src/dtos/create-order.dto';
import { Sequelize, Op } from 'sequelize';
import { Transaction } from 'sequelize';
import { UpdateOrderDto } from 'src/dtos/update-order.dto';

//It's better to separate into 2 separate services for bookable objects
//and orders but I think it's fine for such a small app to just keep it simple
@Injectable()
export class BookingService {
  constructor(
    @Inject('SEQUELIZE')
    private sequelize: Sequelize,
    @Inject("BookingRepository")
    private bookingRepository: typeof BookableObject,
    @Inject("OrdersRepository")
    private orderRepository: typeof Order,
  ) {}

  async findAllBookableObjects(): Promise<BookableObject[]> {
    return this.bookingRepository.findAll({
      include: [Order],
    });
  }

  async findBookableObjectById(id: number): Promise<BookableObject> {
    const bookableObject = await this.bookingRepository.findByPk(id, {
      include: [Order],
    });

    if (!bookableObject) {
      throw new NotFoundException('Bookable object not found');
    }

    return bookableObject;
  }

  async createBookingObject(data: CreateBookableObjectDto): Promise<BookableObject> {
    return this.bookingRepository.create(data as any);
  }

  async updateBookableObject(
    id: number,
    data: UpdateBookableObjectDto,
  ): Promise<BookableObject> {
    const bookableObject = await this.findBookableObjectById(id);
    await bookableObject.update(data);
    return bookableObject;
  }

  async deleteBookableObject(id: number): Promise<void> {
    const bookableObject = await this.findBookableObjectById(id);
    await bookableObject.destroy();
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll({
      include: [BookableObject],
    });
  }

  async findOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findByPk(id, {
      include: [BookableObject],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async createOrder(data: CreateOrderDto): Promise<Order> {
    return this.sequelize.transaction(async (transaction: Transaction) => {
      const bookableObject = await this.bookingRepository.findByPk(
        data.bookingObjectId,
        {
          lock: true,
          transaction,
        },
      );

      if (!bookableObject) {
        throw new NotFoundException('Bookable object not found');
      }

      if (bookableObject.availableUnits < data.quantity) {
        throw new ConflictException('Not enough available units');
      }

      const conflictingOrders = await this.orderRepository.count({
        where: {
          bookingObjectId: data.bookingObjectId,
          startDate: {
            [Op.lt]: data.endDate,
          },
          endDate: {
            [Op.gt]: data.startDate,
          },
        },
        transaction,
      });

      if (conflictingOrders > 0) {
        throw new ConflictException('Selected dates are not available');
      }

      await bookableObject.update(
        {
          availableUnits: bookableObject.availableUnits - data.quantity,
        },
        { transaction },
      );

      return this.orderRepository.create(data as any, { transaction });
    });
  }

  async updateOrder(id: number, data: UpdateOrderDto): Promise<Order> {
    return this.sequelize.transaction(async (transaction: Transaction) => {
      const order = await this.findOrderById(id);
      const oldQuantity = order.quantity;

      if (data.quantity !== oldQuantity) {
        const bookableObject = await this.bookingRepository.findByPk(
          order.bookingObjectId,
          {
            lock: true,
            transaction,
          },
        );

        const quantityDifference = data.quantity - oldQuantity;
        
        if (quantityDifference > 0 && bookableObject.availableUnits < quantityDifference) {
          throw new ConflictException('Not enough available units');
        }

        await bookableObject.update(
          {
            availableUnits: bookableObject.availableUnits - quantityDifference,
          },
          { transaction },
        );
      }

      await order.update(data);
      return order;
    });
  }

  async deleteOrder(id: number): Promise<void> {
    return this.sequelize.transaction(async (transaction: Transaction) => {
      const order = await this.findOrderById(id);
      const bookableObject = await this.bookingRepository.findByPk(
        order.bookingObjectId,
        {
          lock: true,
          transaction,
        },
      );

      await bookableObject.update(
        {
          availableUnits: bookableObject.availableUnits + order.quantity,
        },
        { transaction },
      );

      await order.destroy({ transaction });
    });
  }
}