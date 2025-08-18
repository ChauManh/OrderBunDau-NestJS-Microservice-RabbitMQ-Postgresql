import { Controller, Get } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';

@Controller()
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Get()
  getHello(): string {
    return this.menuItemService.getHello();
  }
}
