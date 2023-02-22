import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnologyEntity } from './entities/technology.entity';
import { DeveloperEntity } from './entities/developer.entity';
import { DeveloperController } from './controllers/developer.controller';
import { TechnologyService } from './services/technology.service';
import { TechnologyRepository } from './repositories/technology.repository';
import { DeveloperService } from './services/developer.service';
import { DeveloperRepository } from './repositories/developer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TechnologyEntity, DeveloperEntity])],
  controllers: [DeveloperController],
  providers: [
    TechnologyService,
    TechnologyRepository,
    DeveloperService,
    DeveloperRepository,
  ],
})
export class DeveloperModule {}
