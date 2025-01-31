import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, ParseIntPipe, Query } from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookableObjectDto } from 'src/dtos/create-bookable-object.dto';
import { UpdateBookableObjectDto } from 'src/dtos/update-bookable-object.dto';
import { CreateOrderDto } from 'src/dtos/create-order.dto';
import { UpdateOrderDto } from 'src/dtos/update-order.dto';

//I think It's better to separate into 2 separate controllers for bookable objects
//and orders but I think it's fine for such a small app to just keep it simple
@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('objects')
  @ApiOperation({ summary: 'Get all bookable objects' })
  @ApiResponse({ status: 200, description: 'Returns all bookable objects' })
  async getAllBookableObjects() {
    return this.bookingService.findAllBookableObjects();
  }

  @Get('objects/:id')
  @ApiOperation({ summary: 'Get bookable object by id' })
  @ApiResponse({ status: 200, description: 'Returns the bookable object' })
  async getBookableObject(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.findBookableObjectById(id);
  }

  @Post('objects')
  @ApiOperation({ summary: 'Create new bookable object' })
  @ApiResponse({ status: 201, description: 'Bookable object created successfully' })
  async createBookableObject(@Body() createBookableObjectDto: CreateBookableObjectDto) {
    return this.bookingService.createBookingObject(createBookableObjectDto);
  }

  @Put('objects/:id')
  @ApiOperation({ summary: 'Update bookable object' })
  @ApiResponse({ status: 200, description: 'Bookable object updated successfully' })
  async updateBookableObject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookableObjectDto: UpdateBookableObjectDto,
  ) {
    return this.bookingService.updateBookableObject(id, updateBookableObjectDto);
  }

  @Delete('objects/:id')
  @ApiOperation({ summary: 'Delete bookable object' })
  @ApiResponse({ status: 204, description: 'Bookable object deleted successfully' })
  @HttpCode(204)
  async deleteBookableObject(@Param('id', ParseIntPipe) id: number) {
    await this.bookingService.deleteBookableObject(id);
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Returns all orders' })
  async getAllOrders() {
    return this.bookingService.findAllOrders();
  }

  @Get('orders/:id')
  @ApiOperation({ summary: 'Get order by id' })
  @ApiResponse({ status: 200, description: 'Returns the order' })
  async getOrder(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.findOrderById(id);
  }

  @Post('orders')
  @ApiOperation({ summary: 'Create new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.bookingService.createOrder(createOrderDto);
  }

  @Put('orders/:id')
  @ApiOperation({ summary: 'Update order' })
  @ApiResponse({ status: 200, description: 'Order updated successfully' })
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.bookingService.updateOrder(id, updateOrderDto);
  }

  @Delete('orders/:id')
  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({ status: 204, description: 'Order deleted successfully' })
  @HttpCode(204)
  async deleteOrder(@Param('id', ParseIntPipe) id: number) {
    await this.bookingService.deleteOrder(id);
  }
}