import type { Account } from './auth.model';
const accounts: Account[] = [];

export const AuthService = {
    register(data: Omit<Account, 'id' | 'createdAt' | 'status' | 'updatedAt' | 'deletedAt'>): Account {
        const newAccount: Account = {
            id: crypto.randomUUID(),
            email: data.email,
            password: data.password,
            role: data.role,
            status: "ACTIVE",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        };
        accounts.push(newAccount);
        return newAccount;
    },
    login(email: string, password: string): Account | null {
        const account = accounts.find(
            acc => acc.email === email && acc.password === password
        );
        if (!account || account.status !== 'ACTIVE') {
            return null;
        }
        return account;
    },
    getAll() {
        return accounts;
    },
}