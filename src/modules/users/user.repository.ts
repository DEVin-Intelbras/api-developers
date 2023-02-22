import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  async getById(id: number): Promise<UserEntity> {
    return this.findOne({ where: { id } });
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return this.findOne({ where: { email } });
  }

  async createUser(newUser: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    const dataUser = {
      ...user,
      ...newUser,
    };

    dataUser.salt = await bcrypt.genSalt(12);
    dataUser.password = await bcrypt.hash(dataUser.password, dataUser.salt);

    const userSave = await this.save(dataUser);
    return userSave;
  }
}
