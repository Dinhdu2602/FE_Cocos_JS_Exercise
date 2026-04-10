// InventoryLog model
export interface InventoryLog {
  id: string;
  productVariantId: string;
  type: 'IMPORT' | 'EXPORT' | 'ADJUST';
  quantity: number;
  note: string;
  createdBy: string;
  createdAt: Date;
}
