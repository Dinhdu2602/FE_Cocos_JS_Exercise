## 👕 Clothing Shop Management System

# 📌 Requirement
 Build a management system for a clothing shop as a web application (not console-based). The system should support multiple roles and handle product management, sales, inventory tracking, and reporting.
 
 The system should allow users to:
  - Store and management a collection of products (clothes)
  - Perform CRUD operations on products
  - Manage orders and sales transactions
  - Track inventory (stock in/out)
  - Generate basic reports (revenue, profit, stock status)
# 🎯 Objective 
- Practice building a real-world application using JavaScript/TypeScript
- Understand system design with multiple actors and business flow
- Apply CRUD operations in a practice scenario
- Learn how to structure a scalable project (controller, service, model)
- Practice working with roles and permissions
- Improve problem-solving and logical thinking
- Prepare for building larger systems (accounting, analytics)

# 👥 Actors
# 1. Owner:
- Manages the entire system
- Views reports (revenue, profit, growth)
- Manages products and staff
- Tracks business performance
# 2. Staff:
- Manages daily operations
- Creates orders (sales)
- Checks inventory
- Imports products (restocking)
# 3. Customer:
- Views products
- Places orders
# 🧩 Objects
## Auth and User
1. Account
 - id: string
 - email: string
 - password: string
 - role: 'OWNER' | 'STAFF' | 'CUSTOMER'
 - status: 'ACTIVE' | 'INACTIVE'
 - createdAt: Date
2. User
 - id: string
 - accountId: string
 - name: string
 - birth: Date
 - phone: string
 - address: string 
 - createdAt: Date
## Product Domain
1. Category:
 - id: string
 - name: string
 - description: string
2. Product:
Represents a clothing item in shop
 - id: string
 - name: string 
 - categoryId: string
 - description: string
 - createdAt: Date
3. ProductVariant: (Record = size + color + price + costPrice)
 - id: string
 - productID: string
 - size: string  
 - color: string
 - price: number
 - costPrice: number
 - stock: number
 - sku: string
4. ProductImage
 - id: string
 - productId: string
 - url: string
 - isPrimary: boolean
## OrderDomain
Represents a customer purchase
1. Order:
 - id: string
 - userId: string
 - totalAmount: number
 - status: 'PENDING' | 'PAID' | 'CANCELLED'
 - paymentMethod: 'CASH' | 'BANK' | 'MOMO'
 - createdAt: Date
2. OrderItem
 - id: string
 - orderId: string
 - productVariantId: string
 - productName: string
 - size: string
 - color: string
 - quantity: number
 - price: number
3. Cart (If enable user)
 - id: string
 - userId: string
4. CartItem
 - id: string
 - cartId: string
 - productVariantId: string
 - quantity: number 
## Inventory Domain
Tracks stock movement (import/export)
1. InventoryLog
 - id: string
 - productVariantId: string
 - type: 'IMPORT' | 'EXPORT' | 'ADJUST'
 - quantity: number
 - note: number
 - createdBy: string
 - createAt: Date
2. Supplier (If import product)
 - id: string
 - name: string
 - phone: string
 - address: string
3. Import Receipt 
 - id: string
 - supplierId: string
 - totalAmount: number
 - createdAt: Date
4. ImportItem:
 - id: string
 - receiptId: string
 - productVariantId: string
 - quantity: number
 - costPrice: number
## Accounting Domain (Future Extension)
1. Transaction:
 - id: string
 - type: 'INCOME' | 'EXPENSE'
 - amount: number
 - referenceId: string // orderId / importId
 - description: string
 - createdAt: Date
2. Report Cache:
 - id: string
 - type: 'DAILY' | 'MONTHLY'
 - data: object
 - createdAt: Date
## ⚙️ Features
# Authentication & Authorization
 - Register / Login / Logout
 - Role-based access (Owner, Staff, Customer)
 - Account status (ACTIVE / INACTIVE)
# User Management
 - Create / Update / Delete user (Owner Only)
 - View user list  
 - View customer purchase history
# Product Management 
 - Create / Update / Delete product
 - Assign category to product
 - Manage product variants (size, color, price, stock)
 - Upload / manage product images
 - Search / filter products (by category, price, stock)
# Category Management
 - Add / Update / Delete Category
 - Assign products to category
# Order Management
 - Create order (Staff /Customer)
 - Add multiple items to order
 - Calculate total amount
 - Update order status
 - View order history
 - Filter orders (by date, status)
# Cart Management (If has Customer UI)
 - Add to cart
 - Update quantity
 - Remove item from cart
 - Checkout -> create order
# Inventory Management 
 - Import stock (create import receipt)
 - Export stock (auto when order created)
 - Adjust stock manually (inventory correction)
 - Track inventory logs (IMPORT / EXPORT / ADJUST)
 - View stock by product variant
 - Low stock alert 
 # Supplier Management 
 - Add / Update / Delete supplier
 - Link supplier to import receipts
 # Accounting (EXTENDED)
 - Record income (from orders)
 - Record expense (from imports / manual)
 - Track transaction history
 - Calculate profit:
        profit = total income - total expense
# Reporting (UPGRADE)
 - Revenue by:
day / month / year
 - Profit report
 - Total orders
 - Best-selling products
 - Inventory report (stock remaining)
# Analytics (OPTIONAL)
 - Compare revenue between years
 - Monthly trend analysis
 - Peak sales period (Tết, Noel,...)  

## 🚀 Future Improvements (EXPANDED)
 - Dashboard with charts (Chart.js / Recharts)
 - Export report (Excel / PDF)
Promotion / discount system
Customer loyalty system (points)
AI recommendation
 - Multi-store support
Real-time notification (low stock)