import { Decimal } from '@prisma/client/runtime/library';
import { Address } from '../src/schemas/customer/address.schema';
import { Customer } from '../src/schemas/customer/customer.schema';
import { CustomerOrder } from '../src/schemas/customer-order/customer-order.schema';
import { Product } from '@prisma/client';

export default {
  customers: [
    {
      custId: '664f0d5f-3c81-4e39-84a6-e71715a804d5',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      email: 'email@email.com',
      landLine: '123456789',
      mobile: '123456789',
    },
  ] as Customer[],

  address: {
    addrNo: '10',
    addressLine1: 'test address line 1',
    addressLine2: '',
    city: 'City',
    postCode: 'En5',
    country: 'Country',
  } as Address,
  products: [
    {
      pId: 'P001',
      description: 'Product 1',
      unitPrice: new Decimal(100.0),
      availableQty: 90,
    },
    {
      pId: 'P002',
      description: 'Product2',
      unitPrice: new Decimal(200.0),
      availableQty: 9,
    },
  ] as Product[],

  customerOrder: [
    {
      dateOrder: new Date(),
      orderedQty: 1,
      product: { pId: 'P001' },
      customer: { custId: '664f0d5f-3c81-4e39-84a6-e71715a804d5' },
    },
  ] as CustomerOrder[],
};
