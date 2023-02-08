import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getById(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findById(id);
  }

  @Post('create')
  async createUser(@Body() newUser: CreateUserDto): Promise<string> {
    try {
      this.userService.createUser(newUser);
      return 'usuário salvo com sucesso';
    } catch (error) {
      console.log(error);
    }
  }
}
