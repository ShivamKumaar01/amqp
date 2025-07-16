
// import * as dotenv from 'dotenv';
// dotenv.config();
// import { connect, Channel } from 'amqplib';

// let channel: Channel;

// export async function getChannel(): Promise<{ channel: Channel; queue: string }> {
//   if (channel) {
//     const q = await channel.assertQueue('', { exclusive: true });
//     return { channel, queue: q.queue };
//   }
//   const conn = await connect(process.env.RABBITMQ_URL);
//   channel = await conn.createChannel();
//   await channel.assertExchange(process.env.EXCHANGE, 'fanout', { durable: true });
//   const q = await channel.assertQueue('', { exclusive: true });
//   channel.bindQueue(q.queue, process.env.EXCHANGE, '');
//   return { channel, queue: q.queue };
// }
import { connect, Channel } from 'amqplib';
import * as dotenv from 'dotenv';
dotenv.config();

let channel: Channel;

const EXCHANGE = process.env.EXCHANGE || 'users-exchange';
const QUEUE_NAME = 'user-queue';

export async function getChannel(): Promise<Channel> {
  if (channel) return channel;

  const conn = await connect(process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672');
  channel = await conn.createChannel();

  await channel.assertExchange(EXCHANGE, 'fanout', { durable: true });
  await channel.assertQueue(QUEUE_NAME, { durable: true }); 
  await channel.bindQueue(QUEUE_NAME, EXCHANGE, ''); 

  return channel;
}

