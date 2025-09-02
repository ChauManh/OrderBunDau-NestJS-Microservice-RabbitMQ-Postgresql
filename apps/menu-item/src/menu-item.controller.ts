import { Controller } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import type { CreateMenuItemDto } from './dtos/create-menu-item.dto';
import { UpdateMenuItemDto } from '@app/common/dtos/requests/menu-item.request.dto';

@Controller()
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @MessagePattern('createMenuItem')
  async create(@Payload() createMenuItemDto: CreateMenuItemDto) {
    return await this.menuItemService.create(createMenuItemDto);
  }

  @MessagePattern('findAllMenuItems')
  async findAll() {
    return await this.menuItemService.findAll();
  }

  @MessagePattern('updateMenuItem')
  async update(
    @Payload() data: { id: string; updateMenuItemDto: UpdateMenuItemDto },
  ) {
    return await this.menuItemService.update(data.id, data.updateMenuItemDto);
  }

  @MessagePattern('removeMenuItem')
  async remove(@Payload() id: string) {
    await this.menuItemService.delete(id);
    return {};
  }
}
