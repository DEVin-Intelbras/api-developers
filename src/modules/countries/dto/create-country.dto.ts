import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'name', example: 'Brasil' })
  public name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'language', example: 'Português' })
  public language: string;
}
