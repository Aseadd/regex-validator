import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors({
    origin: 'http://localhost:61234',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
