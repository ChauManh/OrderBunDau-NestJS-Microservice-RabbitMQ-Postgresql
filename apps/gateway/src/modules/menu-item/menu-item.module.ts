import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MenuItemController } from './menu-item.controller';
import { MenuItemService } from './menu-item.service';
import { S3Module } from '../s3-upload/s3-upload.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MENUITEM_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672',
          ],
          queue: 'menu_item_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'CATEGORY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672',
          ],
          queue: 'category_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
    S3Module,
  ],
  controllers: [MenuItemController],
  providers: [MenuItemService],
})
export class MenuItemModule {}
