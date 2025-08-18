import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { UserModule } from './user.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(UserModule);
  const configService = appContext.get(ConfigService);
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBITMQ_URI')],
      queue: 'user_queue',
      queueOptions: { durable: false },
    },
  });
  await app.listen();
  console.log('user-service connected to RabbitMQ');
}
void bootstrap();
