import { CreateUserDto } from '@app/common/dtos/requests/users/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  async createUser(createUser: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await firstValueFrom(this.client.send('createUser', createUser));
  }
}
