import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '@app/common/dtos/requests/auth.request.dto';
import type { Response } from 'express';
import { mapToApiResponse } from '../../common/utils/map-to-api-response.util';
import type { ReturnFromController } from '../../common/interfaces/return-from-controller.interface';
import { AuthGuard } from '../../common/auth/guards/jwt.guard';
import type { AuthenticatedRequest } from '../../common/interfaces/request-custom.interface';
import { RolesGuard } from '../../common/auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@app/common/enum/user.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ReturnFromController<void>> {
    const { accessToken } = await this.authService.login(loginDto);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1 * 60 * 60 * 1000, // 1h
    });
    // res.cookie('refreshToken', refreshToken, refreshCookieOptions);
    return mapToApiResponse(200, 'Đăng nhập thành công');
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    // res.clearCookie('refreshToken');
    return mapToApiResponse(204);
  }

  @Get('me')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  me(@Req() req: AuthenticatedRequest) {
    const JwtPayload = req.user;
    return mapToApiResponse(200, 'Verify successfully', JwtPayload);
  }
}
