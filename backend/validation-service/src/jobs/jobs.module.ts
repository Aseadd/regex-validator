import { Module } from '@nestjs/common';
import { JobsConsumer } from './jobs.consumer';
import { JobsService } from './jobs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './job.schema';
import { BullModule } from '@nestjs/bull';
import { JobsKafkaConsumer } from './jobs.kafka.consumer';
import { JobsKafkaController } from './jobs.kafka.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    BullModule.registerQueue({
      name: 'jobs',
      redis: {
        host: process.env.REDIS_HOST || 'redis',
        port: 6379,
      },
    }),
  ],
  controllers: [JobsKafkaController],
  providers: [JobsConsumer, JobsService],
})
export class JobsModule {}
