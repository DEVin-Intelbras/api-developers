import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: number): Promise<UserEntity> {
    const foundUser = await this.userRepository.getById(id);
    if (!foundUser) {
      throw new NotFoundException('userNotfound');
    }

    return foundUser;
  }

  async createUser(newUser: CreateUserDto): Promise<void> {
    await this.userRepository.createUser(newUser);
  }
}
