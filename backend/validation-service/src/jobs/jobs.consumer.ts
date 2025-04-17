// src/jobs/jobs.consumer.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JobsService } from './jobs.service';
import { ProcessJobDto } from './dto/process-job.dto';

@Controller()
export class JobsConsumer {
  constructor(private readonly jobsService: JobsService) {}

  @MessagePattern('validate-job') // Kafka topic
  async handleJob(@Payload() data: ProcessJobDto) {
    console.log('Received job:', data); // helpful debug

    await this.jobsService.processJob(data);
  }
}
