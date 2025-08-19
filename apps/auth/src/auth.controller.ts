import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginResponse } from '@app/common/dtos/responses/auth.response.interface';
import { LoginDto } from '@app/common/dtos/requests/auth.request.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login')
  async login(@Payload() loginDto: LoginDto): Promise<LoginResponse> {
    return await this.authService.login(loginDto);
  }
}
