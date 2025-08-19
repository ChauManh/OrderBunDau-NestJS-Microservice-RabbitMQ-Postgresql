import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '@app/common/dtos/requests/category.request.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepo.create(createCategoryDto);
    return await this.categoryRepo.save(newCategory);
  }

  async getAll(): Promise<Category[]> {
    return await this.categoryRepo.find();
  }

  async getById(id: string): Promise<Category | null> {
    return await this.categoryRepo.findOne({ where: { id } });
  }
}
