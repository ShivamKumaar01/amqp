import { CommandFactory } from 'nest-commander';
import { ProducerModule } from '../rabbitmq/producer/producer.module';

async function bootstrap() {
  await CommandFactory.run(ProducerModule, ['warn']);
}

bootstrap()