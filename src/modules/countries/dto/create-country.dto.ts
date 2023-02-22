import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { errorsMessage } from 'src/common/errors_message';
import { countryDocumentation } from '../documentation';

export class CreateCountryDto {
  @IsString(errorsMessage.isString)
  @IsNotEmpty(errorsMessage.isNotEmpty)
  @ApiProperty(countryDocumentation.ApiProperty.CreateCountryDtoName)
  public name: string;

  @IsString(errorsMessage.isString)
  @IsNotEmpty(errorsMessage.isNotEmpty)
  @ApiProperty(countryDocumentation.ApiProperty.CreateCountryDtoLanguage)
  public language: string;
}
