import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateCustomerInput } from 'src/inputs/customer-inputs/save-customer.input';
import { SaveCustomerType } from 'src/schemas/customer/save-customer.schema';
import { Customer } from 'src/schemas/customer/customer.schema';
import { CustomerService } from 'src/services/customer/customer.service';

@Resolver()
export class CustomersResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Mutation(() => SaveCustomerType)
  saveCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ) {
    return this.customerService.create(createCustomerInput);
  }

  @Query(() => Customer)
  findCustomerByCustId(@Args('custId') custId: string) {
    return this.customerService.findByCustId(custId);
  }
}
