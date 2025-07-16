import { connect, Channel } from 'amqplib';
import * as dotenv from 'dotenv';
dotenv.config();

let channel: Channel;

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
const EXCHANGE = process.env.EXCHANGE || 'users-exchange';

export async function getChannel(): Promise<Channel> {
  if (channel) return channel;

  const conn = await connect(RABBITMQ_URL); 
  channel = await conn.createChannel();
  await channel.assertExchange(EXCHANGE, 'fanout', { durable: true });

  return channel;
}

