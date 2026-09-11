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

  findAll(
    search?: string,
    authorId?: string,
    categoryId?: string,
  ): Promise<BookDocument[]> {
    let query = this.bookModel.find();

    if (search?.trim()) {
      query = query.where('title').regex(new RegExp(search.trim(), 'i'));
    }

    if (authorId) {
      query = query.where('authorId').equals(authorId);
    }

    if (categoryId) {
      query = query.where('categoryId').equals(categoryId);
    }

    return query.exec();
  }

  async findOne(id: string): Promise<BookDocument> {
    const book = await this.bookModel.findById(id).exec();

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return book;
  }
}
