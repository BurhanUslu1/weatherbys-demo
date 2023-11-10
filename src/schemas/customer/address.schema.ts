import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Address {
  @Field()
  addrNo: string;
  @Field()
  addressLine1: string;
  @Field({ nullable: true })
  addressLine2: string;
  @Field()
  city: string;
  @Field()
  postCode: string;
  @Field()
  country: string;
}
