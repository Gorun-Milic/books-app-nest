import { Controller, Get, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import type { BookDocument } from './books.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Promise<BookDocument[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BookDocument> {
    return this.booksService.findOne(id);
  }
}
