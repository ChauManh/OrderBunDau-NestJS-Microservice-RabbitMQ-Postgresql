import {
  CreateMenuItemDto,
  UpdateMenuItemDto,
} from '@app/common/dtos/requests/menu-item.request.dto';
import { MenuItemResponse } from '@app/common/dtos/responses/menu-item.respons.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Category } from 'apps/category/src/entities/category.entity';
import { MenuItem } from 'apps/menu-item/src/entities/menu-item.entity';
import { firstValueFrom } from 'rxjs';
import { S3UploadUtil } from '../s3-upload/s3-upload.util';
import { CategoryResponse } from '@app/common/dtos/responses/category.response.interface';

@Injectable()
export class MenuItemService {
  constructor(
    @Inject('MENUITEM_SERVICE') private readonly menuItemClient: ClientProxy,
    @Inject('CATEGORY_SERVICE') private readonly categoryClient: ClientProxy,
    private readonly s3UploadUtil: S3UploadUtil,
  ) {}

  async create(
    createMenuItemDto: CreateMenuItemDto,
    file: Express.Multer.File,
  ): Promise<MenuItemResponse> {
    const category = await firstValueFrom(
      this.categoryClient.send<CategoryResponse>(
        'findOneCategory',
        createMenuItemDto.categoryId,
      ),
    );
    const image = this.s3UploadUtil.generateImageKey('public/menu-item');
    await this.s3UploadUtil.uploadImage(file, image);
    const menuItem = await firstValueFrom(
      this.menuItemClient.send<MenuItem>('createMenuItem', {
        ...createMenuItemDto,
        image,
      }),
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categoryId, ...rest } = menuItem;
    return {
      ...rest,
      category,
    };
  }

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
    const result = menuItems.map(({ categoryId, ...rest }) => ({
      ...rest,
      category: categoryMap.get(categoryId)!,
    }));
    return result;
  }

  async update(
    id: string,
    updateMenuItemDto: UpdateMenuItemDto,
    file: Express.Multer.File,
  ): Promise<MenuItemResponse> {
    let category: CategoryResponse | null = null;
    if (updateMenuItemDto.categoryId) {
      category = await firstValueFrom(
        this.categoryClient.send<CategoryResponse>(
          'findOneCategory',
          updateMenuItemDto.categoryId,
        ),
      );
    }
    const menuItem = await firstValueFrom<MenuItem>(
      this.menuItemClient.send('updateMenuItem', { id, updateMenuItemDto }),
    );
    if (file) await this.s3UploadUtil.uploadImage(file, menuItem.image);
    if (!category) {
      category = await firstValueFrom(
        this.categoryClient.send<CategoryResponse>(
          'findOneCategory',
          menuItem.categoryId,
        ),
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categoryId, ...rest } = menuItem;
    return {
      ...rest,
      category,
    };
  }

  async remove(id: string) {
    await firstValueFrom(this.menuItemClient.send('removeMenuItem', id));
  }
}
