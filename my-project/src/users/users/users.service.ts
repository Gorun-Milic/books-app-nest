import { Injectable } from '@nestjs/common';
import type { CreateUserDto, UpdateUserDto, User } from './users.types';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User | string {
    const user = this.users.find(
      (currentUser) => currentUser.id === Number(id),
    );

    return user ?? `User with id ${id} not found`;
  }

  create(userData: CreateUserDto): User {
    const user: User = {
      id: this.nextId++,
      name: userData.name,
      email: userData.email,
    };

    this.users.push(user);
    return user;
  }

  update(id: string, userData: UpdateUserDto): User | string {
    const user = this.users.find(
      (currentUser) => currentUser.id === Number(id),
    );

    if (!user) {
      return `User with id ${id} not found`;
    }

    Object.assign(user, userData);
    return user;
  }

  remove(id: string): User | string {
    const userIndex = this.users.findIndex(
      (currentUser) => currentUser.id === Number(id),
    );

    if (userIndex === -1) {
      return `User with id ${id} not found`;
    }

    const [deletedUser] = this.users.splice(userIndex, 1);
    return deletedUser;
  }
}
