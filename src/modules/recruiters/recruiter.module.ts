import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruiterEntity } from './entities/recruiter.entity';
import { RecruiterService } from './services/recruiter.service';
import { RecruiterRepository } from './recruiter.repository';
import { RecruiterController } from './controllers/recruiter.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RecruiterEntity])],
  controllers: [RecruiterController],
  providers: [RecruiterRepository, RecruiterService],
})
export class RecruiterModule {}
