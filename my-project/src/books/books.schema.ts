import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ min: 0, max: new Date().getFullYear() })
  publishedYear?: number;

  @Prop({ required: true, trim: true })
  authorId!: string;

  @Prop({ required: true, trim: true })
  categoryId!: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
