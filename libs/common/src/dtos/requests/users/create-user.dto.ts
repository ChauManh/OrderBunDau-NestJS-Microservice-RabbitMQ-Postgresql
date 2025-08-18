import { IsString, IsEnum, IsMobilePhone } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  STAFF = 'staff',
}

export class CreateUserDto {
  @IsMobilePhone('vi-VN')
  phoneNumber: string;
  @IsString() password: string;
  @IsString() fullName: string;
  @IsEnum(UserRole) role: UserRole;
}
