import { UserRole } from '@app/common/enum/user.enum';
import {
  IsString,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsMobilePhone('vi-VN')
  phoneNumber: string;
  @IsString() password: string;
  @IsString() fullName: string;
  @IsEnum(UserRole) role: UserRole;
}

export class UpdateUserDto {
  @IsOptional() @IsMobilePhone('vi-VN') phoneNumber?: string;
  @IsOptional() @IsString() fullName?: string;
  @IsOptional() @IsEnum(UserRole) role?: UserRole;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
