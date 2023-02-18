import { Transform } from '@nestjs/class-transformer';
import { IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterCountryDto {
  @IsString({ message: 'FieldMustBeString' })
  @ApiProperty({ name: 'name', example: 'Brasil' })
  @IsOptional()
  public name?: string;

  @IsString({ message: 'FieldMustBeString' })
  @ApiProperty({ name: 'language', example: 'Português' })
  @IsOptional()
  public language?: string;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public id?: number;

  @IsOptional()
  public createdAt?: string;

  @IsOptional()
  public updatedAt?: string;

  @IsOptional()
  public deletedAt?: string;
}
