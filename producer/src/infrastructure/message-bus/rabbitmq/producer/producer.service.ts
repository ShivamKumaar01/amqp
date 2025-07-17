import { Injectable } from '@nestjs/common';
import { RabbitMQPublisher } from '../rabbitmq.publisher';

@Injectable()
export class ProducerService {
  constructor(private readonly rabbitPublisher: RabbitMQPublisher) {}

  async sendUserCreated(name: string, email: string): Promise<void> {
    const student = { name, email };
    await this.rabbitPublisher.publishUserCreated(student);
  }
}
