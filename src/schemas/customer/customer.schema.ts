import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Address } from './address.schema';

@ObjectType()
export class Customer {
  @Field(() => ID)
  custId?: string;
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
  address: Address;
}
