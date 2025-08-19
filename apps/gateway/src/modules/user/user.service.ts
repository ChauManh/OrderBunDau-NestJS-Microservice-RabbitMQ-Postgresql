import { CreateUserDto } from '@app/common/dtos/requests/user.request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'apps/user/src/entities/user.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  async createUser(createUser: CreateUserDto): Promise<User> {
    return await firstValueFrom(this.client.send('createUser', createUser));
  }
}
