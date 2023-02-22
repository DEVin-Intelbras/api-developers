import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { errorsMessage } from 'src/common/errors_message';

export class CreateUserDto {
  @IsString(errorsMessage.isString)
  @IsNotEmpty(errorsMessage.isNotEmpty)
  @ApiProperty({ name: 'name', example: 'Pedro' })
  public name: string;

  @IsString(errorsMessage.isString)
  @IsNotEmpty(errorsMessage.isNotEmpty)
  @ApiProperty({ name: 'password', example: '12345678' })
  public password: string;

  @IsString(errorsMessage.isString)
  @IsNotEmpty(errorsMessage.isNotEmpty)
  @IsEmail()
  @ApiProperty({ name: 'email', example: 'pedro@gmail.com' })
  public email: string;

  @IsNumber({}, errorsMessage.isNumber)
  @IsNotEmpty(errorsMessage.isNotEmpty)
  @ApiProperty({ name: 'city_id', example: 1 })
  public city_id: number;
}
