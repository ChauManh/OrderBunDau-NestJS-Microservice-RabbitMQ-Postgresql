import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ERROR_MESSAGES } from '@app/common/constants/errors';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import cookieParser from 'cookie-parser';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:3000', 'http://192.168.1.6:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Csrf-Token'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exceptionFactory: (errors) => {
        console.log(errors);
        throw new BadRequestException(ERROR_MESSAGES.VALIDATE_FAILED);
      },
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672'],
      queue: 'gateway_queue',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();
  await app.listen(5001);
  console.log('Gateway chạy tại http://localhost:5001');
}
void bootstrap();
