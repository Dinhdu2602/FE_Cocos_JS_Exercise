import AccountModel, { type IAccount } from './auth.schema';

export const AuthService = {
    async register(data: Partial<IAccount>): Promise<IAccount> {
        const created = new AccountModel({
            ...data,
            status: 'ACTIVE',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        });
        return created.save();
    },

    async login(email: string, password: string): Promise<IAccount | null> {
        const account = await AccountModel.findOne({ email, password });
        if (!account || account.status !== 'ACTIVE') {
            return null;
        }
        return account;
    },

    async getAll(): Promise<IAccount[]> {
        return AccountModel.find();
    },
};