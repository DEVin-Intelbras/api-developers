import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: number): Promise<UserEntity> {
    const foundUser = await this.userRepository.getById(id);
    if (!foundUser) {
      throw new NotFoundException('userNotFound');
    }

    return foundUser;
  }

  async createUser(newUser: CreateUserDto): Promise<UserEntity> {
    const existUser = await this.userRepository.getByEmail(newUser.email);

    if (existUser) {
      throw new BadRequestException('entityWithArgumentsExists');
    }
    const saveUser = await this.userRepository.createUser(newUser);

    if (!saveUser) {
      throw new BadRequestException('userNotSave');
    }

    return saveUser;
  }
}
