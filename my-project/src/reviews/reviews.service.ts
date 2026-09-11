import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { type CreateReviewDto } from './dto/create-review.dto';
import { type UpdateReviewDto } from './dto/update-review.dto';
import { type ReviewDocument } from './reviews.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel('Review')
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  findByBook(bookId: string): Promise<ReviewDocument[]> {
    return this.reviewModel.find({ bookId }).exec();
  }

  findByUser(userId: string): Promise<ReviewDocument[]> {
    return this.reviewModel.find({ userId }).exec();
  }

  create(
    userId: string,
    bookId: string,
    reviewData: CreateReviewDto,
  ): Promise<ReviewDocument> {
    return this.reviewModel.create({ userId, bookId, ...reviewData });
  }

  async update(
    id: string,
    userId: string,
    reviewData: UpdateReviewDto,
  ): Promise<ReviewDocument> {
    const review = await this.reviewModel.findById(id).exec();

    this.ensureOwner(review, userId, id);

    Object.assign(review, reviewData);
    return review.save();
  }

  async remove(id: string, userId: string): Promise<ReviewDocument> {
    const review = await this.reviewModel.findById(id).exec();

    this.ensureOwner(review, userId, id);

    await review.deleteOne();
    return review;
  }

  private ensureOwner(
    review: ReviewDocument | null,
    userId: string,
    id: string,
  ): asserts review is ReviewDocument {
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    if (review.userId !== userId) {
      throw new ForbiddenException('You can only manage your own reviews');
    }
  }
}
