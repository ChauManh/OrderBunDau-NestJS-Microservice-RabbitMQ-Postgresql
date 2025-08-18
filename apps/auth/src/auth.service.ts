/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from '@app/common/dtos/responses/auth/login-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async login(phoneNumber: string) {
    return await firstValueFrom(
      this.userClient.send('findUserByPhoneNumber', phoneNumber),
    );
  }

  generateToken(user: any): LoginResponse {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const payload = { sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
