import { Module } from '@nestjs/common';
import { UserService } from './features/user/user.service';
import { UserController } from './features/user/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
