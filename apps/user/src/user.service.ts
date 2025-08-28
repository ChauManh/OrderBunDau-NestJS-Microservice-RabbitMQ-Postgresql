import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreateUserDto,
  UpdateUserDto,
} from '@app/common/dtos/requests/user.request.dto';
import { UserResponse } from '@app/common/dtos/responses/user.response.interface';
import { ERROR_MESSAGES } from '@app/common/constants/errors';
import { RpcException } from '@nestjs/microservices';
import { hash } from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const existingUser = await this.findOneByPhoneNumber(
      createUserDto.phoneNumber,
    );
    if (existingUser)
      throw new RpcException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    const passwordHash = await hash(createUserDto.password, 10);
    createUserDto.password = passwordHash;
    const newUser = this.userRepo.create(createUserDto);
    const savedUser = await this.userRepo.save(newUser);
    return plainToInstance(UserResponse, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: string) {
    return await this.userRepo.findOne({ where: { id } });
  }

  async findOneByPhoneNumber(
    phoneNumber: string,
  ): Promise<UserResponse | null> {
    return await this.userRepo.findOne({
      where: { phoneNumber },
      select: ['id', 'phoneNumber', 'fullName', 'role', 'isActive', 'password'],
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    // console.log(updateUserDto);
    const user = await this.findOne(id);
    if (!user) throw new RpcException(ERROR_MESSAGES.USER_NOT_FOUND);
    if (updateUserDto.phoneNumber) {
      const existingUser = await this.findOneByPhoneNumber(
        updateUserDto.phoneNumber,
      );
      if (existingUser)
        throw new RpcException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }
    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepo.save(user);
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) throw new RpcException(ERROR_MESSAGES.USER_NOT_FOUND);
    await this.userRepo.remove(user);
  }
}
