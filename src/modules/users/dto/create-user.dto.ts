import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from '@nestjs/class-validator';
import { callbackResponse } from 'src/utils/message';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: callbackResponse('emailInvalid') })
  public email: string;

  @IsNumber()
  @IsNotEmpty()
  public city_id: number;
}
