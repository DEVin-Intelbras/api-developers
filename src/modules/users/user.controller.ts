import { Controller, Get, Post, Param, Body, HttpCode } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiOperation({
    summary: 'user/:id',
    description:
      'Este endpoint recebe como param o id do usuário e retorna os dados',
  })
  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: number): Promise<UserEntity> {
    return await this.userService.findById(id);
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
