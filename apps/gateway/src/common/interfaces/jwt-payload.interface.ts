import { UserRole } from '@app/common/enum/user.enum';

export interface JwtPayload {
  sub: string;
  role: UserRole;
  active: boolean;
  iat?: number;
  exp?: number;
}
