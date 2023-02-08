import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public language: string;
}
