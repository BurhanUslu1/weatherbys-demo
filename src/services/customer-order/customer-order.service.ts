import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Customer } from 'src/schemas/customer/customer.schema';
import { Product } from 'src/schemas/product/product.schema';

@Injectable()
export class CustomerOrderService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(product: Product, customer: Customer, orderQty: number) {
    const createdOrder = await this.prisma.customerOrder.create({
      select: {
        custId: true,
        customer: true,
        dateOrder: true,
        orderedQty: true,
        ordId: true,
        pId: true,
        product: true,
      },
      data: {
        dateOrder: new Date(),
        orderedQty: orderQty,
        customer: { connect: { custId: customer.custId } },
        product: { connect: { pId: product.pId } },
      },
    });

    return createdOrder;
  }

  async findOrderByOrdId(ordId: string) {
    const order = await this.prisma.customerOrder.findUnique({
      where: {
        ordId: ordId,
      },
      include: {
        customer: {
          include: {
            address: true,
          },
        },
        product: true,
      },
    });

    if (!order) {
      throw new Error(`Order ${ordId} not found`);
    }

    return order;
  }

  async findOrdersByProductId(pId: string) {
    return await this.prisma.customerOrder.findMany({
      where: {
        product: {
          pId: pId,
        },
      },
      include: {
        customer: {
          include: {
            address: true,
          },
        },
        product: true,
      },
    });
  }
}
