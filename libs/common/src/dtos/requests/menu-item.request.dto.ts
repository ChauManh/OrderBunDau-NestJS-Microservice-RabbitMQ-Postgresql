import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateMenuItemDto {
  @IsString() name: string;
  @IsString() @IsOptional() description: string;
  @Type(() => Number) @IsNumber() price: number;
  // @IsString() @IsOptional() image: string;
  @Type(() => Boolean) @IsBoolean() isActive: boolean;
  @Type(() => String) @IsUUID() categoryId: string;
}

export class UpdateMenuItemDto {
  @IsString() @IsOptional() name?: string;
  @IsString() @IsOptional() description?: string;
  @Type(() => Number) @IsOptional() @IsNumber() price?: number;
  // @IsString() @IsOptional() image: string;
  @Type(() => Boolean) @IsBoolean() @IsOptional() isActive?: boolean;
  @Type(() => String) @IsUUID() @IsOptional() categoryId?: string;
}
