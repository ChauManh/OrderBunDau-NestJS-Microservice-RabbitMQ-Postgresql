import { CreateMenuItemDto } from '@app/common/dtos/requests/menu-item.request.dto';
import { MenuItemResponse } from '@app/common/dtos/responses/menu-item.respons.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Category } from 'apps/category/src/entities/user.entity';
import { MenuItem } from 'apps/menu-item/src/entities/menu-item.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MenuItemService {
  constructor(
    @Inject('MENUITEM_SERVICE') private readonly menuItemClient: ClientProxy,
    @Inject('CATEGORY_SERVICE') private readonly categoryClient: ClientProxy,
  ) {}

  async create(
    createMenuItem: CreateMenuItemDto,
    image: string,
  ): Promise<MenuItemResponse> {
    return await firstValueFrom(
      this.menuItemClient.send('createMenuItem', { ...createMenuItem, image }),
    );
  }

  // async findOneByName(name: string): Promise<MenuItem> {
  //   return await firstValueFrom(this.client.send('findMenuItemByName', name));
  // }

  async findAll(): Promise<MenuItemResponse[]> {
    const [menuItems, categories] = await Promise.all([
      firstValueFrom(
        this.menuItemClient.send<MenuItem[]>('findAllMenuItems', {}),
      ),
      firstValueFrom(
        this.categoryClient.send<Category[]>('findAllCategories', {}),
      ),
    ]);
    const categoryMap = new Map(categories.map((c) => [c.id, c]));
    const result = menuItems.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: `${process.env.AWS_S3_BASE_URL}${item.image}`,
      isActive: item.isActive,
      category: categoryMap.get(item.categoryId)!,
    }));
    return result;
  }
}
