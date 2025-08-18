/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { LoginDto } from '../dtos/auth.dto';
import { ERROR_MESSAGES } from '@app/common/constants/errors';
import { compare } from 'bcrypt';
import { LoginResponse } from '@app/common/dtos/responses/auth/login-response.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login')
  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.authService.login(loginDto.phoneNumber);
    if (!user) throw new RpcException(ERROR_MESSAGES.USER_NOT_FOUND);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const isMatch = await compare(loginDto.password, user.password);
    if (!isMatch) throw new RpcException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    const { accessToken, refreshToken } = this.authService.generateToken(user);

    return { accessToken, refreshToken };
  }
}
