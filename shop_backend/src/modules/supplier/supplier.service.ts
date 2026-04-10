import SupplierModel, { type ISupplier } from './supplier.schema';

export const getAllSuppliers = async (): Promise<ISupplier[]> => {
  return SupplierModel.find();
};

export const getSupplierById = async (id: string): Promise<ISupplier | null> => {
  return SupplierModel.findById(id);
};

export const createSupplier = async (supplier: Partial<ISupplier>): Promise<ISupplier> => {
  const created = new SupplierModel(supplier);
  return created.save();
};

export const updateSupplier = async (id: string, update: Partial<ISupplier>): Promise<ISupplier | null> => {
  return SupplierModel.findByIdAndUpdate(id, update, { new: true });
};

export const deleteSupplier = async (id: string): Promise<boolean> => {
  const res = await SupplierModel.findByIdAndDelete(id);
  return !!res;
};
