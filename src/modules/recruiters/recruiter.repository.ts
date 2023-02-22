import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { RecruiterEntity } from './entities/recruiter.entity';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';

@Injectable()
export class RecruiterRepository extends Repository<RecruiterEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(RecruiterEntity, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<RecruiterEntity> {
    return this.findOne({ where: { id } });
  }

  async createRecruiter(
    newRecruiter: CreateRecruiterDto,
  ): Promise<RecruiterEntity> {
    const recruiter = new RecruiterEntity();
    const dataRecruiter = {
      ...recruiter,
      ...newRecruiter,
    };

    const recruiterSave = await this.save(dataRecruiter);
    return recruiterSave;
  }

  async updateRecruiter(recruiter: RecruiterEntity): Promise<RecruiterEntity> {
    const recruiterUpdate = await this.save(recruiter);
    return recruiterUpdate;
  }
}
