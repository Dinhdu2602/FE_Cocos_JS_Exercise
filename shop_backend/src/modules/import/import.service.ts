// Import service
import ImportReceiptModel, { type IImportReceipt, ImportItemModel, type IImportItem } from './import.schema';

export const getAllImportReceipts = async (): Promise<IImportReceipt[]> => {
  return ImportReceiptModel.find();
};

export const getImportReceiptById = async (id: string): Promise<IImportReceipt | null> => {
  return ImportReceiptModel.findById(id);
};

export const createImportReceipt = async (receipt: Partial<IImportReceipt>): Promise<IImportReceipt> => {
  const created = new ImportReceiptModel(receipt);
  return created.save();
};

export const updateImportReceipt = async (id: string, update: Partial<IImportReceipt>): Promise<IImportReceipt | null> => {
  return ImportReceiptModel.findByIdAndUpdate(id, update, { new: true });
};

export const deleteImportReceipt = async (id: string): Promise<boolean> => {
  const res = await ImportReceiptModel.findByIdAndDelete(id);
  return !!res;
};

// ImportItem CRUD
export const getImportItems = async (receiptId: string): Promise<IImportItem[]> => {
  return ImportItemModel.find({ receiptId });
};

export const addImportItem = async (item: Partial<IImportItem>): Promise<IImportItem> => {
  const created = new ImportItemModel(item);
  return created.save();
};

export const updateImportItem = async (id: string, update: Partial<IImportItem>): Promise<IImportItem | null> => {
  return ImportItemModel.findByIdAndUpdate(id, update, { new: true });
};

export const deleteImportItem = async (id: string): Promise<boolean> => {
  const res = await ImportItemModel.findByIdAndDelete(id);
  return !!res;
};
