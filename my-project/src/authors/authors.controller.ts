import { Controller, Get, Param } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import type { AuthorDocument } from './authors.schema';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll(): Promise<AuthorDocument[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AuthorDocument> {
    return this.authorsService.findOne(id);
  }
}
