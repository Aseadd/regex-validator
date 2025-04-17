import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './job.schema';
import { ClientKafka } from '@nestjs/microservices';
import { Redis } from 'ioredis';

@Injectable()
export class JobsService implements OnModuleInit {
  private redisClient: Redis;

  constructor(
    @InjectModel(Job.name) private readonly jobModel: Model<JobDocument>,
    @Inject('KAFKA_SERVICE') private readonly client: ClientKafka,
  ) {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST,
    });
  }

  async onModuleInit() {
    this.client.subscribeToResponseOf('jobs');
    await this.client.connect();
  }

  async create(createJobDto: { input: string }): Promise<Job> {
    const regexPattern = process.env.REGEX_PATTERN || '^[A-Za-z0-9]+$';

    const job = new this.jobModel({
      input: createJobDto.input,
      regexPattern,
      status: 'Validating',
    });

    const savedJob = (await job.save()) as JobDocument & { _id: string };

    await this.client
      .emit('jobs', {
        jobId: savedJob._id.toString(),
        input: savedJob.input,
        regexPattern: savedJob.regexPattern,
      })
      .toPromise();

    return savedJob;
  }

  async findAll(): Promise<Job[]> {
    return this.jobModel.find().exec();
  }

  async publishStatusUpdate(jobId: string, status: string) {
    await this.redisClient.publish(
      `job:update:${jobId}`,
      JSON.stringify({ jobId, status }),
    );
  }
}
