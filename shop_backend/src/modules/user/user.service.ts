import UserModel, { type IUser } from './user.schema';

export const getAllUsers = async (): Promise<IUser[]> => {
  return UserModel.find();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return UserModel.findById(id);
};

export const createUser = async (user: Partial<IUser>): Promise<IUser> => {
  const created = new UserModel(user);
  return created.save();
};

export const updateUser = async (id: string, update: Partial<IUser>): Promise<IUser | null> => {
  return UserModel.findByIdAndUpdate(id, update, { new: true });
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const res = await UserModel.findByIdAndDelete(id);
  return !!res;
  return true;
};
