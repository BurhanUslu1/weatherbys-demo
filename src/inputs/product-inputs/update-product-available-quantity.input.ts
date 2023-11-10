import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateProductAvailableQuantityInput {
  @Field()
  pId: string;
  @Field()
  Qty: number;
}
