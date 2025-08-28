import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDto,
} from '@app/common/dtos/requests/user.request.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('createUser')
  async create(@Payload() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @MessagePattern('findAllUsers')
  async findAll() {
    return await this.userService.findAll();
  }

  @MessagePattern('findUserByPhoneNumber')
  async findByPhoneNumber(@Payload() phoneNumber: string) {
    return await this.userService.findOneByPhoneNumber(phoneNumber);
  }

  @MessagePattern('findOneUser')
  async findOne(@Payload() id: string) {
    return await this.userService.findOne(id);
  }

  @MessagePattern('updateUser')
  async update(@Payload() data: { id: string; updateUserDto: UpdateUserDto }) {
    return await this.userService.update(data.id, data.updateUserDto);
  }

  @MessagePattern('removeUser')
  async remove(@Payload() id: string) {
    await this.userService.remove(id);
    return {};
  }
}
