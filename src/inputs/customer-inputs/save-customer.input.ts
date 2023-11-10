import { InputType, Field } from '@nestjs/graphql';
import { CustomerAddressInput } from './customer-address.input';

@InputType()
export class CreateCustomerInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  gender: string;
  @Field()
  email: string;
  @Field({ nullable: true })
  landLine: string;
  @Field()
  mobile: string;
  @Field()
  address: CustomerAddressInput;
}
