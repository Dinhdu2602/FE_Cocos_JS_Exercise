// Import Receipt model
export interface ImportReceipt {
  id: string;
  supplierId: string;
  totalAmount: number;
  createdAt: Date;
}

export interface ImportItem {
  id: string;
  receiptId: string;
  productVariantId: string;
  quantity: number;
  costPrice: number;
}
