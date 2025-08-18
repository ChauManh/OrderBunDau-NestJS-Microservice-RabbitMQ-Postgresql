import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ERROR_MESSAGES } from '@app/common/constants/errors';
import { hash } from 'bcrypt';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('createUser')
  async create(@Payload() createUserDto: CreateUserDto) {
    const user = await this.userService.findOneByPhoneNumber(
      createUserDto.phoneNumber,
    );
    if (user) throw new RpcException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    const passwordHash = await hash(createUserDto.password, 10);
    createUserDto.password = passwordHash;
    return this.userService.create(createUserDto);
  }

  @MessagePattern('findAllUser')
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern('findUserByPhoneNumber')
  findByPhoneNumber(@Payload() phoneNumber: string) {
    return this.userService.findOneByPhoneNumber(phoneNumber);
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: number) {
    return this.userService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() id: number) {
    return this.userService.update(id);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }
}
