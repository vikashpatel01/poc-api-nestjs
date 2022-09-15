import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseFilters,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiGatewayTimeoutResponse,
  ApiServiceUnavailableResponse,
} from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';
import { PrismaClientExceptionFilter } from '../prisma-client-exception.filter';

@Controller('/api/v2/orders')
@ApiTags('orders')
@UseFilters(PrismaClientExceptionFilter)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  @ApiGatewayTimeoutResponse({ description: `Gateway timedout` })
  @ApiServiceUnavailableResponse({ description: `Service unavailable` })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':orderNumber')
  @ApiOkResponse({ type: OrderEntity })
  @ApiNotFoundResponse({
    description: 'Record with given order number not found',
  })
  @ApiGatewayTimeoutResponse({ description: `Gateway timedout` })
  @ApiServiceUnavailableResponse({ description: `Service unavailable` })
  async findOne(@Param('orderNumber') orderNumber: string) {
    const order = await this.ordersService.findOne(orderNumber);
    if (!order) {
      throw new NotFoundException(`Could not find order with ${orderNumber}.`);
    }
    return order;
  }

  @Patch(':orderNumber')
  @ApiOkResponse({ type: OrderEntity })
  @ApiNotFoundResponse({
    description: 'Record with the given order number not found',
  })
  @ApiBadRequestResponse({ description: 'Bad Request Response' })
  @ApiGatewayTimeoutResponse({ description: `Gateway timedout` })
  @ApiServiceUnavailableResponse({ description: `Service unavailable` })
  update(
    @Param('orderNumber') orderNumber: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(orderNumber, updateOrderDto);
  }
}
