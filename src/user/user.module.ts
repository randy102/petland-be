import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HashService } from '../utils/hash/hash.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, HashService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [UserService]
})
export class UserModule {}
