import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCustomerInput } from 'src/inputs/customer-inputs/save-customer.input';
import { SaveCustomerType } from 'src/schemas/customer/save-customer.schema';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaClient) {}

  async isEmailUnique(email: string) {
    const customer = await this.prisma.customer.findUnique({
      select: {
        email: true,
      },
      where: {
        email: email,
      },
    });

    if (customer) {
      return false;
    }
    return true;
  }

  async create(createCustomerInput: CreateCustomerInput) {
    const { firstName, lastName, address, email, gender, landLine, mobile } =
      createCustomerInput;

    const isEmailUnique = await this.isEmailUnique(email);

    if (!isEmailUnique) {
      throw new Error(`Email ${email} already exists`);
    }

    const createdAddress = await this.prisma.customer.create({
      data: {
        firstName,
        lastName,
        email,
        gender,
        landLine,
        mobile,
        address: { create: address },
      },
    });
    return { customerId: createdAddress.custId } as SaveCustomerType;
  }

  async findByCustId(custId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        custId: custId,
      },
      include: {
        address: true,
      },
    });

    if (!customer) {
      throw new Error(`Customer ${custId} not found`);
    }
    return customer;
  }
}
