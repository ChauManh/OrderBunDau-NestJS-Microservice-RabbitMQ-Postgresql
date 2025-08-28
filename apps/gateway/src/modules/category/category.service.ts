import { CreateCategoryDto } from '@app/common/dtos/requests/category.request.dto';
import { CategoryResponse } from '@app/common/dtos/responses/category.response.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_SERVICE') private readonly client: ClientProxy,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponse> {
    return await firstValueFrom(
      this.client.send('createCategory', createCategoryDto),
    );
  }

  async findAll(): Promise<CategoryResponse[]> {
    return await firstValueFrom(this.client.send('findAllCategories', {}));
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  // update(id: number, updateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
