import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
 const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [process.env.KAFKA_BROKER || 'kafka:29092'],
    },
    consumer: {
      groupId: 'validation-service', // must be unique from the API Gateway group
    },
  },
});
await app.listen();

}
bootstrap();
