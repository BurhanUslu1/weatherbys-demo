import { InputType, Field } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';

@InputType()
export class CreateProductInput {
  @Field()
  description: string;
  @Field()
  unitPrice: number;
  @Field()
  availableQty: number;
}
