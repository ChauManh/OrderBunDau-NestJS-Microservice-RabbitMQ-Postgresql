import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import {
  CreateMenuItemDto,
  UpdateMenuItemDto,
} from '@app/common/dtos/requests/menu-item.request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReturnFromController } from '../../common/interfaces/return-from-controller.interface';
import { MenuItemResponse } from '@app/common/dtos/responses/menu-item.respons.interface';
import { mapToApiResponse } from '../../common/utils/map-to-api-response.util';

@Controller('menu-item')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createMenuItem(
    @Body() createMenuItemDto: CreateMenuItemDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ReturnFromController<MenuItemResponse>> {
    const newMenuItem = await this.menuItemService.create(
      createMenuItemDto,
      file,
    );
    return mapToApiResponse(200, 'Tạo món ăn thành công', newMenuItem);
  }

  @Get()
  async findAll(): Promise<ReturnFromController<MenuItemResponse[]>> {
    const menuItems = await this.menuItemService.findAll();
    return mapToApiResponse(200, 'Lấy danh sách món ăn thành công', menuItems);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const menuItemUpdated = await this.menuItemService.update(
      id,
      updateMenuItemDto,
      file,
    );
    return mapToApiResponse(200, 'Cập nhật món ăn thành công', menuItemUpdated);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.menuItemService.remove(id);
    return mapToApiResponse(204);
  }
}
