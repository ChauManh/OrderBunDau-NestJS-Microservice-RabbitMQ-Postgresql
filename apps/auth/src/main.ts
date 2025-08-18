import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AuthModule);
  const configService = appContext.get(ConfigService);
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBITMQ_URI')],
      queue: 'auth_queue',
      queueOptions: { durable: false },
    },
  });
  await app.listen();
  console.log('auth-service connected to RabbitMQ');
}
void bootstrap();
