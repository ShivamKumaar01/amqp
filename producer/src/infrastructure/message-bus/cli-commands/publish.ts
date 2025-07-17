// import { getChannel } from '../../../infrastructure/rabbitmq.client';
// src/publish.ts
import { connect } from 'amqplib';

const userInput = process.argv[2];

if (!userInput) {
  console.error(' Please provide a JSON input');
  process.exit(1);
}

let payload;
try {
  payload = JSON.parse(userInput);
} catch (e) {
  console.error(' Invalid JSON');
  process.exit(1);
}

async function publish() {
  const conn = await connect('amqp://guest:guest@rabbitmq:5672');
  const ch = await conn.createChannel();

  const exchange = 'user_exchange';
  const routingKey = 'user.created';

  await ch.assertExchange(exchange, 'direct', { durable: true });
  ch.publish(exchange, routingKey, Buffer.from(JSON.stringify(payload)));

  console.log(' Message published:', payload);

  await ch.close();
  await conn.close();
}

publish().catch(console.error);


