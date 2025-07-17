import { Injectable } from '@nestjs/common';
import { getChannel } from '../../../infrastructure/rabbitmq.client';
import * as dotenv from 'dotenv';
dotenv.config();

const EXCHANGE = process.env.EXCHANGE || 'users-exchange';

@Injectable()
export class RabbitMQPublisher {
  async publishUserCreated(student: { name: string; email: string }) {
    const channel = await getChannel();

    const messageBuffer = Buffer.from(JSON.stringify(student));
    channel.publish(EXCHANGE, '', messageBuffer); // fanout me routingKey khali hoti hai
    console.log('Message sent to exchange:', student);
  }
}
