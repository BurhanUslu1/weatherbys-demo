import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCustomerOrderInput {
  @Field()
  pId: string;
  @Field()
  orderQty: number;
  @Field()
  custID: string;
}
