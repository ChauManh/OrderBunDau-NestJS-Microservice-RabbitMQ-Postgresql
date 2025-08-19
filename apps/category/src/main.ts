import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { CategoryModule } from './category.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(CategoryModule);
  const configService = appContext.get(ConfigService);
  const app = await NestFactory.createMicroservice(CategoryModule, {
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBITMQ_URI')],
      queue: 'category_queue',
      queueOptions: { durable: false },
    },
  });
  await app.listen();
  console.log('category-service connected to RabbitMQ');
}
void bootstrap();
