import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserModel } from './modules/user/user.model';
import { CategoryModel } from './modules/category/category.model';
import { ProductModel } from './modules/product/product.model';
import { CustomerModel } from './modules/customer/customer.model';
import { OrderModel } from './modules/order/order.model';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shop';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear collections
    await Promise.all([
      UserModel.deleteMany({}),
      CategoryModel.deleteMany({}),
      ProductModel.deleteMany({}),
      CustomerModel.deleteMany({}),
      OrderModel.deleteMany({}),
    ]);

    // Seed Users
    const users = await UserModel.insertMany([
      { accountId: 'admin', name: 'Admin', birth: new Date('1990-01-01'), phone: '0900000000', address: 'HN', createdAt: new Date() },
      { accountId: 'user', name: 'User', birth: new Date('1995-01-01'), phone: '0900000001', address: 'SG', createdAt: new Date() },
    ]);
    console.log('Seeded users:', users.length);

    // Seed Categories
    const categories = await CategoryModel.insertMany([
      { name: 'T-Shirts', description: 'All T-Shirts' },
      { name: 'Jeans', description: 'All Jeans' },
    ]);
    console.log('Seeded categories:', categories.length);

    // Seed Products
    const products = await ProductModel.insertMany([
      { name: 'Basic Tee', description: 'Cotton', categoryId: categories[0]!._id, images: [], createdAt: new Date() },
      { name: 'Slim Jeans', description: 'Denim', categoryId: categories[1]!._id, images: [], createdAt: new Date() },
    ]);
    console.log('Seeded products:', products.length);

    // Seed Customers
    const customers = await CustomerModel.insertMany([
      { name: 'Nguyen Van A', points: 100 },
      { name: 'Tran Thi B', points: 50 },
    ]);
    console.log('Seeded customers:', customers.length);

    // Seed Orders
    const orders = await OrderModel.insertMany([
      {
        customerId: customers[0]!._id,
        items: [
          { variantId: '1', quantity: 1, price: 199000, costPrice: 150000 },
        ],
        totalAmount: 199000,
        status: 'PAID',
        createdAt: new Date(),
      },
      {
        customerId: customers[1]!._id,
        items: [
          { variantId: '2', quantity: 2, price: 399000, costPrice: 300000 },
        ],
        totalAmount: 798000,
        status: 'PENDING',
        createdAt: new Date(),
      },
    ]);
    console.log('Seeded orders:', orders.length);

    console.log('Seeding completed!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
