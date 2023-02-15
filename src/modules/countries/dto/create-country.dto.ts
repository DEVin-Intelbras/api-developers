import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @IsString({ message: 'FieldIsString' })
  @IsNotEmpty()
  @ApiProperty({ name: 'name', example: 'Brasil' })
  public name: string;

  @IsString({ message: 'FieldIsString' })
  @IsNotEmpty()
  @ApiProperty({ name: 'language', example: 'Português' })
  public language: string;
}
