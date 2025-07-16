import { Injectable } from '@nestjs/common';
import { UserDTO } from '../../domain/dto/user.dto';
import { getChannel } from '../../infrastructure/rabbitmq.client';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { UserEntity } from '../../domain/entity/user.entity';

const EXCHANGE = process.env.EXCHANGE || 'users-exchange'; // ✅ define safely

@Injectable()
export class UserService {
  async publish(dto: UserDTO) {
    const inst = plainToInstance(UserDTO, dto);
    await validateOrReject(inst);

    const entity = new UserEntity();
    entity.name = inst.name;
    entity.email = inst.email;

    const ch = await getChannel();
    const buffer = Buffer.from(JSON.stringify(entity));

    ch.publish(EXCHANGE, '', buffer); 
  }
}
