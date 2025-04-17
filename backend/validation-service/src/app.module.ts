import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { JobsModule } from './jobs/jobs.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: 'regexValidator',
      }),
      inject: [ConfigService],
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'redis',
        port: 6379,
      },
    }),
    JobsModule,
  ],
})
export class AppModule {}