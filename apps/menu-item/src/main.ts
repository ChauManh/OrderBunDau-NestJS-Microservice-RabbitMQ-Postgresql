import { NestFactory } from '@nestjs/core';
import { MenuItemModule } from './menu-item.module';

async function bootstrap() {
  const app = await NestFactory.create(MenuItemModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
