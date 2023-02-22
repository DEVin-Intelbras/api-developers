import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { errorsMessage } from 'src/common/errors_message';
import { recruiterDocumentation } from '../documentation';

export class CreateRecruiterDto {
  @IsNumber({}, errorsMessage.isNumber)
  @IsNotEmpty()
  @ApiProperty(recruiterDocumentation.ApiProperty.CreateRecruiterDtoUserId)
  public user_id: number;
}
