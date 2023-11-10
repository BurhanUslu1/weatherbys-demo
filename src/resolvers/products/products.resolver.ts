import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from 'src/inputs/product-inputs/save-product.input';
import { UpdateProductAvailableQuantityInput } from 'src/inputs/product-inputs/update-product-available-quantity.input';
import { Product } from 'src/schemas/product/product.schema';
import { ProductService } from 'src/services/product/product.service';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  saveProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  @Query(() => Product)
  findProductByPId(@Args('pId') pId: string) {
    return this.productService.findProductById(pId);
  }

  @Mutation(() => Product)
  updateProductAvailableQuantity(
    @Args('updateAvailableProductQty')
    updateProductAvailableQuantityInput: UpdateProductAvailableQuantityInput,
  ) {
    const { pId, Qty } = updateProductAvailableQuantityInput;
    if (Qty === 0) {
      throw new Error(`Quantity cannot be 0`);
    }
    return this.productService.updateOrderQuantity(pId, Qty);
  }
}
