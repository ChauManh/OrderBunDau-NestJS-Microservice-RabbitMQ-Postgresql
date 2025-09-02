import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu-item.entity';
import { CreateMenuItemDto } from './dtos/create-menu-item.dto';
import { RpcException } from '@nestjs/microservices';
import { ERROR_MESSAGES } from '@app/common/constants/errors';
import { UpdateMenuItemDto } from '@app/common/dtos/requests/menu-item.request.dto';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem) private menuItemRepo: Repository<MenuItem>,
  ) {}

  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    const menuItem = await this.findByName(createMenuItemDto.name);
    if (menuItem)
      throw new RpcException(ERROR_MESSAGES.MENU_ITEM_ALREADY_EXISTS);
    const newMenuItem = this.menuItemRepo.create(createMenuItemDto);
    return await this.menuItemRepo.save(newMenuItem);
  }

  async findByName(name: string) {
    return await this.menuItemRepo.findOne({ where: { name } });
  }

  async findAll(): Promise<MenuItem[]> {
    return await this.menuItemRepo.find();
  }

  async findOne(id: string) {
    return await this.menuItemRepo.findOne({ where: { id } });
  }

  async update(id: string, updateMenuItemDto: UpdateMenuItemDto) {
    const menuItem = await this.findOne(id);
    if (!menuItem) throw new RpcException(ERROR_MESSAGES.MENU_ITEM_NOT_FOUND);
    if (updateMenuItemDto.name) {
      const existingMenuItem = await this.findByName(updateMenuItemDto.name);
      if (existingMenuItem)
        throw new RpcException(ERROR_MESSAGES.MENU_ITEM_ALREADY_EXISTS);
    }
    Object.assign(menuItem, updateMenuItemDto);
    const updatedMenuItem = await this.menuItemRepo.save(menuItem);
    return updatedMenuItem;
  }

  async delete(id: string) {
    const menuItem = await this.findOne(id);
    if (!menuItem) throw new RpcException(ERROR_MESSAGES.MENU_ITEM_NOT_FOUND);
    await this.menuItemRepo.remove(menuItem);
  }
}
