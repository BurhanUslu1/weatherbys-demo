import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProductInput } from 'src/inputs/product-inputs/save-product.input';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(createProductInput: CreateProductInput) {
    const product = await this.prisma.product.create({
      data: createProductInput,
    });
    return product;
  }

  async findProductById(pId: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        pId: pId,
      },
    });

    if (!product) {
      throw new Error(`Product ${pId} not found`);
    }
    return product;
  }

  async isProductAvailableToOrder(pId: string, orderQty: number) {
    return await this.prisma.product.findUnique({
      where: {
        pId: pId,
        AND: [
          { pId: pId },
          {
            availableQty: { gte: orderQty },
          },
        ],
      },
    });
  }

  async updateOrderQuantity(pId: string, orderQty: number) {
    const product = await this.prisma.product.update({
      where: {
        pId: pId,
      },
      data: {
        availableQty: {
          increment: orderQty,
        },
      },
    });

    return product;
  }
}
