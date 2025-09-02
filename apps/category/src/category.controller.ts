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

  @MessagePattern('findOneCategory')
  async getById(@Payload() id: string) {
    return await this.categoryService.findOne(id);
  }

  @MessagePattern('updateCategory')
  async update(
    @Payload() data: { id: string; updateCategoryDto: CreateCategoryDto },
  ) {
    return await this.categoryService.update(
      data.id,
      data.updateCategoryDto.name,
    );
  }

  @MessagePattern('removeCategory')
  async remove(@Payload() id: string) {
    await this.categoryService.delete(id);
    return {};
  }
}
