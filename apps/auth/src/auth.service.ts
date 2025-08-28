import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from '@app/common/dtos/responses/auth.response.interface';
import { User } from 'apps/user/src/entities/user.entity';
import { ERROR_MESSAGES } from '@app/common/constants/errors';
import { compare } from 'bcrypt';
import { LoginDto } from '@app/common/dtos/requests/auth.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user: User | null = await firstValueFrom(
      this.userClient.send('findUserByPhoneNumber', loginDto.phoneNumber),
    );
    if (!user) throw new RpcException(ERROR_MESSAGES.USER_NOT_FOUND);
    const isMatch = await compare(loginDto.password, user.password);
    if (!isMatch) throw new RpcException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    return this.generateToken(user);
  }

  generateToken(user: User): LoginResponse {
    const payload = { sub: user.id, role: user.role, active: user.isActive };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
