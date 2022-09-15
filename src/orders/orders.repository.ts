import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(orderNumber: string) {
    return this.prisma.order.findUnique({
      where: { orderNumber },
    });
  }

  async update(orderNumber: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.prisma.order.update({
      where: { orderNumber },
      data: updateOrderDto,
    });
    return order;
  }
}
