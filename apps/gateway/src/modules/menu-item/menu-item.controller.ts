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

@Controller('menu-item')
export class MenuItemController {
  constructor(
    private readonly MenuItemService: MenuItemService,
    private readonly s3UploadUtil: S3UploadUtil,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createUser(
    @Body() createMenuItemDto: CreateMenuItemDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const image = this.s3UploadUtil.generateImageKey(
      'public/menu-item',
      createMenuItemDto.name,
    );
    const newMenuItem = await this.MenuItemService.create(
      createMenuItemDto,
      image,
    );
    await this.s3UploadUtil.uploadImage(file, image);
    return newMenuItem;
  }

  @Get()
  async findAll() {
    return await this.MenuItemService.findAll();
  }
}
