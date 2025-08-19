import { LoginDto } from '@app/common/dtos/requests/auth.request.dto';
import { LoginResponse } from '@app/common/dtos/responses/auth.response.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    return await firstValueFrom(this.client.send('login', loginDto));
  }
}
