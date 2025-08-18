import { IsString, IsMobilePhone } from 'class-validator';

export class LoginDto {
  @IsMobilePhone('vi-VN')
  phoneNumber: string;
  @IsString() password: string;
}
