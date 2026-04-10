import CustomerModel, { type ICustomer } from './customer.schema';

export const CustomerService = {
    async create(data: Partial<ICustomer>): Promise<ICustomer> {
        const created = new CustomerModel(data);
        return created.save();
    },

    async addPoints(customerId: string, points: number): Promise<ICustomer | null> {
        const customer = await CustomerModel.findById(customerId);
        if (!customer) return null;
        customer.points += points;
        await customer.save();
        return customer;
    },

    async getAll(): Promise<ICustomer[]> {
        return CustomerModel.find();
    },
};