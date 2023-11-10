import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CustomerAddressInput {
  @Field()
  addrNo: string;
  @Field()
  addressLine1: string;
  @Field({ nullable: true })
  addressLine2?: string;
  @Field()
  city: string;
  @Field()
  postCode: string;
  @Field()
  country: string;
}
