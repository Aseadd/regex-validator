// At the top of jobs.service.ts
import { JobStatus } from './types/job-status.enum';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './job.schema';
import { ProcessJobDto } from './dto/process-job.dto';
import { Redis } from 'ioredis';


@Injectable()
export class JobsService {
  private redisClient: Redis;

  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST,
    });
  }

    async processJob(data: { jobId: string; input: string; regexPattern: string }) {
    const { jobId, input, regexPattern } = data;

    const isValid = new RegExp(regexPattern).test(input);

    const updatedJob = await this.jobModel.findByIdAndUpdate(
      jobId,
      { status: isValid ? JobStatus.VALID : JobStatus.INVALID },
      { new: true },
    );

    if (!updatedJob) {
      throw new Error(`Job with ID ${jobId} not found`);
    }
    // Publish the job status update to Redis
    await this.redisClient.publish(
      `job:update:${jobId}`,
      JSON.stringify({ jobId, status: updatedJob.status }),
    );
    // Log the status update

console.log(`Job ${jobId} status updated to ${updatedJob.status}`);
  }
}



