import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from '../../domain/dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private svc: UserService) {}

  @Post()
  async create(@Body() dto: UserDTO) {
    await this.svc.publish(dto);
    return { message: 'User published.' };
  }
}
