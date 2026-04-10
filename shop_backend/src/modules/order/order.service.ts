
import OrderModel, { type IOrder } from './order.schema';
import { ProductVariantService } from '../product/productVariant.service';
import { CustomerService } from '../customer/customer.service';
interface GetOrdersOptions {
    page?: number;
    limit?: number;
    status?: string;
    customerId?: string;
    sortBy?: string;
    order?: "asc" | "desc";
}
const coupons: Record<string, number> = {
    SALE10: 10,
    SALE20: 20,
};


export const OrderService = {
    async create(data: Omit<IOrder, 'id' | 'createdAt' | 'status' | 'totalAmount' | 'discountAmount'>): Promise<IOrder> {
        for (const item of data.items) {
            const enoughStock = await ProductVariantService.checkStock(item.variantId, item.quantity);
            if (!enoughStock) {
                throw new Error('Insufficient stock');
            }
        }
        for (const item of data.items) {
            await ProductVariantService.deductStock(item.variantId, item.quantity);
        }
        const subtotal = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        let discountAmount = 0;
        if (data.couponCode && coupons[data.couponCode]) {
            discountAmount = subtotal * (coupons[data.couponCode]! / 100);
        }
        const totalAmount = subtotal - discountAmount;
        const newOrder = new OrderModel({
            ...data,
            createdAt: new Date(),
            status: 'PENDING',
            totalAmount,
            discountAmount,
        });
        return newOrder.save();
    },

    async getAll(options: GetOrdersOptions) {
        const {
            page = 1,
            limit = 10,
            status,
            customerId,
            sortBy = 'createdAt',
            order = 'desc',
        } = options;
        const query: any = {};
        if (status) query.status = status;
        if (customerId) query.customerId = customerId;
        const total = await OrderModel.countDocuments(query);
        const data = await OrderModel.find(query)
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return { total, page, limit, data };
    },

    async updateStatus(id: string, status: IOrder['status']): Promise<IOrder | null> {
        const order = await OrderModel.findById(id);
        if (!order) return null;
        const wasPaid = order.status === 'PAID';
        order.status = status;
        await order.save();
        if (!wasPaid && status === 'PAID' && order.customerId) {
            const earnedPoints = Math.floor(order.totalAmount / 10000);
            await CustomerService.addPoints(order.customerId, earnedPoints);
        }
        return order;
    },

    async cancel(id: string): Promise<IOrder | null> {
        const order = await OrderModel.findById(id);
        if (!order) return null;
        if (order.status === 'CANCELLED') {
            throw new Error('Order already cancelled.');
        }
        for (const item of order.items) {
            await ProductVariantService.restock(item.variantId, item.quantity);
        }
        order.status = 'CANCELLED';
        await order.save();
        return order;
    },

    async getRevenueAnalytics() {
        const totalOrders = await OrderModel.countDocuments();
        const paidOrders = await OrderModel.find({ status: 'PAID' });
        const totalRevenue = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0);
        return {
            totalOrders,
            paidOrders: paidOrders.length,
            totalRevenue,
        };
    },

    async getTopSellingVariants() {
        const paidOrders = await OrderModel.find({ status: 'PAID' });
        const soldMap: Record<string, number> = {};
        paidOrders.forEach((order) => {
            order.items.forEach((item) => {
                if (!soldMap[item.variantId]) {
                    soldMap[item.variantId] = 0;
                }
                soldMap[item.variantId]! += item.quantity;
            });
        });
        return Object.entries(soldMap)
            .map(([variantId, soldQuantity]) => ({
                variantId,
                soldQuantity
            }))
            .sort((a, b) => b.soldQuantity - a.soldQuantity);
    },

    async getProfitAnalytics() {
        const paidOrders = await OrderModel.find({ status: 'PAID' });
        const totalRevenue = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0);
        const totalCost = paidOrders.reduce((sum, order) =>
            sum + order.items.reduce((itemSum, item) => itemSum + item.costPrice * item.quantity, 0),
            0
        );
        return {
            totalRevenue,
            totalCost,
            totalProfit: totalRevenue - totalCost,
        };
    },

    async returnOrder(id: string): Promise<IOrder | null> {
        const order = await OrderModel.findById(id);
        if (!order) return null;
        if (order.status !== 'PAID') {
            throw new Error('Only PAID orders can be returned');
        }
        for (const item of order.items) {
            await ProductVariantService.restock(item.variantId, item.quantity);
        }
        order.status = 'RETURNED';
        await order.save();
        return order;
    },
};

