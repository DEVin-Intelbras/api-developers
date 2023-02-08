import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { databaseProviders } from 'src/core/database/database.providers';
import { userProviders } from './user.providers';

@Module({
  controllers: [UserController],
  providers: [
    UserRepository,
    UserService,
    ...databaseProviders,
    ...userProviders,
  ],
})
export class UserModule {}
