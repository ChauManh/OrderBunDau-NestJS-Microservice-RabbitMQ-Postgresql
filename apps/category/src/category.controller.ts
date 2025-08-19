import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCategoryDto } from '@app/common/dtos/requests/category.request.dto';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern('createCategory')
  async create(@Payload() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @MessagePattern('findAllCategories')
  async getAll() {
    return await this.categoryService.getAll();
  }

  @MessagePattern('findCategoryById')
  async getById(@Payload() id: string) {
    return await this.categoryService.getById(id);
  }
}
