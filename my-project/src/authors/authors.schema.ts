import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;

@Schema({ timestamps: true })
export class Author {
  @Prop({ required: true, trim: true })
  firstName!: string;

  @Prop({ required: true, trim: true })
  lastName!: string;

  @Prop({ min: 0, max: new Date().getFullYear() })
  birthYear?: number;

  @Prop({ trim: true })
  biography?: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
