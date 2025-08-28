import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from '@app/common/dtos/requests/category.request.dto';
import { CategoryResponse } from '@app/common/dtos/responses/category.response.interface';
import { ReturnFromController } from '../../common/interfaces/return-from-controller.interface';
import { mapToApiResponse } from '../../common/utils/map-to-api-response.util';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<ReturnFromController<CategoryResponse[]>> {
    const categories = await this.categoryService.findAll();
    return mapToApiResponse(200, 'Get categories successfully', categories);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoryDto) {
  //   return this.categoryService.update(+id, updateCategoryDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
