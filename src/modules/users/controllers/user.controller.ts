import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { userDocumentation } from '../documentation';
const { ApiOperation: doc } = userDocumentation;
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation(doc.getById)
  @Get(':id')
  @UsePipes(new ValidationPipe())
  async getById(@Param('id') id: number): Promise<UserEntity> {
    return await this.userService.findById(id);
  }

  @ApiOperation(doc.createUser)
  @Post('create')
  @UsePipes(new ValidationPipe())
  async createUser(@Body() newUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(newUser);
  }
}
