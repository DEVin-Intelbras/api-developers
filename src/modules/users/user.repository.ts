import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  async getById(id: number): Promise<UserEntity> {
    return this.findOne({ where: { id } });
  }

  async createUser(newUser: CreateUserDto): Promise<void> {
    const user = new UserEntity();
    const dataUser = {
      ...user,
      ...newUser,
    };
    await this.save(dataUser);
  }
}
