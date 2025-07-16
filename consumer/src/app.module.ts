// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './features/user/user.service';
import { UserEntity } from './domain/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      entities: [UserEntity],
      synchronize: true,
    }),

   
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserService],
})
export class AppModule {}

