import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CustomersResolver } from './resolvers/customers/customers.resolver';
import { ProductsResolver } from './resolvers/products/products.resolver';
import { CustomerOrderResolver } from './resolvers/customer-order/customer-order.resolver';
import { PrismaClient } from '@prisma/client';
import { ProductService } from './services/product/product.service';
import { CustomerService } from './services/customer/customer.service';
import { CustomerOrderService } from './services/customer-order/customer-order.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
  providers: [
    CustomersResolver,
    CustomerService,
    ProductsResolver,
    CustomerOrderService,
    CustomerOrderResolver,
    PrismaClient,
    ProductService,
  ],
})
export class AppModule {}
