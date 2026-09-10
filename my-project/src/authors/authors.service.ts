import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { type AuthorDocument } from './authors.schema';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel('Author')
    private readonly authorModel: Model<AuthorDocument>,
  ) {}

  findAll(): Promise<AuthorDocument[]> {
    return this.authorModel.find().exec();
  }

  async findOne(id: string): Promise<AuthorDocument> {
    const author = await this.authorModel.findById(id).exec();

    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }

    return author;
  }
}
