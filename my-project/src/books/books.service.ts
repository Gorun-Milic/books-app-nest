import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { type BookDocument } from './books.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Book')
    private readonly bookModel: Model<BookDocument>,
  ) {}

  findAll(): Promise<BookDocument[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<BookDocument> {
    const book = await this.bookModel.findById(id).exec();

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return book;
  }
}
