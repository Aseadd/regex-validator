// src/jobs/jobs.kafka.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JobsService } from './jobs.service';
import { ProcessJobDto } from './dto/process-job.dto';

@Controller()
export class JobsKafkaController {
  constructor(private readonly jobsService: JobsService) {}

  @MessagePattern('jobs') // This must match the topic used in the gateway
  async handleKafkaMessage(@Payload() data: ProcessJobDto) {
    console.log('Received job from Kafka:', data);
    await this.jobsService.processJob(data);
  }
}
