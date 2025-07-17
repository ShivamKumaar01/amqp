import { Module } from '@nestjs/common';
import { RabbitMQModule } from '../rabbitmq.module';
import { ProducerService } from './producer.service';
import { PublishMessageCommand } from '../../cli-commands/handle-message';

@Module({
  imports: [RabbitMQModule],
  providers: [ProducerService, PublishMessageCommand],
  exports: [ProducerService],
})
export class ProducerModule {}
