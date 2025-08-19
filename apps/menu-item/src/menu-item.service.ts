import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu-item.entity';
import { CreateMenuItemDto } from './dtos/create-menu-item.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ERROR_MESSAGES } from '@app/common/constants/errors';
import { firstValueFrom } from 'rxjs';
import { Category } from 'apps/category/src/entities/user.entity';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem) private menuItemRepo: Repository<MenuItem>,
    @Inject('CATEGORY_SERVICE') private readonly categoryClient: ClientProxy,
  ) {}

  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    const menuItem = await this.findByName(createMenuItemDto.name);
    if (menuItem)
      throw new RpcException(ERROR_MESSAGES.MENU_ITEM_ALREADY_EXISTS);
    const category: Category | null = await firstValueFrom(
      this.categoryClient.send(
        'findCategoryById',
        createMenuItemDto.categoryId,
      ),
    );
    if (!category) throw new RpcException(ERROR_MESSAGES.CATEGORY_NOT_FOUND);
    const newMenuItem = this.menuItemRepo.create(createMenuItemDto);
    return await this.menuItemRepo.save(newMenuItem);
  }

  async findByName(name: string): Promise<MenuItem | null> {
    return await this.menuItemRepo.findOne({ where: { name } });
  }

  async findAll(): Promise<MenuItem[]> {
    return await this.menuItemRepo.find();
  }
}
