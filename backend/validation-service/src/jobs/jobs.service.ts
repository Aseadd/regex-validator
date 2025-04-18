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
  private readonly validationDelay: number;

  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST,
    });
    
    
    this.validationDelay = parseInt(process.env.VALIDATION_DELAY || '2000');
    
   
    if (isNaN(this.validationDelay) || this.validationDelay < 0) {
      this.validationDelay = 2000; 
      console.warn(`Invalid VALIDATION_DELAY, using default ${this.validationDelay}ms`);
    }
  }

  async processJob(data: { jobId: string; input: string; regexPattern: string }) {
    const { jobId, input, regexPattern } = data;
    
  
    console.log(`Applying validation delay of ${this.validationDelay}ms...`);
    await new Promise(resolve => setTimeout(resolve, this.validationDelay));
    

    const isValid = new RegExp(regexPattern).test(input);

    const updatedJob = await this.jobModel.findByIdAndUpdate(
      jobId,
      { 
        status: isValid ? JobStatus.VALID : JobStatus.INVALID,
        processedAt: new Date() 
      },
      { new: true },
    );

    if (!updatedJob) {
      throw new Error(`Job with ID ${jobId} not found`);
    }

    // Publish the job status update to Redis
    await this.redisClient.publish(
      `job:update:${jobId}`,
      JSON.stringify({ 
        jobId, 
        status: updatedJob.status,
        processingTimeMs: this.validationDelay 
      }),
    );

    console.log(`Job ${jobId} status updated to ${updatedJob.status} after ${this.validationDelay}ms delay`);
    return updatedJob;
  }
}