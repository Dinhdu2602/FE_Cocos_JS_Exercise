export interface Account {
    id: string;
    email: string;
    password: string;
    role: 'OWNER' | 'STAFF' | 'CUSTOMER';
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: Date;
    updatedAt: Date;   
    deletedAt: Date | null;
}