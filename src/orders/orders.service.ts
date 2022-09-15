import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepo: OrdersRepository) {}

  async findAll() {
    return this.ordersRepo.findAll();
  }

  async findOne(orderNumber: string) {
    return this.ordersRepo.findOne(orderNumber);
  }

  async update(orderNumber: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersRepo.findOne(orderNumber);
    const newOrder = { ...order, ...updateOrderDto };

    return this.ordersRepo.update(orderNumber, newOrder);
  }
}
