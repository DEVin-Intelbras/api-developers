import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateStateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public initials: string;

  @IsString()
  @IsNotEmpty()
  public country_id: number;
}
