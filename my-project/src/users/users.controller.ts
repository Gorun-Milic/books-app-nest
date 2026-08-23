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
import type { UserDocument } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserDocument[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() userData: CreateUserDto): Promise<UserDocument> {
    return this.usersService.create(userData);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.usersService.update(id, userData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.remove(id);
  }
}
