import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => ID)
  pId: string;
  @Field()
  description: string;
  @Field()
  unitPrice: Number;
  @Field()
  availableQty: number;
}
