import InventoryLogModel, { type IInventoryLog } from './inventory.schema';

export const getInventoryLogs = async (): Promise<IInventoryLog[]> => {
  return InventoryLogModel.find();
};

export const getInventoryLogById = async (id: string): Promise<IInventoryLog | null> => {
  return InventoryLogModel.findById(id);
};

export const createInventoryLog = async (log: Partial<IInventoryLog>): Promise<IInventoryLog> => {
  const created = new InventoryLogModel(log);
  return created.save();
};

export const updateInventoryLog = async (id: string, update: Partial<IInventoryLog>): Promise<IInventoryLog | null> => {
  return InventoryLogModel.findByIdAndUpdate(id, update, { new: true });
};

export const deleteInventoryLog = async (id: string): Promise<boolean> => {
  const res = await InventoryLogModel.findByIdAndDelete(id);
  return !!res;
};
