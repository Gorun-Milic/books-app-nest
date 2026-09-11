import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import type { AuthUser } from '../authentication/jwt.strategy';
import { type CreateReviewDto } from './dto/create-review.dto';
import { type UpdateReviewDto } from './dto/update-review.dto';
import { type ReviewDocument } from './reviews.schema';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('book/:bookId')
  findByBook(@Param('bookId') bookId: string): Promise<ReviewDocument[]> {
    return this.reviewsService.findByBook(bookId);
  }

  @Post('book/:bookId')
  @UseGuards(JwtAuthGuard)
  create(
    @Param('bookId') bookId: string,
    @Body() reviewData: CreateReviewDto,
    @Req() request: Request & { user: AuthUser },
  ): Promise<ReviewDocument> {
    return this.reviewsService.create(request.user.userId, bookId, reviewData);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() reviewData: UpdateReviewDto,
    @Req() request: Request & { user: AuthUser },
  ): Promise<ReviewDocument> {
    return this.reviewsService.update(id, request.user.userId, reviewData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(
    @Param('id') id: string,
    @Req() request: Request & { user: AuthUser },
  ): Promise<ReviewDocument> {
    return this.reviewsService.remove(id, request.user.userId);
  }
}
