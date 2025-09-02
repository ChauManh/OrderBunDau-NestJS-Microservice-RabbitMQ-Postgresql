import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
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
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);
    return mapToApiResponse(201, 'Tạo danh mục thành công', category);
  }

  @Get()
  async findAll(): Promise<ReturnFromController<CategoryResponse[]>> {
    const categories = await this.categoryService.findAll();
    return mapToApiResponse(200, 'Lấy tất cả danh mục thành công', categories);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    const categoryUpdated = await this.categoryService.update(
      id,
      updateCategoryDto,
    );
    return mapToApiResponse(
      200,
      'Cập nhật danh mục thành công',
      categoryUpdated,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(id);
    return mapToApiResponse(204);
  }
}
