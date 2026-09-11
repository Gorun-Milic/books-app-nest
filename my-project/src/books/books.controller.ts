import { Controller, Get, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import type { BookDocument } from './books.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('authorId') authorId?: string,
    @Query('categoryId') categoryId?: string,
  ): Promise<BookDocument[]> {
    return this.booksService.findAll(search, authorId, categoryId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BookDocument> {
    return this.booksService.findOne(id);
  }
}
