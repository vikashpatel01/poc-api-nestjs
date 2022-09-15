import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrdersRepository } from './orders.repository';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  imports:  [PrismaModule],
  exports: [OrdersService]
})
export class OrdersModule {}
