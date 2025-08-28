import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';
import { ERROR_MESSAGES } from '@app/common/constants/errors';
import { RequestWithCookie } from '../../interfaces/request-custom.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithCookie>();
    // console.log(request.cookies);

    // Lấy token từ cookie
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException(ERROR_MESSAGES.TOKEN_NOT_FOUND);
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SECRET || 'localhost',
      });
      // Gắn payload vào request để controller dùng được
      request['user'] = payload;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.log(error);
      throw new UnauthorizedException(ERROR_MESSAGES.UNAUTHORIZED);
    }

    return true;
  }

  private extractTokenFromCookie(
    request: RequestWithCookie,
  ): string | undefined {
    return request.cookies?.['accessToken'];
  }
}
