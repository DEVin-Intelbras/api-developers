import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStateDto {
  @IsString({ message: 'FieldMustBeString' })
  @IsNotEmpty({ message: 'FieldMustNotBeEmpty' })
  @ApiProperty({ name: 'name', example: 'Rio Grande do Sul' })
  public name: string;

  @IsString({ message: 'FieldMustBeString' })
  @IsNotEmpty({ message: 'FieldMustNotBeEmpty' })
  @ApiProperty({ name: 'initials', example: 'RS' })
  public initials: string;

  @IsString({ message: 'FieldMustBeString' })
  @IsNotEmpty({ message: 'FieldMustNotBeEmpty' })
  @ApiProperty({ name: 'country_id', example: 1 })
  public country_id: number;
}
