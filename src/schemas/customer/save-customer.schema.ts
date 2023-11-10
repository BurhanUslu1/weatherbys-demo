import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SaveCustomerType {
  @Field()
  customerId: String;
}
