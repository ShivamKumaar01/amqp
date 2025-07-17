import { Module } from '@nestjs/common';
import { RabbitMQPublisher } from './rabbitmq.publisher';

@Module({
  providers: [RabbitMQPublisher],
  exports: [RabbitMQPublisher], // So it can be used in ProducerService
})
export class RabbitMQModule {}
