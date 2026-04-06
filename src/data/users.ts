import { User } from "../models/user.ts";

export function createSampleUsers(generateId: () => number): User[] {

    const users: User[] = [];

    users.push(new User(generateId(), "Alice"));
    users.push(new User(generateId(), "Bob"));
    users.push(new User(generateId(), "Charlie"));
    users.push(new User(generateId(), "David"));
    users.push(new User(generateId(), "Emma"));

    return users;
}