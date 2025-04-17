import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type JobDocument = Job & Document;

export enum JobStatus {
  VALIDATING = "Validating",
  VALID = "Valid",
  INVALID = "Invalid",
}

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true })
  input: string;

  @Prop({ required: true })
  regexPattern: string;

  @Prop({
    required: true,
    enum: JobStatus,
    default: JobStatus.VALIDATING,
  })
  status: JobStatus;
}

export const JobSchema = SchemaFactory.createForClass(Job);
