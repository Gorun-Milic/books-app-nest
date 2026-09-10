import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import type { CategoryDocument } from './categories.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(): Promise<CategoryDocument[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CategoryDocument> {
    return this.categoriesService.findOne(id);
  }
}
