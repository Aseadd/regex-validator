import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [process.env.KAFKA_BROKER || 'kafka:29092'],
    },
    consumer: {
      groupId: 'api-gateway-consumer',
    },
  },
};
