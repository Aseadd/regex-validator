import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

export enum JobStatus {
  VALIDATING = 'Validating',
  VALID = 'Valid',
  INVALID = 'Invalid',
}

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true })
  input!: string; // Add definite assignment assertion

  @Prop({ required: true })
  regexPattern!: string; // Add definite assignment assertion

  @Prop({
    required: true,
    enum: JobStatus,
    default: JobStatus.VALIDATING,
  })
  status!: JobStatus; // Add definite assignment assertion
}

export const JobSchema = SchemaFactory.createForClass(Job);
