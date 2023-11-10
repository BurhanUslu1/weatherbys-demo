import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCustomerOrderInput } from 'src/inputs/customer-order-inputs/save-customer-order.input';
import { CustomerOrder } from 'src/schemas/customer-order/customer-order.schema';
import { Product } from 'src/schemas/product/product.schema';
import { CustomerOrderService } from 'src/services/customer-order/customer-order.service';
import { CustomerService } from 'src/services/customer/customer.service';
import { ProductService } from 'src/services/product/product.service';

@Resolver()
export class CustomerOrderResolver {
  constructor(
    private readonly customerOrderService: CustomerOrderService,
    private readonly productService: ProductService,
    private readonly customerService: CustomerService,
  ) {}

  @Mutation(() => CustomerOrder)
  async saveCustomerOrder(
    @Args('createCustomerOrderInput')
    createCustomerOrderInput: CreateCustomerOrderInput,
  ) {
    const { pId, orderQty, custID } = createCustomerOrderInput;
    const availableProduct =
      await this.productService.isProductAvailableToOrder(pId, orderQty);

    if (!availableProduct) {
      throw new Error(`Product ${pId} does not have enough stock`);
    }

    const customer = await this.customerService.findByCustId(custID);

    //When project has token based authentication, we can get the customer ID from the token, and we can remove the custID from the input
    if (!customer) {
      throw new Error(`Customer ${custID} not found`);
    }

    const product: Product = {
      pId: availableProduct.pId,
      description: availableProduct.description,
      unitPrice: availableProduct.unitPrice.toNumber(), // convert Decimal to number
      availableQty: availableProduct.availableQty,
    };

    const orderCreated = await this.customerOrderService.create(
      product,
      customer,
      orderQty,
    );

    if (!orderCreated) {
      throw new Error(`Order not created`);
    }

    await this.productService.updateOrderQuantity(pId, -orderQty);

    return orderCreated;
  }

  @Query(() => CustomerOrder)
  async findCustomerOrderByOrdId(@Args('ordId') ordId: string) {
    return await this.customerOrderService.findOrderByOrdId(ordId);
  }

  @Query(() => [CustomerOrder!])
  async findOrdersByProductId(@Args('pId') pId: string) {
    return await this.customerOrderService.findOrdersByProductId(pId);
  }
}
