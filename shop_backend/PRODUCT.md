User/Owner can:
 - Create category
 - Create product
 - Create variant cho product
 - Can see product list
 - Update product
 - Delete product
Modules:
   + category
   + product
Category
 -> Product
 -> Product variant 
 -> CRUD APIS
 -> Test Thunder Client
 Module Product: not have size, color, stock, price(Product Variant)
  - Name
  - Description
  - Category
  - Brand 
  - ImagesImages
 1 Product has many ProductVariants(such as:Black - L, White - XL, ...)
 => 1 product -> many ProductVariants
 