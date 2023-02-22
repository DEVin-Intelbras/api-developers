import { Transform } from '@nestjs/class-transformer';
import { IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { errorsMessage } from 'src/common/errors_message';
import { countryDocumentation } from '../documentation';
const { ApiProperty: doc } = countryDocumentation;

export class FilterCountryDto {
  @IsString(errorsMessage.isString)
  @ApiProperty(doc.FilterCountryDtoName)
  @IsOptional()
  public name?: string;

  @IsString(errorsMessage.isString)
  @ApiProperty(doc.FilterCountryDtoLanguage)
  @IsOptional()
  public language?: string;

  @Transform(({ value }) => Number(value))
  @ApiProperty(doc.FilterCountryDtoId)
  @IsOptional()
  public id?: number;

  @ApiProperty(doc.FilterCountryDtoCreatedAt)
  @IsOptional()
  public createdAt?: string;

  @ApiProperty(doc.FilterCountryDtoUpdatedAt)
  @IsOptional()
  public updatedAt?: string;
}
