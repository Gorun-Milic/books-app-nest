import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.types';
import type { User } from './users.types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User | string {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() userData: CreateUserDto): User {
    return this.usersService.create(userData);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
  ): User | string {
    return this.usersService.update(id, userData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): User | string {
    return this.usersService.remove(id);
  }
}
