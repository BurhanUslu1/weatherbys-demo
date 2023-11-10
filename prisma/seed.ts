import { PrismaClient } from '@prisma/client';
import dummyData from './dummy-data';
const prisma = new PrismaClient();

async function main() {
  await prisma.customer.createMany({
    data: dummyData.customers,
  });
  await prisma.product.createMany({
    data: dummyData.products,
  });
  await prisma.address.create({
    data: {
      ...dummyData.address,
      customer: {
        connect: {
          custId: '664f0d5f-3c81-4e39-84a6-e71715a804d5',
        },
      },
    },
  });

  await prisma.customerOrder.create({
    data: {
      customer: {
        connect: {
          custId: '664f0d5f-3c81-4e39-84a6-e71715a804d5',
        },
      },
      product: {
        connect: {
          pId: 'P001',
        },
      },
      dateOrder: new Date(),
      orderedQty: 1,
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
