import {
  CreateUserDto,
  UpdateUserDto,
} from '@app/common/dtos/requests/user.request.dto';
import { UserResponse } from '@app/common/dtos/responses/user.response.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  async create(createUser: CreateUserDto): Promise<UserResponse> {
    return await firstValueFrom(this.client.send('createUser', createUser));
  }

  async findAll(): Promise<UserResponse[]> {
    return await firstValueFrom(this.client.send('findAllUsers', {}));
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    return await firstValueFrom(
      this.client.send('updateUser', { id, updateUserDto }),
    );
  }

  async remove(id: string) {
    await firstValueFrom(this.client.send('removeUser', id));
  }
}
