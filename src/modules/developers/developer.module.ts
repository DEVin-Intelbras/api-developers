import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnologyEntity } from './entities/technology.entity';
import { DeveloperEntity } from './entities/developer.entity';
import { DeveloperController } from './controllers/developer.controller';
import { TechnologyService } from './services/technology.service';
import { TechnologyRepository } from './repositories/technology.repository';
import { DeveloperService } from './services/developer.service';
import { DeveloperRepository } from './repositories/developer.repository';
import { UserService } from '../users/services/user.service';
import { UserEntity } from '../users/entities/user.entity';
import { UserRepository } from '../users/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TechnologyEntity, DeveloperEntity, UserEntity]),
  ],
  controllers: [DeveloperController],
  providers: [
    TechnologyService,
    TechnologyRepository,
    UserRepository,
    DeveloperService,
    DeveloperRepository,
    UserService,
  ],
})
export class DeveloperModule {}
