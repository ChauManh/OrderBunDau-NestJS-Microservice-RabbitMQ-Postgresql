import { Expose } from 'class-transformer';
import { UserRole } from '@app/common/enum/user.enum';

export class UserResponse {
  @Expose() id: string;
  @Expose() phoneNumber: string;
  @Expose() fullName: string;
  @Expose() role: UserRole;
  @Expose() isActive: boolean;
}
