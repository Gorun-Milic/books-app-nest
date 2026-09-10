import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import type { UserDocument } from './users.schema';
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
