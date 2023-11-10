## To Run project

- create database in local postgre sql
- locate your terminal location of WEATHERBYS-DEMO folder
- run npm install
- need to write local postgreSql database url in .env file.
- run "npx prisma db push" (database tables are going to create)
- run "npx prisma db seed" (dummy data are going to insert tables)
- run "npm start"

Project is going to run in => http://localhost:3000/graphql

## SaveCustomer Mutation

mutation($customerInput: CreateCustomerInput!){
  saveCustomer(createCustomerInput:$customerInput){
customerId
}
}

## Query Variables

{
"customerInput": {
"firstName": "burhan",
"lastName": "uslu",
"gender": "Male",
"email": "burhan2214@hotmail.com",
"landLine": "1234",
"mobile": "1234",
"address": {
"addrNo": "15",
"addressLine1": "Barnet",
"city": "London",
"postCode": "En5",
"country": "UK"
}
}
}

## SaveProduct Mutation

mutation($product:CreateProductInput!){
  saveProduct(createProductInput:$product){
pId
description
unitPrice
availableQty
}
}

## Query Variables

{
"product":{
"description": "product 5",
"unitPrice": 123.5,
"availableQty": 15
}
}

## SaveCustomerOrder Mutation

mutation($newOrder:CreateCustomerOrderInput!){
  saveCustomerOrder(createCustomerOrderInput:$newOrder){
ordId,
dateOrder
orderedQty
customer{
custId
firstName
}
product{
pId
}
}
}

## Query Variables

{
"newOrder":{
"pId": "P001",
"orderQty": 15,
"custID": "664f0d5f-3c81-4e39-84a6-e71715a804d5"
}
}

## findCustomerById Query

query{
findCustomerByCustId(custId:"664f0d5f-3c81-4e39-84a6-e71715a804d5"){
custId,
firstName,
lastName,
email,
address{
addrNo
addressLine1
addressLine2
city
postCode
country
}
}
}

## findProductById Query

query{
findProductByPId(pId:"P001"){
pId,
description,
unitPrice,
availableQty
}
}

## findOrdersByProductId Query

query{
findOrdersByProductId(pId:"P001"){
ordId
dateOrder
orderedQty
customer{
custId
lastName
address{
addrNo
addressLine1
city
postCode
country
}
}
product{
pId
unitPrice
availableQty

    }

}
}

## findCustomerOrderByOrdId Query

ordId: this is going to be unique, you can get one from findOrdersByProductId
query{
findCustomerOrderByOrdId(ordId:" "){
ordId,
dateOrder,
product{
pId
description
unitPrice
availableQty
}
customer{
firstName,
lastName
custId
gender
email
landLine
mobile
address{
addrNo

    }
     }

}
}

## updateProductAvailableQuantity

mutation($productQuantity:UpdateProductAvailableQuantityInput!){
  updateProductAvailableQuantity(updateAvailableProductQty:$productQuantity){
pId
description
availableQty
unitPrice
}
}

## Query Variables

{
"productQuantity": {
"pId": "P001",
"Qty": 10
}
}
