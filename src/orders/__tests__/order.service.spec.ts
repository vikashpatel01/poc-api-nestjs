import { UpdateOrderDto } from '../../orders-old/dtos/update-order.dto';
import { OrdersService } from '../orders.service';
import { Order } from '@prisma/client';
import { OrdersRepository } from '../orders.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('OrderService', () => {
  let orderService: OrdersService;
  let fakeOrderRepo: Partial<OrdersRepository>;
  let orders: Order[];
  beforeEach(async () => {
    orders = [
      {
        customerName: 'Patel',
        customerId: 'SOB20000512',
        orderNumber: '2038787468',
        enquiryId: 'INQ20000945',
        orderDate: new Date(),
        orderId: 1,
      },
      {
        customerName: 'Sriramka',
        customerId: 'SOB20000513',
        orderNumber: '2038787469',
        enquiryId: 'INQ20000946',
        orderDate: new Date(),
        orderId: 2,
      },
    ];
    fakeOrderRepo = {
      findOne: (orderNumber: string) => {
        const foundOrder =
          orders.find((order) => order.orderNumber === orderNumber) ?? {};
        return Promise.resolve(foundOrder as Order);
      },
      findAll: () => Promise.resolve(orders),
      update: (orderNumber: string, updateOrder: UpdateOrderDto) => {
        const foundOrder = orders.find(
          (order) => order.orderNumber === orderNumber,
        );
        Object.assign(foundOrder!, updateOrder);
        if (foundOrder) {
          return Promise.resolve(foundOrder);
        }
        return Promise.resolve({} as Order);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: OrdersRepository, useValue: fakeOrderRepo },
      ],
    }).compile();

    orderService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  it('should find all orders', async () => {
    await expect(orderService.findAll()).resolves.toEqual(orders);
  });

  it('should find order by ordernumber', async () => {
    await expect(orderService.findOne('2038787468')).resolves.toEqual(
      orders[0],
    );
  });

  it('should update order', async () => {
    const order = await orderService.update('2038787468', {
      customerName: 'xyz',
    });
    expect(order.customerName).toMatch('xyz');
  });
});
