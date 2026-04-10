# Shop Backend

A Node.js + TypeScript backend for clothing shop management, using Express.js and MongoDB (Mongoose).

## Features
- Modular structure: User, Product, Order, Category, Customer, etc.
- JWT authentication & role-based authorization
- MongoDB with Mongoose ODM
- Jest unit tests
- Seed script for sample data

## Requirements
- Node.js >= 16
- MongoDB instance (local or remote)

## Setup

1. **Clone repo & install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env` and set `MONGO_URI` (default: `mongodb://localhost:27017/shop`)

3. **Build project:**
   ```bash
   npm run build
   ```

4. **Run in development:**
   ```bash
   npm run dev
   ```

5. **Start production server:**
   ```bash
   npm start
   ```

6. **Seed database:**
   ```bash
   npm run seed
   ```

7. **Run tests:**
   ```bash
   npm test
   ```

## Folder Structure
- `src/` - Source code
  - `modules/` - Feature modules (user, product, order, ...)
  - `common/` - Middleware, utils, constants
  - `config/` - Configuration files
  - `database/` - Database connection
  - `seed.ts` - Seed script
- `dist/` - Compiled JS output

## Scripts
- `dev` - Start in watch mode (tsx)
- `build` - Compile TypeScript
- `start` - Run compiled server
- `seed` - Seed database with sample data
- `test` - Run unit tests (Jest)

## Notes
- Default admin: `admin/admin123`
- Default user: `user/user123`
- API runs on port 3000 by default

---

Feel free to extend modules and add more features!
