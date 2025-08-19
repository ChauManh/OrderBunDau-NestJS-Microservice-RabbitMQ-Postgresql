import { Controller } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import type { CreateMenuItemDto } from './dtos/create-menu-item.dto';

@Controller()
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @MessagePattern('createMenuItem')
  create(@Payload() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemService.create(createMenuItemDto);
  }

  @MessagePattern('findAllMenuItems')
  findAll() {
    return this.menuItemService.findAll();
  }
}
