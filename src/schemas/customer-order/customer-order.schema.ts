import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Customer } from '../customer/customer.schema';
import { Product } from '../product/product.schema';

@ObjectType()
export class CustomerOrder {
  @Field(() => ID)
  ordId?: string;
  @Field()
  dateOrder: Date;
  @Field()
  orderedQty: number;
  @Field()
  customer: Customer;
  @Field()
  product: Product;
}
