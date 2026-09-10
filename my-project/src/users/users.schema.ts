import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, trim: true, unique: true })
  email!: string;

  @Prop({ required: true, select: false })
  passwordHash!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
