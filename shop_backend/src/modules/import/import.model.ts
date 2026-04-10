// ImportReceipt model
export interface ImportReceipt {
  id: string;
  supplierId: string;
  createdBy: string;
  createdAt: Date;
}

export interface ImportItem {
  id: string;
  receiptId: string;
  productVariantId: string;
  quantity: number;
  price: number;
}
