import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as userService from '../user.service';
import UserModel from '../user.schema';

describe('User Service', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  it('should create a user', async () => {
    const user = await userService.createUser({
      accountId: 'acc1',
      name: 'Test User',
      birth: new Date('2000-01-01'),
      phone: '0123456789',
      address: 'Test Address',
      createdAt: new Date(),
    });
    expect(user).toBeDefined();
    expect(user.name).toBe('Test User');
  });

  it('should get all users', async () => {
    await userService.createUser({
      accountId: 'acc1',
      name: 'User1',
      birth: new Date('2000-01-01'),
      phone: '0123456789',
      address: 'Address1',
      createdAt: new Date(),
    });
    await userService.createUser({
      accountId: 'acc2',
      name: 'User2',
      birth: new Date('2001-01-01'),
      phone: '0987654321',
      address: 'Address2',
      createdAt: new Date(),
    });
    const users = await userService.getAllUsers();
    expect(users.length).toBe(2);
  });

  it('should update a user', async () => {
    const user = await userService.createUser({
      accountId: 'acc1',
      name: 'User1',
      birth: new Date('2000-01-01'),
      phone: '0123456789',
      address: 'Address1',
      createdAt: new Date(),
    });
    const updated = await userService.updateUser(user._id.toString(), { name: 'Updated' });
    expect(updated).not.toBeNull();
    expect(updated!.name).toBe('Updated');
  });

  it('should delete a user', async () => {
    const user = await userService.createUser({
      accountId: 'acc1',
      name: 'User1',
      birth: new Date('2000-01-01'),
      phone: '0123456789',
      address: 'Address1',
      createdAt: new Date(),
    });
    const deleted = await userService.deleteUser(user._id.toString());
    expect(deleted).toBe(true);
    const found = await userService.getUserById(user._id.toString());
    expect(found).toBeNull();
  });
});
