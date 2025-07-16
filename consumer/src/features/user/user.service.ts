// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { InjectRepository } from 'typeorm';
// import { Repository } from 'typeorm';
// import { getChannel } from '../../infrastructure/rabbitmq.client';
// import { UserEntity } from '../../domain/entity/user.entity';

// @Injectable()
// export class UserService implements OnModuleInit {
//   constructor(
//     @InjectRepository(UserEntity)
//     private readonly userRepository: Repository<UserEntity>,
//   ) {}

//   onModuleInit() {
//     this.consume();
//   }

//   async consume() {
//     const ch = await getChannel();

//     ch.consume('user-queue', async (msg) => {
//       if (msg) {
//         const data = JSON.parse(msg.content.toString());
//         console.log('Received message:', data);

//         const user = new UserEntity();
//         user.name = data.name;
//         user.email = data.email;
//         await this.userRepository.save(user);

//         ch.ack(msg);
//       }
//     });
//   }
// }
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm';
import { getChannel } from '../../infrastructure/rabbitmq.client';
import { UserEntity } from '../../domain/entity/user.entity';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  onModuleInit() {
    this.consume();
  }

  async consume() {
    const ch = await getChannel();

    ch.consume('user-queue', async (msg) => {
      if (msg) {
        const data = JSON.parse(msg.content.toString());
        console.log('Received message:', data);

        const user = new UserEntity();
        user.name = data.name;
        user.email = data.email;
        await this.userRepository.save(user);

        ch.ack(msg);
      }
    });
  }
}
