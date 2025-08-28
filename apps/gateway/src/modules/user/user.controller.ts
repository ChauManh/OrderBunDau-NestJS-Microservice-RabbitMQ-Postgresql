import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDto,
} from '@app/common/dtos/requests/user.request.dto';
import { AuthGuard } from '../../common/auth/guards/jwt.guard';
import { UserRole } from '@app/common/enum/user.enum';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/auth/guards/roles.guard';
import { mapToApiResponse } from '../../common/utils/map-to-api-response.util';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return mapToApiResponse(201, 'Tạo tài khoản mới thành công', user);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll() {
    const users = await this.userService.findAll();
    return mapToApiResponse(200, 'Lấy danh sách tài khoản thành công', users);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return mapToApiResponse(
      200,
      'Cập nhật thông tin tài khoản thành công',
      updatedUser,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);
    return mapToApiResponse(200, 'Xóa tài khoản thành công');
  }
}
