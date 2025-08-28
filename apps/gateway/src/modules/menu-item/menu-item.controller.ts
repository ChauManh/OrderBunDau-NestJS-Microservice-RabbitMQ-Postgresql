import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { CreateMenuItemDto } from '@app/common/dtos/requests/menu-item.request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3UploadUtil } from '../s3-upload/s3-upload.util';
import { ReturnFromController } from '../../common/interfaces/return-from-controller.interface';
import { MenuItemResponse } from '@app/common/dtos/responses/menu-item.respons.interface';
import { mapToApiResponse } from '../../common/utils/map-to-api-response.util';

@Controller('menu-item')
export class MenuItemController {
  constructor(
    private readonly menuItemService: MenuItemService,
    private readonly s3UploadUtil: S3UploadUtil,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createMenuItem(
    @Body() createMenuItemDto: CreateMenuItemDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ReturnFromController<MenuItemResponse>> {
    const image = this.s3UploadUtil.generateImageKey(
      'public/menu-item',
      createMenuItemDto.name,
    );
    const newMenuItem = await this.menuItemService.create(
      createMenuItemDto,
      image,
    );
    await this.s3UploadUtil.uploadImage(file, image);
    return mapToApiResponse(200, 'Create menu item successfully', newMenuItem);
  }

  @Get()
  async findAll(): Promise<ReturnFromController<MenuItemResponse[]>> {
    const menuItems = await this.menuItemService.findAll();
    return mapToApiResponse(200, 'Get all menu item successfully', menuItems);
  }
}
