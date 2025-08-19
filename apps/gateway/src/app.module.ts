import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MenuItemModule } from './modules/menu-item/menu-item.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [UserModule, AuthModule, MenuItemModule, CategoryModule],
})
export class AppModule {}
