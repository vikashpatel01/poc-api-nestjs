import { PrismaService } from '../../prisma/prisma.service';
import { OrdersRepository } from '../orders.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { prismaMock } from '../../singleton';
import { mockReset } from 'jest-mock-extended';

describe('OrderRepo', () => {
  let orderRepo: OrdersRepository;
  beforeEach(async () => {
    mockReset(prismaMock);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersRepository,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    orderRepo = module.get<OrdersRepository>(OrdersRepository);
  });

  it('should be defined', () => {
    expect(orderRepo).toBeDefined();
  });

  it('should find all orders', async () => {
    const orders = [
      {
        customerName: 'XYZ',
        customerId: 'SOB20000512',
        orderNumber: '2038787468',
        enquiryId: 'INQ20000945',
        orderDate: new Date(),
        orderId: 1,
      },
      {
        customerName: 'Lakshya',
        customerId: 'SOB20000515',
        orderNumber: '2038787471',
        enquiryId: 'INQ20000948',
        orderDate: new Date(),
        orderId: 2,
      },
    ];

    prismaMock.order.findMany.mockResolvedValue(orders);

    await expect(orderRepo.findAll()).resolves.toEqual(orders);
  });

  it('should find order by ordernumber', async () => {
    const orders = [
      {
        customerName: 'XYZ',
        customerId: 'SOB20000512',
        orderNumber: '2038787468',
        enquiryId: 'INQ20000945',
        orderDate: new Date(),
        orderId: 1,
      },
    ];

    prismaMock.order.findUnique.mockResolvedValue(orders[0]);

    await expect(orderRepo.findOne('2038787468')).resolves.toEqual(orders[0]);
  });

  it('should update order', async () => {
    const order = {
      customerName: 'XYZ',
      customerId: 'SOB20000512',
      orderNumber: '2038787468',
      enquiryId: 'INQ20000945',
      orderDate: new Date(),
      orderId: 1,
    };

    prismaMock.order.update.mockResolvedValue(order);

    await expect(
      orderRepo.update('2038787468', { customerName: 'xyz' }),
    ).resolves.toEqual(order);
  });
});
