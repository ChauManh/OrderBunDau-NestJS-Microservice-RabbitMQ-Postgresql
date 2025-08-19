import { CreateMenuItemDto } from '@app/common/dtos/requests/menu-item.request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MenuItem } from 'apps/menu-item/src/entities/menu-item.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MenuItemService {
  constructor(
    @Inject('MENUITEM_SERVICE') private readonly client: ClientProxy,
  ) {}

  async create(
    createMenuItem: CreateMenuItemDto,
    image: string,
  ): Promise<MenuItem> {
    return await firstValueFrom(
      this.client.send('createMenuItem', { ...createMenuItem, image }),
    );
  }

  // async findOneByName(name: string): Promise<MenuItem> {
  //   return await firstValueFrom(this.client.send('findMenuItemByName', name));
  // }

  async findAll(): Promise<MenuItem[]> {
    return await firstValueFrom(this.client.send('findAllMenuItems', {}));
  }
}
