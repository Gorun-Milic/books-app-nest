import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserDto {
  name: string;
  email: string;
}

interface UpdateUserDto {
  name?: string;
  email?: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [];
  private nextId = 1;

  @Get()
  findAll(): User[] {
    return this.users;
  }

  @Get(':id')
  findOne(@Param('id') id: string): User | string {
    const user = this.users.find(
      (currentUser) => currentUser.id === Number(id),
    );

    return user ?? `User with id ${id} not found`;
  }

  @Post()
  create(@Body() userData: CreateUserDto): User {
    const user: User = {
      id: this.nextId++,
      name: userData.name,
      email: userData.email,
    };

    this.users.push(user);
    return user;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
  ): User | string {
    const user = this.users.find(
      (currentUser) => currentUser.id === Number(id),
    );

    if (!user) {
      return `User with id ${id} not found`;
    }

    Object.assign(user, userData);
    return user;
  }

  @Delete(':id')
  remove(@Param('id') id: string): User | string {
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
