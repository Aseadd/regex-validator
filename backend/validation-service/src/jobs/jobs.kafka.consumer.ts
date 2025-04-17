import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JobsService } from './jobs.service';
import { ProcessJobDto } from './dto/process-job.dto';

@Controller()
export class JobsKafkaConsumer {
  constructor(private readonly jobsService: JobsService) {}

  @MessagePattern('job-submitted') // <-- your Kafka topic name
  async handleKafkaJob(@Payload() data: ProcessJobDto) {
    // Log the received job for debugging
    console.log('Received job from Kafka:', data);
    

    await this.jobsService.processJob(data);
  }
}
