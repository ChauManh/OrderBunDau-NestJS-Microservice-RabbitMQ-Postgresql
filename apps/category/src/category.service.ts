import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '@app/common/dtos/requests/category.request.dto';
import { CategoryResponse } from '@app/common/dtos/responses/category.response.interface';
import { ERROR_MESSAGES } from '@app/common/constants/errors';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponse> {
    const newCategory = this.categoryRepo.create(createCategoryDto);
    return await this.categoryRepo.save(newCategory);
  }

  async getAll(): Promise<Category[]> {
    return await this.categoryRepo.find();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new RpcException(ERROR_MESSAGES.CATEGORY_NOT_FOUND);
    else return category;
  }

  async update(id: string, name: string): Promise<CategoryResponse | null> {
    const category = await this.findOne(id);
    category.name = name;
    return await this.categoryRepo.save(category);
  }

  async delete(id: string) {
    const category = await this.findOne(id);
    await this.categoryRepo.remove(category);
  }
}
