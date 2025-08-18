import { IsString, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString() phoneNumber: string;
  @IsString() password: string;
  @IsString() fullName: string;
  @IsEnum(UserRole) role: UserRole;
}
